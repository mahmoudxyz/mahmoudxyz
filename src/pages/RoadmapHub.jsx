import React from 'react';

/**
 * RoadmapHub - Navigation component for learning roadmaps
 * 
 * This component renders a list of available roadmaps with navigation links.
 * It's designed to work with React Router or any navigation system.
 */
const RoadmapHub = () => {
  // Roadmap data
  const roadmaps = [
    {
      id: "stats-roadmap",
      path: "/stats-roadmap",
      title: "Statistics & ML for Bioinformatics",
      description: "For pharmacy graduates transitioning to bioinformatics",
      icon: "📊",
      color: "bg-gradient-to-r from-blue-500 to-indigo-600",
      iconBg: "bg-blue-100"
    },
    {
      id: "calc-roadmap",
      path: "/calc-roadmap",
      title: "Linear Algebra & Calculus",
      description: "Mathematical foundations for data science",
      icon: "🧮",
      color: "bg-gradient-to-r from-green-500 to-teal-600",
      iconBg: "bg-green-100"
    },
    {
      id: "it-roadmap",
      path: "/it-roadmap",
      title: "Italian A1 Language",
      description: "Beginner's path to conversational Italian",
      icon: "🇮🇹",
      color: "bg-gradient-to-r from-red-500 to-pink-600",
      iconBg: "bg-red-100"
    },
    {
      id: "ml-roadmap",
      path: "/ml-roadmap",
      title: "Machine Learning Algorithms",
      description: "Practical ML implementation and theory",
      icon: "🤖",
      color: "bg-gradient-to-r from-purple-500 to-violet-600",
      iconBg: "bg-purple-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Learning Roadmaps</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Structured learning paths to guide your educational journey
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {roadmaps.map((roadmap) => (
            <div 
              key={roadmap.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className={`h-1.5 w-full ${roadmap.color}`}></div>
              <div className="p-8">
                <div className="flex items-start mb-5">
                  <div className={`${roadmap.iconBg} p-3 rounded-lg text-2xl mr-4`}>
                    {roadmap.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{roadmap.title}</h2>
                    <p className="text-gray-500 mt-1">{roadmap.description}</p>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <a 
                    href={roadmap.path}
                    className={`px-5 py-3 rounded-lg text-sm font-medium text-white transition-all ${roadmap.color} inline-block text-center`}
                  >
                    View Roadmap
                  </a>
                  <a 
                    href={roadmap.path}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="px-5 py-3 rounded-lg text-sm font-medium border border-gray-300 hover:bg-gray-50 transition-all inline-block text-center"
                  >
                    Open in New Tab
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use These Roadmaps</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-2xl mb-4">
                🔍
              </div>
              <h3 className="font-bold text-lg mb-2">Explore</h3>
              <p className="text-gray-600">Browse topics and discover structured learning paths tailored to your interests.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl mb-4">
                📝
              </div>
              <h3 className="font-bold text-lg mb-2">Plan</h3>
              <p className="text-gray-600">Choose from standard or accelerated learning plans based on your schedule and goals.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 text-2xl mb-4">
                📚
              </div>
              <h3 className="font-bold text-lg mb-2">Learn</h3>
              <p className="text-gray-600">Follow the progression, use recommended resources, and test your knowledge with practice exercises.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapHub;