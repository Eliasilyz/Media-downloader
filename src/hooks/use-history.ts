import { useState, useEffect, useCallback } from "react";

export interface HistoryItem {
  id: string;
  url: string;
  platform: string;
  title: string | null | undefined;
  thumbnail: string | null | undefined;
  timestamp: number;
}

const HISTORY_KEY = "saveflow_history";

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
  }, []);

  const addHistory = useCallback((item: Omit<HistoryItem, "id" | "timestamp">) => {
    setHistory((prev) => {
      const newItem: HistoryItem = {
        ...item,
        id: Math.random().toString(36).substring(2, 9),
        timestamp: Date.now(),
      };
      
      const updated = [newItem, ...prev.filter(h => h.url !== item.url)].slice(0, 10);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save history", e);
      }
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch (e) {
      console.error("Failed to clear history", e);
    }
  }, []);

  return { history, addHistory, clearHistory };
}
