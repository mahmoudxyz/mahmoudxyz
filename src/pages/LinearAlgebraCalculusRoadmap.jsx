import React, { useState } from 'react';

// Constants for category colors and icons
const CATEGORIES = {
  prealgebra: { title: 'Pre-Algebra Review', color: '#8B5CF6', icon: '🧮' },
  algebra: { title: 'Linear Algebra', color: '#EC4899', icon: '📏' },
  calculus: { title: 'Calculus', color: '#3B82F6', icon: '📈' },
  diffequations: { title: 'Differential Equations', color: '#10B981', icon: '🔄' },
  applications: { title: 'Bioinformatics Applications', color: '#F59E0B', icon: '🧬' }
};

// Main roadmap data structure
const roadmapData = [
  // PRE-ALGEBRA REVIEW
  {
    id: 1,
    title: 'Number Systems and Basic Operations',
    category: 'prealgebra',
    duration: { best: 1, worst: 2 },
    difficulty: 1,
    prerequisites: [],
    relevance: 'Foundation for all mathematical work in bioinformatics algorithms',
    concepts: ['Real numbers', 'Complex numbers', 'Order of operations', 'Properties of operations'],
    breakdown: [
      'Day 1: Review of real numbers, absolute value, and order of operations',
      'Day 2 (if needed): Complex numbers and their operations'
    ],
    stumbling: [
      'Order of operations mistakes',
      'Dealing with negative numbers in expressions'
    ],
    questions: [
      'Simplify: 3(4 + 2) - 5² ÷ 5',
      'If z = 3 + 2i and w = 1 - 4i, find z·w'
    ],
    resources: [
      'Khan Academy\'s Pre-algebra review',
      'Paul\'s Online Math Notes - Algebra'
    ]
  },
  {
    id: 2,
    title: 'Functions and Graphing',
    category: 'prealgebra',
    duration: { best: 2, worst: 3 },
    difficulty: 2,
    prerequisites: [1],
    relevance: 'Visualizing relationships between biological variables, dose-response curves',
    concepts: ['Function notation', 'Domain and range', 'Graphing techniques', 'Common functions'],
    breakdown: [
      'Day 1: Function basics and linear functions',
      'Day 2: Polynomial and rational functions',
      'Day 3 (if needed): Exponential and logarithmic functions'
    ],
    stumbling: [
      'Determining domain and range',
      'Understanding function composition'
    ],
    questions: [
      'If f(x) = x² - 3x and g(x) = 2x + 1, find (f∘g)(2)',
      'Graph y = ln(x+1) and identify its domain and range'
    ],
    resources: [
      'Khan Academy\'s Functions course',
      '3Blue1Brown\'s "Essence of Calculus" introduction'
    ]
  },
  
  // LINEAR ALGEBRA
  {
    id: 3,
    title: 'Vectors and Vector Operations',
    category: 'algebra',
    duration: { best: 3, worst: 4 },
    difficulty: 2,
    prerequisites: [1],
    relevance: 'Representing biological sequences, multi-dimensional data in drug design',
    concepts: ['Vector notation', 'Vector addition and subtraction', 'Scalar multiplication', 'Dot product', 'Cross product'],
    breakdown: [
      'Day 1: Vector basics and operations',
      'Day 2: Dot products and projections',
      'Day 3: Cross products and applications',
      'Day 4 (if needed): Vector spaces and subspaces'
    ],
    stumbling: [
      'Confusing dot product and cross product',
      'Geometric interpretation of vector operations'
    ],
    questions: [
      'If u = [3, -1, 2] and v = [0, 4, -2], compute u·v and interpret the result',
      'Find a vector perpendicular to both u = [1, 0, 1] and v = [0, 1, 1]'
    ],
    resources: [
      'Khan Academy\'s Linear Algebra - Vectors',
      '3Blue1Brown\'s "Essence of Linear Algebra" series'
    ]
  },
  {
    id: 4,
    title: 'Matrices and Basic Operations',
    category: 'algebra',
    duration: { best: 3, worst: 5 },
    difficulty: 3,
    prerequisites: [3],
    relevance: 'Representing multiple sequences, pairwise comparisons, substitution matrices in bioinformatics',
    concepts: ['Matrix notation', 'Matrix addition and subtraction', 'Scalar multiplication', 'Matrix multiplication', 'Transpose'],
    breakdown: [
      'Day 1: Matrix basics and addition/subtraction',
      'Day 2: Matrix multiplication rules',
      'Day 3: Special matrices (identity, zero, diagonal)',
      'Day 4-5: Matrix properties and applications'
    ],
    stumbling: [
      'Matrix multiplication order (non-commutative)',
      'Dimension matching for multiplication'
    ],
    questions: [
      'If A = [[1,2],[3,4]] and B = [[0,1],[-1,2]], compute AB and BA',
      'Explain why matrix multiplication is not commutative with an example'
    ],
    resources: [
      'MIT OpenCourseWare 18.06 Linear Algebra',
      'Khan Academy\'s Linear Algebra - Matrices'
    ]
  },
  {
    id: 5,
    title: 'Systems of Linear Equations',
    category: 'algebra',
    duration: { best: 4, worst: 6 },
    difficulty: 3,
    prerequisites: [4],
    relevance: 'Solving constraint problems in metabolic networks, parameter estimation in pharmacokinetics',
    concepts: ['Linear equations', 'Gaussian elimination', 'Row echelon form', 'Reduced row echelon form', 'Solution sets'],
    breakdown: [
      'Day 1: Setting up systems of equations',
      'Day 2: Gaussian elimination basics',
      'Day 3: Row echelon form and back-substitution',
      'Day 4: Reduced row echelon form (RREF)',
      'Day 5-6: Special cases and applications'
    ],
    stumbling: [
      'Keeping track of row operations',
      'Handling special cases (no solution, infinite solutions)'
    ],
    questions: [
      'Solve the system: 2x + y - z = 4, x - 3y + 2z = -1, 3x + 2y - 2z = 5',
      'Explain what it means for a system to be underdetermined and give an example'
    ],
    resources: [
      'Gilbert Strang\'s Linear Algebra lectures',
      'Paul\'s Online Math Notes - Systems of Equations'
    ]
  },
  {
    id: 6,
    title: 'Determinants and Matrix Inverses',
    category: 'algebra',
    duration: { best: 3, worst: 4 },
    difficulty: 4,
    prerequisites: [5],
    relevance: 'Determining unique solutions in biological systems, transformation matrices in structural biology',
    concepts: ['Determinants', 'Properties of determinants', 'Matrix inverses', 'Cramer\'s rule'],
    breakdown: [
      'Day 1: Determinant definition and calculation',
      'Day 2: Matrix inverse definition and calculation',
      'Day 3: Properties and applications of matrix inverses',
      'Day 4: Advanced topics and Cramer\'s rule'
    ],
    stumbling: [
      'Determinant calculations for large matrices',
      'Conditions for matrix invertibility'
    ],
    questions: [
      'Find the determinant and inverse of A = [[4,7],[2,6]]',
      'Use Cramer\'s rule to solve: 3x + 2y = 7, 5x - y = 4'
    ],
    resources: [
      'MIT OpenCourseWare 18.06 Linear Algebra (Lectures 5-7)',
      'Khan Academy\'s Linear Algebra - Determinants'
    ]
  },
  {
    id: 7,
    title: 'Vector Spaces and Subspaces',
    category: 'algebra',
    duration: { best: 3, worst: 5 },
    difficulty: 4,
    prerequisites: [4],
    relevance: 'Understanding feature spaces in genomics, dimensional reduction techniques in bioinformatics',
    concepts: ['Vector spaces', 'Subspaces', 'Span', 'Linear independence', 'Basis', 'Dimension'],
    breakdown: [
      'Day 1: Vector space definition and examples',
      'Day 2: Span and linear independence',
      'Day 3: Basis and dimension',
      'Day 4-5: Subspace applications and examples'
    ],
    stumbling: [
      'Understanding abstract vector spaces beyond R^n',
      'Proving linear independence'
    ],
    questions: [
      'Determine if vectors v1 = [1,2,1], v2 = [2,4,2], v3 = [1,0,1] are linearly independent',
      'Find a basis for the subspace spanned by v1 = [1,1,0], v2 = [0,1,1], v3 = [1,2,1]'
    ],
    resources: [
      '3Blue1Brown\'s "Essence of Linear Algebra" (videos 2-4)',
      'MIT OpenCourseWare 18.06 Linear Algebra (Lectures 8-10)'
    ]
  },
  {
    id: 8,
    title: 'Eigenvalues and Eigenvectors',
    category: 'algebra',
    duration: { best: 4, worst: 6 },
    difficulty: 5,
    prerequisites: [6, 7],
    relevance: 'Principal component analysis in genomics, Markov models in sequence analysis, Google\'s PageRank algorithm',
    concepts: ['Eigenvalues', 'Eigenvectors', 'Characteristic polynomial', 'Diagonalization', 'Applications'],
    breakdown: [
      'Day 1: Eigenvalue and eigenvector definitions',
      'Day 2: Finding eigenvalues and eigenvectors',
      'Day 3: Diagonalization of matrices',
      'Day 4: Applications in data analysis',
      'Day 5-6: Advanced applications and practice'
    ],
    stumbling: [
      'Setting up and solving the characteristic equation',
      'Determining if a matrix is diagonalizable'
    ],
    questions: [
      'Find the eigenvalues and eigenvectors of A = [[2,1],[1,2]]',
      'Diagonalize the matrix A = [[3,1],[0,2]] if possible'
    ],
    resources: [
      'MIT OpenCourseWare 18.06 Linear Algebra (Lectures 21-23)',
      '3Blue1Brown\'s "Essence of Linear Algebra" (videos 13-14)'
    ]
  },
  {
    id: 9,
    title: 'Matrix Decompositions',
    category: 'algebra',
    duration: { best: 4, worst: 6 },
    difficulty: 5,
    prerequisites: [8],
    relevance: 'Singular value decomposition in genomics, QR decomposition in structural bioinformatics',
    concepts: ['LU decomposition', 'QR decomposition', 'Singular Value Decomposition (SVD)', 'Applications in data science'],
    breakdown: [
      'Day 1: LU decomposition',
      'Day 2: QR decomposition',
      'Day 3-4: Singular Value Decomposition',
      'Day 5-6: Applications in bioinformatics'
    ],
    stumbling: [
      'Understanding geometric interpretation of decompositions',
      'Implementing algorithms for decompositions'
    ],
    questions: [
      'Find the LU decomposition of A = [[2,4,6],[3,8,5],[1,2,3]]',
      'Explain how SVD can be used for dimensionality reduction'
    ],
    resources: [
      'MIT OpenCourseWare 18.06 Linear Algebra (Later lectures)',
      'Gilbert Strang\'s "Introduction to Linear Algebra" (Chapter 7)'
    ]
  },
  
  // CALCULUS
  {
    id: 10,
    title: 'Limits and Continuity',
    category: 'calculus',
    duration: { best: 3, worst: 4 },
    difficulty: 3,
    prerequisites: [2],
    relevance: 'Understanding boundary conditions in biological models, convergence of iterative algorithms',
    concepts: ['Limit definition', 'Properties of limits', 'Continuity', 'Asymptotes', 'Intermediate Value Theorem'],
    breakdown: [
      'Day 1: Concept of limits and basic calculations',
      'Day 2: Limit properties and special limits',
      'Day 3: Continuity and discontinuities',
      'Day 4: Applications and theoretical aspects'
    ],
    stumbling: [
      'Evaluating limits with indeterminate forms',
      'Understanding epsilon-delta definition'
    ],
    questions: [
      'Evaluate lim(x→0) (sin x)/x and explain its importance',
      'Determine where f(x) = (x²-1)/(x-1) is discontinuous and why'
    ],
    resources: [
      'Khan Academy\'s Calculus - Limits',
      '3Blue1Brown\'s "Essence of Calculus" (videos 1-2)'
    ]
  },
  {
    id: 11,
    title: 'Derivatives and Rules of Differentiation',
    category: 'calculus',
    duration: { best: 4, worst: 5 },
    difficulty: 3,
    prerequisites: [10],
    relevance: 'Rates of change in biological processes, sensitivity analysis in pharmacokinetics',
    concepts: ['Derivative definition', 'Basic derivative rules', 'Product rule', 'Quotient rule', 'Chain rule', 'Implicit differentiation'],
    breakdown: [
      'Day 1: Definition and basic derivatives',
      'Day 2: Product, quotient, and chain rules',
      'Day 3: Derivatives of transcendental functions',
      'Day 4: Implicit differentiation',
      'Day 5: Applications in science'
    ],
    stumbling: [
      'Applying chain rule correctly',
      'Setting up implicit differentiation'
    ],
    questions: [
      'Find f\'(x) if f(x) = x³ ln(x²+1)',
      'Use implicit differentiation to find dy/dx if x² + y² = 25'
    ],
    resources: [
      'Khan Academy\'s Calculus - Derivatives',
      'Paul\'s Online Math Notes - Derivatives'
    ]
  },
  {
    id: 12,
    title: 'Applications of Derivatives',
    category: 'calculus',
    duration: { best: 3, worst: 5 },
    difficulty: 3,
    prerequisites: [11],
    relevance: 'Optimization of drug dosing, finding critical points in metabolic pathways',
    concepts: ['Related rates', 'Maximum and minimum values', 'Mean Value Theorem', 'L\'Hôpital\'s rule', 'Curve sketching'],
    breakdown: [
      'Day 1: Related rates problems',
      'Day 2: Critical points and optimization',
      'Day 3: Mean Value Theorem and L\'Hôpital\'s rule',
      'Day 4-5: Curve sketching and applications'
    ],
    stumbling: [
      'Setting up related rates problems',
      'Identifying global vs. local extrema'
    ],
    questions: [
      'Find the dimensions of a rectangle with perimeter 100 that has maximum area',
      'Use L\'Hôpital\'s rule to evaluate lim(x→0) (e^x-1-x)/x²'
    ],
    resources: [
      'MIT OpenCourseWare 18.01 Single Variable Calculus',
      'Paul\'s Online Math Notes - Applications of Derivatives'
    ]
  },
  {
    id: 13,
    title: 'Integration and Basic Methods',
    category: 'calculus',
    duration: { best: 4, worst: 6 },
    difficulty: 4,
    prerequisites: [11],
    relevance: 'Area under pharmacokinetic curves, cumulative effects in biological systems',
    concepts: ['Indefinite integrals', 'Basic integration rules', 'U-substitution', 'Integration by parts', 'Definite integrals'],
    breakdown: [
      'Day 1: Basic integrals and properties',
      'Day 2: U-substitution technique',
      'Day 3: Integration by parts',
      'Day 4: Definite integrals and FTC',
      'Day 5-6: Applications and practice'
    ],
    stumbling: [
      'Identifying the appropriate technique',
      'Setting up u-substitution correctly'
    ],
    questions: [
      'Evaluate ∫ x·e^(x²) dx',
      'Calculate the area between y = x² and y = x³ for 0 ≤ x ≤ 1'
    ],
    resources: [
      'Khan Academy\'s Calculus - Integration',
      'Paul\'s Online Math Notes - Integration'
    ]
  },
  {
    id: 14,
    title: 'Advanced Integration Techniques',
    category: 'calculus',
    duration: { best: 4, worst: 6 },
    difficulty: 5,
    prerequisites: [13],
    relevance: 'Complex area calculations in structural biology, probability distributions in bioinformatics',
    concepts: ['Trigonometric substitution', 'Partial fractions', 'Improper integrals', 'Numerical integration'],
    breakdown: [
      'Day 1: Trigonometric substitutions',
      'Day 2: Partial fractions decomposition',
      'Day 3: Improper integrals',
      'Day 4: Numerical integration methods',
      'Day 5-6: Advanced applications'
    ],
    stumbling: [
      'Decomposing complicated fractions',
      'Setting up trigonometric substitutions'
    ],
    questions: [
      'Evaluate ∫ 1/(x²+4) dx',
      'Determine if ∫ 1/(x·ln(x)) dx from 1 to 2 converges'
    ],
    resources: [
      'MIT OpenCourseWare 18.01 Single Variable Calculus (Later lectures)',
      'Paul\'s Online Math Notes - Advanced Integration Techniques'
    ]
  },
  {
    id: 15,
    title: 'Sequences and Series',
    category: 'calculus',
    duration: { best: 4, worst: 6 },
    difficulty: 4,
    prerequisites: [13],
    relevance: 'Convergence of iterative algorithms, approximation methods in computational biology',
    concepts: ['Sequences', 'Convergence tests', 'Power series', 'Taylor series', 'Fourier series basics'],
    breakdown: [
      'Day 1: Sequences and convergence',
      'Day 2: Infinite series and tests for convergence',
      'Day 3: Power series and radius of convergence',
      'Day 4: Taylor and Maclaurin series',
      'Day 5-6: Applications and Fourier series introduction'
    ],
    stumbling: [
      'Choosing the appropriate convergence test',
      'Finding Taylor series for complex functions'
    ],
    questions: [
      'Determine if the series Σ (n²)/(3^n) from n=1 to ∞ converges',
      'Find the Taylor series for f(x) = ln(1+x) centered at x=0'
    ],
    resources: [
      'Khan Academy\'s Calculus - Sequences and Series',
      '3Blue1Brown\'s "Essence of Calculus" (videos 10-11)'
    ]
  },
  {
    id: 16,
    title: 'Multivariable Functions and Partial Derivatives',
    category: 'calculus',
    duration: { best: 3, worst: 5 },
    difficulty: 4,
    prerequisites: [11],
    relevance: 'Multiple factors affecting biological processes, sensitivity analysis in systems biology',
    concepts: ['Functions of several variables', 'Partial derivatives', 'Directional derivatives', 'Gradient vector', 'Tangent planes'],
    breakdown: [
      'Day 1: Functions of several variables',
      'Day 2: Partial derivatives',
      'Day 3: Directional derivatives and gradient',
      'Day 4-5: Applications and tangent planes'
    ],
    stumbling: [
      'Visualizing functions of several variables',
      'Understanding the gradient\'s significance'
    ],
    questions: [
      'Find all partial derivatives of f(x,y,z) = x²y + y²z + z²x',
      'Find the gradient vector of f(x,y) = e^(xy) at the point (1,0)'
    ],
    resources: [
      'Khan Academy\'s Calculus - Multivariable Functions',
      'MIT OpenCourseWare 18.02 Multivariable Calculus'
    ]
  },
  {
    id: 17,
    title: 'Multiple Integrals',
    category: 'calculus',
    duration: { best: 4, worst: 5 },
    difficulty: 5,
    prerequisites: [13, 16],
    relevance: 'Volume calculations in molecular structures, probability distributions in multiple dimensions',
    concepts: ['Double integrals', 'Triple integrals', 'Change of variables', 'Jacobian', 'Applications'],
    breakdown: [
      'Day 1: Double integrals in rectangular coordinates',
      'Day 2: Double integrals in polar coordinates',
      'Day 3: Triple integrals',
      'Day 4: Change of variables and Jacobian',
      'Day 5: Applications in biological problems'
    ],
    stumbling: [
      'Setting up bounds of integration',
      'Determining when to change coordinate systems'
    ],
    questions: [
      'Calculate the volume under z = x² + y² over the disk x² + y² ≤ 4',
      'Use spherical coordinates to find the volume of the sphere x² + y² + z² ≤ a²'
    ],
    resources: [
      'MIT OpenCourseWare 18.02 Multivariable Calculus (Lectures 18-23)',
      'Paul\'s Online Math Notes - Multiple Integrals'
    ]
  },
  
  // DIFFERENTIAL EQUATIONS
  {
    id: 18,
    title: 'First-Order Differential Equations',
    category: 'diffequations',
    duration: { best: 4, worst: 5 },
    difficulty: 4,
    prerequisites: [13],
    relevance: 'Drug metabolism models, population growth in biological systems',
    concepts: ['Ordinary differential equations', 'Separable equations', 'Linear first-order equations', 'Exact equations', 'Applications'],
    breakdown: [
      'Day 1: Introduction to differential equations',
      'Day 2: Separable equations',
      'Day 3: Linear first-order equations',
      'Day 4: Applications in biological systems',
      'Day 5: Exact equations and integrating factors'
    ],
    stumbling: [
      'Identifying equation type',
      'Setting up integrating factors'
    ],
    questions: [
      'Solve the differential equation dy/dx = xy with y(0) = 1',
      'A drug is eliminated from the body at a rate proportional to its concentration. Set up and solve the DE if half-life is 4 hours'
    ],
    resources: [
      'Khan Academy\'s Differential Equations',
      'Paul\'s Online Math Notes - Differential Equations'
    ]
  },
  {
    id: 19,
    title: 'Second-Order Differential Equations',
    category: 'diffequations',
    duration: { best: 4, worst: 6 },
    difficulty: 5,
    prerequisites: [18],
    relevance: 'Oscillatory behavior in biological systems, enzyme kinetics, predator-prey models',
    concepts: ['Homogeneous equations', 'Non-homogeneous equations', 'Method of undetermined coefficients', 'Variation of parameters'],
    breakdown: [
      'Day 1: Homogeneous second-order equations',
      'Day 2: Characteristic equation approach',
      'Day 3: Method of undetermined coefficients',
      'Day 4: Variation of parameters',
      'Day 5-6: Applications in biological systems'
    ],
    stumbling: [
      'Determining the particular solution form',
      'Handling repeated roots in characteristic equation'
    ],
    questions: [
      'Solve y" + 4y\' + 4y = 0 with y(0) = 1, y\'(0) = 0',
      'Find the general solution of y" + y = sin(x)'
    ],
    resources: [
      'MIT OpenCourseWare 18.03 Differential Equations',
      'Paul\'s Online Math Notes - Second Order Differential Equations'
    ]
  },
  
  // APPLICATIONS
  {
    id: 20,
    title: 'Numerical Methods in Calculus',
    category: 'applications',
    duration: { best: 3, worst: 4 },
    difficulty: 4,
    prerequisites: [13, 18],
    relevance: 'Computational approaches to biological problems, simulation of dynamic systems',
    concepts: ['Numerical integration', 'Euler\'s method', 'Runge-Kutta methods', 'Numerical optimization'],
    breakdown: [
      'Day 1: Numerical integration techniques',
      'Day 2: Euler\'s method for differential equations',
      'Day 3: Runge-Kutta methods',
      'Day 4: Applications in bioinformatics problems'
    ],
    stumbling: [
      'Understanding error propagation',
      'Choosing appropriate step sizes'
    ],
    questions: [
      'Use Simpson\'s rule with n=4 to approximate ∫ e^(-x²) dx from 0 to 1',
      'Apply Euler\'s method to approximate the solution of dy/dx = y - x with y(0) = 1 at x = 0.5 using step size h = 0.1'
    ],
    resources: [
      'Numerical Methods for Scientists and Engineers',
      'MIT OpenCourseWare 18.330 Introduction to Numerical Analysis'
    ]
  },
  {
    id: 21,
    title: 'Optimization Methods',
    category: 'applications',
    duration: { best: 3, worst: 5 },
    difficulty: 4,
    prerequisites: [12, 16],
    relevance: 'Parameter optimization in biological models, protein folding energy minimization',
    concepts: ['Unconstrained optimization', 'Constrained optimization', 'Lagrange multipliers', 'Gradient descent algorithms'],
    breakdown: [
      'Day 1: Single-variable optimization review',
      'Day 2: Multivariable optimization',
      'Day 3: Lagrange multipliers for constraints',
      'Day 4-5: Gradient descent and applications'
    ],
    stumbling: [
      'Setting up Lagrangian functions',
      'Determining if extrema are local or global'
    ],
    questions: [
      'Use Lagrange multipliers to find the maximum value of f(x,y) = xy subject to x² + y² = 16',
      'Explain how gradient descent could be used to fit a model to gene expression data'
    ],
    resources: [
      'Convex Optimization by Boyd and Vandenberghe (selected chapters)',
      'MIT OpenCourseWare 18.02 Multivariable Calculus (Optimization lectures)'
    ]
  }
];

