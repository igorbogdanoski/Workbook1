import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Task } from '../types';
import MathRenderer from './MathRenderer';
import TextWithMath from './TextWithMath';
import SpeechBubble from './SpeechBubble';
import { Pencil, ChevronDown, ChevronUp, Check, X, RefreshCw, Lightbulb, ArrowRightLeft, GripVertical } from 'lucide-react';

interface TaskCardProps {
  task: Task;
}

// --- Helper Components ---

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
      
      <div className={`absolute pointer-events-none ${isTextArea ? 'right-4 top-4 bg-white/80 rounded-full' : 'right-3 top-3'}`}>
        {status === 'correct' && <Check size={isTextArea ? 24 : 20} className="text-green-600" />}
        {status === 'incorrect' && <X size={isTextArea ? 24 : 20} className="text-red-500" />}
      </div>
    </div>
  );
};

// --- NEW: Visual Fraction Input ---
const FractionInput: React.FC<AnswerInputProps> = ({ value, onChange, status }) => {
    const [num, den] = value.split('/');
    
    const handleChange = (newNum: string, newDen: string) => {
        if (!newNum && !newDen) onChange('');
        else onChange(`${newNum || ''}/${newDen || ''}`);
    };

    let borderColor = 'border-slate-300';
    let bg = 'bg-white';
    if (status === 'correct') { borderColor = 'border-green-500'; bg = 'bg-green-50'; }
    if (status === 'incorrect') { borderColor = 'border-red-500'; bg = 'bg-red-50'; }

    return (
        <div className={`inline-flex flex-col items-center justify-center p-2 rounded-lg border-2 ${borderColor} ${bg} shadow-sm transition-all relative`}>
             <input 
                type="text" 
                placeholder="#"
                className={`w-12 text-center font-bold text-lg outline-none bg-transparent border-b border-slate-300 focus:border-blue-500 p-1`}
                value={num || ''}
                onChange={(e) => handleChange(e.target.value, den)}
             />
             <div className="w-full h-[2px] bg-slate-800 my-1"></div>
             <input 
                type="text" 
                placeholder="#"
                className={`w-12 text-center font-bold text-lg outline-none bg-transparent p-1`}
                value={den || ''}
                onChange={(e) => handleChange(num, e.target.value)}
             />
             {status !== 'neutral' && (
                <div className="absolute -right-3 -top-3 bg-white rounded-full p-0.5 shadow-sm border border-slate-100">
                    {status === 'correct' ? <Check size={16} className="text-green-600"/> : <X size={16} className="text-red-500"/>}
                </div>
             )}
        </div>
    );
};

// --- NEW: Mixed Number Input ---
const MixedNumberInput: React.FC<AnswerInputProps> = ({ value, onChange, status }) => {
    const parts = value.split(' ');
    const whole = parts[0] || '';
    const fractionPart = parts[1] || '';
    const [num, den] = fractionPart.split('/');

    const handleChange = (w: string, n: string, d: string) => {
        const fPart = (n || d) ? `${n || ''}/${d || ''}` : '';
        const res = `${w}${fPart ? ' ' + fPart : ''}`;
        onChange(res.trim());
    };

    let borderColor = 'border-slate-300';
    let bg = 'bg-white';
    if (status === 'correct') { borderColor = 'border-green-500'; bg = 'bg-green-50'; }
    if (status === 'incorrect') { borderColor = 'border-red-500'; bg = 'bg-red-50'; }

    return (
        <div className={`inline-flex items-center gap-2 p-3 rounded-lg border-2 ${borderColor} ${bg} shadow-sm transition-all relative`}>
             <input 
                type="text" 
                placeholder="#"
                className="w-10 h-12 text-center font-bold text-2xl outline-none bg-transparent border border-slate-200 rounded focus:border-blue-400 focus:ring-2 ring-blue-100"
                value={whole}
                onChange={(e) => handleChange(e.target.value, num, den)}
             />
             <div className="flex flex-col items-center">
                <input 
                    type="text" 
                    className="w-10 text-center font-bold text-sm outline-none bg-transparent border-b border-slate-400 focus:border-blue-500 p-0.5"
                    value={num || ''}
                    onChange={(e) => handleChange(whole, e.target.value, den)}
                />
                <div className="w-full h-[2px] bg-slate-800 my-0.5"></div>
                <input 
                    type="text" 
                    className="w-10 text-center font-bold text-sm outline-none bg-transparent p-0.5"
                    value={den || ''}
                    onChange={(e) => handleChange(whole, num, e.target.value)}
                />
             </div>
              {status !== 'neutral' && (
                <div className="absolute -right-3 -top-3 bg-white rounded-full p-0.5 shadow-sm border border-slate-100">
                    {status === 'correct' ? <Check size={16} className="text-green-600"/> : <X size={16} className="text-red-500"/>}
                </div>
             )}
        </div>
    );
};


