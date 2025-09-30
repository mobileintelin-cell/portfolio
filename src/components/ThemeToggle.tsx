import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';

interface ThemeToggleProps {
  variant?: 'nav' | 'default';
  size?: 'sm' | 'default' | 'lg';
}

export function ThemeToggle({ variant = 'default', size = 'default' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  if (variant === 'nav') {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="border-0 bg-transparent hover:bg-white/5 p-2"
        onClick={toggleTheme}
        style={{ color: 'var(--landing-text-secondary)' }}
        title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size={size}
      className="gap-2"
      onClick={toggleTheme}
      style={{ 
        borderColor: 'var(--landing-border-subtle)',
        color: 'var(--landing-text-primary)',
        backgroundColor: 'transparent'
      }}
    >
      {theme === 'light' ? (
        <>
          <Moon className="w-4 h-4" />
          Dark Mode
        </>
      ) : (
        <>
          <Sun className="w-4 h-4" />
          Light Mode
        </>
      )}
    </Button>
  );
}
