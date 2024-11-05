import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
import { format, parseISO } from 'date-fns'; // Add this import
import {
  Save, User, Eye, Edit2, PlusCircle, Trash2, GitCompare,
  BarChart2,
  Star, Heart, Sparkles, Brain, Sunrise, Shield, 
  Lightbulb, Trophy, Flower2, Sprout, Leaf, 
  Smile, Sun, Moon, Cloud, Rainbow, Battery, 
  HeartHandshake, Gem, Footprints, TreePine,
  BrainCircuit, Puzzle, 
  Mountain, Anchor, Blocks, Compass,
  HandHeart, Sparkle, Crown, Scale, Feather,
  ScrollText, BookHeart,
  HelpCircle,
  AlertTriangle,
  Users,
  Home,
  Phone,
  X,
  FileText,
  Search,
  Download,
  SortDesc,
  SortAsc,
  Calendar,
  Clock,
  EyeOff
} from 'lucide-react';
import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar
} from 'recharts';
import { 
  Card, CardHeader, CardTitle, CardDescription, 
  CardContent, CardFooter 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';




// Memoized Input Components
const ControlledInput = memo(({ value, onChange, inputRef, ...props }) => (
  <Input
    ref={inputRef}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    {...props}
  />
));

const ControlledTextarea = memo(({ value, onChange, textareaRef, ...props }) => (
  <Textarea
    ref={textareaRef}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    {...props}
  />
));


const traumaInformedCategories = {
  emotional: {
    title: 'Emotional Safety',
    icon: Heart,
    areas: ['Trust Building', 'Emotional Regulation', 'Self-Compassion'],
    strategies: [
      'Practice self-soothing techniques',
      'Identify and name emotions',
      'Create safe spaces',
      'Develop healthy boundaries'
    ]
  },
  cognitive: {
    title: 'Mental Resilience',
    icon: BrainCircuit,
    areas: ['Thought Patterns', 'Belief Systems', 'Decision Making'],
    strategies: [
      'Challenge negative thoughts',
      'Build new mental models',
      'Practice mindful awareness',
      'Develop problem-solving skills'
    ]
  },
  physical: {
    title: 'Body Connection',
    icon: Mountain,
    areas: ['Grounding', 'Body Awareness', 'Physical Safety'],
    strategies: [
      'Practice grounding exercises',
      'Listen to body signals',
      'Create physical boundaries',
      'Engage in gentle movement'
    ]
  },
  social: {
    title: 'Relationship Building',
    icon: HandHeart,
    areas: ['Trust Building', 'Communication', 'Boundaries'],
    strategies: [
      'Practice clear communication',
      'Set healthy boundaries',
      'Build support networks',
      'Identify safe relationships'
    ]
  },
  spiritual: {
    title: 'Meaning & Purpose',
    icon: Compass,
    areas: ['Values', 'Purpose', 'Connection'],
    strategies: [
      'Explore personal values',
      'Find meaning in experiences',
      'Connect with community',
      'Practice mindfulness'
    ]
  }
};

// Add growth paths with progressive stages
const growthPaths = {
  safety: {
    title: 'Building Safety',
    icon: Shield,
    stages: [
      {
        level: 1,
        name: 'Foundation',
        focus: 'Creating basic safety and stability',
        activities: [
          'Identify safe spaces',
          'Develop grounding techniques',
          'Practice basic self-care',
          'Learn to recognize triggers'
        ]
      },
      {
        level: 2,
        name: 'Exploration',
        focus: 'Expanding comfort zones safely',
        activities: [
          'Build trust gradually',
          'Practice boundary setting',
          'Develop safety plans',
          'Identify support systems'
        ]
      },
      {
        level: 3,
        name: 'Integration',
        focus: 'Maintaining safety while growing',
        activities: [
          'Create lasting safety habits',
          'Build resilient responses',
          'Strengthen support networks',
          'Share your journey safely'
        ]
      }
    ]
  },
  healing: {
    title: 'Healing Journey',
    icon: Flower2,
    stages: [
      {
        level: 1,
        name: 'Acknowledgment',
        focus: 'Understanding and accepting your experiences',
        activities: [
          'Practice self-compassion',
          'Identify feelings safely',
          'Journal when ready',
          'Connect with support'
        ]
      },
      {
        level: 2,
        name: 'Processing',
        focus: 'Working through experiences at your pace',
        activities: [
          'Express feelings safely',
          'Challenge negative beliefs',
          'Build coping skills',
          'Practice self-care'
        ]
      },
      {
        level: 3,
        name: 'Growth',
        focus: 'Finding strength and meaning',
        activities: [
          'Recognize progress',
          'Build new narratives',
          'Help others when ready',
          'Celebrate healing'
        ]
      }
    ]
  },
  empowerment: {
    title: 'Building Strength',
    icon: Mountain,
    stages: [
      {
        level: 1,
        name: 'Foundation',
        focus: 'Building basic confidence',
        activities: [
          'Set small achievable goals',
          'Celebrate small wins',
          'Practice decision-making',
          'Identify strengths'
        ]
      },
      {
        level: 2,
        name: 'Growth',
        focus: 'Expanding capabilities',
        activities: [
          'Take on challenges',
          'Learn new skills',
          'Express needs clearly',
          'Build confidence'
        ]
      },
      {
        level: 3,
        name: 'Leadership',
        focus: 'Sharing strength with others',
        activities: [
          'Mentor others',
          'Share your story',
          'Create positive change',
          'Build community'
        ]
      }
    ]
  }
};


const SafetyCheck = memo(({ onUpdate }) => {
  const [safetyLevel, setSafetyLevel] = useState('safe');
  const [needsSupport, setNeedsSupport] = useState(false);

  return (
    <Card className="bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-500" />
          Safety Check-In
        </CardTitle>
        <CardDescription>
          How are you feeling in this moment? Your safety and comfort are important.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2 justify-center">
            {[
              { value: 'unsafe', label: 'Need Help', icon: Alert },
              { value: 'uncertain', label: 'Unsure', icon: HelpCircle },
              { value: 'safe', label: 'Safe', icon: Shield }
            ].map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => {
                  setSafetyLevel(value);
                  if (value === 'unsafe') setNeedsSupport(true);
                }}
                className={`p-4 rounded-lg flex flex-col items-center gap-2 ${
                  safetyLevel === value 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-white text-gray-500'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {needsSupport && (
            <div className="bg-white p-4 rounded-lg mt-4">
              <h4 className="font-medium text-red-600 mb-2">Support Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>• Call 122 for immediate emergency</li>
                <li>• Contact your support person or therapist</li>
              </ul>
              <Button
                className="mt-4 w-full"
                variant="outline"
                onClick={() => setNeedsSupport(false)}
              >
                I'm getting help
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
});




const HealingJournalSection = memo(({ entries = [], onSave, onDelete }) => {
  const [entry, setEntry] = useState('');
  const [mood, setMood] = useState('neutral');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMood, setFilterMood] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showEntries, setShowEntries] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);
  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);


  
  
  const moodOptions = [
    { value: 'challenging', icon: Cloud, label: 'Challenging Day' },
    { value: 'neutral', icon: Moon, label: 'Taking it Step by Step' },
    { value: 'growing', icon: Sprout, label: 'Growing' },
    { value: 'thriving', icon: Sun, label: 'Thriving' }
  ];

  const handleSave = useCallback(() => {
    if (!entry.trim()) {
      setToastMessage('Please write something in your journal entry');
      setShowToast(true);
      return;
    }

    const newEntry = {
      id: Date.now(),
      mood,
      entry,
      date: new Date().toISOString()
    };

    // Save to local storage
    const savedEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    const updatedEntries = [newEntry, ...savedEntries];
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));

    // Call the parent's onSave
    onSave(newEntry);
    
    // Reset form
    setEntry('');
    setMood('neutral');
    
    // Show success toast
    setToastMessage('Journal entry saved successfully');
    setShowToast(true);
  }, [entry, mood, onSave]);

  const exportJournal = useCallback(() => {
    const exportData = entries.map(entry => ({
      date: format(new Date(entry.date), 'PPP'),
      time: format(new Date(entry.date), 'pp'),
      mood: entry.mood,
      entry: entry.entry
    }));

    const csv = [
      ['Date', 'Time', 'Mood', 'Entry'],
      ...exportData.map(row => [
        row.date,
        row.time,
        row.mood,
        `"${row.entry.replace(/"/g, '""')}"`
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `healing-journal-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    setToastMessage('Journal exported successfully');
    setShowToast(true);
  }, [entries]);


  const handleDeleteEntry = useCallback((entryId) => {
    setEntryToDelete(entryId);
    setDeleteDialogOpen(true);
  }, []);

  // Function to confirm single entry deletion
  const confirmDeleteEntry = useCallback(() => {
    if (entryToDelete) {
      onDelete(entryToDelete);
      setToastMessage('Journal entry deleted');
      setShowToast(true);
    }
    setDeleteDialogOpen(false);
    setEntryToDelete(null);
  }, [entryToDelete, onDelete]);

  // Function to delete all entries
  const handleDeleteAll = useCallback(() => {
    setDeleteAllDialogOpen(true);
  }, []);

  // Function to confirm deletion of all entries
  const confirmDeleteAll = useCallback(() => {
    onDelete('all');
    setToastMessage('All journal entries deleted');
    setShowToast(true);
    setDeleteAllDialogOpen(false);
  }, [onDelete]);



  // Filter and sort entries
  const filteredEntries = entries
    .filter(entry => {
      const matchesSearch = entry.entry.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMood = filterMood === 'all' || entry.mood === filterMood;
      return matchesSearch && matchesMood;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rainbow className="w-5 h-5 text-purple-500" />
            Healing Journal
          </CardTitle>
          <CardDescription>
            A safe space to reflect on your journey and celebrate your progress
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 justify-center mb-4">
            {moodOptions.map(({ value, icon: Icon, label }) => (
              <button
                key={value}
                onClick={() => setMood(value)}
                className={`p-3 rounded-lg flex flex-col items-center gap-1 ${
                  mood === value 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-gray-50 text-gray-500'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs">{label}</span>
              </button>
            ))}
          </div>
          <Textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="How are you feeling today? What small wins would you like to celebrate?"
            className="min-h-[150px]"
          />
          <div className="flex justify-end">
            <Button onClick={handleSave}>
              <HeartHandshake className="w-4 h-4 mr-2" />
              Save Journal Entry
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Journal Entries List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-500" />
              Your Journal Entries
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setShowEntries(!showEntries)}
                className="gap-2"
              >
                {showEntries ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    Hide Entries
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    Show Entries
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={exportJournal}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              {entries.length > 0 && (
                <Button 
                  variant="outline" 
                  onClick={handleDeleteAll}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete All
                </Button>
              )}
            </div>
          </CardTitle>
          
          {/* ... existing filters ... */}
        </CardHeader>
        {showEntries && (
          <CardContent>
            <div className="space-y-4">
              {filteredEntries.map((entry) => {
                const entryDate = new Date(entry.date);
                const MoodIcon = moodOptions.find(m => m.value === entry.mood)?.icon || Moon;
                
                return (
                  <Card key={entry.id} className="bg-white border shadow-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MoodIcon className="w-5 h-5 text-purple-500" />
                          <span className="capitalize text-sm text-gray-600">
                            {entry.mood}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {format(entryDate, 'PPP')}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {format(entryDate, 'p')}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteEntry(entry.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 whitespace-pre-wrap">{entry.entry}</p>
                    </CardContent>
                  </Card>
                );
              })}
              
              {filteredEntries.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No journal entries found
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Journal Entry</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this journal entry? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={confirmDeleteEntry}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete All Dialog */}
      <AlertDialog open={deleteAllDialogOpen} onOpenChange={setDeleteAllDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Delete All Journal Entries
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete all journal entries? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setDeleteAllDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={confirmDeleteAll}
            >
              Delete All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          {toastMessage}
        </div>
      )}
    </div>
  );
});



