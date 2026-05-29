
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import api from "../services/api"

function ProductDetailsPage() {
  const { productId } = useParams()

  const [product, setProduct] =
    useState(null)

  const [isLoading, setIsLoading] =
    useState(true)

  const [errorMessage, setErrorMessage] =
    useState("")

  const getProduct = async () => {
    try {
      const response = await api.get(
        `/products/${productId}`
      )

      setProduct(response.data)
    } catch (error) {
      console.log(error)

      setErrorMessage(
        "Error al cargar producto"
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getProduct()
  }, [productId])

  if (isLoading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className="p-10 text-red-500">
        {errorMessage}
      </div>
    )
  }

  if (!product) {
    return (
      <div className="p-10">
        Producto no encontrado
      </div>
    )
  }

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Imagen */}
        <div>
          <img
            src={
              product.image ||
              "https://via.placeholder.com/500"
            }
            alt={product.title}
            className="w-full rounded-2xl shadow-lg"
          />
        </div>

        {/* Información */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">
            {product.title}
          </h1>

          <p className="text-gray-500">
            {product.category?.name}
          </p>

          <p className="text-2xl font-semibold">
            ${product.price}
          </p>

          <p className="text-gray-700">
            {product.description}
          </p>

          <button className="bg-black text-white p-3 rounded-xl hover:opacity-90">
            Añadir al carrito
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6">
          Reviews
        </h2>

        <div className="flex flex-col gap-4">
          {product.reviews?.length > 0 ? (
            product.reviews.map((review) => (
              <div
                key={review._id}
                className="border p-4 rounded-xl"
              >
                <p className="font-semibold">
                  {review.user?.username}
                </p>

                <p>
                  ⭐ {review.rating}/5
                </p>

                <p>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>
              No hay reviews todavía
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsPage