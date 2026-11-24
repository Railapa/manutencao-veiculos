import axios from "axios"
import type { Vehicle } from "../types"
import { API } from "../api"
import { useState } from "react"
import { VehicleModal } from "./VehicleModal"
import { VehicleForm } from "./VehicleForm"

type VehicleProps = {
  vehicle: Vehicle,
  onDelete: (id: number) => void,
  onUpdate: (vehicle: Vehicle) => void
}

export const VehicleCard = ({ vehicle, onDelete, onUpdate }: VehicleProps) => {

  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState("")
  const [modal, setModal] = useState(false)

  async function handleDelete() {
    const confirmDelete = confirm(`Tem lcerteza que deseja apagar o veículo ${vehicle.marca} ${vehicle.modelo}?`)
    if (confirmDelete === false) return
    setDeleteError("")
    try {
      setDeleting(true)
      await axios.delete(`${API}/vehicles/${vehicle.id}`)
      onDelete(vehicle.id)
    } catch (err) {
      console.error(err)
      setDeleteError(`Erro ao apagar o veículo ${vehicle.marca} ${vehicle.modelo}`)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <article className="rounded-xl border-l-4 border-orange-500 bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
          {vehicle.marca}
        </p>
        <h2 className="text-xl font-bold text-gray-900">{vehicle.modelo}</h2>
        <p className="text-sm text-gray-500">
          {vehicle.ano === null ? "Ano não informado" : `Ano ${vehicle.ano}`}
        </p>

        <div className="mt-4 border-t border-gray-100 pt-4">
          <p className="text-xs text-gray-400">Quilometragem</p>
          {vehicle.km_atual === null ? (
            <p className="text-gray-400">Não informada</p>
          ) : (
            <p className="text-2xl font-bold text-gray-900">
              {vehicle.km_atual.toLocaleString("pt-BR")}{" "}
              <span className="text-base font-normal text-gray-500">km</span>
            </p>
          )}
        </div>

        {deleteError && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{deleteError}</p>
        )}

        <div className="mt-4 flex justify-end gap-2 border-t border-gray-100 pt-4">
          <button
            onClick={() => setModal(true)}
            type="button"
            className="cursor-pointer rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-600 hover:bg-gray-100"
          >
            Editar
          </button>

          <button
            onClick={handleDelete}
            disabled={deleting}
            type="button"
            className="rounded-lg px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            {deleting ? 'Apagando...' : 'Apagar'}
          </button>
        </div>
      </article>


      {modal && (
        <VehicleModal title="Editar Veículo" onClose={() => setModal(false)}>
            <VehicleForm vehicle={vehicle} onSaved={(vehicle) => {
              onUpdate(vehicle)
              setModal(false)
            }} />
        </VehicleModal> 
      )}
    </>
  )
}
