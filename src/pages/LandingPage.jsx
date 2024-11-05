import React from 'react';
import { ArrowRight, Code, Server, Brain, Rocket } from 'lucide-react';

const LandingPage = () => {
  const skills = [
    { 
      icon: Code,
      title: "Frontend Development",
      skills: ["React.js", "JavaScript", "Modern UI Libraries"]
    },
    {
      icon: Server,
      title: "Backend Development",
      skills: ["Java", "Spring Boot", "RESTful APIs", "GraphQL"]
    },
    {
      icon: Brain,
      title: "Core Engineering",
      skills: ["Microservices", "AWS", "Data Structures", "Algorithms"]
    },
    {
      icon: Rocket,
      title: "DevOps & Tools",
      skills: ["Docker", "Jenkins", "Kafka", "Git"]
    }
  ];

  const experiences = [
    {
      company: "N2N",
      role: "Software Engineer",
      period: "Jul '23 - Present",
      highlights: [
        "Built automation tools reducing integration time by 30%",
        "Developed drag-and-drop interface improving user interaction by 25%",
        "Implemented Zustand for 15% better performance"
      ]
    },
    {
      company: "JetBrains Academy",
      role: "Technical Writer",
      period: "Aug '22 - Dec '23",
      highlights: [
        "Authored 20+ technical content pieces",
        "90% improvement in course material relevance",
        "Enhanced learner engagement by 15%"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-background/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Full Stack Software Engineer
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Skilled in Java, JavaScript, React, AWS, and microservices, focused on delivering scalable solutions that drive business results
            </p>
            <div className="flex justify-center gap-4">
              <a 
                href="/contact"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
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
          <h2 className="text-3xl font-bold text-center mb-12">Core Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill) => (
              <div key={skill.title} className="p-6 rounded-xl border bg-card text-card-foreground">
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

      {/* Experience Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Recent Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experiences.map((exp) => (
              <div key={exp.company} className="p-6 rounded-xl border bg-card text-card-foreground">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">{exp.company}</h3>
                  <p className="text-muted-foreground">{exp.role} | {exp.period}</p>
                </div>
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a 
              href="/experience"
              className="inline-flex items-center px-6 py-3 rounded-lg border border-input hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              View Full Experience
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-muted-foreground mb-8">
            Looking for a Full Stack Developer who can deliver scalable solutions? 
            Let's discuss how I can contribute to your team's success.
          </p>
          <a 
            href="/contact"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Contact Me <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;