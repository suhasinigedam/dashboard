import React, { useEffect, useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hook";
import { fetchCryptoPrices } from "../../store/cryptoSlice";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import SortableCoinCard from "./SortableCoinCard";

const CryptoWidget: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.crypto);
  const [items, setItems] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<string[] | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Initial fetch of crypto prices
  useEffect(() => {
    dispatch(fetchCryptoPrices());
  }, [dispatch]);

  // When original data arrives, set initial items (only if no search)
  useEffect(() => {
    if (data.length > 0 && !search) {
      setItems(data.map((coin) => coin.id));
      setSearchResults(null);
    }
  }, [data, search]);

  // Debounced search API call
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (search.trim() === "") {
      // Clear search results to show all coins again
      setSearchResults(null);
      return;
    }

    debounceTimeout.current = setTimeout(() => {
      fetch(
        `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(
          search
        )}`
      )
        .then((res) => res.json())
        .then((result) => {
          if (result.coins && Array.isArray(result.coins)) {
            // Extract ids of coins matching the query
            const ids = result.coins.map((coin: any) => coin.id);
            setSearchResults(ids);
          } else {
            setSearchResults([]);
          }
        })
        .catch(() => {
          setSearchResults([]);
        });
    }, 500);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [search]);

  // Use searchResults if available, otherwise use items from store
  const displayedItems = searchResults ?? items;

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
        placeholder="Search cryptocurrencies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="dark:bg-gray-900 dark:text-gray-300 bg-white text-black mb-4 w-full max-w-md px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {loading && <p>Loading crypto data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={displayedItems} strategy={rectSortingStrategy}>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {displayedItems.length === 0 && !loading && (
              <p>No results found.</p>
            )}

            {displayedItems.map((id) => {
              const coin = data.find((c) => c.id === id);
              if (!coin) return null;
              return <SortableCoinCard key={coin.id} coin={coin} />;
            })}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default CryptoWidget;
