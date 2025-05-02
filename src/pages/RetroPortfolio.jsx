import React, { useState } from 'react';
import LandingPage from './LandingPage'; // Import your existing terminal component

function RetroPortfolio() {
  const [viewMode, setViewMode] = useState('retro'); // 'retro' or 'terminal'
  
  // Toggle between retro and terminal views
  const toggleViewMode = () => {
    setViewMode(viewMode === 'retro' ? 'terminal' : 'retro');
  };

  // If terminal mode is selected, render the original LandingPage component
  if (viewMode === 'terminal') {
    return (
      <div className="relative">
        <div className="fixed top-3 md:top-5 right-3 md:right-5 z-50">
          <button 
            onClick={toggleViewMode} 
            className="px-3 py-2 bg-indigo-100 text-indigo-900 font-bold border-2 border-indigo-900 shadow-md hover:bg-indigo-200 transition-all"
          >
            Switch to Retro View
          </button>
        </div>
        <LandingPage />
      </div>
    );
  }

  // Render the clean retro version
  return (
    <div className="min-h-screen bg-[#f0f0f0] font-sans text-gray-800">
      {/* Toggle button - always visible */}
      <div className="fixed top-3 md:top-5 right-3 md:right-5 z-40">
        <button 
          onClick={toggleViewMode} 
          className="px-3 py-2 bg-blue-600 text-white font-bold rounded shadow-md hover:bg-blue-700 transition-all"
        >
          Switch to Terminal
        </button>
      </div>

      {/* Main container */}
      <div className="container mx-auto max-w-4xl bg-white shadow-md">
        {/* Header */}
        <header className="bg-blue-600 text-white p-6 border-b-4 border-blue-800">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Mahmoud Ibrahim</h1>
          <div className="text-xl font-semibold">
            Full Stack Engineer with Pharmacy Background
          </div>
        </header>
        
        {/* Navigation */}
        <nav className="bg-blue-800 text-white p-2 sticky top-0 z-30">
          <ul className="flex flex-wrap justify-around text-center">
            <li className="px-2 py-1">
              <a href="#about" className="hover:underline font-semibold">ABOUT</a>
            </li>
            <li className="px-2 py-1">
              <a href="#skills" className="hover:underline font-semibold">SKILLS</a>
            </li>
            <li className="px-2 py-1">
              <a href="#projects" className="hover:underline font-semibold">PROJECTS</a>
            </li>
            <li className="px-2 py-1">
              <a href="#experience" className="hover:underline font-semibold">EXPERIENCE</a>
            </li>
            <li className="px-2 py-1">
              <a href="#education" className="hover:underline font-semibold">EDUCATION</a>
            </li>
            <li className="px-2 py-1">
              <a href="#contact" className="hover:underline font-semibold">CONTACT</a>
            </li>
          </ul>
        </nav>
        
        {/* Main content */}
        <main className="p-6">
          {/* Introduction Section */}
          <section id="about" className="mb-10">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="w-40 h-40 mx-auto md:mx-0 bg-blue-100 border-4 border-blue-300 rounded-full overflow-hidden mb-4">
                  {/* Profile photo would go here */}
                  <div className="w-full h-full flex items-center justify-center bg-blue-200 text-blue-800 font-bold">
                    <img src='https://media.licdn.com/dms/image/v2/D4D03AQF9hamX9XPW6g/profile-displayphoto-shrink_800_800/B4DZUlW79VG8Ag-/0/1740088526260?e=1751500800&v=beta&t=S48LiF09Q8i4qvIsZvn1Xf821kxEdDccIJueSaf9i6Q' />
                  </div>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-3 text-blue-800">About Me</h2>
                <div className="space-y-3">
                  <p>
                    I am a Full Stack Engineer with a background in Pharmacy, pursuing a shift into 
                    Bioinformatics to combine my scientific foundation with software expertise.
                  </p>
                  <p>
                    My experience includes building scalable backend systems and creating educational content
                    for developers at JetBrains Academy. I bridge the gap between biology and technology
                    with a unique skill set that spans both worlds.
                  </p>
                  <p className="italic text-blue-800">
                    "I write code that works and documentation that explains why."
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Skills Section */}
          <section id="skills" className="mb-10">
            <h2 className="text-2xl font-bold mb-3 text-blue-800 border-b-2 border-blue-200 pb-1">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="border border-blue-200 bg-blue-50 p-3 rounded">
                <h3 className="font-bold text-blue-700 mb-2">Backend Development</h3>
                <p>Spring Boot, RESTful APIs, Microservices, PostgreSQL, Java, Kotlin</p>
                <p className="text-sm italic mt-2 text-blue-600">Experienced in building reliable and scalable backend services.</p>
              </div>
              
              <div className="border border-blue-200 bg-blue-50 p-3 rounded">
                <h3 className="font-bold text-blue-700 mb-2">Frontend Development</h3>
                <p>JavaScript, TypeScript, React.js, NextJS, Tailwind CSS, HTML5</p>
                <p className="text-sm italic mt-2 text-blue-600">Creating responsive and intuitive user interfaces.</p>
              </div>
              
              <div className="border border-blue-200 bg-blue-50 p-3 rounded">
                <h3 className="font-bold text-blue-700 mb-2">Pharmacy & Science</h3>
                <p>Clinical Pharmacy, Molecular Biology, Biochemistry, Pharmaceutical Analysis</p>
                <p className="text-sm italic mt-2 text-blue-600">Scientific background that enhances my technical perspective.</p>
              </div>
              
              <div className="border border-blue-200 bg-blue-50 p-3 rounded">
                <h3 className="font-bold text-blue-700 mb-2">Technical Writing</h3>
                <p>Educational Content, Documentation, Tutorials, Hands-on Topics</p>
                <p className="text-sm italic mt-2 text-blue-600">Explaining complex concepts in accessible ways.</p>
              </div>
            </div>
          </section>
          
          {/* Projects Section */}
          <section id="projects" className="mb-10">
            <h2 className="text-2xl font-bold mb-3 text-blue-800 border-b-2 border-blue-200 pb-1">Featured Project</h2>
            <div className="border border-blue-300 rounded overflow-hidden shadow-sm">
              <div className="bg-blue-600 text-white font-bold p-2 flex justify-between items-center">
                <h3>GenBankinator</h3>
                <a 
                  href="https://genbankinator.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white text-blue-800 text-sm px-2 py-1 rounded font-bold hover:bg-blue-100 transition-all"
                >
                  VISIT SITE
                </a>
              </div>
              <div className="p-4">
                <p className="mb-3">
                  Convert your FASTA sequence and annotation files to the GenBank format with this easy-to-use tool.
                  Simplifies an essential bioinformatics task that would otherwise require manual formatting.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div className="bg-blue-50 p-3 border border-blue-200 rounded">
                    <h4 className="font-bold text-blue-700 mb-1">Convert to GenBank</h4>
                    <p className="text-sm">Upload your files to convert them to GenBank format efficiently.</p>
                  </div>
                  <div className="bg-blue-50 p-3 border border-blue-200 rounded">
                    <h4 className="font-bold text-blue-700 mb-1">Manage Files</h4>
                    <p className="text-sm">View and organize your uploaded files and conversions.</p>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 border-t border-gray-200 pt-2">
                  <b>Technologies:</b> JavaScript, NextJS, Bioinformatics APIs
                </div>
              </div>
            </div>
          </section>
          
          {/* Experience Section */}
          <section id="experience" className="mb-10">
            <h2 className="text-2xl font-bold mb-3 text-blue-800 border-b-2 border-blue-200 pb-1">Work Experience</h2>
            
            <div className="mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                <h3 className="text-xl font-bold text-blue-700">Software Developer</h3>
                <div className="text-sm">
                  <span className="font-semibold">N2N</span> | <span className="italic">Current</span>
                </div>
              </div>
              <p className="mb-2">
                At N2NLab, I reduced integration time through automated workflows and secure architectures. 
                Experienced in RESTful APIs, microservices, and PostgreSQL, I deliver high-performance 
                backend solutions that align with business goals.
              </p>
              <p className="text-sm italic text-blue-600">
                Specializing in integration platforms and automated deployment processes.
              </p>
            </div>
            
            <div className="mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                <h3 className="text-xl font-bold text-blue-700">Writer</h3>
                <div className="text-sm">
                  <span className="font-semibold">JetBrains Academy</span> | <span className="italic">08/2022 – 12/2023</span>
                </div>
              </div>
              <p className="mb-2">
                Created high-quality learning content for Kotlin, Java, and backend development tracks, 
                helping thousands of learners build real-world programming skills. Authored theory, 
                exercises, and hands-on topics, including annotations, lambda expressions, Kotlin 
                reflection, and Spring dependency injection.
              </p>
              <p className="text-sm italic text-blue-600">
                Developed educational materials that bridge theoretical concepts with practical applications.
              </p>
            </div>
          </section>
          
          {/* Education Section */}
          <section id="education" className="mb-10">
            <h2 className="text-2xl font-bold mb-3 text-blue-800 border-b-2 border-blue-200 pb-1">Education</h2>
            
            <div className="mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                <h3 className="text-xl font-bold text-blue-700">Bachelor of Pharmacy – Clinical Pharmacy</h3>
                <div className="text-sm">
                  <span className="font-semibold">Kafrelsheikh University</span> | <span className="italic">10/2019 – Current</span>
                </div>
              </div>
              <p className="mb-2">
                Pursuing a Bachelor of Pharmacy degree with a focus on Clinical Pharmacy. Balancing 
                academic studies with professional software development work to build a unique 
                interdisciplinary skill set.
              </p>
              <p className="text-sm italic text-blue-600">
                Combining pharmaceutical knowledge with software engineering for innovative solutions.
              </p>
            </div>
          </section>
          
          {/* Contact Section */}
          <section id="contact" className="mb-6">
            <h2 className="text-2xl font-bold mb-3 text-blue-800 border-b-2 border-blue-200 pb-1">Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="border border-blue-200 bg-blue-50 p-3 rounded">
                <div className="font-bold text-blue-700 mb-1">Email</div>
                <a href="mailto:mahmoudahmedxyz@gmail.com" className="text-blue-600 hover:underline">
                  mahmoudahmedxyz@gmail.com
                </a>
              </div>
              
              <div className="border border-blue-200 bg-blue-50 p-3 rounded">
                <div className="font-bold text-blue-700 mb-1">Phone</div>
                <a href="tel:+201090227505" className="text-blue-600 hover:underline">
                  (+20) 01090227505
                </a>
              </div>
              
              <div className="border border-blue-200 bg-blue-50 p-3 rounded">
                <div className="font-bold text-blue-700 mb-1">Website</div>
                <a href="https://mahmoudxyz.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  https://mahmoudxyz.vercel.app/
                </a>
              </div>
              
              <div className="border border-blue-200 bg-blue-50 p-3 rounded">
                <div className="font-bold text-blue-700 mb-1">Location</div>
                <div>Kafr Elshikh, Egypt</div>
              </div>
            </div>
          </section>
        </main>
        
        {/* Footer */}
        <footer className="bg-blue-100 p-4 text-center text-sm text-blue-800 border-t border-blue-200">
          <p className="mb-2">© 2024 Mahmoud Ibrahim | Full Stack Engineer & Pharmacy Professional</p>
          <div className="flex justify-center space-x-4">
            <a href="#about" className="text-blue-600 hover:underline">About</a>
            <a href="#skills" className="text-blue-600 hover:underline">Skills</a>
            <a href="#projects" className="text-blue-600 hover:underline">Projects</a>
            <a href="#experience" className="text-blue-600 hover:underline">Experience</a>
            <a href="#contact" className="text-blue-600 hover:underline">Contact</a>
          </div>
          <p className="mt-2 text-xs italic">
            Made with a touch of Y2K nostalgia and modern UX sensibilities
          </p>
        </footer>
      </div>
    </div>
  );
}

export default RetroPortfolio;