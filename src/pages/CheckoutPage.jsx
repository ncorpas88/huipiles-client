
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../context/auth.context"

function CheckoutPage() {
  const navigate = useNavigate()

  const { user } =
    useContext(AuthContext)

  const [formData, setFormData] =
    useState({
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      phone: "",
    })

  const [isLoading, setIsLoading] =
    useState(false)

  const [errorMessage, setErrorMessage] =
    useState("")

  const handleChange = (e) => {
    setErrorMessage("")

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !formData.fullName ||
      !formData.address ||
      !formData.city ||
      !formData.postalCode ||
      !formData.phone
    ) {
      return setErrorMessage(
        "Todos los campos son obligatorios"
      )
    }

    try {
      setIsLoading(true)

      // Aquí luego conectaremos Stripe
      console.log("Checkout enviado")

      navigate("/profile")
    } catch (error) {
      console.log(error)

      setErrorMessage(
        "Error al procesar checkout"
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Formulario */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold mb-6">
            Checkout
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              name="fullName"
              placeholder="Nombre completo"
              className="border p-3 rounded"
              value={formData.fullName}
              onChange={handleChange}
            />

            <input
              type="text"
              name="address"
              placeholder="Dirección"
              className="border p-3 rounded"
              value={formData.address}
              onChange={handleChange}
            />

            <input
              type="text"
              name="city"
              placeholder="Ciudad"
              className="border p-3 rounded"
              value={formData.city}
              onChange={handleChange}
            />

            <input
              type="text"
              name="postalCode"
              placeholder="Código postal"
              className="border p-3 rounded"
              value={formData.postalCode}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Teléfono"
              className="border p-3 rounded"
              value={formData.phone}
              onChange={handleChange}
            />

            <button
              disabled={isLoading}
              className="bg-black text-white p-3 rounded-xl hover:opacity-90 disabled:opacity-50"
            >
              {isLoading
                ? "Procesando..."
                : "Finalizar Compra"}
            </button>

            {errorMessage && (
              <p className="text-red-500 text-sm">
                {errorMessage}
              </p>
            )}
          </form>
        </div>

        {/* Resumen */}
        <div className="bg-white p-6 rounded-2xl shadow-lg h-fit">
          <h2 className="text-2xl font-bold mb-6">
            Resumen
          </h2>

          <div className="flex justify-between mb-4">
            <span>Productos</span>
            <span>$120</span>
          </div>

          <div className="flex justify-between mb-4">
            <span>Envío</span>
            <span>$10</span>
          </div>

          <div className="border-t pt-4 flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>$130</span>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>
              Usuario:
              {" "}
              {user?.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage