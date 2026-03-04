import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  ImageRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  ShadingType,
  Header,
  Footer,
  PageBreak,
  AlignmentType,
  VerticalAlign,
  TabStopType,
  TabStopPosition,
  LevelFormat,
  PageNumber,
} from 'docx';
import { saveAs } from 'file-saver';
import { Project, Finding } from '../types';

const COLORS = {
  Navy: '1B2A4A',
  Blue: '2E5FA3',
  LightBlue: 'D6E4F0',
  Grey: 'F5F6F8',
  Red: 'C0392B',
  Green: '1E8449',
  Amber: 'D68910',
  Mid: '6C757D',
  White: 'FFFFFF',
};

const PAGE_WIDTH = 9026; // A4 width (11906) - 2 inches margins (2880)

function createMetaRow(label: string, value: string) {
  return new TableRow({
    children: [
      new TableCell({
        width: { size: 3000, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: COLORS.Grey },
        margins: { top: 100, bottom: 100, left: 100, right: 100 },
        borders: {
          top: { style: BorderStyle.NONE, size: 0, color: COLORS.White },
          bottom: { style: BorderStyle.NONE, size: 0, color: COLORS.White },
          left: { style: BorderStyle.NONE, size: 0, color: COLORS.White },
          right: { style: BorderStyle.NONE, size: 0, color: COLORS.White },
        },
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: label, bold: true, color: COLORS.Mid, font: "Calibri", size: 20 }),
            ],
          }),
        ],
      }),
      new TableCell({
        width: { size: 6026, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: COLORS.Grey },
        margins: { top: 100, bottom: 100, left: 100, right: 100 },
        borders: {
          top: { style: BorderStyle.NONE, size: 0, color: COLORS.White },
          bottom: { style: BorderStyle.NONE, size: 0, color: COLORS.White },
          left: { style: BorderStyle.NONE, size: 0, color: COLORS.White },
          right: { style: BorderStyle.NONE, size: 0, color: COLORS.White },
        },
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: value, bold: true, color: COLORS.Navy, font: "Calibri", size: 20 }),
            ],
          }),
        ],
      }),
    ],
  });
}

function createHeading1(text: string) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    border: {
      bottom: { color: COLORS.LightBlue, space: 1, style: BorderStyle.SINGLE, size: 12 },
    },
    spacing: { before: 400, after: 200 },
    children: [
      new TextRun({ text, bold: true, color: COLORS.Navy, font: "Calibri", size: 36 }), // 18pt
    ],
  });
}

function createHeading2(text: string) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 150 },
    children: [
      new TextRun({ text, bold: true, color: COLORS.Blue, font: "Calibri", size: 26 }), // 13pt
    ],
  });
}

function createBodyText(text: string, options?: { bold?: boolean, italics?: boolean, color?: string }) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [
      new TextRun({ 
        text, 
        font: "Calibri", 
        size: 22, // 11pt
        bold: options?.bold,
        italics: options?.italics,
        color: options?.color,
      }),
    ],
  });
}

