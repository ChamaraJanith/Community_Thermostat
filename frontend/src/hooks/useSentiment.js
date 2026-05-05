// This hook is kept for backward compatibility.
// Data fetching is now handled in App.jsx via the API service.
import { useMemo } from 'react';

export const useSentiment = (data = []) => {
  const currentScore = useMemo(() => {
    if (!data || data.length === 0) return 0;
    return data[data.length - 1].score ?? 0;
  }, [data]);

  const averageScore = useMemo(() => {
    if (!data || data.length === 0) return 0;
    const sum = data.reduce((acc, item) => acc + (item.score ?? 0), 0);
    return Math.round(sum / data.length);
  }, [data]);

  return { currentScore, averageScore };
};
