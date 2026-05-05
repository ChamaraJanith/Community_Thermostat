# Community Thermostat Backend

Privacy-first sentiment analysis backend for private communities (Discord/Telegram).

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 5.0+
- npm or yarn

### Installation

```bash
cd backend
npm install
```

### Configuration

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/community-thermostat
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
```

### Seed Database

```bash
npm run seed
```

This creates sample communities and sentiment data.

### Start Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will run on `http://localhost:5000`

## 📊 API Endpoints

### Health Check
```
GET /api/health
```

### Communities
```
GET    /api/communities              # Get all communities
GET    /api/communities/:id          # Get community by ID
POST   /api/communities              # Create community
PUT    /api/communities/:id          # Update community
```

### Sentiment Analysis
```
GET    /api/sentiment/timeline/:communityId?hours=24
GET    /api/sentiment/emotions/:communityId?hours=24
GET    /api/sentiment/heatmap/:communityId
GET    /api/sentiment/mood/:communityId
GET    /api/sentiment/audit/:communityId?limit=10
POST   /api/sentiment/analyze
GET    /api/sentiment/kpi/:communityId
```

## 🔒 Privacy Tunnel

The backend implements a **Privacy Tunnel** that:

1. ✅ Receives raw message text
2. ✅ Analyzes sentiment using NLP
3. ✅ **DELETES** raw message immediately
4. ✅ Stores only:
   - Sentiment score (-100 to +100)
   - Emotion breakdown
   - Channel name
   - Timestamp
   - Hour of day

**Zero raw messages are stored** - complete privacy!

## 📈 Sentiment Analysis

Uses the `sentiment` npm package for NLP analysis:

- **Score Range**: -100 to +100
- **Emotions Tracked**: Joy, Trust, Fear, Surprise, Sadness, Anger
- **Real-time Processing**: Analyzes messages as they arrive
- **Aggregation**: Hourly, daily, and custom time ranges

## 🗄️ Database Schema

### Communities
```javascript
{
  name: String,
  description: String,
  platform: 'discord' | 'telegram' | 'slack',
  platformId: String,
  members: Number,
  isActive: Boolean,
  privacyTunnelEnabled: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### SentimentScore
```javascript
{
  communityId: ObjectId,
  score: Number (-100 to 100),
  messageCount: Number,
  emotions: {
    joy: Number,
    trust: Number,
    fear: Number,
    surprise: Number,
    sadness: Number,
    anger: Number
  },
  channel: String,
  timestamp: Date,
  hour: Number (0-23),
  day: String
}
```

### PrivacyAuditLog
```javascript
{
  communityId: ObjectId,
  action: 'message_analyzed' | 'message_deleted' | 'score_stored' | 'data_encrypted',
  score: Number,
  channel: String,
  status: 'success' | 'failed',
  rawMessageDeleted: Boolean,
  encryptionMethod: String,
  timestamp: Date
}
```

## 📝 Example Requests

### Analyze a Message
```bash
curl -X POST http://localhost:5000/api/sentiment/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "communityId": "community_id_here",
    "messageText": "I love this amazing product!",
    "channel": "general"
  }'
```

### Get Sentiment Timeline
```bash
curl http://localhost:5000/api/sentiment/timeline/community_id_here?hours=24
```

### Get KPI Data
```bash
curl http://localhost:5000/api/sentiment/kpi/community_id_here
```

## 🔧 Technologies

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Sentiment** - NLP analysis
- **CORS** - Cross-origin requests
- **Dotenv** - Environment variables

## 📚 Integration with Frontend

The frontend connects to these endpoints:

```javascript
// Get all data for dashboard
const response = await fetch('/api/sentiment/kpi/communityId');
const data = await response.json();

// Real-time sentiment updates
const timeline = await fetch('/api/sentiment/timeline/communityId?hours=24');

// Emotion analysis
const emotions = await fetch('/api/sentiment/emotions/communityId');

// Activity heatmap
const heatmap = await fetch('/api/sentiment/heatmap/communityId');

// Privacy audit log
const audit = await fetch('/api/sentiment/audit/communityId?limit=10');
```

## 🚀 Deployment

### Docker
```bash
docker build -t community-thermostat-backend .
docker run -p 5000:5000 -e MONGODB_URI=mongodb://... community-thermostat-backend
```

### Heroku
```bash
heroku create your-app-name
heroku config:set MONGODB_URI=your_mongodb_uri
git push heroku main
```

## 📖 Documentation

For detailed API documentation, visit `/api/docs` (when Swagger is added).

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

## 📝 License

MIT

---

Built with ❤️ for privacy-first communities
