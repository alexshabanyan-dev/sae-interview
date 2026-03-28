export type JsTopicTask = {
  id: string;
  prompt: string;
  code?: string;
  answer: string;
  explanation: string;
  solutionCode?: string;
  answerSectionTitle?: string;
  explanationSectionTitle?: string;
};

/** Вопрос виден в заголовке аккордеона; ответ — в панели (как у задач). */
export type JsTopicInterviewQa = {
  id: string;
  question: string;
  /** Разметка для `RichText` (как `answer` у задач). */
  answer: string;
};
