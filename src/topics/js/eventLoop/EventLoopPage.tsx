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
import { EVENT_LOOP_INTERVIEW_QA } from "./eventLoopInterviewQa";
import { EVENT_LOOP_TASKS } from "./eventLoopTasks";

export function EventLoopPage() {
  return (
    <JsTopicDetailLayout
      title="Event Loop и очереди задач"
      subtitle="Подробная теория: стек вызовов, микро- и макрозадачи, промисы, async/await, рендер в браузере, отличия Node.js, ловушки и шпаргалка. Ниже — задачи."
      tasks={EVENT_LOOP_TASKS}
      interviewQuestions={EVENT_LOOP_INTERVIEW_QA}
    >
      <JsTopicSection title="1. Зачем это знать">
        <Text c="gray.2" lh={1.75}>
          На собеседованиях постоянно дают фрагменты с <Code>Promise</Code>,{" "}
          <Code>setTimeout</Code>, <Code>async/await</Code> и{" "}
          <Code>console.log</Code> и просят назвать{" "}
          <strong>порядок вывода</strong>. Без модели очередей это угадывание; с
          моделью — последовательное применение правил. Та же логика объясняет
          «почему UI не обновился сразу», «почему бесконечный then блокирует
          страницу» и как вести себя в Node при I/O.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="2. Движок, рантайм и однопоточность">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <strong>Движок</strong> (V8 и др.) парсит и выполняет JS, держит{" "}
            <strong>стек вызовов</strong> и кучу. Сам по себе он не знает про
            таймеры и DOM.
          </List.Item>
          <List.Item>
            <strong>Рантайм</strong> (браузер, Node) даёт Web API / libuv,
            таймеры, сеть, очереди задач и вызывает JS, когда пришло время.
          </List.Item>
          <List.Item>
            Исполнение JS в одном потоке для страницы:{" "}
            <strong>пока стек занят синхронным кодом</strong>, рантайм не может
            обработать очереди и отрисовку (упрощённо для главного потока
            браузера).
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="3. Стек вызовов">
        <Text c="gray.2" lh={1.75}>
          Любая синхронная функция кладёт кадр на стек; при возврате кадр
          снимается. Пока выполняется текущий синхронный блок,{" "}
          <strong>очереди не обрабатываются</strong> — они ждут, пока стек
          опустеет (в типичной модели для колбэков из очередей). Поэтому тяжёлый
          цикл на главном потоке браузера подвисает интерфейс.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="4. Микрозадачи (microtask queue)">
        <Text c="gray.2" lh={1.75} mb="sm">
          Сюда попадают, в частности, колбэки <Code>Promise.then</Code>,{" "}
          <Code>catch</Code>, <Code>finally</Code>, а также явный{" "}
          <Code>queueMicrotask(fn)</Code>. В браузере к микрозадачам относят и
          некоторые другие механизмы (например, часть сценариев с{" "}
          <Code>MutationObserver</Code>).
        </Text>
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            После <strong>завершения текущего синхронного кода</strong> (и когда
            стек снова свободен для обработки очередей) рантайм{" "}
            <strong>опустошает очередь микрозадач</strong>: выполняет задачи по
            порядку, пока очередь не станет пустой <strong>или</strong> пока не
            закончится лимит вложенности (защита от бесконечной рекурсии в
            реализациях).
          </List.Item>
          <List.Item>
            Если микрозадача снова ставит микрозадачу, она попадёт в{" "}
            <strong>конец</strong> той же очереди и будет выполнена{" "}
            <strong>в этом же проходе</strong> до перехода к макрозадаче.
          </List.Item>
          <List.Item>
            Отсюда классика: все <Code>then</Code> подряд могут выполниться{" "}
            <strong>раньше</strong> одного <Code>setTimeout(..., 0)</Code>.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="5. Макрозадачи (macrotask / task queue)">
        <Text c="gray.2" lh={1.75} mb="sm">
          Сюда относят колбэки <Code>setTimeout</Code>/<Code>setInterval</Code>{" "}
          (после истечения таймера), обработчики многих DOM-событий, загрузка
          скриптов и т.п. В <strong>упрощённой</strong> модели браузера за один
          «ход» цикла после микрозадач берётся <strong>одна</strong>{" "}
          макрозадача, затем снова <strong>полностью</strong> дренируется
          микроочередь — и так по кругу.
        </Text>
        <Alert color="gray" variant="light">
          <Text size="sm" c="dimmed" lh={1.65}>
            Реальные браузеры добавляют <strong>отрисовку</strong>,{" "}
            <strong>requestAnimationFrame</strong> и прочее между фазами; для
            собесов обычно достаточно правила: синхрон → все микро → одна макро →
            снова все микро.
          </Text>
        </Alert>
      </JsTopicSection>

      <JsTopicSection title="6. Промисы и очередь микрозадач">
        <Text c="gray.2" lh={1.75}>
          Разрешение промиса планирует реакции <Code>then</Code> как{" "}
          <strong>микрозадачи</strong>. Поэтому{" "}
          <Code>Promise.resolve().then(f)</Code> после синхронного кода выполнит{" "}
          <Code>f</Code> до следующего таймера. Цепочка <Code>then</Code> создаёт
          последовательные микрозадачи; ошибки пробрасываются в{" "}
          <Code>catch</Code> тоже через микроочередь.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="7. async/await и микрозадачи">
        <Text c="gray.2" lh={1.75}>
          После <Code>await</Code> <strong>продолжение</strong> async-функции не
          выполняется синхронно: оно ставится как микрозадача (после разрешения
          ожидаемого значения). Поэтому между строками «до» и «после»{" "}
          <Code>await</Code> успевают выполниться другой синхронный код и другие
          микрозадачи — отсюда порядок логов в типовых задачах.
        </Text>
        <CodeBlock>{`async function f() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
}
console.log("C");
f();
console.log("D");
// C, A, D, B`}</CodeBlock>
      </JsTopicSection>

      <JsTopicSection title="8. queueMicrotask">
        <Text c="gray.2" lh={1.75}>
          <Code>queueMicrotask(fn)</Code> ставит <Code>fn</Code> в{" "}
          <strong>ту же</strong> микроочередь, что и <Code>then</Code>. Используют,
          когда нужно выполнить что-то <strong>после</strong> текущего
          синхронного кода, но <strong>до</strong> любых макрозадач — например,
          дозавершить состояние до отрисовки или согласовать порядок с
          промисами.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="9. Браузер: отрисовка и requestAnimationFrame">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <strong>Отрисовка</strong> не может произойти посередине длинного
            синхронного JS на главном потоке — поэтому после тяжёлого цикла
            «кадр» может запоздать.
          </List.Item>
          <List.Item>
            <Code>requestAnimationFrame</Code> привязан к циклу кадра; в
            шпаргалке для собеса его <strong>не смешивают</strong> с{" "}
            <Code>then</Code>: порядок относительно микрозадач лучше не заучивать
            дословно, а понимать, что это <strong>отдельный</strong> механизм
            планирования перед отрисовкой.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="10. Node.js: nextTick, setImmediate и фазы">
        <Text c="gray.2" lh={1.75} mb="sm">
          В Node очереди другие по именам, но идея та же. Важно помнить{" "}
          <strong>приоритеты</strong> (упрощённо для собеса):
        </Text>
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <Code>process.nextTick</Code> — отдельная очередь; колбэки
            выполняются <strong>до</strong> микрозадач промисов и{" "}
            <strong>могут «голодать»</strong> I/O, если вызывать nextTick
            рекурсивно.
          </List.Item>
          <List.Item>
            <strong>Микрозадачи</strong> промисов — после nextTick (в современной
            модели обсуждают как «между» фазами; на собесе часто спрашивают
            именно «nextTick раньше then»).
          </List.Item>
          <List.Item>
            <Code>setImmediate</Code> — в check-фазе; <Code>setTimeout</Code> —
            timers; точный порядок относительно I/O зависит от фазы poll. Фраза
            «в Node порядок сложнее браузера — есть nextTick и фазы libuv» —
            нормальный честный ответ.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="11. Бесконечные микрозадачи и «заморозка» UI">
        <Alert color="red" variant="light" title="Starvation">
          <Text size="sm" lh={1.65}>
            Если каждая микрозадача снова ставит <strong>ещё одну</strong>{" "}
            микрозадачу без конца, макрозадачи (таймеры, ввод, отрисовка) могут{" "}
            <strong>долго не получать хода</strong> — страница выглядит зависшей.
            Это не «баг промисов», а неправильное использование очереди.
          </Text>
        </Alert>
      </JsTopicSection>

      <JsTopicSection title="12. Типичные ловушки">
        <Stack gap="md">
          <Alert color="yellow" variant="light" title="setTimeout(0) не «сразу»">
            <Text size="sm" lh={1.65}>
              Нулевая задержка лишь ставит колбэк в{" "}
              <strong>макро</strong>очередь. Все микрозадачи (включая{" "}
              <Code>then</Code> и продолжения после <Code>await</Code>) выполнятся
              раньше.
            </Text>
          </Alert>
          <Alert color="orange" variant="light" title="Синхронный код всегда первый">
            <Text size="sm" lh={1.65}>
              Пока не закончился текущий синхронный блок, ни один колбэк из
              очередей не начнётся. <Code>setTimeout(0)</Code> не прерывает
              выполнение функции посередине.
            </Text>
          </Alert>
        </Stack>
      </JsTopicSection>

      <JsTopicSection title="13. Шпаргалка порядка (браузер, учебная модель)">
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
              <Table.Th>Этап</Table.Th>
              <Table.Th>Когда / что</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>Синхронный JS</Table.Td>
              <Table.Td>
                Выполняется сразу, пока стек не пуст; ставит микро- и
                макрозадачи в очереди, но не выполняет их
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Микрозадачи</Table.Td>
              <Table.Td>
                Полный проход очереди: then/catch/finally, queueMicrotask и т.д.
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Макрозадача</Table.Td>
              <Table.Td>
                Одна задача из макроочереди (например, таймер), затем снова
                дренировать все микрозадачи
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Отрисовка (упрощ.)</Table.Td>
              <Table.Td>
                Между задачами цикла; не посередине синхронного скрипта
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Node.js</Table.Td>
              <Table.Td>
                Плюс <Code>process.nextTick</Code>, фазы libuv — порядок шире,
                чем в браузере
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </JsTopicSection>
    </JsTopicDetailLayout>
  );
}
