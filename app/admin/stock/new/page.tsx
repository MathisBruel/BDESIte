import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-spartan">
          Nouveau <span className="text-brand-red">Produit</span>
        </h1>
        <p className="text-gray-500 mt-1">Ajoutez un nouveau produit à la confiserie</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <ProductForm />
      </div>
    </div>
  );
}
