import React from 'react';
import { PropertyData } from '../types/property';

interface PropertyTableProps {
  properties: PropertyData[];
  searchQuery: string;
  onToggleSelect: (id: string) => void;
  onSelectAll: (selected: boolean) => void;
}

export function PropertyTable({ 
  properties, 
  searchQuery, 
  onToggleSelect,
  onSelectAll 
}: PropertyTableProps) {
  const filteredProperties = properties.filter((property) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      property.address.toLowerCase().includes(searchTerm) ||
      property.city.toLowerCase().includes(searchTerm) ||
      property.state.toLowerCase().includes(searchTerm) ||
      property.propertyType.toLowerCase().includes(searchTerm)
    );
  });

  const allSelected = filteredProperties.length > 0 && 
    filteredProperties.every(p => p.selected);

  if (properties.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No properties added yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredProperties.map((property) => (
            <tr key={property.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={property.selected}
                  onChange={() => onToggleSelect(property.id)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {property.address}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {property.city}, {property.state} {property.zipCode}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {property.propertyType}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {property.bedrooms} beds, {property.bathrooms} baths, {property.squareFootage} sqft
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${Number(property.price).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}