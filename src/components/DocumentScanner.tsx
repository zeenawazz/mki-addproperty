import React, { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { PropertyData } from '../types/property';
import { extractDataFromOCR } from '../utils/propertyUtils';
import { isFileTypeSupported, prepareFileForOCR } from '../utils/documentUtils';
import { performOCR, extractPropertyAddress } from '../utils/ocrUtils';

interface DocumentScannerProps {
  onScanComplete: (data: PropertyData) => void;
}

export function DocumentScanner({ onScanComplete }: DocumentScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isFileTypeSupported(file)) {
      setError('Please upload a PDF or image file (PDF, PNG, JPG, JPEG)');
      return;
    }

    setScanning(true);
    setProgress(0);
    setError(null);

    try {
      // Convert PDF to image if necessary
      const processedFile = await prepareFileForOCR(file);
      
      // Perform OCR
      const text = await performOCR(processedFile, setProgress);
      
      if (!text.trim()) {
        throw new Error('No text was detected in the document');
      }

      // Extract property address with enhanced patterns
      const address = extractPropertyAddress(text);
      if (!address) {
        throw new Error('Could not detect property address in the document');
      }

      // Extract other data
      const extractedData = extractDataFromOCR(text);
      
      const propertyData: PropertyData = {
        id: '',
        address: address,
        city: extractedData.city || '',
        state: extractedData.state || '',
        zipCode: extractedData.zipCode || '',
        propertyType: extractedData.propertyType || '',
        bedrooms: extractedData.bedrooms || '',
        bathrooms: extractedData.bathrooms || '',
        squareFootage: extractedData.squareFootage || '',
        yearBuilt: extractedData.yearBuilt || '',
        price: extractedData.price || '',
        tenantName: extractedData.tenantName,
        contractStartDate: extractedData.contractStartDate,
        contractEndDate: extractedData.contractEndDate,
      };

      onScanComplete(propertyData);
    } catch (error) {
      console.error('Document processing failed:', error);
      setError(error instanceof Error ? error.message : 'Failed to process the document');
    } finally {
      setScanning(false);
      setProgress(0);
    }
  };

  return (
    <div className="w-full p-6 border-2 border-dashed rounded-lg">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Upload className="w-12 h-12 text-gray-400" />
        <div className="text-center">
          <label className="cursor-pointer">
            <span className="text-blue-600 hover:text-blue-700">Upload a document</span>
            <input
              type="file"
              className="hidden"
              accept=".pdf,image/*"
              onChange={handleFileUpload}
              disabled={scanning}
            />
          </label>
          <p className="text-sm text-gray-500">Supported formats: PDF, PNG, JPG, JPEG</p>
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-4 py-2 rounded-md">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {scanning && (
          <div className="w-full max-w-xs">
            <div className="bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-center mt-2">Processing document... {progress}%</p>
          </div>
        )}
      </div>
    </div>
  );
}