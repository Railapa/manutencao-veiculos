import { useParams } from "react-router-dom"


export const VehicleDetailPage = () => {

    const { id } = useParams()

    return (
        <div>
            <h1>Veiculo: {id}</h1>
        </div>
    )
}
