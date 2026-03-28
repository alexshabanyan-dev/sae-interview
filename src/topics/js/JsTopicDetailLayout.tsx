import type { ReactNode } from "react";
import {
  Accordion,
  Anchor,
  Container,
  Group,
  Stack,
  Text,
  Title,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { IconArrowLeft, IconBook } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { CodeBlock } from "../../components/CodeBlock";
import type { JsTopicInterviewQa, JsTopicTask } from "./jsTopicTypes";
import { RichText } from "./richText";

export const jsTopicAccordionStyles = {
  item: {
    border: "1px solid rgba(255, 255, 255, 0.08)",
    background: "rgba(255, 255, 255, 0.02)",
  },
  control: { padding: `${rem(14)} ${rem(16)}` },
  label: { color: "var(--mantine-color-gray-2)", fontWeight: 500 },
  panel: { padding: `${rem(16)} ${rem(16)} ${rem(20)}` },
} as const;

/** Внешний аккордеон: секция целиком свёрнута по умолчанию (`defaultValue: null`). */
const jsTopicFoldableSectionStyles = {
  item: {
    border: "1px solid rgba(255, 255, 255, 0.12)",
    background: "rgba(255, 255, 255, 0.03)",
  },
  control: { padding: `${rem(16)} ${rem(18)}` },
  label: { flex: 1 },
  panel: { padding: `${rem(8)} ${rem(16)} ${rem(20)}` },
} as const;

const FOLD_SINGLE_ITEM_VALUE = "section";

export function JsTopicFoldableSection({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Accordion
      variant="separated"
      radius="md"
      defaultValue={null}
      styles={jsTopicFoldableSectionStyles}
    >
      <Accordion.Item value={FOLD_SINGLE_ITEM_VALUE}>
        <Accordion.Control>
          <Title
            order={2}
            c="gray.1"
            style={{ letterSpacing: "-0.02em" }}
            size="h3"
          >
            {title}
          </Title>
        </Accordion.Control>
        <Accordion.Panel>
          <Stack gap="md">
            {hint ? <div>{hint}</div> : null}
            {children}
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

export function JsTopicTaskPanel({ task }: { task: JsTopicTask }) {
  const hasSolution = Boolean(task.solutionCode);
  return (
    <Stack gap="md">
      <div>
        <Text fw={600} c="gray.2" size="sm" mb={6}>
          {task.answerSectionTitle ?? "Ответ"}
        </Text>
        <RichText>{task.answer}</RichText>
      </div>
      {hasSolution ? (
        <div>
          <Text fw={600} c="gray.2" size="sm" mb={6}>
            Пример решения
          </Text>
          <CodeBlock>{task.solutionCode!}</CodeBlock>
          <RichText>{task.explanation}</RichText>
        </div>
      ) : (
        <div>
          <Text fw={600} c="gray.2" size="sm" mb={6}>
            {task.explanationSectionTitle ?? "Разбор"}
          </Text>
          <RichText>{task.explanation}</RichText>
        </div>
      )}
    </Stack>
  );
}

export function JsTopicSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Stack gap="md">
      <Title
        order={2}
        c="gray.1"
        style={{ letterSpacing: "-0.02em" }}
        size="h3"
      >
        {title}
      </Title>
      {children}
    </Stack>
  );
}

export function JsTopicInterviewQaSection({
  items,
}: {
  items: JsTopicInterviewQa[];
}) {
  if (items.length === 0) return null;
  return (
    <JsTopicFoldableSection
      title="Частые вопросы на собеседованиях"
      hint={
        <Text c="dimmed" size="sm">
          Вопрос — в заголовке аккордеона. Ответ — внутри после раскрытия.
        </Text>
      }
    >
      <Accordion
        variant="separated"
        radius="md"
        styles={jsTopicAccordionStyles}
      >
        {items.map((item, index) => (
          <Accordion.Item key={item.id} value={item.id}>
            <Accordion.Control>
              <Text size="sm" lh={1.55} c="gray.2" component="div">
                <strong>{index + 1}.</strong>{" "}
                <RichText component="span" c="gray.2" lh={1.55} size="sm">
                  {item.question}
                </RichText>
              </Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack gap="sm">
                <div>
                  <Text fw={600} c="gray.2" size="sm" mb={6}>
                    Ответ
                  </Text>
                  <RichText>{item.answer}</RichText>
                </div>
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </JsTopicFoldableSection>
  );
}

export function JsTopicGroupTitle({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ size?: number; stroke?: number }>;
  label: string;
}) {
  return (
    <Group gap="xs" wrap="nowrap">
      <ThemeIcon size="sm" variant="light" color="gray" radius="sm">
        <Icon size={14} stroke={1.5} />
      </ThemeIcon>
      <Text
        size="xs"
        tt="uppercase"
        fw={700}
        c="dimmed"
        style={{ letterSpacing: "0.08em" }}
      >
        {label}
      </Text>
    </Group>
  );
}

export function JsTopicDetailLayout({
  title,
  subtitle,
  tasks,
  taskSectionTitle,
  interviewQuestions,
  children,
}: {
  title: string;
  subtitle: string;
  tasks: JsTopicTask[];
  taskSectionTitle?: string;
  interviewQuestions?: JsTopicInterviewQa[];
  children: ReactNode;
}) {
  return (
    <Container
      size="md"
      px={{ base: "md", sm: "xl" }}
      pt={{ base: "lg", md: "xl" }}
      pb={64}
    >
      <Stack gap="xl">
        <Group gap="lg" wrap="wrap">
          <Anchor
            component={Link}
            to="/topics/js"
            c="dimmed"
            size="sm"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
            }}
          >
            <IconArrowLeft size={16} stroke={1.5} />
            К темам JavaScript
          </Anchor>
          <Text size="sm" c="dimmed" style={{ opacity: 0.45 }}>
            ·
          </Text>
          <Anchor
            component={Link}
            to="/"
            c="dimmed"
            size="sm"
            style={{ textDecoration: "none" }}
          >
            На главную
          </Anchor>
        </Group>

        <Stack gap="xs">
          <JsTopicGroupTitle icon={IconBook} label="JavaScript" />
          <Title order={1} c="gray.0" style={{ letterSpacing: "-0.03em" }}>
            {title}
          </Title>
          <Text size="lg" c="dimmed" maw={640}>
            {subtitle}
          </Text>
        </Stack>

        {children}

        <JsTopicFoldableSection
          title={taskSectionTitle ?? "Задачи для практики (50 шт.)"}
          hint={
            <Text c="dimmed" size="sm">
              Условие — в заголовке аккордеона. Ответ и разбор — внутри после
              раскрытия.
            </Text>
          }
        >
          <Accordion
            variant="separated"
            radius="md"
            styles={jsTopicAccordionStyles}
          >
            {tasks.map((task, index) => (
              <Accordion.Item key={task.id} value={task.id}>
                <Accordion.Control>
                  <Stack gap="xs">
                    <Text size="sm" lh={1.55} c="gray.2" component="div">
                      <strong>{index + 1}.</strong>{" "}
                      <RichText component="span" c="gray.2" lh={1.55} size="sm">
                        {task.prompt}
                      </RichText>
                    </Text>
                    {task.code ? <CodeBlock>{task.code}</CodeBlock> : null}
                  </Stack>
                </Accordion.Control>
                <Accordion.Panel>
                  <JsTopicTaskPanel task={task} />
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </JsTopicFoldableSection>

        {interviewQuestions?.length ? (
          <JsTopicInterviewQaSection items={interviewQuestions} />
        ) : null}
      </Stack>
    </Container>
  );
}
