import React, { useState } from 'react';

// Constants for category colors and icons
const CATEGORIES = {
  datastructures: { title: 'Data Structures', color: '#8B5CF6', icon: '🧱' },
  algorithms: { title: 'Algorithms', color: '#EC4899', icon: '⚙️' },
  mlfoundations: { title: 'ML Foundations', color: '#3B82F6', icon: '📊' },
  classicalml: { title: 'Classical ML', color: '#10B981', icon: '🔍' },
  deeplearning: { title: 'Deep Learning', color: '#F59E0B', icon: '🧠' },
  applied: { title: 'Applied ML', color: '#6366F1', icon: '🔧' }
};

// Main roadmap data structure
const roadmapData = [
  // DATA STRUCTURES
  {
    id: 1,
    title: 'Arrays & Linked Lists',
    category: 'datastructures',
    duration: { best: 2, worst: 4 },
    difficulty: 2,
    prerequisites: [],
    relevance: 'Fundamental data structures used in implementing ML algorithms; key for efficient data manipulation',
    concepts: ['Array operations', 'Dynamic arrays', 'Singly linked lists', 'Doubly linked lists', 'Implementation details', 'Time complexity analysis'],
    breakdown: [
      'Day 1: Arrays, dynamic arrays, and array operations',
      'Day 2: Linked lists concepts and implementation',
      'Day 3: Problems solving with arrays and linked lists',
      'Day 4 (if needed): Advanced operations and optimizations'
    ],
    stumbling: [
      'Managing edge cases in linked list operations',
      'Understanding memory allocation differences',
      'Off-by-one errors in array indexing'
    ],
    questions: [
      'What are the time complexity differences between arrays and linked lists for common operations?',
      'How would you implement an efficient circular buffer using arrays?'
    ],
    resources: [
      'Visualgo.net for data structure visualization',
      'LeetCode array and linked list problem sets',
      '"Grokking Algorithms" by Aditya Bhargava (Chapters 1-2)'
    ]
  },
  {
    id: 2,
    title: 'Stacks, Queues & Hash Tables',
    category: 'datastructures',
    duration: { best: 3, worst: 5 },
    difficulty: 2,
    prerequisites: [1],
    relevance: 'Used in algorithm implementation, feature engineering, and efficient data lookup in ML pipelines',
    concepts: ['Stack operations', 'Queue and deque operations', 'Hash functions', 'Collision resolution', 'HashMaps/Dictionaries', 'Applications in ML'],
    breakdown: [
      'Day 1: Stacks and their applications',
      'Day 2: Queues, priority queues, and their applications',
      'Day 3: Hash tables, functions, and collision handling',
      'Day 4-5: Practice problems and ML-relevant applications'
    ],
    stumbling: [
      'Choosing appropriate hash functions',
      'Handling collisions efficiently',
      'Understanding when to use which structure'
    ],
    questions: [
      'How would you implement a feature store using hash tables?',
      'When would a priority queue be useful in an ML pipeline?'
    ],
    resources: [
      'MIT OpenCourseWare 6.006 (Hash Tables lecture)',
      'HackerRank Data Structures practice section',
      '"Introduction to Algorithms" by CLRS (Chapter 11)'
    ]
  },
  {
    id: 3,
    title: 'Trees & Graphs',
    category: 'datastructures',
    duration: { best: 4, worst: 7 },
    difficulty: 3,
    prerequisites: [2],
    relevance: 'Critical for decision trees, random forests, graph neural networks, and representing relationships in data',
    concepts: ['Binary trees', 'BST operations', 'Balanced trees (AVL, Red-Black)', 'Tree traversals', 'Graph representations', 'Graph traversals'],
    breakdown: [
      'Day 1: Binary trees and basic operations',
      'Day 2: BST implementation and operations',
      'Day 3: Tree traversals and applications',
      'Day 4: Graph representations (adjacency matrix/list)',
      'Day 5: Graph traversals (BFS/DFS)',
      'Day 6-7: Advanced tree structures and practice'
    ],
    stumbling: [
      'Balancing binary search trees',
      'Choosing the right graph representation',
      'Recursive vs. iterative traversals'
    ],
    questions: [
      'How are trees used in decision tree algorithms?',
      'How would you represent a molecular structure for a graph neural network?'
    ],
    resources: [
      'Visualgo.net for tree and graph visualization',
      'Stanford CS161 (Data Structures and Algorithms)',
      '"Grokking Algorithms" by Aditya Bhargava (Chapters 6-7)'
    ]
  },
  {
    id: 4,
    title: 'Advanced Data Structures',
    category: 'datastructures',
    duration: { best: 3, worst: 5 },
    difficulty: 4,
    prerequisites: [3],
    relevance: 'Specialized structures used in efficient ML algorithm implementations and optimization techniques',
    concepts: ['Heaps and priority queues', 'Disjoint sets/Union-find', 'Tries', 'Segment trees', 'Spatial data structures (kd-trees, R-trees)'],
    breakdown: [
      'Day 1: Heaps and priority queues implementation',
      'Day 2: Disjoint sets and applications',
      'Day 3: Tries and string processing',
      'Day 4-5: Spatial data structures for nearest neighbor search'
    ],
    stumbling: [
      'Implementing heap operations correctly',
      'Understanding union-find optimizations',
      'Balancing spatial data structures'
    ],
    questions: [
      'How would you use a kd-tree to optimize a k-nearest neighbors algorithm?',
      'When would a trie be useful in feature engineering for text data?'
    ],
    resources: [
      'Stanford CS166 Advanced Data Structures',
      'Computational Geometry: Algorithms and Applications (for spatial structures)',
      'LeetCode hard problems on heaps and spatial indexing'
    ]
  },
  
  // ALGORITHMS
  {
    id: 5,
    title: 'Algorithmic Complexity & Analysis',
    category: 'algorithms',
    duration: { best: 2, worst: 3 },
    difficulty: 3,
    prerequisites: [1],
    relevance: 'Essential for understanding the efficiency and scalability of ML algorithms with large datasets',
    concepts: ['Big O notation', 'Time complexity analysis', 'Space complexity analysis', 'Amortized analysis', 'Common complexity classes'],
    breakdown: [
      'Day 1: Introduction to algorithm analysis and Big O notation',
      'Day 2: Analysis techniques and practice',
      'Day 3 (if needed): Amortized analysis and advanced topics'
    ],
    stumbling: [
      'Determining tight bounds for complex algorithms',
      'Analyzing recursive algorithms',
      'Understanding amortized runtime'
    ],
    questions: [
      'What is the time complexity of training a decision tree on n samples with m features?',
      'How does the computational complexity of k-means scale with number of clusters?'
    ],
    resources: [
      'MIT OpenCourseWare 6.006 Introduction to Algorithms (Analysis lectures)',
      'Algorithms Illuminated (Part 1) by Tim Roughgarden',
      'Big-O Cheat Sheet website'
    ]
  },
  {
    id: 6,
    title: 'Sorting & Searching',
    category: 'algorithms',
    duration: { best: 3, worst: 5 },
    difficulty: 3,
    prerequisites: [5],
    relevance: 'Fundamental for data preprocessing, nearest neighbor search, and optimized ML implementations',
    concepts: ['Basic sorting algorithms', 'Advanced sorting (quicksort, mergesort, heapsort)', 'Binary search', 'Hashing for search', 'Nearest neighbor search algorithms'],
    breakdown: [
      'Day 1: Basic sorting algorithms and their analysis',
      'Day 2: Advanced sorting algorithms',
      'Day 3: Binary search and its variants',
      'Day 4-5: Specialized searching techniques for ML'
    ],
    stumbling: [
      'Implementing quicksort partitioning correctly',
      'Handling edge cases in binary search',
      'Optimizing for cache efficiency'
    ],
    questions: [
      'How would you implement an efficient k-nearest neighbors algorithm?',
      'How is binary search used in hyperparameter tuning?'
    ],
    resources: [
      'VisuAlgo.net sorting visualization',
      '"Algorithms" by Robert Sedgewick',
      'MIT OpenCourseWare 6.006 (Sorting lectures)'
    ]
  },
  {
    id: 7,
    title: 'Divide & Conquer and Recursion',
    category: 'algorithms',
    duration: { best: 2, worst: 4 },
    difficulty: 3,
    prerequisites: [5, 6],
    relevance: 'Strategy used in many ML algorithms like decision trees and for efficient computation of matrix operations',
    concepts: ['Recursive thinking', 'Divide and conquer paradigm', 'Master theorem', 'Memoization', 'Dynamic programming introduction'],
    breakdown: [
      'Day 1: Recursion patterns and implementation',
      'Day 2: Divide and conquer algorithm design',
      'Day 3: Analysis of recursive algorithms',
      'Day 4 (if needed): Advanced problems and optimization'
    ],
    stumbling: [
      'Identifying the base case in complex problems',
      'Managing stack space in deep recursion',
      'Applying the master theorem correctly'
    ],
    questions: [
      'How is divide and conquer used in nearest neighbor search algorithms?',
      'How does recursive partitioning work in decision trees?'
    ],
    resources: [
      'Stanford CS161 (Divide and Conquer lectures)',
      '"Grokking Algorithms" by Aditya Bhargava (Chapter 4)',
      'CLRS Introduction to Algorithms (Chapter 4)'
    ]
  },
  {
    id: 8,
    title: 'Dynamic Programming & Greedy Algorithms',
    category: 'algorithms',
    duration: { best: 4, worst: 7 },
    difficulty: 4,
    prerequisites: [7],
    relevance: 'Used in sequence modeling, reinforcement learning, and optimization problems in ML',
    concepts: ['Dynamic programming principles', 'DP problem patterns', 'Memoization vs tabulation', 'Greedy algorithm design', 'Greedy vs DP approaches'],
    breakdown: [
      'Day 1: Dynamic programming principles and examples',
      'Day 2: DP problem-solving techniques',
      'Day 3: Memoization and tabulation implementations',
      'Day 4: Greedy algorithms and design principles',
      'Day 5-7: Complex problems and ML applications'
    ],
    stumbling: [
      'Identifying overlapping subproblems',
      'Defining the right state representation',
      'Proving greedy choice property'
    ],
    questions: [
      'How is dynamic programming used in sequence alignment problems in bioinformatics?',
      'Where are greedy algorithms used in feature selection?'
    ],
    resources: [
      'Erik Demaine\'s MIT lectures on DP',
      'GeeksforGeeks DP practice problems',
      'CLRS Introduction to Algorithms (Chapters 15-16)'
    ]
  },
  {
    id: 9,
    title: 'Graph Algorithms',
    category: 'algorithms',
    duration: { best: 4, worst: 6 },
    difficulty: 4,
    prerequisites: [3, 8],
    relevance: 'Essential for network analysis, recommendation systems, and graph neural networks',
    concepts: ['Shortest path algorithms (Dijkstra, Bellman-Ford)', 'Minimum spanning trees', 'Topological sorting', 'Network flow', 'Graph neural network fundamentals'],
    breakdown: [
      'Day 1: Graph traversals review and shortest paths',
      'Day 2: Minimum spanning tree algorithms',
      'Day 3: Topological sorting and directed graphs',
      'Day 4: Network flow introduction',
      'Day 5-6: Advanced graph problems and ML applications'
    ],
    stumbling: [
      'Handling negative edges in shortest path algorithms',
      'Implementing priority queues efficiently for Dijkstra',
      'Understanding the intricacies of network flow'
    ],
    questions: [
      'How would you represent a biological network for analysis using graph algorithms?',
      'How are graph algorithms used in recommender systems?'
    ],
    resources: [
      'Stanford CS161 (Graph Algorithms lectures)',
      'Graph Algorithms in the Language of Linear Algebra book',
      'CLRS Introduction to Algorithms (Chapters 22-26)'
    ]
  },
  
  // ML FOUNDATIONS
  {
    id: 10,
    title: 'Probability for ML',
    category: 'mlfoundations',
    duration: { best: 3, worst: 5 },
    difficulty: 3,
    prerequisites: [],
    relevance: 'Fundamental theoretical foundation for most ML algorithms and techniques',
    concepts: ['Random variables', 'Probability distributions', 'Joint/conditional probability', 'Bayes theorem', 'Maximum likelihood estimation', 'Information theory basics'],
    breakdown: [
      'Day 1: Probability fundamentals and distributions',
      'Day 2: Conditional probability and Bayes theorem',
      'Day 3: Maximum likelihood estimation',
      'Day 4-5: Information theory and advanced topics'
    ],
    stumbling: [
      'Understanding generative vs. discriminative models',
      'Applying Bayes theorem correctly',
      'Interpreting likelihood functions'
    ],
    questions: [
      'How is Bayes theorem used in naive Bayes classification?',
      'How does maximum likelihood estimation relate to loss functions in ML?'
    ],
    resources: [
      'StatQuest YouTube videos on probability for ML',
      '"Pattern Recognition and Machine Learning" by Bishop (Chapter 1-2)',
      'Probabilistic ML (Coursera)'
    ]
  },
  {
    id: 11,
    title: 'Linear Algebra for ML',
    category: 'mlfoundations',
    duration: { best: 4, worst: 6 },
    difficulty: 3,
    prerequisites: [],
    relevance: 'Essential for understanding transformations, neural networks, dimensionality reduction, and optimization',
    concepts: ['Vectors and matrices', 'Matrix operations', 'Eigenvalues and eigenvectors', 'SVD and PCA', 'Vector spaces and bases', 'Matrix calculus basics'],
    breakdown: [
      'Day 1: Vectors, matrices, and basic operations',
      'Day 2: Vector spaces, bases, and linear transformations',
      'Day 3: Eigendecomposition and applications',
      'Day 4: SVD and PCA',
      'Day 5-6: Matrix calculus and ML applications'
    ],
    stumbling: [
      'Visualizing higher-dimensional transformations',
      'Understanding eigendecomposition intuitively',
      'Connecting linear algebra to ML algorithms'
    ],
    questions: [
      'How is SVD used in recommendation systems?',
      'Why are eigenvalues important in PCA?'
    ],
    resources: [
      '3Blue1Brown Essence of Linear Algebra series',
      'Linear Algebra for Machine Learning (Coursera)',
      '"Mathematics for Machine Learning" by Deisenroth et al. (Part I)'
    ]
  },
  {
    id: 12,
    title: 'Numerical Optimization',
    category: 'mlfoundations',
    duration: { best: 3, worst: 5 },
    difficulty: 4,
    prerequisites: [11],
    relevance: 'Core of training process for most ML algorithms, especially deep learning',
    concepts: ['Gradient descent variants', 'Convex optimization', 'Constrained optimization', 'Newton\'s method', 'Stochastic optimization', 'Regularization techniques'],
    breakdown: [
      'Day 1: Introduction to optimization problems and gradient descent',
      'Day 2: Variants of gradient descent (SGD, AdaGrad, Adam)',
      'Day 3: Convex optimization principles',
      'Day 4-5: Advanced techniques and ML applications'
    ],
    stumbling: [
      'Tuning learning rates effectively',
      'Dealing with non-convex optimization landscapes',
      'Understanding convergence guarantees'
    ],
    questions: [
      'Why is stochastic gradient descent preferred over batch gradient descent in deep learning?',
      'How does L1 regularization lead to sparse models?'
    ],
    resources: [
      'Stanford CS229 Machine Learning (Optimization lectures)',
      'Convex Optimization by Boyd and Vandenberghe',
      '"Deep Learning" by Goodfellow et al. (Chapter 8)'
    ]
  },
  {
    id: 13,
    title: 'Statistical Learning Theory',
    category: 'mlfoundations',
    duration: { best: 3, worst: 5 },
    difficulty: 4,
    prerequisites: [10],
    relevance: 'Provides theoretical foundation for understanding model generalization, complexity, and performance',
    concepts: ['Bias-variance tradeoff', 'Empirical risk minimization', 'VC dimension', 'Generalization bounds', 'PAC learning', 'Overfitting and regularization'],
    breakdown: [
      'Day 1: Learning theory fundamentals and bias-variance tradeoff',
      'Day 2: Empirical risk minimization and learning bounds',
      'Day 3: Model complexity and regularization theory',
      'Day 4-5: Advanced topics and applications'
    ],
    stumbling: [
      'Understanding theoretical bounds intuitively',
      'Connecting theory to practical algorithms',
      'Applying complexity measures to real models'
    ],
    questions: [
      'How does the bias-variance tradeoff guide model selection?',
      'What theoretical guarantees support regularization techniques?'
    ],
    resources: [
      'Understanding Machine Learning: From Theory to Algorithms (Shalev-Shwartz)',
      'Statistical Learning Theory (Vapnik)',
      'Elements of Statistical Learning (Hastie et al.) - Chapters 2 and 7'
    ]
  },
  {
    id: 14,
    title: 'Feature Engineering',
    category: 'mlfoundations',
    duration: { best: 2, worst: 4 },
    difficulty: 3,
    prerequisites: [],
    relevance: 'Critical skill for preparing effective inputs for ML models across all domains',
    concepts: ['Data preprocessing', 'Feature scaling', 'Categorical encoding', 'Feature extraction', 'Feature selection', 'Domain-specific features'],
    breakdown: [
      'Day 1: Data preprocessing and feature scaling',
      'Day 2: Categorical features and encoding techniques',
      'Day 3: Feature selection and extraction methods',
      'Day 4 (if needed): Domain-specific feature engineering'
    ],
    stumbling: [
      'Deciding which features to create',
      'Handling high-cardinality categorical variables',
      'Avoiding data leakage in feature engineering'
    ],
    questions: [
      'How would you handle cyclical features like hours of day or days of week?',
      'What feature engineering approaches work well for biological sequence data?'
    ],
    resources: [
      'Feature Engineering for Machine Learning (O\'Reilly book)',
      'Kaggle feature engineering tutorials',
      'Applied Predictive Modeling (Kuhn & Johnson) - Chapter 3'
    ]
  },
  
  // CLASSICAL ML
  {
    id: 15,
    title: 'Linear & Logistic Regression',
    category: 'classicalml',
    duration: { best: 3, worst: 4 },
    difficulty: 2,
    prerequisites: [10, 11, 12],
    relevance: 'Foundational models that form the basis for more complex algorithms and neural network components',
    concepts: ['Linear regression', 'Gradient descent for regression', 'Normal equations', 'Logistic regression', 'Maximum likelihood estimation', 'Regularization (L1/L2)'],
    breakdown: [
      'Day 1: Linear regression models and estimation',
      'Day 2: Logistic regression fundamentals',
      'Day 3: Regularization techniques',
      'Day 4 (if needed): Advanced topics and implementations'
    ],
    stumbling: [
      'Understanding logistic regression as a probability model',
      'Interpreting coefficients correctly',
      'Choosing appropriate regularization'
    ],
    questions: [
      'When would you choose L1 vs. L2 regularization?',
      'How would you handle multi-class classification with logistic regression?'
    ],
    resources: [
      'StatQuest Linear Regression videos',
      'Andrew Ng\'s Machine Learning Course (Linear/Logistic Regression sections)',
      'Scikit-learn documentation for linear models'
    ]
  },
  {
    id: 16,
    title: 'Decision Trees & Random Forests',
    category: 'classicalml',
    duration: { best: 3, worst: 5 },
    difficulty: 3,
    prerequisites: [3, 13],
    relevance: 'Highly interpretable models excellent for tabular data and forming ensemble methods',
    concepts: ['Decision tree learning algorithms', 'Information gain & Gini impurity', 'Tree pruning', 'Ensemble methods', 'Random forests', 'Gradient boosting introduction'],
    breakdown: [
      'Day 1: Decision tree fundamentals and splits',
      'Day 2: Tree construction algorithms and pruning',
      'Day 3: Random forests and ensemble principles',
      'Day 4-5: Advanced ensemble techniques and hyperparameters'
    ],
    stumbling: [
      'Avoiding overfitting in decision trees',
      'Tuning random forest hyperparameters',
      'Interpreting feature importance measures'
    ],
    questions: [
      'How does feature sampling in random forests reduce correlation between trees?',
      'What criteria would you use to decide between information gain and Gini impurity?'
    ],
    resources: [
      'StatQuest Decision Tree and Random Forest videos',
      'Elements of Statistical Learning (Chapter 9 and 15)',
      'Scikit-learn documentation for tree-based methods'
    ]
  },
  {
    id: 17,
    title: 'Support Vector Machines',
    category: 'classicalml',
    duration: { best: 3, worst: 5 },
    difficulty: 4,
    prerequisites: [11, 12, 13],
    relevance: 'Powerful classification algorithm with strong theoretical foundations, especially useful for medium-sized datasets',
    concepts: ['Maximal margin classifier', 'Kernel methods', 'Soft margin SVM', 'Dual formulation', 'SVM regression', 'Multi-class SVM strategies'],
    breakdown: [
      'Day 1: Linear SVM and maximal margin principles',
      'Day 2: Kernel tricks and non-linear SVMs',
      'Day 3: Soft margin and practical considerations',
      'Day 4-5: Advanced topics and implementations'
    ],
    stumbling: [
      'Understanding the kernel trick intuitively',
      'Interpreting support vectors',
      'Choosing appropriate kernels and parameters'
    ],
    questions: [
      'When would you choose an SVM over logistic regression?',
      'How do you select an appropriate kernel for your data?'
    ],
    resources: [
      'MIT OpenCourseware 6.034 (SVM lecture)',
      'A User\'s Guide to Support Vector Machines (Cristianini)',
      'Elements of Statistical Learning (Chapter 12)'
    ]
  },
  {
    id: 18,
    title: 'Unsupervised Learning',
    category: 'classicalml',
    duration: { best: 4, worst: 6 },
    difficulty: 3,
    prerequisites: [11, 12],
    relevance: 'Essential for exploring structure in unlabeled data, feature extraction, and preprocessing',
    concepts: ['K-means clustering', 'Hierarchical clustering', 'DBSCAN', 'Dimensionality reduction', 'PCA', 't-SNE', 'UMAP', 'Gaussian mixture models'],
    breakdown: [
      'Day 1: K-means and basic clustering',
      'Day 2: Hierarchical and density-based clustering',
      'Day 3: PCA and linear dimensionality reduction',
      'Day 4: Non-linear dimensionality reduction',
      'Day 5-6: Advanced techniques and applications'
    ],
    stumbling: [
      'Determining the optimal number of clusters',
      'Interpreting PCA components meaningfully',
      'Understanding high-dimensional data visualization'
    ],
    questions: [
      'How would you evaluate the quality of clustering without labels?',
      'Why might t-SNE be preferred over PCA for visualizing biological data?'
    ],
    resources: [
      'StatQuest videos on clustering and dimensionality reduction',
      'Scikit-learn documentation for clustering and decomposition',
      'Elements of Statistical Learning (Chapter 14)'
    ]
  },
  {
    id: 19,
    title: 'Ensemble Methods',
    category: 'classicalml',
    duration: { best: 3, worst: 5 },
    difficulty: 4,
    prerequisites: [15, 16],
    relevance: 'Among the most powerful and widely used methods in practice, especially for structured data',
    concepts: ['Bagging', 'Boosting algorithms', 'AdaBoost', 'Gradient boosting', 'XGBoost', 'LightGBM', 'Stacking', 'Voting ensembles'],
    breakdown: [
      'Day 1: Ensemble principles and bagging',
      'Day 2: Boosting algorithms fundamentals',
      'Day 3: Modern gradient boosting implementations',
      'Day 4-5: Advanced ensemble techniques and tuning'
    ],
    stumbling: [
      'Understanding the differences between boosting variants',
      'Tuning boosting hyperparameters effectively',
      'Balancing computational efficiency and performance'
    ],
    questions: [
      'Why does gradient boosting often outperform random forests?',
      'How would you design an ensemble for a biological classification problem?'
    ],
    resources: [
      'XGBoost research paper and documentation',
      'Elements of Statistical Learning (Chapter 10)',
      'Applied Predictive Modeling (Kuhn & Johnson) - Chapter 8'
    ]
  },
  {
    id: 20,
    title: 'Model Evaluation & Validation',
    category: 'classicalml',
    duration: { best: 2, worst: 4 },
    difficulty: 3,
    prerequisites: [13],
    relevance: 'Critical for properly assessing model performance and ensuring generalization',
    concepts: ['Cross-validation techniques', 'Performance metrics', 'ROC and PR curves', 'Statistical significance tests', 'Learning curves', 'Bias-variance diagnostics'],
    breakdown: [
      'Day 1: Cross-validation strategies and implementation',
      'Day 2: Metrics for classification and regression',
      'Day 3: Diagnostic techniques and learning curves',
      'Day 4 (if needed): Advanced evaluation techniques'
    ],
    stumbling: [
      'Choosing appropriate metrics for imbalanced data',
      'Designing cross-validation for time series',
      'Interpreting learning curves correctly'
    ],
    questions: [
      'What validation strategy would you use for a small biomedical dataset?',
      'How would you determine if one model is statistically better than another?'
    ],
    resources: [
      'Applied Predictive Modeling (Kuhn & Johnson) - Chapter 4',
      'Scikit-learn documentation on model evaluation',
      'Elements of Statistical Learning (Chapter 7)'
    ]
  },
  
  // DEEP LEARNING
  {
    id: 21,
    title: 'Neural Networks Fundamentals',
    category: 'deeplearning',
    duration: { best: 4, worst: 7 },
    difficulty: 4,
    prerequisites: [11, 12, 15],
    relevance: 'Foundation for all deep learning methods and modern AI techniques',
    concepts: ['Perceptrons', 'Multilayer networks', 'Activation functions', 'Backpropagation', 'Regularization', 'Initialization strategies', 'Architectural patterns'],
    breakdown: [
      'Day 1: Neuron models and basic architectures',
      'Day 2: Forward propagation and activation functions',
      'Day 3: Backpropagation and training',
      'Day 4: Regularization and preventing overfitting',
      'Day 5-7: Implementation and practical considerations'
    ],
    stumbling: [
      'Understanding backpropagation intuitively',
      'Dealing with vanishing/exploding gradients',
      'Choosing appropriate architectures'
    ],
    questions: [
      'How do different activation functions affect training dynamics?',
      'What initialization strategy would you use for a deep network?'
    ],
    resources: [
      '3Blue1Brown Neural Network series',
      'Deep Learning (Goodfellow et al.) - Chapters 6-8',
      'Stanford CS231n (Neural Networks module)'
    ]
  },
  {
    id: 22,
    title: 'Convolutional Neural Networks',
    category: 'deeplearning',
    duration: { best: 4, worst: 6 },
    difficulty: 4,
    prerequisites: [21],
    relevance: 'Essential for image processing, computer vision, and any data with spatial structure',
    concepts: ['Convolution operations', 'Pooling layers', 'CNN architectures', 'Transfer learning', 'Visualization techniques', 'Applications beyond images'],
    breakdown: [
      'Day 1: Convolution and pooling operations',
      'Day 2: Classic CNN architectures (LeNet, AlexNet, VGG)',
      'Day 3: Modern architectures (ResNet, Inception, EfficientNet)',
      'Day 4: Transfer learning and fine-tuning',
      'Day 5-6: Implementation and applications'
    ],
    stumbling: [
      'Understanding convolution arithmetic',
      'Choosing appropriate architectures for specific problems',
      'Interpreting feature maps and filters'
    ],
    questions: [
      'How would you apply CNNs to 1D biological sequences?',
      'When should you use transfer learning versus training from scratch?'
    ],
    resources: [
      'Stanford CS231n (CNN lectures)',
      'Deep Learning with Python by François Chollet (Chapter 5)',
      'Visualizing and Understanding CNNs (Zeiler & Fergus paper)'
    ]
  },
  {
    id: 23,
    title: 'Recurrent Neural Networks',
    category: 'deeplearning',
    duration: { best: 3, worst: 6 },
    difficulty: 4,
    prerequisites: [21],
    relevance: 'Fundamental for sequential data like text, time series, and biological sequences',
    concepts: ['RNN architectures', 'LSTM and GRU units', 'Bidirectional RNNs', 'Sequence-to-sequence models', 'Attention mechanism basics', 'Vanishing gradient problem'],
    breakdown: [
      'Day 1: Basic RNN concepts and architectures',
      'Day 2: LSTM and GRU models',
      'Day 3: Bidirectional models and applications',
      'Day 4: Sequence-to-sequence frameworks',
      'Day 5-6: Implementation and specialized applications'
    ],
    stumbling: [
      'Understanding gates in LSTM/GRU units',
      'Managing long-term dependencies',
      'Designing effective sequence preprocessing'
    ],
    questions: [
      'When would you choose an LSTM over a GRU?',
      'How would you apply RNNs to predict protein functions from sequences?'
    ],
    resources: [
      'Colah\'s blog on Understanding LSTM Networks',
      'Stanford CS224n (RNN lectures)',
      'Deep Learning with Python by François Chollet (Chapter 6)'
    ]
  },
  {
    id: 24,
    title: 'Attention Mechanisms & Transformers',
    category: 'deeplearning',
    duration: { best: 4, worst: 7 },
    difficulty: 5,
    prerequisites: [21, 23],
    relevance: 'State-of-the-art architecture for NLP, increasingly used in other domains including biology',
    concepts: ['Self-attention', 'Multi-head attention', 'Positional encoding', 'Transformer architecture', 'BERT and GPT models', 'Vision transformers', 'Applications in biology'],
    breakdown: [
      'Day 1: Attention mechanisms fundamentals',
      'Day 2: Transformer architecture overview',
      'Day 3: Self-attention and multi-head attention',
      'Day 4: Modern transformer variants',
      'Day 5-7: Implementations and domain-specific applications'
    ],
    stumbling: [
      'Understanding attention scoring functions',
      'Visualizing self-attention mechanisms',
      'Implementing efficient transformer training'
    ],
    questions: [
      'How do transformers handle sequential data without recurrence?',
      'What adaptations would you make to apply transformers to biological sequences?'
    ],
    resources: [
      'Attention Is All You Need (original paper)',
      'The Illustrated Transformer (Jay Alammar)',
      'HuggingFace Transformers documentation'
    ]
  },
  {
    id: 25,
    title: 'Generative Models',
    category: 'deeplearning',
    duration: { best: 4, worst: 7 },
    difficulty: 5,
    prerequisites: [21, 22],
    relevance: 'Powerful framework for unsupervised learning, data generation, and representation learning',
    concepts: ['Autoencoders', 'Variational autoencoders', 'GANs', 'Diffusion models', 'Flow-based models', 'Energy-based models', 'Evaluation of generative models'],
    breakdown: [
      'Day 1: Autoencoder architectures and training',
      'Day 2: Variational autoencoders',
      'Day 3: GAN principles and training',
      'Day 4: Modern GAN architectures',
      'Day 5: Diffusion models',
      'Day 6-7: Applications and implementations'
    ],
    stumbling: [
      'Balancing generator and discriminator training in GANs',
      'Understanding the variational objective',
      'Evaluating generated samples effectively'
    ],
    questions: [
      'How would you use generative models for drug discovery?',
      'What advantages do diffusion models have over GANs?'
    ],
    resources: [
      'DeepMind\'s Variational Autoencoders tutorial',
      'GAN Hacks GitHub repository',
      'Stable Diffusion paper and implementation'
    ]
  },
  {
    id: 26,
    title: 'Deep Reinforcement Learning',
    category: 'deeplearning',
    duration: { best: 5, worst: 8 },
    difficulty: 5,
    prerequisites: [21],
    relevance: 'Powerful framework for decision-making, optimization, and interactive learning systems',
    concepts: ['RL fundamentals', 'Q-learning', 'Policy gradients', 'Deep Q-Networks', 'Actor-critic methods', 'AlphaGo/MuZero approaches', 'Applications in optimization'],
    breakdown: [
      'Day 1: RL foundations and terminology',
      'Day 2: Q-learning and Deep Q-Networks',
      'Day 3: Policy gradient methods',
      'Day 4: Actor-critic architectures',
      'Day 5: Advanced RL algorithms',
      'Day 6-8: Implementation and applications'
    ],
    stumbling: [
      'Balancing exploration and exploitation',
      'Designing effective reward functions',
      'Dealing with sample efficiency'
    ],
    questions: [
      'How could RL be applied to optimize treatment protocols?',
      'What approaches help with the sample efficiency problem in RL?'
    ],
    resources: [
      'Sutton & Barto Reinforcement Learning book',
      'Deep RL Bootcamp lectures',
      'Spinning Up in Deep RL (OpenAI)'
    ]
  },
  
  // APPLIED ML
  {
    id: 27,
    title: 'ML System Design',
    category: 'applied',
    duration: { best: 3, worst: 5 },
    difficulty: 4,
    prerequisites: [15, 16, 19, 20],
    relevance: 'Critical for building real-world ML systems beyond academic experiments',
    concepts: ['ML pipelines', 'Feature stores', 'Experiment tracking', 'Model versioning', 'Deployment strategies', 'Monitoring and maintenance', 'Technical debt in ML'],
    breakdown: [
      'Day 1: ML system components and architecture',
      'Day 2: Data pipelines and feature engineering at scale',
      'Day 3: Experiment management and model lifecycle',
      'Day 4-5: Deployment patterns and monitoring'
    ],
    stumbling: [
      'Designing for data distribution shifts',
      'Managing computational resources efficiently',
      'Balancing engineering and ML concerns'
    ],
    questions: [
      'How would you design an ML system for continuous model updating with new biological data?',
      'What monitoring metrics would you implement for a clinical decision support model?'
    ],
    resources: [
      'Hidden Technical Debt in ML Systems paper',
      'Designing Machine Learning Systems (O\'Reilly book)',
      'MLOps: Continuous delivery and automation pipelines in ML (Google)'
    ]
  },
  {
    id: 28,
    title: 'Natural Language Processing',
    category: 'applied',
    duration: { best: 4, worst: 7 },
    difficulty: 4,
    prerequisites: [21, 23, 24],
    relevance: 'Essential for text analysis, information extraction, and processing biomedical literature',
    concepts: ['Text preprocessing', 'Word embeddings', 'Language models', 'Text classification', 'Named entity recognition', 'Relation extraction', 'Biomedical NLP'],
    breakdown: [
      'Day 1: Text preprocessing and representation',
      'Day 2: Word embeddings and language models',
      'Day 3: Text classification and sentiment analysis',
      'Day 4: Information extraction tasks',
      'Day 5-7: Specialized biomedical NLP applications'
    ],
    stumbling: [
      'Handling domain-specific terminology',
      'Dealing with long documents',
      'Adapting general NLP to specialized domains'
    ],
    questions: [
      'How would you extract relationships between drugs and genes from biomedical literature?',
      'What approaches work well for biomedical named entity recognition?'
    ],
    resources: [
      'Stanford CS224n (NLP with Deep Learning)',
      'BioNLP tutorials and workshops',
      'Natural Language Processing with Transformers book'
    ]
  },
  {
    id: 29,
    title: 'Time Series Analysis',
    category: 'applied',
    duration: { best: 3, worst: 5 },
    difficulty: 4,
    prerequisites: [15, 19, 23],
    relevance: 'Important for sequential biological data, clinical monitoring, and longitudinal studies',
    concepts: ['Time series preprocessing', 'ARIMA models', 'Exponential smoothing', 'Prophet', 'RNNs for forecasting', 'Temporal CNNs', 'Multivariate time series'],
    breakdown: [
      'Day 1: Time series fundamentals and preprocessing',
      'Day 2: Classical forecasting methods',
      'Day 3: Deep learning for time series',
      'Day 4-5: Advanced techniques and multivariate analysis'
    ],
    stumbling: [
      'Handling irregular sampling intervals',
      'Incorporating external covariates',
      'Dealing with multiple seasonality patterns'
    ],
    questions: [
      'How would you forecast disease progression from longitudinal patient data?',
      'What approach works best for detecting anomalies in biosensor data?'
    ],
    resources: [
      'Forecasting: Principles and Practice (online book)',
      'Time Series Analysis and Its Applications (Shumway & Stoffer)',
      'sktime and Prophet documentation'
    ]
  },
  {
    id: 30,
    title: 'Graph Neural Networks',
    category: 'applied',
    duration: { best: 4, worst: 6 },
    difficulty: 5,
    prerequisites: [9, 21, 22],
    relevance: 'Powerful for modeling relational biological data like molecular structures and interaction networks',
    concepts: ['Graph convolutional networks', 'Graph attention networks', 'Message passing neural networks', 'Node/edge/graph embeddings', 'Link prediction', 'Graph classification', 'Molecular property prediction'],
    breakdown: [
      'Day 1: Graph neural network fundamentals',
      'Day 2: Graph convolutional networks',
      'Day 3: Graph attention and advanced architectures',
      'Day 4: Node and graph level tasks',
      'Day 5-6: Applications in biological and molecular graphs'
    ],
    stumbling: [
      'Designing effective message passing schemes',
      'Handling large-scale graphs',
      'Incorporating node and edge features'
    ],
    questions: [
      'How would you apply GNNs to predict protein-protein interactions?',
      'What graph neural network architecture works best for drug discovery tasks?'
    ],
    resources: [
      'Stanford CS224W (Machine Learning with Graphs)',
      'Graph Representation Learning Book (Hamilton)',
      'PyTorch Geometric and DGL documentation'
    ]
  }
];

