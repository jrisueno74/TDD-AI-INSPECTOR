import React, { useEffect, useState } from 'react';
import { SavedInspection } from '../types';
import { getInspections, deleteInspection } from '../services/storage';
import { Plus, Clock, FileText, Trash2, Building, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface Props {
  onNewInspection: () => void;
  onLoadInspection: (inspection: SavedInspection) => void;
}

export function Dashboard({ onNewInspection, onLoadInspection }: Props) {
  const [inspections, setInspections] = useState<SavedInspection[]>([]);

  useEffect(() => {
    setInspections(getInspections().sort((a, b) => b.updatedAt - a.updatedAt));
  }, []);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('¿Estás seguro de que deseas eliminar esta inspección?')) {
      deleteInspection(id);
      setInspections(getInspections().sort((a, b) => b.updatedAt - a.updatedAt));
    }
  };

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(timestamp));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mis Inspecciones</h1>
          <p className="text-gray-500 mt-2">Gestiona tus informes y borradores de TDD</p>
        </div>
        <button
          onClick={onNewInspection}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Nueva Inspección
        </button>
      </div>

      {inspections.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay inspecciones</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Aún no has creado ninguna inspección. Comienza una nueva para registrar hallazgos y generar informes.
          </p>
          <button
            onClick={onNewInspection}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Comenzar ahora
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {inspections.map((inspection) => (
            <div
              key={inspection.id}
              onClick={() => onLoadInspection(inspection)}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${inspection.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                    {inspection.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {inspection.project ? inspection.project.name : 'Inspección sin título'}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDate(inspection.updatedAt)}
                      </span>
                      {inspection.project && (
                        <span className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          {inspection.project.type}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        {inspection.findings.length} hallazgos
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    inspection.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {inspection.status === 'completed' ? 'Completado' : 'Borrador'}
                  </span>
                  <button
                    onClick={(e) => handleDelete(e, inspection.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar inspección"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
