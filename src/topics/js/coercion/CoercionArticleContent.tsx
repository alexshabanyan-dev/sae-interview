import { Alert, Code, List, Table, Text, rem } from "@mantine/core";
import { CodeBlock } from "../../../components/CodeBlock";
import { JsTopicSection } from "../JsTopicDetailLayout";

export function CoercionArticleContent() {
  return (
    <>
      <JsTopicSection title="1. Зачем на собеседовании спрашивают про приведение типов">
        <Text c="gray.2" lh={1.75}>
          JavaScript — язык со <strong>слабой типизацией</strong> и{" "}
          <strong>динамическими</strong> типами: переменная не «закреплена» за одним
          типом, а операции часто <strong>неявно преобразуют</strong> значения. На
          собеседовании проверяют, понимаешь ли ты, <em>когда</em> срабатывает
          приведение, <em>к чему</em> оно ведёт и почему код вроде{" "}
          <Code>{"[] == false"}</Code> вообще компилируется в «ожидаемый» результат.
        </Text>
        <Text c="gray.2" lh={1.75} mt="sm">
          В проде почти всегда пишут так, чтобы <strong>не полагаться</strong> на неявные
          правила: явные преобразования, <Code>===</Code>, линтеры. Но{" "}
          <strong>знать спецификацию</strong>
          нужно: отладка, код-ревью, легаси и задачи на бумаге.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="2. Какие типы бывают">
        <Text c="gray.2" lh={1.75} mb="sm">
          Есть <strong>семь примитивов</strong> и <strong>объект</strong> (включая
          функции, массивы, даты как подвиды объектов):
        </Text>
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <Code>undefined</Code>, <Code>null</Code>
          </List.Item>
          <List.Item>
            <Code>boolean</Code>, <Code>string</Code>, <Code>symbol</Code>
          </List.Item>
          <List.Item>
            <Code>number</Code> (включая <Code>NaN</Code>, <Code>±Infinity</Code>)
          </List.Item>
          <List.Item>
            <Code>bigint</Code>
          </List.Item>
          <List.Item>
            всё остальное — <strong>object</strong>
          </List.Item>
        </List>
        <Text c="gray.2" lh={1.75} mt="sm">
          <Code>typeof null === &quot;object&quot;</Code> — исторический артефакт; на
          собесах называют «баг языка». Для проверки на <Code>null</Code> используют{" "}
          <Code>x === null</Code>.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="3. Truthy и falsy">
        <Text c="gray.2" lh={1.75} mb="sm">
          В <strong>булевом контексте</strong> (условие <Code>if</Code>,{" "}
          <Code>&amp;&amp;</Code>, <Code>||</Code>, аргумент <Code>Boolean()</Code> и
          т.д.) значение приводится к <Code>true</Code> или <Code>false</Code>. Полный
          список <strong>falsy</strong> (ложных):
        </Text>
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <Code>false</Code>
          </List.Item>
          <List.Item>
            <Code>0</Code>, <Code>-0</Code>, <Code>0n</Code>
          </List.Item>
          <List.Item>
            <Code>&quot;&quot;</Code> (пустая строка)
          </List.Item>
          <List.Item>
            <Code>null</Code>, <Code>undefined</Code>
          </List.Item>
          <List.Item>
            <Code>NaN</Code>
          </List.Item>
        </List>
        <Text c="gray.2" lh={1.75} mt="sm">
          Всё остальное — <strong>truthy</strong>, в том числе <Code>[]</Code>,{" "}
          <Code>{}</Code>, <Code>&quot;0&quot;</Code>, строка <Code>&quot;false&quot;</Code>
          .
        </Text>
      </JsTopicSection>

      <JsTopicSection title="4. Строгое равенство === и !==">
        <Text c="gray.2" lh={1.75}>
          <strong>Strict Equality Comparison</strong>: если типы разные — сразу{" "}
          <Code>false</Code> (для <Code>===</Code>). Исключений по приведению нет. Для
          чисел <Code>NaN</Code> не равен ничему, даже себе. Для чисел{" "}
          <Code>+0</Code> и <Code>-0</Code> считаются равными при <Code>===</Code>.
        </Text>
        <CodeBlock>{`null === undefined  // false
0 === -0              // true
NaN === NaN           // false`}</CodeBlock>
        <Alert color="gray" variant="light" mt="md">
          <Text size="sm" lh={1.65}>
            В коде по умолчанию используют <Code>===</Code> — меньше сюрпризов.
          </Text>
        </Alert>
      </JsTopicSection>

      <JsTopicSection title="5. Нестрогое равенство == и !=">
        <Text c="gray.2" lh={1.75}>
          <strong>Abstract Equality Comparison</strong> разрешает{" "}
          <strong>приведение</strong> типов.
          Алгоритм в спецификации длинный; на собесе достаточно помнить идеи:
        </Text>
        <List spacing="sm" c="gray.3" size="sm" mt="sm">
          <List.Item>
            <Code>null == undefined</Code> — <Code>true</Code>, при этом ни то ни другое
            не равно ни к чему другому через <Code>==</Code> в том же духе (кроме этой
            пары).
          </List.Item>
          <List.Item>
            Если один операнд число, другой строка — строка часто приводится к числу.
          </List.Item>
          <List.Item>
            <Code>boolean</Code> приводится к числу (<Code>true</Code> →{" "}
            <Code>1</Code>, <Code>false</Code> → <Code>0</Code>) перед сравнением с
            не-булевым.
          </List.Item>
          <List.Item>
            Объекты приводятся к примитивам через <strong>ToPrimitive</strong> (см.
            ниже).
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="6. Object.is: почти ===, но с нюансами">
        <Text c="gray.2" lh={1.75}>
          <Code>Object.is(a, b)</Code> в большинстве случаев совпадает с{" "}
          <Code>===</Code>, но: <strong>два NaN считаются равными</strong>, а{" "}
          <Code>+0</Code> и <Code>-0</Code> — <strong>разными</strong>.
        </Text>
        <CodeBlock>{`Object.is(NaN, NaN)   // true
Object.is(0, -0)       // false`}</CodeBlock>
      </JsTopicSection>

      <JsTopicSection title="7. ToPrimitive: объект → примитив">
        <Text c="gray.2" lh={1.75}>
          Когда в операции нужен примитив (например, <Code>+</Code> с объектом), движок
          вызывает внутренний метод <strong>ToPrimitive</strong> с подсказкой{" "}
          <Code>string</Code> или <Code>number</Code> (или <Code>default</Code>). У
          обычного объекта порядок: <Code>valueOf</Code>, затем <Code>toString</Code>,
          пока не получится примитив. У <Code>Date</Code> чаще наоборот — сначала строка
          (для человекочитаемого вида).
        </Text>
        <Text c="gray.2" lh={1.75} mt="sm">
          Пустой массив <Code>[]</Code> при <Code>ToString</Code> даёт пустую строку{" "}
          <Code>&quot;&quot;</Code>; массив с одним числом <Code>[1]</Code> — строку{" "}
          <Code>&quot;1&quot;</Code>. Отсюда классические головоломки с <Code>[] + []</Code>
          .
        </Text>
      </JsTopicSection>

      <JsTopicSection title="8. Оператор + : сложение и конкатенация">
        <Text c="gray.2" lh={1.75}>
          Если хотя бы один операнд — <strong>строка</strong> (после приведения), чаще
          получается <strong>конкатенация</strong>. Если оба к числу — <strong>сложение</strong>
          . Смешение типов даёт сюрпризы: <Code>&apos;5&apos; + 2</Code> →{" "}
          <Code>&quot;52&quot;</Code>, а <Code>&apos;5&apos; - 2</Code> → <Code>3</Code> (
          минус всегда тянет к числу).
        </Text>
      </JsTopicSection>

      <JsTopicSection title="9. Операторы - * / % и унарный +">
        <Text c="gray.2" lh={1.75}>
          Арифметика (кроме особых случаев с <Code>+</Code>) приводит операнды к{" "}
          <strong>числу</strong>. Унарный <Code>+x</Code> — то же, что{" "}
          <Code>Number(x)</Code> (с нюансами для BigInt в современных правилах — не
          смешивай <Code>bigint</Code> с обычным числом без явного преобразования).
        </Text>
      </JsTopicSection>

      <JsTopicSection title="10. Сравнения &lt;, &gt;, &lt;=, &gt;=">
        <Text c="gray.2" lh={1.75}>
          Если оба операнда — <strong>строки</strong>, сравнение <strong>лексикографическое</strong> (
          посимвольно по кодам Unicode). Если хотя бы одно — число, оба часто приводятся
          к числу. Отсюда: <Code>&apos;11&apos; &lt; &apos;2&apos;</Code> как строки —{" "}
          <Code>true</Code> (<Code>&apos;1&apos;</Code> раньше <Code>&apos;2&apos;</Code>),
          а <Code>&apos;11&apos; &lt; 2</Code> — числовое сравнение.
        </Text>
        <Text c="gray.2" lh={1.75} mt="sm">
          Цепочки вроде <Code>1 &lt; 2 &lt; 3</Code> вычисляются слева направо: сначала{" "}
          <Code>1 &lt; 2</Code> → <Code>true</Code>, потом <Code>true &lt; 3</Code> →{" "}
          <Code>1 &lt; 3</Code> → <Code>true</Code>. А <Code>3 &gt; 2 &gt; 1</Code> даёт{" "}
          <Code>false</Code>, потому что <Code>true &gt; 1</Code> → <Code>1 &gt; 1</Code>.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="11. Number(), parseInt, parseFloat">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <Code>Number(x)</Code> — жёсткое преобразование: нечитаемая строка →{" "}
            <Code>NaN</Code>; пустая/пробельная строка часто → <Code>0</Code>.
          </List.Item>
          <List.Item>
            <Code>parseInt(str, radix)</Code> — парсит <strong>целое</strong>;{" "}
            <strong>всегда указывай radix 10</strong> в проде, если не парсишь hex/binary
            осознанно.
          </List.Item>
          <List.Item>
            <Code>parseFloat(str)</Code> — дробная часть; ведущие пробелы допустимы.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="12. NaN">
        <Text c="gray.2" lh={1.75}>
          <Code>NaN</Code> означает «не число» как <strong>результат ошибки числовой
          операции</strong>. Самое неприятное: <Code>NaN === NaN</Code> —{" "}
          <Code>false</Code>. Проверка: <Code>Number.isNaN(x)</Code> — надёжнее, чем
          глобальный <Code>isNaN(x)</Code>, потому что последний{" "}
          <strong>сначала приводит</strong> <Code>x</Code> к числу.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="13. null и undefined в операциях">
        <Text c="gray.2" lh={1.75}>
          <Code>Number(null)</Code> — <Code>0</Code>; <Code>Number(undefined)</Code> —{" "}
          <Code>NaN</Code>. Отсюда <Code>null + 1</Code> → <Code>1</Code>, а{" "}
          <Code>undefined + 1</Code> → <Code>NaN</Code>. В <Code>==</Code> пара{" "}
          <Code>null</Code>/<Code>undefined</Code> согласована; в <Code>===</Code> они
          различны.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="14. Boolean() и !!">
        <Text c="gray.2" lh={1.75}>
          Явное приведение: <Code>Boolean(x)</Code>. Идиома <Code>!!x</Code> — два
          логических отрицания: получить обычный примитив <Code>true</Code>/<Code>false</Code>
          . Удобно для флагов из любых значений.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="15. String() и шаблонные строки">
        <Text c="gray.2" lh={1.75}>
          <Code>String(x)</Code> вызывает внутренний <Code>ToString</Code>. Шаблонные
          литералы <Code>{'`${expr}`'}</Code> подставляют выражения и всегда дают строку.
          Символ <Code>Symbol</Code> нельзя неявно склеить с строкой через{" "}
          <Code>+</Code> — будет <strong>TypeError</strong>; <Code>String(sym)</Code> —
          разрешено.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="16. BigInt и Symbol (кратко)">
        <Text c="gray.2" lh={1.75}>
          <Code>bigint</Code> нельзя смешивать с <Code>number</Code> в <Code>+ - * /</Code>{" "}
          без явного преобразования. <Code>==</Code> между <Code>bigint</Code> и{" "}
          <Code>number</Code> сравнивает математические значения с осторожностью.{" "}
          <Code>Symbol</Code> уникален; приведение к числу невозможно.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="17. Сравнение объектов">
        <Text c="gray.2" lh={1.75}>
          Два разных объекта <Code>{}</Code> <strong>никогда</strong> не равны через{" "}
          <Code>==</Code>/<Code>===</Code>, даже с одинаковым содержимым: сравниваются{" "}
          <strong>ссылки</strong>. Глубокое
          равенство делают вручную, через библиотеку или <Code>JSON.stringify</Code> (с
          оговорками).
        </Text>
      </JsTopicSection>

      <JsTopicSection title="18. Плавающая точка">
        <Text c="gray.2" lh={1.75}>
          <Code>0.1 + 0.2 === 0.3</Code> — <Code>false</Code> из-за двоичного представления.
          Для денег — целые центы или Decimal; для сравнения — допуск или округление.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="19. Стиль в реальном коде">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            По умолчанию <Code>===</Code> и <Code>!==</Code>.
          </List.Item>
          <List.Item>
            Явные преобразования: <Code>Number(x)</Code>, <Code>String(x)</Code>,{" "}
            <Code>Boolean(x)</Code>.
          </List.Item>
          <List.Item>
            Для «пустоты» проверяй осознанно: <Code>x == null</Code> ловит и{" "}
            <Code>null</Code>, и <Code>undefined</Code> одним выражением — приём допустим,
            если команде понятен.
          </List.Item>
          <List.Item>
            Линтер ESLint с <Code>eqeqeq</Code> запрещает <Code>==</Code>.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="20. Связь с другими темами в этом проекте">
        <Text c="gray.2" lh={1.75}>
          Порядок вычислений и задачи «что выведет» часто пересекаются с{" "}
          <strong>Event Loop</strong> и <strong>промисами</strong> — но сами правила{" "}
          <Code>==</Code> и приведения описаны здесь. Тема <Code>this</Code> — отдельно:
          приведение не меняет правила привязки контекста.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="21. Шпаргалка перед интервью">
        <Table
          striped
          withTableBorder
          styles={{
            th: { color: "var(--mantine-color-gray-4)" },
            td: { color: "var(--mantine-color-gray-3)", fontSize: rem(13) },
          }}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Тема</Table.Th>
              <Table.Th>Запомнить</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>Falsy</Table.Td>
              <Table.Td>7 значений: false, 0, -0, 0n, &quot;&quot;, null, undefined, NaN</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>===</Table.Td>
              <Table.Td>Без приведения типов; NaN ≠ NaN; 0 === -0</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Object.is</Table.Td>
              <Table.Td>NaN равен NaN; 0 и -0 различимы</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>==</Table.Td>
              <Table.Td>null == undefined; иначе часто приведение</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>+</Table.Td>
              <Table.Td>Строка тянет конкатенацию; иначе числа</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Number.isNaN</Table.Td>
              <Table.Td>Без приведения аргумента</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </JsTopicSection>
    </>
  );
}
