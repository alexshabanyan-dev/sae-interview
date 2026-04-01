import {
  Anchor,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
  ThemeIcon,
  rem,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconBookmark,
  IconBrandJavascript,
  IconBraces,
  IconEqual,
  IconGitBranch,
  IconLink,
  IconBolt,
  IconBrackets,
  IconMoodWink,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { TopicCard } from "../../../components/TopicCard";

const jsTopics = [
  {
    title: "Типы и приведение",
    description:
      "Truthy/falsy, === и ==, Object.is, NaN, parseInt, классические ловушки собесов.",
    icon: IconEqual,
    accent: "#fde047",
    to: "/topics/js/coercion",
  },
  {
    title: "Странности и ловушки",
    description:
      "NaN, typeof null, массивы и ==, JSON, Date, RegExp, головоломки собесов — большой сборник.",
    icon: IconMoodWink,
    accent: "#f472b6",
    to: "/topics/js/quirks",
  },
  {
    title: "Область видимости",
    description:
      "var и let/const, блочная область, hoisting, TDZ, циклы, switch, catch, классы.",
    icon: IconBrackets,
    accent: "#a5b4fc",
    to: "/topics/js/scope",
  },
  {
    title: "Замыкания",
    description:
      "Лексическое окружение, приватность, циклы, async и типичные вопросы на собесе.",
    icon: IconBraces,
    accent: "#fbbf24",
    to: "/topics/js/closures",
  },
  {
    title: "Event Loop",
    description:
      "Синхронный код, микро- и макрозадачи, async/await и порядок вывода в консоль.",
    icon: IconGitBranch,
    accent: "#22d3ee",
    to: "/topics/js/event-loop",
  },
  {
    title: "this и call / apply / bind",
    description:
      "Неявная и явная привязка, стрелки, классы, конструктор и потеря контекста.",
    icon: IconLink,
    accent: "#a78bfa",
    to: "/topics/js/this",
  },
  {
    title: "Промисы и async/await",
    description:
      "then/catch/finally, all, race, any, типичные цепочки и ошибки.",
    icon: IconBolt,
    accent: "#fb7185",
    to: "/topics/js/promises",
  },
  {
    title: "Мемоизация и ...args",
    description:
      "Функция внутри memoize, rest/spread, замыкание и кэш, связь с useMemo/useCallback.",
    icon: IconBookmark,
    accent: "#86efac",
    to: "/topics/js/memoization",
  },
];

export function JsTopicsPage() {
  return (
    <Container
      size="lg"
      px={{ base: "md", sm: "xl" }}
      pt={{ base: "lg", md: "xl" }}
      pb={64}
    >
      <Stack gap="xl">
        <Group gap="md" wrap="wrap">
          <Anchor
            component={Link}
            to="/"
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
            На главную
          </Anchor>
        </Group>

        <Stack gap="xs">
          <Group gap="sm" wrap="nowrap" align="center">
            <ThemeIcon
              size={48}
              radius="md"
              variant="gradient"
              gradient={{ from: "yellow.4", to: "orange.6", deg: 135 }}
            >
              <IconBrandJavascript size={28} stroke={1.5} />
            </ThemeIcon>
            <div>
              <Title order={1} c="gray.0" style={{ letterSpacing: "-0.03em" }}>
                JavaScript / TypeScript
              </Title>
              <Text size="lg" c="dimmed" mt={rem(4)}>
                Выбери тему — откроется подробный материал.
              </Text>
            </div>
          </Group>
        </Stack>

        <Stack gap="md">
          <Title
            order={2}
            c="gray.1"
            size="h4"
            style={{ letterSpacing: "-0.02em" }}
          >
            Темы
          </Title>
          <SimpleGrid
            cols={{ base: 1, sm: 2 }}
            spacing={{ base: "md", md: "lg" }}
          >
            {jsTopics.map((topic) => (
              <TopicCard key={topic.to} {...topic} />
            ))}
          </SimpleGrid>
        </Stack>
      </Stack>
    </Container>
  );
}
