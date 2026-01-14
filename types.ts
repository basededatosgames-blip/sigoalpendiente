
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface PromptResult {
  refinedPrompt: string;
  artisticStyle: string;
  suggestedMedium: string;
  tags: string[];
}
