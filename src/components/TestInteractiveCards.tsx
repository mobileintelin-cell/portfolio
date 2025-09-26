import React from 'react';
import { InteractiveSkillsCards } from './InteractiveSkillsCards';

export function TestInteractiveCards() {
  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--landing-bg-base)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--landing-text-primary)' }}>
            Interactive Skills Cards Test
          </h1>
          <p className="text-lg" style={{ color: 'var(--landing-text-secondary)' }}>
            Click on the Backend or Cloud sections to see the smooth animation effect.
          </p>
        </div>
        
        <InteractiveSkillsCards />
        
        <div className="mt-12 text-center">
          <p className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>
            The cards are the same size and content animates smoothly between them.
          </p>
        </div>
      </div>
    </div>
  );
}