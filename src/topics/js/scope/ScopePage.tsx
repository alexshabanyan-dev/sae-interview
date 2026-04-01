import { Text } from "@mantine/core";
import {
  JsTopicDetailLayout,
  JsTopicSection,
} from "../JsTopicDetailLayout";
import { SCOPE_INTERVIEW_QA } from "./scopeInterviewQa";
import { SCOPE_TASKS } from "./scopeTasks";
import { ScopeArticleContent } from "./ScopeArticleContent";

export function ScopePage() {
  return (
    <JsTopicDetailLayout
      title="Область видимости в JavaScript"
      subtitle="var и let/const, блочная и функциональная область, hoisting, TDZ, параметры, циклы, switch, catch, классы, связь с замыканиями. Ниже — подборка каверзных задач."
      tasks={SCOPE_TASKS}
      taskSectionTitle="Задачи для практики (32 шт.)"
      interviewQuestions={SCOPE_INTERVIEW_QA}
      interviewQaFoldTitle="Вопросы про scope на собеседованиях"
      interviewQaFoldHint={
        <Text c="dimmed" size="sm">
          Краткие ответы — раскрой пункт перед интервью.
        </Text>
      }
    >
      <JsTopicSection title="С чего начать">
        <Text c="gray.2" lh={1.75}>
          Если времени мало: разделы 3–5 (var / let / TDZ), затем 9 (циклы), затем шпаргалка
          17. Остальное — полнота картины и типичные уточняющие вопросы.
        </Text>
      </JsTopicSection>
      <ScopeArticleContent />
    </JsTopicDetailLayout>
  );
}
