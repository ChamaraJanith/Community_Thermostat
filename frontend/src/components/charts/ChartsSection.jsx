import SentimentTimeline from './SentimentTimeline';
import EmotionRadarChart from './EmotionRadarChart';

const ChartsSection = ({ timelineData, emotionData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 py-6">
      <div className="lg:col-span-2">
        <SentimentTimeline data={timelineData} />
      </div>
      <div className="lg:col-span-1">
        <EmotionRadarChart data={emotionData} />
      </div>
    </div>
  );
};

export default ChartsSection;
