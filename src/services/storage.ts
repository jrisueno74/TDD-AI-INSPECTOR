import { SavedInspection } from '../types';

const STORAGE_KEY = 'tdd_inspections';

export const getInspections = (): SavedInspection[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error loading inspections from local storage', e);
    return [];
  }
};

export const saveInspection = (inspection: SavedInspection) => {
  try {
    const inspections = getInspections();
    const index = inspections.findIndex(i => i.id === inspection.id);
    if (index >= 0) {
      inspections[index] = inspection;
    } else {
      inspections.push(inspection);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inspections));
  } catch (e) {
    console.error('Error saving inspection to local storage', e);
  }
};

export const deleteInspection = (id: string) => {
  try {
    const inspections = getInspections().filter(i => i.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inspections));
  } catch (e) {
    console.error('Error deleting inspection from local storage', e);
  }
};
