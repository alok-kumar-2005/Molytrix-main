import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const Project = ({
  title,
  description,
  image,
  tags,
  githubUrl,
  liveUrl,
  reversed = false,
}) => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32 last:mb-0 ${reversed ? 'lg:flex-row-reverse' : ''}`}>
      <div className={`${reversed ? 'lg:order-2' : 'lg:order-1'}`}>
        <h3 className="text-3xl md:text-4xl font-bold mb-4">{title}</h3>
        <p className="text-lg md:text-xl mb-6 opacity-90">{description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-dark-brown hover:text-primary transition-colors"
            >
              <Github className="mr-2" size={20} />
              <span>View Code</span>
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-dark-brown hover:text-primary transition-colors"
            >
              <ExternalLink className="mr-2" size={20} />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
      <div className={`${reversed ? 'lg:order-1' : 'lg:order-2'} relative group`}>
        <div className="absolute inset-0 bg-primary/20 rounded-xl transform group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
        <div className="relative overflow-hidden rounded-xl border-2 border-dark-brown/10 bg-light-gray">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "FinTech Dashboard",
      description: "A comprehensive financial dashboard that visualizes complex data in an accessible way. Features include real-time market tracking, personalized investment recommendations, and intuitive financial planning tools.",
      image: "https://images.pexels.com/photos/7567460/pexels-photo-7567460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["React", "TypeScript", "D3.js", "Tailwind CSS"],
      githubUrl: "#",
      liveUrl: "#",
      reversed: false,
    },
    {
      title: "E-Commerce Platform",
      description: "A feature-rich online shopping platform with seamless user experience. Includes product filtering, user accounts, shopping cart functionality, and secure checkout process with multiple payment options.",
      image: "https://images.pexels.com/photos/5632397/pexels-photo-5632397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["Next.js", "Redux", "Node.js", "MongoDB"],
      githubUrl: "#",
      liveUrl: "#",
      reversed: true,
    },
    {
      title: "Social Media App",
      description: "A modern social platform focused on community building and content sharing. Features include real-time messaging, content creation tools, and algorithmic feed customization for personalized user experience.",
      image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["React Native", "Firebase", "GraphQL", "Express"],
      githubUrl: "#",
      liveUrl: "#",
      reversed: false,
    },
  ];

  return (
    <section id="projects" className="bg-cream py-20">
      <div className="section-container">
        <h2 className="section-title">
          <span className="text-primary">My</span> Projects
        </h2>
        <p className="section-subtitle mb-20">Showcasing my best work and favorite projects</p>
        
        <div>
          {projects.map((project, index) => (
            <Project
              key={index}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
              reversed={project.reversed}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
