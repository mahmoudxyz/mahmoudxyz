import React, { useState } from 'react';

// Constants for category colors and icons
const CATEGORIES = {
  foundations: { title: 'Mathematical Foundations', color: '#6366F1', icon: '📐' },
  probability: { title: 'Probability Foundation', color: '#10B981', icon: '🎲' },
  statistics: { title: 'Statistical Theory', color: '#F59E0B', icon: '📊' },
  modeling: { title: 'Statistical Modeling', color: '#EC4899', icon: '📈' },
  ml: { title: 'Machine Learning', color: '#3B82F6', icon: '🤖' }
};

// Main roadmap data structure
const roadmapData = [
  // MATHEMATICAL FOUNDATIONS
  {
    id: 1,
    title: 'Set Theory',
    category: 'foundations',
    duration: { best: 2, worst: 3 },
    difficulty: 2,
    prerequisites: [],
    relevance: 'Organizing biological entities, drug classification systems',
    concepts: ['Sets and subsets', 'Set operations (union, intersection)', 'Venn diagrams', 'Power sets'],
    breakdown: [
      'Day 1: Basic set definitions and operations',
      'Day 2: Advanced set operations and Venn diagrams',
      'Day 3 (if needed): Set theory applications in classifications'
    ],
    stumbling: [
      'Confusing union vs. intersection',
      'Understanding set complements in different universal sets'
    ],
    questions: [
      'If Set A contains antibiotics and Set B contains nephrotoxic drugs, what does A ∩ B represent?',
      'How would you represent drugs that are either antihypertensive OR antidiabetic but NOT both?'
    ],
    resources: [
      'Khan Academy\'s Set Theory Videos',
      'Chapter 1 of "Discrete Mathematics and Its Applications" by Rosen'
    ]
  },
  {
    id: 2,
    title: 'Counting Methods & Combinatorics',
    category: 'foundations',
    duration: { best: 3, worst: 5 },
    difficulty: 3,
    prerequisites: [1],
    relevance: 'DNA/RNA sequence combinations, drug combinations for polypharmacy',
    concepts: ['Fundamental counting principle', 'Permutations', 'Combinations', 'Multinomial coefficients'],
    breakdown: [
      'Day 1: Fundamental counting principle and factorial notation',
      'Day 2: Permutations (with and without repetition)',
      'Day 3: Combinations and binomial coefficients',
      'Day 4-5: Advanced counting (inclusion-exclusion, multinomials)'
    ],
    stumbling: [
      'Distinguishing when to use permutation vs. combination',
      'Handling problems with constraints or restrictions'
    ],
    questions: [
      'In how many ways can 5 drugs be administered in sequence to a patient?',
      'How many different 3-drug combinations can be selected from a formulary of 10 drugs?'
    ],
    resources: [
      'Brilliant.org Combinatorics course',
      '"A Path to Combinatorics for Undergraduates" by Titu Andreescu'
    ]
  },
  
  // PROBABILITY FOUNDATION
  {
    id: 3,
    title: 'Probability Fundamentals',
    category: 'probability',
    duration: { best: 4, worst: 5 },
    difficulty: 3,
    prerequisites: [2],
    relevance: 'Drug efficacy probabilities, conditional probability of adverse reactions',
    concepts: ['Sample spaces and events', 'Axioms of probability', 'Conditional probability', 'Bayes\' theorem'],
    breakdown: [
      'Day 1: Sample spaces, events, and basic probability axioms',
      'Day 2: Addition rule and complementary events',
      'Day 3: Conditional probability and multiplication rule',
      'Day 4: Independence and Bayes\' theorem'
    ],
    stumbling: [
      'Confusing independent vs. mutually exclusive events',
      'Setting up the correct conditional probability',
      'Applying Bayes\' theorem correctly'
    ],
    questions: [
      'If a drug is 85% effective and causes side effects in 20% of patients, what\'s the probability a patient experiences both?',
      'Given a genetic test with 98% sensitivity and 95% specificity for a disease with 0.1% prevalence, calculate the probability that a positive test result is a true positive.'
    ],
    resources: [
      'Khan Academy\'s Probability section',
      'StatQuest videos on probability basics'
    ]
  },
  {
    id: 4,
    title: 'Random Variables',
    category: 'probability',
    duration: { best: 3, worst: 4 },
    difficulty: 3,
    prerequisites: [3],
    relevance: 'Drug concentration levels, time to adverse event, gene expression levels',
    concepts: ['Discrete vs. continuous RVs', 'PMFs', 'PDFs', 'CDFs', 'Transformations'],
    breakdown: [
      'Day 1: Concept of random variables and types',
      'Day 2: PMFs for discrete random variables',
      'Day 3: PDFs and CDFs for continuous random variables',
      'Day 4: Joint distributions and transformations'
    ],
    stumbling: [
      'Understanding that PDFs can exceed 1 (while probabilities cannot)',
      'Grasping that continuous RVs have zero probability at exact points'
    ],
    questions: [
      'A drug\'s plasma concentration follows a continuous distribution. Explain why the probability of measuring exactly 10.0 ng/mL is zero.',
      'If genetic variants occur randomly along a chromosome, is this better modeled as discrete or continuous?'
    ],
    resources: [
      '"OpenIntro Statistics" Chapter 3',
      'Harvard\'s Statistics 110 course videos (Prof. Blitzstein)'
    ]
  },
  {
    id: 5,
    title: 'Discrete Probability Distributions',
    category: 'probability',
    duration: { best: 4, worst: 6 },
    difficulty: 4,
    prerequisites: [4],
    relevance: 'Genetic mutations, drug response success/failure, number of patients until adverse reaction',
    concepts: ['Bernoulli', 'Binomial', 'Geometric', 'Poisson', 'Hypergeometric'],
    breakdown: [
      'Day 1: Bernoulli and binomial distributions',
      'Day 2: Working with binomial probabilities',
      'Day 3: Geometric and negative binomial distributions',
      'Day 4: Poisson distribution and applications',
      'Day 5-6: Hypergeometric distribution and advanced examples'
    ],
    stumbling: [
      'Confusing when to use Poisson vs. binomial',
      'Understanding independence requirements for binomial',
      'Recognizing sampling with/without replacement scenarios'
    ],
    questions: [
      'If a drug has a 30% chance of causing headache in each patient, what\'s the probability that exactly 4 out of 10 patients experience headache?',
      'Mutations in a gene occur at a rate of 3 per 1000 base pairs. What\'s the probability of finding at least one mutation in a 500 base pair region?'
    ],
    resources: [
      'StatQuest videos on probability distributions',
      '"Statistical Inference" by Casella & Berger (Chapter 3)'
    ]
  },
  
  // Additional topics follow the same structure...
  // I'll include just a few more to demonstrate the component capabilities
  
  {
    id: 6,
    title: 'Expected Values & Variance',
    category: 'probability',
    duration: { best: 3, worst: 4 },
    difficulty: 3,
    prerequisites: [5],
    relevance: 'Expected drug concentration, variance in patient response times',
    concepts: ['Expected value', 'Variance', 'Standard deviation', 'Covariance', 'Correlation'],
    breakdown: [
      'Day 1: Expected value definition and calculation',
      'Day 2: Variance, standard deviation, and their properties',
      'Day 3: Covariance and correlation'
    ],
    stumbling: [
      'Understanding that E[X^2] ≠ (E[X])^2',
      'Calculating variance using the shortcut formula'
    ],
    questions: [
      'If 70% of patients respond to a drug and each responder generates $1000 in revenue while each non-responder costs $200 in additional care, what\'s the expected value per patient?'
    ],
    resources: [
      'Khan Academy expected value videos',
      '"Statistical Inference" by Casella & Berger (Chapter 2)'
    ]
  },
  {
    id: 11,
    title: 'Hypothesis Testing',
    category: 'statistics',
    duration: { best: 4, worst: 5 },
    difficulty: 4,
    prerequisites: [9, 10],
    relevance: 'Testing drug efficacy against placebo, testing for differential gene expression',
    concepts: ['Null and alternative hypotheses', 'Type I and Type II errors', 'p-values', 'Power'],
    breakdown: [
      'Day 1: Setting up hypotheses and understanding errors',
      'Day 2: p-values and significance levels',
      'Day 3: Power calculations',
      'Day 4-5: Designing and interpreting tests'
    ],
    stumbling: [
      'Confusing null vs. alternative hypothesis direction',
      'Interpreting p-values correctly',
      'Understanding tradeoff between Type I and Type II errors'
    ],
    questions: [
      'In testing if a new drug is better than standard treatment, what is the null hypothesis?',
      'If a test has 80% power at effect size 0.5, what does this mean?'
    ],
    resources: [
      'StatQuest hypothesis testing series',
      'ASA\'s statement on p-values'
    ]
  },
  {
    id: 19,
    title: 'Dimensionality Reduction',
    category: 'ml',
    duration: { best: 4, worst: 5 },
    difficulty: 5,
    prerequisites: [15, 18],
    relevance: 'Reducing dimensionality in gene expression data, visualizing pharmacological data',
    concepts: ['PCA', 'SVD', 't-SNE', 'UMAP', 'Feature selection vs. extraction'],
    breakdown: [
      'Day 1-2: PCA - theory and application',
      'Day 3: t-SNE for visualization',
      'Day 4: UMAP introduction',
      'Day 5: Comparing methods and applications'
    ],
    stumbling: [
      'Interpreting principal components',
      'Tuning parameters for t-SNE',
      'Understanding limitations of each method'
    ],
    questions: [
      'When would you use t-SNE over PCA?',
      'How do you determine how many principal components to retain?'
    ],
    resources: [
      'StatQuest PCA and t-SNE videos',
      '"Elements of Statistical Learning" (Chapter 14)'
    ]
  }
];

