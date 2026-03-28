import {
  Accordion,
  Alert,
  Anchor,
  Code,
  Container,
  Divider,
  Group,
  List,
  Paper,
  Stack,
  Table,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { IconArrowLeft, IconBook, IconBulb } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { CodeBlock } from "../../../components/CodeBlock";
import {
  JsTopicFoldableSection,
  JsTopicGroupTitle,
  JsTopicInterviewQaSection,
  JsTopicSection,
  JsTopicTaskPanel,
  jsTopicAccordionStyles,
} from "../JsTopicDetailLayout";
import { CLOSURE_TASKS } from "./closureTasks";
import { CLOSURES_INTERVIEW_QA } from "./closuresInterviewQa";
import { RichText } from "../richText";

export function ClosuresPage() {
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
            <IconArrowLeft size={16} stroke={1.5} />К темам JavaScript
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
            Замыкания (closures)
          </Title>
          <Text size="lg" c="dimmed" maw={640}>
            Полное объяснение: что это, как работает движок, типичные примеры и
            ловушки на собеседованиях.
          </Text>
        </Stack>

        <JsTopicSection title="1. Определение простыми словами">
          <Text c="gray.2" lh={1.75}>
            <strong>Замыкание</strong> — это способность функции «помнить»
            окружение, в котором она была <em>создана</em>, и обращаться к
            переменным из этого окружения даже после того, как внешняя функция
            уже завершилась. Другими словами: внутренняя функция сохраняет
            ссылку на лексическое окружение своей внешней области видимости.
          </Text>
          <Alert
            variant="light"
            color="violet"
            title="Формула для ответа на собесе"
            mt="md"
          >
            Замыкание = функция + окружение (лексическое окружение), с которым
            эта функция была создана и к которому у неё есть доступ при вызове.
          </Alert>
        </JsTopicSection>

        <JsTopicSection title="2. Зачем это в языке">
          <List spacing="sm" c="gray.3" size="sm">
            <List.Item>
              Скрывать данные (имитация «приватных» полей без классов).
            </List.Item>
            <List.Item>
              Делать фабрики функций и конфигурируемые хелперы.
            </List.Item>
            <List.Item>
              Сохранять состояние между вызовами (счётчики, мемоизация, once).
            </List.Item>
            <List.Item>
              Использовать колбэки: обработчики событий «помнят» переменные из
              места создания.
            </List.Item>
          </List>
        </JsTopicSection>

        <JsTopicSection title="3. Лексическое окружение и цепочка областей">
          <Text c="gray.2" lh={1.75}>
            В JavaScript у каждой области видимости (глобальной, функции, блока{" "}
            <Code>{}</Code> для <Code>let</Code>/<Code>const</Code>) есть{" "}
            <strong>лексическое окружение</strong> — запись, где хранятся
            привязки переменных (имя → значение) и ссылка на <em>внешнее</em>{" "}
            окружение. При обращении к переменной движок ищет её в текущем
            окружении, затем поднимается по цепочке наружу — это и есть поиск по{" "}
            <strong>scope chain</strong>.
          </Text>
          <Text c="gray.2" lh={1.75} mt="sm">
            Когда создаётся функция, она получает внутреннее свойство{" "}
            <Code>[[Environment]]</Code> (концептуально) — ссылку на внешнее
            лексическое окружение. Именно поэтому внутренняя функция «видит»
            переменные снаружи.
          </Text>
        </JsTopicSection>

        <JsTopicSection title="4. Минимальный пример">
          <CodeBlock>{`
function outer() {
  const secret = 42;
  return function inner() {
    return secret; // inner «замкнута» на окружение outer
  };
}

const get = outer();
console.log(get()); // 42
`}</CodeBlock>
          <Text c="gray.3" size="sm" mt="sm">
            После выполнения <Code>outer()</Code> локальная переменная{" "}
            <Code>secret</Code> не «исчезает» для <Code>inner</Code>: на неё всё
            ещё ссылается живая функция <Code>get</Code>.
          </Text>
        </JsTopicSection>

        <JsTopicSection title="5. Фабрика и «частичное» состояние">
          <CodeBlock>{`
function createMultiplier(factor) {
  return function (n) {
    return n * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

double(5); // 10 — своё factor
triple(5); // 15 — другое замыкание
`}</CodeBlock>
          <Text c="gray.3" size="sm" mt="sm">
            Каждый вызов <Code>createMultiplier</Code> создаёт своё окружение со
            своим <Code>factor</Code>, поэтому <Code>double</Code> и{" "}
            <Code>triple</Code> не делят одну переменную.
          </Text>
        </JsTopicSection>

        <JsTopicSection title="6. Классическая ловушка: цикл и var">
          <Text c="gray.2" lh={1.75}>
            С <Code>var</Code> переменная в цикле одна на все итерации, и
            колбэки часто видят уже финальное значение счётчика.
          </Text>
          <CodeBlock>{`
const fns = [];
for (var i = 0; i < 3; i++) {
  fns.push(() => i);
}
console.log(fns.map((fn) => fn())); // [3, 3, 3]
`}</CodeBlock>
          <Text c="gray.2" lh={1.75} mt="sm">
            Исправления: <Code>let</Code> (новая привязка на каждой итерации),
            IIFE с параметром, или отдельная функция-обёртка, создающая новое
            окружение для каждого <Code>i</Code>.
          </Text>
          <CodeBlock>{`
const fnsOk = [];
for (let i = 0; i < 3; i++) {
  fnsOk.push(() => i);
}
console.log(fnsOk.map((fn) => fn())); // [0, 1, 2]
`}</CodeBlock>
        </JsTopicSection>

        <JsTopicSection title="7. Модульный паттерн (приватность)">
          <CodeBlock>{`
function createCounter(initial = 0) {
  let value = initial;
  return {
    inc() {
      return ++value;
    },
    dec() {
      return --value;
    },
    get() {
      return value;
    },
  };
}

const c = createCounter(10);
c.inc(); // 11
// value снаружи недоступна — только через методы
`}</CodeBlock>
          <Text c="gray.3" size="sm" mt="sm">
            Снаружи нельзя напрямую присвоить <Code>value</Code> — это типичный
            ответ, как в JS реализовать инкапсуляцию без <Code>private</Code> в
            старых версиях или в учебных примерах.
          </Text>
        </JsTopicSection>

        <JsTopicSection title="8. Замыкание и async">
          <Text c="gray.2" lh={1.75}>
            После <Code>await</Code> функция может продолжить работу, но она
            по-прежнему та же функция с тем же окружением — замыкания не
            «ломаются». Важно помнить, что если ты захватываешь изменяемый
            объект (например, массив или поле объекта), все асинхронные
            продолжения видят актуальное состояние этого объекта, а не «снимок
            на момент создания», если только ты сам не скопировал примитив в
            локальную константу.
          </Text>
        </JsTopicSection>

        <JsTopicSection title="9. Память и утечки">
          <Text c="gray.2" lh={1.75}>
            Пока на функцию есть ссылка, живёт и связанное с ней окружение
            (включая большие переменные). Поэтому важно: не хранить в замыкании
            гигантские структуры без нужды, снимать слушатели событий, не
            оставлять глобальные ссылки на тяжёлые объекты, если они больше не
            нужны.
          </Text>
        </JsTopicSection>

        <JsTopicSection title="10. Частые вопросы на интервью">
          <Table
            striped
            highlightOnHover
            withTableBorder
            styles={{
              th: { color: "var(--mantine-color-gray-4)" },
              td: { color: "var(--mantine-color-gray-3)", fontSize: rem(13) },
            }}
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Вопрос</Table.Th>
                <Table.Th>Короткий ответ</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Что такое замыкание?</Table.Td>
                <Table.Td>
                  Функция + сохранённый доступ к внешним переменным через
                  лексическое окружение.
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  Отличается ли от просто «вложенной функции»?
                </Table.Td>
                <Table.Td>
                  Вложенность — синтаксис; замыкание — про <em>сохранение</em>{" "}
                  окружения при выходе из внешней функции или при передаче
                  внутренней наружу.
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Как связано с GC?</Table.Td>
                <Table.Td>
                  Пока замыкание достижимо, окружение не собирается сборщиком
                  мусора целиком.
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </JsTopicSection>

        <JsTopicFoldableSection
          title="11. Задачи для практики (50 шт.)"
          hint={
            <Text c="dimmed" size="sm">
              Условие видно сразу. Ответ и разбор — внутри: раскрой пункт, когда
              захочешь проверить себя.
            </Text>
          }
        >
          <Accordion
            variant="separated"
            radius="md"
            styles={jsTopicAccordionStyles}
          >
            {CLOSURE_TASKS.map((task, index) => (
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

        <JsTopicSection title="12. Шпаргалка одним абзацем">
          <Paper
            p="lg"
            radius="md"
            withBorder
            style={{ borderColor: "rgba(139, 92, 246, 0.25)" }}
          >
            <Text c="gray.2" lh={1.8} size="sm">
              Замыкание позволяет функции использовать переменные из внешних
              областей после того, как внешний код отработал; это основа для
              приватности, фабрик, счётчиков и корректной работы колбэков. В
              циклах осторожно с <Code>var</Code>; с <Code>let</Code>/
              <Code>const</Code> и блоками <Code>{}</Code> обычно проще. Помни
              про ссылки на объекты в async-коде и про то, что тяжёлые данные в
              замыкании продолжают занимать память, пока жива функция.
            </Text>
          </Paper>
        </JsTopicSection>

        <JsTopicInterviewQaSection items={CLOSURES_INTERVIEW_QA} />

        <Divider
          label={<JsTopicGroupTitle icon={IconBulb} label="Дальше" />}
          labelPosition="center"
          styles={{ label: { color: "var(--mantine-color-gray-5)" } }}
        />

        <Text size="sm" c="dimmed" ta="center">
          См. также темы: Event Loop, <Code>this</Code>, промисы и{" "}
          <Code>async/await</Code> в разделе JavaScript.
        </Text>
      </Stack>
    </Container>
  );
}
