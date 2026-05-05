const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Sentiment Analysis APIs
export const sentimentAPI = {
  // Get sentiment timeline
  getTimeline: async (communityId, hours = 24) => {
    try {
      const response = await fetch(`${API_BASE_URL}/sentiment/timeline/${communityId}?hours=${hours}`);
      if (!response.ok) throw new Error('Failed to fetch timeline');
      return await response.json();
    } catch (error) {
      console.error('Error fetching timeline:', error);
      throw error;
    }
  },

  // Get emotion breakdown
  getEmotions: async (communityId, hours = 24) => {
    try {
      const response = await fetch(`${API_BASE_URL}/sentiment/emotions/${communityId}?hours=${hours}`);
      if (!response.ok) throw new Error('Failed to fetch emotions');
      return await response.json();
    } catch (error) {
      console.error('Error fetching emotions:', error);
      throw error;
    }
  },

  // Get activity heatmap
  getHeatmap: async (communityId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/sentiment/heatmap/${communityId}`);
      if (!response.ok) throw new Error('Failed to fetch heatmap');
      return await response.json();
    } catch (error) {
      console.error('Error fetching heatmap:', error);
      throw error;
    }
  },

  // Get current mood score
  getMoodScore: async (communityId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/sentiment/mood/${communityId}`);
      if (!response.ok) throw new Error('Failed to fetch mood score');
      return await response.json();
    } catch (error) {
      console.error('Error fetching mood score:', error);
      throw error;
    }
  },

  // Get privacy audit log
  getAuditLog: async (communityId, limit = 10) => {
    try {
      const response = await fetch(`${API_BASE_URL}/sentiment/audit/${communityId}?limit=${limit}`);
      if (!response.ok) throw new Error('Failed to fetch audit log');
      return await response.json();
    } catch (error) {
      console.error('Error fetching audit log:', error);
      throw error;
    }
  },

  // Get KPI data (all dashboard data at once)
  getKPI: async (communityId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/sentiment/kpi/${communityId}`);
      if (!response.ok) throw new Error('Failed to fetch KPI data');
      return await response.json();
    } catch (error) {
      console.error('Error fetching KPI data:', error);
      throw error;
    }
  },

  // Analyze a message
  analyzeMessage: async (communityId, messageText, channel = 'general') => {
    try {
      const response = await fetch(`${API_BASE_URL}/sentiment/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          communityId,
          messageText,
          channel,
        }),
      });
      if (!response.ok) throw new Error('Failed to analyze message');
      return await response.json();
    } catch (error) {
      console.error('Error analyzing message:', error);
      throw error;
    }
  },
};

// Community APIs
export const communityAPI = {
  // Get all communities
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/communities`);
      if (!response.ok) throw new Error('Failed to fetch communities');
      return await response.json();
    } catch (error) {
      console.error('Error fetching communities:', error);
      throw error;
    }
  },

  // Get community by ID
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/communities/${id}`);
      if (!response.ok) throw new Error('Failed to fetch community');
      return await response.json();
    } catch (error) {
      console.error('Error fetching community:', error);
      throw error;
    }
  },

  // Create community
  create: async (communityData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/communities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(communityData),
      });
      if (!response.ok) throw new Error('Failed to create community');
      return await response.json();
    } catch (error) {
      console.error('Error creating community:', error);
      throw error;
    }
  },

  // Update community
  update: async (id, communityData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/communities/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(communityData),
      });
      if (!response.ok) throw new Error('Failed to update community');
      return await response.json();
    } catch (error) {
      console.error('Error updating community:', error);
      throw error;
    }
  },
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/api/health`);
    if (!response.ok) throw new Error('Health check failed');
    return await response.json();
  } catch (error) {
    console.error('Error checking health:', error);
    throw error;
  }
};

export default {
  sentimentAPI,
  communityAPI,
  healthCheck,
};
