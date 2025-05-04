import React, { useState, useEffect } from 'react';
import LandingPage from './LandingPage'; // Import your existing terminal component

// Reusable components
const SectionHeading = ({ children, id }) => {
  const [darkMode] = useState(false); // This would come from context in a real implementation
  
  return (
    <h2 className="text-2xl md:text-3xl font-bold mb-8 inline-block relative scroll-mt-24" id={id}>
      <span className={`bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent`}>
        {children}
      </span>
      <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full"></span>
    </h2>
  );
};

const Card = ({ children, className = "" }) => {
  const [darkMode] = useState(false); // This would come from props or context in a real implementation
  const cardBg = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  
  return (
    <div className={`${cardBg} rounded-xl shadow-md p-6 border transition-all hover:shadow-lg ${className}`}>
      {children}
    </div>
  );
};

const Pill = ({ children, color = "blue", size = "sm", darkMode = false }) => {
  const bgColor = {
    blue: darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700',
    green: darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700',
    purple: darkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-700',
    gray: darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700',
    indigo: darkMode ? 'bg-indigo-900/30 text-indigo-300' : 'bg-indigo-100 text-indigo-700',
  }[color];
  
  const sizeClass = {
    xs: 'text-xs px-2 py-1',
    sm: 'text-sm px-3 py-1',
    md: 'text-base px-4 py-1.5',
  }[size];
  
  return (
    <span className={`${bgColor} ${sizeClass} rounded-full font-medium inline-block`}>
      {children}
    </span>
  );
};

const ContactCard = ({ icon, title, content, href, bgColor = "blue", darkMode = false }) => {
  const iconBg = {
    blue: darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600',
    green: darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600',
    purple: darkMode ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-600',
    red: darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600',
  }[bgColor];
  
  const textColor = {
    blue: darkMode ? 'text-blue-300' : 'text-blue-700',
    green: darkMode ? 'text-green-300' : 'text-green-700',
    purple: darkMode ? 'text-purple-300' : 'text-purple-700',
    red: darkMode ? 'text-red-300' : 'text-red-700',
  }[bgColor];
  
  const hoverBg = darkMode ? 'hover:bg-gray-800' : 'hover:bg-blue-50';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';
  
  const CardContent = () => (
    <>
      <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div>
        <h3 className={`font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-1`}>{title}</h3>
        <p className={textColor}>
          {content}
        </p>
      </div>
    </>
  );
  
  if (href) {
    return (
      <a href={href} className={`${hoverBg} p-4 rounded-lg flex items-center border ${borderColor} transition-all duration-200 group`}>
        <CardContent />
      </a>
    );
  }
  
  return (
    <div className={`p-4 rounded-lg flex items-center border ${borderColor}`}>
      <CardContent />
    </div>
  );
};

