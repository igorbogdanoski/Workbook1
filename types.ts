export type TaskCategory = 'Focus' | 'Practice' | 'Challenge';

export interface Subtask {
  [key: string]: string;
}

export interface SpeechBubbleData {
  speaker: string; // e.g. "Marcus", "Zara"
  gender: 'male' | 'female';
  text: string; // The text inside the bubble (supports LaTeX $)
}

export interface Task {
  id: string;
  category: TaskCategory;
  instruction_mk: string;
  prompt_en: string;
  // New field to explicitly define behavior, defaults to 'standard' if not present
  taskType?: 'standard' | 'matching' | 'sorting' | 'notebook'; 
  // NEW: Defines the input method for standard tasks
  inputType?: 'text' | 'fraction' | 'mixed_number';
  
  math_elements_latex?: string[];
  math_groups?: { title?: string; items: string[] }[];
  
  // Standard inputs
  subtasks?: Subtask[];
  
  // NEW: Hybrid support - allows adding a sorting component to ANY task
  sortingItems?: string[]; 

  // NEW: Explicit instruction for a free text area (e.g. "Explain your answer")
  freeTextInstruction?: string;

  answers?: Record<string, string[]>;
  speechBubble?: SpeechBubbleData;
  tip?: string;
  styleVariant?: 'default' | 'notebook'; // Deprecated in favor of taskType, but kept for backward compat
}

export interface Keyword {
  text: string;
  relatedTaskIds?: string[]; // IDs of tasks where this concept is used
}

export interface Worksheet {
  id: string;
  title: string; 
  section: string;
  keywords?: Keyword[]; // Updated from string[] to Keyword[]
  tasks: Task[];
}