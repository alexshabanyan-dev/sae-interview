import { Code, Text } from "@mantine/core";
import type { ReactNode } from "react";

/** Разбивает строку по `коду` и вставляет `<Code>`. */
export function RichText({
  children,
  lh = 1.7,
  size = "sm",
  c = "gray.3",
  component = "div",
}: {
  children: string;
  lh?: number;
  size?: string;
  c?: string;
  component?: "div" | "span";
}) {
  const segments = children.split(/`([^`]+)`/);
  const nodes: ReactNode[] = [];
  for (let i = 0; i < segments.length; i++) {
    if (i % 2 === 1) {
      nodes.push(
        <Code key={i} style={{ verticalAlign: "baseline" }}>
          {segments[i]}
        </Code>,
      );
    } else if (segments[i]) {
      nodes.push(<span key={i}>{segments[i]}</span>);
    }
  }
  return (
    <Text c={c} size={size as "sm"} lh={lh} component={component}>
      {nodes}
    </Text>
  );
}