// --- DnD Matching Component ---
interface MatchingGameProps {
  fractions: string[];
  decimals: string[];
  matches: Record<string, string>;
  onMatch: (fraction: string, decimal: string) => void;
  onRemoveMatch: (fraction: string) => void;
  validationStatus: Record<string, 'correct' | 'incorrect' | 'neutral'>;
}

const MatchingGame: React.FC<MatchingGameProps> = ({ 
  fractions, decimals, matches, onMatch, onRemoveMatch, validationStatus 
}) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, item: string) => {
    setDraggedItem(item);
    e.dataTransfer.setData('text/plain', item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetFraction: string) => {
    e.preventDefault();
    const decimal = e.dataTransfer.getData('text/plain');
    if (decimal) {
      onMatch(targetFraction, decimal);
    }
    setDraggedItem(null);
  };

  const usedDecimals = Object.values(matches);
  const availableDecimals = decimals.filter(d => !usedDecimals.includes(d));

  return (
    <div className="flex flex-col md:flex-row gap-8 my-6">
      <div className="flex-1 space-y-3">
        <h4 className="font-bold text-slate-500 text-center mb-2 uppercase text-sm tracking-wider">Дропки</h4>
        {fractions.map((fraction, idx) => {
          const matchedDecimal = matches[fraction];
          const status = validationStatus[fraction] || 'neutral';
          let statusBorder = 'border-slate-200';
          let statusBg = 'bg-slate-50';
          if (status === 'correct') { statusBorder = 'border-green-400'; statusBg = 'bg-green-50'; }
          if (status === 'incorrect') { statusBorder = 'border-red-300'; statusBg = 'bg-red-50'; }

          return (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-24 h-16 bg-white border border-slate-300 rounded-lg flex items-center justify-center shadow-sm text-lg font-medium text-slate-800">
                <MathRenderer expression={fraction} />
              </div>
              <ArrowRightLeft size={16} className="text-slate-300" />
              <div 
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, fraction)}
                className={`flex-1 h-16 border-2 border-dashed rounded-lg flex items-center justify-center transition-all relative
                  ${matchedDecimal 
                    ? `border-solid ${statusBorder} ${statusBg} shadow-sm` 
                    : 'border-slate-300 bg-slate-100/50 hover:bg-blue-50 hover:border-blue-300'}
                `}
              >
                {matchedDecimal ? (
                  <div className="flex items-center gap-2 w-full justify-center px-2 cursor-grab active:cursor-grabbing"
                       draggable
                       onDragStart={(e) => handleDragStart(e, matchedDecimal)}
                  >
                    <MathRenderer expression={matchedDecimal} />
                    <button 
                        onClick={() => onRemoveMatch(fraction)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-red-500 rounded-full hover:bg-white/50"
                        title="Отстрани"
                    >
                        <X size={14} />
                    </button>
                    {status === 'correct' && <div className="absolute -right-2 -top-2 bg-green-500 text-white rounded-full p-0.5"><Check size={12}/></div>}
                  </div>
                ) : (
                  <span className="text-slate-400 text-sm pointer-events-none select-none">Повлечи овде</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex-1 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
         <h4 className="font-bold text-slate-500 text-center mb-4 uppercase text-sm tracking-wider">Банка со децимали</h4>
         <div className="flex flex-wrap gap-3 justify-center content-start min-h-[200px]">
            {availableDecimals.map((decimal, idx) => (
              <div
                key={idx}
                draggable
                onDragStart={(e) => handleDragStart(e, decimal)}
                className="bg-white px-4 py-3 rounded-lg border border-blue-200 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2 select-none"
              >
                <GripVertical size={14} className="text-slate-300" />
                <MathRenderer expression={decimal} />
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

// --- DnD Sorting Component ---
interface SortingGameProps {
  items: string[];
  onOrderChange: (newItems: string[]) => void;
  status: 'correct' | 'incorrect' | 'neutral';
}

const SortingGame: React.FC<SortingGameProps> = ({ items, onOrderChange, status }) => {
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggingIdx(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (draggingIdx === null) return;
    if (draggingIdx === index) return;
    const newItems = [...items];
    const draggedItem = newItems[draggingIdx];
    newItems.splice(draggingIdx, 1);
    newItems.splice(index, 0, draggedItem);
    onOrderChange(newItems);
    setDraggingIdx(index);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggingIdx(null);
  };

  let containerClass = "border border-slate-200 bg-slate-50";
  if (status === 'correct') containerClass = "border-green-400 bg-green-50 ring-2 ring-green-200";
  if (status === 'incorrect') containerClass = "border-red-300 bg-red-50 ring-2 ring-red-100";

  return (
    <div className={`p-4 rounded-xl ${containerClass} transition-all mt-6`}>
        <div className="text-center mb-4 text-slate-500 font-medium text-sm border-b border-slate-200/50 pb-2">
            Подреди ги картичките (влечи лево-десно)
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
            {items.map((item, index) => (
                <div
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={handleDrop}
                    className={`
                        bg-white border-2 rounded-lg p-3 min-w-[60px] flex items-center gap-2 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-all select-none
                        ${draggingIdx === index ? 'opacity-50 border-blue-400 scale-95' : 'border-slate-200'}
                    `}
                >
                    <GripVertical size={14} className="text-slate-300" />
                    <MathRenderer expression={item} />
                </div>
            ))}
        </div>
        {status === 'correct' && (
            <div className="mt-4 text-center text-green-600 font-bold flex items-center justify-center gap-2">
                <Check size={20} /> Точен редослед!
            </div>
        )}
         {status === 'incorrect' && (
            <div className="mt-4 text-center text-red-500 font-bold flex items-center justify-center gap-2">
                <X size={20} /> Обиди се повторно.
            </div>
        )}
    </div>
  );
};

// --- Main Component ---

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [showEnglish, setShowEnglish] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [matches, setMatches] = useState<Record<string, string>>({}); 
  const [sortedItems, setSortedItems] = useState<string[]>([]);
  const [validationStatus, setValidationStatus] = useState<Record<string, 'correct' | 'incorrect' | 'neutral'>>({});
  const [isChecked, setIsChecked] = useState(false);

  // Determine if we need to show sorting logic
  const hasSorting = !!(task.sortingItems || task.taskType === 'sorting');
  // Determine if we are purely matching
  const isMatching = task.taskType === 'matching';

  // Initialize data
  useEffect(() => {
    const savedData = localStorage.getItem(`mathmk_answers_${task.id}`);
    
    // Setup Sorting Items (Hybrid or Dedicated)
    if (hasSorting) {
        // If sorting items are explicit, use them, otherwise check math_groups
        const initialItems = task.sortingItems || (task.math_groups ? task.math_groups[0].items : []);
        
        // Try loading saved sort
        let loadedSort = null;
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                // Hybrid save might be object { inputs: ..., sort: ... }
                // Old sorting save was just array [...]
                if (Array.isArray(parsed)) loadedSort = parsed;
                else if (parsed.sort) loadedSort = parsed.sort;
            } catch (e) {}
        }
        setSortedItems(loadedSort || initialItems);
    }

    // Setup Standard Inputs / Matches
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (isMatching) {
             setMatches(parsed);
        } else if (!Array.isArray(parsed)) { 
             // Standard or Hybrid inputs
             // If hybrid, it might be { inputs: {...}, sort: [...] }
             // We need to support both legacy flat object and new hybrid structure
             if (parsed.inputs) setAnswers(parsed.inputs);
             else if (!parsed.sort) setAnswers(parsed); // Legacy flat object
        }
      } catch (e) {}
    }
  }, [task.id, task.taskType, task.math_groups, task.sortingItems, hasSorting, isMatching]);

  const saveToStorage = () => {
      // Create a unified save structure
      let dataToSave: any;
      if (isMatching) {
          dataToSave = matches;
      } else if (hasSorting) {
          // Hybrid save
          dataToSave = {
              inputs: answers,
              sort: sortedItems
          };
      } else {
          // Standard save
          dataToSave = answers;
      }
      localStorage.setItem(`mathmk_answers_${task.id}`, JSON.stringify(dataToSave));
  };

  // Trigger save whenever state changes significantly
  useEffect(() => {
     // We can't easily put this in individual handlers if we want a unified format, 
     // but for simplicity, we call saveToStorage in handlers. 
     // This effect is just a backup or could be used instead.
  }, [answers, matches, sortedItems]);

  const handleInputChange = useCallback((key: string, value: string) => {
    setAnswers(prev => {
        const next = { ...prev, [key]: value };
        // We need to defer saving or pass the new state to save
        // Simplified:
        if (hasSorting) {
            localStorage.setItem(`mathmk_answers_${task.id}`, JSON.stringify({ inputs: next, sort: sortedItems }));
        } else {
            localStorage.setItem(`mathmk_answers_${task.id}`, JSON.stringify(next));
        }
        return next;
    });
    setValidationStatus(prev => ({ ...prev, [key]: 'neutral' }));
    setIsChecked(false);
  }, [task.id, hasSorting, sortedItems]);

  const handleMatch = (fraction: string, decimal: string) => {
      const cleanedMatches = { ...matches };
      Object.keys(cleanedMatches).forEach(key => {
          if (cleanedMatches[key] === decimal) delete cleanedMatches[key];
      });
      const newMatches = { ...cleanedMatches, [fraction]: decimal };
      setMatches(newMatches);
      localStorage.setItem(`mathmk_answers_${task.id}`, JSON.stringify(newMatches));
      setValidationStatus({});
      setIsChecked(false);
  };

  const handleRemoveMatch = (fraction: string) => {
      const newMatches = { ...matches };
      delete newMatches[fraction];
      setMatches(newMatches);
      localStorage.setItem(`mathmk_answers_${task.id}`, JSON.stringify(newMatches));
      setValidationStatus(prev => ({ ...prev, [fraction]: 'neutral' }));
      setIsChecked(false);
  };

  const handleSortChange = (newOrder: string[]) => {
      setSortedItems(newOrder);
      if (!isMatching) {
         localStorage.setItem(`mathmk_answers_${task.id}`, JSON.stringify({ inputs: answers, sort: newOrder }));
      } else {
         localStorage.setItem(`mathmk_answers_${task.id}`, JSON.stringify(newOrder)); // Legacy sorting only
      }
      setValidationStatus(prev => ({ ...prev, 'sorting': 'neutral' }));
      setIsChecked(false);
  }

  const normalizeString = (str: string) => str.toLowerCase().replace(/\s/g, '').replace(',', '.');

  const checkAnswers = () => {
    if (!task.answers) return;

    const newValidation: Record<string, 'correct' | 'incorrect' | 'neutral'> = {};
    let allCorrect = true;

    // 1. Check Sorting (if applicable)
    if (hasSorting && task.answers['sorting']) {
        const correctOrder = task.answers['sorting'];
        const isCorrect = sortedItems.length === correctOrder.length && 
            sortedItems.every((val, index) => normalizeString(val) === normalizeString(correctOrder[index]));
        
        newValidation['sorting'] = isCorrect ? 'correct' : 'incorrect';
        if (!isCorrect) allCorrect = false;
    } else if (task.taskType === 'sorting') {
        // Fallback for simple sorting tasks
        const correctOrder = task.answers['main'];
        if (correctOrder) {
             const isCorrect = sortedItems.length === correctOrder.length && 
                sortedItems.every((val, index) => normalizeString(val) === normalizeString(correctOrder[index]));
             newValidation['sorting'] = isCorrect ? 'correct' : 'incorrect';
        }
    }

    // 2. Check Matching (if applicable)
    if (isMatching) {
        Object.keys(task.answers).forEach(fractionKey => {
            const userDecimal = matches[fractionKey];
            const correctDecimals = task.answers?.[fractionKey] || [];
            
            if (!userDecimal) {
                newValidation[fractionKey] = 'neutral';
                allCorrect = false;
            } else {
                const isMatch = correctDecimals.includes(userDecimal);
                newValidation[fractionKey] = isMatch ? 'correct' : 'incorrect';
                if (!isMatch) allCorrect = false;
            }
        });
    }

    // 3. Check Standard/Subtask Inputs
    if (!isMatching) {
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
                const res = validateKey(key);
                newValidation[key] = res;
                if (res !== 'correct') allCorrect = false;
            });
        } else if (task.answers['main'] && !hasSorting) {
            // Only validate main if strictly a text task
             newValidation['main'] = validateKey('main');
        }
    }

    setValidationStatus(newValidation);
    setIsChecked(true);
  };

  const resetTask = () => {
      setAnswers({});
      setMatches({});
      if (hasSorting) {
          const initialItems = task.sortingItems || (task.math_groups ? task.math_groups[0].items : []);
          setSortedItems(initialItems);
      }
      setValidationStatus({});
      setIsChecked(false);
      localStorage.removeItem(`mathmk_answers_${task.id}`);
  };

  const isNotebook = task.styleVariant === 'notebook' || task.taskType === 'notebook';
  
  // Realistic Notebook CSS
  const notebookStyle = {
    // White paper with light blue horizontal lines and a red vertical margin line
    backgroundImage: `
        linear-gradient(90deg, transparent 49px, #fca5a5 49px, #fca5a5 51px, transparent 51px),
        linear-gradient(#e5e7eb 1px, transparent 1px)
    `,
    backgroundSize: '100% 100%, 100% 32px', // 32px line height
    backgroundColor: '#fff',
    fontFamily: '"Patrick Hand", cursive',
    lineHeight: '32px'
  };

  // Helper to render the correct input type
  const renderInput = (key: string, placeholder?: string, isTextArea?: boolean) => {
      if (task.inputType === 'fraction') {
          return <FractionInput id={key} value={answers[key] || ''} onChange={(val) => handleInputChange(key, val)} status={validationStatus[key]} />;
      }
      if (task.inputType === 'mixed_number') {
        return <MixedNumberInput id={key} value={answers[key] || ''} onChange={(val) => handleInputChange(key, val)} status={validationStatus[key]} />;
      }
      return <AnswerInput id={key} value={answers[key] || ''} onChange={(val) => handleInputChange(key, val)} status={validationStatus[key]} placeholder={placeholder} isTextArea={isTextArea} />;
  }

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
        
        {/* Tips / Speech Bubble */}
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
        {task.speechBubble && <SpeechBubble speaker={task.speechBubble.speaker} gender={task.speechBubble.gender} text={task.speechBubble.text} />}

        {/* 4. CONTENT RENDERERS */}
        
        {/* A) Matching Game Renderer */}
        {isMatching && task.math_groups && (
            <MatchingGame 
                fractions={task.math_groups[0].items}
                decimals={task.math_groups[1].items}
                matches={matches}
                onMatch={handleMatch}
                onRemoveMatch={handleRemoveMatch}
                validationStatus={validationStatus}
            />
        )}

        {/* B) Math Groups (Non-matching) */}
        {!isMatching && task.math_groups && !hasSorting && (
          <div className="space-y-6 my-8">
            {task.math_groups.map((group, groupIdx) => (
              <div key={groupIdx} className="bg-slate-50/80 p-5 rounded-xl border border-slate-200">
                {group.title && <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">{group.title}</h4>}
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

        {/* C) Math Elements List (Notebook Style or Standard) */}
        {task.math_elements_latex && task.math_elements_latex.length > 0 && (
          isNotebook ? (
            <div className="w-full my-8 shadow-md border border-slate-300 transform -rotate-1 origin-top-left overflow-hidden" style={notebookStyle}>
                <div className="p-8 pl-16 text-2xl text-blue-900 w-full min-h-[300px]">
                    <h4 className="font-bold underline mb-6 text-slate-700 opacity-80 text-xl font-sans not-italic">
                        Домашна работа на Сузана:
                    </h4>
                    {/* Render items in a responsive grid/flex layout to use the full width */}
                    <div className="flex flex-wrap gap-x-12 gap-y-2">
                        {task.math_elements_latex.map((math, idx) => (
                            <div key={idx} className="mb-2 min-w-[150px]">
                                <MathRenderer expression={math} />
                            </div>
                        ))}
                    </div>
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

        {/* NEW: Free Text Instruction Area (Hybrid Tasks) */}
        {task.freeTextInstruction && (
            <div className="mb-6">
                <label className="block text-slate-700 font-semibold mb-2">{task.freeTextInstruction}</label>
                {renderInput('freeText', "Напиши го твоето објаснување овде...", true)}
            </div>
        )}

        {/* 5. Inputs (Calculations) */}
        {!isMatching && (
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
                        <div className="text-lg"><MathRenderer expression={expression} /></div>
                        </div>
                        {renderInput(key, "Децимален број...")}
                    </div>
                    );
                })}
                </div>
            ) : (
                // Single input area (only if no free text instruction, as that renders its own input)
                !task.freeTextInstruction && !hasSorting && (
                    <div className="mt-2">
                        {renderInput('main', "Напиши го твојот одговор и објаснување овде...", true)}
                    </div>
                )
            )}
            </div>
        )}
        
        {/* D) Sorting Game (Hybrid or Standalone) */}
        {hasSorting && (
             <SortingGame 
                items={sortedItems}
                onOrderChange={handleSortChange}
                status={validationStatus['sorting'] || 'neutral'}
             />
        )}
        
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