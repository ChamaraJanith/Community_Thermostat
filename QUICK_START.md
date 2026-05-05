# ⚡ Quick Start Guide

Get Community Thermostat running in 5 minutes!

## 🚀 Start Backend

### Terminal 1: Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Seed database with sample data
npm run seed

# Start server
npm run dev
```

✅ Backend running on `http://localhost:5000`

## 🎨 Start Frontend

### Terminal 2: Frontend

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Start development server
npm run dev
```

✅ Frontend running on `http://localhost:5173`

## 📊 View Dashboard

Open browser: `http://localhost:5173`

You should see:
- ✅ Real sentiment data from backend
- ✅ Live sentiment timeline
- ✅ Emotion breakdown
- ✅ Activity heatmap
- ✅ Privacy audit log

## 🧪 Test API

### Get Communities
```bash
curl http://localhost:5000/api/communities
```

### Get Dashboard Data
```bash
# Replace COMMUNITY_ID with ID from communities response
curl http://localhost:5000/api/sentiment/kpi/COMMUNITY_ID
```

### Analyze a Message
```bash
curl -X POST http://localhost:5000/api/sentiment/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "communityId": "COMMUNITY_ID",
    "messageText": "I love this amazing product!",
    "channel": "general"
  }'
```

## 📁 Project Structure

```
community-thermostat/
├── frontend/                 # React dashboard
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── services/        # API service
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env
│
├── backend/                  # Node.js API
│   ├── src/
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── config/          # Configuration
│   │   └── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## 🔄 Data Flow

```
Discord/Telegram Bot
        ↓
   Message Text
        ↓
Backend API (/sentiment/analyze)
        ↓
NLP Analysis (Sentiment Package)
        ↓
Privacy Tunnel: Delete Raw Message
        ↓
Store Score + Emotions + Metadata
        ↓
MongoDB
        ↓
Frontend API Calls
        ↓
React Dashboard
        ↓
Real-time Visualization
```

## 🎯 Key Features

### ✅ Real Sentiment Analysis
- Uses NLP to analyze message sentiment
- Scores from -100 (negative) to +100 (positive)
- Detects 6 emotions: Joy, Trust, Fear, Surprise, Sadness, Anger

### ✅ Privacy Tunnel
- Raw messages are **DELETED** immediately after analysis
- Only metadata stored (score, emotions, channel, time)
- Zero surveillance, pure statistics

### ✅ Real-time Dashboard
- Live sentiment timeline
- Emotion breakdown radar chart
- Hourly activity heatmap
- Privacy audit log
- KPI metrics

### ✅ Multiple Communities
- Support for Discord, Telegram, Slack
- Per-community sentiment tracking
- Separate privacy audit logs

## 📊 Sample Data

After seeding, you have:
- **4 Communities**: Dev Community, Design Guild, Product Team, Marketing Hub
- **24 Hours of Data**: Realistic sentiment patterns
- **Mood Dip**: 14:00-15:00 shows negative sentiment (realistic)
- **Peak Hours**: 8:00-12:00 shows positive sentiment

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/community-thermostat
NODE_ENV=development
JWT_SECRET=your_secret_key
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🐛 Common Issues

### Backend won't start
```bash
# Check if MongoDB is running
mongosh

# If not, start it
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
```

### Frontend can't connect to backend
```bash
# Verify backend is running
curl http://localhost:5000/api/health

# Check frontend .env has correct API URL
cat frontend/.env
```

### Port already in use
```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>

# Or change port in backend/.env
PORT=5001
```

## 📚 Next Steps

1. ✅ Backend and frontend running
2. ✅ Real sentiment data displaying
3. 🔄 **Connect Discord/Telegram bot** to send messages
4. 📊 **View real community sentiment** in dashboard
5. 🚀 **Deploy to production**

## 🤖 Connect Discord Bot (Optional)

Create a Discord bot that sends messages to the backend:

```javascript
// Discord bot webhook
const axios = require('axios');

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  
  // Send to backend for analysis
  await axios.post('http://localhost:5000/api/sentiment/analyze', {
    communityId: 'COMMUNITY_ID',
    messageText: message.content,
    channel: message.channel.name
  });
});
```

## 📖 Documentation

- **Backend**: See `backend/README.md`
- **Setup**: See `BACKEND_SETUP.md`
- **Frontend**: See `frontend/README.md`

## 🎉 You're Ready!

Your Community Thermostat is now running with:
- ✅ Real sentiment analysis
- ✅ Privacy-first architecture
- ✅ Beautiful cyberpunk dashboard
- ✅ Real-time data visualization

**Start analyzing your community's mood!** 🌃💻

---

Questions? Check the documentation or open an issue!
