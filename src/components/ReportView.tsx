import React, { useEffect, useState } from 'react';
import { Project, Finding } from '../types';
import { generateFinalChecklist } from '../services/geminiService';
import { exportToDocx } from '../services/exportService';
import { Building, AlertTriangle, CheckCircle2, Download, Loader2, FileText } from 'lucide-react';
import Markdown from 'react-markdown';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  project: Project;
  findings: Finding[];
  onRestart: () => void;
}

export function ReportView({ project, findings, onRestart }: Props) {
  const { t, language } = useLanguage();
  const [checklist, setChecklist] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    async function fetchChecklist() {
      const result = await generateFinalChecklist(project, findings, language);
      setChecklist(result);
      setIsGenerating(false);
    }
    fetchChecklist();
  }, [project, findings, language]);

  const incidences = findings.filter(f => f.isIncidence);
  const okFindings = findings.filter(f => !f.isIncidence);

  // Agrupar hallazgos por categoría
  const findingsByCategory = findings.reduce((acc, finding) => {
    if (!acc[finding.category]) {
      acc[finding.category] = [];
    }
    acc[finding.category].push(finding);
    return acc;
  }, {} as Record<string, Finding[]>);

  const handlePrint = () => {
    window.print();
  };

  const handleExportDocx = async () => {
    await exportToDocx(project, findings, checklist, t);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 print:space-y-0 print:max-w-none print:m-0">
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 print:hidden">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{t('report.options')}</h2>
          <p className="text-xs text-gray-500 mt-1">{t('report.options.desc')}</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExportDocx}
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
          >
            <FileText className="w-4 h-4" />
            {t('report.export_docx')}
          </button>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            {t('report.print_pdf')}
          </button>
          <button
            onClick={onRestart}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            {t('report.back_home')}
          </button>
        </div>
      </div>

      <div id="pdf-content" className="space-y-8 print:space-y-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 print:border-none print:shadow-none print:p-0">
          <div className="mb-8 border-b pb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('report.title')}</h1>
            <div className="flex items-center gap-2 text-gray-500">
              <Building className="w-5 h-5" />
              <span className="text-lg">{project.name} • {t(`asset.${project.type.toLowerCase()}`)} ({project.year})</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-red-50 p-4 rounded-xl border border-red-100">
            <div className="text-red-600 font-semibold mb-1">{t('report.incidences')}</div>
            <div className="text-3xl font-bold text-red-700">{incidences.length}</div>
          </div>
          <div className="bg-green-50 p-4 rounded-xl border border-green-100">
            <div className="text-green-600 font-semibold mb-1">{t('report.ok_elements')}</div>
            <div className="text-3xl font-bold text-green-700">{okFindings.length}</div>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">{t('report.details')}</h2>
          {Object.entries(findingsByCategory).map(([category, catFindings]) => (
            <div key={category} className="space-y-4" style={{ pageBreakInside: 'avoid' }}>
              <h3 className="text-lg font-bold text-gray-800 bg-gray-100 px-3 py-2 rounded-md">{t(category)}</h3>
              <div className="space-y-4">
                {catFindings.map(f => (
                  <div key={f.id} className={`flex gap-4 p-4 rounded-xl border ${f.isIncidence ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-200'}`}>
                    {f.isIncidence ? (
                      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 font-medium mb-1">
                        {f.isIncidence ? t('inspection.incidence') : t('inspection.observation')}
                      </p>
                      <p className="text-sm text-gray-600 mb-3">{f.description}</p>
                      
                      {f.photoUrl && (
                        <img src={f.photoUrl} alt="Evidencia" className="h-32 rounded-lg object-cover border border-gray-200 mb-3" />
                      )}
                      
                      {f.aiFeedback && (
                        <div className="bg-white/60 rounded-lg p-3 text-xs text-gray-700 border border-gray-200">
                          <span className="font-semibold block mb-1">{t('report.ai_note')}:</span>
                          {f.aiFeedback}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {findings.length === 0 && (
            <p className="text-gray-500 text-sm">{t('report.no_findings')}</p>
          )}
        </div>

        <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 mt-8" style={{ pageBreakBefore: 'always' }}>
          <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6" />
            {t('report.ai_notes')}
          </h2>
          {isGenerating ? (
            <div className="flex items-center gap-3 text-blue-700">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{t('report.generating')}</span>
            </div>
          ) : (
            <div className="prose prose-blue max-w-none text-blue-900">
              <Markdown>{checklist || ''}</Markdown>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
}
