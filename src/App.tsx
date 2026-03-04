import React, { useState, useEffect } from 'react';
import { Project, Finding, ViewState, SavedInspection } from './types';
import { ProjectSetup } from './components/ProjectSetup';
import { CategorySelection } from './components/CategorySelection';
import { InspectionView } from './components/InspectionView';
import { ReportView } from './components/ReportView';
import { Dashboard } from './components/Dashboard';
import { ClipboardCheck, Globe } from 'lucide-react';
import { saveInspection } from './services/storage';
import { useLanguage } from './context/LanguageContext';
import { Language } from './i18n/translations';

export default function App() {
  const { t, language, setLanguage } = useLanguage();
  const [view, setView] = useState<ViewState>('dashboard');
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [findings, setFindings] = useState<Finding[]>([]);

  // Auto-save effect
  useEffect(() => {
    if (currentId && project) {
      saveInspection({
        id: currentId,
        updatedAt: Date.now(),
        status: view === 'report' ? 'completed' : 'draft',
        project,
        findings
      });
    }
  }, [currentId, project, findings, view]);

  const handleNewInspection = () => {
    const newId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    setCurrentId(newId);
    setProject(null);
    setFindings([]);
    setView('setup');
  };

  const handleLoadInspection = (inspection: SavedInspection) => {
    setCurrentId(inspection.id);
    setProject(inspection.project);
    setFindings(inspection.findings);
    
    if (inspection.status === 'completed') {
      setView('report');
    } else if (!inspection.project) {
      setView('setup');
    } else if (!inspection.project.selectedCategories || inspection.project.selectedCategories.length === 0) {
      setView('categories');
    } else {
      setView('inspection');
    }
  };

  const handleStart = (p: Project) => {
    setProject(p);
    setView('categories');
  };

  const handleCategoriesConfirm = (categories: string[]) => {
    if (project) {
      setProject({ ...project, selectedCategories: categories });
      setView('inspection');
    }
  };

  const handleAddFinding = (f: Finding) => {
    setFindings(prev => [...prev, f]);
  };

  const handleFinish = () => {
    setView('report');
  };

  const handleRestart = () => {
    setCurrentId(null);
    setProject(null);
    setFindings([]);
    setView('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setView('dashboard')}
          >
            <div className="bg-blue-600 p-2 rounded-lg">
              <ClipboardCheck className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">{t('app.title')}</span>
          </div>
          <div className="flex items-center gap-4">
            {project && view === 'inspection' && (
              <div className="flex items-center gap-4 border-r border-gray-200 pr-4">
                <div className="text-sm font-medium text-gray-500">
                  {project.name}
                </div>
                <button
                  onClick={() => setView('dashboard')}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  {t('inspection.save_exit')}
                </button>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="text-sm border-none bg-transparent text-gray-600 focus:ring-0 cursor-pointer"
              >
                <option value="es">ES</option>
                <option value="en">EN</option>
                <option value="pt">PT</option>
                <option value="fr">FR</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'dashboard' && (
          <Dashboard 
            onNewInspection={handleNewInspection} 
            onLoadInspection={handleLoadInspection} 
          />
        )}
        {view === 'setup' && (
          <ProjectSetup 
            onStart={handleStart} 
            onCancel={() => setView('dashboard')} 
          />
        )}
        {view === 'categories' && project && (
          <CategorySelection 
            project={project} 
            onConfirm={handleCategoriesConfirm} 
            onCancel={() => setView('dashboard')}
          />
        )}
        {view === 'inspection' && project && (
          <InspectionView 
            project={project} 
            findings={findings} 
            onAddFinding={handleAddFinding}
            onFinish={handleFinish}
          />
        )}
        {view === 'report' && project && (
          <ReportView 
            project={project} 
            findings={findings} 
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  );
}
