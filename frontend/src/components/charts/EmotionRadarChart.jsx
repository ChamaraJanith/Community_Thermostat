import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Brain, Sparkles } from 'lucide-react';

const EmotionRadarChart = ({ data }) => {
  return (
    <div className="relative group glass rounded-2xl p-6 hover:scale-[1.02] transition-all duration-500 border border-cyber-purple/40 hover:border-cyber-purple/80 h-full overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/10 via-transparent to-cyber-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Holographic overlay */}
      <div className="absolute inset-0 holographic opacity-20"></div>
      
      {/* Floating sparkles */}
      <div className="absolute top-4 right-4 opacity-50 group-hover:opacity-100 transition-opacity">
        <Sparkles className="w-5 h-5 text-cyber-purple animate-pulse" />
      </div>
      
      <div className="relative z-10">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white font-space flex items-center gap-3">
            <Brain className="w-6 h-6 text-cyber-purple animate-pulse" />
            Emotion Breakdown
          </h3>
          <p className="text-cyber-purple/70 text-sm font-mono mt-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-cyber-purple rounded-full animate-pulse"></span>
            Psychological profile • AI analyzed
          </p>
        </div>
        
        <ResponsiveContainer width="100%" height={320}>
          <RadarChart data={data}>
            <defs>
              <filter id="radarGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <PolarGrid 
              stroke="#1e2749" 
              strokeWidth={2}
              strokeOpacity={0.5}
            />
            <PolarAngleAxis 
              dataKey="emotion" 
              stroke="#8a2be2"
              style={{ 
                fontSize: '13px', 
                fontFamily: 'IBM Plex Mono',
                fontWeight: 'bold'
              }}
              tick={{ fill: '#8a2be2' }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              stroke="#8a2be2"
              style={{ 
                fontSize: '11px', 
                fontFamily: 'IBM Plex Mono',
                fontWeight: 'bold'
              }}
              tick={{ fill: '#8a2be2' }}
            />
            <Radar 
              name="Emotions" 
              dataKey="value" 
              stroke="#00ff88" 
              fill="#00ff88" 
              fillOpacity={0.7}
              strokeWidth={3}
              filter="url(#radarGlow)"
              animationDuration={2000}
            />
          </RadarChart>
        </ResponsiveContainer>
        
        {/* Emotion legend */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {data.map((emotion, index) => (
            <div 
              key={emotion.emotion}
              className="flex items-center justify-between px-3 py-2 glass rounded-lg border border-cyber-purple/30 hover:border-cyber-purple/60 transition-all"
            >
              <span className="text-xs font-mono text-white/80">{emotion.emotion}</span>
              <span className="text-sm font-mono font-bold text-cyber-green">{emotion.value}%</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-cyber-purple/20 to-transparent rounded-bl-full"></div>
    </div>
  );
};

export default EmotionRadarChart;
