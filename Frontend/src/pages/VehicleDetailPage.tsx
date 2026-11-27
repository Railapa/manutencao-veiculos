import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import type { Maintenance, Vehicle } from "../types"
import axios from "axios"
import { API } from "../api"

function formatDate(date: string) {
    const dateSplit = date.split('-')
    const dateReverse = dateSplit.reverse()
    return dateReverse.join('/')
}

export const VehicleDetailPage = () => {

    const { id } = useParams()
    const [vehicle, setVehicle] = useState<Vehicle | null>(null)
    const [maintenances, setMaintenances] = useState<Maintenance[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        async function pageMaintenances() {
            if (!id) return

            setLoading(true)
            setError("")

            try {
                const getVehicleID = await axios.get<Vehicle>(`${API}/vehicles/${id}`)
                const getVehicleMaintenanceID = await axios.get<Maintenance[]>(`${API}/vehicles/${id}/maintenances`)
                setVehicle(getVehicleID.data)
                setMaintenances(getVehicleMaintenanceID.data)
            } catch (err) {
                setError("Não foi possível carregar o veículo.")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        pageMaintenances()
    }, [id])

    return (
        <main className="min-h-screen bg-gray-100 px-4 py-8">
            <div className="mx-auto max-w-4xl">
                <Link to="/" className="text-sm font-semibold text-orange-600 hover:underline">
                    ← Voltar para os veículos
                </Link>

                {loading && <p className="mt-6 text-gray-500">Carregando...</p>}

                {error && (
                    <p className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                        {error}
                    </p>
                )}

                {vehicle && (
                    <>
                        <header className="mb-8 mt-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
                                {vehicle.marca}
                            </p>
                            <h1 className="text-3xl font-bold text-gray-900">{vehicle.modelo}</h1>
                            <p className="mt-1 text-gray-500">
                                {vehicle.ano ?? "Ano não informado"} ·{" "}
                                {vehicle.km_atual === null
                                    ? "Km não informada"
                                    : `${vehicle.km_atual.toLocaleString("pt-BR")} km`}
                            </p>
                        </header>

                        <section className="rounded-xl bg-white p-5 shadow-sm">
                            <h2 className="mb-4 text-lg font-bold text-gray-900">
                                Histórico de manutenções
                            </h2>

                            {maintenances.length === 0 ? (
                                <p className="text-gray-500">Nenhuma manutenção registrada.</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead>
                                            <tr className="border-b border-gray-200 text-gray-500">
                                                <th className="py-2 pr-4 font-medium">Data</th>
                                                <th className="py-2 pr-4 font-medium">Serviço</th>
                                                <th className="py-2 pr-4 font-medium">Km</th>
                                                <th className="py-2 text-right font-medium">Custo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {maintenances.map((m) => (
                                                <tr key={m.id} className="border-b border-gray-100 last:border-0">
                                                    <td className="py-3 pr-4 text-gray-700">
                                                        {formatDate(m.data_servico)}
                                                    </td>
                                                    <td className="py-3 pr-4 font-medium text-gray-900">
                                                        {m.servico}
                                                    </td>
                                                    <td className="py-3 pr-4 text-gray-700">
                                                        {m.km === null ? "—" : m.km.toLocaleString("pt-BR")}
                                                    </td>
                                                    <td className="py-3 text-right text-gray-900">
                                                        {m.custo === null
                                                            ? "—"
                                                            : m.custo.toLocaleString("pt-BR", {
                                                                style: "currency",
                                                                currency: "BRL",
                                                            })}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>
                    </>
                )}
            </div>
        </main>
    )
}
