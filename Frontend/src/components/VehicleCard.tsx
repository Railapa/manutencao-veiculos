import type { Vehicle } from "../types"

type VehicleProps = {
  vehicle: Vehicle
}

export const VehicleCard = ({ vehicle }: VehicleProps) => {
  return (

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
    </article>
  )
}
