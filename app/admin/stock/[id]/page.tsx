import { getProductById } from "@/lib/data";
import { ProductForm } from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-spartan">
          Modifier <span className="text-brand-red">{product.name}</span>
        </h1>
        <p className="text-gray-500 mt-1">Modifiez les informations du produit</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
