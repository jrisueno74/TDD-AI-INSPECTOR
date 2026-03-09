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

export interface FindingPhoto {
  url: string;
  mimeType: string;
  base64: string;
}

export interface Finding {
  id: string;
  category: string;
  description: string;
  photoUrl?: string; // Kept for backward compatibility
  photoMimeType?: string; // Kept for backward compatibility
  photoBase64?: string; // Kept for backward compatibility
  photos?: FindingPhoto[];
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