// The full dataset would have all 21 topics
// Assuming the total study days for the complete roadmap is around 75-90 days (for all 21 topics)
const TOTAL_ROADMAP_DAYS = { best: 75, worst: 90 };

// Emergency plan data (revised to be truly emergency - 30 days total)
const emergencyPlan = [
  { week: '1', title: 'Mathematical & Probability Essentials', topics: [
    { title: 'Set theory basics', days: 1 },
    { title: 'Essential counting methods', days: 1 },
    { title: 'Fundamental probability concepts', days: 2 },
    { title: 'Key probability distributions', days: 2 }
  ]},
  { week: '2', title: 'Statistical Foundations', topics: [
    { title: 'Central Limit Theorem', days: 1 },
    { title: 'Confidence intervals', days: 1 },
    { title: 'Hypothesis testing framework', days: 2 },
    { title: 'Basic statistical tests', days: 2 }
  ]},
  { week: '3', title: 'Regression Essentials', topics: [
    { title: 'Simple linear regression', days: 2 },
    { title: 'Multiple regression basics', days: 2 },
    { title: 'Logistic regression', days: 2 }
  ]},
  { week: '4', title: 'Machine Learning Basics', topics: [
    { title: 'Cross-validation fundamentals', days: 1 },
    { title: 'PCA for dimensionality reduction', days: 2 },
    { title: 'Basic clustering techniques', days: 2 },
    { title: 'Introduction to classification', days: 2 }
  ]}
];

