import { GoogleGenAI } from '@google/genai';
import { Project, Finding } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeFinding(
  project: Project,
  finding: Partial<Finding>,
  language: string = 'es'
): Promise<string> {
  const descriptionText = finding.description === "Inspección visual registrada mediante fotografía."
    ? "The inspector has attached one or more photos without a specific description. Please analyze the photos carefully to identify any potential issues, anomalies, or relevant elements related to this category."
    : `"${finding.description}"`;

  const prompt = `
You are an expert Technical Due Diligence (TDD) inspector for buildings in Spain.
The inspected building is of type "${project.type}" built in the year ${project.year}.
The inspector has registered a finding in the category "${finding.category}":
${descriptionText}

1. Indicate if this seems to comply with the applicable Spanish regulations. **Specifically mention which regulation, code, or article (e.g., CTE DB-SI, RSCIEI, REBT, RITE, etc.) applies to this finding based on the construction year (${project.year}) and building type (${project.type}).**
2. Suggest 1 or 2 related elements the inspector should check while in this area.

Keep the response concise, professional, structured, and in the language: ${language}.
  `;

  const parts: any[] = [{ text: prompt }];

  if (finding.photos && finding.photos.length > 0) {
    finding.photos.forEach(photo => {
      parts.unshift({
        inlineData: {
          data: photo.base64,
          mimeType: photo.mimeType,
        },
      });
    });
  } else if (finding.photoBase64 && finding.photoMimeType) {
    parts.unshift({
      inlineData: {
        data: finding.photoBase64,
        mimeType: finding.photoMimeType,
      },
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts },
    });
    return response.text || "No se pudo generar una respuesta.";
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "Error al analizar la incidencia con IA.";
  }
}

export async function generateFinalChecklist(project: Project, findings: Finding[], language: string = 'es'): Promise<string> {
  const prompt = `
You are an expert in Technical Due Diligence.
The inspector has finished the visit of a building type "${project.type}" from the year ${project.year}.
Here are the registered findings:
${findings.map(f => `- [${f.category}] ${f.isIncidence ? '(Incidence)' : '(OK)'} ${f.description}`).join('\n')}

Your goal now is to help the technician prepare their "office" work (when they get home to write the final report).
Based on the building type, year, and findings, you MUST generate a response with EXACTLY these two main headers in Markdown (H3 or H2):

### 1. Normativa Específica a consultar
List what specific regulations (e.g., CTE, RSCIEI, etc.) they should consult in the office to verify the noted findings. Group them by category if possible. Use bullet points and add line breaks between different categories for readability.

### 2. Incongruencias y Puntos ciegos
Point out if there is any incongruence or blind spot in the collected information that they should keep in mind when writing (e.g., "You noted something about fire protection but have no photos of extinguishers"). Use bullet points and add clear line breaks between different points.

Respond in Markdown format, structured, direct, with clear paragraph separation, and in the language: ${language}.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "No se pudo generar el checklist final.";
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "Error al generar el checklist final.";
  }
}

export async function generateUndetectedIncidencesSummary(project: Project, findings: Finding[], language: string = 'es'): Promise<string> {
  const observations = findings.filter(f => !f.isIncidence);
  if (observations.length === 0) return "No se han registrado observaciones que revisar.";

  const prompt = `
You are an expert in Technical Due Diligence.
The inspector has finished the visit of a building type "${project.type}" from the year ${project.year}.
Here are the findings that the inspector marked as "OK" (NOT an incidence), along with the AI's feedback for each:
${observations.map(f => `- [${f.category}] Description: ${f.description}\n  AI Feedback: ${f.aiFeedback}`).join('\n')}

Your goal is to identify and summarize any potential non-conformities or issues that the AI detected in these "OK" findings, which the inspector might have missed or misclassified.
If there are no hidden issues, just respond with a short sentence saying that no potential undetected incidences were found.
If there are issues, summarize them clearly in bullet points. Do not use markdown headings, just bullet points or short paragraphs.
Respond in the language: ${language}.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "No se detectaron incidencias ocultas.";
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "Error al analizar las potenciales incidencias.";
  }
}

export async function analyzeLocation(lat: number, lng: number, language: string = 'es'): Promise<string> {
  const prompt = `
You are an expert Technical Due Diligence (TDD) inspector.
I am at the following coordinates: Latitude ${lat}, Longitude ${lng}.
Please analyze the location and its surroundings.
Provide a brief description of the environment (e.g., is it rural, urban, or industrial?).
Mention any relevant aspects of the location that could be important for a building inspection (e.g., proximity to main roads, industrial parks, residential areas, natural elements).
Keep the response concise, professional, and in the language: ${language}.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: lat,
              longitude: lng
            }
          }
        }
      }
    });
    return response.text || "No se pudo analizar la ubicación.";
  } catch (error) {
    console.error("Error calling Gemini for location:", error);
    return "Error al analizar la ubicación.";
  }
}
