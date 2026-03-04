import { GoogleGenAI } from '@google/genai';
import { Project, Finding } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeFinding(
  project: Project,
  finding: Partial<Finding>,
  language: string = 'es'
): Promise<string> {
  const prompt = `
You are an expert Technical Due Diligence (TDD) inspector for buildings in Spain.
The inspected building is of type "${project.type}" built in the year ${project.year}.
The inspector has registered a finding in the category "${finding.category}":
"${finding.description}"

1. Indicate if this seems to comply with the applicable Spanish regulations. **Specifically mention which regulation, code, or article (e.g., CTE DB-SI, RSCIEI, REBT, RITE, etc.) applies to this finding based on the construction year (${project.year}) and building type (${project.type}).**
2. Suggest 1 or 2 related elements the inspector should check while in this area.

Keep the response concise, professional, structured, and in the language: ${language}.
  `;

  const parts: any[] = [{ text: prompt }];

  if (finding.photoBase64 && finding.photoMimeType) {
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
Based on the building type, year, and findings:
1. List what specific regulations (e.g., CTE, RSCIEI, etc.) they should consult in the office to verify the noted findings.
2. Point out if there is any incongruence or blind spot in the collected information that they should keep in mind when writing (e.g., "You noted something about fire protection but have no photos of extinguishers").
Respond in Markdown format, structured, direct, and in the language: ${language}.
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
