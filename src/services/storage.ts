import { SavedInspection } from '../types';
import localforage from 'localforage';

const STORAGE_KEY = 'tdd_inspections';

export const getInspections = async (): Promise<SavedInspection[]> => {
  try {
    const data = await localforage.getItem<SavedInspection[]>(STORAGE_KEY);
    return data || [];
  } catch (e) {
    console.error('Error loading inspections from local storage', e);
    return [];
  }
};

export const saveInspection = async (inspection: SavedInspection): Promise<void> => {
  try {
    const inspections = await getInspections();
    const index = inspections.findIndex(i => i.id === inspection.id);
    if (index >= 0) {
      inspections[index] = inspection;
    } else {
      inspections.push(inspection);
    }
    await localforage.setItem(STORAGE_KEY, inspections);
  } catch (e) {
    console.error('Error saving inspection to local storage', e);
  }
};

export const deleteInspection = async (id: string): Promise<void> => {
  try {
    const inspections = await getInspections();
    const filtered = inspections.filter(i => i.id !== id);
    await localforage.setItem(STORAGE_KEY, filtered);
  } catch (e) {
    console.error('Error deleting inspection from local storage', e);
  }
};
