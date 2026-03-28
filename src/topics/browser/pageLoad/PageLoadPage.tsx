import { Text } from "@mantine/core";
import { IconWorldCode } from "@tabler/icons-react";
import { JsTopicDetailLayout } from "../../js/JsTopicDetailLayout";
import { PageLoadArticleContent } from "./PageLoadArticleContent";
import { PAGE_LOAD_INTERVIEW_QA } from "./pageLoadInterviewQa";

export function PageLoadPage() {
  return (
    <JsTopicDetailLayout
      title="От URL до пикселей: как загружается и отображается страница"
      subtitle="Полный путь: разбор адреса, DNS, TCP и QUIC, TLS, HTTP, потоковый HTML, DOM/CSSOM, layout, paint, composite, ресурсы, Service Worker, bfcache и связь с метриками."
      backTo={{ to: "/topics/browser", label: "К разделу «Браузер и сеть»" }}
      groupLabel="Браузер и сеть"
      groupIcon={IconWorldCode}
      interviewQuestions={PAGE_LOAD_INTERVIEW_QA}
      interviewQaFoldTitle="Вопросы про загрузку и отрисовку страницы"
      interviewQaFoldHint={
        <Text c="dimmed" size="sm">
          Короткие ответы для повторения перед интервью — раскрой пункт с вопросом.
        </Text>
      }
    >
      <PageLoadArticleContent />
    </JsTopicDetailLayout>
  );
}
