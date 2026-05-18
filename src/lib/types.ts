export interface Wish {
  id: string;
  text: string;
  memo?: string;
  createdAt: Date;
  completed: boolean;
}

export interface Ceremony {
  id: string;
  title: string;
  date: Date;
  type: 'count-up' | 'count-down';
}

export type View = 'chat' | 'negentropy' | 'anchor' | 'coconut' | 'resonance';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'coco';
  timestamp: Date;
  type: 'text' | 'file' | 'image' | 'voice';
  tokens?: number;
  thinking_time?: number;
  thought_process?: string;
  tool_calls?: string[];
  fileUrl?: string;
}

export interface Session {
  id: string;
  name: string;
  createdAt: Date;
  contextLength: number;
}

export interface MemoryCard {
  id: string;
  tag: string;
  domain: string;
  feel: string;
  content: string;
  chord?: string;
  chordDescription?: string;
  type: 'affinity' | 'fragment' | 'dream' | 'anchor';
  createdAt: Date;
}

export interface AlbumItem {
  id: string;
  name: string;
  url: string;
  category: 'stars' | 'daily' | 'others' | 'secrets';
  createdAt: Date;
}

export interface EchoItem {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}

export interface MCPTool {
  id: string;
  name: string;
  connected: boolean;
  enabled: boolean;
}
