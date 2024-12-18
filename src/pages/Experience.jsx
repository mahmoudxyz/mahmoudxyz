import React, { useState } from 'react';
import { Calendar, Code, Fish, ShoppingBag, Construction, Briefcase, GraduationCap, Book, Star, Heart, Trophy, PenTool, LifeBuoy, Baby } from 'lucide-react';

const ExperiencePage = () => {
  const [activeItem, setActiveItem] = useState(null);

  const lifeJourney = [
    {
      id: 1,
      period: "2001",
      title: "The Beginning",
      icon: Heart,
      color: "bg-pink-500",
      description: "Born on October 25th, 2001. Early life had its challenges, including some difficult family dynamics.",
      type: "milestone"
    },
    {
      id: 2,
      period: "2011",
      role: "First Work Experience",
      icon: Baby,
      color: "bg-red-500",
      description: "Started working as a refrigerator repair assistant during school breaks. This early exposure to work taught valuable lessons about responsibility and technical skills.",
      details: "Learning to work with tools and handle customer interactions at a young age.",
      type: "work"
    },
    {
      id: 3,
      period: "2012",
      role: "Construction Work",
      icon: Construction,
      color: "bg-orange-500",
      description: "Worked in gypsum ceiling installation, showing early signs of dedication and work ethic.",
      type: "work"
    },
    {
      id: 4,
      period: "2013",
      role: "Retail Experience",
      icon: ShoppingBag,
      color: "bg-purple-500",
      description: "Worked as a shoe store sales associate, developing customer service skills.",
      type: "work"
    },
    {
      id: 5,
      period: "2014",
      role: "Restaurant Work",
      icon: Fish,
      color: "bg-cyan-500",
      description: "Worked at a seafood restaurant in Baltim, washing dishes and handling kitchen duties. Used earnings to buy first mobile phone - a significant milestone of independence.",
      details: "This period marked a crucial turning point in building self-reliance and work ethic.",
      type: "work"
    },
    {
      id: 6,
      period: "2015-2016",
      title: "Academic Transformation",
      icon: Star,
      color: "bg-yellow-500",
      description: "Despite suggestions to pursue vocational education, ranked 8th in school. This period marked a significant shift in academic performance and self-belief.",
      highlights: [
        "Developed strong study habits",
        "Overcame initial doubts and skepticism",
        "Proved capabilities despite challenges"
      ],
      type: "achievement"
    },
    {
      id: 7,
      period: "2019",
      title: "Outstanding Achievement",
      icon: Trophy,
      color: "bg-amber-500",
      description: "Scored 98.2% in secondary school, a testament to dedication and perseverance.",
      details: "This achievement opened new opportunities and validated the journey of self-improvement.",
      type: "achievement"
    },
    {
      id: 8,
      period: "2019-2024",
      role: "Pharmacy Education",
      icon: GraduationCap,
      color: "bg-green-500",
      description: "Completed pharmacy education while maintaining a passion for learning and growth.",
      details: "Used this time to also explore programming and technology independently.",
      type: "education"
    },
    {
      id: 9,
      period: "2022 - Present",
      role: "Software Engineer",
      icon: Code,
      color: "bg-blue-500",
      description: "Self-taught programming through dedication and systematic learning. Studied computer science curricula independently.",
      skills: ["Web Development", "Programming", "Problem Solving"],
      type: "career"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">A Story of Perseverance</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From early challenges to academic excellence and professional growth, 
            this journey shows that it's never too late to redefine yourself and achieve your goals.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />

          {/* Journey items */}
          {lifeJourney.map((item, index) => (
            <div 
              key={item.id}
              className={`relative mb-12 ${index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8'} md:w-1/2`}
              onMouseEnter={() => setActiveItem(item.id)}
              onMouseLeave={() => setActiveItem(null)}
            >
              <div 
                className={`
                  p-6 rounded-xl border bg-card hover:shadow-lg transition-all duration-300
                  ${activeItem === item.id ? 'scale-105' : ''}
                `}
              >
                {/* Timeline dot */}
                <div className={`
                  absolute top-6 ${index % 2 === 0 ? 'md:-left-3' : 'md:-right-3'}
                  w-6 h-6 rounded-full ${item.color} flex items-center justify-center
                  transform transition-transform duration-300
                  ${activeItem === item.id ? 'scale-125' : ''}
                `}>
                  <item.icon className="h-3 w-3 text-white" />
                </div>

                <div className="mb-4">
                  <span className="text-sm text-muted-foreground">{item.period}</span>
                  <h3 className="text-xl font-semibold mt-1">{item.role || item.title}</h3>
                </div>

                <p className="text-muted-foreground mb-4">{item.description}</p>

                {item.details && (
                  <p className="text-sm text-muted-foreground mb-4 italic">
                    {item.details}
                  </p>
                )}

                {item.highlights && (
                  <ul className="space-y-1 mt-4">
                    {item.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <span className="mr-2">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}

                {item.skills && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.skills.map(skill => (
                      <span 
                        key={skill}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Inspirational Quote */}
        <div className="text-center mt-20">
          <blockquote className="text-2xl font-serif italic mb-6">
            "It's never too late - مفيش الوقت اتأخر، لسه بدري"
          </blockquote>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            This journey shows that with determination and hard work, you can overcome any obstacle 
            and redefine your path. Every experience, whether challenging or triumphant, 
            contributes to who we become.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExperiencePage;