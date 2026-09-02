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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
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
    <div className={`group bg-white border flex flex-col transition-all duration-200 ${
      isOutOfStock
        ? "border-brand-noir/8 opacity-55"
        : "border-brand-noir/10 hover:border-brand-rouge hover:shadow-md"
    }`}>

      {/* Photo */}
      <div className="relative h-44 overflow-hidden bg-brand-craie shrink-0">
        {product.image ? (
          <Image
            src={getImageUrl(product.image)}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
            quality={75}
            loading="lazy"
            placeholder="blur"
            blurDataURL={BLUR_CRAIE}
            className={`object-contain p-6 transition-transform duration-500 ${
              !isOutOfStock ? "group-hover:scale-105" : "grayscale"
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-spartan font-black text-6xl text-brand-noir/8">?</span>
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-end justify-start p-3">
            <span className="font-spartan font-black text-xs uppercase tracking-widest px-2.5 py-1 bg-white/95 text-brand-noir/40 border border-brand-noir/10">
              Rupture
            </span>
          </div>
        )}

        {isLowStock && (
          <div className="absolute top-0 right-0">
            <span className="font-spartan font-bold text-xs uppercase tracking-widest px-2.5 py-1 bg-brand-or text-brand-noir block">
              Limité
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 border-t border-brand-noir/8">
        <div className="font-spartan font-black text-xs uppercase tracking-widest text-brand-rouge mb-1">
          {product.type}
        </div>
        <h3 className={`font-spartan font-black text-sm sm:text-base leading-tight flex-1 mb-4 ${
          isOutOfStock ? "text-brand-noir/35" : "text-brand-noir"
        }`}>
          {product.name}
        </h3>

        <div className="flex items-center justify-between pt-3 border-t border-brand-noir/8">
          <div className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
              isOutOfStock ? "bg-brand-noir/20" : isLowStock ? "bg-brand-or" : "bg-green-500"
            }`} />
            <span className="font-lato text-xs text-brand-noir/40 hidden sm:block">
              {isOutOfStock ? "Indisponible" : `${product.quantity} en stock`}
            </span>
          </div>
          <div className="font-spartan font-black text-lg text-brand-noir">
            {product.price.toFixed(2)}
            <span className="text-xs font-lato font-normal text-brand-noir/40 ml-0.5">€</span>
          </div>
        </div>
      </div>

    </div>
  );
}
