import React, { useState } from 'react';
import { Project } from '../types';
import { Building, Calendar, FileText } from 'lucide-react';

interface Props {
  onStart: (project: Project) => void;
  onCancel: () => void;
}

export function ProjectSetup({ onStart, onCancel }: Props) {
  const [name, setName] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [type, setType] = useState('Industrial');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    onStart({
      id: Date.now().toString(),
      name,
      year,
      type,
      selectedCategories: []
    });
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
          <Building className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Nuevo Proyecto TDD</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Proyecto</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FileText className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
              placeholder="Ej. Nave Logística Carrefour"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Año de Construcción</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="pl-10 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
              required
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">Determina la normativa aplicable (ej. CTE post-2008).</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Edificio</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
          >
            <option value="Industrial">Industrial / Logística</option>
            <option value="Comercial">Comercial / Retail</option>
            <option value="Residencial">Residencial</option>
            <option value="Oficinas">Oficinas</option>
          </select>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="w-1/3 flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="w-2/3 flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
}
