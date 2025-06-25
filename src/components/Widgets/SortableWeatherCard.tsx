import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

type WeatherCity = {
  name: string;
  weather: { description: string }[];
  main: { temp: number; humidity: number };
};

const SortableWeatherCard: React.FC<{ city: WeatherCity }> = ({ city }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: city.name });

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
      <p className="dark:text-white text-black font-semibold">{city.name}</p>
      <p className="dark:text-white text-black">
        {city.weather[0]?.description}
      </p>
      <p className="dark:text-white text-black">
        Temperature: {city.main.temp} °C
      </p>
      <p className="dark:text-white text-black">
        Humidity: {city.main.humidity} %
      </p>
    </div>
  );
};

export default SortableWeatherCard;
