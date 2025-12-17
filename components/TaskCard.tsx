import React, { useState, useEffect, useCallback } from 'react';
import { Task } from '../types';
import MathRenderer from './MathRenderer';
import TextWithMath from './TextWithMath';
import SpeechBubble from './SpeechBubble';
import { Pencil, ChevronDown, ChevronUp, Check, X, RefreshCw, Lightbulb } from 'lucide-react';

interface TaskCardProps {
  task: Task;
}

// --- Helper Components (Internal to keep file count low, but separated logic) ---

/**
 * Reusable Input Component with Validation Visuals
 */
interface AnswerInputProps {
  id: string;
  value: string;
  onChange: (val: string) => void;
  status: 'correct' | 'incorrect' | 'neutral';
  placeholder?: string;
  isTextArea?: boolean;
}

const AnswerInput: React.FC<AnswerInputProps> = ({ id, value, onChange, status, placeholder, isTextArea }) => {
  const getBorderColor = () => {
    if (status === 'correct') return 'border-green-500 bg-green-50 ring-green-200';
    if (status === 'incorrect') return 'border-red-500 bg-red-50 ring-red-200';
    return 'border-slate-300 focus:border-blue-400 focus:ring-blue-400';
  };

  const commonClasses = `w-full border rounded-md focus:ring-2 focus:outline-none transition-all ${getBorderColor()}`;

  return (
    <div className="relative w-full">
      {isTextArea ? (
        <>
           <div className="absolute top-4 left-4 text-slate-400 pointer-events-none">
                <Pencil size={20} />
            </div>
            <textarea
                className={`${commonClasses} p-4 pl-12 h-32 text-lg rounded-xl shadow-sm`}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </>
      ) : (
        <input
            type="text"
            className={`${commonClasses} p-3 pr-10 text-base`}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
      )}
      
      {/* Validation Icon Overlay */}
      <div className={`absolute pointer-events-none ${isTextArea ? 'right-4 top-4 bg-white/80 rounded-full' : 'right-3 top-3'}`}>
        {status === 'correct' && <Check size={isTextArea ? 24 : 20} className="text-green-600" />}
        {status === 'incorrect' && <X size={isTextArea ? 24 : 20} className="text-red-500" />}
      </div>
    </div>
  );
};

