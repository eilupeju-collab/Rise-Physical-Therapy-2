export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface ChatConfig {
  apiKey: string;
}
