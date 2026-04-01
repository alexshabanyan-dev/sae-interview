import { Text } from "@mantine/core";
import {
  JsTopicDetailLayout,
  JsTopicSection,
} from "../JsTopicDetailLayout";
import { COERCION_INTERVIEW_QA } from "./coercionInterviewQa";
import { COERCION_TASKS } from "./coercionTasks";
import { CoercionArticleContent } from "./CoercionArticleContent";

export function CoercionPage() {
  return (
    <JsTopicDetailLayout
      title="Типы, приведение и сравнение"
      subtitle="Truthy/falsy, === и ==, Object.is, ToPrimitive, + и арифметика, parseInt, NaN, null/undefined, объекты и ссылки — чтобы уверенно отвечать на задачи «что выведет» и писать предсказуемый код."
      tasks={COERCION_TASKS}
      taskSectionTitle="Задачи для практики (28 шт.)"
      interviewQuestions={COERCION_INTERVIEW_QA}
      interviewQaFoldTitle="Вопросы про приведение типов"
      interviewQaFoldHint={
        <Text c="dimmed" size="sm">
          Краткие ответы — раскрой пункт перед собеседованием.
        </Text>
      }
    >
      <JsTopicSection title="Как пользоваться материалом">
        <Text c="gray.2" lh={1.75}>
          Прочитай теорию по порядку или перейди сразу к разделу 21 «Шпаргалка», если
          нужен быстрый освежающий лист. Закрепление — блок задач с кодом в аккордеонах.
        </Text>
      </JsTopicSection>
      <CoercionArticleContent />
    </JsTopicDetailLayout>
  );
}
