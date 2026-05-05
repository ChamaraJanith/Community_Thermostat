# 📚 API Documentation

Complete API reference for Community Thermostat backend.

## 🌐 Base URL

```
http://localhost:5000/api
```

## 🔐 Authentication

Currently no authentication required. Add JWT in future versions.

## 📊 Sentiment Endpoints

### Get Sentiment Timeline

**Endpoint**: `GET /sentiment/timeline/:communityId`

**Query Parameters**:
- `hours` (optional): Number of hours to retrieve (default: 24)

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "time": "14:00",
      "score": 42,
      "volume": 15
    }
  ]
}
```

**Example**:
```bash
curl http://localhost:5000/api/sentiment/timeline/COMMUNITY_ID?hours=24
```

---

### Get Emotion Breakdown

**Endpoint**: `GET /sentiment/emotions/:communityId`

**Query Parameters**:
- `hours` (optional): Number of hours to analyze (default: 24)

**Response**:
```json
{
  "success": true,
  "data": [
    { "emotion": "Joy", "value": 75 },
    { "emotion": "Trust", "value": 68 },
    { "emotion": "Surprise", "value": 45 },
    { "emotion": "Sadness", "value": 25 },
    { "emotion": "Fear", "value": 18 },
    { "emotion": "Anger", "value": 22 }
  ]
}
```

**Example**:
```bash
curl http://localhost:5000/api/sentiment/emotions/COMMUNITY_ID?hours=24
```

---

### Get Activity Heatmap

**Endpoint**: `GET /sentiment/heatmap/:communityId`

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "hour": "00",
      "volume": 12,
      "avgSentiment": 15
    },
    {
      "hour": "01",
      "volume": 5,
      "avgSentiment": 10
    }
  ]
}
```

**Example**:
```bash
curl http://localhost:5000/api/sentiment/heatmap/COMMUNITY_ID
```

---

### Get Current Mood Score

**Endpoint**: `GET /sentiment/mood/:communityId`

**Response**:
```json
{
  "success": true,
  "data": {
    "score": 42
  }
}
```

**Example**:
```bash
curl http://localhost:5000/api/sentiment/mood/COMMUNITY_ID
```

---

### Get Privacy Audit Log

**Endpoint**: `GET /sentiment/audit/:communityId`

**Query Parameters**:
- `limit` (optional): Number of logs to retrieve (default: 10)

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "timestamp": "14:30:45",
      "score": 42,
      "channel": "#general",
      "status": "DELETED ✓"
    }
  ]
}
```

**Example**:
```bash
curl http://localhost:5000/api/sentiment/audit/COMMUNITY_ID?limit=10
```

---

### Get Dashboard KPI Data

**Endpoint**: `GET /sentiment/kpi/:communityId`

**Response**:
```json
{
  "success": true,
  "data": {
    "currentMoodScore": 42,
    "messagesAnalyzed": 2847,
    "messagesLast24h": 1243,
    "peakPositivityTime": "20:15",
    "peakPositivityScore": 60,
    "privacyStatus": "Active",
    "rawMessagesStored": 0
  }
}
```

**Example**:
```bash
curl http://localhost:5000/api/sentiment/kpi/COMMUNITY_ID
```

---

### Analyze Message

**Endpoint**: `POST /sentiment/analyze`

**Request Body**:
```json
{
  "communityId": "COMMUNITY_ID",
  "messageText": "I love this amazing product!",
  "channel": "general"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "_id": "ObjectId",
    "communityId": "COMMUNITY_ID",
    "score": 85,
    "emotions": {
      "joy": 95,
      "trust": 75,
      "fear": 0,
      "surprise": 20,
      "sadness": 0,
      "anger": 0
    },
    "channel": "general",
    "timestamp": "2024-01-15T14:30:45.123Z"
  }
}
```

**Example**:
```bash
curl -X POST http://localhost:5000/api/sentiment/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "communityId": "COMMUNITY_ID",
    "messageText": "I love this amazing product!",
    "channel": "general"
  }'
```

---

## 👥 Community Endpoints

### Get All Communities

**Endpoint**: `GET /communities`

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "ObjectId",
      "name": "Dev Community",
      "description": "A community for developers",
      "platform": "discord",
      "platformId": "discord_dev_123",
      "members": 1247,
      "isActive": true,
      "privacyTunnelEnabled": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-15T14:30:45.123Z"
    }
  ]
}
```