export async function exportToDocx(
  project: Project, 
  findings: Finding[], 
  checklist: string | null, 
  t: (key: string) => string
) {
  const incidences = findings.filter(f => f.isIncidence);
  const okFindings = findings.filter(f => !f.isIncidence);
  const observations = findings.filter(f => f.isIncidence && f.description.toLowerCase().includes('observaci')); // Approximate, or just use incidences for now if we don't have a strict observation type. Wait, the app only has isIncidence boolean. Let's assume observations = 0 for now, or we can just map incidences. Let's just use incidences and ok.
  
  const findingsByCategory = findings.reduce((acc, finding) => {
    if (!acc[finding.category]) {
      acc[finding.category] = [];
    }
    acc[finding.category].push(finding);
    return acc;
  }, {} as Record<string, Finding[]>);

  const doc = new Document({
    numbering: {
      config: [
        {
          reference: "ai-checklist",
          levels: [
            {
              level: 0,
              format: LevelFormat.DECIMAL,
              text: "%1.",
              alignment: AlignmentType.START,
              style: {
                paragraph: {
                  indent: { left: 720, hanging: 360 },
                },
              },
            },
          ],
        },
        {
          reference: "bullet-points",
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: "•",
              alignment: AlignmentType.START,
              style: {
                paragraph: {
                  indent: { left: 720, hanging: 360 },
                },
              },
            },
          ],
        },
      ],
    },
    sections: [
      // SECTION 1: COVER PAGE
      {
        properties: {
          page: {
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
          },
        },
        children: [
          new Paragraph({
            border: {
              top: { color: COLORS.Blue, space: 1, style: BorderStyle.SINGLE, size: 48 },
            },
            children: [new TextRun({ text: "" })],
          }),
          new Paragraph({ text: "", spacing: { after: 720 } }),
          new Paragraph({
            children: [
              new TextRun({ text: "[ LOGO EMPRESA ]", color: COLORS.Mid, italics: true, font: "Calibri", size: 22 }),
            ],
          }),
          new Paragraph({ text: "", spacing: { before: 2880 } }),
          new Paragraph({
            children: [
              new TextRun({ text: "INFORME DE", color: COLORS.Mid, size: 48, font: "Calibri" }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "TECHNICAL DUE DILIGENCE", color: COLORS.Navy, bold: true, size: 64, font: "Calibri" }),
            ],
          }),
          new Paragraph({
            spacing: { after: 1440 },
            children: [
              new TextRun({ text: "INFORME PRELIMINAR DE INSPECCIÓN", color: COLORS.Blue, size: 32, font: "Calibri" }),
            ],
          }),
          new Table({
            width: { size: PAGE_WIDTH, type: WidthType.DXA },
            columnWidths: [3000, PAGE_WIDTH - 3000],
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: COLORS.White },
              bottom: { style: BorderStyle.NONE, size: 0, color: COLORS.White },
              left: { style: BorderStyle.NONE, size: 0, color: COLORS.White },
              right: { style: BorderStyle.NONE, size: 0, color: COLORS.White },
              insideHorizontal: { style: BorderStyle.NONE, size: 0, color: COLORS.White },
              insideVertical: { style: BorderStyle.NONE, size: 0, color: COLORS.White },
            },
            rows: [
              createMetaRow("PROYECTO", project.name),
              createMetaRow("TIPO DE ACTIVO", t(`asset.${project.type.toLowerCase()}`)),
              createMetaRow("AÑO CONSTRUCCIÓN", project.year.toString()),
              createMetaRow("FECHA INSPECCIÓN", new Date().toLocaleDateString()),
              createMetaRow("TÉCNICO INSPECTOR", "TDD AI Inspector"),
              createMetaRow("REFERENCIA", `TDD-${project.id.substring(0, 6).toUpperCase()}`),
            ],
          }),
          new Paragraph({ text: "", spacing: { before: 2880 } }),
          new Paragraph({
            children: [
              new TextRun({ text: "DOCUMENTO CONFIDENCIAL", color: COLORS.Red, bold: true, font: "Calibri", size: 20 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Este informe es de uso exclusivo del cliente y no podrá ser reproducido ni distribuido sin autorización expresa.",
                color: COLORS.Mid,
                italics: true,
                font: "Calibri",
                size: 18,
              }),
            ],
          }),
        ],
      },
      // SECTION 2: BODY
      {
        properties: {
          page: {
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                tabStops: [{ type: TabStopType.RIGHT, position: PAGE_WIDTH }],
                border: {
                  bottom: { color: COLORS.LightBlue, space: 1, style: BorderStyle.SINGLE, size: 12 },
                },
                spacing: { after: 200 },
                children: [
                  new TextRun({ text: "TDD AI INSPECTOR", bold: true, color: COLORS.Navy, font: "Calibri", size: 20 }),
                  new TextRun({ text: "\t" }),
                  new TextRun({ text: `Informe Preliminar — ${project.name}`, color: COLORS.Mid, font: "Calibri", size: 20 }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                tabStops: [{ type: TabStopType.RIGHT, position: PAGE_WIDTH }],
                border: {
                  top: { color: COLORS.LightBlue, space: 1, style: BorderStyle.SINGLE, size: 12 },
                },
                spacing: { before: 200 },
                children: [
                  new TextRun({ text: "CONFIDENCIAL", italics: true, color: COLORS.Mid, font: "Calibri", size: 20 }),
                  new TextRun({ text: "\t" }),
                  new TextRun({ text: "Página ", color: COLORS.Mid, font: "Calibri", size: 20 }),
                  new TextRun({ children: [PageNumber.CURRENT], color: COLORS.Mid, font: "Calibri", size: 20 }),
                  new TextRun({ text: " de ", color: COLORS.Mid, font: "Calibri", size: 20 }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], color: COLORS.Mid, font: "Calibri", size: 20 }),
                ],
              }),
            ],
          }),
        },
        children: [
          // 2A. RESUMEN EJECUTIVO
          createHeading1("1. RESUMEN EJECUTIVO"),
          
          // KPI Table
          new Table({
            width: { size: PAGE_WIDTH, type: WidthType.DXA },
            columnWidths: [PAGE_WIDTH / 4, PAGE_WIDTH / 4, PAGE_WIDTH / 4, PAGE_WIDTH / 4],
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: COLORS.White },
              bottom: { style: BorderStyle.NONE, size: 0, color: COLORS.White },
              left: { style: BorderStyle.NONE, size: 0, color: COLORS.White },
              right: { style: BorderStyle.NONE, size: 0, color: COLORS.White },
              insideHorizontal: { style: BorderStyle.NONE, size: 0, color: COLORS.White },
              insideVertical: { style: BorderStyle.SINGLE, size: 4, color: COLORS.White },
            },
            rows: [
              new TableRow({
                children: [
                  createKpiHeaderCell("TOTAL HALLAZGOS", COLORS.Navy),
                  createKpiHeaderCell("INCIDENCIAS", COLORS.Red),
                  createKpiHeaderCell("OBSERVACIONES", COLORS.Amber),
                  createKpiHeaderCell("ELEMENTOS OK", COLORS.Green),
                ],
              }),
              new TableRow({
                children: [
                  createKpiValueCell(findings.length.toString(), COLORS.Navy),
                  createKpiValueCell(incidences.length.toString(), COLORS.Red),
                  createKpiValueCell("0", COLORS.Amber), // We don't have observations explicitly
                  createKpiValueCell(okFindings.length.toString(), COLORS.Green),
                ],
              }),
            ],
          }),
          new Paragraph({ text: "", spacing: { before: 400 } }),
          
          createHeading2("1.1 Alcance de la Inspección"),
          createBodyText(`Categorías inspeccionadas: ${Object.keys(findingsByCategory).map(c => t(c)).join(', ')}.`),
          
          createHeading2("1.2 Valoración General"),
          new Table({
            width: { size: PAGE_WIDTH, type: WidthType.DXA },
            columnWidths: [3000, PAGE_WIDTH - 3000],
            borders: {
              top: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
              bottom: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
              left: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
              right: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
              insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
              insideVertical: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
            },
            rows: [
              createAssessmentRow("Estado general del activo", incidences.length > 5 ? "Deficiente" : incidences.length > 0 ? "Regular" : "Bueno"),
              createAssessmentRow("Normativa aplicable principal", "CTE / REBT / RITE (Según corresponda)"),
              createAssessmentRow("Acción prioritaria recomendada", incidences.length > 0 ? "Revisar incidencias críticas" : "Mantenimiento preventivo"),
            ],
          }),
          
          new Paragraph({ children: [new PageBreak()] }),

          // 2B. DETALLE POR CATEGORÍA
          createHeading1("2. DETALLE DE HALLAZGOS POR CATEGORÍA"),
          createBodyText("Todos los hallazgos registrados durante la visita, agrupados por categoría técnica."),
          
          ...Object.entries(findingsByCategory).flatMap(([category, catFindings]) => {
            const catIncidences = catFindings.filter(f => f.isIncidence).length;
            const catOk = catFindings.filter(f => !f.isIncidence).length;
            
            const categoryBlocks: any[] = [
              createHeading2(t(category).toUpperCase()),
              
              // Mini summary table
              new Table({
                width: { size: PAGE_WIDTH, type: WidthType.DXA },
                columnWidths: [PAGE_WIDTH - 3000, 1500, 1500],
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
                  bottom: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
                  left: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
                  right: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
                  insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
                  insideVertical: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
                },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        width: { size: PAGE_WIDTH - 3000, type: WidthType.DXA },
                        shading: { type: ShadingType.CLEAR, fill: COLORS.LightBlue },
                        margins: { top: 100, bottom: 100, left: 100, right: 100 },
                        children: [new Paragraph({ children: [new TextRun({ text: "Categoría inspeccionada", bold: true, font: "Calibri", size: 20 })] })],
                      }),
                      new TableCell({
                        width: { size: 1500, type: WidthType.DXA },
                        shading: { type: ShadingType.CLEAR, fill: COLORS.LightBlue },
                        margins: { top: 100, bottom: 100, left: 100, right: 100 },
                        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Incidencias", bold: true, font: "Calibri", size: 20 })] })],
                      }),
                      new TableCell({
                        width: { size: 1500, type: WidthType.DXA },
                        shading: { type: ShadingType.CLEAR, fill: COLORS.LightBlue },
                        margins: { top: 100, bottom: 100, left: 100, right: 100 },
                        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "OK", bold: true, font: "Calibri", size: 20 })] })],
                      }),
                    ],
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        width: { size: PAGE_WIDTH - 3000, type: WidthType.DXA },
                        margins: { top: 100, bottom: 100, left: 100, right: 100 },
                        children: [new Paragraph({ children: [new TextRun({ text: t(category), font: "Calibri", size: 20 })] })],
                      }),
                      new TableCell({
                        width: { size: 1500, type: WidthType.DXA },
                        margins: { top: 100, bottom: 100, left: 100, right: 100 },
                        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: catIncidences.toString(), bold: true, color: COLORS.Red, font: "Calibri", size: 20 })] })],
                      }),
                      new TableCell({
                        width: { size: 1500, type: WidthType.DXA },
                        margins: { top: 100, bottom: 100, left: 100, right: 100 },
                        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: catOk.toString(), bold: true, color: COLORS.Green, font: "Calibri", size: 20 })] })],
                      }),
                    ],
                  }),
                ],
              }),
              new Paragraph({ text: "", spacing: { before: 200 } }),
            ];

            // Findings tables
            catFindings.forEach(f => {
              const icon = f.isIncidence ? "⚠" : "✓";
              const bgColor = f.isIncidence ? "FADBD8" : "D5F5E3"; // Light red / Light green
              const textColor = f.isIncidence ? COLORS.Red : COLORS.Green;

              const rows = [
                new TableRow({
                  children: [
                    new TableCell({
                      width: { size: 600, type: WidthType.DXA },
                      shading: { type: ShadingType.CLEAR, fill: bgColor },
                      margins: { top: 100, bottom: 100, left: 100, right: 100 },
                      verticalAlign: VerticalAlign.CENTER,
                      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: icon, bold: true, color: textColor, font: "Calibri", size: 24 })] })],
                    }),
                    new TableCell({
                      width: { size: PAGE_WIDTH - 600, type: WidthType.DXA },
                      margins: { top: 100, bottom: 100, left: 100, right: 100 },
                      verticalAlign: VerticalAlign.CENTER,
                      children: [new Paragraph({ children: [new TextRun({ text: f.description, font: "Calibri", size: 20 })] })],
                    }),
                  ],
                }),
              ];

              if (f.aiFeedback) {
                rows.push(
                  new TableRow({
                    children: [
                      new TableCell({
                        width: { size: 600, type: WidthType.DXA },
                        shading: { type: ShadingType.CLEAR, fill: COLORS.LightBlue },
                        margins: { top: 100, bottom: 100, left: 100, right: 100 },
                        verticalAlign: VerticalAlign.CENTER,
                        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "IA", bold: true, color: COLORS.Navy, font: "Calibri", size: 16 })] })],
                      }),
                      new TableCell({
                        width: { size: PAGE_WIDTH - 600, type: WidthType.DXA },
                        shading: { type: ShadingType.CLEAR, fill: COLORS.Grey },
                        margins: { top: 100, bottom: 100, left: 100, right: 100 },
                        verticalAlign: VerticalAlign.CENTER,
                        children: [new Paragraph({ children: [new TextRun({ text: f.aiFeedback, font: "Calibri", size: 18, color: COLORS.Mid, italics: true })] })],
                      }),
                    ],
                  })
                );
              }

              categoryBlocks.push(
                new Table({
                  width: { size: PAGE_WIDTH, type: WidthType.DXA },
                  columnWidths: [600, PAGE_WIDTH - 600],
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
                    bottom: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
                    left: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
                    right: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
                    insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
                    insideVertical: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
                  },
                  rows: rows,
                }),
                new Paragraph({ text: "", spacing: { before: 100 } })
              );

              if (f.photoUrl) {
                try {
                  const base64Data = f.photoUrl.split(',')[1];
                  if (base64Data) {
                    const binaryString = atob(base64Data);
                    const len = binaryString.length;
                    const bytes = new Uint8Array(len);
                    for (let i = 0; i < len; i++) {
                      bytes[i] = binaryString.charCodeAt(i);
                    }
                    categoryBlocks.push(
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 100, after: 200 },
                        children: [
                          new ImageRun({
                            data: bytes,
                            transformation: {
                              width: 300,
                              height: 300,
                            },
                            type: f.photoMimeType === 'image/png' ? 'png' : 'jpg'
                          }),
                        ],
                      })
                    );
                  }
                } catch (e) {
                  console.error("Error adding image to DOCX", e);
                }
              }
            });

            return categoryBlocks;
          }),

          new Paragraph({ children: [new PageBreak()] }),

          // 2C. NOTAS PARA REVISIÓN EN OFICINA - IA
          createHeading1("3. NOTAS PARA REVISIÓN EN OFICINA (IA)"),
          new Table({
            width: { size: PAGE_WIDTH, type: WidthType.DXA },
            columnWidths: [PAGE_WIDTH],
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: COLORS.White },
              bottom: { style: BorderStyle.NONE, size: 0, color: COLORS.White },
              left: { style: BorderStyle.NONE, size: 0, color: COLORS.White },
              right: { style: BorderStyle.NONE, size: 0, color: COLORS.White },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: PAGE_WIDTH, type: WidthType.DXA },
                    shading: { type: ShadingType.CLEAR, fill: COLORS.LightBlue },
                    margins: { top: 100, bottom: 100, left: 100, right: 100 },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: " Análisis generado por IA (Google Gemini) basado en los hallazgos registrados.", color: COLORS.Navy, font: "Calibri", size: 20 }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          new Paragraph({ text: "", spacing: { before: 200 } }),
          
          createHeading2("3.1 Checklist Final"),
          ...parseAiChecklist(checklist),

          new Paragraph({ children: [new PageBreak()] }),

          // 2D. METODOLOGÍA Y FIRMA
          createHeading1("4. ANEXOS Y DECLARACIÓN"),
          createHeading2("4.1 Metodología y Limitaciones"),
          createBodyText("La inspección se llevó a cabo mediante visita ocular al activo en la fecha indicada. Los hallazgos reflejan el estado aparente en el momento de la visita y no constituyen un análisis estructural completo. Se recomienda complementar con ensayos específicos cuando se identifiquen incidencias relevantes.", { color: COLORS.Mid, italics: true }),
          
          new Paragraph({ text: "", spacing: { before: 400 } }),
          
          new Table({
            width: { size: PAGE_WIDTH, type: WidthType.DXA },
            columnWidths: [PAGE_WIDTH / 2, PAGE_WIDTH / 2],
            borders: {
              top: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
              bottom: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
              left: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
              right: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
              insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
              insideVertical: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: PAGE_WIDTH / 2, type: WidthType.DXA },
                    shading: { type: ShadingType.CLEAR, fill: COLORS.Grey },
                    margins: { top: 100, bottom: 100, left: 100, right: 100 },
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Técnico Inspector", bold: true, font: "Calibri", size: 20 })] })],
                  }),
                  new TableCell({
                    width: { size: PAGE_WIDTH / 2, type: WidthType.DXA },
                    shading: { type: ShadingType.CLEAR, fill: COLORS.Grey },
                    margins: { top: 100, bottom: 100, left: 100, right: 100 },
                    children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Firma y Sello", bold: true, font: "Calibri", size: 20 })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: PAGE_WIDTH / 2, type: WidthType.DXA },
                    margins: { top: 1000, bottom: 1000, left: 100, right: 100 },
                    verticalAlign: VerticalAlign.CENTER,
                    children: [
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "TDD AI Inspector", bold: true, font: "Calibri", size: 20 })] }),
                      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Técnico Especialista", color: COLORS.Mid, font: "Calibri", size: 18 })] }),
                    ],
                  }),
                  new TableCell({
                    width: { size: PAGE_WIDTH / 2, type: WidthType.DXA },
                    margins: { top: 1000, bottom: 1000, left: 100, right: 100 },
                    children: [new Paragraph({ text: "" })], // Empty for signature
                  }),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `TDD_Report_${project.name.replace(/\s+/g, '_')}.docx`);
}