// --- Main Component ---

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [showEnglish, setShowEnglish] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [validationStatus, setValidationStatus] = useState<Record<string, 'correct' | 'incorrect' | 'neutral'>>({});
  const [isChecked, setIsChecked] = useState(false);

  // Load answers from localStorage
  useEffect(() => {
    const savedAnswers = localStorage.getItem(`mathmk_answers_${task.id}`);
    if (savedAnswers) {
      try {
        setAnswers(JSON.parse(savedAnswers));
      } catch (e) {
        console.error("Failed to load answers", e);
      }
    }
  }, [task.id]);

  const handleInputChange = useCallback((key: string, value: string) => {
    setAnswers(prev => {
        const next = { ...prev, [key]: value };
        localStorage.setItem(`mathmk_answers_${task.id}`, JSON.stringify(next));
        return next;
    });
    
    // Reset validation state on input change to encourage retry
    setValidationStatus(prev => {
        if (prev[key] !== 'neutral') {
            setIsChecked(false);
            return { ...prev, [key]: 'neutral' };
        }
        return prev;
    });
  }, [task.id]);

  const normalizeString = (str: string) => str.toLowerCase().replace(/\s/g, '').replace(',', '.');

  const checkAnswers = () => {
    if (!task.answers) return;

    const newValidation: Record<string, 'correct' | 'incorrect' | 'neutral'> = {};
    
    // Helper to validate a single key
    const validateKey = (key: string) => {
        const userAnswer = answers[key] || '';
        const correctOptions = task.answers?.[key] || [];
        if (correctOptions.length === 0) return 'neutral';
        const isMatch = correctOptions.some(opt => normalizeString(opt) === normalizeString(userAnswer));
        return isMatch ? 'correct' : 'incorrect';
    };

    if (task.subtasks) {
      task.subtasks.forEach(sub => {
        const key = Object.keys(sub)[0];
        newValidation[key] = validateKey(key);
      });
    } else {
        newValidation['main'] = validateKey('main');
    }

    setValidationStatus(newValidation);
    setIsChecked(true);
  };

  const resetTask = () => {
      setAnswers({});
      setValidationStatus({});
      setIsChecked(false);
      localStorage.removeItem(`mathmk_answers_${task.id}`);
  };

  // Determine display style
  const isNotebook = task.styleVariant === 'notebook' || task.taskType === 'notebook';

  const notebookStyle = {
    backgroundImage: `linear-gradient(#9ca3af 1px, transparent 1px), linear-gradient(90deg, #9ca3af 1px, transparent 1px)`,
    backgroundSize: '20px 20px',
    backgroundColor: '#fdfbf7',
    fontFamily: '"Patrick Hand", cursive',
  };

  return (
    <div id={task.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6 transition-all hover:shadow-md break-inside-avoid scroll-mt-24">
      {/* 1. Header Area */}
      <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex justify-between items-center">
        <span className="font-bold text-slate-700 bg-slate-200 px-3 py-1 rounded-full text-sm">
          {task.id}
        </span>
        <div className="flex gap-2">
             <button onClick={resetTask} className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 font-medium print:hidden" title="Ресетирај">
                <RefreshCw size={14} />
              </button>
            <button onClick={() => setShowEnglish(!showEnglish)} className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 font-medium print:hidden">
              {showEnglish ? 'Сокриј англиски' : 'Прикажи англиски'}
              {showEnglish ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
        </div>
      </div>

      <div className="p-6">
        {/* 2. Instructions Area */}
        <div className="mb-4">
          <div className="text-lg text-slate-800 font-medium mb-1 leading-relaxed">
             <TextWithMath text={task.instruction_mk} />
          </div>
          {showEnglish && (
            <p className="text-sm text-slate-500 italic border-l-2 border-blue-200 pl-3 mt-2">
              <TextWithMath text={task.prompt_en} />
            </p>
          )}
        </div>
        
        {/* 3. Helper Content (Tips, Speech Bubbles) */}
        {task.tip && (
            <div className="my-6 border border-slate-300 rounded-lg overflow-hidden max-w-lg">
                <div className="bg-slate-700 text-white px-4 py-2 font-bold flex items-center gap-2">
                    <Lightbulb size={18} className="text-yellow-400" />
                    Совет (Tip)
                </div>
                <div className="bg-white p-4 text-slate-700 leading-relaxed border-t border-slate-200">
                    <TextWithMath text={task.tip} />
                </div>
            </div>
        )}

        {task.speechBubble && (
            <SpeechBubble 
                speaker={task.speechBubble.speaker}
                gender={task.speechBubble.gender}
                text={task.speechBubble.text}
            />
        )}

        {/* 4. Visual Content (Cards, Notebooks, Math Lists) */}
        {task.math_groups && (
          <div className="space-y-6 my-8">
            {task.math_groups.map((group, groupIdx) => (
              <div key={groupIdx} className="bg-slate-50/80 p-5 rounded-xl border border-slate-200">
                {group.title && (
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
                    {group.title}
                  </h4>
                )}
                <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                  {group.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="bg-white min-w-[80px] h-[70px] flex items-center justify-center p-3 rounded-xl border border-slate-200 shadow-sm text-xl text-slate-800 hover:border-blue-400 hover:shadow-md transition-all select-none hover:-translate-y-0.5">
                      <MathRenderer expression={item} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {task.math_elements_latex && task.math_elements_latex.length > 0 && (
          isNotebook ? (
            <div className="relative mx-auto max-w-lg my-8 shadow-lg transform -rotate-1" style={notebookStyle}>
                <div className="absolute left-10 top-0 bottom-0 w-[2px] bg-red-300 opacity-60"></div>
                <div className="p-8 pl-16 text-2xl text-blue-900 leading-[40px]">
                    <h4 className="font-bold underline mb-4 text-slate-700 opacity-80 text-xl font-sans not-italic">Домашна работа на Су:</h4>
                    {task.math_elements_latex.map((math, idx) => (
                        <div key={idx} className="mb-2"><MathRenderer expression={math} /></div>
                    ))}
                </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 my-6 p-6 bg-blue-50/40 rounded-xl justify-center border border-blue-100/50">
                {task.math_elements_latex.map((math, idx) => (
                <div key={idx} className="bg-white px-4 py-3 rounded-lg border border-blue-100 shadow-sm text-lg">
                    <MathRenderer expression={math} />
                </div>
                ))}
            </div>
          )
        )}

        {/* 5. Interaction Area (Inputs) */}
        <div className="space-y-4 mt-6">
          {task.subtasks && task.subtasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {task.subtasks.map((sub, idx) => {
                const key = Object.keys(sub)[0];
                const expression = sub[key];
                
                return (
                  <div key={idx} className="flex flex-col gap-2 p-3 border border-slate-100 rounded-lg bg-slate-50/30 transition-colors">
                    <div className="flex items-center gap-3 font-semibold text-slate-700 mb-1">
                      <span className="bg-slate-200 w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold text-slate-600">
                        {key}
                      </span>
                      <div className="text-lg">
                        <MathRenderer expression={expression} />
                      </div>
                    </div>
                    <AnswerInput 
                        id={key}
                        value={answers[key] || ''}
                        onChange={(val) => handleInputChange(key, val)}
                        status={validationStatus[key]}
                        placeholder="Одговор..."
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            // Single input area
            <div className="mt-2">
                <AnswerInput 
                    id="main"
                    value={answers['main'] || ''}
                    onChange={(val) => handleInputChange('main', val)}
                    status={validationStatus['main']}
                    placeholder="Напиши го твојот одговор и објаснување овде..."
                    isTextArea={true}
                />
            </div>
          )}
        </div>
        
        {/* 6. Footer / Grading */}
        {task.answers && (
            <div className="mt-6 flex justify-end print:hidden">
                <button 
                    onClick={checkAnswers}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow-sm transition-all active:scale-95"
                >
                   {isChecked ? 'Провери повторно' : 'Провери одговори'}
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;