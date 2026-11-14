import { useEffect, useState } from "react"
import axios from "axios"

type Vehicle = {
  id: number,
  marca: string,
  modelo: string,
  ano: number | null,
  km_atual: number | null
}

const API = "http://localhost:3000"

function App() {

  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function callAPI() {
      try {
        const response = await axios.get<Vehicle[]>(`${API}/vehicles`)
        setVehicles(response.data)
      } catch (err) {
        setError("Erro na requisição")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    callAPI()
  }, [])

  return (
    <section className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Meus Veículos</h1>
          {!loading && !error && (
            <p className="mt-1 text-gray-500">
              {vehicles.length}{" "}
              {vehicles.length === 1 ? "veículo cadastrado" : "veículos cadastrados"}
            </p>
          )}
        </header>

        {loading && <p className="text-gray-500">Carregando...</p>}

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((item) => (
            <article
              key={item.id}
              className="rounded-xl border-l-4 border-orange-500 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
                {item.marca}
              </p>
              <h2 className="text-xl font-bold text-gray-900">{item.modelo}</h2>
              <p className="text-sm text-gray-500">
                {item.ano === null ? "Ano não informado" : `Ano ${item.ano}`}
              </p>

              <div className="mt-4 border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-400">Quilometragem</p>
                {item.km_atual === null ? (
                  <p className="text-gray-400">Não informada</p>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">
                    {item.km_atual.toLocaleString("pt-BR")}{" "}
                    <span className="text-base font-normal text-gray-500">km</span>
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default App
