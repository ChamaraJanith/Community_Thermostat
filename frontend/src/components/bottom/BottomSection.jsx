import ActivityHeatmap from './ActivityHeatmap';
import PrivacyAuditLog from './PrivacyAuditLog';

const BottomSection = ({ heatmapData, auditLogData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 py-6">
      <ActivityHeatmap data={heatmapData} />
      <PrivacyAuditLog data={auditLogData} />
    </div>
  );
};

export default BottomSection;
