import React from 'react';
import { Link } from 'react-router-dom';
import { WORKSHEETS } from '../constants';
import { FileText, ChevronRight, Calculator } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white mb-6 shadow-lg shadow-blue-200">
          <Calculator size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Математички Работилници
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Интерактивни вежби за учење и вежбање математика. Изберете тема за почеток.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WORKSHEETS.map((ws) => (
          <Link
            key={ws.id}
            to={`/worksheet/${ws.id}`}
            className="group block bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-slate-200 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <FileText size={24} />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-1 rounded">
                {ws.section.split(' ')[0]}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
              {ws.title}
            </h3>
            
            <p className="text-sm text-slate-500 mb-6">
              {ws.section}
            </p>
            
            <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
              Започни вежбање <ChevronRight size={16} className="ml-1" />
            </div>
          </Link>
        ))}

        {/* Placeholder for future worksheets */}
        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center text-slate-400 min-h-[200px]">
          <span className="mb-2">Уште лекции наскоро...</span>
        </div>
      </div>
    </div>
  );
};

export default Home;