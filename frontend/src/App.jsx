import { useState } from 'react';
import Header from './components/layout/Header';
import SentimentBar from './components/layout/SentimentBar';
import DashboardLayout from './components/layout/DashboardLayout';
import KPISection from './components/kpi/KPISection';
import ChartsSection from './components/charts/ChartsSection';
import BottomSection from './components/bottom/BottomSection';
import { 
  sentimentTimeline, 
  emotionData, 
  activityHeatmap, 
  privacyAuditLog, 
  kpiData,
  communities 
} from './mockData';
import { useSentiment } from './hooks/useSentiment';

function App() {
  const [selectedCommunity, setSelectedCommunity] = useState(1);
  const [dateRange, setDateRange] = useState('Today');
  
  const { currentScore } = useSentiment(dateRange);

  return (
    <DashboardLayout>
      <Header 
        selectedCommunity={selectedCommunity}
        onCommunityChange={setSelectedCommunity}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        communities={communities}
      />
      
      <SentimentBar score={currentScore} />
      
      <div className="pb-8">
        <KPISection kpiData={kpiData} />
        <ChartsSection 
          timelineData={sentimentTimeline} 
          emotionData={emotionData} 
        />
        <BottomSection 
          heatmapData={activityHeatmap} 
          auditLogData={privacyAuditLog} 
        />
      </div>
    </DashboardLayout>
  );
}

export default App;
