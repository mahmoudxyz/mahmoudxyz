// src/utils/storage.ts
export const storage = {
    get: (key: string) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error(`Error reading from localStorage:`, error);
        return null;
      }
    },
  
    set: (key: string, value: any) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (error) {
        console.error(`Error writing to localStorage:`, error);
        return false;
      }
    },
  
    remove: (key: string) => {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (error) {
        console.error(`Error removing from localStorage:`, error);
        return false;
      }
    }
  };
  
  // src/utils/character.ts
  import { Character } from '../types';
  
  export const createEmptyCharacter = (): Omit<Character, 'id' | 'created_at' | 'updated_at'> => ({
    name: '',
    avatar: '',
    core: {
      values: [],
      principles: [],
      goals: []
    },
    personality: {
      traits: [],
      hobbies: [],
      aspirations: []
    },
    story: {
      background: '',
      motivation: '',
      challenges: [],
      achievements: [],
      futureGoals: []
    },
    stats: {
      confidence: 1,
      resilience: 1,
      creativity: 1,
      empathy: 1,
      wisdom: 1,
      adaptability: 1,
      determination: 1,
      leadership: 1
    },
    relationships: {
      mentors: [],
      allies: [],
      rivals: []
    },
    growth: {
      skills: [],
      lessons: [],
      milestones: []
    },
    habit_stacks: {
      morning_stack: [],
      afternoon_stack: [],
      evening_stack: [],
      trigger_habits: {}
    },
    habit_tracking: {
      completion_history: {},
      streak_data: {},
      success_rates: {}
    },
    progress_metrics: {
      weekly_scores: [],
      strength_areas: {},
      growth_velocity: [],
      consistency_metrics: {}
    }
  });
  
  // src/utils/validation.ts
  export const validateCharacter = (character: Partial<Character>) => {
    const errors: Record<string, string> = {};
  
    if (!character.name?.trim()) {
      errors.name = 'Name is required';
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
  
  // src/utils/analytics.ts
  export const calculateGrowthRate = (metrics: number[]) => {
    if (metrics.length < 2) return 0;
    const latest = metrics[metrics.length - 1];
    const previous = metrics[metrics.length - 2];
    return ((latest - previous) / previous) * 100;
  };
  
  export const calculateStreak = (history: Record<string, boolean>) => {
    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    
    for (let i = 0; i < 365; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      if (history[dateStr]) {
        streak++;
      } else if (dateStr !== today) {
        break;
      }
    }
    
    return streak;
  };