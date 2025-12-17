import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { WORKSHEETS } from '../constants';
import TaskCard from '../components/TaskCard';
import { TaskCategory } from '../types';
import { ArrowLeft, BookOpen, Printer, Lock, CheckCircle, ArrowRight, Bookmark, ArrowUpRight } from 'lucide-react';

const categories: TaskCategory[] = ['Focus', 'Practice', 'Challenge'];

const WorksheetView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const worksheet = WORKSHEETS.find(ws => ws.id === id);

  // State for active tab and unlocked levels
  // Initialize with defaults, will be updated by useEffect from localStorage
  const [activeTab, setActiveTab] = useState<TaskCategory>('Focus');
  const [unlockedCategories, setUnlockedCategories] = useState<TaskCategory[]>(['Focus']);

  // Load progress from localStorage on mount
  useEffect(() => {
    if (id) {
      const savedProgress = localStorage.getItem(`mathmk_progress_${id}`);
      if (savedProgress) {
        try {
          const parsed = JSON.parse(savedProgress);
          if (parsed.unlockedCategories) setUnlockedCategories(parsed.unlockedCategories);
          if (parsed.activeTab) setActiveTab(parsed.activeTab);
        } catch (e) {
          console.error("Failed to load progress", e);
        }
      }
    }
  }, [id]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (id) {
      localStorage.setItem(`mathmk_progress_${id}`, JSON.stringify({
        unlockedCategories,
        activeTab
      }));
    }
  }, [id, unlockedCategories, activeTab]);

  if (!worksheet) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-600">
        <h2 className="text-2xl font-bold mb-4">Работниот лист не е пронајден</h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Врати се назад
        </Link>
      </div>
    );
  }

  // Filter tasks based on active category
  const currentTasks = worksheet.tasks.filter(task => task.category === activeTab);

  // Logic to handle unlocking the next section
  const handleFinishSection = () => {
    const currentIndex = categories.indexOf(activeTab);
    if (currentIndex < categories.length - 1) {
      const nextCategory = categories[currentIndex + 1];
      if (!unlockedCategories.includes(nextCategory)) {
        setUnlockedCategories(prev => [...prev, nextCategory]);
      }
      setActiveTab(nextCategory);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const jumpToTask = (taskId: string) => {
    const targetTask = worksheet.tasks.find(t => t.id === taskId);
    if (targetTask) {
        // Switch tab if necessary
        if (targetTask.category !== activeTab) {
            if (unlockedCategories.includes(targetTask.category)) {
                setActiveTab(targetTask.category);
                // Need a small timeout to allow React to render the new tab content before scrolling
                setTimeout(() => {
                    const el = document.getElementById(taskId);
                    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
                return;
            } else {
                alert(`Задачата ${taskId} е во заклучена секција (${targetTask.category}). Завршете ги претходните вежби за да отклучите.`);
                return;
            }
        }
        
        // If already on tab
        const el = document.getElementById(taskId);
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Navigation */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <Link to="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-2 transition-colors">
            <ArrowLeft size={20} className="mr-1" />
            Сите работни листови
          </Link>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <BookOpen className="text-blue-600" />
            {worksheet.title}
          </h1>
          <p className="text-slate-500 mt-1">{worksheet.section}</p>
        </div>
        
        <button 
            onClick={() => window.print()} 
            className="flex items-center justify-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-all print:hidden"
        >
            <Printer size={18} />
            Печати
        </button>
      </div>

      {/* NEW: Keywords Section (Top of page) */}
      {worksheet.keywords && worksheet.keywords.length > 0 && (
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-5 mb-8 shadow-sm">
            <div className="flex items-center gap-2 mb-3 text-amber-800 font-bold border-b border-amber-200/50 pb-2">
                <Bookmark size={20} />
                <h3>Клучни зборови</h3>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
                {worksheet.keywords.map((kw, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                        <span className="text-slate-700 font-medium">
                            {kw.text}
                        </span>
                        {kw.relatedTaskIds && kw.relatedTaskIds.length > 0 && (
                            <div className="flex gap-1">
                                {kw.relatedTaskIds.map(tid => (
                                    <button 
                                        key={tid}
                                        onClick={() => jumpToTask(tid)}
                                        className="text-[10px] bg-white border border-amber-200 text-amber-700 hover:bg-amber-100 hover:text-amber-900 px-1.5 py-0.5 rounded font-bold transition-colors flex items-center gap-0.5"
                                        title={`Оди до задача ${tid}`}
                                    >
                                        {tid} <ArrowUpRight size={10} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 mb-8 print:hidden">
            {categories.map((category) => {
            const isUnlocked = unlockedCategories.includes(category);
            const isActive = activeTab === category;
            
            return (
                <button
                key={category}
                onClick={() => isUnlocked && setActiveTab(category)}
                disabled={!isUnlocked}
                className={`
                    flex-1 py-4 text-center font-bold text-sm sm:text-base transition-all relative flex items-center justify-center gap-2
                    ${isActive 
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' 
                    : isUnlocked 
                        ? 'text-slate-600 hover:text-blue-500 hover:bg-slate-50' 
                        : 'text-slate-300 cursor-not-allowed bg-slate-50'
                    }
                `}
                >
                {category === 'Focus' && 'Фокус'}
                {category === 'Practice' && 'Вежбање'}
                {category === 'Challenge' && 'Предизвик'}
                
                {!isUnlocked && <Lock size={16} />}
                {isUnlocked && !isActive && unlockedCategories.indexOf(category) < unlockedCategories.indexOf(activeTab) && (
                    <CheckCircle size={16} className="text-green-500" />
                )}
                </button>
            );
            })}
      </div>

        {/* Task List */}
        <div className="space-y-8 min-h-[400px]">
            {currentTasks.length > 0 ? (
            currentTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))
            ) : (
            <div className="text-center py-12 text-slate-400">
                Нема задачи во оваа категорија.
            </div>
            )}
        </div>

        {/* Footer Area / Progression Control */}
        <div className="mt-12 p-8 border-t border-slate-200 flex justify-center print:hidden">
            {activeTab !== 'Challenge' ? (
            <button
                onClick={handleFinishSection}
                className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
                Заврши {activeTab === 'Focus' ? 'Фокус' : 'Вежбање'} и продолжи
                <ArrowRight size={20} />
            </button>
            ) : (
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
                <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Честитки!</h3>
                <p className="text-slate-500 mb-4">Успешно го комплетираше целиот работен лист.</p>
                <Link 
                to="/" 
                className="inline-block bg-slate-100 text-slate-700 px-6 py-2 rounded-lg font-medium hover:bg-slate-200 transition-colors"
                >
                Врати се на почетна
                </Link>
            </div>
            )}
        </div>
    </div>
  );
};

export default WorksheetView;