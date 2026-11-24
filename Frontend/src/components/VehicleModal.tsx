import type { ReactNode } from "react"

type ModalProps = {
  title: string
  onClose: () => void
  children: ReactNode
}

export const VehicleModal = ({ title, onClose, children }: ModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-xl bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="cursor-pointer rounded-lg px-2 py-1 text-gray-500 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  )
}