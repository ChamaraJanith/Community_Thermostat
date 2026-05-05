# 🚀 Backend Setup Guide

Complete guide to set up and run the Community Thermostat backend with real sentiment analysis.

## 📋 Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **MongoDB** 5.0+ ([Download](https://www.mongodb.com/try/download/community))
- **npm** or **yarn**

## 🔧 Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/community-thermostat
NODE_ENV=development
JWT_SECRET=your_secret_key_here
```

### 3. Start MongoDB

**Option A: Local MongoDB**
```bash
# macOS with Homebrew
brew services start mongodb-community

# Windows
mongod

# Linux
sudo systemctl start mongod
```

**Option B: Docker**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:6.0
```

### 4. Seed Database

```bash
npm run seed
```

This creates:
- 4 sample communities
- 24 hours of sentiment data
- Realistic sentiment patterns

### 5. Start Backend Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server runs on `http://localhost:5000`

## 📊 API Endpoints

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Get All Communities
```bash
curl http://localhost:5000/api/communities
```

### Get Sentiment Timeline
```bash
curl http://localhost:5000/api/sentiment/timeline/COMMUNITY_ID?hours=24
```

### Get Emotion Breakdown
```bash
curl http://localhost:5000/api/sentiment/emotions/COMMUNITY_ID?hours=24
```

### Get Activity Heatmap
```bash
curl http://localhost:5000/api/sentiment/heatmap/COMMUNITY_ID
```

### Get Current Mood Score
```bash
curl http://localhost:5000/api/sentiment/mood/COMMUNITY_ID
```

### Get Privacy Audit Log
```bash
curl http://localhost:5000/api/sentiment/audit/COMMUNITY_ID?limit=10
```

### Get Dashboard KPI Data
```bash
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

## 🐳 Docker Setup

### Using Docker Compose (Recommended)

```bash
# Start both MongoDB and backend
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down
```

### Manual Docker

```bash
# Build image
docker build -t community-thermostat-backend .

# Run container
docker run -p 5000:5000 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/community-thermostat \
  community-thermostat-backend
```

## 🔌 Frontend Integration

### 1. Create `.env` in frontend folder

```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 2. Update Frontend to Use Real Data

Replace mock data with API calls in `frontend/src/App.jsx`:

```javascript
import { sentimentAPI, communityAPI } from './services/api';

// In your component
useEffect(() => {
  const fetchData = async () => {
    try {
      const kpiData = await sentimentAPI.getKPI(communityId);
      setKpiData(kpiData.data);
      
      const timeline = await sentimentAPI.getTimeline(communityId);
      setTimelineData(timeline.data);
      
      const emotions = await sentimentAPI.getEmotions(communityId);
      setEmotionData(emotions.data);
      
      const heatmap = await sentimentAPI.getHeatmap(communityId);
      setHeatmapData(heatmap.data);
      
      const audit = await sentimentAPI.getAuditLog(communityId);
      setAuditLogData(audit.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  fetchData();
}, [communityId]);
```

## 📈 Real Sentiment Analysis

The backend uses the `sentiment` npm package for NLP:

### How It Works

1. **Message Received**: Bot sends message text to backend
2. **Analysis**: NLP analyzes sentiment (-100 to +100)
3. **Emotions**: Detects 6 emotions (Joy, Trust, Fear, Surprise, Sadness, Anger)
4. **Privacy Tunnel**: Raw message is **DELETED**
5. **Storage**: Only score, emotions, and metadata stored

### Example Analysis

```javascript
// Input
"I absolutely love this amazing product! Best purchase ever!"

// Output
{
  score: 85,
  emotions: {
    joy: 95,
    trust: 75,
    fear: 0,
    surprise: 20,
    sadness: 0,
    anger: 0
  }
}
```

## 🔒 Privacy Features

✅ **Zero Raw Message Storage**
- Messages analyzed immediately
- Raw text deleted after scoring
- Only metadata retained

✅ **Audit Trail**
- Every analysis logged
- Deletion confirmed
- Encryption method tracked

✅ **Data Minimization**
- Only essential data stored
- No user identification
- No message content

## 🧪 Testing

### Test Health Check
```bash
curl http://localhost:5000/api/health
```

### Test Message Analysis
```bash
curl -X POST http://localhost:5000/api/sentiment/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "communityId": "COMMUNITY_ID_FROM_SEED",
    "messageText": "This is amazing!",
    "channel": "general"
  }'
```

### View MongoDB Data
```bash
# Connect to MongoDB
mongosh

# Use database
use community-thermostat

# View collections
show collections

# View data
db.sentimentscores.find().limit(5)
db.communities.find()
db.privacyauditlogs.find().limit(5)
```

## 📚 Database Collections

### Communities
```javascript
{
  _id: ObjectId,
  name: "Dev Community",
  description: "A community for developers",
  platform: "discord",
  platformId: "discord_dev_123",
  members: 1247,
  isActive: true,
  privacyTunnelEnabled: true,
  createdAt: Date,
  updatedAt: Date
}
```

### SentimentScores
```javascript
{
  _id: ObjectId,
  communityId: ObjectId,
  score: 42,
  messageCount: 1,
  emotions: {
    joy: 75,
    trust: 68,
    fear: 18,
    surprise: 45,
    sadness: 25,
    anger: 22
  },
  channel: "general",
  timestamp: Date,
  hour: 14,
  day: "Monday"
}
```

### PrivacyAuditLogs
```javascript
{
  _id: ObjectId,
  communityId: ObjectId,
  action: "message_analyzed",
  score: 42,
  channel: "general",
  status: "success",
  rawMessageDeleted: true,
  encryptionMethod: "AES-256",
  timestamp: Date
}
```

## 🚀 Deployment

### Heroku

```bash
# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### AWS EC2

```bash
# SSH into instance
ssh -i key.pem ec2-user@your-instance

# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Clone repo and install
git clone your-repo
cd backend
npm install

# Start with PM2
npm install -g pm2
pm2 start src/server.js --name "thermostat"
pm2 startup
pm2 save
```

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution**: Start MongoDB
```bash
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
mongod                                 # Windows
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution**: Change port in `.env` or kill process
```bash
lsof -i :5000
kill -9 <PID>
```

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution**: Ensure frontend `.env` has correct API URL
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📖 Next Steps

1. ✅ Backend running on `http://localhost:5000`
2. ✅ MongoDB connected and seeded
3. ✅ Frontend configured with API URL
4. 🔄 Connect Discord/Telegram bot to send messages
5. 📊 View real sentiment data in dashboard

## 🤝 Support

For issues or questions:
- Check logs: `npm run dev`
- Verify MongoDB: `mongosh`
- Test API: `curl http://localhost:5000/api/health`

---

**Ready to analyze real community sentiment!** 🌃💻