**Example**:
```bash
curl http://localhost:5000/api/communities
```

---

### Get Community by ID

**Endpoint**: `GET /communities/:id`

**Response**:
```json
{
  "success": true,
  "data": {
    "_id": "ObjectId",
    "name": "Dev Community",
    "description": "A community for developers",
    "platform": "discord",
    "platformId": "discord_dev_123",
    "members": 1247,
    "isActive": true,
    "privacyTunnelEnabled": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-15T14:30:45.123Z"
  }
}
```

**Example**:
```bash
curl http://localhost:5000/api/communities/COMMUNITY_ID
```

---

### Create Community

**Endpoint**: `POST /communities`

**Request Body**:
```json
{
  "name": "New Community",
  "description": "Community description",
  "platform": "discord",
  "platformId": "discord_new_123",
  "members": 500
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "_id": "ObjectId",
    "name": "New Community",
    "description": "Community description",
    "platform": "discord",
    "platformId": "discord_new_123",
    "members": 500,
    "isActive": true,
    "privacyTunnelEnabled": true,
    "createdAt": "2024-01-15T14:30:45.123Z",
    "updatedAt": "2024-01-15T14:30:45.123Z"
  }
}
```

**Example**:
```bash
curl -X POST http://localhost:5000/api/communities \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Community",
    "description": "Community description",
    "platform": "discord",
    "platformId": "discord_new_123",
    "members": 500
  }'
```

---

### Update Community

**Endpoint**: `PUT /communities/:id`

**Request Body**:
```json
{
  "members": 600,
  "description": "Updated description"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "_id": "ObjectId",
    "name": "New Community",
    "description": "Updated description",
    "platform": "discord",
    "platformId": "discord_new_123",
    "members": 600,
    "isActive": true,
    "privacyTunnelEnabled": true,
    "createdAt": "2024-01-15T14:30:45.123Z",
    "updatedAt": "2024-01-15T14:35:00.000Z"
  }
}
```

**Example**:
```bash
curl -X PUT http://localhost:5000/api/communities/COMMUNITY_ID \
  -H "Content-Type: application/json" \
  -d '{
    "members": 600,
    "description": "Updated description"
  }'
```

---

## 🏥 Health Check

**Endpoint**: `GET /health`

**Response**:
```json
{
  "success": true,
  "message": "Community Thermostat Backend is running",
  "timestamp": "2024-01-15T14:30:45.123Z"
}
```

**Example**:
```bash
curl http://localhost:5000/api/health
```

---

## 📊 Sentiment Score Scale

| Score | Mood | Emoji |
|-------|------|-------|
| 40 to 100 | Thriving | 🟢 |
| 10 to 39 | Positive | 🟡 |
| -10 to 9 | Neutral | 🟡 |
| -100 to -11 | Tense | 🔴 |

---

## 🎯 Emotion Values

Each emotion is scored 0-100:

- **Joy**: Happiness, excitement, enthusiasm
- **Trust**: Confidence, reliability, security
- **Fear**: Anxiety, worry, concern
- **Surprise**: Amazement, shock, unexpected
- **Sadness**: Unhappiness, depression, sorrow
- **Anger**: Frustration, irritation, rage

---

## ⚠️ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Missing required fields: communityId, messageText"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Community not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error message"
}
```

---

## 🔄 Rate Limiting

Currently no rate limiting. Add in production:
- 100 requests per minute per IP
- 1000 requests per hour per API key

---

## 📝 Request/Response Format

All requests and responses use JSON format.

**Headers**:
```
Content-Type: application/json
```

---

## 🚀 Integration Example

```javascript
// Frontend integration
import { sentimentAPI } from './services/api';

// Get KPI data
const kpiData = await sentimentAPI.getKPI(communityId);

// Get timeline
const timeline = await sentimentAPI.getTimeline(communityId, 24);

// Get emotions
const emotions = await sentimentAPI.getEmotions(communityId);

// Analyze message
const result = await sentimentAPI.analyzeMessage(
  communityId,
  "I love this!",
  "general"
);
```

---

## 📚 Additional Resources

- **Backend Setup**: See `BACKEND_SETUP.md`
- **Quick Start**: See `QUICK_START.md`
- **Frontend**: See `frontend/README.md`

---

**API Version**: 1.0.0  
**Last Updated**: 2024-01-15  
**Status**: Production Ready ✅