// Main component
function RetroPortfolio() {
  const [viewMode, setViewMode] = useState('retro'); // 'retro' or 'terminal'
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Check system preference for dark mode on initial load
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  // Toggle between retro and terminal views
  const toggleViewMode = () => {
    setViewMode(viewMode === 'retro' ? 'terminal' : 'retro');
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Close mobile menu when a link is clicked
  const handleNavClick = () => {
    setMenuOpen(false);
  };

  // If terminal mode is selected, render the original LandingPage component
  if (viewMode === 'terminal') {
    return (
      <div className="relative w-full h-full min-h-screen">
        <div className="fixed bottom-4 right-4 md:top-5 md:right-5 z-50">
          <button 
            onClick={toggleViewMode} 
            className="px-3 py-2 bg-indigo-700 text-white font-bold rounded-lg shadow-md hover:bg-indigo-800 transition-all"
          >
            Switch to Modern View
          </button>
        </div>
        <LandingPage />
      </div>
    );
  }

  // Classes for dark/light mode
  const bgColor = darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900';
  const navBg = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const mobileMenuBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const cardBg = darkMode ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-gray-200';

  // Navigation items - DRY principle
  const navItems = [
    { name: 'ABOUT', href: '#about' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'EDUCATION', href: '#education' },
    { name: 'CONTACT', href: '#contact' }
  ];

  // Social links - DRY principle
  const socialLinks = [
    { 
      name: 'GitHub', 
      href: 'https://github.com/mahmoudxyz',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    },
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com/in/mahmoud4dev',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
      </svg>
    },
    { 
      name: 'Twitter', 
      href: 'https://twitter.com/mahmoudahmedxyz',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
      </svg>
    }
  ];

  // Header component
  const Header = () => (
    <header className="relative overflow-hidden pt-20 pb-16 md:py-24 px-4 md:px-8 bg-gradient-to-r from-blue-700 to-indigo-800 text-white w-full">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mt-10 -mr-20 w-64 h-64 rounded-full opacity-20 bg-white blur-2xl"></div>
      <div className="absolute bottom-0 left-0 -mb-10 -ml-20 w-64 h-64 rounded-full opacity-10 bg-white blur-2xl"></div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          <div>
            {/* Profile image with animation */}
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:border-white/60">
              <img 
                src="https://media.licdn.com/dms/image/v2/D4D03AQF9hamX9XPW6g/profile-displayphoto-shrink_800_800/B4DZUlW79VG8Ag-/0/1740088526260?e=1751500800&v=beta&t=S48LiF09Q8i4qvIsZvn1Xf821kxEdDccIJueSaf9i6Q"
                alt="Mahmoud Ibrahim"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="text-center md:text-left">
            {/* Name with animated underline on hover */}
            <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight relative inline-block group">
              Mahmoud Ibrahim
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-white group-hover:w-full transition-all duration-500 ease-in-out"></span>
            </h1>
            
            {/* Title badge */}
            <div className="inline-block px-4 py-1.5 mb-4 text-sm md:text-base font-medium rounded-full bg-white/20 backdrop-blur-sm">
              Full Stack Engineer with Pharmacy Background
            </div>
            
            {/* Brief intro */}
            <p className="max-w-lg text-white/90 mb-6 md:mb-8 text-sm md:text-base leading-relaxed">
              Building bridges between biology and technology with a unique interdisciplinary skill set
              focused on innovation and clean code.
            </p>
            
            {/* Contact buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <a 
                href="mailto:mahmoudahmedxyz@gmail.com" 
                className="px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm transition-all flex items-center text-sm group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Me
              </a>
              <a 
                href="https://github.com/mahmoudxyz" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm transition-all flex items-center text-sm group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a 
                href="https://linkedin.com/in/mahmoud-xyz" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm transition-all flex items-center text-sm group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  // Mode toggle components 
  const DesktopModeToggles = () => (
    <div className="hidden md:flex fixed bottom-5 right-5 z-40 space-x-2">
      <button 
        onClick={toggleDarkMode} 
        className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-indigo-100 text-indigo-900'} shadow-md hover:shadow-lg transition-all`}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
      <button 
        onClick={toggleViewMode} 
        className="px-3 py-2 bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
      >
        Switch to Terminal
      </button>
    </div>
  );

  // FAB style mobile toggle buttons
  const MobileModeToggles = () => (
    <div className="md:hidden fixed bottom-4 right-4 z-40 flex flex-col space-y-2">
      <button 
        onClick={toggleDarkMode} 
        className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-indigo-100 text-indigo-900'} shadow-md hover:shadow-lg transition-all`}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
      <button 
        onClick={toggleViewMode} 
        className="p-3 rounded-full bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-lg flex items-center justify-center"
        aria-label="Switch to Terminal View"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  );

  // Navigation component with mobile responsive design
  const Navigation = () => (
    <nav className={`sticky top-0 z-30 ${navBg} shadow-md border-b transition-colors duration-300 w-full`}>
      <div className="container mx-auto max-w-7xl px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-between items-center py-4">
          <div className="text-lg font-semibold">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">MI</span>
          </div>
          <ul className="flex items-center space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <a href={item.href} className={`font-medium ${darkMode ? 'hover:text-blue-400' : 'hover:text-blue-700'} transition-all text-sm relative group`}>
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-700 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-between items-center py-4">
          <div className="text-lg font-semibold">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">Mahmoud Ibrahim</span>
          </div>
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="p-2 rounded-lg focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {menuOpen && (
          <div className={`md:hidden ${mobileMenuBg} py-4 px-2 rounded-lg shadow-lg absolute left-4 right-4 z-50 transition-all duration-300 transform origin-top`}>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    onClick={handleNavClick}
                    className={`block px-3 py-2 rounded-lg ${darkMode ? 'hover:bg-blue-900/30' : 'hover:bg-blue-100'} transition-colors duration-200`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );

  // About section component
  const AboutSection = () => (
    <section className="mb-16 scroll-mt-24" id="about">
      <SectionHeading>About Me</SectionHeading>
      <div className={`${cardBg} rounded-xl shadow-md p-6 border transition-all hover:shadow-lg`}>
        <div className="space-y-4 leading-relaxed">
          <p>
            I am a Full Stack Engineer with a background in Pharmacy, pursuing a shift into 
            Bioinformatics to combine my scientific foundation with software expertise.
          </p>
          <p>
            My experience includes building scalable backend systems and creating educational content
            for developers at JetBrains Academy. I bridge the gap between biology and technology
            with a unique skill set that spans both worlds.
          </p>
          <div className={`border-l-4 border-blue-600 pl-4 py-2 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} rounded-r-lg mt-6`}>
            <p className={`italic ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
              "I write code that works and documentation that explains why."
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  // Skills section with skill cards
  const SkillsSection = () => {
    const skills = [
      {
        title: "Backend Development",
        description: "Spring Boot, RESTful APIs, Microservices, PostgreSQL, Java, Kotlin",
        detail: "Experienced in building reliable and scalable backend services.",
        color: "blue",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
          </svg>
        )
      },
      {
        title: "Frontend Development",
        description: "JavaScript, TypeScript, React.js, NextJS, Tailwind CSS, HTML5",
        detail: "Creating responsive and intuitive user interfaces.",
        color: "indigo",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-700'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )
      },
      {
        title: "Pharmacy & Science",
        description: "Clinical Pharmacy, Molecular Biology, Biochemistry, Pharmaceutical Analysis",
        detail: "Scientific background that enhances my technical perspective.",
        color: "purple",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${darkMode ? 'text-purple-400' : 'text-purple-700'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        )
      },
      {
        title: "Technical Writing",
        description: "Educational Content, Documentation, Tutorials, Hands-on Topics",
        detail: "Explaining complex concepts in accessible ways.",
        color: "green",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${darkMode ? 'text-green-400' : 'text-green-700'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        )
      }
    ];

    const SkillCard = ({ skill }) => {
      const { title, description, detail, color, icon } = skill;
      
      const accentColor = {
        blue: 'from-blue-600 to-blue-700',
        indigo: 'from-indigo-600 to-indigo-700',
        purple: 'from-purple-600 to-purple-700',
        green: 'from-green-600 to-green-700'
      }[color];
      
      const iconBg = {
        blue: darkMode ? 'bg-blue-900/30' : 'bg-blue-100',
        indigo: darkMode ? 'bg-indigo-900/30' : 'bg-indigo-100',
        purple: darkMode ? 'bg-purple-900/30' : 'bg-purple-100',
        green: darkMode ? 'bg-green-900/30' : 'bg-green-100'
      }[color];
      
      const textColor = {
        blue: darkMode ? 'text-blue-400' : 'text-blue-700',
        indigo: darkMode ? 'text-indigo-400' : 'text-indigo-700',
        purple: darkMode ? 'text-purple-400' : 'text-purple-700',
        green: darkMode ? 'text-green-400' : 'text-green-700'
      }[color];
      
      return (
        <div className={`${cardBg} rounded-xl shadow-md overflow-hidden transform transition-all hover:shadow-lg hover:-translate-y-1 border group`}>
          <div className={`h-1 w-full bg-gradient-to-r ${accentColor}`}></div>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className={`p-2 rounded-lg ${iconBg} mr-4 group-hover:scale-105 transition-transform`}>
                {icon}
              </div>
              <h3 className={`font-bold text-lg ${textColor}`}>{title}</h3>
            </div>
            <p className="mb-3">{description}</p>
            <p className={`text-sm italic ${textColor}/70`}>{detail}</p>
          </div>
        </div>
      );
    };

    return (
      <section className="mb-16 scroll-mt-24" id="skills">
        <SectionHeading>Technical Skills</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill) => (
            <SkillCard key={skill.title} skill={skill} />
          ))}
        </div>
      </section>
    );
  };
  
  // Projects section
  const ProjectsSection = () => (
    <section className="mb-16 scroll-mt-24" id="projects">
      <SectionHeading>Featured Project</SectionHeading>
      
      <div className={`${cardBg} rounded-xl shadow-lg overflow-hidden border transition-all hover:shadow-xl transform hover:-translate-y-1 duration-300`}>
        {/* Project header with gradient */}
        <div className="relative overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-blue-700 to-indigo-700"></div>
          <div className="absolute inset-0 bg-opacity-90 flex items-center justify-between p-6">
            <h3 className="text-xl md:text-2xl font-bold text-white">GenBankinator</h3>
            <a 
              href="https://genbankinator.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white text-blue-700 px-4 py-2 rounded-full font-bold hover:bg-blue-50 transition-all text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              VISIT SITE
            </a>
          </div>
          
          {/* Project logo */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="p-6 pt-12">
          <p className="mb-6 leading-relaxed">
            Convert your FASTA sequence and annotation files to the GenBank format with this easy-to-use tool.
            Simplifies an essential bioinformatics task that would otherwise require manual formatting.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className={`${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-blue-50 border-blue-200'} p-4 rounded-lg border`}>
              <h4 className={`font-bold ${darkMode ? 'text-blue-400' : 'text-blue-700'} mb-2 flex items-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Convert to GenBank
              </h4>
              <p className="text-sm">Upload your files to convert them to GenBank format efficiently.</p>
            </div>
            <div className={`${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-blue-50 border-blue-200'} p-4 rounded-lg border`}>
              <h4 className={`font-bold ${darkMode ? 'text-blue-400' : 'text-blue-700'} mb-2 flex items-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Manage Files
              </h4>
              <p className="text-sm">View and organize your uploaded files and conversions.</p>
            </div>
          </div>
          
          <div className={`text-sm ${darkMode ? 'text-gray-400 border-gray-700' : 'text-gray-600 border-gray-200'} border-t pt-4 flex items-center flex-wrap gap-2`}>
            <span className="font-bold mr-2">Technologies:</span>
            <Pill color="blue" size="xs" darkMode={darkMode}>JavaScript</Pill>
            <Pill color="blue" size="xs" darkMode={darkMode}>NextJS</Pill>
            <Pill color="blue" size="xs" darkMode={darkMode}>Bioinformatics APIs</Pill>
          </div>
        </div>
      </div>
    </section>
  );
  
  // Experience section with timeline
  const ExperienceSection = () => {
    const experiences = [
      {
        title: "Software Developer",
        company: "N2N",
        period: "Current",
        description: "At N2NLab, I reduced integration time through automated workflows and secure architectures. Experienced in RESTful APIs, microservices, and PostgreSQL, I deliver high-performance backend solutions that align with business goals.",
        skills: ["RESTful APIs", "Microservices", "PostgreSQL"],
        color: "blue"
      },
      {
        title: "Writer",
        company: "JetBrains Academy",
        period: "08/2022 – 12/2023",
        description: "Created high-quality learning content for Kotlin, Java, and backend development tracks, helping thousands of learners build real-world programming skills. Authored theory, exercises, and hands-on topics, including annotations, lambda expressions, Kotlin reflection, and Spring dependency injection.",
        skills: ["Kotlin", "Java", "Spring", "Educational Content"],
        color: "indigo"
      }
    ];

    return (
      <section className="mb-16 scroll-mt-24" id="experience">
        <SectionHeading>Work Experience</SectionHeading>
        
        {/* Timeline layout */}
        <div className={`relative border-l-2 ${darkMode ? 'border-blue-500' : 'border-blue-600'} pl-8 ml-4 space-y-12`}>
          {experiences.map((exp, index) => {
            const dotColor = exp.color === 'blue' ? 'bg-blue-600' : 'bg-indigo-600';
            const titleColor = exp.color === 'blue' ? 
              (darkMode ? 'text-blue-400' : 'text-blue-700') : 
              (darkMode ? 'text-indigo-400' : 'text-indigo-700');
            
            return (
              <div className="relative" key={index}>
                {/* Timeline dot */}
                <div className={`absolute -left-12 top-0 w-6 h-6 rounded-full ${dotColor} border-4 ${darkMode ? 'border-gray-900' : 'border-white'} shadow-md`}></div>
                
                <div className={`${cardBg} rounded-xl shadow-md p-6 border transition-all hover:shadow-lg`}>
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                    <h3 className={`text-xl font-bold ${titleColor}`}>{exp.title}</h3>
                    <Pill color={exp.color} size="sm" darkMode={darkMode}>{exp.period}</Pill>
                  </div>
                  <div className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <span className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{exp.company}</span>
                  </div>
                  <p className="mb-4 leading-relaxed">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, i) => (
                      <Pill key={i} color="gray" size="xs" darkMode={darkMode}>{skill}</Pill>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  };
  
  // Education section
  const EducationSection = () => (
    <section className="mb-16 scroll-mt-24" id="education">
      <SectionHeading>Education</SectionHeading>
      
      <div className={`${cardBg} rounded-xl shadow-md overflow-hidden transform transition-all hover:shadow-lg hover:-translate-y-1 border`}>
        <div className="md:flex">
          {/* University logo/icon section */}
          <div className="md:w-1/4 bg-gradient-to-br from-blue-700 to-indigo-700 p-6 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
          </div>
          
          {/* Education details section */}
          <div className="md:w-3/4 p-6">
            <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>Bachelor of Pharmacy – Clinical Pharmacy</h3>
              <Pill color="blue" darkMode={darkMode}>10/2019 – Current</Pill>
            </div>
            <div className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              <span className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Kafrelsheikh University</span>
            </div>
            <p className="mb-4 leading-relaxed">
              Pursuing a Bachelor of Pharmacy degree with a focus on Clinical Pharmacy. Balancing 
              academic studies with professional software development work to build a unique 
              interdisciplinary skill set.
            </p>
            <div className="flex flex-wrap gap-2">
              <Pill color="gray" size="xs" darkMode={darkMode}>Clinical Pharmacy</Pill>
              <Pill color="gray" size="xs" darkMode={darkMode}>Pharmaceutical Analysis</Pill>
              <Pill color="gray" size="xs" darkMode={darkMode}>Molecular Biology</Pill>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
  
  // Contact section
  const ContactSection = () => {
    const contacts = [
      {
        title: "Email",
        content: "mahmoudahmedxyz@gmail.com",
        href: "mailto:mahmoudahmedxyz@gmail.com",
        bgColor: "blue",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )
      },
      {
        title: "Phone",
        content: "(+20) 01090227505",
        href: "tel:+201090227505",
        bgColor: "green",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        )
      },
      {
        title: "Website",
        content: "mahmoudxyz.vercel.app",
        href: "https://mahmoudxyz.vercel.app/",
        bgColor: "purple",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        )
      },
      {
        title: "Location",
        content: "Kafr Elshikh, Egypt",
        href: null,
        bgColor: "red",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${darkMode ? 'text-red-400' : 'text-red-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )
      }
    ];

    return (
      <section className="mb-16 scroll-mt-24" id="contact">
        <SectionHeading>Contact Information</SectionHeading>
        
        <div className={`${cardBg} rounded-xl shadow-md p-6 border transition-all hover:shadow-lg`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contacts.map((contact, index) => (
              <ContactCard
                key={index}
                icon={contact.icon}
                title={contact.title}
                content={contact.content}
                href={contact.href}
                bgColor={contact.bgColor}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  // Footer component
  const Footer = () => (
    <footer className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-100'} py-8 border-t transition-colors duration-300 w-full`}>
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Mahmoud Ibrahim
            </h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
              Full Stack Engineer & Pharmacy Professional
            </p>
          </div>
          
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800'} hover:bg-blue-600 dark:hover:bg-blue-700 hover:text-white transition-colors`}
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} pt-6 flex flex-col md:flex-row justify-between items-center`}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 md:mb-0`}>
            © 2025 Mahmoud Ibrahim. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {navItems.map((item, index) => (
              <a 
                key={index}
                href={item.href} 
                className={`${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-700'} transition-colors`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
        
        <p className={`mt-6 text-center text-xs italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Designed with modern aesthetics and responsive functionality
        </p>
      </div>
    </footer>
  );

  // Render the modern version with proper main wrapper
  return (
    <div id="main" className={`min-h-screen w-full ${bgColor} font-sans transition-colors duration-300`}>
      {/* Toggle buttons for different screen sizes */}
      <DesktopModeToggles />
      <MobileModeToggles />

      <div className="flex flex-col w-full">
        <Header />
        <Navigation />
        
        <main className="flex-grow w-full">
          <div className="container mx-auto max-w-7xl px-4 md:px-8 py-12">
            <AboutSection />
            <ExperienceSection />
            <ModernQuoteCard darkMode={darkMode} type="random" />
            <SkillsSection />
            <ProjectsSection />
            <EducationSection />
            <ContactSection />
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

export default RetroPortfolio;




// Deep/Philosophical Quotes

const philosophicalQuotes = [
  {
    text: "The universe may be made of atoms, but great products are made of user stories and caffeine.",
    author: "Mahmoud Ibrahim"
  },
  {
    text: "Biology runs on complexity; technology strives for simplicity. My work lives in the delicate balance between these worlds.",
    author: "Mahmoud Ibrahim"
  },
  {
    text: "In the quiet space between requirement and solution lies the art of engineering.",
    author: "Mahmoud Ibrahim"
  },
  {
    text: "The most elegant solution often emerges only after you've fully embraced the chaos of the problem.",
    author: "Mahmoud Ibrahim"
  },
  {
    text: "Nature spent billions of years optimizing its code. As engineers, we're just trying to catch up.",
    author: "Mahmoud Ibrahim"
  }
];

// Humorous Quotes

const humorousQuotes = [
  {
    text: "To err is human; to really mess things up requires a deployment script.",
    author: "Mahmoud Ibrahim"
  },
  {
    text: "My debugging strategy: stare at the screen until either the solution appears or my coffee disappears.",
    author: "Mahmoud Ibrahim"
  },
  {
    text: "If debugging is the process of removing bugs, then programming must be the process of putting them in.",
    author: "Mahmoud Ibrahim"
  },
  {
    text: "My doctor prescribed a life without caffeine. I told him I'd rather debug someone else's CSS.",
    author: "Mahmoud Ibrahim"
  },
  {
    text: "The distance between theory and practice is shorter in theory than in practice.",
    author: "Mahmoud Ibrahim"
  }
];

// Sarcastic Quotes

const sarcasticQuotes = [
  {
    text: "Of course it works on my machine. That's where I tested it.",
    author: "Mahmoud Ibrahim"
  },
  {
    text: "Sure, let's add that 'small feature' that definitely won't cascade into a complete rewrite.",
    author: "Mahmoud Ibrahim"
  },
  {
    text: "Ah yes, the mysterious 'it should be easy' requirement that turns into a week-long odyssey.",
    author: "Mahmoud Ibrahim"
  },
  {
    text: "Nothing makes me more productive than the panic of a deadline I've been ignoring for weeks.",
    author: "Mahmoud Ibrahim"
  },
  {
    text: "The best part about being a developer is that I can build solutions to problems I created in the first place.",
    author: "Mahmoud Ibrahim"
  }
];

// Intersection of Biology and Technology Quotes

const bioTechQuotes = [
  {
    text: "The human body is the most elegant distributed system ever designed. No wonder I'm fascinated by both medicine and software architecture.",
    author: "Mahmoud Ibrahim"
  },
  {
    text: "Biological processes are the original microservices architecture. Everything we build is just an echo of nature's design patterns.",
    author: "Mahmoud Ibrahim"
  },
  {
    text: "Medicine heals the body; technology heals society. I'm interested in both prescriptions.",
    author: "Mahmoud Ibrahim"
  },
  {
    text: "In pharmacy, we measure in milligrams. In programming, we measure in milliseconds. Both require the same precision of thought.",
    author: "Mahmoud Ibrahim"
  },
  {
    text: "My code follows the Hippocratic oath: first, do no harm to production.",
    author: "Mahmoud Ibrahim"
  }
];

// Updated Quote Section Component that randomly selects a quote based on type
// Types: 'philosophical', 'humorous', 'sarcastic', 'biotech', or 'random'

const QuoteSection = ({ darkMode, type = 'philosophical' }) => {
  // Get a quote based on the requested type
  const getQuote = () => {
    if (type === 'random') {
      // Combine all quotes and select one randomly
      const allQuotes = [...philosophicalQuotes, ...humorousQuotes, ...sarcasticQuotes, ...bioTechQuotes];
      return allQuotes[Math.floor(Math.random() * allQuotes.length)];
    }
    
    // Select from a specific category
    let quoteArray;
    switch(type) {
      case 'philosophical':
        quoteArray = philosophicalQuotes;
        break;
      case 'humorous':
        quoteArray = humorousQuotes;
        break;
      case 'sarcastic':
        quoteArray = sarcasticQuotes;
        break;
      case 'biotech':
        quoteArray = bioTechQuotes;
        break;
      default:
        quoteArray = philosophicalQuotes;
    }
    
    return quoteArray[Math.floor(Math.random() * quoteArray.length)];
  };
  
  const quote = getQuote();
  
  // Background and text colors based on dark/light mode
  const bgGradient = darkMode ? 
    'bg-gradient-to-br from-gray-800 to-gray-900' : 
    'bg-gradient-to-br from-blue-50 to-indigo-100';
  
  const quoteColor = darkMode ? 'text-blue-300' : 'text-blue-800';
  const authorColor = darkMode ? 'text-gray-300' : 'text-gray-700';
  
  return (
    <section className={`w-full py-20 ${bgGradient} my-20 overflow-hidden relative`}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 opacity-5">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M45.3845 32.6923C63.0768 18.4615 87.6922 20 103.077 32.6923C118.462 45.3846 127.692 67.6923 121.538 86.9231C115.385 106.154 93.8461 122.308 76.1537 129.231C58.4614 136.154 44.6152 133.846 29.9998 119.231C15.3844 104.615 -0.769379 77.6923 0.769251 56.9231C2.30788 36.1538 21.538 20.7692 36.1537 14.6154C50.7691 8.46154 80.7691 11.5385 99.2306 20C117.692 28.4615 124.615 42.3077 129.231 58.4615C133.846 74.6154 136.154 93.0769 126.923 104.615C117.692 116.154 96.9229 120.769 81.5383 116.154C66.1537 111.538 55.3845 97.6923 50.7691 83.8461C46.1537 70 47.6922 56.1538 56.1537 46.1538C64.6152 36.1538 80.0006 30 93.8461 32.6923C107.692 35.3846 120 46.9231 121.538 58.4615C123.077 70 113.846 81.5385 103.077 87.6923C92.3075 93.8461 79.9998 93.8461 74.6152 88.4615C69.2306 83.0769 70.769 72.3077 77.6921 66.9231C84.6152 61.5385 96.9229 61.5385 103.077 66.9231C109.231 72.3077 109.231 83.0769 103.077 87.6923" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 opacity-5">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M45.3845 32.6923C63.0768 18.4615 87.6922 20 103.077 32.6923C118.462 45.3846 127.692 67.6923 121.538 86.9231C115.385 106.154 93.8461 122.308 76.1537 129.231C58.4614 136.154 44.6152 133.846 29.9998 119.231C15.3844 104.615 -0.769379 77.6923 0.769251 56.9231C2.30788 36.1538 21.538 20.7692 36.1537 14.6154C50.7691 8.46154 80.7691 11.5385 99.2306 20C117.692 28.4615 124.615 42.3077 129.231 58.4615C133.846 74.6154 136.154 93.0769 126.923 104.615C117.692 116.154 96.9229 120.769 81.5383 116.154C66.1537 111.538 55.3845 97.6923 50.7691 83.8461C46.1537 70 47.6922 56.1538 56.1537 46.1538C64.6152 36.1538 80.0006 30 93.8461 32.6923C107.692 35.3846 120 46.9231 121.538 58.4615C123.077 70 113.846 81.5385 103.077 87.6923C92.3075 93.8461 79.9998 93.8461 74.6152 88.4615C69.2306 83.0769 70.769 72.3077 77.6921 66.9231C84.6152 61.5385 96.9229 61.5385 103.077 66.9231C109.231 72.3077 109.231 83.0769 103.077 87.6923" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </div>
      
      <div className="container mx-auto max-w-4xl px-6 relative z-10">
        {/* Large quote marks */}
        <div className="text-9xl font-serif absolute -top-10 left-0 opacity-10 text-blue-500">"</div>
        
        <blockquote className="text-center">
          <p className={`text-2xl md:text-4xl font-light leading-relaxed mb-6 ${quoteColor} italic`}>
            {quote.text}
          </p>
          
          <footer className={`${authorColor} font-medium text-lg`}>
            <span className="before:content-['—_'] inline-block">{quote.author}</span>
          </footer>
        </blockquote>
        
        {/* Closing quote marks */}
        <div className="text-9xl font-serif absolute -bottom-32 right-0 opacity-10 text-blue-500">"</div>
      </div>
    </section>
  );
};

// Modern Card Quote Section
const ModernQuoteCard = ({ darkMode, type = 'random' }) => {
  // Get a quote based on the requested type, using the same function logic as above
  const getQuote = () => {
    if (type === 'random') {
      const allQuotes = [...philosophicalQuotes, ...humorousQuotes, ...sarcasticQuotes, ...bioTechQuotes];
      return allQuotes[Math.floor(Math.random() * allQuotes.length)];
    }
    
    let quoteArray;
    switch(type) {
      case 'philosophical':
        quoteArray = philosophicalQuotes;
        break;
      case 'humorous':
        quoteArray = humorousQuotes;
        break;
      case 'sarcastic':
        quoteArray = sarcasticQuotes;
        break;
      case 'biotech':
        quoteArray = bioTechQuotes;
        break;
      default:
        quoteArray = philosophicalQuotes;
    }
    
    return quoteArray[Math.floor(Math.random() * quoteArray.length)];
  };
  
  const quote = getQuote();
  
  // Determine gradient color based on quote type
  let gradientClass;
  switch(type) {
    case 'philosophical':
      gradientClass = darkMode 
        ? 'from-blue-900 to-indigo-900' 
        : 'from-blue-600 to-indigo-600';
      break;
    case 'humorous':
      gradientClass = darkMode 
        ? 'from-emerald-900 to-teal-900' 
        : 'from-emerald-600 to-teal-600';
      break;
    case 'sarcastic':
      gradientClass = darkMode 
        ? 'from-rose-900 to-pink-900' 
        : 'from-rose-600 to-pink-600';
      break;
    case 'biotech':
      gradientClass = darkMode 
        ? 'from-purple-900 to-violet-900' 
        : 'from-purple-600 to-violet-600';
      break;
    default:
      gradientClass = darkMode 
        ? 'from-slate-800 to-slate-900' 
        : 'from-slate-700 to-slate-800';
  }

  return (
    <section className="w-full my-20">
      <div className={`rounded-2xl shadow-xl overflow-hidden bg-gradient-to-r ${gradientClass}`}>
        <div className="px-6 py-16 md:p-16 text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 bg-white blur-2xl -mt-10 -mr-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 bg-white blur-2xl -mb-10 -ml-20"></div>
          
          <div className="relative z-10">
            <svg className="h-12 w-12 text-white/30 mb-6" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            
            <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-6">
              {quote.text}
            </p>
            
            <div className="mt-8 flex items-center">
              <div className="flex-shrink-0 rounded-full border-2 border-white/30 overflow-hidden h-12 w-12">
                <img 
                  src="https://media.licdn.com/dms/image/v2/D4D03AQF9hamX9XPW6g/profile-displayphoto-shrink_800_800/B4DZUlW79VG8Ag-/0/1740088526260?e=1751500800&v=beta&t=S48LiF09Q8i4qvIsZvn1Xf821kxEdDccIJueSaf9i6Q"
                  alt="Mahmoud Ibrahim"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="ml-4">
                <div className="text-lg font-medium">Mahmoud Ibrahim</div>
                <div className="text-white/70 text-sm">Full Stack Engineer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Multiple Quote Carousel (for showing multiple quotes that rotate)
const QuoteCarousel = ({ darkMode }) => {
  // Simplified version - in a real implementation, you would use useState and useEffect
  // for the carousel functionality
  
  // Get one quote from each category
  const philosophical = philosophicalQuotes[Math.floor(Math.random() * philosophicalQuotes.length)];
  const humorous = humorousQuotes[Math.floor(Math.random() * humorousQuotes.length)];
  const sarcastic = sarcasticQuotes[Math.floor(Math.random() * sarcasticQuotes.length)];
  const biotech = bioTechQuotes[Math.floor(Math.random() * bioTechQuotes.length)];
  
  const quotes = [philosophical, humorous, sarcastic, biotech];
  
  return (
    <section className={`w-full py-16 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} my-20`}>
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className={`text-2xl font-bold mb-10 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Thoughts & Musings
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quotes.map((quote, index) => {
            // Different colors for each quote card
            const colors = [
              { bg: darkMode ? 'bg-blue-900/30' : 'bg-blue-100', border: darkMode ? 'border-blue-800' : 'border-blue-200', text: darkMode ? 'text-blue-300' : 'text-blue-800' },
              { bg: darkMode ? 'bg-emerald-900/30' : 'bg-emerald-100', border: darkMode ? 'border-emerald-800' : 'border-emerald-200', text: darkMode ? 'text-emerald-300' : 'text-emerald-800' },
              { bg: darkMode ? 'bg-purple-900/30' : 'bg-purple-100', border: darkMode ? 'border-purple-800' : 'border-purple-200', text: darkMode ? 'text-purple-300' : 'text-purple-800' },
              { bg: darkMode ? 'bg-amber-900/30' : 'bg-amber-100', border: darkMode ? 'border-amber-800' : 'border-amber-200', text: darkMode ? 'text-amber-300' : 'text-amber-800' }
            ];
            
            const { bg, border, text } = colors[index];
            
            return (
              <div key={index} className={`${bg} border ${border} p-6 rounded-xl`}>
                <blockquote>
                  <p className={`text-lg italic mb-4 ${text}`}>{quote.text}</p>
                  <footer className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} font-medium`}>
                    {quote.author}
                  </footer>
                </blockquote>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Usage examples:

// For a philosophical quote:
// <QuoteSection darkMode={darkMode} type="philosophical" />

// For a humorous quote:
// <QuoteSection darkMode={darkMode} type="humorous" />

// For a sarcastic quote:
// <QuoteSection darkMode={darkMode} type="sarcastic" />

// For a quote about biology and technology:
// <QuoteSection darkMode={darkMode} type="biotech" />

// For a random quote from any category:
// <QuoteSection darkMode={darkMode} type="random" />

// For the modern card style with a random quote:
// <ModernQuoteCard darkMode={darkMode} type="random" />

// For multiple quotes in a grid layout:
// <QuoteCarousel darkMode={darkMode} />