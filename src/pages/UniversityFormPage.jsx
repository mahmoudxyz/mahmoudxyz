import React, { useState } from 'react';
import { 
  Plus,
  Download,
  Upload,
  Trash2,
  Save,
  FileUp,
  ClipboardCheck
} from 'lucide-react';

const UniversityFormPage = () => {
  const [universities, setUniversities] = useState([getEmptyUniversity()]);
  const [jsonPreview, setJsonPreview] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  function getEmptyUniversity() {
    return {
      id: Date.now(),
      name: '',
      country: '',
      city: '',
      program: '',
      status: 'planning',
      applicationFee: 0,
      semesterFee: 0,
      deadline: '',
      documents: [
        { name: 'Bachelor Certificate', status: 'pending', deadline: '' },
        { name: 'Transcript', status: 'pending', deadline: '' },
        { name: 'CV', status: 'pending', deadline: '' },
        { name: 'Motivation Letter', status: 'pending', deadline: '' }
      ],
      requirements: {
        languages: [
          { name: '', level: '', test: '' }
        ]
      }
    };
  }

  const handleAddUniversity = () => {
    setUniversities([...universities, getEmptyUniversity()]);
  };

  const handleRemoveUniversity = (id) => {
    setUniversities(universities.filter(uni => uni.id !== id));
  };

  const handleUniversityChange = (id, field, value) => {
    setUniversities(universities.map(uni => 
      uni.id === id ? { ...uni, [field]: value } : uni
    ));
  };

  const handleDocumentChange = (uniId, docIndex, field, value) => {
    setUniversities(universities.map(uni => {
      if (uni.id !== uniId) return uni;
      const newDocs = [...uni.documents];
      newDocs[docIndex] = { ...newDocs[docIndex], [field]: value };
      return { ...uni, documents: newDocs };
    }));
  };

  const handleLanguageChange = (uniId, langIndex, field, value) => {
    setUniversities(universities.map(uni => {
      if (uni.id !== uniId) return uni;
      const newLangs = [...uni.requirements.languages];
      newLangs[langIndex] = { ...newLangs[langIndex], [field]: value };
      return { 
        ...uni, 
        requirements: { 
          ...uni.requirements, 
          languages: newLangs 
        } 
      };
    }));
  };

  const addDocument = (uniId) => {
    setUniversities(universities.map(uni => {
      if (uni.id !== uniId) return uni;
      return {
        ...uni,
        documents: [...uni.documents, { name: '', status: 'pending', deadline: '' }]
      };
    }));
  };

  const addLanguage = (uniId) => {
    setUniversities(universities.map(uni => {
      if (uni.id !== uniId) return uni;
      return {
        ...uni,
        requirements: {
          ...uni.requirements,
          languages: [...uni.requirements.languages, { name: '', level: '', test: '' }]
        }
      };
    }));
  };

  const handleBulkImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          if (Array.isArray(importedData)) {
            setUniversities(importedData);
          }
        } catch (error) {
          console.error('Error importing data:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(universities, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.download = 'universities-data.json';
    link.href = url;
    link.click();
  };

  const copyToClipboard = () => {
    const dataStr = JSON.stringify(universities, null, 2);
    navigator.clipboard.writeText(dataStr);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">University Data Generator</h1>
            <div className="flex gap-3">
              <button
                onClick={handleAddUniversity}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Plus size={18} />
                Add University
              </button>
              <button
                onClick={exportData}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                <Download size={18} />
                Export JSON
              </button>
              <label className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 cursor-pointer">
                <Upload size={18} />
                Import JSON
                <input
                  type="file"
                  accept=".json"
                  onChange={handleBulkImport}
                  className="hidden"
                />
              </label>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                <ClipboardCheck size={18} />
                Copy JSON
              </button>
            </div>
          </div>
        </div>

        {/* University Forms */}
        {universities.map((uni, index) => (
          <div key={uni.id} className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">University #{index + 1}</h2>
              <button
                onClick={() => handleRemoveUniversity(uni.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Information</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    University Name
                  </label>
                  <input
                    type="text"
                    value={uni.name}
                    onChange={(e) => handleUniversityChange(uni.id, 'name', e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    value={uni.country}
                    onChange={(e) => handleUniversityChange(uni.id, 'country', e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Select Country</option>
                    <option value="germany">Germany</option>
                    <option value="italy">Italy</option>
                    <option value="austria">Austria</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={uni.city}
                    onChange={(e) => handleUniversityChange(uni.id, 'city', e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Program
                  </label>
                  <input
                    type="text"
                    value={uni.program}
                    onChange={(e) => handleUniversityChange(uni.id, 'program', e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={uni.status}
                    onChange={(e) => handleUniversityChange(uni.id, 'status', e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="planning">Planning</option>
                    <option value="applied">Applied</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {/* Fees and Deadlines */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Fees and Deadlines</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Application Fee (€)
                  </label>
                  <input
                    type="number"
                    value={uni.applicationFee}
                    onChange={(e) => handleUniversityChange(uni.id, 'applicationFee', parseInt(e.target.value))}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Semester Fee (€)
                  </label>
                  <input
                    type="number"
                    value={uni.semesterFee}
                    onChange={(e) => handleUniversityChange(uni.id, 'semesterFee', parseInt(e.target.value))}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    value={uni.deadline}
                    onChange={(e) => handleUniversityChange(uni.id, 'deadline', e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              {/* Documents */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Documents</h3>
                  <button
                    onClick={() => addDocument(uni.id)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                {uni.documents.map((doc, docIndex) => (
                  <div key={docIndex} className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={doc.name}
                      onChange={(e) => handleDocumentChange(uni.id, docIndex, 'name', e.target.value)}
                      placeholder="Document Name"
                      className="p-2 border rounded-lg"
                    />
                    <select
                      value={doc.status}
                      onChange={(e) => handleDocumentChange(uni.id, docIndex, 'status', e.target.value)}
                      className="p-2 border rounded-lg"
                    >
                      <option value="pending">Pending</option>
                      <option value="ready">Ready</option>
                      <option value="submitted">Submitted</option>
                    </select>
                    <input
                      type="date"
                      value={doc.deadline}
                      onChange={(e) => handleDocumentChange(uni.id, docIndex, 'deadline', e.target.value)}
                      className="p-2 border rounded-lg"
                    />
                  </div>
                ))}
              </div>

              {/* Language Requirements */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Language Requirements</h3>
                  <button
                    onClick={() => addLanguage(uni.id)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                {uni.requirements.languages.map((lang, langIndex) => (
                  <div key={langIndex} className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={lang.name}
                      onChange={(e) => handleLanguageChange(uni.id, langIndex, 'name', e.target.value)}
                      placeholder="Language"
                      className="p-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      value={lang.level}
                      onChange={(e) => handleLanguageChange(uni.id, langIndex, 'level', e.target.value)}
                      placeholder="Level (e.g., B2)"
                      className="p-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      value={lang.test}
                      onChange={(e) => handleLanguageChange(uni.id, langIndex, 'test', e.target.value)}
                      placeholder="Test (e.g., IELTS)"
                      className="p-2 border rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversityFormPage;