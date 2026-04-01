import {
  JsTopicDetailLayout,
  JsTopicSection,
} from "../JsTopicDetailLayout";
import { MEMOIZATION_INTERVIEW_QA } from "./memoizationInterviewQa";
import { MEMOIZATION_TASKS } from "./memoizationTasks";
import { MemoizationArticleContent } from "./MemoizationArticleContent";
import { Text } from "@mantine/core";

export function MemoizationPage() {
  return (
    <JsTopicDetailLayout
      title="Мемоизация и обёртки: от memoize до ...args"
      subtitle="Зачем функция возвращает функцию, почему (1, 2) попадает именно в args внутренней обёртки, rest vs spread, замыкание с кэшем, ключи и осторожности. Ниже — задачи."
      tasks={MEMOIZATION_TASKS}
      taskSectionTitle="Задачи для практики (20 шт.)"
      interviewQuestions={MEMOIZATION_INTERVIEW_QA}
      interviewQaFoldTitle="Вопросы про мемоизацию и HOF"
      interviewQaFoldHint={
        <Text c="dimmed" size="sm">
          Короткие ответы — раскрой пункт перед собеседованием.
        </Text>
      }
    >
      <JsTopicSection title="Как читать эту статью">
        <Text c="gray.2" lh={1.75}>
          Начни с разделов 1–4, если путаешься, **кто когда вызывается**. Разделы 5–7
          закрепляют замыкание и трассировку. Остальное — контекст, подводные камни и
          связь с React.
        </Text>
      </JsTopicSection>
      <MemoizationArticleContent />
    </JsTopicDetailLayout>
  );
}
