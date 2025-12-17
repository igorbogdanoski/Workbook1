import React from 'react';
import TextWithMath from './TextWithMath';

interface SpeechBubbleProps {
  speaker: string;
  gender: 'male' | 'female';
  text: string;
}

const Avatar: React.FC<{ gender: 'male' | 'female' }> = ({ gender }) => {
  if (gender === 'male') {
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-md transform hover:scale-105 transition-transform duration-300">
        <circle cx="50" cy="50" r="45" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
        <path d="M50 95 C 20 95 20 75 20 75 C 20 55 80 55 80 75 C 80 75 80 95 50 95" fill="#334155" />
        <circle cx="50" cy="45" r="25" fill="#f1d5b6" />
        <path d="M25 40 Q 50 10 75 40" fill="none" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
        <circle cx="40" cy="45" r="3" fill="#1e293b" />
        <circle cx="60" cy="45" r="3" fill="#1e293b" />
        <path d="M42 60 Q 50 65 58 60" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  } else {
    return (
      <svg viewBox="0 0 100 100" className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-md transform hover:scale-105 transition-transform duration-300">
        <circle cx="50" cy="50" r="45" fill="#fce7f3" stroke="#db2777" strokeWidth="2" />
        <path d="M50 95 C 20 95 20 75 20 75 C 20 55 80 55 80 75 C 80 75 80 95 50 95" fill="#831843" />
        <path d="M20 50 Q 50 0 80 50" fill="#4a044e" />
        <circle cx="50" cy="45" r="25" fill="#f8d7ba" />
        <circle cx="40" cy="45" r="3" fill="#1e293b" />
        <circle cx="60" cy="45" r="3" fill="#1e293b" />
        <path d="M42 60 Q 50 65 58 60" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
        <path d="M15 50 Q 10 65 25 70" fill="#4a044e" />
        <path d="M85 50 Q 90 65 75 70" fill="#4a044e" />
      </svg>
    );
  }
};

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ speaker, gender, text }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 my-6 max-w-2xl mx-auto">
      {/* Avatar Container */}
      <div className="flex flex-col items-center shrink-0 z-10">
        <div className="bg-white rounded-full p-1 border-2 border-slate-100">
            <Avatar gender={gender} />
        </div>
        <span className="mt-2 font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full text-sm">
          {speaker}
        </span>
      </div>

      {/* Bubble Container */}
      <div className="relative bg-white border-2 border-slate-200 rounded-2xl rounded-tl-none p-6 shadow-sm w-full">
        {/* CSS Triangle for the tail */}
        <div 
            className="absolute -top-[2px] -left-[14px] w-0 h-0 
                       border-t-[14px] border-t-slate-200 
                       border-l-[14px] border-l-transparent 
                       hidden sm:block"
        ></div>
        <div 
            className="absolute -top-[0px] -left-[10px] w-0 h-0 
                       border-t-[12px] border-t-white 
                       border-l-[12px] border-l-transparent 
                       hidden sm:block"
        ></div>
        
         {/* Top tail for mobile */}
         <div 
            className="absolute -top-[14px] left-1/2 -translate-x-1/2 w-0 h-0 
                       border-b-[14px] border-b-slate-200 
                       border-r-[14px] border-r-transparent 
                       border-l-[14px] border-l-transparent 
                       sm:hidden"
        ></div>
        <div 
            className="absolute -top-[11px] left-1/2 -translate-x-1/2 w-0 h-0 
                       border-b-[12px] border-b-white 
                       border-r-[12px] border-r-transparent 
                       border-l-[12px] border-l-transparent 
                       sm:hidden"
        ></div>

        <div className="text-lg md:text-xl text-slate-800 leading-relaxed font-medium">
          <TextWithMath text={text} />
        </div>
      </div>
    </div>
  );
};

export default SpeechBubble;