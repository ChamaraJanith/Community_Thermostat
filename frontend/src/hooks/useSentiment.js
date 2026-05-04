import { useMemo } from 'react';
import { sentimentTimeline } from '../mockData';

export const useSentiment = (dateRange = '24h') => {
  const filteredData = useMemo(() => {
    // For now, return all data since we only have 24h mock data
    // In production, this would filter based on dateRange
    return sentimentTimeline;
  }, [dateRange]);

  const currentScore = useMemo(() => {
    if (filteredData.length === 0) return 0;
    return filteredData[filteredData.length - 1].score;
  }, [filteredData]);

  const averageScore = useMemo(() => {
    if (filteredData.length === 0) return 0;
    const sum = filteredData.reduce((acc, item) => acc + item.score, 0);
    return Math.round(sum / filteredData.length);
  }, [filteredData]);

  return {
    data: filteredData,
    currentScore,
    averageScore,
  };
};
