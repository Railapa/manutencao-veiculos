import { useEffect, useState } from "react"
import axios from "axios"
import { VehicleCard } from "./components/VehicleCard"
import type { Vehicle } from "./types"
import { VehicleForm } from "./components/VehicleForm"
import { API } from "./api"

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
        setError("Não foi possível carregar os veículos")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    callAPI()
  }, [])

  function addVehicle(newVehicle: Vehicle){
    setVehicles([...vehicles, newVehicle])
  }

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

        <VehicleForm onCreated={addVehicle} />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((item) => (
            <VehicleCard vehicle={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default App
