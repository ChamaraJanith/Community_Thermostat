import { getSentimentGradient } from '../../utils';

const SentimentBar = ({ score }) => {
  return (
    <div className="relative h-1 w-full overflow-hidden border-b border-cyber-cyan/30">
      {/* Main gradient bar */}
      <div 
        className="h-full gradient-bar relative z-10" 
        style={{ background: getSentimentGradient(score) }}
      >
        {/* Animated shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      </div>
      
      {/* Glow effect underneath */}
      <div 
        className="absolute inset-0 blur-sm opacity-40" 
        style={{ background: getSentimentGradient(score) }}
      ></div>
    </div>
  );
};

export default SentimentBar;
