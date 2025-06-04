// PricingCard.tsx
import { CheckCircle } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  buttonText: string;
  active: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  features,
  buttonText,
  active,
}) => {
  return (
    <div className="min-w-[85%] sm:min-w-0 sm:w-1/2 bg-[#F2F4F7] rounded-3xl shadow-md p-6 flex flex-col justify-between mx-2">
      <div>
        <h3 className="text-2xl font-semibold mb-1">{price}</h3>
        <p className="text-gray-500 mb-4">{title}</p>
        <ul className="space-y-3 text-gray-700">
          {features.map((feat, i) => (
            <li key={i} className="flex items-center">
              <CheckCircle className="text-gray-600 mr-2" size={18} />
              {feat}
            </li>
          ))}
        </ul>
      </div>
      <button
        className={`mt-6 w-full text-sm font-semibold py-2 rounded-full ${
          active
            ? "bg-[#E0E1E8] text-gray-600"
            : "bg-[#00C2CB] text-white hover:bg-[#00b0b8]"
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;
