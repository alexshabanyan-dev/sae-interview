import {
  Box,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Badge,
} from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";
import {
  IconBrandJavascript,
  IconBrandReact,
  IconLayoutGrid,
  IconWorldCode,
} from "@tabler/icons-react";
import { TopicCard } from "../components/TopicCard";

const topics = [
  {
    title: "JavaScript / TypeScript",
    description: "Замыкания, типы, async, Event Loop, модули.",
    icon: IconBrandJavascript,
    accent: "#fbbf24",
    to: "/topics/js",
  },
  {
    title: "React",
    description: "Hooks, рендер, состояние, производительность, SSR.",
    icon: IconBrandReact,
    accent: "#22d3ee",
  },
  {
    title: "Браузер и сеть",
    description: "HTTP, кэш, CORS, Storage, безопасность.",
    icon: IconWorldCode,
    accent: "#a78bfa",
    to: "/topics/browser",
  },
  {
    title: "CSS и вёрстка",
    description: "Flex/Grid, адаптив, специфичность, современный CSS.",
    icon: IconLayoutGrid,
    accent: "#fb7185",
  },
];

export function HomePage() {
  return (
    <Container size="lg" px={{ base: "md", sm: "xl" }} pt={{ base: "xl", md: 48 }}>
      <Stack gap={48}>
        <Stack gap="lg" maw={720}>
          <Badge
            variant="outline"
            color="gray"
            size="lg"
            radius="sm"
            leftSection={<IconSparkles size={14} />}
            styles={{
              root: {
                width: "fit-content",
                borderColor: "rgba(255,255,255,0.14)",
                color: "var(--mantine-color-gray-4)",
                background: "rgba(255,255,255,0.03)",
              },
            }}
          >
            Личный проект
          </Badge>

          <Title order={1} c="gray.0" style={{ letterSpacing: "-0.04em", lineHeight: 1.08 }}>
            Готовься к интервью
            <br />
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: "violet.3", to: "cyan.4", deg: 105 }}
              fz="clamp(1.85rem, 5vw, 2.85rem)"
              fw={700}
            >
              без скуки
            </Text>
          </Title>

          <Text size="lg" c="dimmed" lh={1.7} maw={560}>
            Одно место для тем, карточек и заметок по фронтенду. Структурируй подготовку и добавляй свой
            контент — от теории до живых задач.
          </Text>

          <Group gap="xl" mt="sm">
            <div>
              <Text size="xs" tt="uppercase" fw={600} c="dimmed" mb={4}>
                Фокус
              </Text>
              <Text fw={700} size="xl" c="gray.1">
                UI · React · JS
              </Text>
            </div>
            <Box
              w={1}
              h={40}
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(255,255,255,0.12), transparent)",
              }}
            />
            <div>
              <Text size="xs" tt="uppercase" fw={600} c="dimmed" mb={4}>
                Режим
              </Text>
              <Text fw={700} size="xl" c="gray.1">
                Тёмная тема
              </Text>
            </div>
          </Group>
        </Stack>

        <Stack gap="md">
          <Group justify="space-between" align="flex-end">
            <div>
              <Title order={2} c="gray.1" style={{ letterSpacing: "-0.03em" }}>
                Темы
              </Title>
              <Text size="sm" c="dimmed" mt={6}>
                Карточка JavaScript открывает список тем раздела.
              </Text>
            </div>
          </Group>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={{ base: "md", md: "lg" }}>
            {topics.map((topic) => (
              <TopicCard key={topic.title} {...topic} />
            ))}
          </SimpleGrid>
        </Stack>
      </Stack>
    </Container>
  );
}
