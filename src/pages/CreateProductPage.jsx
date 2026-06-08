import BackButton from "../components/BackButton";

function CreateProductPage() {
  return (
    <div className="p-10">
      <div style={{ marginBottom: "24px" }}>
        <BackButton />
      </div>
      <h1 className="text-4xl font-bold">Crear Producto</h1>
    </div>
  );
}

export default CreateProductPage;