// The full dataset would have all 21 topics
// Estimated total study days for the complete roadmap
const TOTAL_ROADMAP_DAYS = { best: 73, worst: 103 };

// Emergency plan data (30 days total)
const emergencyPlan = [
  { week: '1', title: 'Essential Pre-Algebra & Linear Algebra', topics: [
    { title: 'Number systems and functions review', days: 1 },
    { title: 'Vectors and basic operations', days: 2 },
    { title: 'Matrices and linear systems', days: 3 },
    { title: 'Eigenvalues and eigenvectors basics', days: 2 }
  ]},
  { week: '2', title: 'Calculus Foundations', topics: [
    { title: 'Limits and continuity', days: 1 },
    { title: 'Derivatives and rules', days: 2 },
    { title: 'Applications of derivatives', days: 2 },
    { title: 'Basic integration', days: 2 }
  ]},
  { week: '3', title: 'Advanced Calculus Essentials', topics: [
    { title: 'Sequences and series highlights', days: 2 },
    { title: 'Partial derivatives', days: 2 },
    { title: 'Multiple integrals basics', days: 2 }
  ]},
  { week: '4', title: 'Differential Equations & Applications', topics: [
    { title: 'First-order differential equations', days: 2 },
    { title: 'Second-order differential equations basics', days: 2 },
    { title: 'Optimization methods', days: 2 },
    { title: 'Numerical methods basics', days: 1 }
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
          <li>Covers only essential concepts (about 30% of the full roadmap)</li>
          <li>Focuses on applications over proofs and theoretical understanding</li>
          <li>Will give you enough to understand basic algorithms and models in bioinformatics</li>
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
              ~4-6 months
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
            <li>Understand proofs and theoretical foundations</li>
            <li>More time for practice and application</li>
          </ul>
        </div>
        
        <div className="bg-orange-50 p-3 rounded border border-orange-100 text-sm">
          <div className="font-medium text-orange-800 mb-1">Emergency Approach</div>
          <ul className="text-gray-700 space-y-1 ml-4 list-disc">
            <li>Study every day (including weekends)</li>
            <li>Focus only on computational techniques</li>
            <li>Practical applications over theory</li>
            <li>Minimal time for extra practice problems</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Main component
const LinearAlgebraCalculusRoadmap = () => {
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
        <h1 className="text-3xl font-bold mb-2">Linear Algebra & Calculus Roadmap for Bioinformatics</h1>
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
            <li>Divide the total roadmap days (73-103) by your monthly capacity</li>
            <li>The result is your approximate completion time in months</li>
            <li>Prioritize earlier topics in each category to build a strong foundation</li>
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
                <span><strong>Pharmacokinetics</strong> → Differential equations</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-medium mr-2">•</span>
                <span><strong>Drug dosing calculations</strong> → Applied calculus problems</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-medium mr-2">•</span>
                <span><strong>Chemical structure analysis</strong> → Linear transformations</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-medium mr-2">•</span>
                <span><strong>Lab data analysis</strong> → Multivariable calculus applications</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h3 className="font-semibold mb-2">Application Ideas</h3>
            <ul className="space-y-1 text-sm">
              <li className="flex items-baseline">
                <span className="font-medium mr-2">•</span>
                <span>Model drug metabolism using differential equations</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-medium mr-2">•</span>
                <span>Use optimization to determine optimal drug dosing</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-medium mr-2">•</span>
                <span>Apply matrix operations to analyze multiple drug interactions</span>
              </li>
              <li className="flex items-baseline">
                <span className="font-medium mr-2">•</span>
                <span>Use numerical integration for area-under-curve in pharmacokinetics</span>
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

export default LinearAlgebraCalculusRoadmap;