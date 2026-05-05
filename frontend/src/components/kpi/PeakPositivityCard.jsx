import { TrendingUp, Zap } from 'lucide-react';

const PeakPositivityCard = ({ time, score }) => {
  return (
    <div className="cyber-card rounded-sm p-6 hover:border-cyber-cyan/60 transition-all duration-300 animate-slide-up border-cyber-cyan/30 relative overflow-hidden" style={{ animationDelay: '0.2s' }}>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-cyber-cyan/90 text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-2">
              ▸ PEAK POSITIVITY
              <Zap className="w-3 h-3 animate-pulse" />
            </p>
            <p className="text-white/30 text-xs font-mono mt-2">HAPPIEST MOMENT TODAY</p>
          </div>
          <TrendingUp className="w-6 h-6 text-cyber-green cyber-glow" />
        </div>
        
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-5xl font-bold font-mono text-cyber-green data-display cyber-glow">
            {time}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white/50 text-xs font-mono">SCORE:</span>
            <span className="text-cyber-green font-bold text-lg font-mono">+{score}</span>
          </div>
          
          {/* Score visualization */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className={`w-1.5 h-6 rounded-sm transition-all duration-300 ${
                  i < Math.floor(score / 20) 
                    ? 'bg-cyber-green' 
                    : 'bg-white/10'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeakPositivityCard;
