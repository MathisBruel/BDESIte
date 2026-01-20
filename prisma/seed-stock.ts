import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

interface StockProduct {
  name: string;
  type: string;
  quantity: number;
  price: number;
  emoji?: string;
}

interface StockData {
  products: StockProduct[];
}

async function main() {
  console.log("🍫 Seeding stock products...");

  const stockPath = path.join(process.cwd(), "data", "stock.json");
  
  if (!fs.existsSync(stockPath)) {
    console.log("⚠️ stock.json not found, skipping stock seed");
    return;
  }

  const stockData: StockData = JSON.parse(fs.readFileSync(stockPath, "utf-8"));

  for (let i = 0; i < stockData.products.length; i++) {
    const product = stockData.products[i];
    
    const existing = await prisma.product.findFirst({
      where: { name: product.name },
    });

    if (existing) {
      console.log(`⏭️ Product "${product.name}" already exists, skipping`);
      continue;
    }

    await prisma.product.create({
      data: {
        name: product.name,
        type: product.type,
        quantity: product.quantity,
        price: product.price,
        image: null,
        active: true,
        order: i,
      },
    });

    console.log(`✅ Created product: ${product.name}`);
  }

  console.log("🎉 Stock seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
