
import { ReactNode } from "react";

export interface SearchSuggestion {
  id: string;
  text: string;
  type: 'college' | 'location' | 'course' | 'district';
  icon: ReactNode;
}

export interface SearchAutocompleteProps {
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  showIcon?: boolean;
  onSearch?: (query: string) => void;
  variant?: 'hero' | 'header';
}
