import { AppShell, Box, Group, Text, ThemeIcon, Badge, rem } from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";
import { Link, Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <Box className="page-bg">
      <div className="noise" aria-hidden />
      <AppShell
        header={{ height: rem(72) }}
        padding={0}
        styles={{
          root: { background: "transparent" },
          main: { background: "transparent", paddingBottom: rem(64) },
          header: {
            background: "rgba(6, 6, 10, 0.72)",
            backdropFilter: "blur(16px) saturate(1.4)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          },
        }}
      >
        <AppShell.Header>
          <Group h="100%" px={{ base: "md", sm: "xl" }} justify="space-between">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Group gap="sm" wrap="nowrap">
                <ThemeIcon
                  size={40}
                  radius="md"
                  variant="gradient"
                  gradient={{ from: "violet.6", to: "cyan.5", deg: 135 }}
                >
                  <IconSparkles size={22} stroke={1.5} />
                </ThemeIcon>
                <div>
                  <Text fw={700} size="sm" c="gray.1" lh={1.2}>
                    Interview Prep
                  </Text>
                  <Text size="xs" c="dimmed" lh={1.2}>
                    Frontend · тренажёр
                  </Text>
                </div>
              </Group>
            </Link>
            <Badge
              size="lg"
              variant="light"
              color="violet"
              radius="sm"
              tt="none"
              fw={500}
              styles={{
                root: {
                  border: "1px solid rgba(167, 139, 250, 0.35)",
                  background: "rgba(139, 92, 246, 0.12)",
                },
              }}
            >
              beta
            </Badge>
          </Group>
        </AppShell.Header>

        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </Box>
  );
}
