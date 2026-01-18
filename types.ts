
export interface BudgetUnit {
  name: string;
  value: number;
  category?: 'Direct' | 'Indirect' | 'Fund';
}

export interface ProgramData {
  id: string;
  name: string;
  total: number;
  fiscal: number;
  social: number;
  objective?: string;
}

export interface RevenueCategory {
  specification: string;
  value: number;
}

export interface RegionalProject {
  title: string;
  description: string;
  category: 'Saúde' | 'Educação' | 'Infraestrutura' | 'Social' | 'Urbanismo';
}

export interface RegionalData {
  name: string;
  total: number;
  neighborhoods: string[];
  projects: RegionalProject[];
}

export type ViewType = 'overview' | 'revenue' | 'expense' | 'regional' | 'participatory' | 'chat';
