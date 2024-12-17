import React, { useState } from 'react';
import { PropertyForm } from './components/PropertyForm';
import { DocumentScanner } from './components/DocumentScanner';
import { PropertyTable } from './components/PropertyTable';
import { SearchBar } from './components/SearchBar';
import { TabNavigation } from './components/TabNavigation';
import { TableToolbar } from './components/TableToolbar';
import { ConfirmDialog } from './components/ConfirmDialog';
import { PropertyData } from './types/property';
import { generateId } from './utils/propertyUtils';

const initialData: PropertyData = {
  id: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  propertyType: '',
  bedrooms: '',
  bathrooms: '',
  squareFootage: '',
  yearBuilt: '',
  price: '',
  selected: false,
};

function App() {
  const [activeTab, setActiveTab] = useState<'manual' | 'scan'>('manual');
  const [propertyData, setPropertyData] = useState<PropertyData>(initialData);
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const selectedProperties = properties.filter(p => p.selected);

  const handleScanComplete = (data: PropertyData) => {
    setPropertyData({ ...data, id: generateId() });
    setActiveTab('manual');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (propertyData.id) {
      setProperties(properties.map(p => 
        p.id === propertyData.id ? propertyData : p
      ));
    } else {
      setProperties([...properties, { ...propertyData, id: generateId() }]);
    }
    setPropertyData(initialData);
  };

  const handleToggleSelect = (id: string) => {
    setProperties(properties.map(p =>
      p.id === id ? { ...p, selected: !p.selected } : p
    ));
  };

  const handleSelectAll = (selected: boolean) => {
    setProperties(properties.map(p => ({ ...p, selected })));
  };

  const handleDelete = () => {
    setProperties(properties.filter(p => !p.selected));
    setShowDeleteDialog(false);
  };

  const handleEdit = () => {
    const selectedProperty = properties.find(p => p.selected);
    if (selectedProperty) {
      setPropertyData(selectedProperty);
      setActiveTab('manual');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Property Details</h1>
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
            
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            <form onSubmit={handleSubmit}>
              {activeTab === 'manual' ? (
                <PropertyForm
                  data={propertyData}
                  onChange={setPropertyData}
                />
              ) : (
                <DocumentScanner onScanComplete={handleScanComplete} />
              )}

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {propertyData.id ? 'Update Property' : 'Save Property'}
                </button>
              </div>
            </form>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Listings</h2>
              <TableToolbar
                selectedCount={selectedProperties.length}
                onDelete={() => setShowDeleteDialog(true)}
                onEdit={handleEdit}
                onScan={() => setActiveTab('scan')}
              />
              <PropertyTable 
                properties={properties}
                searchQuery={searchQuery}
                onToggleSelect={handleToggleSelect}
                onSelectAll={handleSelectAll}
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Properties"
        message="Are you sure you want to delete the selected property listing(s)?"
      />
    </div>
  );
}

export default App;