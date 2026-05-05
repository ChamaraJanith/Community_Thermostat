import { useAnimatedCount } from '../../hooks/useAnimatedCount';
import { scoreToMood } from '../../utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const MoodScoreCard = ({ score }) => {
  const animatedScore = useAnimatedCount(score, 1500);
  const mood = scoreToMood(score);

  const getTrendIcon = () => {
    if (score > 20) return <TrendingUp className="w-4 h-4" />;
    if (score < -20) return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  return (
    <div className="cyber-card rounded-sm p-6 hover:border-cyber-cyan/60 transition-all duration-300 animate-slide-up border-cyber-cyan/30 relative overflow-hidden group">
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-cyber-cyan/90 text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-2">
              ▸ CURRENT MOOD
              {getTrendIcon()}
            </p>
            <p className="text-white/30 text-xs font-mono mt-2">RANGE: -100 TO +100</p>
          </div>
          <span className="text-4xl">{mood.emoji}</span>
        </div>
        
        <div className="flex items-baseline gap-2 mb-4">
          <span 
            className="text-6xl font-bold font-mono data-display cyber-glow" 
            style={{ color: mood.color }}
          >
            {animatedScore > 0 ? '+' : ''}{animatedScore}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-bold font-mono border ${mood.color} border-current bg-black/30`}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: mood.color }}></div>
            {mood.label.toUpperCase()}
          </div>
          
          {/* Status bar */}
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="w-1 h-6 rounded-sm transition-all duration-300"
                style={{ 
                  background: mood.color,
                  opacity: i < Math.abs(animatedScore) / 20 ? 1 : 0.2
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodScoreCard;
