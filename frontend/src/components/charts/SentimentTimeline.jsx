import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { scoreToColor } from '../../utils';
import { Activity, TrendingUp } from 'lucide-react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="glass rounded-xl p-4 border border-cyber-teal/50 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-4 h-4 text-cyber-teal" />
          <p className="text-cyber-teal font-mono text-sm font-bold">{data.time}</p>
        </div>
        <p className="text-white font-mono text-2xl font-bold mb-1" style={{ color: scoreToColor(data.score) }}>
          {data.score > 0 ? '+' : ''}{data.score}
        </p>
        <p className="text-white/70 font-mono text-xs flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          Volume: {data.volume} msgs
        </p>
      </div>
    );
  }
  return null;
};

const SentimentTimeline = ({ data }) => {
  return (
    <div className="relative group glass rounded-2xl p-6 hover:scale-[1.02] transition-all duration-500 border border-cyber-teal/40 hover:border-cyber-teal/80 overflow-hidden scan-line">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-teal/5 via-transparent to-cyber-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Holographic overlay */}
      <div className="absolute inset-0 holographic opacity-20"></div>
      
      <div className="relative z-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white font-space flex items-center gap-3">
              <Activity className="w-6 h-6 text-cyber-teal animate-pulse" />
              Sentiment Over Time
            </h3>
            <p className="text-cyber-teal/70 text-sm font-mono mt-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyber-teal rounded-full animate-pulse"></span>
              24-hour mood trajectory • Live data
            </p>
          </div>
          
          {/* Legend */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg border border-cyber-green/30">
              <div className="w-3 h-3 bg-cyber-green rounded-full"></div>
              <span className="text-xs font-mono text-white/80">Positive</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg border border-cyber-red/30">
              <div className="w-3 h-3 bg-cyber-red rounded-full"></div>
              <span className="text-xs font-mono text-white/80">Negative</span>
            </div>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00ff88" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="#00ff88" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff3366" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#ff3366" stopOpacity={0.9}/>
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2749" strokeOpacity={0.3} />
            <XAxis 
              dataKey="time" 
              stroke="#00d9ff" 
              style={{ fontSize: '12px', fontFamily: 'IBM Plex Mono', fontWeight: 'bold' }}
              interval="preserveStartEnd"
              tick={{ fill: '#00d9ff' }}
            />
            <YAxis 
              stroke="#00d9ff" 
              style={{ fontSize: '12px', fontFamily: 'IBM Plex Mono', fontWeight: 'bold' }}
              domain={[-100, 100]}
              tick={{ fill: '#00d9ff' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine 
              y={0} 
              stroke="#00d9ff" 
              strokeDasharray="5 5" 
              strokeWidth={2}
              label={{ value: 'Neutral', fill: '#00d9ff', fontSize: 12, fontFamily: 'IBM Plex Mono' }}
            />
            <Area 
              type="monotone" 
              dataKey="score" 
              stroke="#00d9ff" 
              strokeWidth={3}
              fill="url(#colorPositive)" 
              filter="url(#glow)"
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyber-teal/10 to-transparent rounded-br-full"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-cyber-purple/10 to-transparent rounded-tl-full"></div>
    </div>
  );
};

export default SentimentTimeline;