function createKpiHeaderCell(text: string, bgColor: string) {
  return new TableCell({
    width: { size: PAGE_WIDTH / 4, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: bgColor },
    margins: { top: 100, bottom: 100, left: 100, right: 100 },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text, bold: true, color: COLORS.White, font: "Calibri", size: 18 })],
      }),
    ],
  });
}

function createKpiValueCell(value: string, color: string) {
  return new TableCell({
    width: { size: PAGE_WIDTH / 4, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: COLORS.Grey },
    margins: { top: 200, bottom: 200, left: 100, right: 100 },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: value, bold: true, color, font: "Calibri", size: 36 })],
      }),
    ],
  });
}

function createAssessmentRow(label: string, value: string) {
  return new TableRow({
    children: [
      new TableCell({
        width: { size: 3000, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: COLORS.Grey },
        margins: { top: 100, bottom: 100, left: 100, right: 100 },
        children: [new Paragraph({ children: [new TextRun({ text: label, bold: true, font: "Calibri", size: 20 })] })],
      }),
      new TableCell({
        width: { size: PAGE_WIDTH - 3000, type: WidthType.DXA },
        margins: { top: 100, bottom: 100, left: 100, right: 100 },
        children: [new Paragraph({ children: [new TextRun({ text: value, font: "Calibri", size: 20 })] })],
      }),
    ],
  });
}

