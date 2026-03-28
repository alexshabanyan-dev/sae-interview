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
  IconCloudNetwork,
  IconRoute2,
  IconWorldCode,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { TopicCard } from "../../components/TopicCard";

const networkTopics = [
  {
    title: "Протокол HTTP",
    description:
      "Запрос и ответ, методы, коды, заголовки, кэш, cookies, HTTP/2 и HTTP/3, HTTPS, практика.",
    icon: IconCloudNetwork,
    accent: "#7dd3fc",
    to: "/topics/browser/http",
  },
  {
    title: "От URL до пикселей",
    description:
      "Enter в адресной строке: DNS, сеть, TLS, парсинг HTML, рендер, compositor, DevTools.",
    icon: IconRoute2,
    accent: "#c4b5fd",
    to: "/topics/browser/page-load",
  },
];

export function NetworkTopicsPage() {
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
              gradient={{ from: "violet.5", to: "cyan.5", deg: 135 }}
            >
              <IconWorldCode size={28} stroke={1.5} />
            </ThemeIcon>
            <div>
              <Title order={1} c="gray.0" style={{ letterSpacing: "-0.03em" }}>
                Браузер и сеть
              </Title>
              <Text size="lg" c="dimmed" mt={rem(4)}>
                HTTP, загрузка страницы, дальше — кэш, CORS, Storage и безопасность.
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
            Статьи
          </Title>
          <SimpleGrid
            cols={{ base: 1, sm: 2 }}
            spacing={{ base: "md", md: "lg" }}
          >
            {networkTopics.map((topic) => (
              <TopicCard key={topic.to} {...topic} />
            ))}
          </SimpleGrid>
        </Stack>
      </Stack>
    </Container>
  );
}
