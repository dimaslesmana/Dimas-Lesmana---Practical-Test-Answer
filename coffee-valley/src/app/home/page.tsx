"use client";
import BeanCard from "@/components/BeanCard";
import { beans } from "@/utils/dummyData";

export default function HomePage() {
  const beansOnSale = beans.filter((b) => b.salePrice >= 0);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Bean of the Day</h2>
      {beansOnSale.map((bean, i) => (
        <BeanCard
          key={i}
          name={bean.name}
          description={bean.description}
          salePrice={bean.salePrice}
        />
      ))}
    </div>
  );
}
