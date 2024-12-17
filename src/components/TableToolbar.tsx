import React from 'react';
import { Trash2, Edit, FileText } from 'lucide-react';

interface TableToolbarProps {
  selectedCount: number;
  onDelete: () => void;
  onEdit: () => void;
  onScan: () => void;
}

export function TableToolbar({ selectedCount, onDelete, onEdit, onScan }: TableToolbarProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex space-x-2">
        <button
          onClick={onDelete}
          disabled={selectedCount === 0}
          className={`flex items-center space-x-1 px-3 py-2 rounded-md ${
            selectedCount > 0
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete Selected ({selectedCount})</span>
        </button>
        <button
          onClick={onEdit}
          disabled={selectedCount !== 1}
          className={`flex items-center space-x-1 px-3 py-2 rounded-md ${
            selectedCount === 1
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Edit className="w-4 h-4" />
          <span>Edit</span>
        </button>
      </div>
      <button
        onClick={onScan}
        className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        <FileText className="w-4 h-4" />
        <span>Scan Document</span>
      </button>
    </div>
  );
}