// Calculate emergency plan total days
const emergencyTotalDays = emergencyPlan.reduce(
  (sum, week) => sum + week.topics.reduce((s, topic) => s + topic.days, 0), 
  0
);

// The topic card component
const TopicCard = ({ topic, expanded, toggleExpand, getPrerequisiteTitles }) => {
  const category = CATEGORIES[topic.category];
  const mainColor = category.color;
  const lightColor = `${mainColor}22`;
  
  return (
    <div 
      className="mb-5 rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      style={{ borderColor: expanded ? mainColor : '#e5e7eb' }}
    >
      <div 
        className="flex items-center p-4 cursor-pointer" 
        onClick={toggleExpand}
        style={{ backgroundColor: expanded ? lightColor : 'white' }}
      >
        <div className="text-2xl mr-3">{category.icon}</div>
        <div className="flex-grow">
          <div className="flex items-baseline">
            <h3 className="text-lg font-bold mr-2">{topic.id}. {topic.title}</h3>
            <span className="text-sm text-gray-500">{category.title}</span>
          </div>
          <div className="flex items-center text-sm mt-1">
            <span className="bg-gray-100 rounded px-2 py-0.5 mr-2">{topic.duration.best}-{topic.duration.worst} days</span>
            <span className="flex items-center">
              <span className="mr-1">Difficulty:</span>
              {Array.from({ length: 5 }).map((_, i) => (
                <span 
                  key={i} 
                  className="h-2 w-2 rounded-full mx-0.5"
                  style={{ backgroundColor: i < topic.difficulty ? mainColor : '#e5e7eb' }}
                ></span>
              ))}
            </span>
          </div>
        </div>
        <div className="text-xl">{expanded ? '▼' : '▶'}</div>
      </div>
      
      {expanded && (
        <div className="p-4 bg-white border-t" style={{ borderColor: '#e5e7eb' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              {topic.prerequisites.length > 0 && (
                <div className="mb-3">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-1">Prerequisites</h4>
                  <div className="flex flex-wrap gap-1">
                    {getPrerequisiteTitles(topic.prerequisites).map((title, index) => (
                      <span key={index} className="bg-gray-100 rounded px-2 py-1 text-sm">{title}</span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mb-3">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-1">Core Concepts</h4>
                <ul className="list-disc pl-5">
                  {topic.concepts.map((concept, index) => (
                    <li key={index} className="text-sm mb-1">{concept}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-3">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-1">Daily Breakdown</h4>
                <ul className="list-none pl-0">
                  {topic.breakdown.map((day, index) => (
                    <li key={index} className="text-sm mb-1 pb-1 border-b border-gray-100">
                      {day}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <div className="mb-3">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-1">Bioinformatics Relevance</h4>
                <p className="text-sm">{topic.relevance}</p>
              </div>
              
              <div className="mb-3">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-1">Common Stumbling Points</h4>
                <ul className="list-disc pl-5">
                  {topic.stumbling.map((point, index) => (
                    <li key={index} className="text-sm mb-1">{point}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-3">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-1">Review Questions</h4>
                <ul className="list-decimal pl-5">
                  {topic.questions.map((question, index) => (
                    <li key={index} className="text-sm mb-1">{question}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-1">Recommended Resources</h4>
                <ul className="list-disc pl-5">
                  {topic.resources.map((resource, index) => (
                    <li key={index} className="text-sm mb-1">{resource}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Emergency plan component
const EmergencyPlanSection = () => {
  const [expandedWeek, setExpandedWeek] = useState(null);
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 pb-2 border-b">30-Day Emergency Plan</h2>
      <p className="mb-4 text-sm">If you're extremely pressed for time, this accelerated plan covers the minimum essentials:</p>
      
      {emergencyPlan.map((week, index) => (
        <div key={index} className="mb-3 border rounded-lg overflow-hidden">
          <div 
            className="flex justify-between items-center p-3 cursor-pointer bg-gray-50"
            onClick={() => setExpandedWeek(expandedWeek === index ? null : index)}
          >
            <h3 className="font-semibold">Week {week.week}: {week.title}</h3>
            <span>{expandedWeek === index ? '▼' : '▶'}</span>
          </div>
          
          {expandedWeek === index && (
            <div className="p-3 border-t">
              <div className="space-y-2">
                {week.topics.map((topic, tIndex) => (
                  <div key={tIndex} className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                    <span>{topic.title}</span>
                    <span className="font-medium">{topic.days} {topic.days === 1 ? 'day' : 'days'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
        <p className="font-medium">Important Notes About This Emergency Plan:</p>
        <ul className="list-disc ml-5 mt-2 space-y-1">
          <li>This is a highly accelerated plan requiring daily focused study (7 days/week)</li>
          <li>Covers only essential concepts (about 1/3 of the full roadmap)</li>
          <li>Best suited for someone who already has some statistical background</li>
          <li>Will give you enough foundation to start your program but you'll need to catch up on deeper concepts later</li>
        </ul>
      </div>
    </div>
  );
};

// Main timeline visualization component
const TimelineComparison = () => {
  return (
    <div className="mb-8 p-4 bg-white rounded-lg border shadow-sm">
      <h2 className="text-lg font-semibold mb-3">Timeline Comparison</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-2">Complete Roadmap: {TOTAL_ROADMAP_DAYS.best}-{TOTAL_ROADMAP_DAYS.worst} days</h3>
          <div className="text-sm text-gray-600 mb-2">With normal study pace (3-4 days/week)</div>
          
          <div className="w-full bg-gray-100 rounded-full h-6 mb-1 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-xs text-white" 
                 style={{ width: '100%' }}>
              ~4-5 months
            </div>
          </div>
          
          <div className="text-xs text-gray-500 mt-1">Takes longer but allows for breaks and deeper understanding</div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Emergency Plan: {emergencyTotalDays} days</h3>
          <div className="text-sm text-gray-600 mb-2">With intensive study pace (7 days/week)</div>
          
          <div className="w-full bg-gray-100 rounded-full h-6 mb-1 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center text-xs text-white"
                 style={{ width: `${(emergencyTotalDays / TOTAL_ROADMAP_DAYS.worst) * 100}%` }}>
              1 month
            </div>
          </div>
          
          <div className="text-xs text-gray-500 mt-1">Faster but requires consistent daily study and covers less depth</div>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-3 rounded border border-blue-100 text-sm">
          <div className="font-medium text-blue-800 mb-1">Complete Roadmap Approach</div>
          <ul className="text-gray-700 space-y-1 ml-4 list-disc">
            <li>Study 3-4 days per week</li>
            <li>Take weekends off</li>
            <li>Deeper understanding of concepts</li>
            <li>More time for practice and application</li>
          </ul>
        </div>
        
        <div className="bg-orange-50 p-3 rounded border border-orange-100 text-sm">
          <div className="font-medium text-orange-800 mb-1">Emergency Approach</div>
          <ul className="text-gray-700 space-y-1 ml-4 list-disc">
            <li>Study every day (including weekends)</li>
            <li>Focus only on core concepts</li>
            <li>Streamlined learning of essentials</li>
            <li>Minimal time for practice problems</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Main component
const RoadmapComponent = () => {
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Helper function to get prerequisite titles
  const getPrerequisiteTitles = (prereqIds) => {
    return prereqIds.map(id => {
      const topic = roadmapData.find(t => t.id === id);
      return topic ? `${topic.id}. ${topic.title}` : '';
    });
  };
  
  // Filter topics based on active tab and search term
  const filteredTopics = roadmapData.filter(topic => {
    const matchesCategory = activeTab === 'all' || topic.category === activeTab;
    const matchesSearch = searchTerm === '' || 
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.concepts.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });
  
  // Group topics by category
  const topicsByCategory = {};
  Object.keys(CATEGORIES).forEach(category => {
    topicsByCategory[category] = filteredTopics.filter(topic => topic.category === category);
  });
  
  // Calculate visible topics duration
  const visibleDuration = {
    best: filteredTopics.reduce((sum, topic) => sum + topic.duration.best, 0),
    worst: filteredTopics.reduce((sum, topic) => sum + topic.duration.worst, 0)
  };
  
  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Statistics & ML Roadmap for Bioinformatics</h1>
        <p className="text-gray-600">A comprehensive guide for pharmacy graduates transitioning to bioinformatics</p>
      </div>
      
      {/* Timeline Comparison Section */}
      <TimelineComparison />
      
      <div className="flex justify-between items-center mb-6">
        <div className="overflow-x-auto pb-2">
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTab === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={() => setActiveTab('all')}
            >
              All Topics
            </button>
            
            {Object.entries(CATEGORIES).map(([key, category]) => (
              <button
                key={key}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center`}
                style={{
                  backgroundColor: activeTab === key ? category.color : '#f3f4f6',
                  color: activeTab === key ? 'white' : 'black'
                }}
                onClick={() => setActiveTab(key)}
              >
                <span className="mr-1">{category.icon}</span>
                {category.title}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search topics, concepts..."
            className="w-full p-3 pl-10 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-3 top-3 text-gray-400">🔍</span>
          {searchTerm && (
            <button
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchTerm('')}
            >
              ✕
            </button>
          )}
        </div>
      </div>
      
      <div className="mb-6 p-4 bg-white rounded-lg border shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Visible Topics Duration</h2>
            <p className="text-sm text-gray-600">{filteredTopics.length} topics selected (from 21 total)</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold">{visibleDuration.best}-{visibleDuration.worst} study days</p>
            <p className="text-sm text-gray-600">~{Math.ceil(visibleDuration.worst/3)} weeks (studying 3 days/week)</p>
          </div>
        </div>
        
        <div className="mt-4 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-green-500" 
               style={{ width: `${(visibleDuration.worst/TOTAL_ROADMAP_DAYS.worst) * 100}%` }}></div>
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>{Math.round((visibleDuration.worst/TOTAL_ROADMAP_DAYS.worst) * 100)}% of complete roadmap</span>
        </div>
      </div>
      
      {activeTab === 'all' ? (
        // Show topics grouped by category
        Object.entries(CATEGORIES).map(([category, info]) => (
          topicsByCategory[category].length > 0 && (
            <div key={category} className="mb-8">
              <h2 
                className="text-xl font-bold mb-4 pb-2 border-b flex items-center"
                style={{ borderColor: info.color }}
              >
                <span className="mr-2">{info.icon}</span>
                {info.title}
              </h2>
              
              {topicsByCategory[category].map(topic => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  expanded={expandedTopic === topic.id}
                  toggleExpand={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
                  getPrerequisiteTitles={getPrerequisiteTitles}
                />
              ))}
            </div>
          )
        ))
      ) : (
        // Show just the selected category
        <div>
          {filteredTopics.map(topic => (
            <TopicCard
              key={topic.id}
              topic={topic}
              expanded={expandedTopic === topic.id}
              toggleExpand={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
              getPrerequisiteTitles={getPrerequisiteTitles}
            />
          ))}
        </div>
      )}
      
      {/* Emergency Plan Section */}
      <EmergencyPlanSection />
      
      {/* Flexible Study Schedule Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 pb-2 border-b">Flexible Study Schedule Options</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <h3 className="font-semibold mb-3">Light Schedule (7-8 months)</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="bg-green-100 rounded-full p-1 mr-2 text-green-800">✓</span>
                <div>
                  <strong>2 days per week</strong>
                  <p className="text-gray-600">Weekends only, 2-3 hours per day</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 rounded-full p-1 mr-2 text-green-800">✓</span>
                <div>
                  <strong>Ideal for:</strong>
                  <p className="text-gray-600">Working full-time, busy family schedule</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 rounded-full p-1 mr-2 text-green-800">✓</span>
                <div>
                  <strong>Progress pace:</strong>
                  <p className="text-gray-600">~2-3 topics per month</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <h3 className="font-semibold mb-3">Medium Schedule (4-5 months)</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="bg-blue-100 rounded-full p-1 mr-2 text-blue-800">✓</span>
                <div>
                  <strong>3-4 days per week</strong>
                  <p className="text-gray-600">Weekdays + one weekend day, 2 hours per day</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 rounded-full p-1 mr-2 text-blue-800">✓</span>
                <div>
                  <strong>Ideal for:</strong>
                  <p className="text-gray-600">Part-time work, summer break</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 rounded-full p-1 mr-2 text-blue-800">✓</span>
                <div>
                  <strong>Progress pace:</strong>
                  <p className="text-gray-600">~4-5 topics per month</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
          <h3 className="font-semibold mb-2">Planning Your Personalized Schedule</h3>
          <p className="text-sm mb-3">Follow these steps to create your custom study plan:</p>
          
          <ol className="text-sm space-y-2 ml-5 list-decimal">
            <li>Assess your available time per week realistically</li>
            <li>Multiply your weekly study days by 4 to get monthly capacity</li>
            <li>Divide the total roadmap days (75-90) by your monthly capacity</li>
            <li>The result is your approximate completion time in months</li>
            <li>Prioritize earlier topics (foundations and probability) to build a strong base</li>
          </ol>
          
          <div className="mt-3 text-sm text-indigo-800">
            Remember: Consistency is more important than intensity. Regular shorter sessions are better than occasional cramming.
          </div>
        </div>
      </div>
      
      {/* Pharmacy Background Advantage Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 pb-2 border-b">Leveraging Your Pharmacy Background</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-semibold mb-2">Transferable Knowledge</h3>
            <ul className="space-y-1 text-sm">
              <li className="flex items-baseline">
                <span className="font-medium mr-2">•</span>
                <span><strong>Pharmacokinetics</strong> → Statistical modeling of time-series data</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-medium mr-2">•</span>
                <span><strong>Dose-response relationships</strong> → Regression modeling</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-medium mr-2">•</span>
                <span><strong>Drug interactions</strong> → Interaction terms in statistical models</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-medium mr-2">•</span>
                <span><strong>Clinical trials</strong> → Experimental design and hypothesis testing</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="font-semibold mb-2">Application Ideas</h3>
            <ul className="space-y-1 text-sm">
              <li className="flex items-baseline">
                <span className="font-medium mr-2">•</span>
                <span>Use drug concentration data to practice regression techniques</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-medium mr-2">•</span>
                <span>Apply classification algorithms to predict drug responses</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-medium mr-2">•</span>
                <span>Use statistical tests to analyze clinical trial data</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-medium mr-2">•</span>
                <span>Practice multiple testing correction with GWAS data</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-500 mt-8">
        <p>Remember: Quality of understanding is more important than quantity of topics covered.</p>
        <p className="mt-1">Focus on building connections between concepts and applications in bioinformatics.</p>
      </div>
    </div>
  );
};

export default RoadmapComponent;