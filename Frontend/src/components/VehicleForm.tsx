import { useState, type SubmitEvent } from "react"
import { API } from "../api"
import axios from "axios"
import type { Vehicle } from "../types"

type VehicleFormProps = {
    onCreated: (vehicle: Vehicle) => void
}

export const VehicleForm = ({ onCreated }: VehicleFormProps) => {

    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [year, setYear] = useState("")
    const [mileage, setMileage] = useState("")
    const [formError, setFormError] = useState("")
    const [saving, setSaving] = useState(false)

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        setFormError("")

        const objetoAPI = {
            marca: brand.trim(),
            modelo: model.trim(),
            ano: year === "" ? null : Number(year),
            km_atual: mileage === "" ? null : Number(mileage),
        }

        if(objetoAPI.marca === ""){
            return setFormError("Informe a marca do veículo")
        } else if (objetoAPI.modelo === ""){
            return setFormError("Informe o modelo do veículo")
        }

        try {
            setSaving(true)
            const postAPI = await axios.post<Vehicle>(`${API}/vehicles`, objetoAPI)
            setBrand('')
            setModel('')
            setYear('')
            setMileage('')
            onCreated(postAPI.data)
        } catch (err) {
            setFormError("Não foi possível salvar o veículo. Tente novamente")
            console.error(err)
        } finally {
            setSaving(false)
        }

    }

    return (
        <form onSubmit={handleSubmit} className="mb-8 rounded-xl bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-gray-900">Novo veículo</h2>

            <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-gray-700">
                    Marca
                    <input
                        required
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        type="text"
                        placeholder="Ex.: Fiat"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                </label>

                <label className="block text-sm font-medium text-gray-700">
                    Modelo
                    <input
                        value={model}
                        required
                        onChange={(e) => setModel(e.target.value)}
                        type="text"
                        placeholder="Ex.: Uno"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                </label>

                <label className="block text-sm font-medium text-gray-700">
                    Ano
                    <input
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        type="number"
                        placeholder="Ex.: 2012"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                </label>

                <label className="block text-sm font-medium text-gray-700">
                    Quilometragem
                    <input
                        value={mileage}
                        onChange={(e) => setMileage(e.target.value)}
                        type="number"
                        placeholder="Ex.: 98000"
                        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                </label>
            </div>

            {formError && (
                <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{formError}</p>
            )}

            <div className="mt-5 flex justify-end">
                <button
                    type="submit"
                    disabled={saving}
                    className="rounded-lg bg-orange-500 px-5 py-2 font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300">
                    {saving ? 'Salvando...' : 'Salvar'}
                </button>
            </div>
        </form>
    )
}