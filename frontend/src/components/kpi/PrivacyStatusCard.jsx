import { Shield, Lock, CheckCircle } from 'lucide-react';

const PrivacyStatusCard = ({ status, rawMessagesStored }) => {
  return (
    <div className="cyber-card rounded-sm p-6 hover:border-cyber-cyan/60 transition-all duration-300 animate-slide-up border-cyber-cyan/30 relative overflow-hidden glow-cyan" style={{ animationDelay: '0.3s' }}>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-cyber-cyan/90 text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-2">
              ▸ PRIVACY TUNNEL
              <Lock className="w-3 h-3 animate-pulse" />
            </p>
            <p className="text-white/30 text-xs font-mono mt-2">ZERO-KNOWLEDGE ANALYSIS</p>
          </div>
          <Shield className="w-6 h-6 text-cyber-cyan cyber-glow" />
        </div>
        
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-5 h-5 text-cyber-green" />
          <span className="text-3xl font-bold font-mono text-cyber-cyan data-display cyber-glow">
            {status.toUpperCase()}
          </span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-cyber-cyan/10 rounded-sm border border-cyber-cyan/20">
            <span className="text-white/70 text-xs font-mono">RAW MESSAGES:</span>
            <span className="text-cyber-cyan font-bold text-sm font-mono">{rawMessagesStored}</span>
          </div>
          
          <div className="flex items-center justify-between p-2 bg-cyber-green/10 rounded-sm border border-cyber-green/20">
            <span className="text-white/70 text-xs font-mono">ENCRYPTED SCORES:</span>
            <span className="text-cyber-green font-bold text-sm font-mono">∞</span>
          </div>
        </div>
      </div>
      
      {/* Security indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent"></div>
    </div>
  );
};

export default PrivacyStatusCard;
