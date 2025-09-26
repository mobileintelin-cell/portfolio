import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import exampleImage from 'figma:asset/0f06e5fb0123634e45f4dad65176e9dc297e4b30.png';

type SkillCategory = {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies?: string[];
  isClickable?: boolean;
};

type SkillSection = {
  id: string;
  title: string;
  items: string[];
};

const defaultLeftCard: SkillCategory = {
  id: 'frontend-excellence',
  title: 'Frontend Excellence',
  description: 'Modern React and Angular applications with responsive design, accessibility compliance, and optimized performance.',
  image: exampleImage,
  isClickable: false
};

const defaultRightSections: SkillSection[] = [
  {
    id: 'backend',
    title: 'Backend',
    items: ['Node.js', 'Python', 'PostgreSQL']
  },
  {
    id: 'cloud',
    title: 'Cloud',
    items: ['AWS', 'Azure', 'Docker']
  }
];

const skillDetails: Record<string, SkillCategory> = {
  'backend': {
    id: 'backend',
    title: 'Backend Development',
    description: 'Robust server-side applications with Node.js and Python, featuring scalable APIs, database optimization, and secure authentication systems.',
    image: exampleImage,
    isClickable: false
  },
  'cloud': {
    id: 'cloud',
    title: 'Cloud Infrastructure',
    description: 'Enterprise-grade cloud solutions using AWS and Azure, with containerized deployments, auto-scaling, and comprehensive monitoring.',
    image: exampleImage,
    isClickable: false
  }
};

export function InteractiveSkillsCards() {
  const [leftCard, setLeftCard] = useState<SkillCategory>(defaultLeftCard);
  const [rightSections, setRightSections] = useState<SkillSection[]>(defaultRightSections);

  const handleSkillClick = (sectionId: string) => {
    const clickedSkill = skillDetails[sectionId];
    if (!clickedSkill) return;

    // Create new right sections with the current left card content
    const newRightSections = rightSections.map(section => {
      if (section.id === sectionId) {
        // Replace clicked section with current left card info
        return {
          id: leftCard.id,
          title: leftCard.title.replace(' Excellence', '').replace(' Development', '').replace(' Infrastructure', ''),
          items: ['React', 'Angular', 'TypeScript']
        };
      }
      return section;
    });

    // Update both cards immediately with smooth animation
    setLeftCard(clickedSkill);
    setRightSections(newRightSections);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Card */}
        <motion.div
          layout
          className="relative overflow-hidden rounded-3xl border"
          style={{ 
            backgroundColor: 'var(--landing-bg-elevated)', 
            borderColor: 'var(--landing-border-subtle)',
            minHeight: '400px'
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={leftCard.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="p-8 h-full flex flex-col"
            >
              <div className="space-y-6 flex-1">
                <motion.h3 
                  className="text-2xl font-bold"
                  style={{ color: 'var(--landing-text-primary)' }}
                >
                  {leftCard.title}
                </motion.h3>
                
                <motion.p 
                  className="leading-relaxed"
                  style={{ color: 'var(--landing-text-secondary)' }}
                >
                  {leftCard.description}
                </motion.p>
              </div>

              {leftCard.image && (
                <motion.div
                  className="mt-6 rounded-2xl overflow-hidden"
                >
                  <ImageWithFallback
                    src={leftCard.image}
                    alt={leftCard.title}
                    className="w-full h-48 object-cover"
                  />
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Right Card */}
        <motion.div
          layout
          className="rounded-3xl border"
          style={{ 
            backgroundColor: 'var(--landing-bg-elevated)', 
            borderColor: 'var(--landing-border-subtle)',
            minHeight: '400px'
          }}
        >
          <div className="p-8 h-full">
            <motion.h3 
              className="text-2xl font-bold mb-6"
              style={{ color: 'var(--landing-text-primary)' }}
            >
              Backend & Infrastructure
            </motion.h3>
            
            <motion.p 
              className="leading-relaxed mb-8"
              style={{ color: 'var(--landing-text-secondary)' }}
            >
              Scalable server architectures, API design, database optimization, and cloud deployment for high-performance applications.
            </motion.p>

            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {rightSections.map((section, sectionIndex) => (
                  <motion.div
                    key={`${section.id}-${section.title}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: sectionIndex * 0.05,
                      layout: { duration: 0.3 }
                    }}
                    className="space-y-3"
                  >
                    <motion.h4 
                      className="font-semibold cursor-pointer hover:scale-105 transition-transform"
                      style={{ color: 'var(--landing-text-primary)' }}
                      onClick={() => handleSkillClick(section.id)}
                      whileHover={{ 
                        color: 'var(--landing-accent-primary)',
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {section.title}
                    </motion.h4>
                    
                    <motion.div 
                      className="flex flex-wrap gap-2"
                      layout
                    >
                      {section.items.map((item, itemIndex) => (
                        <motion.span
                          key={`${item}-${section.id}`}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ 
                            duration: 0.2, 
                            delay: (sectionIndex * 0.05) + (itemIndex * 0.02),
                            layout: { duration: 0.2 }
                          }}
                          className="px-3 py-1 rounded-full text-sm cursor-pointer hover:scale-105 transition-transform"
                          style={{ 
                            backgroundColor: 'var(--landing-accent-soft)', 
                            color: 'var(--landing-accent-primary)' 
                          }}
                          onClick={() => handleSkillClick(section.id)}
                          whileHover={{ 
                            backgroundColor: 'var(--landing-accent-primary)',
                            color: '#000000'
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {item}
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}