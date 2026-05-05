// Convert sentiment score to color
export const scoreToColor = (score) => {
  if (score >= 40) return '#00ff88'; // cyber-green
  if (score >= 10) return '#ffd700'; // cyber-yellow
  if (score >= -10) return '#00d9ff'; // cyber-teal
  return '#ff3366'; // cyber-red
};

// Convert sentiment score to mood label
export const scoreToMood = (score) => {
  if (score >= 40) return { label: 'Thriving', emoji: '🟢', color: 'text-cyber-green' };
  if (score >= 10) return { label: 'Positive', emoji: '🟡', color: 'text-cyber-yellow' };
  if (score >= -10) return { label: 'Neutral', emoji: '🟡', color: 'text-cyber-teal' };
  return { label: 'Tense', emoji: '🔴', color: 'text-cyber-red' };
};

// Format time for display
export const formatTime = (time) => {
  return time;
};

// Format timestamp
export const formatTimestamp = (timestamp) => {
  return timestamp;
};

// Get gradient for sentiment bar
export const getSentimentGradient = (score) => {
  if (score >= 40) {
    return 'linear-gradient(90deg, #00ff88, #00d9ff)';
  } else if (score >= 10) {
    return 'linear-gradient(90deg, #ffd700, #00ff88)';
  } else if (score >= -10) {
    return 'linear-gradient(90deg, #00d9ff, #ffd700)';
  } else {
    return 'linear-gradient(90deg, #ff3366, #ffd700)';
  }
};

// Calculate average sentiment
export const calculateAverageSentiment = (data) => {
  if (!data || data.length === 0) return 0;
  const sum = data.reduce((acc, item) => acc + item.score, 0);
  return Math.round(sum / data.length);
};

// Format large numbers
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};
