export interface Character {
  id: string;
  name: string;
  avatar: string;
  core: {
    values: string[];
    principles: string[];
    goals: string[];
  };
  personality: {
    traits: string[];
    hobbies: string[];
    aspirations: string[];
  };
  story: {
    background: string;
    motivation: string;
    challenges: string[];
    achievements: string[];
    futureGoals: string[];
  };
  stats: {
    confidence: number;
    resilience: number;
    creativity: number;
    empathy: number;
    wisdom: number;
    adaptability: number;
    determination: number;
    leadership: number;
  };
  relationships: {
    mentors: string[];
    allies: string[];
    rivals: string[];
  };
  growth: {
    skills: string[];
    lessons: string[];
    milestones: string[];
  };
  habit_stacks: {
    morning_stack: string[];
    afternoon_stack: string[];
    evening_stack: string[];
    trigger_habits: Record<string, string[]>;
  };
  habit_tracking: {
    completion_history: Record<string, boolean>;
    streak_data: Record<string, number>;
    success_rates: Record<string, number>;
  };
  progress_metrics: {
    weekly_scores: number[];
    strength_areas: Record<string, number>;
    growth_velocity: number[];
    consistency_metrics: Record<string, number>;
  };
  created_at: string;
  updated_at: string;
}

export type Mode = 'create' | 'edit' | 'preview';
export type AlertVariant = 'success' | 'error' | 'warning' | 'info';
export type ButtonVariant = 'default' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'default' | 'sm' | 'lg';