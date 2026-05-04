# Community Thermostat Project

A privacy-first sentiment analysis dashboard for private communities (Discord/Telegram).

## 📁 Project Structure

```
.
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/      # Header, SentimentBar, DashboardLayout
│   │   │   ├── kpi/         # KPI cards (Mood, Messages, Peak, Privacy)
│   │   │   ├── charts/      # Sentiment Timeline, Emotion Radar
│   │   │   └── bottom/      # Activity Heatmap, Privacy Audit Log
│   │   ├── hooks/           # Custom React hooks
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── mockData.js
│   │   ├── utils.js
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── README.md
│
└── backend/          # (Coming soon) Node.js + MongoDB backend

```

## 🚀 Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🎯 Features

- **Real-time Sentiment Tracking** - Monitor community mood with live sentiment scores
- **Privacy Tunnel** - Zero-knowledge analysis that deletes raw messages immediately
- **Emotion Breakdown** - Radar chart showing 6 emotion categories
- **Activity Heatmap** - Hourly message volume with sentiment-based color coding
- **Audit Log** - Terminal-style privacy event feed
- **Dark Sci-Fi Aesthetic** - NASA mission control meets modern SaaS

## 🔮 Roadmap

- [x] Frontend dashboard with mock data
- [ ] Node.js + MongoDB backend
- [ ] Discord/Telegram bot integration
- [ ] NLP sentiment analysis (TensorFlow.js or LLM API)
- [ ] Real-time WebSocket updates
- [ ] User authentication
- [ ] Multi-community management

## 📝 License

MIT

---

Built with ❤️ for private communities
