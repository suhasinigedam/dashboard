import React, { useEffect, useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hook";
import { fetchWeather } from "../../store/weatherSlice";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import SortableWeatherCard from "./SortableWeatherCard";

const WeatherWidget: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.weather);
  const [search, setSearch] = useState(""); // start empty
  const [items, setItems] = useState<string[]>([]);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Debounce search input and dispatch fetchWeather on mount and on search change
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      dispatch(fetchWeather(search));
    }, 500);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [search, dispatch]);

  // When Redux data changes, update items for ordering
  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setItems(data.map((city) => city.name));
    } else {
      setItems([]);
    }
  }, [data]);

  // Handle drag & drop reorder
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((currentItems) => {
        const oldIndex = currentItems.indexOf(active.id as string);
        const newIndex = currentItems.indexOf(over.id as string);
        return arrayMove(currentItems, oldIndex, newIndex);
      });
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search city..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="dark:bg-gray-900 dark:text-gray-300 bg-white text-black mb-4 w-full max-w-md px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {loading && <p>Loading weather data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {items.length > 0 && (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {items.map((name) => {
                const city = data.find((c) => c.name === name);
                if (!city) return null;
                return <SortableWeatherCard key={city.id} city={city} />;
              })}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {!loading && items.length === 0 && !error && (
        <p className="text-gray-500">No city selected or found</p>
      )}
    </div>
  );
};

export default WeatherWidget;
