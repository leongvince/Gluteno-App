import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  // Theme is always dark, so this is just here for compatibility
  const toggleTheme = () => {
    setTheme('dark');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={className}
      aria-label="Dark mode"
    >
      <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 transition-all" />
    </Button>
  );
}