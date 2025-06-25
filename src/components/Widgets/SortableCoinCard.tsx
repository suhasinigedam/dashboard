// src/components/Widgets/SortableCoinCard.tsx
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

type Coin = {
  id: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
};

const SortableCoinCard: React.FC<{ coin: Coin }> = ({ coin }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: coin.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="dark:bg-gray-900 dark:text-white bg-white text-black rounded border border-gray-300 shadow p-4 cursor-grab w-full max-w-[320px]"
    >
      <div
        {...listeners}
        className="relative top-2 right-2 cursor-grab text-gray-400 hover:text-gray-600"
        aria-label="Drag handle"
        role="button"
        tabIndex={0}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 7h1M4 12h1M4 17h1M9 7h1M9 12h1M9 17h1M14 7h1M14 12h1M14 17h1M19 7h1M19 12h1M19 17h1"
          />
        </svg>
      </div>
      <div className="flex items-center space-x-2 mb-2">
        <img src={coin.image} alt={coin.name} className="w-6 h-6" />
        <h3 className="dark:text-white text-black font-bold">{coin.name}</h3>
      </div>
      <p className="dark:text-white text-black">
        Price: ${coin.current_price.toLocaleString()}
      </p>
      <p
        className={
          coin.price_change_percentage_24h >= 0
            ? 'text-green-600'
            : 'text-red-500'
        }
      >
        24h: {coin.price_change_percentage_24h.toFixed(2)}%
      </p>
    </div>
  );
};

export default SortableCoinCard;
