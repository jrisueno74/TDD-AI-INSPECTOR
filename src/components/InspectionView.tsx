import React, { useState, useRef, useEffect } from 'react';
import { Project, Finding } from '../types';
import { analyzeFinding } from '../services/geminiService';
import { Camera, Mic, MicOff, AlertTriangle, CheckCircle2, Send, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  project: Project;
  findings: Finding[];
  onAddFinding: (finding: Finding) => void;
  onFinish: () => void;
}

export function InspectionView({ project, findings, onAddFinding, onFinish }: Props) {
  const { t, language } = useLanguage();
  const categories = project.selectedCategories || ['cat.structure'];
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState('');
  const [isIncidence, setIsIncidence] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [photoMimeType, setPhotoMimeType] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [filterType, setFilterType] = useState<'all' | 'incidence' | 'observation'>('all');

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [cat]: !prev[cat]
    }));
  };

  const filteredFindings = findings.filter(f => {
    if (filterType === 'all') return true;
    if (filterType === 'incidence') return f.isIncidence;
    if (filterType === 'observation') return !f.isIncidence;
    return true;
  });

  const findingsByCategory = filteredFindings.reduce((acc, finding) => {
    if (!acc[finding.category]) {
      acc[finding.category] = [];
    }
    acc[finding.category].push(finding);
    return acc;
  }, {} as Record<string, Finding[]>);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language === 'en' ? 'en-US' : language === 'pt' ? 'pt-BR' : language === 'fr' ? 'fr-FR' : 'es-ES';

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setDescription((prev) => prev + (prev && !prev.endsWith(' ') ? ' ' : '') + finalTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [language]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert(t('inspection.speech_error'));
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPhotoPreview(result);
      
      const match = result.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
      if (match) {
        setPhotoMimeType(match[1]);
        setPhotoBase64(match[2]);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) return;

    setIsAnalyzing(true);

    const partialFinding = {
      category,
      description,
      photoBase64: photoBase64 || undefined,
      photoMimeType: photoMimeType || undefined,
    };

    const aiFeedback = await analyzeFinding(project, partialFinding, language);

    const newFinding: Finding = {
      id: Date.now().toString(),
      category,
      description,
      photoUrl: photoPreview || undefined,
      photoBase64: photoBase64 || undefined,
      photoMimeType: photoMimeType || undefined,
      aiFeedback,
      isIncidence,
      timestamp: Date.now(),
    };

    onAddFinding(newFinding);
    setDescription('');
    setPhotoPreview(null);
    setPhotoBase64(null);
    setPhotoMimeType(null);
    setIsIncidence(false);
    setIsAnalyzing(false);
  };

  const missingCategories = categories.filter(c => !findings.some(f => f.category === c));

  const handleAttemptFinish = () => {
    if (missingCategories.length > 0) {
      setShowWarning(true);
    } else {
      onFinish();
    }
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('inspection.new_finding')}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    category === c 
                      ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                      : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {t(c)}
                </button>
              ))}
            </div>

            <div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('inspection.placeholder')}
                className="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border min-h-[100px]"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Camera className="w-5 h-5" />
                  <span className="text-sm font-medium">{t('inspection.photo')}</span>
                </button>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                />
                
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`flex items-center gap-2 transition-colors ${
                    isListening ? 'text-red-500 hover:text-red-600 animate-pulse' : 'text-gray-600 hover:text-blue-600'
                  }`}
                  title={isListening ? "Detener dictado" : t('inspection.dictate')}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  <span className="text-sm font-medium">{isListening ? t('inspection.listening') : t('inspection.dictate')}</span>
                </button>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isIncidence}
                  onChange={(e) => setIsIncidence(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500 h-4 w-4"
                />
                <span className="text-sm font-medium text-gray-700">{t('inspection.mark_incidence')}</span>
              </label>
            </div>

            {photoPreview && (
              <div className="relative inline-block mt-4">
                <img src={photoPreview} alt="Preview" className="h-32 rounded-lg object-cover border border-gray-200" />
                <button
                  type="button"
                  onClick={() => { setPhotoPreview(null); setPhotoBase64(null); setPhotoMimeType(null); }}
                  className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200"
                >
                  <span className="sr-only">Eliminar</span>
                  &times;
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isAnalyzing || !description}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t('inspection.analyzing')}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {t('inspection.register')}
                </>
              )}
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{t('inspection.registered_findings')}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${filterType === 'all' ? 'bg-gray-800 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
              >
                {t('inspection.filter.all')}
              </button>
              <button
                onClick={() => setFilterType('incidence')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${filterType === 'incidence' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
              >
                {t('inspection.filter.incidences')}
              </button>
              <button
                onClick={() => setFilterType('observation')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${filterType === 'observation' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
              >
                {t('inspection.filter.observations')}
              </button>
            </div>
          </div>
          
          {categories.map(cat => {
            const catFindings = findingsByCategory[cat] || [];
            if (catFindings.length === 0) return null;

            const isExpanded = expandedCategories[cat] !== false; // Default to true if not set

            return (
              <div key={cat} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  onClick={() => toggleCategory(cat)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors border-b border-gray-100"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{t(cat)}</span>
                    <span className="bg-white px-2 py-0.5 rounded-full text-xs font-medium text-gray-600 border border-gray-200">
                      {catFindings.length}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-4 space-y-4">
                    {catFindings.slice().reverse().map(f => (
                      <div key={f.id} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                        <div className="flex-shrink-0 mt-1">
                          {f.isIncidence ? (
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                          ) : (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-xs font-semibold uppercase tracking-wider ${f.isIncidence ? 'text-red-600' : 'text-green-600'}`}>
                              {f.isIncidence ? t('inspection.incidence') : t('inspection.observation')}
                            </span>
                            <span className="text-xs text-gray-400">{new Date(f.timestamp).toLocaleTimeString()}</span>
                          </div>
                          <p className="text-sm text-gray-900 mb-2">{f.description}</p>
                          {f.photoUrl && (
                            <img src={f.photoUrl} alt="Finding" className="h-24 rounded-lg object-cover mb-2 border border-gray-200" />
                          )}
                          {f.aiFeedback && (
                            <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800 border border-blue-100 mt-2">
                              <p className="font-medium mb-1 text-xs uppercase tracking-wider">Asistente IA:</p>
                              <p className="whitespace-pre-wrap">{f.aiFeedback}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="md:col-span-1">
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 sticky top-6">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Progreso de Inspección</h3>
          <div className="space-y-3 mb-6">
            {categories.map(cat => {
              const count = findings.filter(f => f.category === cat).length;
              return (
                <div key={cat} className="flex items-center justify-between text-sm">
                  <span className={`flex items-center gap-2 ${count > 0 ? 'text-gray-900' : 'text-gray-500'}`}>
                    {count > 0 ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                    )}
                    {t(cat)}
                  </span>
                  <span className={count > 0 ? 'font-medium text-gray-900' : 'text-gray-400'}>{count}</span>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-gray-200 mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Total Hallazgos</span>
              <span className="font-medium text-gray-900">{findings.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Incidencias</span>
              <span className="font-medium text-red-600">{findings.filter(f => f.isIncidence).length}</span>
            </div>
          </div>

          <button
            onClick={handleAttemptFinish}
            className="w-full flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {t('inspection.finish')}
          </button>
        </div>
      </div>

      {showWarning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <div className="flex items-center gap-3 text-amber-600 mb-4">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-gray-900">{t('inspection.warning.title')}</h3>
            </div>
            <p className="text-gray-600 mb-4">
              {t('inspection.warning.desc')}
            </p>
            <ul className="list-disc pl-5 mb-6 text-sm text-gray-700 space-y-1">
              {missingCategories.map(c => <li key={c}>{t(c)}</li>)}
            </ul>
            <div className="flex gap-3">
              <button
                onClick={() => setShowWarning(false)}
                className="flex-1 py-2.5 px-4 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {t('inspection.warning.back')}
              </button>
              <button
                onClick={onFinish}
                className="flex-1 py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-sm font-medium transition-colors"
              >
                {t('inspection.warning.force')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
