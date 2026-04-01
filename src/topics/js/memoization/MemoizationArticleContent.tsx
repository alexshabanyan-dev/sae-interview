import { Alert, Code, List, Table, Text, rem } from "@mantine/core";
import { CodeBlock } from "../../../components/CodeBlock";
import { JsTopicSection } from "../JsTopicDetailLayout";

export function MemoizationArticleContent() {
  return (
    <>
      <JsTopicSection title="1. С чего путаница: два разных вызова функции">
        <Text c="gray.2" lh={1.75}>
          В паттерне мемоизации ты постоянно имеешь дело с <strong>двумя функциями</strong>
          : внешней (фабрикой) и внутренней (той, которую реально вызывают с{" "}
          <Code>(1, 2)</Code>). Путаница с <Code>args</Code> почти всегда из‑за того, что
          эти вызовы **смешивают в один** в голове.
        </Text>
        <CodeBlock>{`function memoize(fn) {
  // ← сюда попадает только (fn), когда пишешь memoize(add)
  return function (...args) {
    // ← сюда попадают (1, 2), когда пишешь memoizedAdd(1, 2)
  };
}

const memoizedAdd = memoize(add); // первый тип вызова
memoizedAdd(1, 2);                // второй тип вызова`}</CodeBlock>
        <Text c="gray.2" lh={1.75} mt="sm">
          Пока выполняется только строка <Code>memoize(add)</Code>, **внутренняя**
          функция **не запускается**. Поэтому любой <Code>args</Code> «из вызова{" "}
          <Code>(1, 2)</Code>» в этот момент **физически не существует** — его ещё никто
          не передал.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="2. Что именно возвращает memoize">
        <Text c="gray.2" lh={1.75}>
          <Code>memoize</Code> — функция <strong>высшего порядка</strong>: принимает
          функцию, возвращает <strong>новую функцию</strong>. Эта новая функция —{" "}
          <strong>не копия</strong> <Code>add</Code> на уровне исходного кода, а{" "}
          <strong>отдельное значение</strong> (объект функции), созданный при выполнении{" "}
          <Code>return function (...args) {"{ ... }"}</Code>.
        </Text>
        <CodeBlock>{`const memoizedAdd = memoize(add);
// memoizedAdd теперь указывает на ВНУТРЕННЮЮ функцию
// add — по-прежнему отдельная функция`}</CodeBlock>
        <Text c="gray.2" lh={1.75} mt="sm">
          Дальше в коде ты вызываешь именно <Code>memoizedAdd(...)</Code>, а не{" "}
          <Code>add(...)</Code> напрямую. Внутри обёртки когда-нибудь вызовется{" "}
          <Code>add</Code> (или не вызовется, если сработал кэш) — но **точка входа** для
          твоих <Code>(1, 2)</Code> — это обёртка.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="3. Как (1, 2) оказываются внутри: механика параметров">
        <Text c="gray.2" lh={1.75}>
          Когда движок выполняет <Code>memoizedAdd(1, 2)</Code>, он ищет, что такое{" "}
          <Code>memoizedAdd</Code>. Это — внутренняя функция, у которой в объявлении стоит{" "}
          <Code>...args</Code> (остаточные параметры, rest).
        </Text>
        <List spacing="sm" c="gray.3" size="sm" mt="sm" type="ordered">
          <List.Item>
            Вызывается функция-обёртка (значение <Code>memoizedAdd</Code>).
          </List.Item>
          <List.Item>
            Ей передали аргументы <Code>1</Code> и <Code>2</Code>.
          </List.Item>
          <List.Item>
            Rest-параметр <Code>...args</Code> **собирает** все позиционные аргументы в
            **один массив**: <Code>args === [1, 2]</Code> (в современных движках без
            «дыр» от пропусков — см. спецификацию для краевых случаев).
          </List.Item>
        </List>
        <Text c="gray.2" lh={1.75} mt="sm">
          То есть связь не «магическая»: это обычное правило JS — **аргументы вызова
          попадают в параметры** той функции, которую ты вызвал. Ты вызвал обёртку →
          параметры обёртки (<Code>args</Code>) и заполнились.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="4. Rest (...) в объявлении vs spread (...) в вызове">
        <Text c="gray.2" lh={1.75} mb="sm">
          Один и тот же символ <Code>...</Code> в **разных местах** означает разное:
        </Text>
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
              <Table.Th>Где</Table.Th>
              <Table.Th>Запись</Table.Th>
              <Table.Th>Смысл</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>В заголовке функции</Table.Td>
              <Table.Td>
                <Code>function f(...args)</Code>
              </Table.Td>
              <Table.Td>
                <strong>Rest</strong> — собрать аргументы в массив <Code>args</Code>
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>При вызове другой функции</Table.Td>
              <Table.Td>
                <Code>fn(...args)</Code>
              </Table.Td>
              <Table.Td>
                <strong>Spread</strong> — развернуть массив в список аргументов
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
        <CodeBlock>{`function wrap(...args) {
  // args = [10, 20]
  return inner(...args); // то же, что inner(10, 20)
}`}</CodeBlock>
        <Text c="gray.2" lh={1.75} mt="sm">
          В мемоизации типичная цепочка: <strong>собрали</strong> аргументы в{" "}
          <Code>args</Code> для ключа и логики, потом <strong>развернули</strong> обратно
          в <Code>fn(...args)</Code>, чтобы оригинал увидел те же позиционные аргументы.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="5. Замыкание: откуда обёртка знает fn и кэш">
        <Text c="gray.2" lh={1.75}>
          Внутренняя функция создаётся **внутри** <Code>memoize</Code> в момент вызова{" "}
          <Code>memoize(add)</Code>. У неё есть доступ к переменным **внешней** области:
          к параметру <Code>fn</Code> и к объекту кэша (например, <Code>Map</Code>),
          объявленному рядом. Это и есть <strong>замыкание</strong>: внутренняя функция
          «несёт с собой» ссылки на эти переменные всё время, пока жива сама обёртка (
          <Code>memoizedAdd</Code>).
        </Text>
        <CodeBlock>{`function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    // видит и fn, и cache — даже когда memoize уже завершился
  };
}`}</CodeBlock>
        <Alert color="blue" variant="light" mt="md">
          <Text size="sm" lh={1.65}>
            Каждый вызов <Code>memoize(x)</Code> для <strong>нового</strong>{" "}
            <Code>x</Code> создаёт **свой** <Code>cache</Code> и **свою** обёртку. Два
            раза вызвал <Code>memoize(add)</Code> — два независимых кэша (если не
            сохранять обёртку в одну переменную).
          </Text>
        </Alert>
      </JsTopicSection>

      <JsTopicSection title="6. Пошаговая трассировка: memoizedAdd(1, 2) два раза">
        <Text c="gray.2" lh={1.75} mb="sm">
          Упрощённая логика (без деталей ключа):
        </Text>
        <List spacing="sm" c="gray.3" size="sm" type="ordered">
          <List.Item>
            <Code>const memoizedAdd = memoize(add)</Code> — выполнился{" "}
            <Code>memoize</Code>, создан <Code>cache</Code>, возвращена внутренняя
            функция; <Code>add</Code> **ещё не** вызывалась.
          </List.Item>
          <List.Item>
            <Code>memoizedAdd(1, 2)</Code> — вход во внутреннюю функцию,{" "}
            <Code>args = [1, 2]</Code>. Ключа нет → вызвать <Code>add(1, 2)</Code>,
            сохранить результат, вернуть его.
          </List.Item>
          <List.Item>
            <Code>memoizedAdd(1, 2)</Code> снова — снова <Code>args = [1, 2]</Code>, ключ
            тот же → <strong>не</strong> вызывать <Code>add</Code>, вернуть значение из{" "}
            <Code>cache</Code>.
          </List.Item>
        </List>
        <Text c="gray.2" lh={1.75} mt="sm">
          Обрати внимание: <Code>args</Code> **заново создаётся** на каждый вызов
          обёртки. Это новый массив, но **содержимое** <Code>[1,2]</Code> совпадает — для
          ключа обычно берут не ссылку на массив, а строковое представление (в учебных
          задачах — <Code>JSON.stringify(args)</Code>).
        </Text>
      </JsTopicSection>

      <JsTopicSection title="7. Почему console.log(args) в теле memoize падает">
        <Text c="gray.2" lh={1.75}>
          В теле <Code>function memoize(fn) {"{ ... }"}</Code> существует только{" "}
          <Code>fn</Code>. Переменная <Code>args</Code> там **не объявлена** — она
          появляется только в заголовке <strong>вложенной</strong> функции. Отсюда{" "}
          <Code>ReferenceError: args is not defined</Code>, если лог поставить не туда.
        </Text>
        <Text c="gray.2" lh={1.75} mt="sm">
          Логировать аргументы нужно **внутри** <Code>return function (...args)</Code>,
          потому что только там движок **связывает** вызов <Code>memoizedAdd(1,2)</Code>{" "}
          с идентификатором <Code>args</Code>.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="8. Сравнение: обычная функция двух параметров">
        <Text c="gray.2" lh={1.75}>
          Запись <Code>function add(a, b)</Code> явно говорит: первый аргумент →{" "}
          <Code>a</Code>, второй → <Code>b</Code>. Запись{" "}
          <Code>function (...args)</Code> говорит: **все** аргументы → один массив. Для
          мемоизации второй вариант удобен, потому что число аргументов у <Code>fn</Code>{" "}
          заранее неизвестно — обёртка универсальна.
        </Text>
        <CodeBlock>{`// эквивалент для ровно двух аргументов (концептуально)
function wrapped(a, b) {
  const args = [a, b];
  // ...
}`}</CodeBlock>
      </JsTopicSection>

      <JsTopicSection title="9. this: если когда-нибудь понадобится">
        <Text c="gray.2" lh={1.75}>
          Если мемоизируемый <Code>fn</Code> — метод и зависит от <Code>this</Code>,
          простой <Code>fn(...args)</Code> может **потерять контекст**. Тогда в обёртке
          используют <Code>fn.apply(this, args)</Code> или заранее биндят. В учебных
          задачах чаще всё — чистые функции без <Code>this</Code>.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="10. Идея ключа кэша">
        <Text c="gray.2" lh={1.75}>
          Кэш — это структура «ключ → результат». Для примитивов иногда хватает
          составной строки <Code>{'`${a}:${b}`'}</Code>. Как только в аргументах появляются
          объекты и массивы, **ссылка на объект** не подходит: два разных объекта{" "}
          <Code>{"{x:1}"}</Code> должны дать один ключ, если по условию они «одинаковые
          по полям». Поэтому часто строят **сериализованное** представление набора
          аргументов (в твоей платформенной задаче — через JSON-совместимые данные).
        </Text>
      </JsTopicSection>

      <JsTopicSection title="11. Когда мемоизация не подходит">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            Функция не **чистая**: меняет внешний мир, шлёт запросы — закэшированный
            ответ может быть неверным или устаревшим.
          </List.Item>
          <List.Item>
            Аргументы **тяжёлые**, ключей бесконечно много — кэш раздувается (нужен LRU
            или лимит).
          </List.Item>
          <List.Item>
            Вычисление **дешевле**, чем сериализация и поиск в Map — мемоизация может
            замедлить.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="12. React: useMemo и useCallback (интуиция)">
        <Text c="gray.2" lh={1.75}>
          <Code>useMemo(() =&gt; expr, deps)</Code> запоминает **результат** вычисления
          между рендерами, если <Code>deps</Code> не изменились.{" "}
          <Code>useCallback(fn, deps)</Code> запоминает **саму функцию**. Это не
          буквальная реализация <Code>memoize</Code> из интервью, но **тот же мотив**:
          не повторять работу и не ломать мемоизацию дочерних компонентов из‑за новых
          ссылок на каждом рендере.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="13. Мини-шпаргалка">
        <CodeBlock>{`memoize(fn)     → один раз: создать cache + вернуть обёртку
обёртка(x, y)   → каждый раз: args = [x,y]; ключ? → fn(...args) или cache`}</CodeBlock>
      </JsTopicSection>
    </>
  );
}
