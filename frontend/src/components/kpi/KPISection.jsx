import MoodScoreCard from './MoodScoreCard';
import MessagesCard from './MessagesCard';
import PeakPositivityCard from './PeakPositivityCard';
import PrivacyStatusCard from './PrivacyStatusCard';

const KPISection = ({ kpiData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 py-6">
      <MoodScoreCard score={kpiData.currentMoodScore} />
      <MessagesCard 
        total={kpiData.messagesAnalyzed} 
        last24h={kpiData.messagesLast24h} 
      />
      <PeakPositivityCard 
        time={kpiData.peakPositivityTime} 
        score={kpiData.peakPositivityScore} 
      />
      <PrivacyStatusCard 
        status={kpiData.privacyStatus} 
        rawMessagesStored={kpiData.rawMessagesStored} 
      />
    </div>
  );
};

export default KPISection;
