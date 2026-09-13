import React, { useEffect, useRef } from 'react';
import { ArrowRight, Star, Sparkles } from 'lucide-react';

const Hero = () => {
  const titleRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const letters = titleRef.current?.querySelectorAll('.letter');
    if (letters) {
      letters.forEach((letter, i) => {
        setTimeout(() => {
          letter.classList.add('text-primary');
          setTimeout(() => {
            letter.classList.remove('text-primary');
          }, 300);
        }, i * 200);
      });
    }

    const interval = setInterval(() => {
      const letters = titleRef.current?.querySelectorAll('.letter');
      if (letters) {
        letters.forEach((letter, i) => {
          setTimeout(() => {
            letter.classList.add('text-primary');
            setTimeout(() => {
              letter.classList.remove('text-primary');
            }, 300);
          }, i * 200);
        });
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getLetterSpans = (text) => {
    return text.split('').map((letter, index) => (
      <span key={index} className="letter transition-colors duration-300 inline-block hover:text-primary hover:scale-110 cursor-pointer">
        {letter}
      </span>
    ));
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div ref={cursorRef} className="cursor-glow hidden lg:block"></div>

      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="absolute top-1/3 left-10 transform -translate-y-1/2 opacity-20 animate-float">
        <Sparkles size={40} className="text-primary" />
      </div>

      <div className="absolute bottom-1/4 right-1/4 opacity-20 animate-float delay-1000">
        <Star size={60} className="text-secondary" />
      </div>

      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-primary text-xl md:text-2xl font-medium mb-4 animate-slide-up flex items-center">
              <Sparkles className="mr-2" size={20} />
              Hello, I'm
            </p>
            <h1 
              ref={titleRef} 
              className="text-6xl sm:text-7xl md:text-8xl font-bold mb-6 leading-tight"
            >
              {getLetterSpans("CREATIVE DEVELOPER")}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl animate-fade-in delay-200 opacity-90">
              I design and build digital experiences that combine creativity with technical expertise. Turning ideas into engaging, functional realities.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#projects" 
                className="btn btn-primary flex items-center group"
              >
                View Projects
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </a>
              <a href="#contact" className="btn btn-secondary group relative overflow-hidden">
                Get In Touch
                <span className="absolute inset-0 w-0 bg-primary transition-all duration-300 group-hover:w-full opacity-20"></span>
              </a>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 morph-blob from-primary-light to-secondary-light opacity-20"></div>
              <div className="absolute inset-4 morph-blob from-primary to-secondary opacity-30"></div>
              <div className="relative h-full rounded-[30%_70%_70%_30%/30%_30%_70%_70%] overflow-hidden animate-morph">
                <img
                  src="https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Portfolio Hero"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-sm text-dark-brown/70 mb-2">Scroll Down</span>
        <div className="w-5 h-10 border-2 border-dark-brown/30 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-gradient-to-b from-primary to-secondary rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
