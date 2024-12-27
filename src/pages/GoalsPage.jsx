import React, { useState } from 'react';
import { 
  Target, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Pause, 
  ArrowUpCircle,
  Brain,
  Dumbbell,
  BookOpen,
  Heart,
  DollarSign,
  Users,
  Laptop,
  Sparkles,
  GraduationCap
} from 'lucide-react';

const GoalsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');
  const [sortOrder, setSortOrder] = useState('asc');
  const [expandedBackups, setExpandedBackups] = useState(new Set());

  const toggleBackup = (goalId) => {
    const newExpanded = new Set(expandedBackups);
    if (newExpanded.has(goalId)) {
      newExpanded.delete(goalId);
    } else {
      newExpanded.add(goalId);
    }
    setExpandedBackups(newExpanded);
  };

  const goalCategories = [
    { id: 'all', label: 'All Goals', icon: Target },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'career', label: 'Career', icon: Laptop },
    { id: 'language', label: 'Language', icon: BookOpen },
    { id: 'financial', label: 'Financial', icon: DollarSign },
    { id: 'personal', label: 'Personal Growth', icon: Heart },
    { id: 'health', label: 'Health & Lifestyle', icon: Dumbbell }
  ];

  const calculateProgress = (milestones) => {
    if (!milestones || milestones.length === 0) return 0;
    const completedMilestones = milestones.filter(m => m.completed).length;
    return Math.round((completedMilestones / milestones.length) * 100);
  };

  const goals = [
    {
      id: 1,
      category: 'education',
      title: "Master's in Disease Research",
      description: "Pursue advanced degree in Molecular/Computational Biomedicine or related field",
      status: 'in-progress',
      deadline: "2028-07-30",
      milestones: [
        { text: "Research suitable programs", completed: true },
        { text: "Apply to selected universities target winter 2026", completed: false },
        { text: "Secure admission and funding", completed: false },
      ],
      backupPlans: [
        {
          title: "Alternative Path",
          description: "Contingency plan if initial application is unsuccessful",
          milestones: [
            { text: "Wait for military service completion (about 12 months)", completed: false },
            { text: "Learn new languages to study free or make it easy to study for more applications", completed: false },
            { text: "Reapply with strengthened application", completed: false },
            { text: "Consider alternative universities/programs", completed: false }
          ]
        }
      ]
    },
    {
      id: 2,
      category: 'career',
      title: "N2N Startup",
      description: "Help N2N get funds",
      status: 'in-progress',
      deadline: "2025-04-30",
      milestones: [
        { text: "Define core features and user journey", completed: true },
        { text: "Design system architecture", completed: true },
        { text: "Develop backend infrastructure", completed: true },
        { text: "Create frontend user interface", completed: true },
        { text: "Implement user authentication", completed: true },
        { text: "Deploy MVP to production", completed: true }, 
        { text: "Fix multiple port issues", completed: false }, 
        { text: "Apply to startup accelerators/incubators", completed: false },
        { text: "Participate in pitch competitions", completed: false },
        { text: "Network with angel investors", completed: false },
        { text: "Secure initial seed funding", completed: false }
      ],
      backupPlans: [
        {
          title: "Alternative Funding Strategy",
          description: "Backup options for securing resources",
          milestones: [
            { text: "Explore crowdfunding platforms", completed: false },
            { text: "Investigate government grants", completed: false },
            { text: "Consider bootstrapping with initial clients", completed: false },
            { text: "Research revenue-based financing", completed: false }
          ]
        }
      ]
    },
    {
      id: 3,
      category: 'language',
      title: "German A1",
      description: "Master German A1 level foundations",
      status: 'in-progress',
      deadline: "2024-06-31",
      milestones: [
        { text: "Complete A1 vocabulary list (1,000 words)", completed: false },
        { text: "Master basic grammar (articles, pronouns, present tense)", completed: false },
        { text: "Learn numbers, days, months, basic phrases", completed: false },
        { text: "Practice basic conversations (introductions, ordering, ...)", completed: false },
        { text: "Complete A1 workbook exercises", completed: false },
        { text: "Pass A1 practice tests", completed: false },
      ],
      backupPlans: [
        {
          title: "Alternative Deadlines",
          description: "Parallel study with a light start a2",
          milestones: [
            { text: "Finish in two weeks", completed: false }
          ]
        }
      ]
    },
    {
      id: 4,
      category: 'language',
      title: "German A2",
      description: "Progress to A2 level German proficiency",
      status: 'not-started',
      deadline: "2025-1-31",
      milestones: [
        { text: "Learn A2 vocabulary (2,000 words total)", completed: false },
        { text: "Master past tense and future tense", completed: false },
        { text: "Practice daily routine conversations", completed: false },
        { text: "Write simple emails and messages", completed: false },
        { text: "Complete A2 listening exercises", completed: false },
        { text: "Read simple German texts", completed: false },
      ],
      backupPlans: [
        {
          title: "Intensive Learning",
          description: "Accelerated learning if needed",
          milestones: [
            { text: "Join A2 study group", completed: false },
            { text: "Take weekend intensive courses", completed: false },
            { text: "Find German conversation partner", completed: false }
          ]
        }
      ]
    },
    {
      id: 5,
      category: 'language',
      title: "German B1",
      description: "Achieve B1 intermediate German level",
      status: 'not-started',
      deadline: "2025-03-15",
      milestones: [
        { text: "Expand vocabulary (3,500 words)", completed: false },
        { text: "Master subjunctive and complex grammar", completed: false },
        { text: "Hold extended conversations", completed: false },
        { text: "Write formal letters and essays", completed: false },
        { text: "Read German news articles", completed: false },
        { text: "Watch German shows with subtitles", completed: false },
        { text: "Take official B1 exam", completed: false }
      ],
      backupPlans: [
        {
          title: "Immersive Learning",
          description: "Enhanced learning through immersion",
          milestones: [
            { text: "Participate in German meetups", completed: false },
            { text: "Take B1 preparation course", completed: false },
            { text: "Start journal writing in German", completed: false }
          ]
        }
      ]
    },
    {
      id: 6,
      category: 'language',
      title: "German B2",
      description: "Master B2 level German for university readiness",
      status: 'not-started',
      deadline: "2025-4-15",
      milestones: [
        { text: "Master advanced vocabulary (5,000+ words)", completed: false },
        { text: "Perfect complex grammar structures", completed: false },
        { text: "Write academic essays", completed: false },
        { text: "Give presentations in German", completed: false },
        { text: "Watch German media without subtitles", completed: false },
        { text: "Read academic German texts", completed: false },
        { text: "Pass official B2 exam", completed: false }
      ],
      backupPlans: [
        {
          title: "Exam Preparation Focus",
          description: "Intensive B2 exam preparation",
          milestones: [
            { text: "Take TestDaF preparation course", completed: false },
            { text: "Practice with past exam papers", completed: false },
            { text: "Get private tutoring if needed", completed: false }
          ]
        }
      ]
    },
    {
      id: 7,
      category: 'financial',
      title: "Study Abroad Preparation",
      description: "Save for study and visa-related expenses",
      status: 'in-progress',

      deadline: "2025-06-30",
      milestones: [
        { text: "Save for blocked account", completed: false },
        { text: "Arrange health insurance", completed: false },
        { text: "Budget for visa process", completed: true }
      ]
    },
    {
      id: 8,
      category: 'personal',
      title: "Make A FAMILY",
      description: "Focus on self-improvement and building healthy relationships",
      status: 'in-progress',
      deadline: "No Deadline or Start time",
      milestones: [
        { text: "Find good wife", completed: false },
        { text: "Marry Her", completed: false },
        { text: "Aim for Kids", completed: false },
        { text: "Educate them well", completed: false },
      ]
    },
    {
      id: 9,
      category: 'health',
      title: "Intensive Home Workout for 3 months",
      description: "Complete a structured 3-month home workout program to build strength and endurance",
      status: 'in-progress',
      deadline: "2025-03-30",
      milestones: [
        // Month 1 - Foundation
        { text: "Create dedicated workout space at home", completed: false },
        { text: "Establish baseline fitness measurements", completed: false },
        { text: "Complete Week 1-4 bodyweight exercises", completed: false },
        { text: "Track daily water intake (2L minimum)", completed: false },
        { text: "Maintain proper sleep schedule (7-8 hours)", completed: false },
        
        // Month 2 - Progress
        { text: "Increase workout intensity by 20%", completed: false },
        { text: "Add resistance band exercises", completed: false },
        { text: "Complete 15 workouts second month", completed: false },
        { text: "Achieve more 20 consecutive push-ups", completed: false },
        { text: "Hold 2-minute plank", completed: false },
        
        // Month 3 - Advanced
        { text: "Complete advanced workout variations", completed: false },
        { text: "Achieve 30 consecutive push-ups", completed: false },
        { text: "Hold 3-minute plank", completed: false },
        { text: "Complete 20 workouts this month", completed: false },
        { text: "Take final progress measurements", completed: false }
      ]
    },
    {
      id: 10,
      category: 'financial',
      title: "Secure Purpose-Driven Income",
      description: "Find a position that provides both learning opportunities and the ability to make meaningful impact in medical/health tech",
      status: 'in-progress',
      deadline: "2028-12-31",
      milestones: [
        { text: "Research biotech/healthtech companies and startups", completed: false },
        { text: "Build portfolio of health-related software projects", completed: false },
        { text: "Network with professionals in medical technology", completed: false },
        { text: "Apply to positions combining tech and healthcare", completed: false },
        { text: "Start own health-tech initiative if no suitable positions", completed: false }
      ],
      backupPlans: [
        {
          title: "Alternative Path",
          description: "Bridge role while building towards main goal",
          milestones: [
            { text: "Take remote position allowing part-time research", completed: false },
            { text: "Start side project in medical technology", completed: false },
            { text: "Build savings for future startup", completed: false }
          ]
        }
      ]
    },
    {
      id: 11,
      category: 'language',
      title: "Arabic Grammar (النحو)",
      description: "Master Arabic grammar from basics to advanced levels",
      status: 'not-started',
      deadline: "2028-12-31",
      milestones: [
        // Year 1
        { text: "Memorize Nadm Al-Ajrumiyah (نظم الآجرومية)", completed: false },
        { text: "Complete Al-Muqaddimah Al-Azhariyyah (المقدمة الأزهرية)", completed: false },
        // Year 2
        { text: "Master Qatr Al-Nada (قطر الندى)", completed: false },
        { text: "Begin Alfiyyat Ibn Malik Part 1 (ألفية ابن مالك ١)", completed: false },
        // Year 3
        { text: "Complete Alfiyyat Parts 2-3 (ألفية ابن مالك ٢-٣)", completed: false },
        { text: "Master Ibn Aqeel's commentary (شرح ابن عقيل)", completed: false },
        // Year 4
        { text: "Complete Alfiyyat Parts 4-5 (ألفية ابن مالك ٤-٥)", completed: false },
        { text: "Master principles of grammar (أصول النحو)", completed: false }
      ]
    },
    {
      id: 12,
      category: 'language',
      title: "Arabic Morphology (الصرف)",
      description: "Master word formation and morphological patterns",
      status: 'not-started',
      deadline: "2028-12-31",
      milestones: [
        // Year 1
        { text: "Complete Al-Sarf Al-Saghir (الصرف الصغير)", completed: false },
        { text: "Master basic verb patterns", completed: false },
        // Year 2
        { text: "Study Shatha Al-Urf Part 1 (شذا العرف ١)", completed: false },
        { text: "Complete advanced patterns", completed: false },
        // Year 3
        { text: "Master Lamiyyat Al-Af'al Part 1 (لامية الأفعال ١)", completed: false },
        { text: "Study complex derivations", completed: false },
        // Year 4
        { text: "Complete advanced morphological studies", completed: false },
        { text: "Master irregular forms", completed: false }
      ]
    },
    {
      id: 13,
      category: 'language',
      title: "Arabic Rhetoric (البلاغة)",
      description: "Master the art of Arabic eloquence and style",
      status: 'not-started',
      deadline: "2028-12-31",
      milestones: [
        // Year 1
        { text: "Complete Zubdat Al-Balagha (زبدة البلاغة)", completed: false },
        { text: "Study Mi'at Al-Ma'ani (مائة المعاني والبيان)", completed: false },
        // Year 2
        { text: "Master Al-Jawhar Al-Maknun (الجوهر المكنون)", completed: false },
        { text: "Study Al-Balagha Al-Wadiha (البلاغة الواضحة)", completed: false },
        // Year 3
        { text: "Complete Al-Idah Part 1 (الإيضاح ١)", completed: false },
        { text: "Study stylistic analysis", completed: false },
        // Year 4
        { text: "Master advanced rhetoric concepts", completed: false },
        { text: "Complete applied studies", completed: false }
      ]
    },
    {
      id: 14,
      category: 'language',
      title: "Arabic Literature (الأدب)",
      description: "Study classical Arabic literature and poetry",
      status: 'not-started',
      deadline: "2028-12-31",
      milestones: [
        // Year 1
        { text: "Memorize Lamiyyat Ibn Al-Wardi (لامية ابن الوردي)", completed: false },
        { text: "Study Al-Muntakhab Part 1 (المنتخب من أدب العرب ١)", completed: false },
        // Year 2
        { text: "Master selected poetry collections", completed: false },
        { text: "Study Arabic prose selections", completed: false },
        // Year 3
        { text: "Memorize pre-Islamic poems", completed: false },
        { text: "Study classical Arabic prose", completed: false },
        // Year 4
        { text: "Master literary analysis", completed: false },
        { text: "Complete comprehensive literature review", completed: false }
      ]
    },
    {
      id: 15,
      category: 'language',
      title: "Additional Sciences (العلوم المساعدة)",
      description: "Master supplementary Arabic sciences",
      status: 'not-started',
      deadline: "2028-12-31",
      milestones: [
        // Logic (المنطق)
        { text: "Complete Isaghuji (إيساغوجي)", completed: false },
        { text: "Master principles of logic", completed: false },
        // Prosody (العروض)
        { text: "Master Arabic meter system", completed: false },
        { text: "Complete Al-Arud wal-Qawafi (العروض والقوافي)", completed: false },
        // Semantics (الدلالة)
        { text: "Study Al-Ma'na Al-Lughawi (المعنى اللغوي)", completed: false },
        { text: "Master semantic analysis", completed: false },
        // General
        { text: "Complete integrated studies", completed: false },
        { text: "Master cross-disciplinary applications", completed: false }
      ]
    }
    
  ];
  

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="h-6 w-6 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-6 w-6 text-blue-500" />;
      case 'failed':
        return <XCircle className="h-6 w-6 text-red-500" />;
      case 'on-hold':
        return <Pause className="h-6 w-6 text-yellow-500" />;
      default:
        return <ArrowUpCircle className="h-6 w-6 text-gray-500" />;
    }
  };

  const getSortValue = (goal) => {
    switch (sortBy) {
      case 'deadline':
        return goal.deadline;
      case 'progress':
        return calculateProgress(goal.milestones);
      case 'status':
        return goal.status;
      case 'title':
        return goal.title;
      default:
        return goal.deadline;
    }
  };

  const sortedAndFilteredGoals = goals
    .filter(goal => activeCategory === 'all' || goal.category === activeCategory)
    .sort((a, b) => {
      const aValue = getSortValue(a);
      const bValue = getSortValue(b);
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-arabic">My Goals</h1>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl md:text-3xl font-arabic mb-2">استعن بالله ولا تعجز</p>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {goalCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-full transition-all
                ${activeCategory === category.id 
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                  : 'bg-muted hover:bg-muted/80'}
              `}
            >
              <category.icon className="h-5 w-5" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Sorting Controls */}
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-muted px-4 py-2 rounded-lg text-sm"
            >
              <option value="deadline">Deadline</option>
              <option value="progress">Progress</option>
              <option value="status">Status</option>
              <option value="title">Title</option>
            </select>
            <button
              onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
              className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg text-sm hover:bg-muted/80 transition-colors"
            >
              {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
            </button>
          </div>
          <div className="text-sm text-muted-foreground">
            Showing {sortedAndFilteredGoals.length} goals
          </div>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAndFilteredGoals.map(goal => (
            <div
              key={goal.id}
              className="bg-card rounded-xl border p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{goal.title}</h3>
                  <p className="text-muted-foreground text-sm">{goal.description}</p>
                </div>
                {getStatusIcon(goal.status)}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-2 mb-4">
                <div
                  className="bg-primary rounded-full h-2 transition-all duration-500"
                  style={{ width: `${calculateProgress(goal.milestones)}%` }}
                />
              </div>

              {/* Milestones */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm mb-3">Primary Path</h4>
                {goal.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center
                      ${milestone.completed ? 'bg-primary border-primary' : 'border-muted-foreground'}`}>
                      {milestone.completed && (
                        <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                      )}
                    </div>
                    <span className={`text-sm ${milestone.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {milestone.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Backup Plans */}
              {goal.backupPlans && goal.backupPlans.length > 0 && (
                <div className="mt-4 pt-4 border-t border-dashed">
                  <button
                    onClick={() => toggleBackup(goal.id)}
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowUpCircle className={`h-4 w-4 transition-transform duration-300 
                      ${expandedBackups.has(goal.id) ? 'rotate-180' : ''}`} />
                    Backup Plans
                  </button>
                  
                  {expandedBackups.has(goal.id) && goal.backupPlans.map((plan, planIndex) => (
                    <div key={planIndex} className="mt-4 pl-4 border-l-2 border-primary/20">
                      <h4 className="font-medium text-sm mb-2">{plan.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>
                      <div className="space-y-2">
                        {plan.milestones.map((milestone, mIndex) => (
                          <div key={mIndex} className="flex items-center gap-2">
                            <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center
                              ${milestone.completed ? 'bg-primary/70 border-primary/70' : 'border-muted-foreground/70'}`}>
                              {milestone.completed && (
                                <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                              )}
                            </div>
                            <span className={`text-sm ${milestone.completed ? 'line-through text-muted-foreground' : ''}`}>
                              {milestone.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Deadline */}
              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Deadline</span>
                <span className="text-sm font-medium">{goal.deadline}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Inspiration Quote */}
        <div className="text-center mt-20">
          <blockquote className="text-2xl font-serif italic mb-6">
            "لن أبرح حتى أبلغ"
          </blockquote>
          <p className="text-muted-foreground">
            "I will not cease until I reach my goal"
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoalsPage;