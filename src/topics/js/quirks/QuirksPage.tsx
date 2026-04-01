import { Anchor, Code, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import {
  JsTopicDetailLayout,
  JsTopicSection,
} from "../JsTopicDetailLayout";
import { QUIRKS_INTERVIEW_QA } from "./quirksInterviewQa";
import { QUIRKS_TASKS } from "./quirksTasks";
import { QuirksArticleContent } from "./QuirksArticleContent";

export function QuirksPage() {
  return (
    <JsTopicDetailLayout
      title="Странности и ловушки JavaScript"
      subtitle="Сборник неочевидного поведения языка: типы, сравнения, числа, массивы, объекты, даты, регулярки, операторы и исторические артефакты. Чтобы на собесе не теряться и в коде знать, где спрятан сюрприз."
      tasks={QUIRKS_TASKS}
      taskSectionTitle="Задачки на странности (32 шт.)"
      interviewQuestions={QUIRKS_INTERVIEW_QA}
      interviewQaFoldTitle="Короткие вопросы про странности JS (15 шт.)"
      interviewQaFoldHint={
        <Text c="dimmed" size="sm">
          Быстрые ответы — перед собесом или ревью легаси.
        </Text>
      }
    >
      <JsTopicSection title="Как читать этот материал">
        <Text c="gray.2" lh={1.75}>
          Разделы независимы: можно идти сверху вниз или открывать интересную тему.
          Многое пересекается с разделом{" "}
          <Anchor component={Link} to="/topics/js/coercion" c="cyan.3" fw={500}>
            «Типы и приведение»
          </Anchor>
          — там глубже про <Code>==</Code> и алгоритмы; здесь — широкий обзор «что язык делает
          неинтуитивно». Ориентируйся на спецификацию ECMAScript и целевую среду
          (браузер vs Node).
        </Text>
      </JsTopicSection>
      <QuirksArticleContent />
    </JsTopicDetailLayout>
  );
}
