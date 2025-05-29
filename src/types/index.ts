// User role types
export enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  PARTICIPANT = 'participant',
  OBSERVER = 'observer'
}

// User interface
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

// Chat interface
export interface Chat {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  createdBy: string;
  isActive: boolean;
}

// Message interface
export interface Message {
  id: string;
  chatId: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  content: string;
  fileUrl?: string;
  fileType?: string;
  fileName?: string;
  isPoll?: boolean;
  pollId?: string;
  createdAt: string;
}

// Chat participant interface
export interface ChatParticipant {
  id: string;
  chatId: string;
  userId: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  joinedAt: string;
  isActive: boolean;
}

// Poll type enum
export enum PollType {
  SINGLE_CHOICE = 'single',
  MULTIPLE_CHOICE = 'multiple'
}

// Poll option interface
export interface PollOption {
  id: string;
  pollId: string;
  text: string;
  votes: number;
}

// Poll interface
export interface Poll {
  id: string;
  chatId: string;
  question: string;
  options: PollOption[];
  pollType: PollType;
  createdBy: string;
  createdAt: string;
  expiresAt?: string;
  isClosed: boolean;
}

// Vote interface
export interface Vote {
  id: string;
  pollId: string;
  optionId: string;
  userId: string;
  createdAt: string;
}
