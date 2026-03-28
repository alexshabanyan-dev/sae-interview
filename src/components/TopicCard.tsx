import {
  Box,
  Card,
  Group,
  Stack,
  Text,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { useHover, useMediaQuery } from "@mantine/hooks";
import { IconArrowRight, type TablerIcon } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export type TopicCardProps = {
  title: string;
  description: string;
  icon: TablerIcon;
  accent: string;
  to?: string;
};

export function TopicCard(props: TopicCardProps) {
  const { hovered, ref } = useHover();
  const Icon = props.icon;
  const canFineHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const lift = Boolean(canFineHover && hovered);

  const card = (
    <Card
      padding="xl"
      radius="lg"
      style={{
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        boxShadow: lift
          ? `0 0 0 1px ${props.accent}55, 0 24px 48px -12px rgba(0,0,0,0.65)`
          : "0 16px 40px -20px rgba(0,0,0,0.55)",
        transform: lift ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
        cursor: props.to ? "pointer" : undefined,
        touchAction: props.to ? "manipulation" : undefined,
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <Box
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(600px circle at 0% 0%, ${props.accent}22, transparent 45%)`,
          pointerEvents: "none",
        }}
      />
      <Stack gap="md" style={{ position: "relative" }}>
        <Group justify="space-between" align="flex-start">
          <ThemeIcon
            size={52}
            radius="md"
            variant="light"
            color="gray"
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: props.accent,
            }}
          >
            <Icon size={28} stroke={1.5} />
          </ThemeIcon>
          <IconArrowRight
            size={20}
            stroke={1.5}
            style={{
              opacity: lift ? 1 : 0.35,
              transform: lift ? "translateX(4px)" : "translateX(0)",
              transition: "opacity 180ms ease, transform 180ms ease",
              color: "var(--mantine-color-gray-5)",
            }}
          />
        </Group>
        <div>
          <Text fw={600} size="lg" c="gray.1" style={{ letterSpacing: "-0.02em" }}>
            {props.title}
          </Text>
          <Text size="sm" c="dimmed" mt={rem(8)} lh={1.6}>
            {props.description}
          </Text>
        </div>
      </Stack>
    </Card>
  );

  if (props.to) {
    return (
      <Box ref={ref} component={Link} to={props.to} style={{ height: "100%", textDecoration: "none" }}>
        {card}
      </Box>
    );
  }

  return (
    <Box ref={ref} style={{ height: "100%" }}>
      {card}
    </Box>
  );
}
