export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
  profile?: UserProfile;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  phone?: string;
  company?: string;
  department?: string;
  bio?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  email: boolean;
  browser: boolean;
  mobile: boolean;
  marketing: boolean;
}