import React, { useState } from 'react';

// Constants for category colors and icons
const CATEGORIES = {
  basics: { title: 'Basics & Pronunciation', color: '#8B5CF6', icon: '🔤' },
  vocabulary: { title: 'Essential Vocabulary', color: '#EC4899', icon: '📝' },
  grammar: { title: 'Grammar Foundations', color: '#3B82F6', icon: '📏' },
  communication: { title: 'Communication Skills', color: '#10B981', icon: '💬' },
  culture: { title: 'Cultural Context', color: '#F59E0B', icon: '🇮🇹' }
};

// Main roadmap data structure
const roadmapData = [
  // BASICS & PRONUNCIATION
  {
    id: 1,
    title: 'Alphabet & Pronunciation',
    category: 'basics',
    duration: { best: 2, worst: 3 },
    difficulty: 1,
    prerequisites: [],
    relevance: 'Essential foundation for all Italian learning, relatively easy for English speakers',
    concepts: ['Italian alphabet', 'Vowel sounds', 'Consonant sounds', 'Stress patterns', 'Basic phonetics'],
    breakdown: [
      'Day 1: Alphabet, vowels and basic consonants',
      'Day 2: Challenging sounds (gli, gn, r, double consonants)',
      'Day 3 (if needed): Stress patterns and rhythm practice'
    ],
    stumbling: [
      'Rolling the "r" sound',
      'Pronouncing double consonants distinctly',
      'Distinguishing between open and closed vowels'
    ],
    questions: [
      'How do you pronounce "gli" in Italian?',
      'What\'s the difference in pronunciation between "caro" and "carro"?'
    ],
    resources: [
      'Duolingo Italian pronunciation lessons',
      'YouTube: "Italian pronunciation for beginners"',
      'Forvo.com for authentic pronunciation examples'
    ]
  },
  {
    id: 2,
    title: 'Greetings & Introductions',
    category: 'basics',
    duration: { best: 2, worst: 3 },
    difficulty: 1,
    prerequisites: [1],
    relevance: 'First conversational elements needed in any interaction',
    concepts: ['Formal vs. informal greetings', 'Basic introductions', 'Times of day greetings', 'Saying goodbye', 'Polite expressions'],
    breakdown: [
      'Day 1: Basic greetings (ciao, buongiorno, etc.) and introductions',
      'Day 2: Formal vs. informal usage and polite expressions',
      'Day 3 (if needed): Practice with simulated conversations'
    ],
    stumbling: [
      'Choosing between formal and informal address',
      'Time-of-day appropriate greetings',
      'Natural rhythm of greeting exchanges'
    ],
    questions: [
      'How would you introduce yourself formally in Italian?',
      'When would you use "Buonasera" versus "Buonanotte"?'
    ],
    resources: [
      'ItalianPod101 - Greetings dialogues',
      'Language Transfer - First Italian lessons',
      'Practice with language exchange apps like Tandem'
    ]
  },
  
  // VOCABULARY
  {
    id: 3,
    title: 'Numbers & Time',
    category: 'vocabulary',
    duration: { best: 3, worst: 4 },
    difficulty: 2,
    prerequisites: [1],
    relevance: 'Essential for everyday interactions, shopping, schedules',
    concepts: ['Numbers 0-100', 'Asking and telling time', 'Days of the week', 'Months and seasons', 'Basic math terms'],
    breakdown: [
      'Day 1: Numbers 0-20 and basic counting',
      'Day 2: Numbers 20-100, days of the week',
      'Day 3: Telling time and asking for the time',
      'Day 4 (if needed): Months, seasons, dates'
    ],
    stumbling: [
      'Numbers 17-19 (diciassette, diciotto, diciannove)',
      '24-hour clock system used in Italy',
      'Gender of days and months'
    ],
    questions: [
      'How do you say "It\'s 3:45 PM" in Italian?',
      'What are the seasons in Italian and when do they occur in Italy?'
    ],
    resources: [
      'Memrise - Italian numbers course',
      'YouTube: "Learn Italian Numbers 1-100"',
      'Quizlet flashcards for days and months'
    ]
  },
  {
    id: 4,
    title: 'Personal Information',
    category: 'vocabulary',
    duration: { best: 2, worst: 3 },
    difficulty: 2,
    prerequisites: [2, 3],
    relevance: 'Necessary for introductions, forms, and personal conversations',
    concepts: ['Nationalities', 'Professions', 'Family members', 'Basic personal adjectives', 'Countries and languages'],
    breakdown: [
      'Day 1: Nationalities, countries, languages',
      'Day 2: Professions and family members',
      'Day 3 (if needed): Personal descriptions and characteristics'
    ],
    stumbling: [
      'Gender agreement with nationalities',
      'Formal ways to ask personal information',
      'Pronunciation of country names'
    ],
    questions: [
      'How would you say you are an American pharmacist in Italian?',
      'How would you ask someone where they are from politely?'
    ],
    resources: [
      'Coffee Break Italian - Episodes 1-5',
      'Babbel - Personal Information lesson set',
      'Anki deck: "Italian Nationalities and Professions"'
    ]
  },
  {
    id: 5,
    title: 'Food & Dining',
    category: 'vocabulary',
    duration: { best: 3, worst: 5 },
    difficulty: 2,
    prerequisites: [3],
    relevance: 'Critical for travel, daily life, and engaging with Italian culture',
    concepts: ['Common food items', 'Restaurant vocabulary', 'Ordering phrases', 'Mealtime expressions', 'Typical Italian dishes'],
    breakdown: [
      'Day 1: Basic food vocabulary and meal names',
      'Day 2: Restaurant phrases and ordering',
      'Day 3: Typical Italian dishes and ingredients',
      'Day 4-5: Practice dialogues and food preferences'
    ],
    stumbling: [
      'Distinguishing similar food terms',
      'Restaurant etiquette phrases',
      'Regional food terminology'
    ],
    questions: [
      'How would you order a table for two people in Italian?',
      'What\'s the difference between "primo piatto" and "secondo piatto"?'
    ],
    resources: [
      'YouTube: "Italian Food Vocabulary"',
      'Eataly.com glossary of Italian food terms',
      'Menu reader apps for practice'
    ]
  },
  {
    id: 6,
    title: 'Daily Activities & Routines',
    category: 'vocabulary',
    duration: { best: 3, worst: 4 },
    difficulty: 2,
    prerequisites: [3, 4],
    relevance: 'Foundation for describing everyday life and making small talk',
    concepts: ['Daily routine verbs', 'Time expressions', 'Basic adverbs of frequency', 'Household activities', 'Weekday vs. weekend routines'],
    breakdown: [
      'Day 1: Daily routine verbs and basic time expressions',
      'Day 2: Adverbs of frequency and time markers',
      'Day 3: Describing your typical day',
      'Day 4 (if needed): Household and leisure activities'
    ],
    stumbling: [
      'Reflexive verbs commonly used in routines',
      'Prepositions with time expressions',
      'Word order with adverbs'
    ],
    questions: [
      'How would you say "I wake up at 7 AM every day" in Italian?',
      'How would you describe your weekend routine?'
    ],
    resources: [
      'Duolingo - Daily Routines skill',
      'OneSkyApp Italian verb flashcards',
      'Podcast: "Learn Italian Daily Routines"'
    ]
  },
  {
    id: 7,
    title: 'Places & Directions',
    category: 'vocabulary',
    duration: { best: 3, worst: 4 },
    difficulty: 2,
    prerequisites: [3, 6],
    relevance: 'Essential for navigation, travel, and location descriptions',
    concepts: ['Common places in a city', 'Directional vocabulary', 'Transportation terms', 'Prepositions of place', 'Asking for/giving directions'],
    breakdown: [
      'Day 1: Common places and buildings vocabulary',
      'Day 2: Directional terms and prepositions of place',
      'Day 3: Asking for and giving directions',
      'Day 4 (if needed): Transportation vocabulary and dialogues'
    ],
    stumbling: [
      'Choosing correct prepositions for places',
      'Imperative forms used in directions',
      'Understanding rapid direction instructions'
    ],
    questions: [
      'How would you ask where the nearest pharmacy is in Italian?',
      'How would you tell someone to turn right at the traffic light?'
    ],
    resources: [
      'Google Maps in Italian for practice',
      'ItalianPod101 - "Asking for Directions" lesson',
      'Language transfer - Navigation episodes'
    ]
  },
  {
    id: 8,
    title: 'Shopping & Services',
    category: 'vocabulary',
    duration: { best: 3, worst: 4 },
    difficulty: 2,
    prerequisites: [3, 5],
    relevance: 'Practical vocabulary for daily transactions and errands',
    concepts: ['Store types', 'Shopping phrases', 'Clothing items', 'Colors and sizes', 'Currency and payment terms'],
    breakdown: [
      'Day 1: Types of shops and basic shopping phrases',
      'Day 2: Clothing vocabulary, colors, and sizes',
      'Day 3: Currency, numbers, and payment expressions',
      'Day 4 (if needed): Role-play practice for shopping scenarios'
    ],
    stumbling: [
      'Gender of clothing items',
      'Size conversion between systems',
      'Formal register in service interactions'
    ],
    questions: [
      'How would you ask if a shirt is available in your size?',
      'How would you ask for the bill in a store?'
    ],
    resources: [
      'Busuu - Shopping dialogue lessons',
      'Anki deck: "Italian Shopping Vocabulary"',
      'YouTube: "Italian clothing vocabulary"'
    ]
  },
  
  // GRAMMAR FOUNDATIONS
  {
    id: 9,
    title: 'Articles & Gender',
    category: 'grammar',
    duration: { best: 2, worst: 4 },
    difficulty: 3,
    prerequisites: [1],
    relevance: 'Fundamental grammar concept that affects most Italian sentences',
    concepts: ['Definite articles (il, la, i, le, etc.)', 'Indefinite articles (un, una, etc.)', 'Noun gender rules', 'Gender-article agreement', 'Exceptions'],
    breakdown: [
      'Day 1: Concept of gender and basic rules',
      'Day 2: Definite and indefinite articles',
      'Day 3: Practice with article-noun agreement',
      'Day 4 (if needed): Exceptions and irregular patterns'
    ],
    stumbling: [
      'Memorizing gender of nouns without obvious patterns',
      'Articles before words starting with vowels',
      'Articles with foreign words'
    ],
    questions: [
      'What are the rules for choosing between "il" and "lo"?',
      'How do you determine the gender of nouns ending in -e?'
    ],
    resources: [
      'Italian-grammar.com articles section',
      'Practice exercises from "Ultimate Italian Beginner-Intermediate"',
      'Quizlet: "Italian noun genders"'
    ]
  },
  {
    id: 10,
    title: 'Subject Pronouns & Basic Verbs',
    category: 'grammar',
    duration: { best: 3, worst: 5 },
    difficulty: 3,
    prerequisites: [2, 9],
    relevance: 'Foundational for creating basic sentences and expressing actions',
    concepts: ['Subject pronouns (io, tu, lui, etc.)', 'Present tense: -are verbs', 'Present tense: -ere verbs', 'Present tense: -ire verbs', 'Common verb usage'],
    breakdown: [
      'Day 1: Subject pronouns and their usage',
      'Day 2: Present tense of -are verbs',
      'Day 3: Present tense of -ere and -ire verbs',
      'Day 4-5: Practice with common verbs and sentence construction'
    ],
    stumbling: [
      'Irregular verbs in present tense',
      'Remembering when to use or omit subject pronouns',
      'Stress patterns in conjugated verbs'
    ],
    questions: [
      'How do you conjugate the verb "parlare" in the present tense?',
      'When would you use "Lei" versus "tu" in a conversation?'
    ],
    resources: [
      'Conjuguemos.com for verb practice',
      'Language Transfer - Present tense episodes',
      'Verbly app for Italian verb conjugations'
    ]
  },
  {
    id: 11,
    title: 'Essere & Avere',
    category: 'grammar',
    duration: { best: 2, worst: 3 },
    difficulty: 3,
    prerequisites: [10],
    relevance: 'Two most important verbs in Italian, used in countless expressions',
    concepts: ['Conjugation of essere (to be)', 'Conjugation of avere (to have)', 'Common expressions with essere', 'Common expressions with avere', 'C\'è / Ci sono constructions'],
    breakdown: [
      'Day 1: Conjugations and basic usage of essere and avere',
      'Day 2: Common expressions and idioms with these verbs',
      'Day 3 (if needed): C\'è / Ci sono and complex usages'
    ],
    stumbling: [
      'Choosing between essere and avere for certain expressions',
      'Essere for location vs. stare for conditions',
      'Irregular conjugation patterns'
    ],
    questions: [
      'When do you use "essere" versus "stare" for descriptions?',
      'How would you express "I am cold" and "I am 30 years old" in Italian?'
    ],
    resources: [
      'ItalianPod101 - Essere vs Avere lesson',
      'Practice exercises from "Complete Italian Grammar"',
      'Quizlet: "Italian Essere and Avere expressions"'
    ]
  },
  {
    id: 12,
    title: 'Adjectives & Agreement',
    category: 'grammar',
    duration: { best: 2, worst: 4 },
    difficulty: 3,
    prerequisites: [9, 10],
    relevance: 'Essential for descriptions and adding detail to communication',
    concepts: ['Adjective endings and agreement', 'Position of adjectives', 'Descriptive vs. limiting adjectives', 'Common adjective pairs', 'Comparative forms'],
    breakdown: [
      'Day 1: Adjective agreement rules and common descriptive adjectives',
      'Day 2: Adjective position and exceptions',
      'Day 3: Basic comparatives and superlatives',
      'Day 4 (if needed): Special cases and practice'
    ],
    stumbling: [
      'Adjectives with irregular forms',
      'When adjectives change meaning based on position',
      'Agreement with multiple nouns'
    ],
    questions: [
      'How would you say "the beautiful Italian cities" in Italian?',
      'What\'s the difference between "un uomo grande" and "un grande uomo"?'
    ],
    resources: [
      'ThoughtCo Italian adjectives guide',
      'Clozemaster for adjective practice',
      'Anki deck: "Most frequent Italian adjectives"'
    ]
  },
  {
    id: 13,
    title: 'Basic Questions & Negation',
    category: 'grammar',
    duration: { best: 2, worst: 3 },
    difficulty: 2,
    prerequisites: [10],
    relevance: 'Critical for conversations and information gathering',
    concepts: ['Question words (chi, cosa, dove, etc.)', 'Forming yes/no questions', 'Negative constructions', 'Question intonation', 'Common question patterns'],
    breakdown: [
      'Day 1: Question words and basic question formation',
      'Day 2: Negation and negative expressions',
      'Day 3 (if needed): Complex questions and practice dialogues'
    ],
    stumbling: [
      'Word order in questions',
      'Intonation patterns in spoken questions',
      'Double negatives in Italian'
    ],
    questions: [
      'How would you ask "Where is the train station?" in Italian?',
      'How do you form a negative command in Italian?'
    ],
    resources: [
      'Coffee Break Italian - Questions episodes',
      'ItalianPod101 - Question formation lessons',
      'Quizlet: "Italian Question Words"'
    ]
  },
  {
    id: 14,
    title: 'Prepositions & Contractions',
    category: 'grammar',
    duration: { best: 3, worst: 5 },
    difficulty: 4,
    prerequisites: [9, 11],
    relevance: 'Critical for expressing relationships between words',
    concepts: ['Simple prepositions (a, di, da, in, con, su, per, tra/fra)', 'Articulated prepositions (al, della, etc.)', 'Prepositions with places', 'Prepositions with time', 'Common prepositional phrases'],
    breakdown: [
      'Day 1: Basic prepositions and their meanings',
      'Day 2: Preposition-article contractions',
      'Day 3: Prepositions with places and movement',
      'Day 4-5: Common expressions and difficult cases'
    ],
    stumbling: [
      'Choosing the correct preposition in fixed expressions',
      'Remembering all articulated preposition forms',
      'Prepositions that differ from English equivalents'
    ],
    questions: [
      'How would you say "I\'m going to the cinema" in Italian?',
      'What\'s the difference between "a" and "in" with cities and countries?'
    ],
    resources: [
      'Italian-grammar.com prepositions guide',
      'Memrise: "Italian Prepositions"',
      'Practice with "501 Italian Verbs" preposition section'
    ]
  },
  {
    id: 15,
    title: 'Present Tense Irregular Verbs',
    category: 'grammar',
    duration: { best: 3, worst: 5 },
    difficulty: 4,
    prerequisites: [10, 11],
    relevance: 'Many common verbs have irregular forms needed for basic conversation',
    concepts: ['Common irregular -are verbs', 'Common irregular -ere verbs', 'Common irregular -ire verbs', 'Pattern recognition', 'Usage in context'],
    breakdown: [
      'Day 1: High-frequency irregular verbs (andare, fare, dire, etc.)',
      'Day 2: -isc verbs and other pattern-based irregulars',
      'Day 3: Practice with mixed regular and irregular verbs',
      'Day 4-5: Conversations and writing using irregular verbs'
    ],
    stumbling: [
      'Remembering which verbs are irregular',
      'Conflating similar irregular patterns',
      'Stress patterns in irregular conjugations'
    ],
    questions: [
      'How do you conjugate "andare" in the present tense?',
      'What\'s the pattern for -isc verbs like "finire"?'
    ],
    resources: [
      'The Conjugator app for practice',
      'Reverso Conjugation online tool',
      'Flashcards: "Top 20 Italian irregular verbs"'
    ]
  },
  
  // COMMUNICATION SKILLS
  {
    id: 16,
    title: 'Simple Conversations',
    category: 'communication',
    duration: { best: 3, worst: 4 },
    difficulty: 3,
    prerequisites: [2, 4, 10],
    relevance: 'Putting vocabulary and grammar together into practical exchanges',
    concepts: ['Conversation starters', 'Turn-taking phrases', 'Active listening responses', 'Clarification requests', 'Ending conversations politely'],
    breakdown: [
      'Day 1: Starting conversations and introductions practice',
      'Day 2: Basic conversation flow and maintenance',
      'Day 3: Role play various simple conversation scenarios',
      'Day 4 (if needed): Problem-solving in conversations'
    ],
    stumbling: [
      'Natural-sounding transitions between topics',
      'Keeping up with native speaker pace',
      'Remembering vocabulary during real-time conversation'
    ],
    questions: [
      'How would you politely interrupt someone in Italian?',
      'What are some common phrases to show you\'re listening?'
    ],
    resources: [
      'HelloTalk language exchange app',
      'ItalianPod101 - Conversation practice dialogues',
      'iTalki tutor sessions for guided practice'
    ]
  },
  {
    id: 17,
    title: 'Phone Conversations',
    category: 'communication',
    duration: { best: 2, worst: 3 },
    difficulty: 4,
    prerequisites: [10, 13, 16],
    relevance: 'Special vocabulary and phrases needed for non-visual communication',
    concepts: ['Phone greetings', 'Identifying yourself', 'Asking for someone', 'Leaving messages', 'Ending phone calls'],
    breakdown: [
      'Day 1: Phone-specific vocabulary and expressions',
      'Day 2: Practice phone conversations and scenarios',
      'Day 3 (if needed): Handling problems and misunderstandings by phone'
    ],
    stumbling: [
      'Understanding without visual cues',
      'Speaking clearly without body language',
      'Phone-specific vocabulary and expressions'
    ],
    questions: [
      'How do Italians typically answer the phone?',
      'How would you ask to speak with someone who isn\'t available?'
    ],
    resources: [
      'Coffee Break Italian - Phone conversation episode',
      'YouTube: "Italian Phone Conversations"',
      'Role-play practice with language partners'
    ]
  },
  {
    id: 18,
    title: 'Expressing Likes & Preferences',
    category: 'communication',
    duration: { best: 2, worst: 3 },
    difficulty: 3,
    prerequisites: [10, 12],
    relevance: 'Essential for personal conversations and expressing personality',
    concepts: ['Mi piace / Mi piacciono structures', 'Expressing preferences', 'Talking about hobbies', 'Agreement and disagreement', 'Intensity adverbs'],
    breakdown: [
      'Day 1: Mi piace/piacciono structure and basic preferences',
      'Day 2: Expressing degrees of preference and dislikes',
      'Day 3 (if needed): Discussion practice about personal preferences'
    ],
    stumbling: [
      'Singular vs. plural with "piacere"',
      'Indirect object pronouns with preferences',
      'Expressing nuanced preferences'
    ],
    questions: [
      'How would you say "I really like Italian cinema" in Italian?',
      'What\'s the difference between "Mi piace il gelato" and "Mi piacciono i gelati"?'
    ],
    resources: [
      'ThoughtCo guide to using "piacere"',
      'Duolingo Stories with preference expressions',
      'Anki deck: "Italian preference expressions"'
    ]
  },
  {
    id: 19,
    title: 'Basic Reading Skills',
    category: 'communication',
    duration: { best: 3, worst: 4 },
    difficulty: 3,
    prerequisites: [9, 10, 12],
    relevance: 'Building comprehension skills and vocabulary through written Italian',
    concepts: ['Reading strategies', 'Cognates recognition', 'Context clues', 'Simplified texts', 'Signs and public notices'],
    breakdown: [
      'Day 1: Reading strategies and cognate recognition',
      'Day 2: Practice with simplified texts and graded readers',
      'Day 3: Practical reading (menus, schedules, signs)',
      'Day 4 (if needed): Building reading speed and comprehension'
    ],
    stumbling: [
      'False friends (words that look familiar but mean something different)',
      'Idiomatic expressions in written form',
      'Regional vocabulary variations'
    ],
    questions: [
      'What strategies help when encountering unknown words?',
      'How can you use cognates to improve reading comprehension?'
    ],
    resources: [
      'Graded readers like "Italian Short Stories for Beginners"',
      'News in Slow Italian website/podcast',
      'LingQ app for assisted reading practice'
    ]
  },
  {
    id: 20,
    title: 'Writing Simple Texts',
    category: 'communication',
    duration: { best: 3, worst: 4 },
    difficulty: 3,
    prerequisites: [9, 10, 12, 14],
    relevance: 'Consolidating grammar and vocabulary through production',
    concepts: ['Short messages', 'Simple emails', 'Forms and personal information', 'Basic descriptions', 'Text organization'],
    breakdown: [
      'Day 1: Structure of simple messages and greetings',
      'Day 2: Writing personal information and descriptions',
      'Day 3: Simple emails and notes',
      'Day 4 (if needed): Correction practice and improving clarity'
    ],
    stumbling: [
      'Proper capitalization rules in Italian',
      'Punctuation differences',
      'Formal vs. informal written register'
    ],
    questions: [
      'How would you write a simple email to ask about apartment availability?',
      'What are the standard greeting and closing formats for informal messages?'
    ],
    resources: [
      'Journal writing with Lang-8 for corrections',
      'WriteItalian.com templates',
      'HelloTalk written exchanges'
    ]
  },
  
  // CULTURAL CONTEXT
  {
    id: 21,
    title: 'Italian Gestures & Body Language',
    category: 'culture',
    duration: { best: 1, worst: 2 },
    difficulty: 1,
    prerequisites: [],
    relevance: 'Essential aspect of Italian communication often overlooked in formal study',
    concepts: ['Common Italian gestures', 'Appropriate vs. inappropriate gestures', 'Regional variations', 'Personal space norms', 'Non-verbal communication'],
    breakdown: [
      'Day 1: Common gestures and their meanings',
      'Day 2 (if needed): Practice and cultural context of gestures'
    ],
    stumbling: [
      'Gestures with multiple meanings',
      'Gestures that could be offensive in certain contexts',
      'Appropriate timing of gesture use'
    ],
    questions: [
      'What does the "che vuoi" gesture look like and mean?',
      'How do Italians typically greet each other physically?'
    ],
    resources: [
      'YouTube: "Essential Italian Hand Gestures"',
      'Gestuno Italian gesture dictionary app',
      'The book "Speak Italian: The Fine Art of Gesture"'
    ]
  }
];

