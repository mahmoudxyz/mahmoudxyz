import React, { useState } from 'react';
import { 
  ArrowRight, 
  Code, 
  Server, 
  Brain, 
  Rocket, 
  Dna, 
  Database, 
  Microscope,
  Network,
  Workflow,
  BookOpen,
  GraduationCap,
  FlaskConical,
  Library,
  GitBranch
} from 'lucide-react';

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState('all');

  const skills = [
    { 
      icon: Dna,
      title: "Molecular Biology",
      category: "bio",
      skills: ["Gene Expression Analysis", "PCR Techniques", "Protein Analysis", "Cell Culture"]
    },
    {
      icon: Database,
      title: "Bioinformatics",
      category: "both",
      skills: ["Sequence Analysis", "Genomic Data Processing", "Biological Databases", "Statistical Analysis"]
    },
    {
      icon: Code,
      title: "Software Development",
      category: "tech",
      skills: ["Full Stack Development", "API Design", "Cloud Architecture", "Data Visualization"]
    },
    {
      icon: FlaskConical,
      title: "Lab Techniques",
      category: "bio",
      skills: ["Assay Development", "Sample Preparation", "Quality Control", "Documentation"]
    },
    {
      icon: Network,
      title: "Computational Biology",
      category: "both",
      skills: ["Pathway Analysis", "Molecular Modeling", "Systems Biology", "Machine Learning"]
    },
    {
      icon: Server,
      title: "Infrastructure",
      category: "tech",
      skills: ["Cloud Computing", "Containerization", "CI/CD", "Microservices"]
    }
  ];

  const projects = [
    {
      title: "HydraFP Library",
      category: "tech",
      description: "A functional programming library for Java that simplifies writing pure, composable code",
      highlight: "Featured Project",
      technologies: ["Java", "Functional Programming", "Effect Systems"],
      features: [
        "Pure functional approach with effect system",
        "Algebraic data types (Option, Either, Try)",
        "Immutable collections & pattern matching",
        "Performance optimization features"
      ],
      impact: "Enhancing Java development with functional programming paradigms",
      links: {
        github: "https://github.com/mahmoudxyz/HydraFP",
        docs: "https://github.com/mahmoudxyz/HydraFP"
      },
      icon: Library
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-background/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Dna className="h-10 w-10 text-primary" />
              <span className="text-2xl text-primary">×</span>
              <Code className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bridging Biology & Technology
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Pharmacist turned Software Engineer, combining molecular biology expertise with 
              advanced programming skills to drive innovation in computational biology and 
              bioinformatics.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/contact"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Collaborate <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a 
                href="/experience"
                className="inline-flex items-center px-6 py-3 rounded-lg border border-input hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                View Experience
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Interdisciplinary Expertise</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Combining wet-lab experience with software development skills to solve complex 
            biological problems through computational approaches.
          </p>

          {/* Skills Filter */}
          <div className="flex justify-center gap-4 mb-12">
            {['all', 'bio', 'tech', 'both'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveSection(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeSection === category 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills
              .filter(skill => activeSection === 'all' || skill.category === activeSection)
              .map((skill) => (
                <div 
                  key={skill.title} 
                  className="p-6 rounded-xl border bg-card text-card-foreground hover:shadow-lg transition-all duration-300"
                >
                  <skill.icon className="h-8 w-8 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-3">{skill.title}</h3>
                  <ul className="space-y-2">
                    {skill.skills.map((item) => (
                      <li key={item} className="text-muted-foreground">{item}</li>
                    ))}
                  </ul>
                </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Featured Projects</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            From functional programming libraries to bioinformatics tools, exploring the intersection of technology and science.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* HydraFP Featured Card */}
            <div className="lg:col-span-3">
              <div className="p-8 rounded-xl border bg-card text-card-foreground hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <Library className="h-10 w-10 text-primary" />
                  <div>
                    <span className="text-sm text-primary font-medium">Featured Project</span>
                    <h3 className="text-2xl font-bold">HydraFP</h3>
                  </div>
                </div>
                
                <p className="text-lg text-muted-foreground mb-6">
                  A powerful functional programming library for Java, making it easier to write clean, 
                  composable, and side-effect free code.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <h4 className="font-semibold mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {projects[0].features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 text-primary">•</span>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {projects[0].technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <a 
                    href="https://hydrafp.vercel.app/docs/intro"
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    View Documentation <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                  <a 
                    href="https://github.com/mahmoudxyz/HydraFP"
                    className="inline-flex items-center px-4 py-2 rounded-lg border border-input hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <GitBranch className="mr-2 h-4 w-4" /> GitHub
                  </a>
                </div>
              </div>
            </div>

            {/* Other Projects */}
            {projects.slice(1).map((project) => (
              <div key={project.title} className="p-6 rounded-xl border bg-card text-card-foreground hover:shadow-lg transition-all duration-300">
                <project.icon className="h-8 w-8 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{project.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Research Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Education & Research</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl border bg-card text-card-foreground">
              <GraduationCap className="h-8 w-8 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-3">Academic Background</h3>
              <ul className="space-y-4">
                <li>
                  <div className="font-medium">Bachelor of Pharmacy</div>
                  <div className="text-muted-foreground">Graduated with Excellence</div>
                </li>
                <li>
                  <div className="font-medium">Self-Taught Programming</div>
                  <div className="text-muted-foreground">Mastered full-stack development & computational methods</div>
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border bg-card text-card-foreground">
              <BookOpen className="h-8 w-8 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-3">Research Interests</h3>
              <ul className="space-y-2">
                <li className="text-muted-foreground">Computational Drug Discovery</li>
                <li className="text-muted-foreground">Genomic Data Analysis</li>
                <li className="text-muted-foreground">Machine Learning in Biology</li>
                <li className="text-muted-foreground">Systems Biology</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Let's Advance Science Together</h2>
          <p className="text-muted-foreground mb-8">
            Looking to collaborate on computational biology projects or discuss research opportunities? 
            Let's explore how we can combine biological insights with technological innovation.
          </p>
          <a 
            href="/contact"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Start Discussion <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;