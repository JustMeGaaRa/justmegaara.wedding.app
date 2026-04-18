import questionnaire from '../data/questionnaire.json';

export interface QuestionnaireQuestion {
  type: 'single-option' | 'textarea';
  text: string;
  options?: string[];
  placeholder?: string;
}

export function getQuestionnaire(): QuestionnaireQuestion[] {
  return questionnaire as QuestionnaireQuestion[];
}
