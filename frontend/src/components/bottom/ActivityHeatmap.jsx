import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { scoreToColor } from '../../utils';
import { BarChart3, Clock, Zap } from 'lucide-react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="cyber-card rounded-sm p-3 border border-cyber-cyan/50 shadow-2xl">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-3 h-3 text-cyber-cyan" />
          <p className="text-cyber-cyan font-mono text-xs font-bold">Hour: {data.hour}:00</p>
        </div>
        <p className="text-white font-mono text-lg font-bold mb-1">
          {data.volume} msgs
        </p>
        <div className="flex items-center gap-2">
          <Zap className="w-3 h-3" style={{ color: scoreToColor(data.avgSentiment) }} />
          <p className="text-white/70 font-mono text-xs" style={{ color: scoreToColor(data.avgSentiment) }}>
            Avg: {data.avgSentiment > 0 ? '+' : ''}{data.avgSentiment}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const ActivityHeatmap = ({ data }) => {
  return (
    <div className="cyber-card rounded-sm p-6 hover:border-cyber-cyan/60 transition-all duration-300 border-cyber-cyan/30 relative overflow-hidden">
      <div className="relative z-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-cyber-cyan font-space flex items-center gap-3 cyber-glow">
              <BarChart3 className="w-6 h-6 text-cyber-cyan animate-pulse" />
              ACTIVITY HEATMAP
            </h3>
            <p className="text-cyber-cyan/60 text-xs font-mono mt-2 flex items-center gap-2">
              ▸ HOURLY MESSAGE VOLUME (0-23H) • COLOR-CODED BY SENTIMENT
            </p>
          </div>
          
          {/* Peak indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 cyber-border rounded-sm border-cyber-yellow/40">
            <Zap className="w-4 h-4 text-cyber-yellow animate-pulse" />
            <span className="text-xs font-mono text-cyber-yellow font-bold">PEAK HOURS</span>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <filter id="barGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a0033" strokeOpacity={0.3} />
            <XAxis 
              dataKey="hour" 
              stroke="#00ffc8" 
              style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono', fontWeight: 'bold' }}
              tick={{ fill: '#00ffc8' }}
            />
            <YAxis 
              stroke="#00ffc8" 
              style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono', fontWeight: 'bold' }}
              tick={{ fill: '#00ffc8' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 255, 200, 0.1)' }} />
            <Bar 
              dataKey="volume" 
              radius={[4, 4, 0, 0]}
              filter="url(#barGlow)"
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={scoreToColor(entry.avgSentiment)}
                  opacity={0.85}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        {/* Color legend */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="flex items-center gap-2 px-3 py-1.5 cyber-border rounded-sm border-cyber-green/30">
            <div className="w-2 h-2 bg-cyber-green rounded-sm"></div>
            <span className="text-xs font-mono text-white/80">POSITIVE</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 cyber-border rounded-sm border-cyber-yellow/30">
            <div className="w-2 h-2 bg-cyber-yellow rounded-sm"></div>
            <span className="text-xs font-mono text-white/80">NEUTRAL</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 cyber-border rounded-sm border-cyber-red/30">
            <div className="w-2 h-2 bg-cyber-red rounded-sm"></div>
            <span className="text-xs font-mono text-white/80">NEGATIVE</span>
          </div>
        </div>
      </div>
      
      {/* Security indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent"></div>
    </div>
  );
};

export default ActivityHeatmap;
