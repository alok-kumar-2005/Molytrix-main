import React from 'react';
import { Code, PaintBucket, Database, Monitor, LineChart, Layers } from 'lucide-react';

const SkillCard = ({ title, icon, skills }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-dark-brown/10">
      <div className="p-4 bg-primary/10 rounded-full inline-block mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <ul className="space-y-2">
        {skills.map((skill, index) => (
          <li key={index} className="flex items-center text-dark-brown">
            <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
            <span>{skill}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Code size={24} className="text-primary" />,
      skills: ["React & Next.js", "TypeScript", "Tailwind CSS", "Responsive Design"],
    },
    {
      title: "UI/UX Design",
      icon: <PaintBucket size={24} className="text-primary" />,
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    },
    {
      title: "Backend Development",
      icon: <Database size={24} className="text-primary" />,
      skills: ["Node.js", "Express", "RESTful APIs", "GraphQL"],
    },
    {
      title: "DevOps",
      icon: <Monitor size={24} className="text-primary" />,
      skills: ["CI/CD Pipelines", "Docker", "AWS", "Performance Optimization"],
    },
    {
      title: "Data Analysis",
      icon: <LineChart size={24} className="text-primary" />,
      skills: ["Data Visualization", "Python", "SQL", "Reporting Dashboards"],
    },
    {
      title: "Project Management",
      icon: <Layers size={24} className="text-primary" />,
      skills: ["Agile Methodologies", "SCRUM", "Project Planning", "Client Communication"],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-cream-dark">
      <div className="section-container">
        <h2 className="section-title">
          <span className="text-primary">Skills</span> & Expertise
        </h2>
        <p className="section-subtitle">A comprehensive overview of my professional capabilities</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={index}
              title={category.title}
              icon={category.icon}
              skills={category.skills}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;