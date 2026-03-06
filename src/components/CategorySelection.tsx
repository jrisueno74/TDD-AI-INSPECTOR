import React, { useState } from 'react';
import { Project } from '../types';
import { CheckSquare, Square, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CATEGORY_GROUPS = {
  'group.architecture': [
    'cat.structure',
    'cat.facade',
    'cat.roof',
    'cat.partitioning',
    'cat.finishes',
    'cat.accessibility',
    'cat.exteriors'
  ],
  'group.installations': [
    'cat.fire',
    'cat.plumbing',
    'cat.sanitation',
    'cat.dhw',
    'cat.hvac',
    'cat.ventilation',
    'cat.electrical',
    'cat.telecom',
    'cat.security'
  ]
};

export const ALL_CATEGORIES = Object.values(CATEGORY_GROUPS).flat();

interface Props {
  project: Project;
  onConfirm: (categories: string[]) => void;
  onCancel: () => void;
}

export function CategorySelection({ project, onConfirm, onCancel }: Props) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<string[]>(project.selectedCategories?.length > 0 ? project.selectedCategories : ALL_CATEGORIES);

  const toggleCategory = (cat: string) => {
    setSelected(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleConfirm = () => {
    if (selected.length === 0) {
      alert("Debes seleccionar al menos una categoría para inspeccionar.");
      return;
    }
    onConfirm(selected);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('setup.categories')}</h2>
      <p className="text-sm text-gray-600 mb-6">
        Selecciona las categorías que aplican para el edificio <strong>{project.name}</strong>.
      </p>

      <div className="space-y-6 mb-8">
        {Object.entries(CATEGORY_GROUPS).map(([groupKey, categories]) => (
          <div key={groupKey}>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
              {t(groupKey)}
            </h3>
            <div className="space-y-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                    selected.includes(cat) 
                      ? 'bg-blue-50 border-blue-200 text-blue-900' 
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {selected.includes(cat) ? (
                    <CheckSquare className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Square className="w-5 h-5 text-gray-400" />
                  )}
                  <span className="font-medium">{t(cat)}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="w-1/3 flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
        >
          {t('setup.cancel')}
        </button>
        <button
          onClick={handleConfirm}
          className="w-2/3 flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          {t('setup.start')}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
