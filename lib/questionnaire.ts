import questionnaire from '../data/questionnaire.json';

export interface QuestionnaireQuestion {
  id: string;
  type: 'single-option' | 'textarea';
  text: string;
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

export function getQuestionnaire(): QuestionnaireQuestion[] {
  return questionnaire as QuestionnaireQuestion[];
}
