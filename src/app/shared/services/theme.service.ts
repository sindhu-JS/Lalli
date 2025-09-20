import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'theme';

  // Create a signal for the current theme
  public theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    // Apply initial theme on service creation
    this.applyTheme(this.theme());
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    const newTheme: Theme = this.theme() === 'light' ? 'dark' : 'light';
    console.log('Toggling theme from', this.theme(), 'to', newTheme);
    this.setTheme(newTheme);
  }

  /**
   * Set a specific theme
   */
  setTheme(theme: Theme): void {
    this.theme.set(theme);
    this.applyTheme(theme);
    this.saveTheme(theme);
  }

  /**
   * Get current theme
   */
  getCurrentTheme(): Theme {
    return this.theme();
  }

  /**
   * Check if current theme is dark
   */
  isDark(): boolean {
    return this.theme() === 'dark';
  }

  /**
   * Check if current theme is light
   */
  isLight(): boolean {
    return this.theme() === 'light';
  }

  private getInitialTheme(): Theme {
    // First check localStorage
    const savedTheme = localStorage.getItem(this.STORAGE_KEY) as Theme;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme;
    }

    // Then check system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }

    // Default to light theme
    return 'light';
  }

  private applyTheme(theme: Theme): void {
    if (typeof document === 'undefined') return;

    const htmlElement = document.documentElement;

    if (theme === 'dark') {
      htmlElement.classList.add('p-dark');
      htmlElement.classList.remove('p-light');
      console.log('Applied dark theme, classes:', htmlElement.classList.toString());
    } else {
      htmlElement.classList.add('p-light');
      htmlElement.classList.remove('p-dark');
      console.log('Applied light theme, classes:', htmlElement.classList.toString());
    }
  }

  private saveTheme(theme: Theme): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, theme);
    }
  }
}