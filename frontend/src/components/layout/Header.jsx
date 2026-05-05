import { Thermometer, Circle, Zap, Lock } from 'lucide-react';

const Header = ({ selectedCommunity, onCommunityChange, dateRange, onDateRangeChange, communities, isLive = false, loading = false }) => {
  return (
    <header className="cyber-card border-b border-cyber-cyan/30 animate-slide-down relative z-20">
      <div className="px-8 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Thermometer className="w-8 h-8 text-cyber-cyan cyber-glow" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-cyber-cyan cyber-glow font-space tracking-wider">
                COMMUNITY THERMOSTAT
              </h1>
              <p className="text-xs text-cyber-cyan/60 font-mono mt-1 flex items-center gap-2">
                <Lock className="w-3 h-3" />
                PRIVACY-FIRST SENTIMENT ANALYSIS
              </p>
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-6">
            {/* Live / Demo indicator */}
            {isLive ? (
              <div className="flex items-center gap-2 px-4 py-2 cyber-border rounded-sm border-cyber-cyan/40 cyber-pulse">
                <Circle className="w-2.5 h-2.5 text-cyber-cyan fill-cyber-cyan animate-pulse" />
                <span className="text-xs font-mono text-cyber-cyan font-bold tracking-widest">
                  {loading ? 'SYNCING...' : 'LIVE'}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 rounded-sm border border-yellow-500/40">
                <Circle className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-mono text-yellow-400 font-bold tracking-widest">DEMO</span>
              </div>
            )}

            {/* Community selector */}
            <select
              value={selectedCommunity ?? ''}
              onChange={(e) => onCommunityChange(e.target.value)}
              className="px-4 py-2 cyber-bg text-cyber-cyan border border-cyber-cyan/30 rounded-sm font-mono text-xs focus:outline-none focus:border-cyber-cyan transition-all cursor-pointer hover:border-cyber-cyan/60 data-display appearance-none"
              style={{
                backgroundColor: '#0d0221',
                color: '#00ffc8',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2300ffc8' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 8px center',
                paddingRight: '28px',
              }}
            >
              {communities.map((community) => (
                <option
                  key={community.id}
                  value={community.id}
                  style={{
                    backgroundColor: '#1a0033',
                    color: '#00ffc8',
                  }}
                >
                  {community.name}{community.members ? ` • ${community.members}` : ''}
                </option>
              ))}
            </select>

            {/* Date range picker */}
            <div className="flex gap-1 cyber-bg rounded-sm p-1 border border-cyber-cyan/30">
              {['Today', '7D', '30D'].map((range) => (
                <button
                  key={range}
                  onClick={() => onDateRangeChange(range)}
                  className={`px-4 py-1.5 rounded-sm font-mono text-xs font-bold transition-all ${
                    dateRange === range
                      ? 'bg-cyber-cyan text-cyber-dark border border-cyber-cyan/50'
                      : 'text-cyber-cyan/70 hover:text-cyber-cyan border border-transparent'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom border glow */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-50"></div>
    </header>
  );
};

export default Header;
