import { useState, useEffect, useCallback } from 'react';
import Header from './components/layout/Header';
import SentimentBar from './components/layout/SentimentBar';
import DashboardLayout from './components/layout/DashboardLayout';
import KPISection from './components/kpi/KPISection';
import ChartsSection from './components/charts/ChartsSection';
import BottomSection from './components/bottom/BottomSection';
import {
  sentimentTimeline as mockTimeline,
  emotionData as mockEmotions,
  activityHeatmap as mockHeatmap,
  privacyAuditLog as mockAuditLog,
  kpiData as mockKpiData,
  communities as mockCommunities,
} from './mockData';
import { sentimentAPI, communityAPI } from './services/api';

// How often to refresh data (ms)
const REFRESH_INTERVAL = 15000;

function App() {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [dateRange, setDateRange] = useState('Today');
  const [communities, setCommunities] = useState(mockCommunities);
  const [isLive, setIsLive] = useState(false); // true = backend connected

  // Dashboard data state
  const [timelineData, setTimelineData] = useState(mockTimeline);
  const [emotionData, setEmotionData] = useState(mockEmotions);
  const [heatmapData, setHeatmapData] = useState(mockHeatmap);
  const [auditLogData, setAuditLogData] = useState(mockAuditLog);
  const [kpiData, setKpiData] = useState(mockKpiData);
  const [loading, setLoading] = useState(false);

  // ── Load communities from backend ──────────────────────────────────
  useEffect(() => {
    const loadCommunities = async () => {
      try {
        const res = await communityAPI.getAll();
        if (res.success && res.data.length > 0) {
          const mapped = res.data.map((c) => ({ id: c._id, name: c.name }));
          setCommunities(mapped);
          setSelectedCommunity(mapped[0].id);
          setIsLive(true);
        }
      } catch {
        // Backend not reachable — stay on mock data
        setIsLive(false);
        setSelectedCommunity(mockCommunities[0].id);
      }
    };
    loadCommunities();
  }, []);

  // ── Fetch all dashboard data for selected community ────────────────
  const fetchDashboardData = useCallback(async () => {
    if (!selectedCommunity || !isLive) return;

    setLoading(true);
    try {
      const hours = dateRange === '7D' ? 168 : dateRange === '30D' ? 720 : 24;

      const [kpi, timeline, emotions, heatmap, audit] = await Promise.all([
        sentimentAPI.getKPI(selectedCommunity),
        sentimentAPI.getTimeline(selectedCommunity, hours),
        sentimentAPI.getEmotions(selectedCommunity, hours),
        sentimentAPI.getHeatmap(selectedCommunity),
        sentimentAPI.getAuditLog(selectedCommunity, 10),
      ]);

      if (kpi.success) {
        setKpiData({
          currentMoodScore: kpi.data.currentMoodScore,
          messagesAnalyzed: kpi.data.messagesAnalyzed,
          messagesLast24h: kpi.data.messagesLast24h,
          peakPositivityTime: kpi.data.peakPositivityTime,
          privacyStatus: kpi.data.privacyStatus,
          rawMessagesStored: kpi.data.rawMessagesStored,
        });
      }

      if (timeline.success && timeline.data.length > 0) {
        setTimelineData(timeline.data);
      }

      if (emotions.success && emotions.data.length > 0) {
        setEmotionData(emotions.data);
      }

      if (heatmap.success) {
        setHeatmapData(heatmap.data);
      }

      if (audit.success) {
        setAuditLogData(audit.data);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedCommunity, isLive, dateRange]);

  // Fetch on community/dateRange change
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Auto-refresh every 15 seconds when live
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(fetchDashboardData, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [isLive, fetchDashboardData]);

  const currentScore = kpiData?.currentMoodScore ?? 0;

  return (
    <DashboardLayout>
      <Header
        selectedCommunity={selectedCommunity}
        onCommunityChange={(id) => {
          setSelectedCommunity(id);
        }}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        communities={communities}
        isLive={isLive}
        loading={loading}
      />

      <SentimentBar score={currentScore} />

      <div className="pb-8">
        <KPISection kpiData={kpiData} />
        <ChartsSection
          timelineData={timelineData}
          emotionData={emotionData}
        />
        <BottomSection
          heatmapData={heatmapData}
          auditLogData={auditLogData}
        />
      </div>
    </DashboardLayout>
  );
}

export default App;