// The full dataset would have all 30 topics
// Estimated total study days for the complete roadmap
const TOTAL_ROADMAP_DAYS = { best: 98, worst: 158 };

// Emergency plan data (30 days total - focus on essentials)
const emergencyPlan = [
  { week: '1', title: 'Foundations & Data Structures', topics: [
    { title: 'Core arrays and linked lists', days: 1 },
    { title: 'Hash tables fundamentals', days: 1 },
    { title: 'Tree basics and applications', days: 2 },
    { title: 'Algorithm complexity essentials', days: 1 },
    { title: 'Basic sorting and searching', days: 2 }
  ]},
  { week: '2', title: 'ML Fundamentals', topics: [
    { title: 'Probability essentials for ML', days: 2 },
    { title: 'Linear algebra for ML (vectors and matrices)', days: 2 },
    { title: 'Gradient descent and optimization basics', days: 2 },
    { title: 'Basic feature engineering', days: 1 }
  ]},
  { week: '3', title: 'Classical ML Algorithms', topics: [
    { title: 'Linear and logistic regression', days: 2 },
    { title: 'Decision trees and random forests', days: 2 },
    { title: 'Clustering fundamentals', days: 1 },
    { title: 'Model evaluation essentials', days: 2 }
  ]},
  { week: '4', title: 'Deep Learning Basics', topics: [
    { title: 'Neural network foundations', days: 3 },
    { title: 'CNN essentials', days: 2 },
    { title: 'RNN basics', days: 2 },
    { title: 'Practical ML implementation', days: 2 }
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
                <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-1">ML/Bioinformatics Relevance</h4>
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
                <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-1">Practical Questions</h4>
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
      <p className="mb-4 text-sm">If you need to quickly prepare for ML work or interviews, this accelerated plan covers the essential foundations:</p>
      
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
          <li>This accelerated plan requires daily focused study (7 days/week)</li>
          <li>Covers only essential concepts at a higher level</li>
          <li>Focuses on practical understanding over theoretical depth</li>
          <li>Will prepare you for basic ML work and discussions but not advanced research</li>
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
              ~6-10 months
            </div>
          </div>
          
          <div className="text-xs text-gray-500 mt-1">Comprehensive understanding of algorithms and ML</div>
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
          
          <div className="text-xs text-gray-500 mt-1">Essential working knowledge for practical applications</div>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-3 rounded border border-blue-100 text-sm">
          <div className="font-medium text-blue-800 mb-1">Complete Roadmap Approach</div>
          <ul className="text-gray-700 space-y-1 ml-4 list-disc">
            <li>Study 3-4 days per week</li>
            <li>Deep understanding of algorithms and theory</li>
            <li>Time for implementation practice</li>
            <li>Build projects to solidify knowledge</li>
          </ul>
        </div>
        
        <div className="bg-orange-50 p-3 rounded border border-orange-100 text-sm">
          <div className="font-medium text-orange-800 mb-1">Emergency Approach</div>
          <ul className="text-gray-700 space-y-1 ml-4 list-disc">
            <li>Study every day intensively</li>
            <li>Focus on high-leverage concepts</li>
            <li>Practical understanding over theory depth</li>
            <li>Emphasis on most commonly used algorithms</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Learning path suggestions
const LearningPathSuggestions = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 pb-2 border-b">Specialized Learning Paths</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="font-semibold mb-3 flex items-center">
            <span className="mr-2">🧪</span>
            Biological Data Analysis Path
          </h3>
          <p className="text-sm text-gray-600 mb-3">Focus on methods particularly relevant for biological data</p>
          <div className="space-y-2 text-sm">
            <div className="bg-blue-50 p-2 rounded-lg border border-blue-100">
              <span className="font-medium">Foundations (3-4 weeks):</span>
              <ul className="mt-1 ml-5 list-disc">
                <li>Data structures (1, 2)</li>
                <li>Basic algorithms (5, 6)</li>
                <li>Linear algebra & probability (10, 11)</li>
              </ul>
            </div>
            <div className="bg-green-50 p-2 rounded-lg border border-green-100">
              <span className="font-medium">Core ML (4-5 weeks):</span>
              <ul className="mt-1 ml-5 list-disc">
                <li>Feature engineering (14)</li>
                <li>Classical ML basics (15, 16, 18)</li>
                <li>Model evaluation (20)</li>
                <li>Neural networks fundamentals (21)</li>
              </ul>
            </div>
            <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
              <span className="font-medium">Specialized (4-6 weeks):</span>
              <ul className="mt-1 ml-5 list-disc">
                <li>Sequence analysis (23)</li>
                <li>Time series (29)</li>
                <li>Graph models (30)</li>
                <li>Natural language processing (28)</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="font-semibold mb-3 flex items-center">
            <span className="mr-2">⚙️</span>
            Algorithms-First Path
          </h3>
          <p className="text-sm text-gray-600 mb-3">Strong focus on algorithmic foundations before ML concepts</p>
          <div className="space-y-2 text-sm">
            <div className="bg-purple-50 p-2 rounded-lg border border-purple-100">
              <span className="font-medium">Data Structures (4-5 weeks):</span>
              <ul className="mt-1 ml-5 list-disc">
                <li>Arrays and linked lists (1)</li>
                <li>Stacks, queues, hash tables (2)</li>
                <li>Trees and graphs (3)</li>
                <li>Advanced structures (4)</li>
              </ul>
            </div>
            <div className="bg-pink-50 p-2 rounded-lg border border-pink-100">
              <span className="font-medium">Core Algorithms (5-7 weeks):</span>
              <ul className="mt-1 ml-5 list-disc">
                <li>Algorithm analysis (5)</li>
                <li>Sorting and searching (6)</li>
                <li>Divide & conquer (7)</li>
                <li>Dynamic programming (8)</li>
                <li>Graph algorithms (9)</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-2 rounded-lg border border-blue-100">
              <span className="font-medium">ML Transition (6-8 weeks):</span>
              <ul className="mt-1 ml-5 list-disc">
                <li>ML foundations (10, 11, 12, 13)</li>
                <li>Classical ML (15, 16, 19)</li>
                <li>Neural networks basics (21)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="font-semibold mb-3 flex items-center">
            <span className="mr-2">🧠</span>
            Deep Learning Focus Path
          </h3>
          <p className="text-sm text-gray-600 mb-3">Emphasis on modern deep learning and neural networks</p>
          <div className="space-y-2 text-sm">
            <div className="bg-blue-50 p-2 rounded-lg border border-blue-100">
              <span className="font-medium">Prerequisites (4-5 weeks):</span>
              <ul className="mt-1 ml-5 list-disc">
                <li>Basic data structures (1, 2)</li>
                <li>Algorithm analysis (5)</li>
                <li>Linear algebra and optimization (11, 12)</li>
                <li>Probability basics (10)</li>
              </ul>
            </div>
            <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
              <span className="font-medium">ML Essentials (3-4 weeks):</span>
              <ul className="mt-1 ml-5 list-disc">
                <li>Linear & logistic regression (15)</li>
                <li>Decision trees and ensembles (16, 19)</li>
                <li>Feature engineering (14)</li>
                <li>Model evaluation (20)</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-2 rounded-lg border border-orange-100">
              <span className="font-medium">Deep Learning (6-8 weeks):</span>
              <ul className="mt-1 ml-5 list-disc">
                <li>Neural networks fundamentals (21)</li>
                <li>CNNs and computer vision (22)</li>
                <li>RNNs and sequence modeling (23)</li>
                <li>Transformers (24)</li>
                <li>Generative models (25)</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="font-semibold mb-3 flex items-center">
            <span className="mr-2">🔧</span>
            Practical ML Engineering Path
          </h3>
          <p className="text-sm text-gray-600 mb-3">Focus on applying ML in real-world systems</p>
          <div className="space-y-2 text-sm">
            <div className="bg-indigo-50 p-2 rounded-lg border border-indigo-100">
              <span className="font-medium">Foundations (3-4 weeks):</span>
              <ul className="mt-1 ml-5 list-disc">
                <li>Essential data structures (1, 2)</li>
                <li>Basic algorithms and complexity (5, 6)</li>
                <li>Math essentials (10, 11)</li>
              </ul>
            </div>
            <div className="bg-green-50 p-2 rounded-lg border border-green-100">
              <span className="font-medium">ML Toolkit (5-7 weeks):</span>
              <ul className="mt-1 ml-5 list-disc">
                <li>Feature engineering (14)</li>
                <li>Classical ML algorithms (15, 16, 18, 19)</li>
                <li>Model evaluation (20)</li>
                <li>Neural network basics (21)</li>
                <li>Time series analysis (29)</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-2 rounded-lg border border-purple-100">
              <span className="font-medium">Engineering Focus (4-5 weeks):</span>
              <ul className="mt-1 ml-5 list-disc">
                <li>ML system design (27)</li>
                <li>Data pipelines and infrastructure</li>
                <li>Model deployment and monitoring</li>
                <li>Specialized applications (28, 29, 30)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component
const MLAlgorithmsRoadmap = () => {
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
        <h1 className="text-3xl font-bold mb-2">Machine Learning & Algorithm Foundations</h1>
        <p className="text-gray-600">A comprehensive roadmap from data structures to advanced ML, with focus on bioinformatics applications</p>
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
            <p className="text-sm text-gray-600">{filteredTopics.length} topics selected (from 30 total)</p>
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
      
      {/* Specialized Learning Paths */}
      <LearningPathSuggestions />
      
      {/* Emergency Plan Section */}
      <EmergencyPlanSection />
      
      {/* Flexible Study Schedule Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 pb-2 border-b">Flexible Study Schedule Options</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <h3 className="font-semibold mb-3">Light Schedule (9-12 months)</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="bg-green-100 rounded-full p-1 mr-2 text-green-800">✓</span>
                <div>
                  <strong>2-3 days per week</strong>
                  <p className="text-gray-600">1-2 hours per session, weekends + one weekday</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 rounded-full p-1 mr-2 text-green-800">✓</span>
                <div>
                  <strong>Ideal for:</strong>
                  <p className="text-gray-600">Full-time working professionals, busy students</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 rounded-full p-1 mr-2 text-green-800">✓</span>
                <div>
                  <strong>Progress pace:</strong>
                  <p className="text-gray-600">2-3 topics per month, focusing on high-priority areas first</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <h3 className="font-semibold mb-3">Medium Schedule (6-8 months)</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="bg-blue-100 rounded-full p-1 mr-2 text-blue-800">✓</span>
                <div>
                  <strong>3-4 days per week</strong>
                  <p className="text-gray-600">2 hours per day with weekend implementation projects</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 rounded-full p-1 mr-2 text-blue-800">✓</span>
                <div>
                  <strong>Ideal for:</strong>
                  <p className="text-gray-600">Part-time workers, summer break, semester with light course load</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 rounded-full p-1 mr-2 text-blue-800">✓</span>
                <div>
                  <strong>Progress pace:</strong>
                  <p className="text-gray-600">4-5 topics per month with time for practical implementation</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
          <h3 className="font-semibold mb-2">Planning Your Personalized Schedule</h3>
          <p className="text-sm mb-3">To create a balanced learning plan that fits with your bioinformatics program:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="font-medium mb-2 text-indigo-800">Before Program (Now-October)</div>
              <ul className="space-y-1 ml-4 list-disc">
                <li>Focus on prerequisites: data structures, algorithms, probability, linear algebra</li>
                <li>Add basic ML algorithms if time permits</li>
                <li>Aim for 2-3 study days per week</li>
              </ul>
            </div>
            
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="font-medium mb-2 text-indigo-800">First Semester (Oct-Feb)</div>
              <ul className="space-y-1 ml-4 list-disc">
                <li>Add classical ML concepts alongside coursework</li>
                <li>Select topics that complement your classes</li>
                <li>Lighter schedule during exams (1-2 days/week)</li>
              </ul>
            </div>
            
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="font-medium mb-2 text-indigo-800">Second Semester & Beyond</div>
              <ul className="space-y-1 ml-4 list-disc">
                <li>Add deep learning and specialized topics</li>
                <li>Align with research interests or thesis</li>
                <li>Implement projects using what you've learned</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-500 mt-8">
        <p>Remember: Quality of understanding is more important than quantity of topics covered.</p>
        <p className="mt-1">Focus on implementing algorithms and building projects to solidify your learning.</p>
      </div>
    </div>
  );
};

export default MLAlgorithmsRoadmap;