import { useMemo } from "react";
import {
  AppShell,
  Box,
  Group,
  Text,
  ThemeIcon,
  Badge,
  rem,
} from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";
import { Link, Outlet } from "react-router-dom";

export function MainLayout() {
  const inTelegram = useMemo(
    () => document.documentElement.classList.contains("tg-webapp"),
    [],
  );

  const headerHeight = inTelegram
    ? "calc(4.25rem + env(safe-area-inset-top, 0px))"
    : "calc(4.5rem + env(safe-area-inset-top, 0px))";

  return (
    <Box className="page-bg">
      <div className="noise" aria-hidden />
      <AppShell
        header={{ height: headerHeight }}
        padding={0}
        styles={{
          root: {
            background: "transparent",
            ...(inTelegram && {
              display: "flex",
              flexDirection: "column",
              minHeight: "var(--app-viewport-height)",
              maxHeight: "var(--app-viewport-height)",
            }),
          },
          main: {
            background: "transparent",
            paddingBottom: `calc(${rem(64)} + var(--app-safe-bottom, 0px))`,
            ...(inTelegram && {
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
            }),
          },
          header: {
            background: "rgba(6, 6, 10, 0.72)",
            backdropFilter: "blur(16px) saturate(1.4)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
            boxSizing: "border-box",
          },
        }}
      >
        <AppShell.Header>
          <Group
            h="100%"
            px={{ base: "md", sm: "xl" }}
            justify="space-between"
            wrap="nowrap"
            gap="sm"
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit", minWidth: 0 }}>
              <Group gap="sm" wrap="nowrap">
                <ThemeIcon
                  size={inTelegram ? 36 : 40}
                  radius="md"
                  variant="gradient"
                  gradient={{ from: "violet.6", to: "cyan.5", deg: 135 }}
                  style={{ flexShrink: 0 }}
                >
                  <IconSparkles size={inTelegram ? 20 : 22} stroke={1.5} />
                </ThemeIcon>
                <div style={{ minWidth: 0 }}>
                  <Text fw={700} size="sm" c="gray.1" lh={1.2} truncate>
                    Interview Prep
                  </Text>
                  <Text size="xs" c="dimmed" lh={1.2} truncate>
                    Frontend · тренажёр
                  </Text>
                </div>
              </Group>
            </Link>
            {!inTelegram && (
              <Badge
                size="lg"
                variant="light"
                color="violet"
                radius="sm"
                tt="none"
                fw={500}
                style={{ flexShrink: 0 }}
                styles={{
                  root: {
                    border: "1px solid rgba(167, 139, 250, 0.35)",
                    background: "rgba(139, 92, 246, 0.12)",
                  },
                }}
              >
                beta
              </Badge>
            )}
          </Group>
        </AppShell.Header>

        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </Box>
  );
}