function parseAiChecklist(checklist: string | null) {
  if (!checklist) {
    return [createBodyText("No hay notas de IA disponibles.")];
  }

  const lines = checklist.split('\n')
    .map(line => line.replace(/[*#]/g, '').replace(/^[\-\s]+/, '').trim())
    .filter(line => line.length > 10);

  if (lines.length === 0) {
    return [createBodyText("No hay notas de IA disponibles.")];
  }

  const rows = lines.map((line, index) => {
    return new TableRow({
      children: [
        new TableCell({
          width: { size: 600, type: WidthType.DXA },
          margins: { top: 100, bottom: 100, left: 100, right: 100 },
          verticalAlign: VerticalAlign.CENTER,
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${index + 1}.`, font: "Calibri", size: 20, bold: true })] })],
        }),
        new TableCell({
          width: { size: PAGE_WIDTH - 600, type: WidthType.DXA },
          margins: { top: 100, bottom: 100, left: 100, right: 100 },
          verticalAlign: VerticalAlign.CENTER,
          children: [new Paragraph({ children: [new TextRun({ text: line, font: "Calibri", size: 20 })] })],
        }),
      ],
    });
  });

  return [
    new Table({
      width: { size: PAGE_WIDTH, type: WidthType.DXA },
      columnWidths: [600, PAGE_WIDTH - 600],
      borders: {
        top: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
        left: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
        right: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
        insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
        insideVertical: { style: BorderStyle.SINGLE, size: 4, color: COLORS.LightBlue },
      },
      rows: rows,
    })
  ];
}
