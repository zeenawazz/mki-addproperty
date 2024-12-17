import React from 'react';
import { FileText, PenLine } from 'lucide-react';
import clsx from 'clsx';

interface TabNavigationProps {
  activeTab: 'manual' | 'scan';
  onTabChange: (tab: 'manual' | 'scan') => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex space-x-4 mb-6 border-b">
      <button
        onClick={() => onTabChange('manual')}
        className={clsx(
          'flex items-center space-x-2 px-4 py-2 font-medium text-sm',
          'focus:outline-none',
          activeTab === 'manual'
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        )}
      >
        <PenLine className="w-4 h-4" />
        <span>Manual Entry</span>
      </button>
      <button
        onClick={() => onTabChange('scan')}
        className={clsx(
          'flex items-center space-x-2 px-4 py-2 font-medium text-sm',
          'focus:outline-none',
          activeTab === 'scan'
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        )}
      >
        <FileText className="w-4 h-4" />
        <span>Scan Document</span>
      </button>
    </div>
  );
}