import { getActiveProducts, Product } from "@/lib/data";
import { Badge } from "@/components/Badge";
import { getImageUrl } from "@/lib/image-url";
import Image from "next/image";

export default async function StockDisplay() {
  const products = await getActiveProducts();

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-2xl font-bold font-spartan text-gray-700 mb-2">
          Aucun produit disponible
        </h3>
        <p className="text-gray-500">
          Revenez bientôt pour découvrir nos produits !
        </p>
      </div>
    );
  }

  const count = products.length;
  let gridColsClass = "lg:grid-cols-4";
  
  if (count > 0) {
    if (count <= 3) {
      gridColsClass = "lg:grid-cols-3";
    } else if (count === 4) {
      gridColsClass = "lg:grid-cols-4";
    } else if (count === 5 || count === 6) {
      gridColsClass = "lg:grid-cols-3";
    } else if (count % 3 === 0 && count % 4 !== 0) {
      gridColsClass = "lg:grid-cols-3";
    } else {
      gridColsClass = "lg:grid-cols-4";
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridColsClass} gap-6`}>
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const isOutOfStock = product.quantity === 0;
  const isLowStock = product.quantity > 0 && product.quantity <= 3;

  return (
    <div
      className={`
        relative bg-white rounded-2xl overflow-hidden transition-all duration-300 group
        ${isOutOfStock 
          ? 'opacity-70 border-2 border-gray-200' 
          : 'border-2 border-transparent hover:border-brand-yellow hover:shadow-xl hover:-translate-y-2'
        }
      `}
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      <div className={`
        relative w-full aspect-square overflow-hidden
        ${isOutOfStock ? 'bg-gray-100' : 'bg-gradient-to-br from-brand-pale/50 to-brand-yellow/20'}
      `}>
        {product.image ? (
          <Image
            src={getImageUrl(product.image)}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={`
              object-contain p-4 transition-transform duration-500
              ${isOutOfStock ? 'grayscale' : 'group-hover:scale-110'}
            `}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-7xl opacity-50">
              {product.type === 'boisson' ? '🥤' : 
               product.type === 'snack' ? '🍫' : 
               product.type === 'dessert' ? '🥞' : '📦'}
            </span>
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-brand-red text-white font-bold px-6 py-2 rounded-full text-sm uppercase tracking-wide shadow-lg transform -rotate-12">
              Rupture
            </span>
          </div>
        )}

        {isLowStock && !isOutOfStock && (
          <div className="absolute top-3 left-3">
            <span className="bg-orange-500 text-white font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide shadow-md animate-pulse">
              Stock limité
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3">
          <div className={`
            font-bold px-4 py-2 rounded-xl text-lg shadow-lg backdrop-blur-sm
            ${isOutOfStock 
              ? 'bg-gray-800/80 text-white' 
              : 'bg-brand-yellow text-brand-black border-2 border-brand-black/10'
            }
          `}>
            {product.price.toFixed(2)}€
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <Badge variant="yellow" className="text-xs uppercase tracking-wider font-bold">
            {product.type}
          </Badge>
        </div>

        <h3 className={`
          text-xl font-bold font-spartan mb-4 leading-tight transition-colors
          ${isOutOfStock ? 'text-gray-500' : 'text-brand-black group-hover:text-brand-red'}
        `}>
          {product.name}
        </h3>

        <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
          <span className="text-sm font-semibold text-gray-500">
            Disponible
          </span>
          
          <div className="flex items-center gap-2">
            <div className={`
              w-3 h-3 rounded-full
              ${isOutOfStock ? 'bg-red-500' : isLowStock ? 'bg-orange-500' : 'bg-green-500'}
            `} />
            <span className={`
              font-chunk text-2xl
              ${isOutOfStock ? 'text-red-500' : isLowStock ? 'text-orange-500' : 'text-brand-black'}
            `}>
              {product.quantity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
