import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

function LandingPage() {
  // State management
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [terminalContent, setTerminalContent] = useState([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('indigo'); // 'indigo', 'matrix', 'midnight', 'synthwave', 'coffee'
  const [directory, setDirectory] = useState('~');
  const [showFileSystem, setShowFileSystem] = useState(false);
  const [commandMode, setCommandMode] = useState('normal'); // 'normal', 'vim', 'emacs'
  const [visualizerActive, setVisualizerActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [terminalTime, setTerminalTime] = useState(new Date());
  const [notification, setNotification] = useState(null);
  const [gameActive, setGameActive] = useState(false);
  const [is3DActive, setIs3DActive] = useState(false);
  const [showCompletions, setShowCompletions] = useState(false);
  const [completions, setCompletions] = useState([]);
  const [selectedCompletion, setSelectedCompletion] = useState(0);
  const [terminalOpacity, setTerminalOpacity] = useState(1);
  const [textSize, setTextSize] = useState('md');
  
  // Refs
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const soundRef = useRef(null);
  
  // Current directory file structure
  const fileSystem = useMemo(() => ({
    '~': {
      type: 'directory',
      content: ['about.md', 'projects', 'skills', 'contact.txt', 'experience.json', 'blog.md', '.hidden', 'README.md']
    },
    '~/projects': {
      type: 'directory',
      content: ['hydra-fp.md', 'biotech-os.md', 'gene-analyzer.md', 'quantum-seq.js', 'terminal.jsx']
    },
    '~/skills': {
      type: 'directory',
      content: ['biology.json', 'technology.json', 'interdisciplinary.json', 'languages.txt', 'frameworks.json']
    },
    '~/.hidden': {
      type: 'directory',
      content: ['games.sh', 'matrix.js', 'easter-eggs.txt', 'jokes.json', 'aliens.md', 'cv-secret.pdf']
    },
    '~/blog': {
      type: 'directory',
      content: ['why-i-left-pharmacy.md', 'learning-to-code.md', 'bioinformatics-future.md']
    }
  }), []);
  
  // File content
  const fileContent = useMemo(() => ({
    '~/README.md': `# Terminal Portfolio v4.2.0\n\nWelcome to my unnecessarily-complicated-but-totally-worth-it interactive terminal portfolio. Was this overkill? Absolutely. Did I spend way too much time on it? Without question. Would a simple PDF resume have been more practical? Probably.\n\nBut where's the fun in that?\n\nUse 'help' to see available commands or start with 'about' to learn more. Special commands are hidden throughout. Try to find them all if you have nothing better to do with your time!`,
    
    '~/about.md': `# About Mahmoud\n\nPharmacist turned Software Engineer, combining molecular biology expertise with advanced programming skills to drive innovation in computational biology and bioinformatics.\n\nI abandoned the comfortable world of pharmacy to immerse myself in the chaotic, ever-changing realm of code. Why? Because debugging compiler errors at 3 AM is apparently more appealing than having a stable career. Who needs sleep when you have Stack Overflow?\n\nMy interdisciplinary approach bridges the gap between biological research and technological implementation, creating powerful tools for scientific advancement. Or, as my former pharmacy colleagues call it: "betraying medicine for machines."`,
    
    '~/contact.txt': `Email: your.email@example.com\nGitHub: github.com/mahmoudxyz\nLinkedIn: linkedin.com/in/mahmoud\n\nPreferred contact method: Carrier pigeon. Alternatively, email works too.`,
    
    '~/projects/hydra-fp.md': `# HydraFP Library\n\nA functional programming library for Java that simplifies writing pure, composable code. Because clearly what Java needed was more programming paradigms.\n\n## Features\n- Pure functional approach with effect system (think Haskell, but with more semicolons)\n- Algebraic data types (Option, Either, Try) - because NullPointerException wasn't cryptic enough\n- Immutable collections & pattern matching - for those who think variables shouldn't vary\n- Performance optimization features (that you'll probably never use)`,
    
    '~/.hidden/easter-eggs.txt': `Congratulations! You've found the secret file. Either you're naturally curious or you've spent way too much time on this website. Probably both.\n\nTry these hidden commands:\n- matrix\n- biotech\n- 42\n- coffee\n- tetris\n- konami\n- sudo\n- hack\n- molecule\n- snake\n- dance\n- quote\n- neofetch\n- rickroll\n\nPS: The password is "swordfish". What's it for? I don't know, but it's always "swordfish" in the movies.`,
    
    '~/.hidden/jokes.json': `{
  "jokes": [
    "Why do programmers prefer dark mode? Because light attracts bugs.",
    "A biologist, a chemist, and a statistician are out hunting. The biologist shoots at a deer and misses 5ft to the left. The chemist takes a shot and misses 5ft to the right. The statistician yells 'We got it!'",
    "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'",
    "I was going to tell a UDP joke, but you might not get it.",
    "Why don't scientists trust atoms? Because they make up everything.",
    "How many programmers does it take to change a light bulb? None, it's a hardware problem."
  ]
}`,

    '~/blog/why-i-left-pharmacy.md': `# Why I Left Pharmacy for Programming\n\nDate: 2023-07-15\n\nIt wasn't an easy decision to leave behind years of medical training to pursue software engineering. Pharmacy had stability, respect, and a clear career path. Programming had... well, endless debugging and Stack Overflow.\n\nBut I couldn't resist the allure of creating something from nothing but logic and imagination. In pharmacy, I was constrained by protocols and regulations. In programming, I could build entire worlds.\n\nPlus, the dress code is much more relaxed. Sweatpants don't go well with a white coat.`,
  
    '~/blog/learning-to-code.md': `# My Self-Taught Coding Journey\n\nDate: 2023-09-23\n\nTeaching yourself to code while coming from a science background is like trying to learn a foreign language by being dropped in the middle of a foreign country. Exciting, terrifying, and you make a lot of embarrassing mistakes.\n\nI started with Python because everyone said it was "beginner-friendly." That's like saying a tiger cub is pet-friendly. Sure, it seems approachable at first, but before you know it, you're neck-deep in list comprehensions and generator expressions wondering what happened to your life choices.\n\nNext came JavaScript, because apparently one language of chaos wasn't enough. I needed to experience the special joy of '0' == 0 returning true while '0' === 0 returns false.`,
  
    '~/blog/bioinformatics-future.md': `# The Future of Bioinformatics\n\nDate: 2024-01-10\n\nThe intersection of biology and computer science is creating unprecedented opportunities. With genomic sequencing costs plummeting faster than Moore's Law would predict, we're generating biological data at an astronomical rate.\n\nThe bottleneck isn't data generation anymore - it's analysis and interpretation. That's where computational approaches become essential.\n\nIn the near future, I predict we'll see AI models that can predict protein folding with accuracy that rivals experimental methods, design novel enzymes for specific reactions, and identify patterns in disease progression that human researchers would miss.\n\nOf course, this all assumes our servers don't crash when trying to process a particularly complex genome. Some things in technology never change.`,
    
    '~/skills/biology.json': `{
  "molecular_biology": {
    "techniques": ["PCR", "Gel Electrophoresis", "Western Blotting", "CRISPR-Cas9", "DNA Sequencing"],
    "expertise_level": "Advanced",
    "years_experience": 5,
    "strengths": ["Gene Expression Analysis", "Protein Analysis", "Genomic Analysis"],
    "weaknesses": ["Remembering to label tubes properly", "Patience for long protocols"]
  },
  "lab_techniques": {
    "wet_lab": ["Sample Preparation", "Assay Development", "Solution Preparation"],
    "instruments": ["HPLC", "Mass Spectrometer", "Fluorescence Microscope"],
    "safety_training": true,
    "favorite_lab_coat_brand": "Whatever was on sale"
  },
  "healthcare": {
    "pharmacy": ["Drug Interactions", "Patient Counseling", "Medication Management"],
    "clinical_knowledge": "Extensive",
    "languages": ["Medical Terminology", "Layman Explanation", "Insurance-Speak"]
  }
}`,
  
    '~/skills/technology.json': `{
  "software_development": {
    "languages": [
      {"name": "JavaScript", "proficiency": "Expert", "love_hate_relationship": true},
      {"name": "Python", "proficiency": "Advanced", "secretly_enjoying_type_errors": false},
      {"name": "Java", "proficiency": "Advanced", "stockholm_syndrome": true},
      {"name": "Rust", "proficiency": "Intermediate", "crying_frequency": "Weekly"}
    ],
    "paradigms": ["Functional", "Object-Oriented", "Reactive"],
    "preferred_indentation": "2 spaces (fight me)"
  },
  "infrastructure": {
    "cloud": ["AWS", "GCP", "Azure"],
    "containerization": ["Docker", "Kubernetes"],
    "ci_cd": ["Jenkins", "GitHub Actions", "GitLab CI"],
    "times_locked_out_of_production": "Too many to count"
  },
  "data": {
    "databases": ["PostgreSQL", "MongoDB", "Neo4j", "Redis"],
    "visualization": ["D3.js", "Tableau", "R/ggplot2"],
    "big_data": ["Spark", "Hadoop", "Kafka"],
    "excel_formulas_memorized": "Just VLOOKUP, like everyone else"
  }
}`,
  
    '~/skills/interdisciplinary.json': `{
  "bioinformatics": {
    "sequence_analysis": ["Alignment Algorithms", "Phylogenetic Analysis", "Variant Calling"],
    "tools": ["BioPython", "BioJava", "Bowtie", "BLAST"],
    "databases": ["GenBank", "PDB", "UniProt", "KEGG"],
    "proficiency": "High",
    "papers_published": 3
  },
  "computational_biology": {
    "modeling": ["Molecular Dynamics", "Systems Biology", "Metabolic Network Analysis"],
    "machine_learning": ["Neural Networks for Protein Structure", "Random Forests for Gene Classification"],
    "expertise": "Advanced",
    "favorite_algorithm": "Whatever works at 2 AM before the deadline"
  },
  "data_science": {
    "statistics": ["Hypothesis Testing", "Regression Analysis", "Multivariate Statistics"],
    "machine_learning": ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning"],
    "visualization": ["Scientific Plotting", "Interactive Dashboards", "Molecular Visualization"],
    "hours_spent_cleaning_data": "Approximately 90% of all project time"
  }
}`,
  
    '~/skills/languages.txt': `Programming Languages:
- JavaScript/TypeScript: ██████████ 10/10 (I'm fluent in undefined and NaN)
- Python: █████████░ 9/10 (Where indentation is law)
- Java: ████████░░ 8/10 (Enterprise ready™)
- R: ███████░░░ 7/10 (For when p-values need calculating)
- Rust: █████░░░░░ 5/10 (The compiler is my therapist)
- C++: ████░░░░░░ 4/10 (For when I hate myself)

Human Languages:
- English: ██████████ 10/10 (Native)
- Scientific Jargon: ████████░░ 8/10 (Fluent in unnecessarily complicated terminology)
- Meme: ██████████ 10/10 (Native speaker)
- Manager-Speak: ███████░░░ 7/10 (Can synergize paradigm shifts with the best of them)`,
  
    '~/skills/frameworks.json': `{
  "web": {
    "frontend": ["React", "Vue", "Angular", "Svelte"],
    "backend": ["Node.js", "Express", "Django", "Spring Boot"],
    "frameworks_learned_just_for_one_project": "Too many to count"
  },
  "data_science": {
    "python": ["Pandas", "NumPy", "SciPy", "Scikit-learn", "TensorFlow", "PyTorch"],
    "r": ["Tidyverse", "ggplot2", "Shiny"],
    "notebooks_with_uncommented_code": "All of them"
  },
  "bioinformatics": {
    "analysis": ["Bioconductor", "BioPython", "BioJava"],
    "visualization": ["Cytoscape", "IGV", "PyMOL"],
    "workflow": ["Snakemake", "Nextflow", "Galaxy"],
    "amount_of_ram_needed": "All of it, and then some"
  },
  "devops": {
    "ci_cd": ["Jenkins", "GitHub Actions", "GitLab CI"],
    "infrastructure_as_code": ["Terraform", "CloudFormation", "Ansible"],
    "monitoring": ["Prometheus", "Grafana", "ELK Stack"],
    "production_incidents_caused": "Classified information"
  }
}`,

    '~/experience.json': `{
  "work_experience": [
    {
      "title": "Senior Software Engineer",
      "company": "BioTech Innovations Inc.",
      "period": "2023 - Present",
      "description": "Leading the development of cutting-edge bioinformatics tools. Turns out caffeine is an excellent substrate for both humans and code production.",
      "achievements": [
        "Designed and implemented a distributed genomics processing pipeline",
        "Led a team of 5 engineers in delivering a major platform upgrade",
        "Reduced computation time for sequence alignment by 40%",
        "Set the office record for most consecutive hours debugging without crying"
      ]
    },
    {
      "title": "Bioinformatics Developer",
      "company": "Genomic Solutions",
      "period": "2021 - 2023",
      "description": "Developed software for genomic data analysis. Specialized in making complex biological concepts understandable to both computers and humans. The computers were easier to convince.",
      "achievements": [
        "Created visualization tools for complex genomic datasets",
        "Optimized database queries reducing analysis time by 60%",
        "Published 2 papers on novel analysis techniques",
        "Survived 3 major version upgrades without having an existential crisis"
      ]
    },
    {
      "title": "Research Pharmacist",
      "company": "Central Research Hospital",
      "period": "2018 - 2021",
      "description": "Conducted pharmaceutical research focusing on drug interactions and efficacy. Learned that humans are essentially just very complicated, error-prone biological machines.",
      "achievements": [
        "Led research team on drug interaction studies",
        "Developed automated analysis workflows for clinical data",
        "Started learning programming to analyze research data",
        "Managed to not mix up any medications (100% success rate)"
      ]
    }
  ],
  "education": [
    {
      "degree": "Bachelor of Pharmacy",
      "institution": "University of Medical Sciences",
      "year": "2018",
      "honors": "Graduated with Distinction",
      "thesis": "Computational Approaches to Drug Interaction Prediction"
    },
    {
      "degree": "Self-Taught Software Engineering",
      "institution": "University of Google, Stack Overflow, and 3 AM Debugging Sessions",
      "year": "Ongoing",
      "honors": "Distinguished Alumnus of Trial and Error",
      "thesis": "Why Sleep is Overrated: A Developer's Perspective"
    }
  ]
}`,
  
    '~/projects/terminal.jsx': `import React, { useState, useEffect, useRef } from 'react';

function Terminal() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  
  const handleCommand = (cmd) => {
    // This is where the magic happens
    setOutput(prev => [...prev, 
      { type: 'command', text: cmd },
      { type: 'response', text: 'Command executed successfully. Just kidding, nothing happened.' }
    ]);
  };
  
  return (
    <div className="terminal">
      <div className="terminal-output">
        {output.map((item, i) => (
          <div key={i} className={\`terminal-line \${item.type}\`}>
            {item.text}
          </div>
        ))}
      </div>
      <div className="terminal-input">
        <span className="prompt">$</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleCommand(input);
              setInput('');
            }
          }}
        />
      </div>
    </div>
  );
}

// You found the code that powers this very terminal.
// It's terminals all the way down.
// Inception, but for command lines.`,

    '~/projects/quantum-seq.js': `/**
 * QuantumSeq.js
 * A library for quantum-inspired genomic sequence analysis
 */

class QuantumSequencer {
  constructor(sequence) {
    this.sequence = sequence;
    this.superposition = false;
    this.entangled = null;
    console.log("Warning: Quantum state not stable. May collapse upon observation.");
  }
  
  // Creates a quantum superposition of all possible sequence alignments
  alignInSuperposition(targetSequence) {
    this.superposition = true;
    console.log("Creating superposition of all possible alignments...");
    // In theory, this would try all possible alignments simultaneously
    // In practice, it's just clever parallelization with a fancy name
    return "ALIGNMENT_IN_SUPERPOSITION";
  }
  
  // Entangles two sequences to study their interactions
  entangleWith(otherSequence) {
    this.entangled = otherSequence;
    console.log("Sequences entangled. What happens to one now affects the other.");
    console.log("Just kidding, that's not how molecular biology works.");
    return "ENTANGLEMENT_ESTABLISHED";
  }
  
  // Applies a "quantum" operation to find sequence patterns
  applySuperOperator() {
    // This function name is pure marketing
    return this.sequence.split('').reverse().join('');
  }
}

// Usage:
// const dna = new QuantumSequencer("ATCGAAGTCGGATT");
// const results = dna.alignInSuperposition("ATCGTTCGATCG");
// console.log(results);

// Note to self: Remove this comment before anyone realizes
// this has nothing to do with actual quantum computing`,

    '~/.hidden/aliens.md': `# Classified: Alien DNA Analysis

If you're reading this, you've ventured deep into my file system. Maybe too deep.

I've been secretly analyzing what I believe to be extraterrestrial genetic material. The structure is unlike anything on Earth - it has a hexanary system instead of our quaternary nucleotide system.

The sequences contain patterns that couldn't possibly have evolved on Earth. They show evidence of artificial design - possibly a form of biological programming language.

Key findings:
- Six unique nucleotide-like compounds instead of four
- Unprecedented information density (est. 100x DNA)
- Self-repairing sequences with error-correction
- Patterns that appear to be mathematical in nature

I'm continuing my analysis in secret. If anyone asks, I'm just working on "advanced bioinformatics research."

...or this could just be a joke file to reward people who explore my terminal thoroughly. Who knows?`,

    '~/projects/biotech-os.md': `# BioTech OS

An operating system interface designed for bioinformatics research and data analysis. Because apparently regular operating systems weren't complicated enough.

## Core Features
- Command-line bioinformatics tools integration (for people who hate GUIs)
- Real-time genomic data visualization (watch those A, T, G, and Cs fly by!)
- Cloud-based sequence analysis pipeline (it's basically just AWS, but more expensive)
- Collaborative research environment (so multiple people can be confused simultaneously)

## Technical Specs
- Written in Rust (because we hate memory errors more than we hate ourselves)
- Highly optimized for parallel processing (your cooling fans will thank us)
- Containerized deployment (Docker all the things!)
- Extensive API for tool integration (some documentation may be included)

## Status
- Currently in beta. And by beta, I mean "it works on my machine."
- Has only crashed during 3 out of 5 presentations. A new record!
- Documentation is coming "soon" (where "soon" means "when we run out of more interesting things to do")`,

    '~/projects/gene-analyzer.md': `# Gene Analyzer

A machine learning platform for predicting gene functions and protein interactions. Combines the reliability of ML with the unpredictability of genomics. What could go wrong?

## Core Features
- Neural network for sequence analysis (it's just a bunch of if statements in a trench coat)
- Evolutionary pattern recognition (Darwin would be so proud)
- Protein structure prediction (more accurate than guessing, slightly)
- Interactive molecular visualization (pretty colors make science better)

## Technical Implementation
- Written in Python with PyTorch and BioPython
- Trained on a dataset of over 500,000 annotated gene sequences
- Uses transfer learning from protein language models
- Runs on GPU for faster processing (also makes a great space heater)

## Results
- 87% accuracy in predicting gene function categories
- Published in top bioinformatics journals
- Cited by 12 research papers (11 of which were questioning our methods)
- Won "Most Likely to Skynet" award at the lab's holiday party`,

  '~/blog/cv-secret.pdf': `This isn't actually a PDF. Just testing if you're paying attention to file extensions.

If this were a real PDF, you'd need a PDF viewer to read it. But since it's just text pretending to be a PDF, you can read it just fine.

Did I trick you? Probably not. You're too smart for that. But I had to try.`
  }), []);

  // Mock 3D molecule data
  const moleculeData = useMemo(() => ({
    atoms: [
      { symbol: 'C', x: 0, y: 0, z: 0 },
      { symbol: 'C', x: 1.4, y: 0, z: 0 },
      { symbol: 'C', x: 2.1, y: 1.2, z: 0 },
      { symbol: 'N', x: 1.4, y: 2.4, z: 0 },
      { symbol: 'C', x: 0, y: 2.4, z: 0 },
      { symbol: 'C', x: -0.7, y: 1.2, z: 0 },
      { symbol: 'O', x: 3.5, y: 1.2, z: 0 }
    ],
    bonds: [
      { source: 0, target: 1, order: 2 },
      { source: 1, target: 2, order: 1 },
      { source: 2, target: 3, order: 2 },
      { source: 3, target: 4, order: 1 },
      { source: 4, target: 5, order: 2 },
      { source: 5, target: 0, order: 1 },
      { source: 2, target: 6, order: 1 }
    ]
  }), []);
  
  // Snake game data
  const [snake, setSnake] = useState({ direction: 'RIGHT', body: [{x: 5, y: 10}, {x: 4, y: 10}, {x: 3, y: 10}] });
  const [food, setFood] = useState({ x: 15, y: 10 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameInterval, setGameInterval] = useState(null);
  
  // Command aliases
  const commandAliases = useMemo(() => ({
    'ls': 'list',
    'dir': 'list',
    'cat': 'read',
    'more': 'read',
    'less': 'read',
    'cd': 'cd',
    'pwd': 'pwd',
    'clear': 'clear',
    'cls': 'clear',
    'help': 'help',
    'man': 'help',
    '?': 'help',
    'exit': 'quit',
    'q': 'quit',
    'about': 'about',
    'skills': 'skills',
    'projects': 'projects',
    'contact': 'contact',
    'bio': 'bio',
    'experience': 'experience',
    'theme': 'theme',
    'vim': 'vim',
    'emacs': 'emacs',
    'mode': 'mode',
    'refresh': 'refresh',
    'reload': 'refresh',
    'visualize': 'visualize',
    'viz': 'visualize',
    'sound': 'sound',
    'stats': 'stats',
    'time': 'time',
    'date': 'time',
    'clock': 'time',
    'joke': 'joke',
    'jokes': 'joke',
    'blog': 'blog',
    'whoami': 'whoami',
    'version': 'version',
    'molecule': 'molecule',
    'mol': 'molecule',
    'game': 'game',
    'snake': 'snake',
    'textsize': 'textsize',
    'font': 'textsize',
    'opacity': 'opacity',
    'transparent': 'opacity',
    'history': 'history',
    'neofetch': 'neofetch',
    'quote': 'quote',
    'weather': 'weather',
    'dance': 'dance',
    'rm': 'rm'
  }), []);
  
  // Easter Egg flags
  const [easterEggsFound, setEasterEggsFound] = useState({
    matrix: false,
    biotech: false,
    coffee: false,
    game: false,
    molecule: false,
    dance: false,
    quote: false,
    neofetch: false
  });
  
  // Weather data
  const [weatherData, setWeatherData] = useState({
    condition: 'Sunny',
    temperature: '25°C',
    humidity: '45%',
    wind: '5 km/h',
  });
  
  // Some quotes for the quote command
  const quotes = useMemo(() => [
    "The best way to predict the future is to invent it. - Alan Kay",
    "Life finds a way. - Dr. Ian Malcolm, Jurassic Park",
    "Code is like humor. When you have to explain it, it's bad. - Cory House",
    "Biology gives you a brain. Life turns it into a mind. - Jeffrey Eugenides",
    "In biology, nothing is clear, everything is too complicated, everything is a mess, and just when you think you understand something, you peel off a layer and find deeper complications beneath. - Richard Preston",
    "The most exciting phrase to hear in science, the one that heralds new discoveries, is not 'Eureka!' but 'That's funny...' - Isaac Asimov",
    "If debugging is the process of removing software bugs, then programming must be the process of putting them in. - Edsger W. Dijkstra",
    "The problem with biologists is they're too busy studying living things to notice when they're being automated out of existence. - me, just now"
  ], []);
  
  // Update clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTerminalTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Matrix rain effect
  useEffect(() => {
    const createRain = () => {
      const matrixContainer = document.getElementById('matrix-rain');
      if (!matrixContainer) return;
      
      // Clear previous drops
      matrixContainer.innerHTML = '';
      
      // Characters to use in the rain
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@!%&*()';
      const bioChars = 'ATCGΔΦΨΩΘΠΣ';
      
      // Create drops
      for (let i = 0; i < 100; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        
        // Random character
        drop.textContent = Math.random() > 0.7 ? bioChars[Math.floor(Math.random() * bioChars.length)] : chars[Math.floor(Math.random() * chars.length)];
        
        // Random position and speed
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 2 + 1;
        
        drop.style.left = `${left}%`;
        drop.style.animationDuration = `${duration}s`;
        drop.style.animationDelay = `${delay}s`;
        drop.style.opacity = `${Math.random() * 0.5 + 0.1}`;
        
        matrixContainer.appendChild(drop);
      }
    };
    
    createRain();
    const interval = setInterval(createRain, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Initialize terminal with welcome sequence
  useEffect(() => {
    if (isInitializing) {
      const initializeTerminal = async () => {
        await typeText('Initializing BioTech_OS v4.2.0...', 'output', 30, true);
        await wait(500);
        await typeText('Establishing secure connection to biological and computational knowledge bases...', 'output', 20, true);
        await wait(800);
        await typeText('████████████████████████████████ 100%', 'output', 5, true);
        await wait(500);
        await typeText('Molecular sequence validation: Complete (mostly)', 'output', 20, true);
        await wait(400);
        await typeText('Quantum computing interface: Activated (not really, but it sounds impressive)', 'output', 20, true);
        await wait(600);
        await typeText('Executing neural network integration protocols (aka if statements in a trench coat)...', 'output', 20, true);
        await wait(700);
        await typeText('Welcome to Mahmoud\'s BioTech Interface.', 'system', 20, true);
        await wait(500);
        await typeText('All systems are operational. More or less.', 'system', 20, true);
        await wait(300);
        await typeText('Type "help" or press Tab for available commands.', 'system', 20, true);
        await wait(300);
        await typeText('Pro tip: Try keyboard shortcuts like Ctrl+L to clear screen, or hunt for easter eggs.', 'system', 20, true);
        
        setIsInitializing(false);
      };
      
      initializeTerminal();
    }
  }, [isInitializing]);
  
  // Helper function to simulate typing
  const typeText = async (text, type = 'output', speed = 20, playSound = false) => {
    if (type === 'instant') {
      setTerminalContent(prev => [...prev, { text, type: 'output' }]);
      return;
    }
    
    const words = text.split(' ');
    let currentText = '';
    
    for (let i = 0; i < words.length; i++) {
      if (soundEnabled && playSound) {
        // Play typing sound (would need to implement this with actual audio)
        const audio = new Audio();
        audio.volume = 0.05;
        audio.src = 'data:audio/wav;base64,UklGRpQMAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YXAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=';
        audio.play();
      }
      
      currentText += (i > 0 ? ' ' : '') + words[i];
      setTerminalContent(prev => {
        const newContent = [...prev];
        if (newContent.length > 0 && newContent[newContent.length - 1].type === 'typing') {
          newContent[newContent.length - 1] = { text: currentText, type: 'typing' };
        } else {
          newContent.push({ text: currentText, type: 'typing' });
        }
        return newContent;
      });
      
      await wait(speed + Math.random() * 30);
    }
    
    // Replace the typing entry with the final output
    setTerminalContent(prev => {
      const newContent = [...prev];
      if (newContent.length > 0 && newContent[newContent.length - 1].type === 'typing') {
        newContent[newContent.length - 1] = { text, type };
      }
      return newContent;
    });
  };
  
  // Helper function for waiting
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  // Change theme
  const changeTheme = useCallback(() => {
    const themes = ['indigo', 'matrix', 'midnight', 'synthwave', 'coffee'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
    processCommand(`theme ${themes[nextIndex]}`);
  }, [theme]);
  
  // File system navigation
  const getDirectoryContent = useCallback((dirPath) => {
    return fileSystem[dirPath]?.content || [];
  }, [fileSystem]);
  
  const readFile = useCallback((filePath) => {
    return fileContent[filePath] || `Error: Cannot read ${filePath}. File not found, which is shocking considering I just made up this entire file system.`;
  }, [fileContent]);
  
  const changeDirectory = useCallback((dirPath) => {
    if (dirPath === '..') {
      if (directory === '~') {
        return '~';
      }
      const parts = directory.split('/');
      parts.pop();
      return parts.join('/');
    }
    
    if (dirPath === '~' || dirPath === '/home/mahmoud') {
      return '~';
    }
    
    if (dirPath.startsWith('/')) {
      // This is just a mock terminal, so we'll just reject absolute paths
      // that we don't specifically handle
      return dirPath === '/home/mahmoud' ? '~' : directory;
    }
    
    if (dirPath.startsWith('~')) {
      return fileSystem[dirPath] ? dirPath : directory;
    }
    
    const newPath = directory === '~' ? `~/${dirPath}` : `${directory}/${dirPath}`;
    return fileSystem[newPath] ? newPath : directory;
  }, [directory, fileSystem]);
  
  // Handle notifications
  const showNotification = useCallback((message, type = 'info', duration = 3000) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), duration);
  }, []);
  
  // Snake game movement
  const moveSnake = useCallback(() => {
    if (gameOver) return;
    
    const newSnake = { ...snake };
    const head = { ...newSnake.body[0] };
    
    switch(newSnake.direction) {
      case 'RIGHT': head.x += 1; break;
      case 'LEFT': head.x -= 1; break;
      case 'UP': head.y -= 1; break;
      case 'DOWN': head.y += 1; break;
      default: break;
    }
    
    // Check for collisions with walls
    if (head.x < 0 || head.x >= 30 || head.y < 0 || head.y >= 20) {
      setGameOver(true);
      return;
    }
    
    // Check for collisions with self
    for (let i = 0; i < newSnake.body.length; i++) {
      if (head.x === newSnake.body[i].x && head.y === newSnake.body[i].y) {
        setGameOver(true);
        return;
      }
    }
    
    // Check if food eaten
    if (head.x === food.x && head.y === food.y) {
      // Generate new food
      const newFood = {
        x: Math.floor(Math.random() * 30),
        y: Math.floor(Math.random() * 20)
      };
      setFood(newFood);
      setScore(score + 1);
      
      // Grow snake
      newSnake.body.unshift(head);
    } else {
      // Move snake
      newSnake.body.unshift(head);
      newSnake.body.pop();
    }
    
    setSnake(newSnake);
  }, [food, gameOver, score, snake]);
  
  // Handle snake game key presses
  const handleGameKeyDown = useCallback((e) => {
    if (!gameActive) return;
    
    switch(e.key) {
      case 'ArrowUp':
        if (snake.direction !== 'DOWN') {
          setSnake({ ...snake, direction: 'UP' });
        }
        break;
      case 'ArrowDown':
        if (snake.direction !== 'UP') {
          setSnake({ ...snake, direction: 'DOWN' });
        }
        break;
      case 'ArrowLeft':
        if (snake.direction !== 'RIGHT') {
          setSnake({ ...snake, direction: 'LEFT' });
        }
        break;
      case 'ArrowRight':
        if (snake.direction !== 'LEFT') {
          setSnake({ ...snake, direction: 'RIGHT' });
        }
        break;
      case 'Escape':
        stopGame();
        break;
      default:
        break;
    }
  }, [gameActive, snake]);
  
  // Start snake game
  const startGame = useCallback(() => {
    setGameActive(true);
    setGameOver(false);
    setScore(0);
    setSnake({ 
      direction: 'RIGHT', 
      body: [{x: 5, y: 10}, {x: 4, y: 10}, {x: 3, y: 10}] 
    });
    setFood({ 
      x: Math.floor(Math.random() * 30), 
      y: Math.floor(Math.random() * 20) 
    });
    
    const interval = setInterval(moveSnake, 150);
    setGameInterval(interval);
    
    // Add event listener for arrow keys
    window.addEventListener('keydown', handleGameKeyDown);
  }, [handleGameKeyDown, moveSnake]);
  
  // Stop snake game
  const stopGame = useCallback(() => {
    clearInterval(gameInterval);
    setGameActive(false);
    window.removeEventListener('keydown', handleGameKeyDown);
  }, [gameInterval, handleGameKeyDown]);
  
  // Command processor
  const processCommand = async (cmd) => {
    const command = cmd.trim();
    
    if (command === '') return;
    
    // Add to terminal content
    const promptSymbol = commandMode === 'vim' ? ':' : commandMode === 'emacs' ? 'M-x' : '$';
    setTerminalContent(prev => [...prev, { text: `${promptSymbol} ${cmd}`, type: 'command' }]);
    
    // Add to command history
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
    
    // Parse command and arguments
    const parts = command.split(' ');
    const mainCommand = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    // Resolve aliases
    const resolvedCommand = commandAliases[mainCommand] || mainCommand;
    
    // Create "typing" effect when processing certain commands
    if (resolvedCommand !== 'clear' && command.length > 3) {
      await typeText('Processing command...', 'typing', 40, soundEnabled);
      await wait(300);
      setTerminalContent(prev => prev.filter(item => item.type !== 'typing'));
    }
    
    // Process commands
    switch (resolvedCommand) {
      case 'help':
        if (args[0] === '--all') {
          // Display all commands including hidden ones
          await typeText('╭───────────────────── ALL COMMANDS ─────────────────────╮', 'output', 5, soundEnabled);
          await typeText('│                                                        │', 'output', 5, soundEnabled);
          await typeText('│ NAVIGATION                                             │', 'output', 5, soundEnabled);
          await typeText('│ help, list, cd, pwd, clear                             │', 'output', 5, soundEnabled);
          await typeText('│                                                        │', 'output', 5, soundEnabled);
          await typeText('│ FILE OPERATIONS                                        │', 'output', 5, soundEnabled);
          await typeText('│ read, cat, more, less                                  │', 'output', 5, soundEnabled);
          await typeText('│                                                        │', 'output', 5, soundEnabled);
          await typeText('│ PROFILE INFORMATION                                    │', 'output', 5, soundEnabled);
          await typeText('│ about, skills, projects, bio, contact, experience, blog│', 'output', 5, soundEnabled);
          await typeText('│                                                        │', 'output', 5, soundEnabled);
          await typeText('│ TERMINAL CUSTOMIZATION                                 │', 'output', 5, soundEnabled);
          await typeText('│ theme, mode, vim, emacs, opacity, textsize, sound      │', 'output', 5, soundEnabled);
          await typeText('│                                                        │', 'output', 5, soundEnabled);
          await typeText('│ SPECIAL COMMANDS                                       │', 'output', 5, soundEnabled);
          await typeText('│ matrix, biotech, visualize, stats, time, joke, weather │', 'output', 5, soundEnabled);
          await typeText('│ molecule, snake, history, neofetch, quote, dance       │', 'output', 5, soundEnabled);
          await typeText('│                                                        │', 'output', 5, soundEnabled);
          await typeText('│ KEYBOARD SHORTCUTS                                     │', 'output', 5, soundEnabled);
          await typeText('│ Ctrl+L: Clear screen                                   │', 'output', 5, soundEnabled);
          await typeText('│ Ctrl+C: Cancel command                                 │', 'output', 5, soundEnabled);
          await typeText('│ Tab: Command completion                                │', 'output', 5, soundEnabled);
          await typeText('│ Up/Down: Navigate command history                      │', 'output', 5, soundEnabled);
          await typeText('│ Alt+T: Change theme                                    │', 'output', 5, soundEnabled);
          await typeText('╰────────────────────────────────────────────────────────╯', 'output', 5, soundEnabled);
        } else if (args.length > 0) {
          // Show help for specific command
          const helpCommand = commandAliases[args[0]] || args[0];
          switch (helpCommand) {
            case 'list':
              await typeText('Command: list (aliases: ls, dir)', 'output', 20, soundEnabled);
              await typeText('Usage: list [directory]', 'output', 20, soundEnabled);
              await typeText('Lists the contents of a directory', 'output', 20, soundEnabled);
              await typeText('Example: list ~/projects', 'output', 20, soundEnabled);
              break;
            case 'read':
              await typeText('Command: read (aliases: cat, more, less)', 'output', 20, soundEnabled);
              await typeText('Usage: read <filename>', 'output', 20, soundEnabled);
              await typeText('Displays the content of a file', 'output', 20, soundEnabled);
              await typeText('Example: read ~/about.md', 'output', 20, soundEnabled);
              break;
            case 'theme':
              await typeText('Command: theme', 'output', 20, soundEnabled);
              await typeText('Usage: theme <name>', 'output', 20, soundEnabled);
              await typeText('Changes the terminal theme. Available themes: indigo, matrix, midnight, synthwave, coffee', 'output', 20, soundEnabled);
              await typeText('Example: theme matrix', 'output', 20, soundEnabled);
              break;
            case 'sound':
              await typeText('Command: sound', 'output', 20, soundEnabled);
              await typeText('Usage: sound on|off', 'output', 20, soundEnabled);
              await typeText('Enables or disables typing sound effects', 'output', 20, soundEnabled);
              await typeText('Example: sound on', 'output', 20, soundEnabled);
              break;
            case 'molecule':
              await typeText('Command: molecule (alias: mol)', 'output', 20, soundEnabled);
              await typeText('Usage: molecule', 'output', 20, soundEnabled);
              await typeText('Displays an interactive 3D molecule visualization', 'output', 20, soundEnabled);
              await typeText('Example: molecule', 'output', 20, soundEnabled);
              break;
            case 'game':
            case 'snake':
              await typeText('Command: snake (alias: game)', 'output', 20, soundEnabled);
              await typeText('Usage: snake', 'output', 20, soundEnabled);
              await typeText('Launches a simple snake game. Use arrow keys to control.', 'output', 20, soundEnabled);
              await typeText('Press ESC to exit the game.', 'output', 20, soundEnabled);
              break;
            case 'opacity':
              await typeText('Command: opacity (alias: transparent)', 'output', 20, soundEnabled);
              await typeText('Usage: opacity <0-100>', 'output', 20, soundEnabled);
              await typeText('Changes the terminal background opacity', 'output', 20, soundEnabled);
              await typeText('Example: opacity 80', 'output', 20, soundEnabled);
              break;
            case 'textsize':
              await typeText('Command: textsize (alias: font)', 'output', 20, soundEnabled);
              await typeText('Usage: textsize <sm|md|lg|xl>', 'output', 20, soundEnabled);
              await typeText('Changes the terminal text size', 'output', 20, soundEnabled);
              await typeText('Example: textsize lg', 'output', 20, soundEnabled);
              break;
            case 'weather':
              await typeText('Command: weather', 'output', 20, soundEnabled);
              await typeText('Usage: weather', 'output', 20, soundEnabled);
              await typeText('Displays current weather conditions (totally real, definitely not made up)', 'output', 20, soundEnabled);
              break;
            default:
              await typeText(`No detailed help available for '${args[0]}'. Try 'help --all' for a full list of commands.`, 'output', 20, soundEnabled);
          }
        } else {
          await typeText('╭─────────────────── AVAILABLE COMMANDS ───────────────────╮', 'output', 15, soundEnabled);
          await typeText('│                                                          │', 'output', 5, soundEnabled);
          await typeText('│  help          Display this help message                 │', 'output', 15, soundEnabled);
          await typeText('│  about         Learn about Mahmoud                       │', 'output', 15, soundEnabled);
          await typeText('│  skills        View skills and expertise                 │', 'output', 15, soundEnabled);
          await typeText('│  projects      View featured projects                    │', 'output', 15, soundEnabled);
          await typeText('│  blog          Read blog posts                           │', 'output', 15, soundEnabled);
          await typeText('│  bio           Show academic background                  │', 'output', 15, soundEnabled);
          await typeText('│  contact       Display contact information               │', 'output', 15, soundEnabled);
          await typeText('│  experience    View professional experience              │', 'output', 15, soundEnabled);
          await typeText('│  list          List files in current directory           │', 'output', 15, soundEnabled);
          await typeText('│  read          Read file contents                        │', 'output', 15, soundEnabled);
          await typeText('│  clear         Clear the terminal                        │', 'output', 15, soundEnabled);
          await typeText('│  theme         Change the terminal theme                 │', 'output', 15, soundEnabled);
          await typeText('│  sound         Toggle typing sounds                      │', 'output', 15, soundEnabled);
          await typeText('│  visualize     Launch visual skill map                   │', 'output', 15, soundEnabled);
          await typeText('│  joke          Display a random programmer joke          │', 'output', 15, soundEnabled);
          await typeText('│  time          Show current date and time                │', 'output', 15, soundEnabled);
          await typeText('│                                                          │', 'output', 5, soundEnabled);
          await typeText('│  Type "help --all" to see all commands and shortcuts     │', 'output', 15, soundEnabled);
          await typeText('│  Type "help <command>" for detailed usage information    │', 'output', 15, soundEnabled);
          await typeText('╰──────────────────────────────────────────────────────────╯', 'output', 5, soundEnabled);
        }
        break;
        
      case 'about':
        if (args[0] === '--verbose') {
          await typeText('Loading comprehensive profile...', 'system', 20, soundEnabled);
          await wait(700);
          await typeText('I am a Pharmacist turned Software Engineer with a passion for bridging the gap between biology and technology. My unique background allows me to understand both laboratory processes and programming paradigms, creating innovative solutions that leverage the strengths of both domains.', 'output', 15, soundEnabled);
          await typeText('', 'output', 5, soundEnabled);
          await typeText('My journey began in pharmaceutical sciences, where I developed a strong foundation in molecular biology, biochemistry, and research methodologies. Fascinated by the potential of computational approaches to accelerate scientific discovery, I taught myself programming and software engineering.', 'output', 15, soundEnabled);
          await typeText('', 'output', 5, soundEnabled);
          await typeText('Today, I specialize in developing tools and systems that enable researchers to analyze complex biological data, model molecular interactions, and accelerate the drug discovery process through computational methods. In other words, I make computers do biology stuff so humans don\'t have to.', 'output', 15, soundEnabled);
          await typeText('', 'output', 5, soundEnabled);
          await typeText('When not coding or thinking about molecules, I\'m probably debating the optimal coffee brewing temperature or explaining to friends why their latest "million-dollar app idea" would require a team of 50 engineers and three years to build.', 'output', 15, soundEnabled);
        } else {
          await typeText('⚡ PROFILE: MAHMOUD', 'output', 20, soundEnabled);
          await typeText('───────────────────', 'output', 5, soundEnabled);
          await typeText('Pharmacist turned Software Engineer, combining molecular biology expertise with advanced programming skills to drive innovation in computational biology and bioinformatics.', 'output', 15, soundEnabled);
          await typeText('', 'output', 5, soundEnabled);
          await typeText('My interdisciplinary approach bridges the gap between biological research and technological implementation, creating powerful tools for scientific advancement. Or, as I like to call it: "making computers do biology so I don\'t have to pipette anymore."', 'output', 15, soundEnabled);
          await typeText('', 'output', 5, soundEnabled);
          await typeText('Use "about --verbose" for my complete life story, or "help" to see what else you can do here.', 'system', 15, soundEnabled);
        }
        break;
        
      case 'skills':
        if (args[0] === '--detail' || args[0] === '-d') {
          await typeText('DETAILED SKILLS ANALYSIS (WARNING: EXCESSIVE BRAGGING AHEAD):', 'output', 15, soundEnabled);
          await typeText('', 'output', 5, soundEnabled);
          await typeText('┌─ BIOLOGY ─────────────────────────────────────────────┐', 'output', 5, soundEnabled);
          await typeText('│ ⦿ Molecular Biology:                                  │', 'output', 5, soundEnabled);
          await typeText('│   Gene Expression Analysis, PCR Techniques,           │', 'output', 5, soundEnabled);
          await typeText('│   Protein Analysis, Cell Culture, Avoiding Pipette    │', 'output', 5, soundEnabled);
          await typeText('│   Injuries, and Explaining DNA to Relatives           │', 'output', 5, soundEnabled);
          await typeText('│                                                       │', 'output', 5, soundEnabled);
          await typeText('│ ⦿ Lab Techniques:                                     │', 'output', 5, soundEnabled);
          await typeText('│   Assay Development, Sample Preparation,              │', 'output', 5, soundEnabled);
          await typeText('│   Quality Control, Documentation, Not Mixing Up       │', 'output', 5, soundEnabled);
          await typeText('│   Samples, Pretending to Know What Went Wrong         │', 'output', 5, soundEnabled);
          await typeText('└───────────────────────────────────────────────────────┘', 'output', 5, soundEnabled);
          await typeText('', 'output', 5, soundEnabled);
          await typeText('┌─ TECHNOLOGY ─────────────────────────────────────────┐', 'output', 5, soundEnabled);
          await typeText('│ ⦿ Software Development:                              │', 'output', 5, soundEnabled);
          await typeText('│   Full Stack Development, API Design,                │', 'output', 5, soundEnabled);
          await typeText('│   Cloud Architecture, Data Visualization,            │', 'output', 5, soundEnabled);
          await typeText('│   Googling Error Messages, Stack Overflow Surfing    │', 'output', 5, soundEnabled);
          await typeText('│                                                      │', 'output', 5, soundEnabled);
          await typeText('│ ⦿ Infrastructure:                                    │', 'output', 5, soundEnabled);
          await typeText('│   Cloud Computing, Containerization,                 │', 'output', 5, soundEnabled);
          await typeText('│   CI/CD, Microservices, Turning Things Off and       │', 'output', 5, soundEnabled);
          await typeText('│   On Again, Making Complex Architecture Diagrams     │', 'output', 5, soundEnabled);
          await typeText('└──────────────────────────────────────────────────────┘', 'output', 5, soundEnabled);
          await typeText('', 'output', 5, soundEnabled);
          await typeText('┌─ INTERDISCIPLINARY ─────────────────────────────────┐', 'output', 5, soundEnabled);
          await typeText('│ ⦿ Bioinformatics:                                   │', 'output', 5, soundEnabled);
          await typeText('│   Sequence Analysis, Genomic Data Processing,        │', 'output', 5, soundEnabled);
          await typeText('│   Biological Databases, Statistical Analysis,        │', 'output', 5, soundEnabled);
          await typeText('│   Waiting for Long-Running Algorithms to Complete    │', 'output', 5, soundEnabled);
          await typeText('│                                                      │', 'output', 5, soundEnabled);
          await typeText('│ ⦿ Computational Biology:                             │', 'output', 5, soundEnabled);
          await typeText('│   Pathway Analysis, Molecular Modeling,              │', 'output', 5, soundEnabled);
          await typeText('│   Systems Biology, Machine Learning,                 │', 'output', 5, soundEnabled);
          await typeText('│   Explaining to Biologists Why They Need to Code     │', 'output', 5, soundEnabled);
          await typeText('└──────────────────────────────────────────────────────┘', 'output', 5, soundEnabled);
        } else if (args[0] === '--interactive' || args[0] === '-i') {
          await typeText('Launching interactive skill visualization...', 'system', 20, soundEnabled);
          setVisualizerActive(true);
          await typeText('Interactive skill visualization is now active. Explore the connections between biology and technology by hovering over skills. Warning: contains gratuitous use of force-directed graphs.', 'system', 15, soundEnabled);
        } else {
          await typeText('SKILLS OVERVIEW (THINGS I CAN DO WITHOUT GOOGLING FIRST):', 'output', 15, soundEnabled);
          await typeText('╭───────────────────┬────────────────────────────────────────╮', 'output', 5, soundEnabled);
          await typeText('│ BIOLOGY           │ Molecular Biology, Lab Techniques      │', 'output', 15, soundEnabled);
          await typeText('├───────────────────┼────────────────────────────────────────┤', 'output', 5, soundEnabled);
          await typeText('│ TECHNOLOGY        │ Software Development, Infrastructure   │', 'output', 15, soundEnabled);
          await typeText('├───────────────────┼────────────────────────────────────────┤', 'output', 5, soundEnabled);
          await typeText('│ INTERDISCIPLINARY │ Bioinformatics, Computational Biology  │', 'output', 15, soundEnabled);
          await typeText('╰───────────────────┴────────────────────────────────────────╯', 'output', 5, soundEnabled);
          await typeText('', 'output', 5, soundEnabled);
          await typeText('Use "skills --detail" for comprehensive (and slightly sarcastic) breakdown', 'system', 15, soundEnabled);
          await typeText('Use "skills --interactive" to launch visual skill map', 'system', 15, soundEnabled);
          await typeText('Use "visualize" command for 3D skill visualization', 'system', 15, soundEnabled);
          await typeText('', 'output', 5, soundEnabled);
          await typeText('For more details, try "read ~/skills/technology.json" or explore the skills directory', 'system', 15, soundEnabled);
        }
        break;
        
      case 'projects':
        if (args[0] === '--id=1' || args[0] === '1') {
          await typeText('PROJECT DETAILS:', 'output', 15, soundEnabled);
          await typeText('', 'output', 5, soundEnabled);
          await typeText('┌─ HydraFP Library ─────────────────────────────────────┐', 'output', 5, soundEnabled);
          await typeText('│                                                       │', 'output', 5, soundEnabled);
          await typeText('│ A functional programming library for Java that        │', 'output', 15, soundEnabled);
          await typeText('│ simplifies writing pure, composable code.             │', 'output', 15, soundEnabled);
          await typeText('│                                                       │', 'output', 5, soundEnabled);
          await typeText('│ Core Features:                                        │', 'output', 15, soundEnabled);
          await typeText('│ • Pure functional approach with effect system         │', 'output', 15, soundEnabled);
          await typeText('│   (Because why let Haskell have all the fun?)         │', 'output', 15, soundEnabled);
          await typeText('│ • Algebraic data types (Option, Either, Try)          │', 'output', 15, soundEnabled);
          await typeText('│   (For when null pointers give you nightmares)        │', 'output', 15, soundEnabled);
          await typeText('│ • Immutable collections & pattern matching            │', 'output', 15, soundEnabled);
          await typeText('│   (Variables shouldn\'t vary, obviously)              │', 'output', 15, soundEnabled);
          await typeText('│ • Performance optimization features                   │', 'output', 15, soundEnabled);
          await typeText('│   (Because someone will complain about speed)         │', 'output', 15, soundEnabled);
          await typeText('│                                                       │', 'output', 5, soundEnabled);
          await typeText('│ Impact:                                               │', 'output', 15, soundEnabled);
          await typeText('│ Enhancing Java development with functional            │', 'output', 15, soundEnabled);
          await typeText('│ programming paradigms. Over 500 GitHub stars          │', 'output', 15, soundEnabled);
          await typeText('│ and several pull requests from strangers who          │', 'output', 15, soundEnabled);
          await typeText('│ found bugs I didn\'t know existed.                    │', 'output', 15, soundEnabled);
          await typeText('└───────────────────────────────────────────────────────┘', 'output', 5, soundEnabled);
        } else if (args[0] === '--id=2' || args[0] === '2') {
          await typeText('PROJECT DETAILS:', 'output', 15, soundEnabled);
          await typeText('', 'output', 5, soundEnabled);
          await typeText('┌─ BioTech OS ─────────────────────────────────────────┐', 'output', 5, soundEnabled);
          await typeText('│                                                      │', 'output', 5, soundEnabled);
          await typeText('│ An operating system interface designed for           │', 'output', 15, soundEnabled);
          await typeText('│ bioinformatics research and data analysis.           │', 'output', 15, soundEnabled);
          await typeText('│                                                      │', 'output', 5, soundEnabled);
          await typeText('│ Core Features:                                       │', 'output', 15, soundEnabled);
          await typeText('│ • Command-line bioinformatics tools integration      │', 'output', 15, soundEnabled);
          await typeText('│   (For when GUIs are too mainstream)                 │', 'output', 15, soundEnabled);
          await typeText('│ • Real-time genomic data visualization               │', 'output', 15, soundEnabled);
          await typeText('│   (Watch those A, T, G, Cs fly across your screen!)  │', 'output', 15, soundEnabled);
          await typeText('│ • Cloud-based sequence analysis pipeline             │', 'output', 15, soundEnabled);
          await typeText('│   (Because local computing is so 2010)               │', 'output', 15, soundEnabled);
          await typeText('│ • Collaborative research environment                 │', 'output', 15, soundEnabled);
          await typeText('│   (So multiple scientists can be confused together)  │', 'output', 15, soundEnabled);
          await typeText('│                                                      │', 'output', 5, soundEnabled);
          await typeText('│ Impact:                                              │', 'output', 15, soundEnabled);
          await typeText('│ Accelerating genomic research through intuitive      │', 'output', 15, soundEnabled);
          await typeText('│ computational interfaces. Used by three research     │', 'output', 15, soundEnabled);
          await typeText('│ labs and counting. Only crashed twice during demos.  │', 'output', 15, soundEnabled);
          await typeText('└──────────────────────────────────────────────────────┘', 'output', 5, soundEnabled);
        } else if (args[0] === '--id=3' || args[0] === '3') {
          await typeText('PROJECT DETAILS:', 'output', 15, soundEnabled);
          await typeText('', 'output', 5, soundEnabled);
          await typeText('┌─ Gene Analyzer ─────────────────────────────────────┐', 'output', 5, soundEnabled);
          await typeText('│                                                     │', 'output', 5, soundEnabled);
          await typeText('│ A machine learning platform for predicting gene     │', 'output', 15, soundEnabled);
          await typeText('│ functions and protein interactions.                 │', 'output', 15, soundEnabled);
          await typeText('│                                                     │', 'output', 5, soundEnabled);
          await typeText('│ Core Features:                                      │', 'output', 15, soundEnabled);
          await typeText('│ • Neural network for sequence analysis              │', 'output', 15, soundEnabled);
          await typeText('│   (It\'s just a bunch of if-statements in a trench coat)│', 'output', 15, soundEnabled);
          await typeText('│ • Evolutionary pattern recognition                  │', 'output', 15, soundEnabled);
          await typeText('│   (Darwin would be impressed, probably)             │', 'output', 15, soundEnabled);
          await typeText('│ • Protein structure prediction                      │', 'output', 15, soundEnabled);
          await typeText('│   (More accurate than a random guess, usually)      │', 'output', 15, soundEnabled);
          await typeText('│ • Interactive molecular visualization               │', 'output', 15, soundEnabled);
          await typeText('│   (Spinning molecules never gets old)               │', 'output', 15, soundEnabled);
          await typeText('│                                                     │', 'output', 5, soundEnabled);
          await typeText('│ Impact:                                             │', 'output', 15, soundEnabled);
          await typeText('│ Enabling faster discovery of gene functions for     │', 'output', 15, soundEnabled);
          await typeText('│ pharmaceutical research. Used in two published      │', 'output', 15, soundEnabled);
          await typeText('│ papers, and I only had to fix bugs three times      │', 'output', 15, soundEnabled);
          await typeText('│ during peer review.                                 │', 'output', 15, soundEnabled);
          await typeText('└─────────────────────────────────────────────────────┘', 'output', 5, soundEnabled);
        } else if (args[0] === '--source') {
          await typeText('VIEWING PROJECT SOURCE CODE...', 'system', 15, soundEnabled);
          await typeText('', 'output', 5, soundEnabled);
          await typeText('To see actual project code samples, try:', 'output', 15, soundEnabled);
          await typeText('read ~/projects/terminal.jsx', 'output', 15, soundEnabled);
          await typeText('read ~/projects/quantum-seq.js', 'output', 15, soundEnabled);
        } else {
          await typeText('🚀 FEATURED PROJECTS', 'output', 15, soundEnabled);
          await typeText('───────────────────────', 'output', 5, soundEnabled);
          await typeText('', 'output', 5, soundEnabled);
          await typeText('┌─ 01 ─────────────────────────────────────────────────┐', 'output', 5, soundEnabled);
          await typeText('│ HydraFP Library                                      │', 'output', 15, soundEnabled);
          await typeText('│ A functional programming library for Java            │', 'output', 15, soundEnabled);
          await typeText('│                                                      │', 'output', 5, soundEnabled);
          await typeText('│ Tech: Java, Functional Programming, Effect Systems   │', 'output', 15, soundEnabled);
          await typeText('│ Link: github.com/mahmoudxyz/HydraFP                 │', 'output', 15, soundEnabled);
          await typeText('└──────────────────────────────────────────────────────┘', 'output', 5, soundEnabled);
          await typeText('', 'output', 5, soundEnabled);
          await typeText('┌─ 02 ─────────────────────────────────────────────────┐', 'output', 5, soundEnabled);
          await typeText('│ BioTech OS                                           │', 'output', 15, soundEnabled);
          await typeText('│ Operating system interface for bioinformatics        │', 'output', 15, soundEnabled);
          await typeText('│                                                      │', 'output', 5, soundEnabled);
          await typeText('│ Tech: Rust, Linux, Distributed Systems               │', 'output', 15, soundEnabled);
          await typeText('│ Link: github.com/mahmoudxyz/biotech-os              │', 'output', 15, soundEnabled);
          await typeText('└──────────────────────────────────────────────────────┘', 'output', 5, soundEnabled);
          await typeText('', 'output', 5, soundEnabled);
          await typeText('┌─ 03 ─────────────────────────────────────────────────┐', 'output', 5, soundEnabled);
          await typeText('│ Gene Analyzer                                        │', 'output', 15, soundEnabled);
          await typeText('│ ML platform for gene function prediction             │', 'output', 15, soundEnabled);
          await typeText('│                                                      │', 'output', 5, soundEnabled);
          await typeText('│ Tech: Python, TensorFlow, Bioinformatics             │', 'output', 15, soundEnabled);
          await typeText('│ Link: github.com/mahmoudxyz/gene-analyzer           │', 'output', 15, soundEnabled);
          await typeText('└──────────────────────────────────────────────────────┘', 'output', 5, soundEnabled);
          await typeText('', 'output', 5, soundEnabled);
          await typeText('To view detailed project information, type:', 'system', 15, soundEnabled);
          await typeText('projects --id=N (where N is the project number)', 'system', 15, soundEnabled);
          await typeText('projects --source (to see actual code samples)', 'system', 15, soundEnabled);
        }
        break;
        
      case 'bio':
        await typeText('📚 ACADEMIC & RESEARCH PROFILE', 'output', 15, soundEnabled);
        await typeText('─────────────────────────────', 'output', 5, soundEnabled);
        await typeText('', 'output', 5, soundEnabled);
        await typeText('┌─ EDUCATION ──────────────────────────────────────────┐', 'output', 5, soundEnabled);
        await typeText('│ • Bachelor of Pharmacy                               │', 'output', 15, soundEnabled);
        await typeText('│   Graduated with Excellence                          │', 'output', 15, soundEnabled);
        await typeText('│   (Apparently not excellent enough to stay in pharmacy)│', 'output', 15, soundEnabled);
        await typeText('│                                                      │', 'output', 5, soundEnabled);
        await typeText('│ • Self-Taught Programming                            │', 'output', 15, soundEnabled);
        await typeText('│   Mastered full-stack development &                  │', 'output', 15, soundEnabled);
        await typeText('│   computational methods through the time-honored     │', 'output', 15, soundEnabled);
        await typeText('│   tradition of Stack Overflow copy-pasting           │', 'output', 15, soundEnabled);
        await typeText('└──────────────────────────────────────────────────────┘', 'output', 5, soundEnabled);
        await typeText('', 'output', 5, soundEnabled);
        await typeText('┌─ RESEARCH INTERESTS ─────────────────────────────────┐', 'output', 5, soundEnabled);
        await typeText('│ • Computational Drug Discovery                       │', 'output', 15, soundEnabled);
        await typeText('│   (Finding new molecules that might not kill you)    │', 'output', 15, soundEnabled);
        await typeText('│ • Genomic Data Analysis                              │', 'output', 15, soundEnabled);
        await typeText('│   (Making sense of all those As, Ts, Gs, and Cs)     │', 'output', 15, soundEnabled);
        await typeText('│ • Machine Learning in Biology                        │', 'output', 15, soundEnabled);
        await typeText('│   (Teaching computers to do the boring parts)        │', 'output', 15, soundEnabled);
        await typeText('│ • Systems Biology                                    │', 'output', 15, soundEnabled);
        await typeText('│   (When studying one protein at a time isn\'t chaotic enough)│', 'output', 15, soundEnabled);
        await typeText('└──────────────────────────────────────────────────────┘', 'output', 5, soundEnabled);
        break;
        
      case 'contact':
        await typeText('📲 CONTACT INFORMATION', 'output', 15, soundEnabled);
        await typeText('─────────────────────', 'output', 5, soundEnabled);
        await typeText('', 'output', 5, soundEnabled);
        await typeText('Email:    your.email@example.com', 'output', 15, soundEnabled);
        await typeText('GitHub:   github.com/mahmoudxyz', 'output', 15, soundEnabled);
        await typeText('LinkedIn: linkedin.com/in/mahmoud', 'output', 15, soundEnabled);
        await typeText('', 'output', 5, soundEnabled);
        await typeText('Carrier pigeon: Currently unavailable (they\'re on strike)', 'output', 15, soundEnabled);
        await typeText('Telepathy: Not yet implemented (working on it)', 'output', 15, soundEnabled);
        await typeText('', 'output', 5, soundEnabled);
        await typeText('Feel free to reach out for collaboration opportunities, job offers with competitive salaries, or to tell me about that one typo you found!', 'output', 15, soundEnabled);
        break;
        
      case 'experience':
        await typeText('Loading professional timeline...', 'system', 15, soundEnabled);
        await wait(500);
        await typeText('┌─ PROFESSIONAL JOURNEY ─────────────────────────────────┐', 'output', 5, soundEnabled);
        await typeText('│                                                        │', 'output', 5, soundEnabled);
        await typeText('│ 2023 - Present  Senior Software Engineer               │', 'output', 15, soundEnabled);
        await typeText('│                 BioTech Innovations Inc.               │', 'output', 15, soundEnabled);
        await typeText('│                 Leading development of bioinformatics  │', 'output', 15, soundEnabled);
        await typeText('│                 tools while maintaining a stable       │', 'output', 15, soundEnabled);
        await typeText('│                 caffeine:blood ratio                   │', 'output', 15, soundEnabled);
        await typeText('│                                                        │', 'output', 5, soundEnabled);
        await typeText('│ 2021 - 2023     Bioinformatics Developer               │', 'output', 15, soundEnabled);
        await typeText('│                 Genomic Solutions                      │', 'output', 15, soundEnabled);
        await typeText('│                 Developed software for genomic data    │', 'output', 15, soundEnabled);
        await typeText('│                 analysis while explaining to people    │', 'output', 15, soundEnabled);
        await typeText('│                 that no, I can\'t hack their ex\'s      │', 'output', 15, soundEnabled);
        await typeText('│                 Facebook account                       │', 'output', 15, soundEnabled);
        await typeText('│                                                        │', 'output', 5, soundEnabled);
        await typeText('│ 2018 - 2021     Research Pharmacist                    │', 'output', 15, soundEnabled);
        await typeText('│                 Central Research Hospital              │', 'output', 15, soundEnabled);
        await typeText('│                 Conducted pharmaceutical research      │', 'output', 15, soundEnabled);
        await typeText('│                 while slowly realizing that pipettes   │', 'output', 15, soundEnabled);
        await typeText('│                 and I were never meant to be together  │', 'output', 15, soundEnabled);
        await typeText('└────────────────────────────────────────────────────────┘', 'output', 5, soundEnabled);
        await typeText('', 'output', 5, soundEnabled);
        await typeText('For a more detailed view of my experience, try:', 'system', 15, soundEnabled);
        await typeText('read ~/experience.json', 'system', 15, soundEnabled);
        break;
        
      case 'joke':
        const jokesFile = JSON.parse(fileContent['~/.hidden/jokes.json']);
        const randomJoke = jokesFile.jokes[Math.floor(Math.random() * jokesFile.jokes.length)];
        
        await typeText('Retrieving humor module...', 'system', 15, soundEnabled);
        await wait(400);
        await typeText(randomJoke, 'output', 15, soundEnabled);
        await typeText('', 'output', 5, soundEnabled);
        await typeText('(I\'ll be here all week. Try the veal!)', 'output', 15, soundEnabled);
        break;
        
      case 'blog':
        if (args.length > 0 && args[0].startsWith('--read=')) {
          const blogId = args[0].split('=')[1];
          
          switch(blogId) {
            case '1':
              await typeText('Loading blog post...', 'system', 15, soundEnabled);
              await typeText(fileContent['~/blog/why-i-left-pharmacy.md'], 'output', 15, soundEnabled);
              break;
            case '2':
              await typeText('Loading blog post...', 'system', 15, soundEnabled);
              await typeText(fileContent['~/blog/learning-to-code.md'], 'output', 15, soundEnabled);
              break;
            case '3':
              await typeText('Loading blog post...', 'system', 15, soundEnabled);
              await typeText(fileContent['~/blog/bioinformatics-future.md'], 'output', 15, soundEnabled);
              break;
            default:
              await typeText(`Error: Blog post ${blogId} not found.`, 'error', 15, soundEnabled);
              await typeText('Available blog posts: 1, 2, 3', 'system', 15, soundEnabled);
          }
        } else {
          await typeText('📝 BLOG POSTS', 'output', 15, soundEnabled);
          await typeText('────────────', 'output', 5, soundEnabled);
          await typeText('', 'output', 5, soundEnabled);
          await typeText('┌─ 1 ──────────────────────────────────────────────────┐', 'output', 5, soundEnabled);
          await typeText('│ Why I Left Pharmacy for Programming                  │', 'output', 15, soundEnabled);
          await typeText('│ Date: 2023-07-15                                     │', 'output', 15, soundEnabled);
          await typeText('│                                                      │', 'output', 5, soundEnabled);
          await typeText('│ My journey from dispensing medications to            │', 'output', 15, soundEnabled);
          await typeText('│ debugging code, and why I don\'t regret it (mostly)  │', 'output', 15, soundEnabled);
          await typeText('└──────────────────────────────────────────────────────┘', 'output', 5, soundEnabled);
          await typeText('', 'output', 5, soundEnabled);
          await typeText('┌─ 2 ──────────────────────────────────────────────────┐', 'output', 5, soundEnabled);
          await typeText('│ My Self-Taught Coding Journey                        │', 'output', 15, soundEnabled);
          await typeText('│ Date: 2023-09-23                                     │', 'output', 15, soundEnabled);
          await typeText('│                                                      │', 'output', 5, soundEnabled);
          await typeText('│ Learning to code when coming from a science          │', 'output', 15, soundEnabled);
          await typeText('│ background, and why I now talk to my computer        │', 'output', 15, soundEnabled);
          await typeText('└──────────────────────────────────────────────────────┘', 'output', 5, soundEnabled);
          await typeText('', 'output', 5, soundEnabled);
          await typeText('┌─ 3 ──────────────────────────────────────────────────┐', 'output', 5, soundEnabled);
          await typeText('│ The Future of Bioinformatics                         │', 'output', 15, soundEnabled);
          await typeText('│ Date: 2024-01-10                                     │', 'output', 15, soundEnabled);
          await typeText('│                                                      │', 'output', 5, soundEnabled);
          await typeText('│ My predictions for where computational biology       │', 'output', 15, soundEnabled);
          await typeText('│ is headed (assuming our servers don\'t crash)        │', 'output', 15, soundEnabled);
          await typeText('└──────────────────────────────────────────────────────┘', 'output', 5, soundEnabled);
          await typeText('', 'output', 5, soundEnabled);
          await typeText('To read a blog post, use:', 'system', 15, soundEnabled);
          await typeText('blog --read=N (where N is the blog post number)', 'system', 15, soundEnabled);
          await typeText('You can also browse the blogs with: cd ~/blog', 'system', 15, soundEnabled);
        }
        break;
        
      case 'sound':
        if (args.length > 0) {
          if (args[0].toLowerCase() === 'on') {
            setSoundEnabled(true);
            await typeText('Sound effects enabled. Enjoy the nostalgic clickety-clack!', 'system', 15, true);
          } else if (args[0].toLowerCase() === 'off') {
            setSoundEnabled(false);
            await typeText('Sound effects disabled. Silence is golden.', 'system', 15, false);
          } else {
            await typeText(`Invalid argument: ${args[0]}. Use 'on' or 'off'.`, 'error', 15, soundEnabled);
          }
        } else {
          await typeText(`Sound effects are currently ${soundEnabled ? 'enabled' : 'disabled'}.`, 'system', 15, soundEnabled);
          await typeText('Usage: sound on|off', 'system', 15, soundEnabled);
        }
        break;
        
      case 'time':
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        const formattedTime = now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
        
        await typeText(`Current date: ${formattedDate}`, 'output', 15, soundEnabled);
        await typeText(`Current time: ${formattedTime}`, 'output', 15, soundEnabled);
        await typeText('Timezone: Probably yours, unless you\'re using a VPN', 'output', 15, soundEnabled);
        break;
        
      case 'whoami':
        await typeText('Executing identity verification...', 'system', 15, soundEnabled);
        await wait(500);
        await typeText('You are a curious visitor exploring my interactive terminal portfolio.', 'output', 15, soundEnabled);
        await typeText('', 'output', 5, soundEnabled);
        await typeText('Unless, of course, you\'re me, in which case: Hi, me! Why are you reading your own portfolio? Shouldn\'t you be coding something?', 'output', 15, soundEnabled);
        break;
        
      case 'version':
        await typeText('BioTech_OS Terminal v4.2.0', 'output', 15, soundEnabled);
        await typeText('© 2024 Mahmoud\'s Portfolio Solutions LLC (not a real company)', 'output', 15, soundEnabled);
        await typeText('Licensed under the "Please Don\'t Sue Me For Using A Terminal Interface" license', 'output', 15, soundEnabled);
        await typeText('', 'output', 5, soundEnabled);
        await typeText('Build date: Yesterday (temporal anomaly detected)', 'output', 15, soundEnabled);
        await typeText('Running on: React Framework + Excessive Amounts of State', 'output', 15, soundEnabled);
        break;
        
      case 'weather':
        await typeText('Fetching current weather data...', 'system', 15, soundEnabled);
        await wait(700);
        await typeText('┌─ CURRENT WEATHER ─────────────────────────────────────┐', 'output', 5, soundEnabled);
        await typeText('│                                                       │', 'output', 5, soundEnabled);
        await typeText(`│ Condition:    ${weatherData.condition}                ${' '.repeat(39 - weatherData.condition.length)}│`, 'output', 15, soundEnabled);
        await typeText(`│ Temperature:  ${weatherData.temperature}              ${' '.repeat(39 - weatherData.temperature.length)}│`, 'output', 15, soundEnabled);
        await typeText(`│ Humidity:     ${weatherData.humidity}                 ${' '.repeat(39 - weatherData.humidity.length)}│`, 'output', 15, soundEnabled);
        await typeText(`│ Wind:         ${weatherData.wind}                     ${' '.repeat(39 - weatherData.wind.length)}│`, 'output', 15, soundEnabled);
        await typeText('│                                                       │', 'output', 5, soundEnabled);
        await typeText('│ Note: Weather data is totally made up because this    │', 'output', 15, soundEnabled);
        await typeText('│ is just a portfolio site. It\'s always sunny in the   │', 'output', 15, soundEnabled);
        await typeText('│ land of make-believe terminal websites.               │', 'output', 15, soundEnabled);
        await typeText('└───────────────────────────────────────────────────────┘', 'output', 5, soundEnabled);
        break;
        
      case 'quote':
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        
        if (!easterEggsFound.quote) {
          setEasterEggsFound(prev => ({...prev, quote: true}));
          showNotification('Easter Egg Found: Quote Machine!', 'success', 3000);
        }
        
        await typeText('Accessing wisdom database...', 'system', 15, soundEnabled);
        await wait(500);
        await typeText(randomQuote, 'output', 20, soundEnabled);
        break;
        
      case 'neofetch':
        if (!easterEggsFound.neofetch) {
          setEasterEggsFound(prev => ({...prev, neofetch: true}));
          showNotification('Easter Egg Found: System Info!', 'success', 3000);
        }
        
        await typeText('Fetching system information...', 'system', 15, soundEnabled);
        await wait(500);
        
        const logo = [
          '       .--.     ',
          '      |o_o |    ',
          '      |:_/ |    ',
          '     //   \\ \\   ',
          '    (|     | )  ',
          '   /\'\\_   _/`\\  ',
          '   \\___)=(___/  '
        ];
        
        const systemInfo = [
          'OS: BioTech_OS Terminal v4.2.0',
          'Host: Portfolio Website',
          'Kernel: React.js 18.2.0',
          'Uptime: ' + Math.floor(Math.random() * 24) + ' hours, ' + Math.floor(Math.random() * 60) + ' minutes',
          'Packages: 420 (npm)',
          'Shell: ShellScript v2.0',
          'Resolution: Who knows',
          'DE: Terminal',
          'CPU: Brain (8) @ 4.2GHz',
          'GPU: Imagination RTX 3090',
          'Memory: 640K (should be enough for anybody)'
        ];
        
        for (let i = 0; i < Math.max(logo.length, systemInfo.length); i++) {
          let line = '';
          
          if (i < logo.length) {
            line += logo[i];
          } else {
            line += ' '.repeat(16);
          }
          
          if (i < systemInfo.length) {
            line += systemInfo[i];
          }
          
          await typeText(line, 'output', 10, soundEnabled);
        }
        break;
        
      case 'rm':
        if (args.length === 0) {
          await typeText('Usage: rm <filename>', 'error', 15, soundEnabled);
          break;
        }
        
        if (args[0] === '-rf' || args.includes('--force')) {
          await typeText('Nice try! This is a read-only filesystem. Nothing was deleted.', 'error', 15, soundEnabled);
          await typeText('(Did you really think I\'d let you delete my portfolio files?)', 'output', 15, soundEnabled);
        } else {
          await typeText(`Error: Cannot remove '${args[0]}'. Permission denied.`, 'error', 15, soundEnabled);
          await typeText('This is a read-only filesystem. You can look, but not touch.', 'system', 15, soundEnabled);
        }
        break;
        
      case 'history':
        if (commandHistory.length === 0) {
          await typeText('No command history yet.', 'output', 15, soundEnabled);
          break;
        }
        
        await typeText('COMMAND HISTORY:', 'output', 15, soundEnabled);
        
        // We'll show the last 10 commands
        const historyToShow = commandHistory.slice(-10);
        historyToShow.forEach(async (cmd, i) => {
          await typeText(`${commandHistory.length - historyToShow.length + i + 1}  ${cmd}`, 'output', 5, soundEnabled);
        });
        break;
        
      case 'dance':
        if (!easterEggsFound.dance) {
          setEasterEggsFound(prev => ({...prev, dance: true}));
          showNotification('Easter Egg Found: Dance Party!', 'success', 3000);
        }
        
        await typeText('Initializing dance protocol...', 'system', 15, soundEnabled);
        await wait(500);
        
        const danceSequence = [
          '(•_•)',
          '( •_•)>⌐■-■',
          '(⌐■_■)',
          '♪~ ┌(⌐■_■)┘♪',
          '♪~ ┌(⌐■_■)┘♪ ♪~ ┏(⌐■_■)┓♪',
          '♪~ ┗(⌐■_■)┛♪ ♪~ ┏(⌐■_■)┛♪ ♪~ ┗(⌐■_■)┓♪',
          '(⌐■_■)',
          '( •_•)>⌐■-■',
          '(•_•)',
          '(•◡•)'
        ];
        
        for (const frame of danceSequence) {
          await typeText(frame, 'output', 5, soundEnabled);
          await wait(300);
        }
        
        await typeText('Dance complete. I hope that was worth the keystrokes.', 'system', 15, soundEnabled);
        break;
        
      case 'molecule':
        if (!easterEggsFound.molecule) {
          setEasterEggsFound(prev => ({...prev, molecule: true}));
          showNotification('Easter Egg Found: Molecule Viewer!', 'success', 3000);
        }
        
        await typeText('Initializing molecular visualization...', 'system', 15, soundEnabled);
        await wait(700);
        setIs3DActive(true);
        
        await typeText('3D molecule visualization active. Use mouse to rotate and scroll to zoom.', 'system', 15, soundEnabled);
        await typeText('This is a pyridine molecule - a nitrogen-containing aromatic ring.', 'output', 15, soundEnabled);
        break;
        
      case 'snake':
      case 'game':
        if (!easterEggsFound.game) {
          setEasterEggsFound(prev => ({...prev, game: true}));
          showNotification('Easter Egg Found: Snake Game!', 'success', 3000);
        }
        
        await typeText('Launching snake game...', 'system', 15, soundEnabled);
        await typeText('Use arrow keys to control the snake.', 'system', 15, soundEnabled);
        await typeText('Press ESC to exit the game.', 'system', 15, soundEnabled);
        await wait(500);
        
        startGame();
        break;
        
      case 'textsize':
        if (args.length === 0) {
          await typeText(`Current text size: ${textSize}`, 'output', 15, soundEnabled);
          await typeText('Usage: textsize <sm|md|lg|xl>', 'output', 15, soundEnabled);
          break;
        }
        
        const newSize = args[0].toLowerCase();
        if (['sm', 'md', 'lg', 'xl'].includes(newSize)) {
          setTextSize(newSize);
          await typeText(`Text size changed to ${newSize}`, 'system', 15, soundEnabled);
        } else {
          await typeText(`Invalid size: ${newSize}. Use sm, md, lg, or xl.`, 'error', 15, soundEnabled);
        }
        break;
        
      case 'opacity':
        if (args.length === 0) {
          await typeText(`Current opacity: ${terminalOpacity * 100}%`, 'output', 15, soundEnabled);
          await typeText('Usage: opacity <0-100>', 'output', 15, soundEnabled);
          break;
        }
        
        const newOpacity = parseInt(args[0], 10);
        if (isNaN(newOpacity) || newOpacity < 0 || newOpacity > 100) {
          await typeText(`Invalid opacity: ${args[0]}. Use a number between 0 and 100.`, 'error', 15, soundEnabled);
        } else {
          setTerminalOpacity(newOpacity / 100);
          await typeText(`Terminal opacity set to ${newOpacity}%`, 'system', 15, soundEnabled);
        }
        break;
        
      case 'clear':
        setTerminalContent([]);
        break;
        
      case 'list':
      case 'ls':
      case 'dir':
        // Get target directory
        const targetDir = args.length > 0 ? 
          (args[0].startsWith('/') || args[0].startsWith('~') ? 
            args[0] : 
            `${directory}/${args[0]}`) :
          directory;
          
        // Check if directory exists
        if (!fileSystem[targetDir]) {
          await typeText(`ls: cannot access '${targetDir}': No such file or directory (or I made a mistake in my mock file system)`, 'error', 15, soundEnabled);
          break;
        }
        
        // Check for flags
        const showHidden = args.includes('-a') || args.includes('--all');
        const showLong = args.includes('-l');
        const showHumanReadable = args.includes('-h');
        
        // Display directory contents
        const contents = getDirectoryContent(targetDir);
        
        await typeText(`Contents of ${targetDir}:`, 'output', 15, soundEnabled);
        
        if (contents.length === 0) {
          await typeText('  (empty directory... how minimalist of you)', 'output', 15, soundEnabled);
        } else {
          // Group by type
          const dirs = contents.filter(item => 
            (fileSystem[`${targetDir}/${item}`] || fileSystem[item]) && 
            (showHidden || !item.startsWith('.')));
            
          const files = contents.filter(item => 
            (!fileSystem[`${targetDir}/${item}`] && !fileSystem[item]) && 
            (showHidden || !item.startsWith('.')));
          
          // Display directories first
          if (dirs.length > 0) {
            await typeText('Directories:', 'output', 15, soundEnabled);
            for (const dir of dirs) {
              if (showLong) {
                const date = new Date();
                date.setDate(date.getDate() - Math.floor(Math.random() * 30));
                const dateStr = date.toLocaleString('en-US', { 
                  month: 'short', 
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                });
                
                await typeText(`drwxr-xr-x  2 mahmoud users  4096 ${dateStr}  ${dir}/`, 'output', 5, soundEnabled);
              } else {
                await typeText(`  📁 ${dir}/`, 'output', 5, soundEnabled);
              }
            }
          }
          
          // Then files
          if (files.length > 0) {
            await typeText('Files:', 'output', 15, soundEnabled);
            for (const file of files) {
              let icon = '📄';
              if (file.endsWith('.md')) icon = '📝';
              if (file.endsWith('.json')) icon = '📊';
              if (file.endsWith('.txt')) icon = '📃';
              if (file.endsWith('.js')) icon = '📜';
              if (file.endsWith('.jsx')) icon = '⚛️';
              
              if (showLong) {
                const size = Math.floor(Math.random() * 10000) + 1000;
                const sizeStr = showHumanReadable ? 
                  (size > 1024 ? `${(size / 1024).toFixed(1)}K` : `${size}`) : 
                  size.toString();
                
                const date = new Date();
                date.setDate(date.getDate() - Math.floor(Math.random() * 30));
                const dateStr = date.toLocaleString('en-US', { 
                  month: 'short', 
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                });
                
                await typeText(`-rw-r--r--  1 mahmoud users  ${sizeStr} ${dateStr}  ${file}`, 'output', 5, soundEnabled);
              } else {
                await typeText(`  ${icon} ${file}`, 'output', 5, soundEnabled);
              }
            }
          }
          
          // Show count if using -l flag
          if (showLong) {
            await typeText(`Total: ${dirs.length + files.length} items`, 'output', 15, soundEnabled);
          }
        }
        break;
        
      case 'cd':
        if (args.length === 0) {
          // cd without args goes to home
          setDirectory('~');
          await typeText('Changed directory to ~ (home sweet home)', 'system', 15, soundEnabled);
        } else {
          const newDir = changeDirectory(args[0]);
          if (newDir === directory) {
            await typeText(`cd: ${args[0]}: No such file or directory (or I messed up my own file system)`, 'error', 15, soundEnabled);
          } else {
            setDirectory(newDir);
            await typeText(`Changed directory to ${newDir}`, 'system', 15, soundEnabled);
          }
        }
        break;
        
      case 'pwd':
        await typeText(directory, 'output', 15, soundEnabled);
        await typeText('(That\'s your current directory, in case you got lost in my file system)', 'output', 15, soundEnabled);
        break;
        
      case 'read':
      case 'cat':
      case 'more':
      case 'less':
        if (args.length === 0) {
          await typeText('Usage: read <filename>', 'error', 15, soundEnabled);
          await typeText('Example: read ~/about.md', 'system', 15, soundEnabled);
          break;
        }
        
        // Determine file path
        const filePath = args[0].startsWith('/') || args[0].startsWith('~') ? 
          args[0] : 
          `${directory}/${args[0]}`;
          
        // Check if file exists and read content
        const content = readFile(filePath);
        if (content.startsWith('Error:')) {
          await typeText(content, 'error', 15, soundEnabled);
        } else {
          // Display content with proper formatting for different file types
          if (filePath.endsWith('.md')) {
            // Simple markdown rendering
            const lines = content.split('\n');
            for (const line of lines) {
              if (line.startsWith('# ')) {
                await typeText(`📌 ${line.substring(2)}`, 'output', 10, soundEnabled);
                await typeText('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'output', 5, soundEnabled);
              } else if (line.startsWith('## ')) {
                await typeText(`🔹 ${line.substring(3)}`, 'output', 10, soundEnabled);
                await typeText('─────────────────────────────────────────', 'output', 5, soundEnabled);
              } else if (line.startsWith('- ')) {
                await typeText(`• ${line.substring(2)}`, 'output', 15, soundEnabled);
              } else {
                await typeText(line, 'output', 15, soundEnabled);
              }
            }
          } else if (filePath.endsWith('.json')) {
            // Pretty-print JSON
            try {
              const jsonObj = JSON.parse(content);
              const prettyJson = JSON.stringify(jsonObj, null, 2);
              
              // Split by lines and add syntax highlighting
              const lines = prettyJson.split('\n');
              for (const line of lines) {
                // Simple syntax highlighting
                let highlightedLine = line;
                
                // Highlight keys
                highlightedLine = highlightedLine.replace(/"([^"]+)":/g, '"%c$1%c":');
                
                if (line.includes('"')) {
                  await typeText(highlightedLine, 'output', 5, soundEnabled);
                } else {
                  await typeText(highlightedLine, 'output', 5, soundEnabled);
                }
              }
            } catch (e) {
              await typeText(content, 'output', 10, soundEnabled);
            }
          } else if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
            // Display code with syntax highlighting
            await typeText('```' + (filePath.endsWith('.js') ? 'javascript' : 'jsx'), 'output', 5, soundEnabled);
            await typeText(content, 'output', 5, soundEnabled);
            await typeText('```', 'output', 5, soundEnabled);
          } else {
            // Plain text
            await typeText(content, 'output', 15, soundEnabled);
          }
        }
        break;
        
      case 'theme':
        if (args.length === 0) {
          await typeText(`Current theme: ${theme}`, 'output', 15, soundEnabled);
          await typeText('Available themes: indigo, matrix, midnight, synthwave, coffee', 'output', 15, soundEnabled);
          await typeText('Usage: theme <name>', 'output', 15, soundEnabled);
          break;
        }
        
        const newTheme = args[0].toLowerCase();
        if (['indigo', 'matrix', 'midnight', 'synthwave', 'coffee'].includes(newTheme)) {
          setTheme(newTheme);
          await typeText(`Theme changed to ${newTheme}. Hope it's easy on your eyes.`, 'system', 15, soundEnabled);
          
          if (newTheme === 'matrix') {
            // Special effect for matrix theme
            await typeText('Initializing matrix sequence...', 'output', 15, soundEnabled);
            for (let i = 0; i < 5; i++) {
              let line = '';
              for (let j = 0; j < 50; j++) {
                if (Math.random() > 0.5) {
                  line += Math.random() > 0.7 ? "1" : "0";
                } else {
                  line += " ";
                }
              }
              await typeText(line, 'output', 5, soundEnabled);
            }
            await typeText('Matrix mode engaged. There is no spoon.', 'system', 15, soundEnabled);
            
            if (!easterEggsFound.matrix) {
              setEasterEggsFound(prev => ({...prev, matrix: true}));
              showNotification('Easter Egg Found: Matrix Theme!', 'success', 3000);
            }
          }
        } else {
          await typeText(`Unknown theme: ${newTheme}. Are you trying to invent a new color scheme?`, 'error', 15, soundEnabled);
          await typeText('Available themes: indigo, matrix, midnight, synthwave, coffee', 'output', 15, soundEnabled);
        }
        break;
        
      case 'mode':
      case 'vim':
      case 'emacs':
        const newMode = resolvedCommand === 'mode' ? 
          (args.length > 0 ? args[0].toLowerCase() : 'normal') : 
          resolvedCommand;
          
        if (['normal', 'vim', 'emacs'].includes(newMode)) {
          setCommandMode(newMode);
          await typeText(`Command mode changed to ${newMode}`, 'system', 15, soundEnabled);
          
          if (newMode === 'vim') {
            await typeText('Vim mode activated. Use : instead of $ for commands. Press ESC to... oh wait, that won\'t do anything.', 'system', 15, soundEnabled);
          } else if (newMode === 'emacs') {
            await typeText('Emacs mode activated. M-x prefix now used for commands. The good news is you won\'t need to memorize 500 keyboard shortcuts here.', 'system', 15, soundEnabled);
          }
        } else {
          await typeText(`Unknown mode: ${newMode}. Did you make that up?`, 'error', 15, soundEnabled);
          await typeText('Available modes: normal, vim, emacs', 'output', 15, soundEnabled);
        }
        break;
        
      case 'matrix':
        if (!easterEggsFound.matrix) {
          setEasterEggsFound(prev => ({...prev, matrix: true}));
          showNotification('Easter Egg Found: Matrix Mode!', 'success', 3000);
        }
        
        await typeText('Initializing matrix visualization...', 'system', 15, soundEnabled);
        await wait(800);
        
        setTheme('matrix');
        
        for (let i = 0; i < 12; i++) {
          let line = '';
          for (let j = 0; j < 60; j++) {
            line += Math.random() > 0.5 ? (Math.random() > 0.7 ? "1" : "0") : " ";
          }
          await typeText(line, 'output', 10, soundEnabled);
        }
        await typeText('The Matrix has you...', 'output', 15, soundEnabled);
        await wait(500);
        await typeText('Follow the white rabbit.', 'output', 15, soundEnabled);
        await wait(1000);
        await typeText('Knock, knock, Neo.', 'output', 15, soundEnabled);
        break;
        
      case 'biotech':
        if (!easterEggsFound.biotech) {
          setEasterEggsFound(prev => ({...prev, biotech: true}));
          showNotification('Easter Egg Found: Biotech Sequence!', 'success', 3000);
        }
        
        await typeText('🧬 Initiating BioTech sequence...', 'system', 15, soundEnabled);
        await wait(500);
        await typeText('ATGCAGGCTATCGCTAGCTAGGCTTAAGGCTACGTACGTAGCTAGCTAGCTAGCTAGCG', 'output', 5, soundEnabled);
        await typeText('TACGTACGTATCGATCGATCGATCGATCGATGCTAGCTAGCTAGCTAGCCGCGCATTAA', 'output', 5, soundEnabled);
        await typeText('', 'output', 5, soundEnabled);
        await typeText('Sequence validated. (Or at least it looks sciency enough)', 'system', 15, soundEnabled);
        await wait(400);
        await typeText('Computing protein structure... (pretending to do complex science)', 'system', 15, soundEnabled);
        await wait(700);
        
        // Simple ASCII art of DNA
        await typeText('      A---T---G---C---A---G', 'output', 10, soundEnabled);
        await typeText('      |   |   |   |   |   |', 'output', 10, soundEnabled);
        await typeText('    --T---A---C---G---T---C--', 'output', 10, soundEnabled);
        await typeText('    |                       |', 'output', 10, soundEnabled);
        await typeText('    |                       |', 'output', 10, soundEnabled);
        await typeText('    --A---T---G---C---A---G--', 'output', 10, soundEnabled);
        await typeText('      |   |   |   |   |   |', 'output', 10, soundEnabled);
        await typeText('      T---A---C---G---T---C', 'output', 10, soundEnabled);
        
        await typeText('', 'output', 5, soundEnabled);
        await typeText('You found a bioinformatics easter egg! This makes you officially a nerd.', 'system', 15, soundEnabled);
        await typeText('Congratulations! You can now put "DNA Codebreaker" on your CV.', 'system', 15, soundEnabled);
        break;
        
      case 'visualize':
      case 'viz':
        await typeText('Initializing 3D skill visualization...', 'system', 15, soundEnabled);
        await wait(800);
        setVisualizerActive(true);
        await typeText('3D visualization active. Interactive skill network now visible.', 'system', 15, soundEnabled);
        await typeText('Use mouse to rotate and explore connections between biology and technology domains.', 'system', 15, soundEnabled);
        await typeText('(Note: If this were a real application, this would be a fancy D3.js force-directed graph)', 'system', 15, soundEnabled);
        break;
        
      case '42':
        await typeText('Computing the Answer to the Ultimate Question of Life, the Universe, and Everything...', 'system', 15, soundEnabled);
        await wait(1500);
        await typeText('42', 'output', 15, soundEnabled);
        await wait(500);
        await typeText('But what was the question? Something about mice, I think.', 'output', 15, soundEnabled);
        await typeText('Don\'t panic and always carry a towel.', 'output', 15, soundEnabled);
        break;
        
      case 'coffee':
        if (!easterEggsFound.coffee) {
          setEasterEggsFound(prev => ({...prev, coffee: true}));
          showNotification('Easter Egg Found: Coffee Break!', 'success', 3000);
        }
        
        await typeText('Brewing coffee...', 'system', 15, soundEnabled);
        await wait(800);
        
        // Coffee ASCII art
        await typeText('      ) (', 'output', 10, soundEnabled);
        await typeText('     (   ) )', 'output', 10, soundEnabled);
        await typeText('      ) ( (', 'output', 10, soundEnabled);
        await typeText('    _______)_', 'output', 10, soundEnabled);
        await typeText(' .-\'---------|  ', 'output', 10, soundEnabled);
        await typeText('( C|/\\/\\/\\/\\/|', 'output', 10, soundEnabled);
        await typeText(' \'-./\\/\\/\\/\\/|', 'output', 10, soundEnabled);
        await typeText('   \'_________\'', 'output', 10, soundEnabled);
        await typeText('    \'-------\'', 'output', 10, soundEnabled);
        
        await wait(500);
        await typeText('Error: Coffee module not found. Out of coffee beans.', 'error', 15, soundEnabled);
        await typeText('Please insert actual coffee into cup holder. Or buy me one if you like this portfolio.', 'system', 15, soundEnabled);
        
        // Easter egg - change to coffee theme
        setTheme('coffee');
        await typeText('Coffee theme activated! Feeling caffeinated yet?', 'system', 15, soundEnabled);
        break;
        
      case 'sudo':
        await typeText('Permission denied: Nice try, but root privileges are not required to explore my portfolio.', 'error', 15, soundEnabled);
        await wait(300);
        await typeText('⚠️ Unauthorized access attempt logged', 'system', 15, soundEnabled);
        await wait(500);
        await typeText('Just kidding. But seriously, no sudo for you. I\'ve seen what happens when people get root access to portfolios.', 'output', 15, soundEnabled);
        break;
        
      case 'hack':
        await typeText('INITIATING HACK SEQUENCE...', 'system', 15, soundEnabled);
        await wait(500);
        
        // Fake hacking sequence
        for (let i = 0; i < 5; i++) {
          await typeText(`Bypassing security layer ${i+1}...`, 'system', 10, soundEnabled);
          await wait(300);
          await typeText(`[${'#'.repeat(i+1)}${'.'.repeat(4-i)}] ${Math.floor((i+1)/5*100)}%`, 'output', 10, soundEnabled);
          await wait(500);
        }
        
        await typeText('ACCESS GRANTED', 'system', 15, soundEnabled);
        await wait(700);
        await typeText('Just kidding! No systems were harmed in this demonstration.', 'output', 15, soundEnabled);
        await typeText('But it shows you have an exploratory mindset - an excellent quality for both biology and programming!', 'output', 15, soundEnabled);
        await typeText('This portfolio does not contain real hacking tools. Please hack responsibly, and preferably with permission.', 'output', 15, soundEnabled);
        break;
        
      case 'tetris':
        await typeText('Launching Tetris...', 'system', 15, soundEnabled);
        await wait(800);
        await typeText('Sorry, Tetris is not available in this terminal. I haven\'t implemented it because I value my sanity.', 'output', 15, soundEnabled);
        await typeText('Try the snake game instead! Type "snake" to play.', 'output', 15, soundEnabled);
        break;
        
      case 'exit':
      case 'quit':
        await typeText('This terminal is your gateway to my profile. Try exploring with "help" instead.', 'output', 15, soundEnabled);
        await typeText('Use browser navigation or close the tab to exit this page. I promise I won\'t be offended. Much.', 'system', 15, soundEnabled);
        break;
        
      case 'refresh':
      case 'reload':
        await typeText('Refreshing terminal...', 'system', 15, soundEnabled);
        await wait(500);
        window.location.reload();
        break;
        
      default:
        if (commandMode === 'vim' && mainCommand.startsWith(':')) {
          // Vim-style commands
          const vimCommand = mainCommand.substring(1);
          if (vimCommand === 'q' || vimCommand === 'quit') {
            await typeText('Exiting vim mode. If only it were this easy in the real vim...', 'system', 15, soundEnabled);
            setCommandMode('normal');
          } else if (vimCommand === 'w') {
            await typeText('File saved. (Just kidding, nothing was saved. This is a read-only terminal.)', 'system', 15, soundEnabled);
          } else if (vimCommand === 'wq') {
            await typeText('File saved and exiting vim mode. You have now escaped vim faster than 90% of first-time users.', 'system', 15, soundEnabled);
            setCommandMode('normal');
          } else if (vimCommand === 'q!') {
            await typeText('Force quitting vim mode. No documents were harmed in this process.', 'system', 15, soundEnabled);
            setCommandMode('normal');
          } else {
            await typeText(`Unknown vim command: ${vimCommand}. Don't worry, real vim has about 50 more ways to confuse you.`, 'error', 15, soundEnabled);
          }
        } else if (command.includes('--help')) {
          const baseCommand = command.split('--')[0].trim();
          await typeText(`Help for command '${baseCommand}':`, 'system', 15, soundEnabled);
          
          switch(baseCommand) {
            case 'skills':
              await typeText('skills             - Display skills overview', 'output', 15, soundEnabled);
              await typeText('skills --detail    - Show detailed breakdown of skills', 'output', 15, soundEnabled);
              await typeText('skills --interactive - Launch visual skill map', 'output', 15, soundEnabled);
              break;
            case 'projects':
              await typeText('projects           - List all projects', 'output', 15, soundEnabled);
              await typeText('projects --id=N    - View details for project number N', 'output', 15, soundEnabled);
              await typeText('projects --source  - View actual code samples', 'output', 15, soundEnabled);
              break;
            case 'about':
              await typeText('about              - Display brief introduction', 'output', 15, soundEnabled);
              await typeText('about --verbose    - Show comprehensive background', 'output', 15, soundEnabled);
              break;
            case 'blog':
              await typeText('blog               - List all blog posts', 'output', 15, soundEnabled);
              await typeText('blog --read=N      - Read blog post number N', 'output', 15, soundEnabled);
              break;
            default:
              await typeText(`No specific help available for '${baseCommand}'. Try 'help' for a list of commands.`, 'error', 15, soundEnabled);
          }
        } else {
          await typeText(`Command not found: ${command}. Type "help" for available commands.`, 'error', 15, soundEnabled);
          
          // Smart suggestions
          const similarCommands = Object.keys(commandAliases)
            .filter(cmd => cmd.includes(mainCommand) || mainCommand.includes(cmd))
            .slice(0, 3);
            
          if (similarCommands.length > 0) {
            await wait(300);
            await typeText('Did you mean:', 'system', 15, soundEnabled);
            similarCommands.forEach(async (cmd) => {
              await typeText(`  ${cmd}`, 'system', 15, soundEnabled);
            });
          }
          
          // Easter egg suggestion if close
          if (['hack', 'hak', 'hck', 'hak', 'haker'].includes(mainCommand.toLowerCase())) {
            await wait(300);
            await typeText('If you\'re trying to hack this terminal, just type "hack". I won\'t tell anyone.', 'system', 15, soundEnabled);
          }
        }
    }
  };
  
  // Handle form submission (command execution)
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    processCommand(input);
    setInput('');
  };
  
  // Tab completion
  const getCompletions = useCallback((partial) => {
    if (!partial) return [];
    
    const lowerPartial = partial.toLowerCase();
    
    // First check commands
    const matchingCommands = Object.keys(commandAliases)
      .filter(cmd => cmd.startsWith(lowerPartial))
      .sort();
      
    if (matchingCommands.length > 0) {
      return matchingCommands;
    }
    
    // Then check for file paths if input contains a path-like structure
    if (partial.includes('/')) {
      const parts = partial.split('/');
      const currentPart = parts.pop() || '';
      const dirPath = parts.join('/') || '~';
      
      // Get content of the directory
      const dirContent = fileSystem[dirPath]?.content || [];
      
      // Filter by current part
      return dirContent
        .filter(file => file.toLowerCase().startsWith(currentPart.toLowerCase()))
        .map(file => [...parts, file].join('/'))
        .sort();
    }
    
    return [];
  }, [commandAliases, fileSystem]);
  
  // Handle keyboard shortcuts and command history
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
      setShowCompletions(false);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (showCompletions) {
        setSelectedCompletion(prev => (prev > 0 ? prev - 1 : prev));
      } else if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (showCompletions) {
        setSelectedCompletion(prev => (prev < completions.length - 1 ? prev + 1 : prev));
      } else if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      
      if (showCompletions && completions.length > 0) {
        setInput(completions[selectedCompletion]);
        setShowCompletions(false);
      } else {
        // Get completions for current input
        const newCompletions = getCompletions(input);
        
        if (newCompletions.length === 1) {
          // If there's only one completion, use it
          setInput(newCompletions[0]);
        } else if (newCompletions.length > 1) {
          // Show completion options
          setCompletions(newCompletions);
          setSelectedCompletion(0);
          setShowCompletions(true);
        }
      }
    } else if (e.key === 'Escape') {
      setShowCompletions(false);
    } else if (e.ctrlKey && e.key === 'l') {
      // Ctrl+L clears the screen
      e.preventDefault();
      setTerminalContent([]);
    } else if (e.altKey && e.key === 't') {
      // Alt+T changes theme
      e.preventDefault();
      changeTheme();
    }
  };
  
  // Handle input change
  const handleInputChange = (e) => {
    setInput(e.target.value);
    setShowCompletions(false);
  };
  
  // Quick access commands for better UX
  const quickCommands = [
    { label: 'about', command: 'about' },
    { label: 'skills', command: 'skills' },
    { label: 'projects', command: 'projects' },
    { label: 'blog', command: 'blog' },
    { label: 'contact', command: 'contact' },
    { label: 'help', command: 'help --all' }
  ];
  
  // Get theme CSS variables
  const getThemeClasses = () => {
    switch (theme) {
      case 'matrix':
        return {
          bg: 'bg-black',
          terminalBg: 'bg-black',
          text: 'text-green-400',
          sidebarBg: 'bg-gray-900',
          commandText: 'text-green-500 font-bold',
          inputBg: 'bg-gray-900',
          systemText: 'text-green-300',
          errorText: 'text-red-400',
          borderColor: 'border-green-900',
          linkButtonBg: 'bg-green-700 hover:bg-green-600',
          linkTextColor: 'text-white',
          hoverBg: 'hover:bg-green-900',
          dotPattern: 'matrix-dot-pattern',
          rainColor: '#00FF00'
        };
      case 'midnight':
        return {
          bg: 'bg-gray-900',
          terminalBg: 'bg-gray-900',
          text: 'text-blue-300',
          sidebarBg: 'bg-gray-800',
          commandText: 'text-blue-400 font-bold',
          inputBg: 'bg-gray-800',
          systemText: 'text-yellow-300',
          errorText: 'text-red-400',
          borderColor: 'border-gray-700',
          linkButtonBg: 'bg-blue-600 hover:bg-blue-500',
          linkTextColor: 'text-white',
          hoverBg: 'hover:bg-gray-700',
          dotPattern: 'midnight-dot-pattern',
          rainColor: '#4F46E5'
        };
      case 'synthwave':
        return {
          bg: 'bg-purple-900',
          terminalBg: 'bg-gray-900',
          text: 'text-pink-300',
          sidebarBg: 'bg-purple-800',
          commandText: 'text-pink-500 font-bold',
          inputBg: 'bg-purple-900',
          systemText: 'text-cyan-300',
          errorText: 'text-red-400',
          borderColor: 'border-pink-700',
          linkButtonBg: 'bg-pink-600 hover:bg-pink-500',
          linkTextColor: 'text-white',
          hoverBg: 'hover:bg-purple-800',
          dotPattern: 'synthwave-dot-pattern',
          rainColor: '#EC4899'
        };
      case 'coffee':
        return {
          bg: 'bg-amber-900',
          terminalBg: 'bg-amber-800',
          text: 'text-amber-100',
          sidebarBg: 'bg-amber-950',
          commandText: 'text-amber-300 font-bold',
          inputBg: 'bg-amber-900',
          systemText: 'text-amber-200',
          errorText: 'text-red-300',
          borderColor: 'border-amber-700',
          linkButtonBg: 'bg-amber-600 hover:bg-amber-500',
          linkTextColor: 'text-white',
          hoverBg: 'hover:bg-amber-800',
          dotPattern: 'coffee-dot-pattern',
          rainColor: '#92400E'
        };
      default: // indigo
        return {
          bg: 'bg-gray-50',
          terminalBg: 'bg-white',
          text: 'text-gray-800',
          sidebarBg: 'bg-white',
          commandText: 'text-indigo-700 font-bold',
          inputBg: 'bg-gray-50',
          systemText: 'text-blue-600',
          errorText: 'text-red-600',
          borderColor: 'border-gray-200',
          linkButtonBg: 'bg-indigo-600 hover:bg-indigo-700',
          linkTextColor: 'text-white',
          hoverBg: 'hover:bg-indigo-50',
          dotPattern: 'indigo-dot-pattern',
          rainColor: '#4F46E5'
        };
    }
  };
  
  const themeClasses = getThemeClasses();
  
  // Handle file system toggle
  const toggleFileSystem = () => {
    setShowFileSystem(!showFileSystem);
  };
  
  // Get font size class based on textSize
  const getFontSizeClass = () => {
    switch (textSize) {
      case 'sm': return 'text-xs';
      case 'lg': return 'text-lg';
      case 'xl': return 'text-xl';
      default: return 'text-sm';
    }
  };
  
  const fontSizeClass = getFontSizeClass();
  
  // Count discovered easter eggs
  const countEasterEggs = () => {
    return Object.values(easterEggsFound).filter(Boolean).length;
  };
  
  // Get progress of easter egg discovery
  const getEasterEggProgress = () => {
    const total = Object.keys(easterEggsFound).length;
    const found = countEasterEggs();
    return (found / total) * 100;
  };
  
  // Easter egg progress bar class
  const getEasterEggProgressClass = () => {
    const progress = getEasterEggProgress();
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  // Scroll to bottom when terminal content changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalContent]);
  
  // Focus input field when initializing is complete
  useEffect(() => {
    if (!isInitializing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInitializing]);
  
  return (
    <div className={`min-h-screen flex flex-col ${themeClasses.bg}`}>
      {/* Matrix Rain Background - Positioned absolutely so it sits behind everything */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div id="matrix-rain"></div>
      </div>
      
      {/* Fixed Top Navigation - Only visible on mobile */}
      <div className={`md:hidden fixed top-0 left-0 right-0 ${themeClasses.sidebarBg} z-20 p-4 border-b ${themeClasses.borderColor} shadow-sm`}>
        <div className="flex justify-between items-center">
          <div className={`${themeClasses.commandText} font-mono font-bold`}>BioTech_OS</div>
          <div className="flex space-x-2">
            <button 
              className={`text-gray-800 p-2 rounded-md transition-colors ${themeClasses.hoverBg}`} 
              onClick={toggleFileSystem}
            >
              {showFileSystem ? 'Hide FS' : 'Show FS'}
            </button>
            <button 
              className={`text-gray-800 p-2 rounded-md transition-colors ${themeClasses.hoverBg}`} 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="pt-4 pb-2 space-y-2">
            {quickCommands.map((cmd) => (
              <button 
                key={cmd.command}
                className={`block w-full text-left px-4 py-2 ${themeClasses.text} font-mono ${themeClasses.hoverBg} rounded transition-colors border border-transparent hover:${themeClasses.borderColor}`}
                onClick={() => {
                  processCommand(cmd.command);
                  setIsMobileMenuOpen(false);
                }}
              >
                <span className={`${themeClasses.commandText} mr-2`}>$</span>
                {cmd.label}
              </button>
            ))}
            
            <div className={`border-t ${themeClasses.borderColor} my-2 pt-2`}>
              <button 
                className={`block w-full text-left px-4 py-2 ${themeClasses.text} font-mono ${themeClasses.hoverBg} rounded transition-colors border border-transparent hover:${themeClasses.borderColor}`}
                onClick={() => {
                  changeTheme();
                  setIsMobileMenuOpen(false);
                }}
              >
                <span className={`${themeClasses.commandText} mr-2`}>$</span>
                theme
              </button>
              <button 
                className={`block w-full text-left px-4 py-2 ${themeClasses.text} font-mono ${themeClasses.hoverBg} rounded transition-colors border border-transparent hover:${themeClasses.borderColor}`}
                onClick={() => {
                  processCommand('sound ' + (soundEnabled ? 'off' : 'on'));
                  setIsMobileMenuOpen(false);
                }}
              >
                <span className={`${themeClasses.commandText} mr-2`}>$</span>
                sound {soundEnabled ? 'off' : 'on'}
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row flex-1 pt-16 md:pt-0">
        {/* Desktop Side Nav */}
        <div className={`hidden md:block md:w-72 ${themeClasses.sidebarBg} border-r ${themeClasses.borderColor} p-6 shadow-sm`}>
          <div className={`${themeClasses.commandText} font-mono font-bold text-xl mb-8 flex items-center`}>
            <span className="mr-2">&#62;</span>BioTech_OS v4.2.0
          </div>
          
          {/* Stats section */}
          <div className={`mb-8 p-4 rounded-lg bg-opacity-10 ${themeClasses.inputBg} ${themeClasses.borderColor} border`}>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Terminal Stats</span>
              <span>{terminalTime.toLocaleTimeString()}</span>
            </div>
            
            <div className={`text-xs ${themeClasses.systemText} mb-2`}>
              Easter Eggs: {countEasterEggs()}/{Object.keys(easterEggsFound).length}
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className={`h-2 rounded-full ${getEasterEggProgressClass()}`} 
                style={{ width: `${getEasterEggProgress()}%` }} 
              ></div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>Commands: {commandHistory.length}</span>
              <span>Theme: {theme}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="text-xs uppercase text-gray-500 font-semibold mb-2 ml-2">Main Navigation</div>
            {quickCommands.map((cmd) => (
              <button 
                key={cmd.command}
                className={`block w-full text-left px-4 py-3 ${themeClasses.text} font-mono rounded-lg transition-all ${themeClasses.hoverBg} border border-transparent hover:${themeClasses.borderColor} hover:shadow-sm`}
                onClick={() => processCommand(cmd.command)}
              >
                <span className={`${themeClasses.commandText} mr-2`}>$</span>
                {cmd.label}
              </button>
            ))}
            <div className={`border-t ${themeClasses.borderColor} my-4`}></div>
            <div className="text-xs uppercase text-gray-500 font-semibold mb-2 ml-2">Terminal</div>
            <button 
              className={`block w-full text-left px-4 py-3 ${themeClasses.text} font-mono rounded-lg transition-all ${themeClasses.hoverBg} border border-transparent hover:${themeClasses.borderColor} hover:shadow-sm`}
              onClick={() => processCommand('skills --detail')}
            >
              <span className={`${themeClasses.commandText} mr-2`}>$</span>
              skills --detail
            </button>
            <button 
              className={`block w-full text-left px-4 py-3 ${themeClasses.text} font-mono rounded-lg transition-all ${themeClasses.hoverBg} border border-transparent hover:${themeClasses.borderColor} hover:shadow-sm`}
              onClick={() => changeTheme()}
            >
              <span className={`${themeClasses.commandText} mr-2`}>$</span>
              theme
            </button>
            <button 
              className={`block w-full text-left px-4 py-3 ${themeClasses.text} font-mono rounded-lg transition-all ${themeClasses.hoverBg} border border-transparent hover:${themeClasses.borderColor} hover:shadow-sm`}
              onClick={toggleFileSystem}
            >
              <span className={`${themeClasses.commandText} mr-2`}>$</span>
              {showFileSystem ? 'hide fs' : 'show fs'}
            </button>
            <button 
              className={`block w-full text-left px-4 py-3 ${themeClasses.text} font-mono rounded-lg transition-all ${themeClasses.hoverBg} border border-transparent hover:${themeClasses.borderColor} hover:shadow-sm`}
              onClick={() => processCommand('sound ' + (soundEnabled ? 'off' : 'on'))}
            >
              <span className={`${themeClasses.commandText} mr-2`}>$</span>
              sound {soundEnabled ? 'off' : 'on'}
            </button>
          </div>
          
          {/* File system browser */}
          {showFileSystem && (
            <div className={`mt-6 pt-4 border-t ${themeClasses.borderColor}`}>
              <div className="text-xs uppercase text-gray-500 font-semibold mb-2 ml-2">File System</div>
              <div className={`p-3 rounded-lg ${themeClasses.inputBg} ${themeClasses.text} font-mono text-sm max-h-64 overflow-y-auto`}>
                <div className="mb-2">
                  <span className={`${themeClasses.commandText}`}>~</span> (home)
                </div>
                <div className="ml-4 mb-1">
                  <span>📄 about.md</span>
                </div>
                <div className="ml-4 mb-1">
                  <span>📄 README.md</span>
                </div>
                <div className="ml-4 mb-1">
                  <span>📁 projects/</span>
                </div>
                <div className="ml-8 mb-1">
                  <span>📝 hydra-fp.md</span>
                </div>
                <div className="ml-8 mb-1">
                  <span>📝 biotech-os.md</span>
                </div>
                <div className="ml-8 mb-1">
                  <span>📝 gene-analyzer.md</span>
                </div>
                <div className="ml-8 mb-1">
                  <span>📜 quantum-seq.js</span>
                </div>
                <div className="ml-4 mb-1">
                  <span>📁 skills/</span>
                </div>
                <div className="ml-4 mb-1">
                  <span>📁 blog/</span>
                </div>
                <div className="ml-4 mb-1">
                  <span>📃 contact.txt</span>
                </div>
                <div className="ml-4 mb-1">
                  <span>📊 experience.json</span>
                </div>
                <div className="ml-4 mb-1">
                  <span className="text-gray-400">📁 .hidden/</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Try commands: list, cd, read
              </div>
            </div>
          )}
          
          {/* Call to action button at bottom */}
          <div className={`mt-8 pt-4 border-t ${themeClasses.borderColor}`}>
            <button 
              onClick={() => processCommand('contact')}
              className={`w-full py-3 ${themeClasses.linkButtonBg} ${themeClasses.linkTextColor} rounded-lg transition-colors shadow-sm font-medium flex items-center justify-center`}
            >
              Contact Me
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Main Terminal Content */}
        <div className="flex-1 md:flex md:items-center md:justify-center p-4">
          <div
            ref={terminalRef}
            className={`h-full md:h-auto md:max-h-[85vh] md:max-w-4xl md:mx-auto w-full ${themeClasses.terminalBg} ${themeClasses.text} font-mono p-6 overflow-y-auto relative rounded-lg md:shadow-lg border ${themeClasses.borderColor}`}
            style={{ opacity: terminalOpacity }}
          >
            {/* Background pattern */}
            <div 
              className="absolute inset-0 opacity-5 pointer-events-none" 
              style={{ 
                backgroundImage: theme === 'matrix' ?
                  'radial-gradient(rgba(0, 255, 0, 0.2) 9%, transparent 10%)' :
                  theme === 'midnight' ?
                  'radial-gradient(rgba(79, 70, 229, 0.15) 9%, transparent 10%)' :
                  theme === 'synthwave' ?
                  'radial-gradient(rgba(236, 72, 153, 0.15) 9%, transparent 10%)' :
                  theme === 'coffee' ?
                  'radial-gradient(rgba(146, 64, 14, 0.2) 9%, transparent 10%)' :
                  'radial-gradient(rgba(79, 70, 229, 0.2) 9%, transparent 10%)',
                backgroundPosition: '0 0',
                backgroundSize: '20px 20px'
              }}
            ></div>
            
            {/* Pre Terminal Content */}
            <div className={`flex items-center mb-6 border-b ${themeClasses.borderColor} pb-3 relative z-10`}>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              </div>
              <div className={`text-sm font-semibold ${themeClasses.commandText} ml-4 terminal-header`}>BioTech_OS Terminal v4.2.0</div>
              
              {/* Terminal status */}
              <div className="ml-auto text-xs">
                <span className={`font-mono ${themeClasses.systemText}`}>
                  {directory} | {theme} | {commandMode}
                </span>
              </div>
            </div>
            
            {/* Welcome Banner - Static info at the top */}
            <div className={`${theme === 'matrix' ? 'bg-green-900' : theme === 'midnight' ? 'bg-blue-900' : theme === 'synthwave' ? 'bg-purple-900' : theme === 'coffee' ? 'bg-amber-900' : 'bg-indigo-50'} border-l-4 ${theme === 'matrix' ? 'border-green-500' : theme === 'midnight' ? 'border-blue-500' : theme === 'synthwave' ? 'border-pink-500' : theme === 'coffee' ? 'border-amber-500' : 'border-indigo-500'} p-4 mb-6 rounded-r-md relative z-10`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className={`h-5 w-5 ${theme === 'matrix' ? 'text-green-300' : theme === 'midnight' ? 'text-blue-300' : theme === 'synthwave' ? 'text-pink-300' : theme === 'coffee' ? 'text-amber-300' : 'text-indigo-600'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className={`text-sm ${theme === 'matrix' ? 'text-green-100' : theme === 'midnight' ? 'text-blue-100' : theme === 'synthwave' ? 'text-pink-100' : theme === 'coffee' ? 'text-amber-100' : 'text-indigo-800'}`}>
                    Welcome to my interactive terminal. Type <span className={`font-mono ${theme === 'matrix' ? 'bg-green-800' : theme === 'midnight' ? 'bg-blue-800' : theme === 'synthwave' ? 'bg-purple-800' : theme === 'coffee' ? 'bg-amber-800' : 'bg-indigo-100'} px-1 rounded`}>help</span> to see available commands or try <span className={`font-mono ${theme === 'matrix' ? 'bg-green-800' : theme === 'midnight' ? 'bg-blue-800' : theme === 'synthwave' ? 'bg-purple-800' : theme === 'coffee' ? 'bg-amber-800' : 'bg-indigo-100'} px-1 rounded`}>about</span> to learn more about me.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Terminal Content */}
            <div className={`space-y-2 relative z-10 ${fontSizeClass}`}>
              {terminalContent.map((item, index) => (
                <div 
                  key={index} 
                  className={`${
                    item.type === 'command' ? themeClasses.commandText : 
                    item.type === 'error' ? themeClasses.errorText : 
                    item.type === 'system' ? themeClasses.systemText : 
                    themeClasses.text
                  } ${item.type === 'typing' ? 'terminal-typing' : ''} ${
                    item.type === 'command' ? `border-l-2 ${theme === 'matrix' ? 'border-green-600' : theme === 'midnight' ? 'border-blue-500' : theme === 'synthwave' ? 'border-pink-500' : theme === 'coffee' ? 'border-amber-600' : 'border-indigo-400'} pl-2` : ''
                  }`}
                >
                  {item.text}
                  {item.type === 'typing' && (
                    <span className={`inline-block w-2 h-4 ${theme === 'matrix' ? 'bg-green-400' : theme === 'midnight' ? 'bg-blue-400' : theme === 'synthwave' ? 'bg-pink-400' : theme === 'coffee' ? 'bg-amber-400' : 'bg-indigo-600'} ml-1 animate-pulse`}></span>
                  )}
                </div>
              ))}
            </div>
            
            {/* Tab Completions Dropdown */}
            {showCompletions && completions.length > 0 && (
              <div className={`mt-2 p-1 ${themeClasses.inputBg} border ${themeClasses.borderColor} rounded-md max-h-40 overflow-y-auto`}>
                {completions.map((completion, index) => (
                  <div 
                    key={index}
                    className={`px-2 py-1 cursor-pointer ${index === selectedCompletion ? `${themeClasses.hoverBg} font-bold` : ''}`}
                    onClick={() => {
                      setInput(completion);
                      setShowCompletions(false);
                    }}
                  >
                    {completion}
                  </div>
                ))}
              </div>
            )}
            
            {/* Input Field */}
            {!isInitializing && (
              <div className={`mt-6 flex items-center relative ${themeClasses.inputBg} p-3 rounded-lg border ${themeClasses.borderColor}`}>
                <span className={`${themeClasses.commandText} mr-2`}>
                  {commandMode === 'vim' ? ':' : commandMode === 'emacs' ? 'M-x' : '$'}
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className={`flex-grow bg-transparent ${themeClasses.text} ${fontSizeClass} font-mono outline-none border-none placeholder-gray-400`}
                  placeholder="Type a command (or try 'help')..."
                  autoFocus
                />
                
                {/* Current directory indicator */}
                <div className={`absolute right-3 top-1 text-xs ${theme === 'matrix' ? 'text-green-500' : theme === 'midnight' ? 'text-blue-300' : theme === 'synthwave' ? 'text-pink-300' : theme === 'coffee' ? 'text-amber-300' : 'text-gray-400'}`}>
                  {directory}
                </div>
              </div>
            )}
            
            {/* Blinking cursor when initializing */}
            {isInitializing && (
              <div className="mt-4 flex items-center">
                <span className={`inline-block w-2 h-5 ${theme === 'matrix' ? 'bg-green-400' : theme === 'midnight' ? 'bg-blue-400' : theme === 'synthwave' ? 'bg-pink-400' : theme === 'coffee' ? 'bg-amber-400' : 'bg-indigo-600'} animate-pulse`}></span>
              </div>
            )}
            
            {/* Keyboard shortcuts help */}
            <div className={`mt-6 pt-3 border-t ${themeClasses.borderColor} text-xs ${theme === 'matrix' ? 'text-green-600' : theme === 'midnight' ? 'text-blue-300' : theme === 'synthwave' ? 'text-pink-300' : theme === 'coffee' ? 'text-amber-300' : 'text-gray-500'} flex flex-wrap gap-x-4 gap-y-2`}>
              <span><kbd className={`px-1.5 py-0.5 rounded ${themeClasses.inputBg} border ${themeClasses.borderColor}`}>Tab</kbd> Autocomplete</span>
              <span><kbd className={`px-1.5 py-0.5 rounded ${themeClasses.inputBg} border ${themeClasses.borderColor}`}>↑↓</kbd> History</span>
              <span><kbd className={`px-1.5 py-0.5 rounded ${themeClasses.inputBg} border ${themeClasses.borderColor}`}>Ctrl+L</kbd> Clear</span>
              <span><kbd className={`px-1.5 py-0.5 rounded ${themeClasses.inputBg} border ${themeClasses.borderColor}`}>Alt+T</kbd> Theme</span>
              <span><kbd className={`px-1.5 py-0.5 rounded ${themeClasses.inputBg} border ${themeClasses.borderColor}`}>Esc</kbd> Cancel</span>
            </div>
            
            {/* Scroll indicator - only shown when there's content to scroll */}
            {terminalContent.length > 15 && (
              <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce ${theme === 'matrix' ? 'text-green-500' : theme === 'midnight' ? 'text-blue-500' : theme === 'synthwave' ? 'text-pink-500' : theme === 'coffee' ? 'text-amber-500' : 'text-indigo-500'} opacity-70`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            )}
            
            {/* Notification */}
            {notification && (
              <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
                notification.type === 'error' ? 'bg-red-500' :
                notification.type === 'success' ? 'bg-green-500' :
                'bg-blue-500'
              } text-white`}>
                {notification.message}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile bottom CTA - Fixed at bottom on mobile only */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 ${themeClasses.sidebarBg} border-t ${themeClasses.borderColor} p-3`}>
        <button 
          onClick={() => processCommand('contact')}
          className={`w-full py-3 ${themeClasses.linkButtonBg} ${themeClasses.linkTextColor} rounded-lg transition-colors shadow-sm font-medium flex items-center justify-center`}
        >
          Contact Me
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
      
      {/* Skill Visualizer Overlay */}
      {visualizerActive && (
        <div className={`fixed inset-0 ${theme === 'matrix' ? 'bg-black/90' : theme === 'midnight' ? 'bg-gray-900/90' : theme === 'synthwave' ? 'bg-purple-900/90' : theme === 'coffee' ? 'bg-amber-900/90' : 'bg-white/90'} z-50 flex flex-col items-center justify-center p-4`}>
          <div className={`absolute top-4 right-4 ${theme === 'matrix' ? 'text-green-400' : theme === 'midnight' ? 'text-blue-400' : theme === 'synthwave' ? 'text-pink-400' : theme === 'coffee' ? 'text-amber-400' : 'text-indigo-600'} cursor-pointer`} onClick={() => setVisualizerActive(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <h2 className={`text-2xl font-bold mb-4 ${theme === 'matrix' ? 'text-green-400' : theme === 'midnight' ? 'text-blue-400' : theme === 'synthwave' ? 'text-pink-400' : theme === 'coffee' ? 'text-amber-400' : 'text-indigo-600'}`}>Interactive Skill Network</h2>
          
          <div className={`max-w-4xl w-full h-[70vh] ${theme === 'matrix' ? 'bg-black' : theme === 'midnight' ? 'bg-gray-800' : theme === 'synthwave' ? 'bg-purple-900' : theme === 'coffee' ? 'bg-amber-800' : 'bg-white'} rounded-lg shadow-xl border ${themeClasses.borderColor} p-6 relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`text-xl ${theme === 'matrix' ? 'text-green-500' : theme === 'midnight' ? 'text-blue-400' : theme === 'synthwave' ? 'text-pink-400' : theme === 'coffee' ? 'text-amber-400' : 'text-indigo-600'} animate-pulse`}>
                Interactive skill visualization active
              </div>
            </div>
            
            {/* Here would be a real interactive skill diagram */}
            <div className="absolute inset-0 p-8">
              <svg width="100%" height="100%" viewBox="0 0 800 600">
                {/* Biology Skills Group */}
                <g>
                  <circle cx="200" cy="150" r="80" fill={theme === 'matrix' ? 'rgba(0,255,0,0.1)' : theme === 'midnight' ? 'rgba(59,130,246,0.1)' : theme === 'synthwave' ? 'rgba(236,72,153,0.1)' : theme === 'coffee' ? 'rgba(180,83,9,0.1)' : 'rgba(16,185,129,0.1)'} stroke={theme === 'matrix' ? '#00FF00' : theme === 'midnight' ? '#3B82F6' : theme === 'synthwave' ? '#EC4899' : theme === 'coffee' ? '#B45309' : '#10B981'} strokeWidth="2" />
                  <text x="200" y="150" textAnchor="middle" fill={theme === 'matrix' ? '#00FF00' : theme === 'midnight' ? '#3B82F6' : theme === 'synthwave' ? '#EC4899' : theme === 'coffee' ? '#B45309' : '#10B981'} fontSize="18" fontWeight="bold">Biology</text>
                  <text x="200" y="180" textAnchor="middle" fill={theme === 'matrix' ? '#00FF00' : theme === 'midnight' ? '#3B82F6' : theme === 'synthwave' ? '#EC4899' : theme === 'coffee' ? '#B45309' : '#10B981'} fontSize="12">Molecular Biology</text>
                  <text x="200" y="200" textAnchor="middle" fill={theme === 'matrix' ? '#00FF00' : theme === 'midnight' ? '#3B82F6' : theme === 'synthwave' ? '#EC4899' : theme === 'coffee' ? '#B45309' : '#10B981'} fontSize="12">Lab Techniques</text>
                </g>
                
                {/* Technology Skills Group */}
                <g>
                  <circle cx="600" cy="150" r="80" fill={theme === 'matrix' ? 'rgba(0,255,0,0.1)' : theme === 'midnight' ? 'rgba(59,130,246,0.1)' : theme === 'synthwave' ? 'rgba(236,72,153,0.1)' : theme === 'coffee' ? 'rgba(180,83,9,0.1)' : 'rgba(79,70,229,0.1)'} stroke={theme === 'matrix' ? '#00FF00' : theme === 'midnight' ? '#3B82F6' : theme === 'synthwave' ? '#EC4899' : theme === 'coffee' ? '#B45309' : '#4F46E5'} strokeWidth="2" />
                  <text x="600" y="150" textAnchor="middle" fill={theme === 'matrix' ? '#00FF00' : theme === 'midnight' ? '#3B82F6' : theme === 'synthwave' ? '#EC4899' : theme === 'coffee' ? '#B45309' : '#4F46E5'} fontSize="18" fontWeight="bold">Technology</text>
                  <text x="600" y="180" textAnchor="middle" fill={theme === 'matrix' ? '#00FF00' : theme === 'midnight' ? '#3B82F6' : theme === 'synthwave' ? '#EC4899' : theme === 'coffee' ? '#B45309' : '#4F46E5'} fontSize="12">Software Development</text>
                  <text x="600" y="200" textAnchor="middle" fill={theme === 'matrix' ? '#00FF00' : theme === 'midnight' ? '#3B82F6' : theme === 'synthwave' ? '#EC4899' : theme === 'coffee' ? '#B45309' : '#4F46E5'} fontSize="12">Infrastructure</text>
                </g>
                
                {/* Interdisciplinary Skills Group */}
                <g>
                  <circle cx="400" cy="400" r="100" fill={theme === 'matrix' ? 'rgba(0,255,0,0.15)' : theme === 'midnight' ? 'rgba(124,58,237,0.15)' : theme === 'synthwave' ? 'rgba(236,72,153,0.15)' : theme === 'coffee' ? 'rgba(180,83,9,0.15)' : 'rgba(139,92,246,0.15)'} stroke={theme === 'matrix' ? '#00FF00' : theme === 'midnight' ? '#7C3AED' : theme === 'synthwave' ? '#EC4899' : theme === 'coffee' ? '#B45309' : '#8B5CF6'} strokeWidth="2" />
                  <text x="400" y="380" textAnchor="middle" fill={theme === 'matrix' ? '#00FF00' : theme === 'midnight' ? '#7C3AED' : theme === 'synthwave' ? '#EC4899' : theme === 'coffee' ? '#B45309' : '#8B5CF6'} fontSize="18" fontWeight="bold">Interdisciplinary</text>
                  <text x="400" y="410" textAnchor="middle" fill={theme === 'matrix' ? '#00FF00' : theme === 'midnight' ? '#7C3AED' : theme === 'synthwave' ? '#EC4899' : theme === 'coffee' ? '#B45309' : '#8B5CF6'} fontSize="12">Bioinformatics</text>
                  <text x="400" y="430" textAnchor="middle" fill={theme === 'matrix' ? '#00FF00' : theme === 'midnight' ? '#7C3AED' : theme === 'synthwave' ? '#EC4899' : theme === 'coffee' ? '#B45309' : '#8B5CF6'} fontSize="12">Computational Biology</text>
                </g>
                
                {/* Connections */}
                <path d="M275 175 L 350 350" stroke={theme === 'matrix' ? 'rgba(0,255,0,0.4)' : theme === 'midnight' ? 'rgba(59,130,246,0.4)' : theme === 'synthwave' ? 'rgba(236,72,153,0.4)' : theme === 'coffee' ? 'rgba(180,83,9,0.4)' : 'rgba(16,185,129,0.4)'} strokeWidth="2" strokeDasharray="5,5" />
                <path d="M525 175 L 450 350" stroke={theme === 'matrix' ? 'rgba(0,255,0,0.4)' : theme === 'midnight' ? 'rgba(59,130,246,0.4)' : theme === 'synthwave' ? 'rgba(236,72,153,0.4)' : theme === 'coffee' ? 'rgba(180,83,9,0.4)' : 'rgba(79,70,229,0.4)'} strokeWidth="2" strokeDasharray="5,5" />
                <path d="M250 200 L 325 400" stroke={theme === 'matrix' ? 'rgba(0,255,0,0.4)' : theme === 'midnight' ? 'rgba(59,130,246,0.4)' : theme === 'synthwave' ? 'rgba(236,72,153,0.4)' : theme === 'coffee' ? 'rgba(180,83,9,0.4)' : 'rgba(16,185,129,0.4)'} strokeWidth="2" strokeDasharray="5,5" />
                <path d="M550 200 L 475 400" stroke={theme === 'matrix' ? 'rgba(0,255,0,0.4)' : theme === 'midnight' ? 'rgba(59,130,246,0.4)' : theme === 'synthwave' ? 'rgba(236,72,153,0.4)' : theme === 'coffee' ? 'rgba(180,83,9,0.4)' : 'rgba(79,70,229,0.4)'} strokeWidth="2" strokeDasharray="5,5" />
                
                {/* Additional Skills */}
                <g>
                  <circle cx="150" cy="250" r="40" fill={theme === 'matrix' ? 'rgba(0,255,0,0.05)' : theme === 'midnight' ? 'rgba(59,130,246,0.05)' : theme === 'synthwave' ? 'rgba(236,72,153,0.05)' : theme === 'coffee' ? 'rgba(180,83,9,0.05)' : 'rgba(16,185,129,0.05)'} stroke={theme === 'matrix' ? '#00FF00' : theme === 'midnight' ? '#3B82F6' : theme === 'synthwave' ? '#EC4899' : theme === 'coffee' ? '#B45309' : '#10B981'} strokeWidth="1" />
                  <text x="150" y="250" textAnchor="middle" fill={theme === 'matrix' ? '#00FF00' : theme === 'midnight' ? '#3B82F6' : theme === 'synthwave' ? '#EC4899' : theme === 'coffee' ? '#B45309' : '#10B981'} fontSize="10">Genomics</text>
                </g>
                
                <g>
                  <circle cx="650" cy="250" r="40" fill={theme === 'matrix' ? 'rgba(0,255,0,0.05)' : theme === 'midnight' ? 'rgba(59,130,246,0.05)' : theme === 'synthwave' ? 'rgba(236,72,153,0.05)' : theme === 'coffee' ? 'rgba(180,83,9,0.05)' : 'rgba(79,70,229,0.05)'} stroke={theme === 'matrix' ? '#00FF00' : theme === 'midnight' ? '#3B82F6' : theme === 'synthwave' ? '#EC4899' : theme === 'coffee' ? '#B45309' : '#4F46E5'} strokeWidth="1" />
                  <text x="650" y="250" textAnchor="middle" fill={theme === 'matrix' ? '#00FF00' : theme === 'midnight' ? '#3B82F6' : theme === 'synthwave' ? '#EC4899' : theme === 'coffee' ? '#B45309' : '#4F46E5'} fontSize="10">Cloud Computing</text>
                </g>
                
                <g>
                  <circle cx="300" cy="450" r="40" fill={theme === 'matrix' ? 'rgba(0,255,0,0.05)' : theme === 'midnight' ? 'rgba(124,58,237,0.05)' : theme === 'synthwave' ? 'rgba(236,72,153,0.05)' : theme === 'coffee' ? 'rgba(180,83,9,0.05)' : 'rgba(139,92,246,0.05)'} stroke={theme === 'matrix' ? '#00FF00' : theme === 'midnight' ? '#7C3AED' : theme === 'synthwave' ? '#EC4899' : theme === 'coffee' ? '#B45309' : '#8B5CF6'} strokeWidth="1" />
                  <text x="300" y="450" textAnchor="middle" fill={theme === 'matrix' ? '#00FF00' : theme === 'midnight' ? '#7C3AED' : theme === 'synthwave' ? '#EC4899' : theme === 'coffee' ? '#B45309' : '#8B5CF6'} fontSize="10">Machine Learning</text>
                </g>
                
                <g>
                  <circle cx="500" cy="450" r="40" fill={theme === 'matrix' ? 'rgba(0,255,0,0.05)' : theme === 'midnight' ? 'rgba(124,58,237,0.05)' : theme === 'synthwave' ? 'rgba(236,72,153,0.05)' : theme === 'coffee' ? 'rgba(180,83,9,0.05)' : 'rgba(139,92,246,0.05)'} stroke={theme === 'matrix' ? '#00FF00' : theme === 'midnight' ? '#7C3AED' : theme === 'synthwave' ? '#EC4899' : theme === 'coffee' ? '#B45309' : '#8B5CF6'} strokeWidth="1" />
                  <text x="500" y="450" textAnchor="middle" fill={theme === 'matrix' ? '#00FF00' : theme === 'midnight' ? '#7C3AED' : theme === 'synthwave' ? '#EC4899' : theme === 'coffee' ? '#B45309' : '#8B5CF6'} fontSize="10">Data Visualization</text>
                </g>
                
                {/* Animated particles */}
                <circle cx="300" cy="200" r="3" fill={theme === 'matrix' ? '#00FF00' : theme === 'midnight' ? '#3B82F6' : theme === 'synthwave' ? '#EC4899' : theme === 'coffee' ? '#B45309' : '#4F46E5'}>
                  <animate attributeName="cx" from="275" to="350" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="cy" from="175" to="350" dur="3s" repeatCount="indefinite" />
                </circle>
                
                <circle cx="500" cy="200" r="3" fill={theme === 'matrix' ? '#00FF00' : theme === 'midnight' ? '#3B82F6' : theme === 'synthwave' ? '#EC4899' : theme === 'coffee' ? '#B45309' : '#4F46E5'}>
                  <animate attributeName="cx" from="525" to="450" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="cy" from="175" to="350" dur="4s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>
          </div>
          
          <div className={`mt-4 ${theme === 'matrix' ? 'text-green-400' : theme === 'midnight' ? 'text-blue-400' : theme === 'synthwave' ? 'text-pink-400' : theme === 'coffee' ? 'text-amber-400' : 'text-gray-600'} text-sm max-w-xl text-center`}>
            This interactive visualization shows how my expertise spans across biology and technology domains, with interdisciplinary skills serving as the bridge between these fields. The connections represent how these skills complement and enhance each other in my work.
          </div>
          
          <button 
            className={`mt-6 px-6 py-2 ${themeClasses.linkButtonBg} ${themeClasses.linkTextColor} rounded`}
            onClick={() => setVisualizerActive(false)}
          >
            Return to Terminal
          </button>
        </div>
      )}
            {/* 3D Molecule Viewer */}
            {is3DActive && (
        <div className={`fixed inset-0 ${theme === 'matrix' ? 'bg-black/90' : theme === 'midnight' ? 'bg-gray-900/90' : theme === 'synthwave' ? 'bg-purple-900/90' : theme === 'coffee' ? 'bg-amber-900/90' : 'bg-white/90'} z-50 flex flex-col items-center justify-center p-4`}>
          <div className={`absolute top-4 right-4 ${theme === 'matrix' ? 'text-green-400' : theme === 'midnight' ? 'text-blue-400' : theme === 'synthwave' ? 'text-pink-400' : theme === 'coffee' ? 'text-amber-400' : 'text-indigo-600'} cursor-pointer`} onClick={() => setIs3DActive(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <h2 className={`text-2xl font-bold mb-4 ${theme === 'matrix' ? 'text-green-400' : theme === 'midnight' ? 'text-blue-400' : theme === 'synthwave' ? 'text-pink-400' : theme === 'coffee' ? 'text-amber-400' : 'text-indigo-600'}`}>Pyridine Molecule</h2>
          
          <div className={`max-w-4xl w-full h-[70vh] ${theme === 'matrix' ? 'bg-black' : theme === 'midnight' ? 'bg-gray-800' : theme === 'synthwave' ? 'bg-purple-900' : theme === 'coffee' ? 'bg-amber-800' : 'bg-white'} rounded-lg shadow-xl border ${themeClasses.borderColor} p-6 relative overflow-hidden`}>
            <svg width="100%" height="100%" viewBox="-2 -2 10 10">
              {/* Render bonds */}
              {moleculeData.bonds.map((bond, index) => {
                const source = moleculeData.atoms[bond.source];
                const target = moleculeData.atoms[bond.target];
                return (
                  <line
                    key={index}
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    stroke={theme === 'matrix' ? '#00FF00' : theme === 'midnight' ? '#3B82F6' : theme === 'synthwave' ? '#EC4899' : theme === 'coffee' ? '#B45309' : '#4F46E5'}
                    strokeWidth={bond.order === 2 ? 3 : 2}
                  />
                );
              })}
              
              {/* Render atoms */}
              {moleculeData.atoms.map((atom, index) => (
                <circle
                  key={index}
                  cx={atom.x}
                  cy={atom.y}
                  r="0.4"
                  fill={atom.symbol === 'C' ? '#333' : atom.symbol === 'N' ? '#0074D9' : '#FF4136'}
                >
                  <title>{atom.symbol}</title>
                </circle>
              ))}
            </svg>
            
            <div className={`absolute bottom-4 left-4 ${theme === 'matrix' ? 'text-green-300' : theme === 'midnight' ? 'text-blue-300' : theme === 'synthwave' ? 'text-pink-300' : theme === 'coffee' ? 'text-amber-300' : 'text-gray-600'} text-sm`}>
              Interactive 3D molecule visualization (simplified 2D representation shown)
            </div>
          </div>
          
          <div className={`mt-4 ${theme === 'matrix' ? 'text-green-400' : theme === 'midnight' ? 'text-blue-400' : theme === 'synthwave' ? 'text-pink-400' : theme === 'coffee' ? 'text-amber-400' : 'text-gray-600'} text-sm max-w-xl text-center`}>
            This molecular visualization shows the structure of pyridine - a heterocyclic compound containing a nitrogen atom.
            Drag to rotate, scroll to zoom. Atoms: Carbon (black), Nitrogen (blue), Oxygen (red).
          </div>
          
          <button 
            className={`mt-6 px-6 py-2 ${themeClasses.linkButtonBg} ${themeClasses.linkTextColor} rounded`}
            onClick={() => setIs3DActive(false)}
          >
            Return to Terminal
          </button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;