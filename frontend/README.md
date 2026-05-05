# Community Thermostat 🌡️

A privacy-first sentiment analysis dashboard for private communities (Discord/Telegram). Built with React, Recharts, and Tailwind CSS.

## 🎯 Features

- **Real-time Sentiment Tracking** - Monitor community mood with live sentiment scores (-100 to +100)
- **Privacy Tunnel** - Zero-knowledge analysis that deletes raw messages immediately after scoring
- **Emotion Breakdown** - Radar chart showing 6 emotion categories (Joy, Trust, Surprise, Sadness, Fear, Anger)
- **Activity Heatmap** - Hourly message volume with sentiment-based color coding
- **Audit Log** - Terminal-style privacy event feed
- **Dark Sci-Fi Aesthetic** - NASA mission control meets modern SaaS

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Modern web browser

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── App.jsx                        # Main app with state management
├── main.jsx                       # React entry point
├── index.css                      # Global styles + Tailwind
├── mockData.js                    # Static mock data
├── utils.js                       # Helper functions
│
├── components/
│   ├── layout/
│   │   ├── Header.jsx             # Top bar with logo, live badge, controls
│   │   ├── SentimentBar.jsx       # Animated gradient sentiment indicator
│   │   └── DashboardLayout.jsx    # Main layout wrapper
│   │
│   ├── kpi/
│   │   ├── KPISection.jsx         # 4-card KPI row wrapper
│   │   ├── MoodScoreCard.jsx      # Current mood score with animation
│   │   ├── MessagesCard.jsx       # Messages analyzed count
│   │   ├── PeakPositivityCard.jsx # Best moment timestamp
│   │   └── PrivacyStatusCard.jsx  # Privacy tunnel status
│   │
│   ├── charts/
│   │   ├── ChartsSection.jsx      # 2-column chart grid
│   │   ├── SentimentTimeline.jsx  # Main area chart
│   │   └── EmotionRadarChart.jsx  # Emotion radar chart
│   │
│   └── bottom/
│       ├── BottomSection.jsx      # 2-column bottom grid
│       ├── ActivityHeatmap.jsx    # Hourly bar chart
│       └── PrivacyAuditLog.jsx    # Terminal-style log feed
│
└── hooks/
    ├── useSentiment.js            # Sentiment data filtering
    └── useAnimatedCount.js        # Count-up animation
```

## 🎨 Design System

### Colors
- **Space Dark**: `#0a0e27` - Main background
- **Space Navy**: `#141b3d` - Card backgrounds
- **Cyber Teal**: `#00d9ff` - Primary accent
- **Cyber Green**: `#00ff88` - Positive indicators
- **Cyber Red**: `#ff3366` - Negative indicators
- **Cyber Yellow**: `#ffd700` - Neutral indicators

### Typography
- **Headings**: Space Grotesk
- **Data/Numbers**: IBM Plex Mono

## 🔧 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons

## 📊 Mock Data

The app currently uses static mock data including:
- 48 sentiment data points (every 30 min over 24h)
- 6 emotion categories with values
- 24 hourly activity bars
- 10 privacy audit log entries

## 🔮 Future Enhancements

- [ ] Connect to Node.js + MongoDB backend
- [ ] Real-time WebSocket updates
- [ ] Discord/Telegram bot integration
- [ ] NLP sentiment analysis (TensorFlow.js or LLM API)
- [ ] User authentication
- [ ] Multi-community management
- [ ] Export reports
- [ ] Custom date range filtering
- [ ] Alert system for mood drops

## 🔒 Privacy Philosophy

The "Privacy Tunnel" ensures:
1. Bot reads message text
2. NLP scores sentiment immediately
3. Raw message is deleted forever
4. Only score + metadata stored
5. Zero surveillance, pure statistics

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

---

Built with ❤️ for private communities
