import { Code, Paper } from "@mantine/core";

export function CodeBlock({ children }: { children: string }) {
  return (
    <Paper
      p="md"
      radius="md"
      style={{
        border: "1px solid rgba(255, 255, 255, 0.08)",
        background: "rgba(0, 0, 0, 0.35)",
        overflowX: "auto",
      }}
    >
      <Code block fz="sm" style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
        {children.trim()}
      </Code>
    </Paper>
  );
}
