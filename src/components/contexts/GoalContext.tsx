// context/GoalContext.tsx

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Goal, GoalContextType } from '../../types/goals';

type GoalAction =
  | { type: 'ADD_GOAL'; payload: Goal }
  | { type: 'UPDATE_GOAL'; payload: { id: string; updates: Partial<Goal> } }
  | { type: 'DELETE_GOAL'; payload: string }
  | { type: 'LOAD_GOALS'; payload: Goal[] };

function calculateProgress(goal: Goal): number {
  if (!goal.phases.length) return 0;
  
  const completedTasks = goal.phases.reduce((acc, phase) => {
    return acc + phase.tasks.filter(task => task.status === 'completed').length;
  }, 0);
  
  const totalTasks = goal.phases.reduce((acc, phase) => acc + phase.tasks.length, 0);
  
  return totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
}

const goalReducer = (state: Goal[], action: GoalAction): Goal[] => {
  switch (action.type) {
    case 'ADD_GOAL':
      return [...state, action.payload];
      
    case 'UPDATE_GOAL': {
      return state.map(goal => {
        if (goal.id !== action.payload.id) return goal;
        
        const updatedGoal = {
          ...goal,
          ...action.payload.updates,
          updatedAt: new Date().toISOString()
        };
        
        // Recalculate progress whenever the goal is updated
        return {
          ...updatedGoal,
          progress: calculateProgress(updatedGoal)
        };
      });
    }
      
    case 'DELETE_GOAL':
      return state.filter(goal => goal.id !== action.payload);
      
    case 'LOAD_GOALS':
      return action.payload;
      
    default:
      return state;
  }
};

const GoalContext = createContext<GoalContextType>({
    goals: [],
    addGoal: () => {},
    updateGoal: () => {},
    deleteGoal: () => {},
    getGoal: () => undefined,
  });

  export const GoalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [goals, dispatch] = useReducer(goalReducer, []);
    
    useEffect(() => {
      const savedGoals = localStorage.getItem('goals');
      if (savedGoals) {
        dispatch({ type: 'LOAD_GOALS', payload: JSON.parse(savedGoals) });
      }
    }, []);
    
    useEffect(() => {
      localStorage.setItem('goals', JSON.stringify(goals));
    }, [goals]);
    
    const value = {
      goals,
      addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt' | 'progress'>) => {
        const now = new Date().toISOString();
        const newGoal: Goal = {
          ...goal,
          id: `goal_${Date.now()}`,
          createdAt: now,
          updatedAt: now,
          progress: 0
        };
        dispatch({ type: 'ADD_GOAL', payload: newGoal });
      },
      updateGoal: (id: string, updates: Partial<Goal>) => {
        dispatch({ type: 'UPDATE_GOAL', payload: { id, updates } });
      },
      deleteGoal: (id: string) => {
        dispatch({ type: 'DELETE_GOAL', payload: id });
      },
      getGoal: (id: string) => goals.find(goal => goal.id === id)
    };
  
    return (
      <GoalContext.Provider value={value}>
        {children}
      </GoalContext.Provider>
    );
  };


// Custom hook with proper error message
export const useGoals = () => {
  const context = useContext(GoalContext);
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalProvider');
  }
  return context;
};