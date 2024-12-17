import React from 'react';
import { PropertyData } from '../types/property';

interface PropertyFormProps {
  data: PropertyData;
  onChange: (data: PropertyData) => void;
}

export function PropertyForm({ data, onChange }: PropertyFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          value={data.address}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          name="city"
          value={data.city}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">State</label>
        <input
          type="text"
          name="state"
          value={data.state}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
        <input
          type="text"
          name="zipCode"
          value={data.zipCode}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Property Type</label>
        <input
          type="text"
          name="propertyType"
          value={data.propertyType}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
        <input
          type="number"
          name="bedrooms"
          value={data.bedrooms}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
        <input
          type="number"
          name="bathrooms"
          value={data.bathrooms}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Square Footage</label>
        <input
          type="number"
          name="squareFootage"
          value={data.squareFootage}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Year Built</label>
        <input
          type="number"
          name="yearBuilt"
          value={data.yearBuilt}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          value={data.price}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
    </div>
  );
}