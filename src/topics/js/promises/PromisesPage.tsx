import {
  Alert,
  Code,
  List,
  Stack,
  Table,
  Text,
  rem,
} from "@mantine/core";
import { CodeBlock } from "../../../components/CodeBlock";
import {
  JsTopicDetailLayout,
  JsTopicSection,
} from "../JsTopicDetailLayout";
import { PROMISES_INTERVIEW_QA } from "./promisesInterviewQa";
import { PROMISES_TASKS } from "./promisesTasks";

export function PromisesPage() {
  return (
    <JsTopicDetailLayout
      title="Промисы и async/await"
      subtitle="Подробная теория: состояния, executor, цепочки then/catch/finally, статические методы, async/await как сахар, микрозадачи и частые ловушки. Ниже — задачи на закрепление."
      tasks={PROMISES_TASKS}
      interviewQuestions={PROMISES_INTERVIEW_QA}
    >
      <JsTopicSection title="1. Зачем нужны промисы">
        <Text c="gray.2" lh={1.75}>
          Промис — это <strong>объект-обещание</strong> будущего результата
          асинхронной операции. Вместо колбэков в глубину («callback hell») мы
          получаем единый объект, к которому можно подписаться через{" "}
          <Code>then</Code> / <Code>catch</Code> и <strong>компоновать</strong>{" "}
          шаги цепочкой. Это стандартная модель в JS и основа для{" "}
          <Code>async</Code>/<Code>await</Code>.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="2. Три состояния и «один раз навсегда»">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <strong>Pending</strong> — операция ещё не завершена; результат
            неизвестен.
          </List.Item>
          <List.Item>
            <strong>Fulfilled</strong> — успех; у промиса есть значение (
            <Code>value</Code>).
          </List.Item>
          <List.Item>
            <strong>Rejected</strong> — ошибка или отказ; есть причина (
            <Code>reason</Code>), обычно <Code>Error</Code> или строка.
          </List.Item>
        </List>
        <Text c="gray.2" lh={1.75} mt="sm">
          После перехода из <Code>pending</Code> в <Code>fulfilled</Code> или{" "}
          <Code>rejected</Code> состояние <strong>больше не меняется</strong>.
          Повторные вызовы <Code>resolve</Code>/<Code>reject</Code> в executor
          игнорируются — срабатывает только первый settled-переход.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="3. Создание: new Promise и синхронный executor">
        <Text c="gray.2" lh={1.75}>
          Конструктор <Code>new Promise((resolve, reject) =&gt; …)</Code> вызывает
          функцию-executor <strong>сразу и синхронно</strong> (до того, как дойдёт
          код после <Code>new Promise</Code>). Внутри executor ты
          запускаешь асинхронщину и по готовности вызываешь{" "}
          <Code>resolve(значение)</Code> или <Code>reject(причина)</Code>.
        </Text>
        <CodeBlock>{`const p = new Promise((resolve, reject) => {
  // этот код выполняется СЕЙЧАС, синхронно
  setTimeout(() => resolve(42), 100);
});
console.log("после new Promise"); // выполнится до resolve(42)`}</CodeBlock>
        <Alert color="red" variant="light" title="Синхронная ошибка в executor">
          Если в теле executor вылетает исключение (не пойманное{" "}
          <Code>try/catch</Code>), промис сразу становится{" "}
          <Code>rejected</Code> с этой ошибкой как <Code>reason</Code>. Не
          обязательно вызывать <Code>reject</Code> вручную.
        </Alert>
      </JsTopicSection>

      <JsTopicSection title="4. Promise.resolve и Promise.reject">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <Code>Promise.resolve(x)</Code> — если <Code>x</Code> уже промис,
            возвращается тот же промис (в терминах спеки: разрешение
            «подхватывает» thenable). Если <Code>x</Code> — обычное значение,
            получается уже <Code>fulfilled</Code> с этим значением.
          </List.Item>
          <List.Item>
            <Code>Promise.reject(r)</Code> — сразу отклонённый промис с причиной{" "}
            <Code>r</Code> (без «распаковки» вложенного промиса: отклонение
            остаётся отклонением).
          </List.Item>
        </List>
        <Text c="gray.2" lh={1.75} mt="sm">
          Важный нюанс: если в <Code>resolve</Code> передать <em>другой</em>{" "}
          промис, внешний промис «подождёт» его и примет его итоговое состояние
          (flattening). Это лежит в основе цепочек <Code>then</Code>.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="5. Цепочка then: всегда новый промис">
        <Text c="gray.2" lh={1.75}>
          <Code>p.then(onFulfilled, onRejected)</Code>{" "}
          <strong>не мутирует</strong> <Code>p</Code> — возвращается{" "}
          <strong>новый</strong> промис <Code>p2</Code>. Его результат
          определяется тем, что вернул (или бросил) обработчик.
        </Text>
        <List spacing="sm" c="gray.3" size="sm" mt="sm">
          <List.Item>
            Если обработчик вернул <strong>обычное значение</strong>,{" "}
            <Code>p2</Code> становится fulfilled с этим значением.
          </List.Item>
          <List.Item>
            Если вернул <strong>промис или thenable</strong>, <Code>p2</Code>{" "}
            «подождёт» его и примет итог (снова flattening).
          </List.Item>
          <List.Item>
            Если обработчик <Code>throw</Code> или вернул rejected-промис,{" "}
            <Code>p2</Code> отклоняется — дальше сработает ближайший{" "}
            <Code>catch</Code>.
          </List.Item>
          <List.Item>
            Если для текущего состояния обработчик <strong>не передан</strong>{" "}
            (например, только <Code>onFulfilled</Code>, а промис rejected),
            результат и причина <strong>пробрасываются</strong> в следующий
            звено как есть.
          </List.Item>
        </List>
        <CodeBlock>{`Promise.resolve(1)
  .then((x) => x * 2)
  .then((x) => {
    if (x > 2) throw "big";
    return x;
  })
  .catch((e) => 0)
  .then(console.log);`}</CodeBlock>
      </JsTopicSection>

      <JsTopicSection title="6. catch и finally">
        <Text c="gray.2" lh={1.75}>
          <Code>catch(onRejected)</Code> — сахар для{" "}
          <Code>then(undefined, onRejected)</Code>: ловит отклонения с
          предыдущих шагов. <Code>finally(onFinally)</Code> вызывается при
          любом исходе (и при успехе, и при ошибке), похоже на{" "}
          <Code>try/finally</Code> в синхронном коде.
        </Text>
        <List spacing="sm" c="gray.3" size="sm" mt="sm">
          <List.Item>
            <Code>finally</Code> <strong>не поглощает</strong> результат: если{" "}
            <Code>onFinally</Code> ничего не бросает, дальше по цепочке идёт
            прежнее значение или причина отклонения (кроме случая, когда{" "}
            <Code>finally</Code> сам возвращает промис — тогда его исход может
            подменить результат; при <Code>return</Code> из pending-промиса
            цепочка ждёт его).
          </List.Item>
          <List.Item>
            Ошибка внутри <Code>finally</Code> (или отклонённый возвращённый
            промис) переводит цепочку в <Code>rejected</Code>.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="7. Микрозадачи и порядок с Event Loop">
        <Text c="gray.2" lh={1.75}>
          Колбэки <Code>then</Code>, <Code>catch</Code>, <Code>finally</Code>{" "}
          попадают в <strong>очередь микрозадач</strong>. После текущего
          синхронного кода движок опустошает микроочередь (часто несколько
          проходов подряд), и только потом берёт одну макрозадачу (
          <Code>setTimeout</Code>, I/O и т.д.). Поэтому{" "}
          <Code>Promise.resolve().then(...)</Code> почти всегда выполнится раньше{" "}
          <Code>setTimeout(..., 0)</Code>. Подробнее — в разделе про Event Loop в
          этом же приложении.
        </Text>
        <CodeBlock>{`async function f() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
}
console.log("C");
f();
console.log("D");
// C, A, D, B — продолжение после await = микрозадача`}</CodeBlock>
      </JsTopicSection>

      <JsTopicSection title="8. Статические комбинаторы">
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
              <Table.Th>API</Table.Th>
              <Table.Th>Поведение</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>
                <Code>Promise.all(iterable)</Code>
              </Table.Td>
              <Table.Td>
                Все элементы должны стать fulfilled — тогда массив значений в
                том же порядке. Любой reject сразу даёт reject всего{" "}
                <Code>all</Code> (остальные всё равно «догоняют», но результат
                уже отклонён). Пустой iterable → сразу fulfilled{" "}
                <Code>[]</Code>.
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <Code>Promise.allSettled(iterable)</Code>
              </Table.Td>
              <Table.Td>
                Ждёт завершения каждого: для каждого элемента объект{" "}
                <Code>{"{ status, value | reason }"}</Code>. Никогда не
                отклоняется из-за одного упавшего элемента.
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <Code>Promise.race(iterable)</Code>
              </Table.Td>
              <Table.Td>
                Первый settled (fulfilled или rejected) задаёт исход. Пустой
                iterable → промис навсегда в pending (типичная ловушка на
                собесах).
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <Code>Promise.any(iterable)</Code>
              </Table.Td>
              <Table.Td>
                Первый fulfilled побеждает. Если все отклонились —{" "}
                <Code>AggregateError</Code> со списком причин. (Требует поддержки
                движка.)
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
        <Text c="gray.2" lh={1.75} mt="sm">
          Для «первого успешного из нескольких запросов с таймаутом» часто
          комбинируют <Code>race</Code> с таймером-промисом или используют{" "}
          <Code>AbortController</Code> — промисы сами по себе не отменяют сетевой
          запрос, это отдельная тема.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="9. async/await как синтаксический сахар">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            Функция с <Code>async</Code> <strong>всегда</strong> возвращает
            промис. Явный <Code>return x</Code> оборачивается в fulfilled;{" "}
            <Code>throw</Code> — в rejected.
          </List.Item>
          <List.Item>
            <Code>await expr</Code> приостанавливает выполнение только{" "}
            <strong>текущей</strong> async-функции: остальной JS и другие задачи
            продолжают работать. Внутри спеки это похоже на «разрезание»
            функции на части, продолжение планируется как микрозадача.
          </List.Item>
          <List.Item>
            <Code>await</Code> для не-промиса по сути оборачивает значение в
            resolved-промис (как <Code>Promise.resolve</Code>).
          </List.Item>
          <List.Item>
            Отклонённый промис после <Code>await</Code> превращается в
            исключение — его ловит <Code>try/catch</Code> в той же async-функции.
          </List.Item>
        </List>
        <Alert color="blue" variant="light" title="return await">
          <Code>return await p</Code> внутри <Code>try/catch</Code> иногда
          нужен, чтобы поймать отклонение <Code>p</Code> в этом же{" "}
          <Code>try</Code>. Вне <Code>try/catch</Code> часто пишут просто{" "}
          <Code>return p</Code> — семантика для вызывающего почти та же, но
          стек/trace может отличаться; на собесах спрашивают оба варианта.
        </Alert>
      </JsTopicSection>

      <JsTopicSection title="10. Частые ошибки">
        <Stack gap="md">
          <Alert color="orange" variant="light" title="Забытый return в then">
            Внутри <Code>then</Code> вызов <Code>p.then(...)</Code> без{" "}
            <Code>return</Code> создаёт «висячий» промис: внешняя цепочка не ждёт
            его. Нужно <Code>return p;</Code> или <Code>return p.then(...);</Code>
            .
          </Alert>
          <Alert color="yellow" variant="light" title="Unhandled rejection">
            Если промис отклонён и нет <Code>catch</Code>, в браузере/Node
            сработает событие <Code>unhandledrejection</Code>. В продакшене это
            логируют и мониторят.
          </Alert>
          <Alert color="grape" variant="light" title="Антипаттерн Promise constructor">
            Оборачивать уже существующий промис в{" "}
            <Code>new Promise((res) =&gt; res(otherPromise))</Code> обычно не
            нужно — достаточно вернуть <Code>otherPromise</Code>. Конструктор
            полезен для API без промисов (колбэки, события).
          </Alert>
        </Stack>
      </JsTopicSection>
    </JsTopicDetailLayout>
  );
}
