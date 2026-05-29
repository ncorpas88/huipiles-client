import { Link } from "react-router-dom"

function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-10">
      <h1 className="text-8xl font-bold text-black">
        404
      </h1>

      <h2 className="text-3xl font-semibold mt-4">
        Página no encontrada
      </h2>

      <p className="text-gray-500 mt-2 text-center">
        La página que buscas no existe o fue movida.
      </p>

      <Link
        to="/"
        className="mt-8 bg-black text-white px-6 py-3 rounded-xl hover:opacity-90"
      >
        Volver al inicio
      </Link>
    </div>
  )
}

export default NotFoundPage