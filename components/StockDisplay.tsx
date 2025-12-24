import { promises as fs } from 'fs';
import path from 'path';
import { Badge } from "@/components/Badge";

interface Product {
  name: string;
  type: string;
  quantity: number;
  price: number;
  emoji?: string;
}

interface StockData {
  products: Product[];
}

export default async function StockDisplay() {
  const filePath = path.join(process.cwd(), 'data', 'stock.json');
  let data: StockData = { products: [] };

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    data = JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading stock data:', error);
    return (
      <div className="p-4 text-brand-red font-chunk text-center">
        Erreur de chargement du stock.
      </div>
    );
  }

  // Adaptive Grid Logic
  const count = data.products.length;
  let gridColsClass = "lg:grid-cols-4"; // Default max

  // Logic: If divisible by 3 and NOT divisible by 4 (e.g. 6, 9), OR if less than or equal to 6, favor 3 cols.
  // Exception: if count is 4, use 4 cols.
  if (count > 0) {
      if (count <= 3) {
          gridColsClass = "lg:grid-cols-3"; // or even fewer, but 3 is a good base
      } else if (count === 4) {
          gridColsClass = "lg:grid-cols-4";
      } else if (count === 5 || count === 6) {
          gridColsClass = "lg:grid-cols-3"; // 2 rows of 3
      } else if (count % 3 === 0 && count % 4 !== 0) {
          gridColsClass = "lg:grid-cols-3";
      } else {
          gridColsClass = "lg:grid-cols-4";
      }
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridColsClass} gap-8`}>
        {data.products.map((product, index) => {
          const isOutOfStock = product.quantity === 0;

          // Emoji logic: Manual > Type-based Fallback
          let displayEmoji = product.emoji;
          if (!displayEmoji) {
               displayEmoji = product.type === 'boisson' ? '🥤' : 
                              product.type === 'snack' ? '🍫' : 
                              product.type === 'dessert' ? '🥞' : '📦';
          }

          return (
            <div 
              key={`${product.name}-${index}`}
              className={`
                bg-white border text-center border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full group
                ${isOutOfStock ? 'opacity-80' : 'hover:-translate-y-1'}
              `}
            >
              <div className={`relative w-full h-32 flex items-center justify-center ${isOutOfStock ? 'bg-gray-100' : 'bg-brand-pale/30'}`}>
                 <div className="text-6xl transform group-hover:scale-110 transition-transform duration-300">
                    {displayEmoji}
                 </div>
                 
                 {isOutOfStock && (
                    <div className="absolute top-2 right-2">
                        <Badge variant="red" className="animate-pulse">Rupture</Badge>
                    </div>
                 )}
                 
                 {!isOutOfStock && (
                    <div className="absolute top-2 right-2">
                        <div className="bg-brand-yellow text-brand-black font-bold px-3 py-1 rounded-full shadow-sm text-sm border-2 border-brand-black/10">
                            {product.price.toFixed(2)}€
                        </div>
                    </div>
                 )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                     <Badge variant="yellow" className="mb-3 uppercase text-xs tracking-wider">
                        {product.type}
                     </Badge>
                     <h3 className="text-xl font-bold font-spartan text-brand-black mb-1 group-hover:text-brand-red transition-colors">
                        {product.name}
                     </h3>
                     {/* Price display for out of stock items */}
                     {isOutOfStock && (
                        <p className="text-gray-400 font-medium text-sm">
                            {product.price.toFixed(2)}€
                        </p>
                     )}
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-500">
                    En stock
                  </span>
                  
                  <span className={`
                    font-chunk text-2xl
                    ${isOutOfStock ? 'text-brand-red' : 'text-brand-black'}
                  `}>
                    {product.quantity}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
