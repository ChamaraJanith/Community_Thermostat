import { useAnimatedCount } from '../../hooks/useAnimatedCount';
import { MessageSquare, ArrowUp } from 'lucide-react';

const MessagesCard = ({ total, last24h }) => {
  const animatedTotal = useAnimatedCount(total, 1200);
  const percentage = Math.round((last24h / total) * 100);

  return (
    <div className="cyber-card rounded-sm p-6 hover:border-cyber-cyan/60 transition-all duration-300 animate-slide-up border-cyber-cyan/30 relative overflow-hidden" style={{ animationDelay: '0.1s' }}>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-cyber-cyan/90 text-xs font-mono uppercase tracking-widest font-bold">▸ MESSAGES ANALYZED</p>
            <p className="text-white/30 text-xs font-mono mt-2">LAST 24H: {last24h.toLocaleString()}</p>
          </div>
          <MessageSquare className="w-6 h-6 text-cyber-cyan cyber-glow" />
        </div>
        
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-5xl font-bold font-mono text-cyber-cyan data-display cyber-glow">
            {animatedTotal.toLocaleString()}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-3 py-1 bg-cyber-green/20 rounded-sm border border-cyber-green/40">
            <ArrowUp className="w-3 h-3 text-cyber-green" />
            <span className="text-cyber-green text-xs font-mono font-bold">{percentage}%</span>
          </div>
          <span className="text-white/50 text-xs font-mono">IN 24H</span>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4 h-1.5 bg-white/5 rounded-sm overflow-hidden border border-cyber-cyan/20">
          <div 
            className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-green rounded-sm transition-all duration-1000"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MessagesCard;
