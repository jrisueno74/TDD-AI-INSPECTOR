import { GoogleGenAI } from '@google/genai';
import { Project, Finding } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeFinding(
  project: Project,
  finding: Partial<Finding>
): Promise<string> {
  const prompt = `
Eres un experto inspector de Technical Due Diligence (TDD) para edificios en España.
El edificio inspeccionado es de tipo "${project.type}" construido en el año ${project.year}.
El inspector ha registrado un hallazgo en la categoría "${finding.category}":
"${finding.description}"

1. Indica brevemente si esto parece cumplir con la normativa española aplicable (ej. CTE si es posterior a 2008) o si es una incidencia.
2. Sugiere 1 o 2 elementos relacionados que el inspector debería revisar mientras está en esta área.

Mantén la respuesta concisa, profesional y en español.
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

export async function generateFinalChecklist(project: Project, findings: Finding[]): Promise<string> {
  const prompt = `
Eres un experto en Technical Due Diligence.
El inspector ha terminado la visita de un edificio tipo "${project.type}" del año ${project.year}.
Aquí están los hallazgos registrados:
${findings.map(f => `- [${f.category}] ${f.isIncidence ? '(Incidencia)' : '(OK)'} ${f.description}`).join('\n')}

Tu objetivo ahora es ayudar al técnico a preparar su trabajo de "oficina" (cuando llegue a casa a redactar el informe final).
Basado en el tipo de edificio, año y los hallazgos:
1. Enumera qué normativas específicas (ej. CTE, RSCIEI, etc.) debería consultar en la oficina para verificar los hallazgos anotados.
2. Señala si hay alguna incongruencia o punto ciego en la información recopilada que deba tener en cuenta al redactar (ej. "Anotaste algo de PCI pero no tienes fotos de los extintores").
Responde en formato Markdown, estructurado y directo.
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
