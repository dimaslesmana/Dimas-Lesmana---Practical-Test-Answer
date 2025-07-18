// components/BeanCard.tsx

type BeanProps = {
  name: string;
  description: string;
  salePrice: number;
};

export default function BeanCard({ name, description, salePrice }: BeanProps) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition mb-4 bg-white">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-sm text-gray-700 mb-2">
        Price: ${salePrice.toFixed(2)}
      </p>
      <p>{description}</p>
    </div>
  );
}
