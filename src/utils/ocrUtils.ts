import { createWorker } from 'tesseract.js';
import { PropertyData } from '../types/property';

export async function performOCR(
  file: string | File,
  onProgress: (progress: number) => void
): Promise<string> {
  const worker = await createWorker({
    logger: m => {
      if (m.status === 'recognizing text') {
        onProgress(Math.round(m.progress * 100));
      }
    }
  });

  try {
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(file);
    return text;
  } finally {
    await worker.terminate();
  }
}

export function extractPropertyAddress(text: string): string | null {
  // Look for common property address patterns
  const patterns = [
    // "Property to be let out" pattern
    /property to be let out[:\s]+([^\.]+)/i,
    // "Property Address" pattern
    /property address[:\s]+([^\.]+)/i,
    // "Subject Property" pattern
    /subject property[:\s]+([^\.]+)/i,
    // "Location" pattern
    /location[:\s]+([^\.]+)/i,
    // Standard address format
    /\d+\s+[A-Za-z\s]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Court|Ct|Circle|Cir|Way|Place|Pl|Square|Sq)\b/i
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      // Clean up the extracted address
      const address = match[1] || match[0];
      return address.trim()
        .replace(/\s+/g, ' ') // normalize whitespace
        .replace(/[^\w\s,.-]/g, ''); // remove special characters except common address punctuation
    }
  }

  return null;
}