import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WorksheetView from './pages/WorksheetView';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-800">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm print:hidden">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xl text-slate-800">
                    <span className="text-blue-600">Math</span>Mk
                </div>
            </div>
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/worksheet/:id" element={<WorksheetView />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-slate-200 py-8 mt-12 print:hidden">
            <div className="max-w-6xl mx-auto px-4 text-center text-slate-400 text-sm">
                &copy; {new Date().getFullYear()} MathWorksheets MK. Сите права се задржани.
            </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;