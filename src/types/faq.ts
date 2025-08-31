export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface FaqCategory {
  id: string;
  name: string;
  items: FaqItem[];
}
