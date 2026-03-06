export interface Project {
  id: string;
  name: string;
  year: number;
  type: string;
  selectedCategories: string[];
  lat?: number;
  lng?: number;
  locationDescription?: string;
}

export interface Finding {
  id: string;
  category: string;
  description: string;
  photoUrl?: string;
  photoMimeType?: string;
  photoBase64?: string;
  aiFeedback?: string;
  isIncidence: boolean;
  timestamp: number;
}

export type ViewState = 'dashboard' | 'setup' | 'categories' | 'inspection' | 'report';

export type InspectionStatus = 'draft' | 'completed';

export interface SavedInspection {
  id: string;
  updatedAt: number;
  status: InspectionStatus;
  project: Project;
  findings: Finding[];
}
