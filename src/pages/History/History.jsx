import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Cloud, Sun, CloudRain, Snowflake, X,
  Calendar, MapPin, Shirt, Sparkles, Loader2, AlertCircle
} from "lucide-react";
import api from "../../api";


const getIcon = (condition) => {
  if (condition === "Clear") return <Sun size={16} className="text-yellow-500" />;
  if (condition === "Rain") return <CloudRain size={16} className="text-blue-400" />;
  if (condition === "Cold" || condition === "Snow") return <Snowflake size={16} className="text-cyan-400" />;
  return <Cloud size={16} className="text-gray-400" />;
};

export default function HistoryPage() {
  const [historyData, setHistoryData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingLoadingMore] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const selectedItem = historyData.find(item => item._id === selectedId);

  const fetchHistory = async (pageNum) => {
    try {
      const res = await api.get(`/history?page=${pageNum}&limit=12`);

      const newItems = res.data.data;
      const pagination = res.data.pagination;
      setHistoryData(prev => pageNum === 1 ? newItems : [...prev, ...newItems]);
      setHasMore(pagination.hasMore);

    } catch (err) {
      console.error("Failed to load history", err);
    } finally {
      setIsLoading(false);
      setIsLoadingLoadingMore(false);
    }
  };


  useEffect(() => {
    fetchHistory(1);
  }, []);

  const handleLoadMore = () => {
    if (hasMore && !isLoadingMore) {
      setIsLoadingLoadingMore(true);
      const nextPage = page + 1;
      setPage(nextPage);
      fetchHistory(nextPage);
    }
  };

  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1024) setColumns(4);
      else if (window.innerWidth >= 768) setColumns(3);
      else if (window.innerWidth >= 640) setColumns(2);
      else setColumns(1);
    };
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const columnWrapper = useMemo(() => {
    const cols = Array.from({ length: columns }, () => []);
    historyData.forEach((item, index) => {
      cols[index % columns].push(item);
    });
    return cols;
  }, [columns, historyData]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-3 p-4 md:p-8">
      <div className="max-w-7xl mx-auto font-rosca mt-20 mb-8 flex items-center justify-center">
        <div>
          <h1 className="text-3xl font-bold justify-center text-center text-gray-900">Style Diary</h1>
          <p className="text-gray-500 text-sm mt-1">Your past looks & weather snapshots</p>
        </div>
      </div>

      {historyData.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center">
          <div className="bg-gray-100 p-4 rounded-full mb-4">
            <Sparkles className="text-gray-400 w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700">No history yet</h3>
          <p className="text-gray-500 max-w-xs mx-auto mt-1">
            Your daily outfits will appear here automatically starting tomorrow morning!
          </p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto flex gap-4 items-start">
          {columnWrapper.map((columnItems, colIndex) => (
            <div key={colIndex} className="flex-1 flex flex-col gap-4">
              {columnItems.map((item) => (
                <motion.div
                  key={item._id}
                  layoutId={`card-${item._id}`}
                  onClick={() => setSelectedId(item._id)}
                  className="relative group rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 cursor-pointer"
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold text-gray-700 shadow-sm z-10 border border-gray-100">
                    {getIcon(item.weather.condition)}
                    <span>{item.weather.temp}°</span>
                  </div>

                  <motion.img
                    layoutId={`image-${item._id}`}
                    src={item.outfitImageUrl}
                    alt="Outfit"
                    className="w-full h-auto object-cover block"
                  />

                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12">
                    <motion.p className="text-white font-bold text-sm">
                      {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </motion.p>
                    <p className="text-gray-300 text-[10px] uppercase tracking-wider font-medium truncate">
                      {item.weather.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      )}

      {hasMore && historyData.length > 0 && (
        <div className="mt-12 flex justify-center pb-10">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-600 font-medium rounded-full shadow-sm hover:bg-gray-50 hover:text-blue-600 transition-all disabled:opacity-50"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Loading...
              </>
            ) : (
              "Load More Looks"
            )}
          </button>
        </div>
      )}

      <AnimatePresence>
        {selectedId && selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
              <motion.div
                layoutId={`card-${selectedId}`}
                className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl pointer-events-auto max-h-[85vh] flex flex-col"
              >
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                  className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white rounded-full transition-all border border-white/10 shadow-sm"
                >
                  <X size={22} />
                </button>

                <div className="relative h-64 sm:h-80 shrink-0">
                  <motion.img
                    layoutId={`image-${selectedId}`}
                    src={selectedItem.outfitImageUrl}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                    <div className="flex items-center gap-2 text-blue-200 text-sm font-medium mb-1">
                      <Calendar size={14} />
                      {new Date(selectedItem.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      {selectedItem.weather.temp}°C
                      <span className="text-lg font-normal text-gray-300">| {selectedItem.weather.description}</span>
                    </h2>
                  </div>
                </div>

                <div className="p-6 sm:p-8 overflow-y-auto">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-6">
                    <p className="text-sm text-blue-800 font-medium flex gap-2">
                      <Sparkles size={16} className="shrink-0 mt-0.5" />
                      "{selectedItem.suggestions?.weatherTip || "No tip available."}"
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Shirt size={14} /> The Outfit
                      </h3>
                      <ul className="space-y-3">
                        {(selectedItem.suggestions?.outfit || []).length > 0 ? (
                          (selectedItem.suggestions?.outfit || []).map((text, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                              {text}
                            </li>
                          ))
                        ) : (
                          <p className="text-sm text-gray-400 italic">No outfit details saved.</p>
                        )}
                      </ul>
                    </div>
                    {(selectedItem.suggestions?.dontForget || []).length > 0 && (
                      <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Don't Forget</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.suggestions.dontForget.map((text, i) => (
                            <span key={i} className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-medium rounded-lg border border-orange-100">
                              {text}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}