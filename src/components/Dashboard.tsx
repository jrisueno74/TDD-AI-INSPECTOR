import React, { useEffect, useState } from 'react';
import { SavedInspection } from '../types';
import { getInspections, deleteInspection } from '../services/storage';
import { Plus, Clock, FileText, Trash2, Building, AlertTriangle, CheckCircle2, Map as MapIcon, List } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icon in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Props {
  onNewInspection: () => void;
  onLoadInspection: (inspection: SavedInspection) => void;
}

export function Dashboard({ onNewInspection, onLoadInspection }: Props) {
  const { t, language } = useLanguage();
  const [inspections, setInspections] = useState<SavedInspection[]>([]);
  const [inspectionToDelete, setInspectionToDelete] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  useEffect(() => {
    const loadInspections = async () => {
      const data = await getInspections();
      setInspections(data.sort((a, b) => b.updatedAt - a.updatedAt));
    };
    loadInspections();
  }, []);

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setInspectionToDelete(id);
  };

  const confirmDelete = async () => {
    if (inspectionToDelete) {
      await deleteInspection(inspectionToDelete);
      const data = await getInspections();
      setInspections(data.sort((a, b) => b.updatedAt - a.updatedAt));
      setInspectionToDelete(null);
    }
  };

  const cancelDelete = () => {
    setInspectionToDelete(null);
  };

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : language === 'pt' ? 'pt-BR' : language === 'fr' ? 'fr-FR' : 'es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(timestamp));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('dashboard.title')}</h1>
          <p className="text-gray-500 mt-2">{t('app.subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
              title="Vista de lista"
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'map' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
              title="Vista de mapa"
            >
              <MapIcon className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={onNewInspection}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            <Plus className="w-5 h-5" />
            {t('dashboard.new')}
          </button>
        </div>
      </div>

      {inspections.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('dashboard.empty')}</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            {t('dashboard.empty.desc')}
          </p>
          <button
            onClick={onNewInspection}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            {t('dashboard.new')}
          </button>
        </div>
      ) : viewMode === 'map' ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm h-[600px] overflow-hidden">
          <MapContainer 
            center={[40.4168, -3.7038]} // Default to Madrid
            zoom={6} 
            style={{ height: '100%', width: '100%', borderRadius: '0.75rem', zIndex: 0 }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {inspections.filter(i => i.project?.lat && i.project?.lng).map((inspection) => (
              <Marker 
                key={inspection.id} 
                position={[inspection.project.lat!, inspection.project.lng!]}
              >
                <Popup>
                  <div className="p-1">
                    <h3 className="font-bold text-gray-900 text-base mb-1">{inspection.project.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{inspection.project.type} ({inspection.project.year})</p>
                    <button 
                      onClick={() => onLoadInspection(inspection)}
                      className="w-full text-center bg-blue-600 text-white py-1.5 px-3 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                    >
                      Abrir Expediente
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
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
                          {t(`asset.${inspection.project.type.toLowerCase()}`)}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        {inspection.findings.length}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    inspection.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {inspection.status === 'completed' ? t('dashboard.completed') : t('dashboard.draft')}
                  </span>
                  <button
                    onClick={(e) => handleDeleteClick(e, inspection.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title={t('dashboard.delete')}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {inspectionToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-gray-900">{t('dashboard.delete.confirm.title')}</h3>
            </div>
            <p className="text-gray-600 mb-6">
              {t('dashboard.delete.confirm.desc')}
            </p>
            <div className="flex gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 py-2.5 px-4 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {t('setup.cancel')}
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-medium transition-colors"
              >
                {t('dashboard.delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
