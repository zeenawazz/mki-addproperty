import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument } from 'pdf-lib';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function convertPDFToImage(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const page = await pdf.getPage(0); // Get first page
  
  const viewport = page.getViewport({ scale: 2.0 });
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  if (!context) {
    throw new Error('Could not get canvas context');
  }

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  await page.render({
    canvasContext: context,
    viewport: viewport
  }).promise;

  return canvas.toDataURL('image/png');
}

export function isFileTypeSupported(file: File): boolean {
  const supportedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  return supportedTypes.includes(file.type);
}

export async function prepareFileForOCR(file: File): Promise<string | File> {
  if (file.type === 'application/pdf') {
    return await convertPDFToImage(file);
  }
  return file;
}