const GrowthPathSection = memo(({ currentCharacter, onUpdate }) => {
  const areas = [
    { 
      id: 'selfCompassion',
      icon: Heart,
      title: 'Self-Compassion',
      description: 'Being gentle with yourself',
      prompts: [
        'I deserve kindness, especially from myself',
        'My worth is not determined by my past',
        'I am learning and growing every day'
      ]
    },
    { 
      id: 'boundaries',
      icon: Shield,
      title: 'Healthy Boundaries',
      description: 'Protecting your peace',
      prompts: [
        'I have the right to say no',
        'My feelings are valid',
        'I choose who I let into my life'
      ]
    },
    { 
      id: 'resilience',
      icon: TreePine,
      title: 'Building Resilience',
      description: 'Growing stronger through challenges',
      prompts: [
        'Every challenge helps me grow',
        'I can handle difficult situations',
        'I am stronger than I know'
      ]
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Footprints className="w-5 h-5 text-green-500" />
          Your Growth Path
        </CardTitle>
        <CardDescription>
          Choose areas you'd like to develop in your healing journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {areas.map(({ id, icon: Icon, title, description, prompts }) => (
            <div 
              key={id}
              className="bg-gradient-to-b from-white to-purple-50 rounded-lg p-4 border border-purple-100"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-5 h-5 text-purple-500" />
                <h3 className="font-medium text-purple-700">{title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">{description}</p>
              <div className="space-y-2">
                {prompts.map((prompt, idx) => (
                  <div 
                    key={idx}
                    className="text-sm bg-white p-2 rounded border border-purple-100"
                  >
                    {prompt}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});


const DailyIntentionSetter = memo(({ intentions = [], onSave, onDelete }) => {
  // State
  const [intention, setIntention] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showIntentions, setShowIntentions] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [intentionToDelete, setIntentionToDelete] = useState(null);
  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const suggestions = [
    'Today, I choose peace over perfection',
    'I will be gentle with myself today',
    'Today, I take one small step forward',
    'I deserve to take up space and be heard',
    'Today, I practice self-compassion',
    'I trust my healing journey',
    'I embrace progress, not perfection',
    'Today, I choose self-care'
  ];

  // Handlers
  const handleSave = useCallback(() => {
    if (!intention.trim()) {
      setToastMessage('Please write your intention');
      setShowToast(true);
      return;
    }

    const newIntention = {
      id: Date.now(),
      text: intention,
      date: new Date().toISOString(),
      completed: false
    };

    onSave(newIntention);
    setIntention('');
    setToastMessage('Intention set successfully');
    setShowToast(true);
  }, [intention, onSave]);

  const handleDelete = useCallback((intentionId) => {
    setIntentionToDelete(intentionId);
    setDeleteDialogOpen(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (intentionToDelete) {
      onDelete(intentionToDelete);
      setToastMessage('Intention deleted');
      setShowToast(true);
    }
    setDeleteDialogOpen(false);
    setIntentionToDelete(null);
  }, [intentionToDelete, onDelete]);

  const handleDeleteAll = useCallback(() => {
    setDeleteAllDialogOpen(true);
  }, []);

  const confirmDeleteAll = useCallback(() => {
    onDelete('all');
    setToastMessage('All intentions deleted');
    setShowToast(true);
    setDeleteAllDialogOpen(false);
  }, [onDelete]);

  const exportIntentions = useCallback(() => {
    const exportData = intentions.map(intention => ({
      date: format(parseISO(intention.date), 'PPP'),
      time: format(parseISO(intention.date), 'pp'),
      intention: intention.text,
      completed: intention.completed ? 'Yes' : 'No'
    }));

    const csv = [
      ['Date', 'Time', 'Intention', 'Completed'],
      ...exportData.map(row => [
        row.date,
        row.time,
        `"${row.intention.replace(/"/g, '""')}"`,
        row.completed
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `daily-intentions-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    setToastMessage('Intentions exported successfully');
    setShowToast(true);
  }, [intentions]);

  // Filter and sort intentions
  const filteredIntentions = intentions
    .filter(item => 
      item.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sunrise className="w-5 h-5 text-orange-500" />
            Daily Intention
          </CardTitle>
          <CardDescription>
            Set your intention for the day ahead
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => setIntention(suggestion)}
                  className="text-sm px-3 py-1 rounded-full bg-orange-50 text-orange-700 hover:bg-orange-100"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <Textarea
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              placeholder="What would you like to focus on today?"
              className="min-h-[100px]"
            />
            <Button 
              onClick={handleSave}
              className="w-full"
            >
              <Star className="w-4 h-4 mr-2" />
              Set Intention
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Intentions History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-500" />
              Your Intentions History
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setShowIntentions(!showIntentions)}
                className="gap-2"
              >
                {showIntentions ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    Hide History
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    Show History
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={exportIntentions}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              {intentions.length > 0 && (
                <Button 
                  variant="outline" 
                  onClick={handleDeleteAll}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete All
                </Button>
              )}
            </div>
          </CardTitle>

          {/* Filters */}
          <div className="flex gap-4 mt-4">
            <div className="flex-1">
              <Input
                placeholder="Search intentions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                leftIcon={<Search className="w-4 h-4" />}
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
            >
              {sortOrder === 'desc' ? <SortDesc className="w-4 h-4" /> : <SortAsc className="w-4 h-4" />}
            </Button>
          </div>
        </CardHeader>

        {showIntentions && (
          <CardContent>
            <div className="space-y-4">
              {filteredIntentions.map((item) => {
                const itemDate = parseISO(item.date);
                
                return (
                  <Card key={item.id} className="bg-white border shadow-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {item.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <Heart className="w-5 h-5 text-orange-500" />
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(item.id, { ...item, completed: !item.completed })}
                            className="text-sm text-gray-600"
                          >
                            Mark as {item.completed ? 'incomplete' : 'complete'}
                          </Button>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {format(itemDate, 'PPP')}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {format(itemDate, 'p')}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 whitespace-pre-wrap">{item.text}</p>
                    </CardContent>
                  </Card>
                );
              })}
              
              {filteredIntentions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No intentions found
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>



      {/* Delete Single Intention Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Intention</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this intention? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={confirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete All Dialog */}
      <AlertDialog open={deleteAllDialogOpen} onOpenChange={setDeleteAllDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Delete All Intentions
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete all intentions? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={confirmDeleteAll}
            >
              Delete All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          {toastMessage}
        </div>
      )}
    </div>
  );
});


const ResourceSection = memo(() => {
  const resources = [
    {
      title: "Grounding Exercises",
      icon: Leaf,
      content: [
        "5-4-3-2-1 Sensing Exercise",
        "Deep Breathing Techniques",
        "Progressive Muscle Relaxation"
      ]
    },
    {
      title: "Coping Strategies",
      icon: Brain,
      content: [
        "Positive Self-Talk Scripts",
        "Emotional Regulation Tools",
        "Mindfulness Practices"
      ]
    },
    {
      title: "Emergency Contacts",
      icon: HeartHandshake,
      content: [
        "Crisis Hotline: 988",
        "Therapy Resources",
        "Support Groups"
      ]
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gem className="w-5 h-5 text-blue-500" />
          Support Resources
        </CardTitle>
        <CardDescription>
          Tools and resources for your journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {resources.map(({ title, icon: Icon, content }) => (
            <div key={title} className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-5 h-5 text-blue-500" />
                <h3 className="font-medium text-blue-700">{title}</h3>
              </div>
              <ul className="space-y-2">
                {content.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-600">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

const ProgressCelebration = memo(({ progress }) => {
  const milestones = [
    { level: 1, icon: Sprout, message: "You've taken the first step!" },
    { level: 3, icon: Flower2, message: "Growing stronger each day" },
    { level: 5, icon: TreePine, message: "Look how far you've come!" }
  ];

  const currentMilestone = milestones.findLast(m => progress >= m.level);
  
  if (!currentMilestone) return null;
  
  const Icon = currentMilestone.icon;
  
  return (
    <div className="fixed bottom-4 right-4 bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-3">
      <Icon className="w-6 h-6" />
      <div>
        <h4 className="font-medium">Milestone Reached!</h4>
        <p className="text-sm">{currentMilestone.message}</p>
      </div>
    </div>
  );
});

// Add encouraging tooltips for each section
const getTooltipMessage = (section) => {
  const messages = {
    values: "Your values shape your actions. Choose ones that empower you.",
    traits: "These traits aren't fixed - they're skills you can develop.",
    goals: "Start small. Each tiny step is progress.",
    skills: "Focus on what brings you joy and makes you feel strong."
  };
  return messages[section] || "You're doing great!";
};

// Dialog Components
const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50">
        {children}
      </div>
    </div>
  );
};

const DialogContent = memo(({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-lg ${className}`}>
    {children}
  </div>
));

const DialogHeader = memo(({ children }) => (
  <div className="space-y-1.5 mb-4">{children}</div>
));

const DialogTitle = memo(({ children }) => (
  <h2 className="text-lg font-semibold">{children}</h2>
));

const MotivationalCard = memo(({ icon: Icon, title, message }) => (
  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg shadow-sm">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-5 h-5 text-purple-500" />
      <h3 className="font-medium text-purple-700">{title}</h3>
    </div>
    <p className="text-sm text-gray-600">{message}</p>
  </div>
));

const SafetyPrompt = memo(() => (
  <div className="bg-blue-50 p-4 rounded-lg mb-6">
    <div className="flex items-center gap-2 mb-2">
      <Shield className="w-5 h-5 text-blue-500" />
      <h3 className="font-medium text-blue-700">Safe Space for Growth</h3>
    </div>
    <p className="text-sm text-gray-600">
      This is your safe space to explore and create. There are no wrong answers.
      Take your time, be gentle with yourself, and remember: you're not editing who you are,
      you're discovering who you can become.
    </p>
  </div>
));

const GrowthPrompts = memo(({ section }) => {
  const prompts = {
    values: "What principles would make you proud to live by?",
    traits: "What qualities do you admire in others that you'd like to cultivate?",
    goals: "What achievements would bring you joy and fulfillment?",
    skills: "What abilities would help you feel more confident and capable?"
  };
  
  return (
    <div className="text-sm text-purple-600 italic mb-2">
      <Lightbulb className="w-4 h-4 inline mr-1" />
      {prompts[section] || "What would empower your growth in this area?"}
    </div>
  );
});


const CharacterCreator = () => {
  const [journalEntries, setJournalEntries] = useState(() => {
    try {
      const saved = localStorage.getItem('journalEntries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [safetyPlan, setSafetyPlan] = useState(() => {
    try {
      const saved = localStorage.getItem('safetyPlan');
      return saved ? JSON.parse(saved) : {
        warning_signs: [],
        internal_coping: [],
        external_support: [],
        safe_places: [],
        emergency_contacts: []
      };
    } catch {
      return {
        warning_signs: [],
        internal_coping: [],
        external_support: [],
        safe_places: [],
        emergency_contacts: []
      };
    }
  });

  const [growthProgress, setGrowthProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('growthProgress');
      return saved ? JSON.parse(saved) : {
        safety: 1,
        healing: 1,
        empowerment: 1
      };
    } catch {
      return {
        safety: 1,
        healing: 1,
        empowerment: 1
      };
    }
  });

  const [dailyIntentions, setDailyIntentions] = useState(() => {
    try {
      const saved = localStorage.getItem('dailyIntentions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [copingTools, setCopingTools] = useState(() => {
    try {
      const saved = localStorage.getItem('copingTools');
      return saved ? JSON.parse(saved) : {
        favorites: [],
        practiced: []
      };
    } catch {
      return {
        favorites: [],
        practiced: []
      };
    }
  });

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
  }, [journalEntries]);

  useEffect(() => {
    localStorage.setItem('safetyPlan', JSON.stringify(safetyPlan));
  }, [safetyPlan]);

  useEffect(() => {
    localStorage.setItem('growthProgress', JSON.stringify(growthProgress));
  }, [growthProgress]);

  useEffect(() => {
    localStorage.setItem('dailyIntentions', JSON.stringify(dailyIntentions));
  }, [dailyIntentions]);

  useEffect(() => {
    localStorage.setItem('copingTools', JSON.stringify(copingTools));
  }, [copingTools]);
  // Initial character state

  const exampleCharacter = {
    name: 'Phoenix',
    avatar: '',
    core: {
      values: [
        'Personal Growth',
        'Authenticity',
        'Inner Peace',
        'Compassion',
        'Resilience'
      ],
      principles: [
        'Take one step at a time',
        'Honor my feelings',
        'Trust the journey',
        'Be gentle with myself',
        'Learn from challenges'
      ],
      goals: [
        'Build emotional resilience',
        'Develop healthy boundaries',
        'Practice daily self-care',
        'Nurture meaningful connections',
        'Find my voice'
      ]
    },
    personality: {
      traits: [
        'Introspective',
        'Creative',
        'Determined',
        'Empathetic',
        'Growing stronger'
      ],
      hobbies: [
        'Journaling',
        'Nature walks',
        'Art therapy',
        'Meditation',
        'Gardening'
      ],
      aspirations: [
        'Help others on their healing journey',
        'Create a peaceful home environment',
        'Build lasting friendships',
        'Share my story to inspire others',
        'Learn to trust again'
      ]
    },
    story: {
      background: `I chose the name Phoenix because I'm learning to rise from challenges stronger than before. Each day is a new opportunity to grow and heal. While my past contains difficult chapters, I'm writing a new story focused on hope, healing, and self-discovery. I'm learning that healing isn't linear, and that's okay.`,
      motivation: 'To transform past struggles into strength and wisdom that can light the way for others',
      challenges: [
        'Learning to trust again',
        'Managing anxiety in healthy ways',
        'Setting boundaries with others',
        'Processing past experiences',
        'Finding my authentic voice'
      ],
      achievements: [
        'Started regular therapy',
        'Developed daily self-care routine',
        'Reached out for support when needed',
        'Started expressing feelings through art',
        'Learned grounding techniques'
      ],
      futureGoals: [
        'Become a peer support mentor',
        'Start a healing journal group',
        'Create art that expresses my journey',
        'Build a strong support network',
        'Learn trauma-informed yoga'
      ]
    },
    stats: {
      confidence: 4,
      resilience: 6,
      creativity: 7,
      empathy: 8,
      wisdom: 5,
      adaptability: 6,
      determination: 7,
      leadership: 4
    },
    relationships: {
      mentors: [
        'Mohamed Alaa - Friend, Senoir Developer',
      ],
      allies: [
        'Support group members',
        'Online healing community',
        'Trusted friends',
        'Understanding family members'
      ],
      rivals: [] // Intentionally empty as focus is on supportive connections
    },
    growth: {
      skills: [
        'Emotional awareness',
        'Boundary setting',
        'Self-advocacy',
        'Mindfulness practices',
        'Stress management'
      ],
      lessons: [
        'Healing takes time and patience',
        'It\'s okay to ask for help',
        'Small progress is still progress',
        'Self-compassion is essential',
        'Everyone\'s journey is different'
      ],
      milestones: [
        'First time sharing in group',
        'Started regular self-care routine',
        'Learned to use coping skills',
        'Set first healthy boundary',
        'Celebrated six months of growth'
      ],
      pathProgress: {
        safety: 2,
        healing: 2,
        empowerment: 1
      }
    },
    therapeutic: {
      safetyPlan: {
        warning_signs: [
          'Feeling overwhelmed by emotions',
          'Difficulty sleeping',
          'Withdrawing from others',
          'Negative thought patterns',
          'Physical tension'
        ],
        internal_coping: [
          'Deep breathing exercises',
          'Grounding techniques',
          'Positive self-talk',
          'Mindful walking',
          'Journaling feelings'
        ],
        external_support: [
          'Call therapist',
          'Contact support group',
          'Text trusted friend',
          'Visit peaceful places',
          'Join online community'
        ],
        safe_places: [
          'Local park',
          'Art studio',
          'Library quiet room',
          'Garden space',
          'Support group meeting place'
        ],
        emergency_contacts: [
          'Therapist: (555) 123-4567',
          'Crisis Line: 988',
          'Trusted Friend: (555) 234-5678',
          'Support Group Leader: (555) 345-6789'
        ]
      },
      copingTools: {
        favorites: [
          'Deep breathing',
          'Art expression',
          'Nature walks',
          'Mindfulness meditation',
          'Progressive muscle relaxation'
        ],
        practiced: [
          {
            tool: 'Grounding exercise',
            timestamp: new Date('2024-11-04T10:00:00').toISOString()
          },
          {
            tool: 'Journaling',
            timestamp: new Date('2024-11-04T15:30:00').toISOString()
          },
          {
            tool: 'Deep breathing',
            timestamp: new Date('2024-11-05T09:00:00').toISOString()
          }
        ]
      },
      dailyIntentions: [
        {
          intention: 'I choose peace over perfection',
          date: new Date('2024-11-05T08:00:00').toISOString(),
          completed: true
        },
        {
          intention: 'I am worthy of care and support',
          date: new Date('2024-11-04T08:00:00').toISOString(),
          completed: true
        },
        {
          intention: 'I trust my healing journey',
          date: new Date('2024-11-03T08:00:00').toISOString(),
          completed: true
        }
      ],
      journalEntries: [
        {
          id: 1,
          mood: 'growing',
          entry: `Today I practiced setting a boundary. It was scary, but I did it. I'm proud of taking this step in my healing journey.`,
          date: new Date('2024-11-05T09:00:00').toISOString()
        },
        {
          id: 2,
          mood: 'challenging',
          entry: `Feeling triggered today, but I used my coping tools. Deep breathing helped. Reminder: it's okay to have hard days.`,
          date: new Date('2024-11-04T20:00:00').toISOString()
        },
        {
          id: 3,
          mood: 'neutral',
          entry: `Attended group therapy. It helps to know I'm not alone. Small steps forward.`,
          date: new Date('2024-11-03T19:00:00').toISOString()
        }
      ]
    },
    progress: {
      milestones: [
        'Started therapy',
        'Joined support group',
        'Developed safety plan',
        'Learned coping skills',
        'Built support network'
      ],
      achievements: [
        'One month of daily journaling',
        'First time sharing in group',
        'Created personal boundaries',
        'Regular self-care routine',
        'Reached out for help'
      ],
      growthMetrics: {
        daysInProgram: 30,
        journalEntries: 25,
        copingSkillsLearned: 8,
        supportConnections: 5
      }
    }
  };
  
  const initialCharacter = {
    name: '',
    avatar: '',
    core: {
      values: [],
      principles: [],
      goals: []
    },
    personality: {
      traits: [],
      hobbies: [],
      aspirations: []
    },
    story: {
      background: '',
      motivation: '',
      challenges: [],
      achievements: [],
      futureGoals: []
    },
    stats: {
      confidence: 1,
      resilience: 1,
      creativity: 1,
      empathy: 1,
      wisdom: 1,
      adaptability: 1,
      determination: 1,
      leadership: 1
    },
    relationships: {
      mentors: [],
      allies: [],
      rivals: []
    },
    growth: {
      skills: [],
      lessons: [],
      milestones: [],
      pathProgress: {
        safety: 1,
        healing: 1,
        empowerment: 1
      },
      journalEntries: []
    },
    therapeutic: {
      safetyPlan: {
        warning_signs: [],
        internal_coping: [],
        external_support: [],
        safe_places: [],
        emergency_contacts: []
      },
      copingTools: {
        favorites: [],
        practiced: []
      },
      dailyIntentions: [],
      journalEntries: [], // Add this field
      mood: 'neutral',    // Optional: add default mood
      intentions: []      // Add this field for daily intentions
    },
    progress: {
      milestones: [],
      achievements: [],
      growthMetrics: {}
    }
  };
  

  const loadExampleCharacter = () => {
    setCurrentCharacter(exampleCharacter);
    setMode('edit');
  };
  
  

    // State
    const [currentCharacter, setCurrentCharacter] = useState(() => {
      try {
        const saved = localStorage.getItem('currentCharacter');
        const parsed = saved ? JSON.parse(saved) : initialCharacter;
        
        // Ensure all arrays exist even if loading from storage
        return {
          ...initialCharacter,
          ...parsed,
          therapeutic: {
            ...initialCharacter.therapeutic,
            ...(parsed?.therapeutic || {}),
            journalEntries: Array.isArray(parsed?.therapeutic?.journalEntries) 
              ? parsed.therapeutic.journalEntries 
              : [],
            dailyIntentions: Array.isArray(parsed?.therapeutic?.dailyIntentions)
              ? parsed.therapeutic.dailyIntentions
              : [],
            copingTools: {
              favorites: Array.isArray(parsed?.therapeutic?.copingTools?.favorites)
                ? parsed.therapeutic.copingTools.favorites
                : [],
              practiced: Array.isArray(parsed?.therapeutic?.copingTools?.practiced)
                ? parsed.therapeutic.copingTools.practiced
                : []
            }
          }
        };
      } catch {
        return initialCharacter;
      }
    });
  
  

  // Refs
  const nameInputRef = useRef(null);
  const storyInputRef = useRef(null);
  const [showCelebration, setShowCelebration] = useState({ show: false, message: '' });

  
const handleJournalDelete = useCallback((entryId) => {
  if (entryId === 'all') {
    // Delete all entries
    setJournalEntries([]);
    localStorage.removeItem('journalEntries');
    setCurrentCharacter(prev => ({
      ...prev,
      therapeutic: {
        ...prev.therapeutic,
        journalEntries: []
      }
    }));
  } else {
    // Delete single entry
    setJournalEntries(prev => {
      const newEntries = prev.filter(entry => entry.id !== entryId);
      localStorage.setItem('journalEntries', JSON.stringify(newEntries));
      return newEntries;
    });
    
    setCurrentCharacter(prev => ({
      ...prev,
      therapeutic: {
        ...prev.therapeutic,
        journalEntries: prev.therapeutic.journalEntries.filter(
          entry => entry.id !== entryId
        )
      }
    }));
  }
}, []);


  const handleJournalEntry = useCallback((entry) => {
    setCurrentCharacter(prev => ({
      ...prev,
      therapeutic: {
        ...prev.therapeutic,
        journalEntries: [
          {
            ...entry,
            id: Date.now(),
            timestamp: new Date().toISOString()
          },
          ...prev.therapeutic.journalEntries
        ]
      }
    }));
  }, []); 

  const handleSafetyPlanUpdate = useCallback((plan) => {
    handleCharacterUpdate({
      therapeutic: {
        ...currentCharacter.therapeutic,
        safetyPlan: plan
      }
    });
  }, []);

  const handleGrowthProgress = useCallback((path, newLevel) => {
    handleCharacterUpdate({
      growth: {
        ...currentCharacter.growth,
        pathProgress: {
          ...currentCharacter.growth.pathProgress,
          [path]: newLevel
        }
      }
    });

        // Show celebration
        if (newLevel > currentCharacter.growth.pathProgress[path]) {
          setShowCelebration({
            show: true,
            message: `Congratulations! You've reached level ${newLevel} in your ${path} journey!`
          });
          setTimeout(() => setShowCelebration({ show: false, message: '' }), 3000);
        }
      }, []);
    

      const handleDailyIntention = useCallback((intention) => {
        handleCharacterUpdate({
          therapeutic: {
            ...currentCharacter.therapeutic,
            dailyIntentions: [
              {
                intention,
                date: new Date().toISOString(),
                completed: false
              },
              ...currentCharacter.therapeutic.dailyIntentions
            ]
          }
        });
      }, []);

      const handleCopingToolUse = useCallback((tool) => {
        handleCharacterUpdate({
          therapeutic: {
            ...currentCharacter.therapeutic,
            copingTools: {
              ...currentCharacter.therapeutic.copingTools,
              practiced: [
                {
                  tool,
                  timestamp: new Date().toISOString()
                },
                ...currentCharacter.therapeutic.copingTools.practiced
              ]
            }
          }
        });
      }, []);



  const [characters, setCharacters] = useState(() => {
    try {
      const saved = localStorage.getItem('characters');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [intentions, setIntentions] = useState(() => {
    try {
      const saved = localStorage.getItem('dailyIntentions');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading intentions:', error);
      return [];
    }
  });
  
  // Save to localStorage whenever intentions change
  useEffect(() => {
    try {
      localStorage.setItem('dailyIntentions', JSON.stringify(intentions));
    } catch (error) {
      console.error('Error saving intentions:', error);
    }
  }, [intentions]);

  const handleIntentionSave = useCallback((newIntention) => {
    setIntentions(prev => {
      const updated = [newIntention, ...prev];
      try {
        localStorage.setItem('dailyIntentions', JSON.stringify(updated));
      } catch (error) {
        console.error('Error saving intentions:', error);
      }
      return updated;
    });
  }, []);

  const [mode, setMode] = useState('create');
  const [showSavedAlert, setShowSavedAlert] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  // Debounced save function
  const debouncedSave = useCallback(
    (() => {
      let timeoutId;
      return (character) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          try {
            localStorage.setItem('currentCharacter', JSON.stringify(character));
          } catch (error) {
            console.error('Error saving current character:', error);
          }
        }, 500);
      };
    })(),
    []
  );


  const handleIntentionDelete = useCallback((intentionId, updatedIntention) => {
    if (intentionId === 'all') {
      setIntentions([]);
      localStorage.removeItem('dailyIntentions');
      
      // Update character state
      setCurrentCharacter(prev => ({
        ...prev,
        therapeutic: {
          ...prev.therapeutic,
          dailyIntentions: []
        }
      }));
    } else if (updatedIntention) {
      // Handle completing/uncompleting an intention
      setIntentions(prev => {
        const updated = prev.map(intention => 
          intention.id === intentionId ? updatedIntention : intention
        );
        try {
          localStorage.setItem('dailyIntentions', JSON.stringify(updated));
        } catch (error) {
          console.error('Error saving intentions:', error);
        }
        return updated;
      });
  
      // Update character state
      setCurrentCharacter(prev => ({
        ...prev,
        therapeutic: {
          ...prev.therapeutic,
          dailyIntentions: prev.therapeutic.dailyIntentions.map(intention =>
            intention.id === intentionId ? updatedIntention : intention
          )
        }
      }));
    } else {
      // Handle deletion
      setIntentions(prev => {
        const updated = prev.filter(intention => intention.id !== intentionId);
        try {
          localStorage.setItem('dailyIntentions', JSON.stringify(updated));
        } catch (error) {
          console.error('Error saving intentions:', error);
        }
        return updated;
      });
  
      // Update character state
      setCurrentCharacter(prev => ({
        ...prev,
        therapeutic: {
          ...prev.therapeutic,
          dailyIntentions: prev.therapeutic.dailyIntentions.filter(
            intention => intention.id !== intentionId
          )
        }
      }));
    }
  }, []);
  
  // Add synchronization effect
  useEffect(() => {
    setCurrentCharacter(prev => ({
      ...prev,
      therapeutic: {
        ...prev.therapeutic,
        dailyIntentions: intentions
      }
    }));
  }, [intentions]);
  
  // Add this function to handle importing data
  const importIntentions = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        if (Array.isArray(importedData)) {
          setIntentions(importedData);
          localStorage.setItem('dailyIntentions', JSON.stringify(importedData));
          alert('Intentions imported successfully!');
        }
      } catch (error) {
        console.error('Error importing intentions:', error);
        alert('Error importing intentions. Please check the file format.');
      }
    };
    reader.readAsText(file);
  }, []);

  // Effects
  useEffect(() => {
    try {
      localStorage.setItem('characters', JSON.stringify(characters));
    } catch (error) {
      console.error('Error saving characters:', error);
    }
  }, [characters]);

  useEffect(() => {
    debouncedSave(currentCharacter);
  }, [currentCharacter, debouncedSave]);

  // Handlers
  const handleCharacterUpdate = useCallback((updates, section = null) => {
    setCurrentCharacter(prev => {
      const newChar = { ...prev };
      if (section) {
        // Handle nested updates
        if (typeof updates === 'object') {
          newChar[section] = {
            ...newChar[section],
            ...updates
          };
        }
      } else {
        // Handle direct updates
        Object.entries(updates).forEach(([key, value]) => {
          if (key.includes('.')) {
            const [mainSection, subSection] = key.split('.');
            newChar[mainSection] = {
              ...newChar[mainSection],
              [subSection]: value
            };
          } else {
            newChar[key] = value;
          }
        });
      }
      return newChar;
    });
  }, []);

  const handleItemAdd = useCallback((section, subsection, inputKey) => {
    const newItem = inputValues[inputKey]?.trim();
    if (!newItem) return;

    setCurrentCharacter(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: [...prev[section][subsection], newItem]
      }
    }));

    setInputValues(prev => ({ ...prev, [inputKey]: '' }));
  }, [inputValues]);

  const removeItem = useCallback((section, subsection, index) => {
    setCurrentCharacter(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: prev[section][subsection].filter((_, i) => i !== index)
      }
    }));
  }, []);

  const saveCharacter = useCallback(() => {
    if (!currentCharacter.name.trim()) {
      alert('Please give your character a name before saving.');
      nameInputRef.current?.focus();
      return;
    }

    setCharacters(prev => {
      const existingIndex = prev.findIndex(char => char.name === currentCharacter.name);
      if (existingIndex >= 0 && mode === 'edit') {
        const updated = [...prev];
        updated[existingIndex] = currentCharacter;
        return updated;
      }
      return [...prev, currentCharacter];
    });

    // Save to localStorage
    try {
      localStorage.setItem('characters', JSON.stringify(characters));
      setShowSavedAlert(true);
      setTimeout(() => setShowSavedAlert(false), 3000);
    } catch (error) {
      console.error('Error saving character:', error);
      alert('There was an error saving your character. Please try again.');
    }

    if (mode === 'create') {
      setCurrentCharacter(initialCharacter);
      setInputValues({});
    }
  }, [currentCharacter, mode, characters]);

  const loadCharacter = useCallback((char) => {
    setCurrentCharacter(char);
    setMode('edit');
  }, []);


  // Memoized Components
  const BasicInfo = memo(() => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Your New Chapter
        </CardTitle>
        <CardDescription>
          This is where your new story begins. Take a deep breath and imagine the person you want to become.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SafetyPrompt />
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Choose Your New Name</label>
          <ControlledInput
            inputRef={nameInputRef}
            placeholder="A name that represents your fresh start..."
            value={currentCharacter.name}
            onChange={(value) => handleCharacterUpdate({ name: value })}
            disabled={mode === 'preview'}
            className="transition-all focus:ring-purple-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Your New Story</label>
          <p className="text-sm text-gray-500 mb-2">
            This is your opportunity to write your story the way you want it to be.
            Focus on your strengths, hopes, and the person you're becoming.
          </p>
          <ControlledTextarea
            textareaRef={storyInputRef}
            placeholder="Begin writing your new chapter..."
            value={currentCharacter.story.background}
            onChange={(value) => handleCharacterUpdate({ 'story.background': value })}
            disabled={mode === 'preview'}
            className="min-h-[150px] transition-all focus:ring-purple-500"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <MotivationalCard
            icon={Heart}
            title="Self-Compassion"
            message="Remember, this journey is about growth, not perfection. Each step forward matters."
          />
          <MotivationalCard
            icon={Sparkles}
            title="Infinite Potential"
            message="You have the power to reinvent yourself. Your past does not define your future."
          />
        </div>
      </CardContent>
    </Card>
  ));

  const StatsSection = memo(() => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          Your Growing Strengths
        </CardTitle>
        <CardDescription>
          These aren't fixed traits - they're areas for growth. Start where you are and imagine where you'd like to be.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-yellow-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-yellow-700">
            Remember: These numbers don't define you. They're just a starting point for your journey.
            Focus on progress, not perfection.
          </p>
        </div>
        {Object.entries(currentCharacter.stats).map(([stat, value]) => (
          <div key={stat} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="capitalize text-sm font-medium">{stat}</span>
              <div className="flex items-center gap-1">
                <Trophy className={`w-4 h-4 ${value >= 7 ? 'text-yellow-500' : 'text-gray-300'}`} />
                <span className="text-sm text-gray-600">{value}/10</span>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all"
                style={{ width: `${value * 10}%` }}
              />
            </div>
            {mode !== 'preview' && (
              <input
                type="range"
                min="1"
                max="10"
                value={value}
                onChange={e => handleCharacterUpdate({
                  stats: { ...currentCharacter.stats, [stat]: parseInt(e.target.value) }
                })}
                className="w-full mt-1"
              />
            )}
            <p className="text-xs text-gray-500 italic">
              {getStatMessage(stat, value)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  ));

  const handleStatUpdate = (stat, value) => {
    const previousValue = currentCharacter.stats[stat];
    if (value > previousValue && value % 3 === 0) {
      setShowCelebration({
        show: true,
        message: `Milestone reached in ${stat}! Your growth is inspiring!`
      });
      setTimeout(() => setShowCelebration({ show: false, message: '' }), 3000);
    }
    handleCharacterUpdate({
      stats: { ...currentCharacter.stats, [stat]: value }
    });
  };

  const getStatMessage = (stat, value) => {
    if (value <= 3) {
      return "This is just the beginning of your journey. Every small step matters.";
    } else if (value <= 6) {
      return "You're making progress! Keep nurturing this strength.";
    } else {
      return "Look how far you've come! This is becoming one of your core strengths.";
    }
  };

  const renderItems = useCallback((section, subsection, placeholder) => (
    <div className="space-y-2">
      {currentCharacter[section][subsection].map((item, index) => (
        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
          <span>{item}</span>
          {mode !== 'preview' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeItem(section, subsection, index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      ))}
      {mode !== 'preview' && (
        <div className="flex gap-2 mt-2">
          <ControlledInput
            placeholder={placeholder}
            value={inputValues[`${section}-${subsection}`] || ''}
            onChange={(value) => setInputValues(prev => ({
              ...prev,
              [`${section}-${subsection}`]: value
            }))}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleItemAdd(section, subsection, `${section}-${subsection}`);
              }
            }}
          />
          <Button 
            onClick={() => handleItemAdd(section, subsection, `${section}-${subsection}`)}
            size="sm"
          >
            Add
          </Button>
        </div>
      )}
    </div>
  ), [currentCharacter, mode, inputValues, handleItemAdd, removeItem]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Character Creator</h1>
        <div className="space-x-2">
        <Button
          variant="outline"
          onClick={loadExampleCharacter}
          className="ml-2"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Me?
        </Button>
          <Button
            variant={mode === 'create' ? 'default' : 'outline'}
            onClick={() => setMode('create')}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Create
          </Button>
          <Button
            variant={mode === 'edit' ? 'default' : 'outline'}
            onClick={() => setMode('edit')}
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            variant={mode === 'preview' ? 'default' : 'outline'}
            onClick={() => setMode('preview')}
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          {characters.length >= 2 && (
            <Button
              variant="outline"
              onClick={() => setShowComparison(true)}
            >
              <GitCompare className="w-4 h-4 mr-2" />
              Compare
            </Button>
          )}
        </div>
      </div>

      <SafetyCheck/>



      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BasicInfo />
        <StatsSection />

        {/* Core Values & Principles */}
        <Card>
          <CardHeader>
            <CardTitle>Core Values & Principles</CardTitle>
            <CardDescription>What guides your character?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { section: 'core', subsection: 'values', placeholder: 'Add a new value...' },
                { section: 'core', subsection: 'principles', placeholder: 'Add a new principle...' },
                { section: 'core', subsection: 'goals', placeholder: 'Add a new goal...' }
              ].map(({ section, subsection, placeholder }) => (
                <div key={subsection}>
                  <h3 className="text-lg font-semibold capitalize mb-2">{subsection}</h3>
                  {renderItems(section, subsection, placeholder)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Personality */}
        <Card>
          <CardHeader>
            <CardTitle>Personality</CardTitle>
            <CardDescription>Shape your character's unique traits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { section: 'personality', subsection: 'traits', placeholder: 'Add a new trait...' },
                { section: 'personality', subsection: 'hobbies', placeholder: 'Add a new hobby...' },
                { section: 'personality', subsection: 'aspirations', placeholder: 'Add a new aspiration...' }
              ].map(({ section, subsection, placeholder }) => (
                <div key={subsection}>
                  <h3 className="text-lg font-semibold capitalize mb-2">{subsection}</h3>
                  {renderItems(section, subsection, placeholder)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Growth & Development */}
        <Card>
          <CardHeader>
            <CardTitle>Growth & Development</CardTitle>
            <CardDescription>Track your character's journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { section: 'growth', subsection: 'skills', placeholder: 'Add a new skill...' },
                { section: 'growth', subsection: 'lessons', placeholder: 'Add a life lesson...' },
                { section: 'growth', subsection: 'milestones', placeholder: 'Add a milestone...' }
              ].map(({ section, subsection, placeholder }) => (
                <div key={subsection}>
                  <h3 className="text-lg font-semibold capitalize mb-2">{subsection}</h3>
                  {renderItems(section, subsection, placeholder)}
                  </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Relationships */}
        <Card>
          <CardHeader>
            <CardTitle>Relationships</CardTitle>
            <CardDescription>Define important connections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { section: 'relationships', subsection: 'mentors', placeholder: 'Add a mentor...' },
                { section: 'relationships', subsection: 'allies', placeholder: 'Add an ally...' },
                { section: 'relationships', subsection: 'rivals', placeholder: 'Add a rival...' }
              ].map(({ section, subsection, placeholder }) => (
                <div key={subsection}>
                  <h3 className="text-lg font-semibold capitalize mb-2">{subsection}</h3>
                  {renderItems(section, subsection, placeholder)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      {mode !== 'preview' && (
        <div className="flex justify-end gap-4">
          <Button 
            variant="outline" 
            onClick={() => {
              if (window.confirm('Are you sure you want to reset all fields?')) {
                setCurrentCharacter(initialCharacter);
                setInputValues({});
              }
            }}
          >
            Reset
          </Button>
          <Button onClick={saveCharacter}>
            <Save className="w-4 h-4 mr-2" />
            Save Character
          </Button>
        </div>
      )}

      {/* Character List */}
      {characters.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Your Characters</CardTitle>
            <CardDescription>View and manage your saved characters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {characters.map((char) => (
                <Card key={char.name} className="border">
                  <CardHeader>
                    <CardTitle>{char.name}</CardTitle>
                    <CardDescription>
                      {char.personality.traits.slice(0, 3).join(', ')}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCurrentCharacter(char);
                        setMode('preview');
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCurrentCharacter(char);
                        setMode('edit');
                      }}
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Analytics */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5" /> Progress Analytics
          </CardTitle>
          <CardDescription>Track your character's growth across different dimensions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Character Radar Chart */}
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={Object.entries(currentCharacter.stats).map(([key, value]) => ({
                  subject: key,
                  value: value,
                  fullMark: 10
                }))}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} />
                  <Radar
                    name="Stats"
                    dataKey="value"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Growth Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded">
                <div className="text-sm text-blue-600 mb-1">Strongest Area</div>
                <div className="font-medium">
                  {Object.entries(currentCharacter.stats)
                    .reduce((a, b) => a[1] > b[1] ? a : b)[0]}
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <div className="text-sm text-green-600 mb-1">Most Recent Growth</div>
                <div className="font-medium">
                  {currentCharacter.growth.milestones[0] || 'No milestones yet'}
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded">
                <div className="text-sm text-purple-600 mb-1">Next Focus Area</div>
                <div className="font-medium">
                  {Object.entries(currentCharacter.stats)
                    .reduce((a, b) => a[1] < b[1] ? a : b)[0]}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Character Comparison Dialog */}
      <Dialog open={showComparison} onOpenChange={setShowComparison}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Compare Characters</DialogTitle>
          </DialogHeader>
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {characters.map((char) => (
                <Button
                  key={char.name}
                  variant={selectedCharacters.includes(char) ? "default" : "outline"}
                  onClick={() => {
                    if (selectedCharacters.includes(char)) {
                      setSelectedCharacters(selectedCharacters.filter(c => c !== char));
                    } else if (selectedCharacters.length < 2) {
                      setSelectedCharacters([...selectedCharacters, char]);
                    }
                  }}
                  disabled={selectedCharacters.length >= 2 && !selectedCharacters.includes(char)}
                >
                  {char.name}
                </Button>
              ))}
            </div>
            
            {/* Comparison Content */}
            {selectedCharacters.length === 2 && (
              <div className="grid grid-cols-2 gap-8 p-4">
                {selectedCharacters.map((char, index) => (
                  <div key={index} className="space-y-6">
                    <h3 className="text-xl font-bold border-b pb-2">{char.name}</h3>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold">Stats</h4>
                      {Object.entries(char.stats).map(([stat, value]) => (
                        <div key={stat} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize">{stat}</span>
                            <span>{value}/10</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${value * 10}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Core Values</h4>
                      {char.core.values.map((value, i) => (
                        <div key={i} className="bg-gray-50 p-2 mb-1 rounded">{value}</div>
                      ))}
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Personality Traits</h4>
                      {char.personality.traits.map((trait, i) => (
                        <div key={i} className="bg-gray-50 p-2 mb-1 rounded">{trait}</div>
                      ))}
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Goals</h4>
                      {char.core.goals.map((goal, i) => (
                        <div key={i} className="bg-gray-50 p-2 mb-1 rounded">{goal}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <GrowthPathSection 
        progress={currentCharacter.growth?.pathProgress || {
          safety: 1,
          healing: 1,
          empowerment: 1
        }}
        onUpdate={handleGrowthProgress}
        currentCharacter={currentCharacter}
      />

      <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* <SafetyPlanBuilder 
        plan={currentCharacter.therapeutic?.safetyPlan || {
          warning_signs: [],
          internal_coping: [],
          external_support: [],
          safe_places: [],
          emergency_contacts: []
        }}
        onSave={handleSafetyPlanUpdate} 
      /> */}
      

      
      <DailyIntentionSetter
      intentions={intentions}
      onSave={handleIntentionSave}
      onDelete={handleIntentionDelete}
    />

        
      <HealingJournalSection 
        entries={currentCharacter.therapeutic?.journalEntries || []}
        onSave={handleJournalEntry} 
        onDelete={handleJournalDelete}

      />
      

      <CopingToolbox 
        tools={currentCharacter.therapeutic?.copingTools || {
          favorites: [],
          practiced: []
        }}
        onToolUse={handleCopingToolUse} 
      />
      
    </div>



      {/* Save Alert */}
      {showSavedAlert && (
        <Alert className="fixed bottom-4 right-4 w-auto">
          <AlertDescription>
            Character saved successfully!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default CharacterCreator;


// Add these new therapeutic components

const GrowthTracker = memo(({ path, currentStage, onUpdate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {React.createElement(path.icon, { className: "w-5 h-5 text-purple-500" })}
          {path.title}
        </CardTitle>
        <CardDescription>Track your progress on your healing journey</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {path.stages.map((stage, index) => (
            <div
              key={stage.level}
              className={`p-4 rounded-lg border ${
                stage.level <= currentStage
                  ? 'bg-purple-50 border-purple-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-purple-700">
                  Stage {stage.level}: {stage.name}
                </h3>
                {stage.level <= currentStage && (
                  <Trophy className="w-5 h-5 text-yellow-500" />
                )}
              </div>
              <p className="text-sm text-gray-600 mb-3">{stage.focus}</p>
              <div className="space-y-2">
                {stage.activities.map((activity, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 text-sm p-2 rounded ${
                      stage.level <= currentStage
                        ? 'bg-white'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${
                      stage.level <= currentStage
                        ? 'text-green-500'
                        : 'text-gray-400'
                    }`} />
                    {activity}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

const CopingToolbox = memo(() => {
  const [selectedTool, setSelectedTool] = useState(null);
  
  const tools = {
    grounding: {
      title: "Grounding Techniques",
      icon: Anchor,
      techniques: [
        {
          name: "5-4-3-2-1 Senses",
          description: "Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.",
          duration: "5 minutes"
        },
        {
          name: "Body Scan",
          description: "Slowly focus attention on each part of your body, noticing sensations without judgment.",
          duration: "10 minutes"
        },
        {
          name: "Square Breathing",
          description: "Breathe in for 4, hold for 4, out for 4, hold for 4. Repeat.",
          duration: "3-5 minutes"
        }
      ]
    },
    emotional: {
      title: "Emotional Regulation",
      icon: Heart,
      techniques: [
        {
          name: "Emotion Naming",
          description: "Name your emotions with specificity to reduce their intensity.",
          duration: "2-3 minutes"
        },
        {
          name: "Self-Soothing",
          description: "Engage your senses with comforting activities (soft textures, calming sounds, etc.)",
          duration: "5-15 minutes"
        },
        {
          name: "Containment Visualization",
          description: "Imagine placing difficult emotions in a container for later processing.",
          duration: "5 minutes"
        }
      ]
    },
    cognitive: {
      title: "Thought Management",
      icon: BrainCircuit,
      techniques: [
        {
          name: "Thought Challenging",
          description: "Question negative thoughts using evidence for and against.",
          duration: "10 minutes"
        },
        {
          name: "Future Self",
          description: "Visualize your future self who has moved through this challenge.",
          duration: "5-10 minutes"
        },
        {
          name: "Reframing",
          description: "Practice finding alternative perspectives on situations.",
          duration: "5-10 minutes"
        }
      ]
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Blocks className="w-5 h-5 text-teal-500" />
          Coping Toolbox
        </CardTitle>
        <CardDescription>
          Tools and techniques for managing difficult moments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(tools).map(([key, category]) => (
            <div
              key={key}
              className="bg-gradient-to-b from-white to-teal-50 rounded-lg p-4 cursor-pointer"
              onClick={() => setSelectedTool(key)}
            >
              <div className="flex items-center gap-2 mb-3">
                {React.createElement(category.icon, { className: "w-5 h-5 text-teal-500" })}
                <h3 className="font-medium text-teal-700">{category.title}</h3>
              </div>
              <div className="text-sm text-gray-600">
                Click to explore {category.techniques.length} techniques
              </div>
            </div>
          ))}
        </div>

        {selectedTool && (
          <div className="mt-6 bg-white p-4 rounded-lg border border-teal-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-teal-700">
                {tools[selectedTool].title} Techniques
              </h3>
              <button
                onClick={() => setSelectedTool(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {tools[selectedTool].techniques.map((technique, idx) => (
                <div key={idx} className="bg-teal-50 p-3 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-teal-700">{technique.name}</h4>
                    <span className="text-sm text-teal-600">{technique.duration}</span>
                  </div>
                  <p className="text-sm text-gray-600">{technique.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
});

const SafetyPlanBuilder = memo(({ onSave }) => {
  const [plan, setPlan] = useState({
    warning_signs: [],
    internal_coping: [],
    external_support: [],
    safe_places: [],
    emergency_contacts: []
  });

  const sections = [
    {
      key: 'warning_signs',
      title: 'Warning Signs to Watch For',
      icon: AlertTriangle,
      placeholder: 'Add a warning sign...',
      description: 'What signs tell you you might need support?'
    },
    {
      key: 'internal_coping',
      title: 'Internal Coping Strategies',
      icon: Brain,
      placeholder: 'Add a coping strategy...',
      description: 'What helps you feel better on your own?'
    },
    {
      key: 'external_support',
      title: 'External Support System',
      icon: Users,
      placeholder: 'Add a support person...',
      description: 'Who can you reach out to?'
    },
    {
      key: 'safe_places',
      title: 'Safe Places',
      icon: Home,
      placeholder: 'Add a safe place...',
      description: 'Where do you feel safe and calm?'
    },
    {
      key: 'emergency_contacts',
      title: 'Emergency Contacts',
      icon: Phone,
      placeholder: 'Add emergency contact...',
      description: 'Who to contact in crisis (include professional help)'
    }
  ];

  const addItem = (section, item) => {
    if (!item.trim()) return;
    setPlan(prev => ({
      ...prev,
      [section]: [...prev[section], item.trim()]
    }));
  };

  const removeItem = (section, index) => {
    setPlan(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-red-500" />
          Safety Plan
        </CardTitle>
        <CardDescription>
          Build your personalized safety plan for difficult moments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sections.map(({ key, title, icon: Icon, placeholder, description }) => (
            <div key={key} className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-5 h-5 text-red-500" />
                <h3 className="font-medium text-gray-900">{title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">{description}</p>
              <div className="space-y-2">
                {plan[key].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span>{item}</span>
                    <button
                      onClick={() => removeItem(key, idx)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    placeholder={placeholder}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addItem(key, e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                  <Button onClick={(e) => {
                    const input = e.target.previousSibling;
                    addItem(key, input.value);
                    input.value = '';
                  }}>
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button
          className="mt-6 w-full"
          onClick={() => onSave(plan)}
        >
          Save Safety Plan
        </Button>
      </CardContent>
    </Card>
  );
});

