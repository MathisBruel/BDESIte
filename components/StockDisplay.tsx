import { getActiveProducts, Product } from "@/lib/data";
import { getImageUrl } from "@/lib/image-url";
import { BLUR_CRAIE } from "@/lib/image-blur";
import Image from "next/image";

export default async function StockDisplay() {
  const products = await getActiveProducts();

  if (products.length === 0) {
    return (
      <div className="py-20 text-center border border-brand-noir/10">
        <p className="font-spartan font-black text-brand-noir/20 text-sm uppercase tracking-widest">
          Aucun produit disponible pour le moment
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brand-noir/8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const isOutOfStock = product.quantity === 0;
  const isLowStock = product.quantity > 0 && product.quantity <= 3;

  return (
    <div className={`group bg-white flex flex-col transition-colors ${isOutOfStock ? "opacity-60" : "hover:border-brand-rouge"}`}>

      {/* Photo */}
      <div className="relative h-44 overflow-hidden bg-brand-craie shrink-0">
        {product.image ? (
          <Image
            src={getImageUrl(product.image)}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            quality={75}
            loading="lazy"
            placeholder="blur"
            blurDataURL={BLUR_CRAIE}
            className={`object-contain p-6 transition-transform duration-500 ${isOutOfStock ? "grayscale" : "group-hover:scale-105"}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-spartan font-black text-5xl text-brand-noir/10">?</span>
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute top-3 right-3">
            <span className="stamp text-xs px-2 py-0.5 bg-white/90 text-brand-noir">
              Rupture
            </span>
          </div>
        )}

        {isLowStock && (
          <div className="absolute top-3 right-3">
            <span className="font-spartan font-bold text-xs uppercase tracking-widest px-2 py-1 bg-brand-or text-brand-noir">
              Stock limité
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 border-t border-brand-noir/8">
        <div className="font-spartan font-black text-xs uppercase tracking-widest text-brand-rouge mb-1">
          {product.type}
        </div>
        <h3 className={`font-spartan font-black text-base leading-tight flex-1 ${isOutOfStock ? "text-brand-noir/40" : "text-brand-noir"}`}>
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-brand-noir/8">
          {/* Stock */}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isOutOfStock ? "bg-brand-rouge" : isLowStock ? "bg-brand-or" : "bg-green-500"}`} />
            <span className="font-lato text-xs text-brand-noir/45">
              {isOutOfStock ? "Rupture" : `${product.quantity} en stock`}
            </span>
          </div>
          {/* Prix */}
          <div className="font-spartan font-black text-lg text-brand-noir">
            {product.price.toFixed(2)}<span className="text-sm text-brand-noir/50 font-lato font-normal ml-0.5">€</span>
          </div>
        </div>
      </div>

    </div>
  );
}
