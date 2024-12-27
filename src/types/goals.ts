// types/goal.ts

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: 'pending' | 'in-progress' | 'completed';
    startDate?: string;
    endDate?: string;
  }
  
  export interface Phase {
    id: string;
    title: string;
    description?: string;
    startDate: string;
    endDate: string;
    tasks: Task[];
    status: 'planned' | 'in-progress' | 'completed';
  }
  
  export interface Resource {
    type: 'time' | 'money' | 'human' | 'technical';
    description: string;
    quantity?: number;
    unit?: string;
  }
  
  export interface Goal {
    id: string;
    title: string;
    description: string;
    targetDate: string;
    
    // From flowchart requirements
    resources: Resource[];
    phases: Phase[];
    progress: number;
    
    // Metadata
    createdAt: string;
    updatedAt: string;
    status: 'draft' | 'active' | 'completed';
    timeline?: {
      startDate: string;
      endDate: string;
    };
  }
  
  export interface GoalContextType {
    goals: Goal[];
    addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt' | 'progress'>) => void;
    updateGoal: (id: string, updates: Partial<Goal>) => void;
    deleteGoal: (id: string) => void;
    getGoal: (id: string) => Goal | undefined;
  }