// The full dataset would have all 21 topics
// Estimated total study days for the complete roadmap
const TOTAL_ROADMAP_DAYS = { best: 50, worst: 75 };

// Emergency plan data (30 days total)
const emergencyPlan = [
  { week: '1', title: 'Absolute Essentials', topics: [
    { title: 'Pronunciation basics', days: 1 },
    { title: 'Greetings and introductions', days: 1 },
    { title: 'Numbers and basic time expressions', days: 2 },
    { title: 'Essential food vocabulary', days: 1 },
    { title: 'Basic subject pronouns and present tense', days: 2 }
  ]},
  { week: '2', title: 'Core Communication', topics: [
    { title: 'Essential essere and avere', days: 2 },
    { title: 'Basic question formation', days: 1 },
    { title: 'Simple daily activities', days: 2 },
    { title: 'Directions and places', days: 2 }
  ]},
  { week: '3', title: 'Practical Interactions', topics: [
    { title: 'Shopping basics', days: 2 },
    { title: 'Restaurant and ordering phrases', days: 2 },
    { title: 'Simple conversation practice', days: 2 },
    { title: 'Expressing basic preferences', days: 1 }
  ]},
  { week: '4', title: 'Grammar Consolidation', topics: [
    { title: 'Articles and essential noun gender', days: 2 },
    { title: 'Critical prepositions', days: 2 },
    { title: 'Top 10 irregular verbs', days: 2 },
    { title: 'Cultural basics and gestures', days: 1 }
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
                <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-1">Practical Relevance</h4>
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
      <p className="mb-4 text-sm">If you need basic Italian quickly (e.g., for an upcoming trip), this accelerated plan covers survival essentials:</p>
      
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
          <li>This is a survival Italian crash course requiring daily focused practice</li>
          <li>Aims for basic functional communication rather than grammatical perfection</li>
          <li>Focuses on tourist and everyday scenarios</li>
          <li>Will give you enough to get by in simple situations (ordering food, asking directions, etc.)</li>
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
              ~3-5 months
            </div>
          </div>
          
          <div className="text-xs text-gray-500 mt-1">Takes longer but builds a solid A1 foundation</div>
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
          
          <div className="text-xs text-gray-500 mt-1">Faster but focuses only on survival Italian</div>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-3 rounded border border-blue-100 text-sm">
          <div className="font-medium text-blue-800 mb-1">Complete Roadmap Approach</div>
          <ul className="text-gray-700 space-y-1 ml-4 list-disc">
            <li>Study 3-4 days per week</li>
            <li>Develop proper pronunciation</li>
            <li>Learn grammar systematically</li>
            <li>Build up vocabulary in multiple domains</li>
          </ul>
        </div>
        
        <div className="bg-orange-50 p-3 rounded border border-orange-100 text-sm">
          <div className="font-medium text-orange-800 mb-1">Emergency Approach</div>
          <ul className="text-gray-700 space-y-1 ml-4 list-disc">
            <li>Study every day (including weekends)</li>
            <li>Focus on high-frequency phrases</li>
            <li>Learn just enough grammar to get by</li>
            <li>Prioritize tourist and everyday situations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Practice approach comparison
const PracticeApproachSection = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 pb-2 border-b">Effective Practice Approaches</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="text-xl mb-2 text-center">🎧</div>
          <h3 className="font-semibold text-center mb-2">Audio-First Method</h3>
          <p className="text-sm text-gray-600 mb-3">Focus on listening and speaking before reading and writing</p>
          <ul className="text-sm space-y-2">
            <li className="flex items-start">
              <span className="bg-green-100 rounded-full p-1 mr-2 text-green-800">✓</span>
              <div>
                Start with podcast-style lessons (Coffee Break Italian, ItalianPod101)
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 rounded-full p-1 mr-2 text-green-800">✓</span>
              <div>
                Practice shadowing (repeating immediately after native audio)
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 rounded-full p-1 mr-2 text-green-800">✓</span>
              <div>
                Record yourself speaking and compare to native audio
              </div>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="text-xl mb-2 text-center">🔄</div>
          <h3 className="font-semibold text-center mb-2">Spaced Repetition</h3>
          <p className="text-sm text-gray-600 mb-3">Scientifically-proven memory optimization technique</p>
          <ul className="text-sm space-y-2">
            <li className="flex items-start">
              <span className="bg-blue-100 rounded-full p-1 mr-2 text-blue-800">✓</span>
              <div>
                Use Anki or Memrise for vocabulary and phrase practice
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 rounded-full p-1 mr-2 text-blue-800">✓</span>
              <div>
                Review new material after 1 day, 3 days, 1 week, and 2 weeks
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 rounded-full p-1 mr-2 text-blue-800">✓</span>
              <div>
                Create cards with audio for pronunciation practice
              </div>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="text-xl mb-2 text-center">👥</div>
          <h3 className="font-semibold text-center mb-2">Social Learning</h3>
          <p className="text-sm text-gray-600 mb-3">Leverage interaction for faster progress</p>
          <ul className="text-sm space-y-2">
            <li className="flex items-start">
              <span className="bg-purple-100 rounded-full p-1 mr-2 text-purple-800">✓</span>
              <div>
                Find language exchange partners on apps like Tandem or HelloTalk
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-purple-100 rounded-full p-1 mr-2 text-purple-800">✓</span>
              <div>
                Schedule regular 30-minute practice sessions with partners
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-purple-100 rounded-full p-1 mr-2 text-purple-800">✓</span>
              <div>
                Join Italian conversation groups or online communities
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
        <h3 className="font-semibold mb-2">Daily Practice Structure (20-30 minutes)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
          <div className="bg-white p-3 rounded shadow-sm">
            <div className="font-medium mb-1 text-indigo-800">1. Warm-up (5 min)</div>
            <p>Review previous material with flashcards or quick exercises</p>
          </div>
          
          <div className="bg-white p-3 rounded shadow-sm">
            <div className="font-medium mb-1 text-indigo-800">2. New Content (10 min)</div>
            <p>Learn new vocabulary, grammar point, or phrase pattern</p>
          </div>
          
          <div className="bg-white p-3 rounded shadow-sm">
            <div className="font-medium mb-1 text-indigo-800">3. Practice (10 min)</div>
            <p>Apply new knowledge with exercises, writing, or speaking</p>
          </div>
          
          <div className="bg-white p-3 rounded shadow-sm">
            <div className="font-medium mb-1 text-indigo-800">4. Cooldown (5 min)</div>
            <p>Listen to authentic content or review what you learned</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component
const ItalianA1Roadmap = () => {
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
        <h1 className="text-3xl font-bold mb-2">Italian A1 Language Learning Roadmap</h1>
        <p className="text-gray-600">A comprehensive guide to reach basic Italian proficiency (CEFR A1 level)</p>
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
      
      {/* Practice Approach Section */}
      <PracticeApproachSection />
      
      {/* Flexible Study Schedule Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 pb-2 border-b">Flexible Study Schedule Options</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <h3 className="font-semibold mb-3">Light Schedule (5-6 months)</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="bg-green-100 rounded-full p-1 mr-2 text-green-800">✓</span>
                <div>
                  <strong>2-3 days per week</strong>
                  <p className="text-gray-600">20-30 minutes per session</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 rounded-full p-1 mr-2 text-green-800">✓</span>
                <div>
                  <strong>Ideal for:</strong>
                  <p className="text-gray-600">Busy professionals, parents, students with full course loads</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 rounded-full p-1 mr-2 text-green-800">✓</span>
                <div>
                  <strong>Supplementary immersion:</strong>
                  <p className="text-gray-600">Italian podcasts during commutes, subtitled shows on weekends</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <h3 className="font-semibold mb-3">Medium Schedule (3-4 months)</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="bg-blue-100 rounded-full p-1 mr-2 text-blue-800">✓</span>
                <div>
                  <strong>4-5 days per week</strong>
                  <p className="text-gray-600">30 minutes per day plus weekend practice</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 rounded-full p-1 mr-2 text-blue-800">✓</span>
                <div>
                  <strong>Ideal for:</strong>
                  <p className="text-gray-600">Summer learning, semester breaks, part-time workers</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 rounded-full p-1 mr-2 text-blue-800">✓</span>
                <div>
                  <strong>Supplementary immersion:</strong>
                  <p className="text-gray-600">Weekly language exchange, Italian music playlists, recipe attempts</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
          <h3 className="font-semibold mb-2">A1 Certification Goal Timeline</h3>
          <p className="text-sm mb-3">If you're aiming for an official A1 certification (like CILS or CELI A1):</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="font-medium text-center mb-2 text-indigo-800 border-b pb-1">Months 1-2</div>
              <ul className="space-y-1 pl-4 list-disc">
                <li>Master pronunciation basics</li>
                <li>Build core vocabulary (500+ words)</li>
                <li>Learn present tense of common verbs</li>
                <li>Practice basic introductions</li>
              </ul>
            </div>
            
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="font-medium text-center mb-2 text-indigo-800 border-b pb-1">Months 3-4</div>
              <ul className="space-y-1 pl-4 list-disc">
                <li>Expand vocabulary (1000+ words)</li>
                <li>Master articles and prepositions</li>
                <li>Practice simple conversations</li>
                <li>Begin basic reading and writing</li>
              </ul>
            </div>
            
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="font-medium text-center mb-2 text-indigo-800 border-b pb-1">Month 5</div>
              <ul className="space-y-1 pl-4 list-disc">
                <li>Review and consolidate grammar</li>
                <li>Practice with past exam papers</li>
                <li>Focus on weak areas</li>
                <li>Mock test preparation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-500 mt-8">
        <p>Remember: Consistency is more important than intensity in language learning.</p>
        <p className="mt-1">Even 15 minutes of daily practice is better than an occasional 3-hour session.</p>
      </div>
    </div>
  );
};

export default ItalianA1Roadmap;