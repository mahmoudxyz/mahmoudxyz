// src/utils/config.js
export const getBaseUrl = () => {
    if (import.meta.env.MODE === 'development') {
      return 'http://localhost:3000';
    }
    return import.meta.env.VITE_BASE_URL || 'https://mahmoudxyz.vercel.app';
  };
  
  export const getSiteConfig = () => ({
    name: 'Your Site Name',
    description: 'Your site description',
    baseUrl: getBaseUrl(),
    social: {
      twitter: '@yourusername',
      // Add other social media handles
    }
  });