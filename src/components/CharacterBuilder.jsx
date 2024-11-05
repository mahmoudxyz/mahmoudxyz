import { useState, useEffect } from 'react';
import { Save, User, Activity, Heart, Calendar, Star, Frame, Eye, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import CharacterPreview from './CharacterPreview';

const STORAGE_KEY = 'character-development-data';

const DEFAULT_FORM_DATA = {
  basic: {
    name: '',
    age: '',
    location: '',
  },
  values: [''],
  traits: [{ trait: '', importance: '', steps: '' }],
  skills: [{ skill: '', currentLevel: '', targetLevel: '', plan: '' }],
  routines: {
    wakeTime: '',
    morningRoutine: [''],
    bedTime: '',
    eveningRoutine: [''],
  },
  supportTools: {
    comfortItems: [''],
    calmingMusic: [''],
    safePlaces: [''],
    emergencyContacts: [''],
  }
};

const CharacterBuilder = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [showSavedAlert, setShowSavedAlert] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      return savedData ? JSON.parse(savedData) : DEFAULT_FORM_DATA;
    } catch (error) {
      console.error('Error loading saved data:', error);
      return DEFAULT_FORM_DATA;
    }
  });

  // Generic function to add items to any array in the form
  const addItem = (section, subsection = null) => {
    setFormData(prev => {
      const newData = { ...prev };
      if (subsection) {
        newData[section][subsection] = [...prev[section][subsection], ''];
      } else if (Array.isArray(prev[section])) {
        if (typeof prev[section][0] === 'object') {
          const emptyItem = Object.keys(prev[section][0]).reduce((acc, key) => ({
            ...acc,
            [key]: ''
          }), {});
          newData[section] = [...prev[section], emptyItem];
        } else {
          newData[section] = [...prev[section], ''];
        }
      }
      return newData;
    });
  };

  // Generic function to remove items from any array in the form
  const removeItem = (section, index, subsection = null) => {
    setFormData(prev => {
      const newData = { ...prev };
      if (subsection) {
        newData[section][subsection] = prev[section][subsection].filter((_, i) => i !== index);
      } else {
        newData[section] = prev[section].filter((_, i) => i !== index);
      }
      return newData;
    });
  };

  const handleChange = (section, field, value, index = null, subsection = null) => {
    setFormData(prev => {
      const newData = { ...prev };
      
      if (subsection) {
        // Handle nested arrays within objects
        const newSubsectionArray = [...prev[section][subsection]];
        newSubsectionArray[index] = value;
        newData[section] = {
          ...prev[section],
          [subsection]: newSubsectionArray
        };
      } else if (Array.isArray(prev[section])) {
        // Handle arrays of primitives or objects
        const newArray = [...prev[section]];
        if (typeof value === 'object') {
          newArray[index] = { ...newArray[index], ...value };
        } else {
          newArray[index] = value;
        }
        newData[section] = newArray;
      } else if (typeof prev[section] === 'object') {
        // Handle nested objects
        newData[section] = {
          ...prev[section],
          [field]: value
        };
      } else {
        // Handle direct values
        newData[section] = value;
      }
      
      return newData;
    });
  };

  const saveData = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      setShowSavedAlert(true);
      setTimeout(() => setShowSavedAlert(false), 3000);
    } catch (error) {
      console.error('Error saving data:', error);
      // You could add error handling UI here
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.download = 'character-development.json';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          setFormData(importedData);
        } catch (error) {
          console.error('Error importing data:', error);
          // Add error handling UI here
        }
      };
      reader.readAsText(file);
    }
  };

  const tabs = [
    { id: 'basic', icon: User, label: 'المعلومات الأساسية' },
    { id: 'values', icon: Heart, label: 'القيم الأساسية' },
    { id: 'traits', icon: Activity, label: 'الصفات' },
    { id: 'skills', icon: Star, label: 'المهارات' },
    { id: 'routines', icon: Calendar, label: 'الروتين اليومي' },
    { id: 'supportTools', icon: Frame, label: 'أدوات الدعم' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-slate-800 dark:text-slate-100">
            نموذج تطوير الشخصية 🌟
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            ابدأ رحلة تطوير شخصيتك الجديدة
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <Button onClick={exportData} variant="outline">
              تصدير البيانات
            </Button>
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".json"
                onChange={importData}
                className="hidden"
              />
              <Button variant="outline" as="span">
                استيراد البيانات
              </Button>
            </label>
          </div>
        </header>

        {/* Rest of the component structure remains similar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-3">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {tabs.map(tab => (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <tab.icon className="h-4 w-4 ml-2" />
                      {tab.label}
                    </Button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-9">
            <Card>
              <CardHeader>
                <CardTitle>{tabs.find(t => t.id === activeTab)?.label}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {activeTab === 'basic' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2">الاسم الجديد (اختياري)</label>
                      <Input
                        value={formData.basic.name}
                        onChange={e => handleChange('basic', 'name', e.target.value)}
                        className="w-full"
                        placeholder="أدخل اسمك الجديد"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">العمر</label>
                      <Input
                        value={formData.basic.age}
                        onChange={e => handleChange('basic', 'age', e.target.value)}
                        className="w-full"
                        placeholder="أدخل عمرك"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">المكان</label>
                      <Input
                        value={formData.basic.location}
                        onChange={e => handleChange('basic', 'location', e.target.value)}
                        className="w-full"
                        placeholder="أدخل موقعك"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'values' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <p>اختر القيم التي تريد أن تكون أساس شخصيتك الجديدة</p>
                      <Button onClick={() => addItem('values')} size="sm">
                        <Plus className="w-4 h-4 ml-2" />
                        إضافة قيمة
                      </Button>
                    </div>
                    {formData.values.map((value, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={value}
                          onChange={e => handleChange('values', index, e.target.value)}
                          className="w-full"
                          placeholder={`القيمة ${index + 1}`}
                        />
                        {formData.values.length > 1 && (
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => removeItem('values', index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'traits' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center mb-4">
                      <p>أضف الصفات التي تريد تطويرها</p>
                      <Button onClick={() => addItem('traits')} size="sm">
                        <Plus className="w-4 h-4 ml-2" />
                        إضافة صفة
                      </Button>
                    </div>
                    {formData.traits.map((trait, index) => (
                      <div key={index} className="grid gap-4 relative">
                        <Input
                          value={trait.trait}
                          onChange={e => handleChange('traits', index, { ...trait, trait: e.target.value })}
                          placeholder={`الصفة ${index + 1}`}
                        />
                        <Input
                          value={trait.importance}
                          onChange={e => handleChange('traits', index, { ...trait, importance: e.target.value })}
                          placeholder="لماذا هي مهمة؟"
                        />
                        <Textarea
                          value={trait.steps}
                          onChange={e => handleChange('traits', index, { ...trait, steps: e.target.value })}
                          placeholder="خطوات عملية للتطوير"
                        />
                        {formData.traits.length > 1 && (
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-0 left-0"
                            onClick={() => removeItem('traits', index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Add similar dynamic functionality for other tabs */}

                <div className="mt-6 flex gap-4">
                  <Button onClick={saveData} className="flex-1">
                    <Save className="w-4 h-4 ml-2" />
                    حفظ التغييرات
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 ml-2" />
                    {showPreview ? 'إخفاء المعاينة' : 'معاينة'}
                  </Button>
                </div>

                {showPreview && (
                  <div className="mt-6">
                    <CharacterPreview data={formData} />
                  </div>
                )}

                {showSavedAlert && (
                  <Alert className="mt-4">
                    <AlertDescription>
                      تم حفظ التغييرات بنجاح! ✅
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterBuilder;