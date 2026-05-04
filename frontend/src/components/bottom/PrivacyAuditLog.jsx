import { Terminal, Shield, Zap } from 'lucide-react';
import { scoreToColor } from '../../utils';

const PrivacyAuditLog = ({ data }) => {
  return (
    <div className="relative group glass rounded-2xl p-6 hover:scale-[1.02] transition-all duration-500 border border-cyber-green/40 hover:border-cyber-green/80 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-green/10 via-transparent to-cyber-teal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Scan line effect */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyber-green to-transparent animate-shimmer"></div>
      
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-cyber-green/30 blur-lg rounded-full"></div>
              <Terminal className="w-6 h-6 text-cyber-green relative z-10 animate-pulse" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white font-space flex items-center gap-2">
                Privacy Audit Log
                <Shield className="w-5 h-5 text-cyber-green animate-pulse" />
              </h3>
              <p className="text-cyber-green/70 text-sm font-mono mt-1 flex items-center gap-2">
                <Zap className="w-3 h-3 animate-pulse" />
                Last 10 tunnel events • Real-time
              </p>
            </div>
          </div>
          
          {/* Status indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg border border-cyber-green/40">
            <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse"></div>
            <span className="text-xs font-mono text-cyber-green font-bold">MONITORING</span>
          </div>
        </div>
        
        <div className="glass rounded-xl p-4 h-[280px] overflow-y-auto border border-cyber-green/30 backdrop-blur-xl custom-scrollbar">
          <div className="space-y-2 font-mono text-xs">
            {data.map((entry, index) => (
              <div 
                key={index} 
                className="group/item text-white/70 hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-cyber-green/10 border border-transparent hover:border-cyber-green/30 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-cyber-green font-bold">[{entry.timestamp}]</span>
                  <span className="text-white/50">—</span>
                  <span className="text-white/80">Score:</span>
                  <span 
                    style={{ color: scoreToColor(entry.score) }} 
                    className="font-bold text-base px-2 py-0.5 rounded bg-white/5"
                  >
                    {entry.score > 0 ? '+' : ''}{entry.score}
                  </span>
                  <span className="text-white/50">—</span>
                  <span className="text-cyber-teal font-semibold">{entry.channel}</span>
                  <span className="text-white/50">—</span>
                  <span className="text-white/50">Raw:</span>
                  <span className="text-cyber-green font-bold flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    {entry.status}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Active monitoring indicator */}
            <div className="flex items-center gap-2 mt-6 p-3 glass rounded-lg border border-cyber-green/30">
              <span className="text-cyber-green animate-pulse text-lg">▊</span>
              <span className="text-white/60 text-xs">Monitoring active...</span>
              <div className="ml-auto flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i}
                    className="w-1 h-4 bg-cyber-green rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Corner accent */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyber-green/20 to-transparent rounded-tr-full"></div>
    </div>
  );
};

export default PrivacyAuditLog;
