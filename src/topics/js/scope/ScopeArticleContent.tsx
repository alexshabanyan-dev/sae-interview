import { Alert, Anchor, Code, List, Table, Text, rem } from "@mantine/core";
import { Link } from "react-router-dom";
import { CodeBlock } from "../../../components/CodeBlock";
import { JsTopicSection } from "../JsTopicDetailLayout";

export function ScopeArticleContent() {
  return (
    <>
      <JsTopicSection title="1. Что такое область видимости (scope)">
        <Text c="gray.2" lh={1.75}>
          <strong>Область видимости</strong> — это правило языка: <em>где в коде можно
          использовать имя</em> переменной, функции, класса или параметра, не получив{" "}
          <Code>ReferenceError</Code>. В JS области <strong>вложены</strong> друг в друга;
          внутри области можно «видеть» имена извне (если нет затенения), а снаружи —
          обычно не видеть локальные имена изнутри.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="2. Какие виды областей есть">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <strong>Глобальная</strong> — верхний уровень скрипта (в браузере объект
            глобали связан с <Code>window</Code> в нестрогом режиме; в модулях глобаль
            отделён).
          </List.Item>
          <List.Item>
            <strong>Функциональная</strong> — тело функции (классический контейнер для{" "}
            <Code>var</Code> и параметров).
          </List.Item>
          <List.Item>
            <strong>Блочная</strong> — пара <Code>{"{ }"}</Code>, тело{" "}
            <Code>if</Code>/<Code>for</Code>/<Code>while</Code>/<Code>try</Code> и т.д. для{" "}
            <Code>let</Code>, <Code>const</Code>, <Code>class</Code>.
          </List.Item>
          <List.Item>
            <strong>Модульная</strong> — каждый файл ES-модуля — своя верхнеуровневая
            область.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="3. var: функциональная область и всплытие">
        <Text c="gray.2" lh={1.75}>
          <Code>var</Code> привязывается к <strong>ближайшей функции</strong> (или
          глобальному скрипту), а не к блоку <Code>if</Code>/<Code>for</Code>. Поэтому
          переменная «протекает» из блока наружу — частая ловушка.
        </Text>
        <Text c="gray.2" lh={1.75} mt="sm">
          Объявления <Code>var</Code> <strong>поднимаются</strong> (hoisting): в начале
          области имя уже есть, значение до строки присваивания —{" "}
          <Code>undefined</Code>.
        </Text>
        <CodeBlock>{`console.log(v); // undefined
var v = 1;`}</CodeBlock>
      </JsTopicSection>

      <JsTopicSection title="4. let и const: блочная область">
        <Text c="gray.2" lh={1.75}>
          <Code>let</Code> и <Code>const</Code> живут от открывающей{" "}
          <Code>{"{"}</Code> до закрывающей для того же блока. За пределами блока имя
          не существует.
        </Text>
        <Text c="gray.2" lh={1.75} mt="sm">
          <Code>const</Code> требует <strong>инициализации</strong> в той же строке;
          нельзя объявить без значения. Переприсвоить саму привязку нельзя; <strong>мутация
          объекта</strong> — можно.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="5. Temporal Dead Zone (TDZ)">
        <Text c="gray.2" lh={1.75}>
          С момента входа в блок, где объявлены <Code>let</Code>/<Code>const</Code>/
          <Code>class</Code>, и до выполнения строки объявления имя <strong>уже
          зарезервировано</strong>, но обращение к нему даёт{" "}
          <Code>ReferenceError</Code> — это <strong>временная мёртвая зона</strong>.
        </Text>
        <CodeBlock>{`{
  console.log(x); // ReferenceError
  let x = 1;
}`}</CodeBlock>
        <Text c="gray.2" lh={1.75} mt="sm">
          Для сравнения: необъявленное имя в <Code>typeof und</Code> даёт строку{" "}
          <Code>undefined</Code> без ошибки, а для переменной в TDZ даже{" "}
          <Code>typeof x</Code> упадёт.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="6. Затенение (shadowing)">
        <Text c="gray.2" lh={1.75}>
          Во внутренней области объявляют то же имя, что снаружи: внутри видна{" "}
          <strong>внутренняя</strong> привязка. Пока внутренняя <Code>let</Code> в TDZ,
          внешнее значение по этому имени <strong>недоступно</strong> — не «падает» на
          внешний уровень.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="7. Hoisting у function declaration и expression">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <Code>function f() {"{}"}</Code> — объявление: имя поднимается вместе с телом;
            вызов выше строки объявления в той же области работает.
          </List.Item>
          <List.Item>
            <Code>var g = function () {"{}"};</Code> — выражение: поднимается только{" "}
            <Code>var g</Code> как <Code>undefined</Code>; вызов до присваивания — ошибка.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="8. Параметры функции и область по умолчанию">
        <Text c="gray.2" lh={1.75}>
          Параметры — отдельная «периферия» области функции. Значения по умолчанию
          вычисляются в заголовке: поздние параметры могут ссылаться на ранние; ссылка на
          ещё не инициализированный параметр — <Code>ReferenceError</Code> (см. задачи).
        </Text>
      </JsTopicSection>

      <JsTopicSection title="9. Циклы for: var против let">
        <Text c="gray.2" lh={1.75}>
          <Code>for (var i = 0; ...)</Code> создаёт <strong>одну</strong> переменную{" "}
          <Code>i</Code> на всю функцию; асинхронные колбэки часто видят финальное
          значение. <Code>for (let i = 0; ...)</Code> в классической трёхчастной форме
          даёт <strong>новую</strong> привязку на каждой итерации — ожидаемое поведение с{" "}
          <Code>setTimeout</Code> и промисами.
        </Text>
        <Text c="gray.2" lh={1.75} mt="sm">
          <Code>for (const v of arr)</Code> — на каждой итерации новая привязка{" "}
          <Code>const v</Code> на текущий элемент.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="10. switch и let">
        <Text c="gray.2" lh={1.75}>
          Весь <Code>switch</Code> для целей <Code>let</Code>/<Code>const</Code> нередко
          трактуется как <strong>один</strong> блочный контекст: нельзя объявить два раза
          одно имя в разных <Code>case</Code> без вложенных <Code>{"{ }"}</Code>; нельзя
          прочитать <Code>let</Code> снаружи <Code>switch</Code>.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="11. try / catch">
        <Text c="gray.2" lh={1.75}>
          У <Code>catch (e)</Code> параметр <Code>e</Code> живёт только в блоке{" "}
          <Code>catch</Code>. Нельзя повторно объявить <Code>let e</Code> в том же блоке —
          синтаксическая ошибка.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="12. class и TDZ">
        <Text c="gray.2" lh={1.75}>
          Имя класса после <Code>class</Code> ведёт себя как <Code>let</Code>: до объявления
          класс нельзя использовать в том же потоке (например, <Code>new MyClass()</Code> выше
          объявления — <Code>ReferenceError</Code>). Тонкости наследования и порядка
          инициализации — отдельная тема.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="13. Строгий режим и модули">
        <Text c="gray.2" lh={1.75}>
          В <Code>&quot;use strict&quot;</Code> и в ES-модулях присваивание необъявленной
          переменной — ошибка; блочные <Code>function</Code>-объявления ведут себя
          предсказуемее. В модулях <Code>var</Code> на верхнем уровне не вешается на{" "}
          <Code>window</Code>.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="14. eval и with">
        <Text c="gray.2" lh={1.75}>
          <Code>eval</Code> и <Code>with</Code> ломают оптимизации и могут мутировать
          текущую область — в современном коде избегают. На собесе достаточно: «не
          используют».
        </Text>
      </JsTopicSection>

      <JsTopicSection title="15. Связь с замыканиями">
        <Text c="gray.2" lh={1.75}>
          Замыкание возникает, когда функция <strong>запоминает</strong> окружение, в
          котором была создана. Область видимости задаёт <strong>кто кому доступен</strong>
          ; замыкание — <strong>как долго живает эта связь</strong>. Подробнее — в статье{" "}
          <Anchor component={Link} to="/topics/js/closures" c="cyan.3" fw={500}>
            «Замыкания»
          </Anchor>
          .
        </Text>
      </JsTopicSection>

      <JsTopicSection title="16. Стиль в проде">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            Приоритет: <Code>const</Code>, затем <Code>let</Code>, избегать{" "}
            <Code>var</Code>.
          </List.Item>
          <List.Item>
            Короткие функции, явные блоки, не полагаться на подъём «для красоты».
          </List.Item>
          <List.Item>
            Для пустой проверки иногда используют <Code>x == null</Code> (ловит и{" "}
            <Code>null</Code>, и <Code>undefined</Code>) — осознанный приём с командным
            соглашением.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="17. Мини-шпаргалка">
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
              <Table.Th>Конструкция</Table.Th>
              <Table.Th>var</Table.Th>
              <Table.Th>let / const / class</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>Блок if/for</Table.Td>
              <Table.Td>Выползает наружу области функции</Table.Td>
              <Table.Td>Остаётся в блоке</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>До объявления читать</Table.Td>
              <Table.Td>undefined (var)</Table.Td>
              <Table.Td>TDZ → ReferenceError</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Повторное объявление в одной области</Table.Td>
              <Table.Td>Допустимо (плохо)</Table.Td>
              <Table.Td>SyntaxError</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
        <Alert color="gray" variant="light" mt="md">
          <Text size="sm" lh={1.65}>
            Ниже в приложении — блок <strong>задач</strong>: разбери их без IDE, затем
            проверь в консоли.
          </Text>
        </Alert>
      </JsTopicSection>
    </>
  );
}
