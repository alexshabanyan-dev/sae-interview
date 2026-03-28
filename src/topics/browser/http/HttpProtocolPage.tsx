import { Text } from "@mantine/core";
import { IconWorldCode } from "@tabler/icons-react";
import { JsTopicDetailLayout } from "../../js/JsTopicDetailLayout";
import { HttpArticleContent } from "./HttpArticleContent";
import { HTTP_INTERVIEW_QA } from "./httpInterviewQa";

export function HttpProtocolPage() {
  return (
    <JsTopicDetailLayout
      title="Протокол HTTP"
      subtitle="От строки запроса до HTTP/3: методы, коды, заголовки, тело, кэш, cookies, TLS, мультиплексирование, WebSocket и практика с curl и DevTools."
      backTo={{ to: "/topics/browser", label: "К разделу «Браузер и сеть»" }}
      groupLabel="Браузер и сеть"
      groupIcon={IconWorldCode}
      interviewQuestions={HTTP_INTERVIEW_QA}
      interviewQaFoldTitle="Вопросы про HTTP на собеседованиях"
      interviewQaFoldHint={
        <Text c="dimmed" size="sm">
          Краткие ответы к статье — раскрой пункт, чтобы повторить перед интервью.
        </Text>
      }
    >
      <HttpArticleContent />
    </JsTopicDetailLayout>
  );
}
