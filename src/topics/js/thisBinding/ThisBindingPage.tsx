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
import { THIS_BINDING_INTERVIEW_QA } from "./thisBindingInterviewQa";
import { THIS_BINDING_TASKS } from "./thisBindingTasks";

export function ThisBindingPage() {
  return (
    <JsTopicDetailLayout
      title="Контекст выполнения: this"
      subtitle="Подробная теория: приоритет правил, default/implicit/explicit/new, bind, super, defineProperty, globalThis, DOM, шпаргалка и задачи."
      tasks={THIS_BINDING_TASKS}
      interviewQuestions={THIS_BINDING_INTERVIEW_QA}
    >
      <JsTopicSection title="1. Что такое this">
        <Text c="gray.2" lh={1.75}>
          <Code>this</Code> — это <strong>ссылка на «текущий» объект</strong>, с
          которым связан вызов функции. Для <strong>обычных функций</strong>{" "}
          значение <Code>this</Code> <strong>не</strong> берётся из места, где
          функция написана в коде (в отличие от лексических переменных и
          замыканий), а определяется тем, <strong>как</strong> функцию вызвали —
          правила языка называют видами <strong>привязки</strong> (binding).
        </Text>
        <Text c="gray.2" lh={1.75} mt="sm">
          У <strong>стрелочных функций</strong> своего <Code>this</Code> нет:
          они <strong>лексически</strong> берут <Code>this</Code> из окружающей
          области, где стрелка была <strong>создана</strong> (как ближайший
          «настоящий» <Code>this</Code> у объемлющей функции или модульный /
          глобальный контекст).
        </Text>
      </JsTopicSection>

      <JsTopicSection title="2. Default binding (вызов без базы)">
        <Text c="gray.2" lh={1.75} mb="sm">
          Вызов <Code>f()</Code> без объекта слева и без <Code>call</Code>/
          <Code>apply</Code>/<Code>bind</Code>/<Code>new</Code> —{" "}
          <strong>default binding</strong>.
        </Text>
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            В <strong>strict mode</strong> и в <strong>модулях ES</strong> (они
            всегда strict) <Code>this</Code> будет <Code>undefined</Code>.
          </List.Item>
          <List.Item>
            В <strong>нестрогом</strong> обычном скрипте браузера часто подставляется{" "}
            <Code>window</Code> (или <Code>globalThis</Code> в современной
            терминологии); в Node в старых сценариях встречались нюансы с{" "}
            <Code>global</Code> — на собесе достаточно: «в sloppy может быть
            глобальный объект, в strict — undefined».
          </List.Item>
        </List>
        <CodeBlock>{`"use strict";
function g() { return this; }
g(); // undefined`}</CodeBlock>
      </JsTopicSection>

      <JsTopicSection title="3. Неявная привязка (implicit binding)">
        <Text c="gray.2" lh={1.75} mb="sm">
          Если вызов выглядит как доступ к свойству и сразу вызов —{" "}
          <Code>obj.method()</Code> или <Code>obj["method"]()</Code>, то внутри{" "}
          <Code>method</Code> при обычной функции <Code>this</Code> обычно равен{" "}
          <Code>obj</Code> (база вызова / base reference).
        </Text>
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            Цепочка <Code>a.b.c()</Code>: базой является <strong>то, что слева от
            последней пары скобок</strong> — здесь <Code>c</Code> вызывается как
            метод <Code>b</Code> из <Code>a.b</Code>, то есть <Code>this</Code>{" "}
            внутри <Code>c</Code> — объект <Code>a.b</Code> (если <Code>c</Code>{" "}
            — обычная функция).
          </List.Item>
          <List.Item>
            Если сохранить ссылку <Code>const h = obj.method; h()</Code>, при
            вызове <Code>h()</Code> базы нет — срабатывает default binding →
            потеря контекста.
          </List.Item>
          <List.Item>
            Вызов через <Code>obj.method.call(other)</Code> явно подменяет{" "}
            <Code>this</Code> на <Code>other</Code> — неявная база из{" "}
            <Code>obj</Code> для этого вызова не важна.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="4. Потеря контекста — главная ловушка">
        <Text c="gray.2" lh={1.75} mb="sm">
          Любая передача метода «как значения» без вызова с базой ломает неявную
          привязку: колбэки, деструктуризация, вложенные функции.
        </Text>
        <CodeBlock>{`const h = obj.method;
h(); // this потерян

setTimeout(obj.method, 0); // потерян

const { method } = obj;
method(); // потерян

// варианты починки:
const ok1 = obj.method.bind(obj);
const ok2 = () => obj.method();
const ok3 = function () { return obj.method(); };`}</CodeBlock>
      </JsTopicSection>

      <JsTopicSection title="5. Явная привязка: call, apply, bind">
        <Text c="gray.2" lh={1.75} mb="sm">
          Методы <Code>Function.prototype.call</Code>, <Code>apply</Code>,{" "}
          <Code>bind</Code> задают <Code>this</Code> <strong>явно</strong>.
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
              <Table.Th>Метод</Table.Th>
              <Table.Th>Назначение</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>
                <Code>fn.call(ctx, a, b, …)</Code>
              </Table.Td>
              <Table.Td>
                Вызвать <Code>fn</Code> сразу с <Code>this === ctx</Code> (в
                смысле правил), аргументы перечислением
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <Code>fn.apply(ctx, arr)</Code>
              </Table.Td>
              <Table.Td>
                То же, аргументы одним массивоподобным объектом; удобно, когда
                список аргументов вычисляется динамически
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <Code>fn.bind(ctx, …args)</Code>
              </Table.Td>
              <Table.Td>
                Вернуть <strong>новую</strong> функцию с зафиксированным{" "}
                <Code>this</Code> и опционально частично применёнными аргументами;
                вызов позже
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
        <List spacing="sm" c="gray.3" size="sm" mt="sm">
          <List.Item>
            Если <Code>thisArg</Code> — примитив, в нестрогом режиме он может
            быть обёрнут в объект-обёртку; в strict остаётся как есть (или{" "}
            <Code>undefined</Code>/<Code>null</Code> без подстановки глобала).
          </List.Item>
          <List.Item>
            <Code>call(undefined)</Code> в strict: <Code>this</Code> внутри{" "}
            <Code>undefined</Code>, а не <Code>window</Code>.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="6. new и привязка через конструктор">
        <Text c="gray.2" lh={1.75} mb="sm">
          При вызове <Code>new Fn()</Code> создаётся новый объект; внутри{" "}
          <Code>Fn</Code> <Code>this</Code> ссылается на этот объект, пока
          конструктор выполняется.
        </Text>
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            Если конструктор <strong>возвращает объект</strong> явно, результат{" "}
            <Code>new</Code> — этот объект (подмена экземпляра).
          </List.Item>
          <List.Item>
            Если возвращается <strong>примитив</strong> — он игнорируется,
            остаётся созданный объект.
          </List.Item>
          <List.Item>
            Стрелку нельзя вызывать с <Code>new</Code> — у неё нет{" "}
            <Code>[[Construct]]</Code>.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="7. Методы на прототипе">
        <Text c="gray.2" lh={1.75}>
          Функция на <Code>Constructor.prototype</Code> при вызове как{" "}
          <Code>instance.method()</Code> получает <Code>this === instance</Code>{" "}
          — неявная привязка к экземпляру, хотя функция физически лежит на
          прототипе. Если снять <Code>const x = instance.method; x()</Code> —
          снова потеря контекста.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="8. Стрелочные функции — детали">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            Не имеют собственного <Code>this</Code>, <Code>arguments</Code>,{" "}
            <Code>super</Code> как у обычного метода — берут из внешней функции /
            класса / модуля.
          </List.Item>
          <List.Item>
            Стрелку, созданную на верхнем уровне модуля, нельзя сделать «методом
            объекта» через <Code>obj.arrow()</Code> так, чтобы <Code>this</Code>{" "}
            стал <Code>obj</Code>: <Code>this</Code> останется лексическим
            (часто <Code>undefined</Code> в модуле).
          </List.Item>
          <List.Item>
            Стрелка, объявленная внутри тела обычного метода{" "}
            <Code>m</Code>, видит <Code>this</Code> того вызова <Code>m</Code>, в
            котором стрелка создана — удобно для вложенных колбэков без{" "}
            <Code>bind</Code>.
          </List.Item>
        </List>
        <CodeBlock>{`const o = {
  x: 1,
  regular() { return this.x; },
  arrow: () => this?.x,
};
o.regular(); // 1
o.arrow();   // не o.x — лексический this снаружи`}</CodeBlock>
      </JsTopicSection>

      <JsTopicSection title="9. Классы: методы, поля и стрелки">
        <Stack gap="md">
          <Text c="gray.2" lh={1.75}>
            <strong>Обычный метод класса</strong> — это функция на прототипе
            (в современных движках): при <Code>inst.method()</Code>{" "}
            <Code>this</Code> — экземпляр. При <Code>const {"{ method }"} = inst</Code>{" "}
            или передаче в колбэк контекст теряется — нужен <Code>bind</Code> или
            обёртка.
          </Text>
          <Alert variant="light" color="cyan">
            <Text size="sm" lh={1.65}>
              <strong>Поле со стрелкой</strong>{" "}
              <Code>{"m = () => this.x"}</Code> создаётся на <strong>каждом
              экземпляре</strong>, захватывает <Code>this</Code> класса в момент
              инициализации поля — удобно для обработчиков событий без ручного{" "}
              <Code>bind</Code>. Цена — отдельная функция на каждый экземпляр
              (память), в отличие от одного метода на прототипе.
            </Text>
          </Alert>
        </Stack>
      </JsTopicSection>

      <JsTopicSection title="10. bind: жёсткая привязка и частичное применение">
        <Text c="gray.2" lh={1.75} mb="sm">
          <Code>bind</Code> возвращает <strong>bound function</strong> — у неё
          внутренне зафиксирован <Code>this</Code> и начальные аргументы.
          Повторный <Code>call(other)</Code> на bound-функции{" "}
          <strong>не перебивает</strong> зафиксированный <Code>this</Code> (в
          обычных случаях на собесе это ключевой факт).
        </Text>
        <CodeBlock>{`const f = obj.m.bind(obj);
f.call(window); // всё равно this === obj`}</CodeBlock>
      </JsTopicSection>

      <JsTopicSection title="11. DOM и addEventListener">
        <Text c="gray.2" lh={1.75}>
          Для обычной функции-обработчика, зарегистрированной через{" "}
          <Code>addEventListener</Code>, при вызове браузером часто{" "}
          <Code>this</Code> указывает на <strong>элемент</strong>, на котором
          висит слушатель (как при <Code>listener.call(element, event)</Code>).
          Если передать <strong>стрелку</strong>, <Code>this</Code> будет
          лексическим, а не элементом — типичная ошибка в UI.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="12. Вложенные объекты и «не тот» this">
        <Text c="gray.2" lh={1.75} mb="sm">
          В <Code>o.inner.method()</Code> внутри <Code>method</Code>{" "}
          <Code>this</Code> — это <Code>o.inner</Code>, а не <Code>o</Code>. Если
          внутри нужен «внешний» объект — сохранить в переменную, использовать
          стрелку во внешнем методе или явный <Code>call</Code>.
        </Text>
        <CodeBlock>{`const o = {
  name: "outer",
  inner: {
    name: "inner",
    show() { return this.name; },
  },
};
o.inner.show(); // "inner"`}</CodeBlock>
      </JsTopicSection>

      <JsTopicSection title="13. Приоритет правил (что сильнее)">
        <Text c="gray.2" lh={1.75} mb="sm">
          Если несколько механизмов конкурируют, ориентир для обычных функций (
          <strong>не</strong> стрелок):
        </Text>
        <List spacing="sm" c="gray.3" size="sm" type="ordered">
          <List.Item>
            <strong>new</strong> — создаёт свой <Code>this</Code> (если функция
            допускает <Code>new</Code>).
          </List.Item>
          <List.Item>
            <strong>Явная привязка</strong> — <Code>call</Code>, <Code>apply</Code>
            ; <Code>bind</Code> «запечатывает» <Code>this</Code> и дальше{" "}
            <Code>call</Code> на bound-функции его обычно не меняет.
          </List.Item>
          <List.Item>
            <strong>Неявный вызов метода</strong> — <Code>obj.method()</Code>.
          </List.Item>
          <List.Item>
            <strong>Default</strong> — просто <Code>f()</Code> (strict →{" "}
            <Code>undefined</Code>, sloppy → часто глобал).
          </List.Item>
        </List>
        <Text c="gray.3" size="sm" mt="sm">
          Стрелка игнорирует эту цепочку и всегда смотрит на лексический{" "}
          <Code>this</Code> снаружи.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="14. super, классы и this">
        <Text c="gray.2" lh={1.75} mb="sm">
          В методах класса <Code>super</Code> ссылается на прототип родителя для
          вызова методов родителя. <Code>this</Code> при этом остаётся{" "}
          <strong>текущим экземпляром</strong> при вызове <Code>super.m()</Code> из
          метода экземпляра.
        </Text>
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <strong>Поле-стрелка</strong> в подклассе <strong>не может</strong>{" "}
            содержать <Code>super</Code> для вызова методов как у обычного метода —
            у стрелки нет собственного <Code>super</Code>-механизма метода; для{" "}
            <Code>super</Code> в теле класса используют обычные методы или явные
            привязки (на собесе это частый «подводный» факт).
          </List.Item>
          <List.Item>
            Статические методы используют <Code>this</Code> как конструктор класса,
            если вызываются как <Code>Sub.static()</Code> — контекст другой, чем у
            экземпляра.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="15. Object.defineProperty и функция как value">
        <Text c="gray.2" lh={1.75} mb="sm">
          Если метод записан как обычное data-свойство через{" "}
          <Code>Object.defineProperty</Code> с полем <Code>value: function () {"{"} … {"}"}</Code>{" "}
          и затем вызвать <Code>obj.m()</Code>, внутри <Code>this</Code> обычно
          будет <Code>obj</Code> — как при методе в литерале. С геттерами/сеттерами
          и со снятой ссылкой на функцию поведение проверяй отдельно.
        </Text>
        <Text c="gray.3" size="sm">
          На собесе реже, чем классы и стрелки, но полезно помнить: привязка всё
          равно определяется <strong>вызовом</strong>, а не только тем, как
          свойство объявлено.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="16. globalThis и единообразие сред">
        <Text c="gray.2" lh={1.75}>
          <Code>globalThis</Code> — стандартное имя глобального объекта в браузере,
          Node и других средах. В учебных примерах со sloppy mode и{" "}
          <Code>this</Code> «вне всего» иногда путают <Code>window</Code>,{" "}
          <Code>global</Code> и <Code>globalThis</Code> — для ответа на собесе
          лучше сказать: «в модуле strict <Code>this</Code> при прямом вызове —
          undefined; глобальный объект — через <Code>globalThis</Code>, а не
          через произвольный <Code>this</Code>».
        </Text>
      </JsTopicSection>

      <JsTopicSection title="17. Шпаргалка: что проверить на собесе">
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
              <Table.Th>Ситуация</Table.Th>
              <Table.Th>Куда смотреть</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>Обычная функция</Table.Td>
              <Table.Td>
                Как вызвана: база слева от <Code>()</Code>, или{" "}
                <Code>call/apply/bind/new</Code>, или default + strict
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Стрелка</Table.Td>
              <Table.Td>
                Где <strong>создана</strong>: лексический <Code>this</Code> с
                уровня выше
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Колбэк / снятый метод</Table.Td>
              <Table.Td>
                Скорее всего потеря контекста — нужен bind / стрелка /
                обёртка
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <Code>class</Code> + передача метода
              </Table.Td>
              <Table.Td>
                Поле-стрелка или <Code>bind</Code> в конструкторе
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </JsTopicSection>
    </JsTopicDetailLayout>
  );
}
