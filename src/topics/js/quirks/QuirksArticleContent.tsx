import { Alert, Anchor, Code, List, Table, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { CodeBlock } from "../../../components/CodeBlock";
import { JsTopicSection } from "../JsTopicDetailLayout";

export function QuirksArticleContent() {
  return (
    <>
      <JsTopicSection title="1. Зачем отдельная «энциклопедия странностей»">
        <Text c="gray.2" lh={1.75}>
          Многое из нижеперечисленного — не «баги», а прямое следование спецификации
          ECMAScript и исторических решений (совместимость с первыми браузерами). В
          проде обычно избегают неочевидных конструкций, но на собесах и в легаси они
          встречаются постоянно. Про приведение типов и <Code>==</Code> подробнее — в
          разделе{" "}
          <Anchor component={Link} to="/topics/js/coercion" c="cyan.3" fw={500}>
            «Типы и приведение»
          </Anchor>
          .
        </Text>
      </JsTopicSection>

      <JsTopicSection title="2. NaN и «числовые» сюрпризы">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <Code>typeof NaN === &quot;number&quot;</Code> — <Code>NaN</Code> это
            значение типа Number (IEEE 754 «not-a-number»).
          </List.Item>
          <List.Item>
            <Code>NaN === NaN</Code> и <Code>NaN == NaN</Code> — оба{" "}
            <Code>false</Code>. Проверка: <Code>Number.isNaN(x)</Code> (без приведения)
            или <Code>Object.is(x, NaN)</Code>.
          </List.Item>
          <List.Item>
            Глобальный <Code>isNaN(x)</Code> сначала приводит к числу:{" "}
            <Code>isNaN(&quot;oops&quot;)</Code> — <Code>true</Code>, а{" "}
            <Code>Number.isNaN(&quot;oops&quot;)</Code> — <Code>false</Code>.
          </List.Item>
          <List.Item>
            <Code>Math.min()</Code> даёт <Code>Infinity</Code>, <Code>Math.max()</Code>{" "}
            — <Code>-Infinity</Code> (нет аргументов — «нейтральный» элемент).
          </List.Item>
          <List.Item>
            <Code>Number(null)</Code> — <Code>0</Code>, <Code>Number(undefined)</Code>{" "}
            — <Code>NaN</Code>.
          </List.Item>
          <List.Item>
            <Code>0 === -0</Code> — <Code>true</Code>, но{" "}
            <Code>Object.is(0, -0)</Code> — <Code>false</Code>; <Code>1 / -0</Code> —{" "}
            <Code>-Infinity</Code>.
          </List.Item>
          <List.Item>
            <Code>0.1 + 0.2 !== 0.3</Code> — двоичное представление дробей; для денег —
            целые копейки или <Code>Decimal</Code>-библиотеки.
          </List.Item>
          <List.Item>
            За пределами <Code>Number.MAX_SAFE_INTEGER</Code> целые теряют точность;
            для больших целых — <Code>BigInt</Code>.
          </List.Item>
        </List>
        <CodeBlock>{`Number.isFinite(NaN)  // false
isFinite(NaN)       // false (но через приведение — осторожно с не-числами)
[NaN].indexOf(NaN)  // -1 (строгое сравнение внутри)
[NaN].includes(NaN) // true (SameValueZero)`}</CodeBlock>
      </JsTopicSection>

      <JsTopicSection title="3. typeof и «ложные» типы">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <Code>typeof null === &quot;object&quot;</Code> — исторический артефакт;
            для <Code>null</Code> используй <Code>x === null</Code>.
          </List.Item>
          <List.Item>
            <Code>typeof []</Code> и <Code>{"typeof {}"}</Code> —{" "}
            <Code>&quot;object&quot;</Code>;
            массив проверяют через <Code>Array.isArray(x)</Code>.
          </List.Item>
          <List.Item>
            <Code>{"typeof function(){}"}</Code> — <Code>&quot;function&quot;</Code> (в
            спецификации отдельный внутренний тип, но <Code>typeof</Code> так
            отображает).
          </List.Item>
          <List.Item>
            <Code>{"typeof class C {}"}</Code> — тоже <Code>&quot;function&quot;</Code>.
          </List.Item>
          <List.Item>
            <Code>typeof NaN</Code> — <Code>&quot;number&quot;</Code>.
          </List.Item>
          <List.Item>
            До ES6 у некоторых движков <Code>typeof /re/</Code> мог быть{" "}
            <Code>&quot;function&quot;</Code>; в современных обычно{" "}
            <Code>&quot;object&quot;</Code>.
          </List.Item>
          <List.Item>
            <Code>typeof BigInt(1)</Code> — <Code>&quot;bigint&quot;</Code>,{" "}
            <Code>typeof Symbol()</Code> — <Code>&quot;symbol&quot;</Code>.
          </List.Item>
          <List.Item>
            Неинициализированный <Code>let</Code>/<Code>const</Code> в зоне TDZ даёт{" "}
            <Code>ReferenceError</Code>, а не <Code>typeof undefined</Code>.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="4. Массивы: truthy, но == false">
        <Text c="gray.2" lh={1.75}>
          Пустой массив <Code>[]</Code> в условии <Code>if ([])</Code> —{" "}
          <strong>truthy</strong> (любой объект truthy). Но{" "}
          <Code>[] == false</Code> — <Code>true</Code>: нестрогое сравнение приводит
          массив к примитиву (часто пустая строка <Code>&quot;&quot;</Code>), затем к
          числу <Code>0</Code>, а <Code>false</Code> тоже к <Code>0</Code>.
        </Text>
        <CodeBlock>{`Boolean([])     // true
[] == false     // true
[] === false    // false
Number([])      // 0
String([])      // ''`}</CodeBlock>
        <List spacing="sm" c="gray.3" size="sm" mt="sm">
          <List.Item>
            <Code>new Array(3)</Code> — массив длины 3 с <strong>дырами</strong> (empty
            slots), не три <Code>undefined</Code>; <Code>map</Code> часто «пропускает»
            дыры.
          </List.Item>
          <List.Item>
            <Code>[1, 2, 3].sort()</Code> без компаратора — лексикографическая сортировка
            <strong>строк</strong>, не числовая: <Code>[1, 11, 2].sort()</Code> →{" "}
            <Code>[1, 11, 2]</Code> визуально может удивить — на самом деле{" "}
            <Code>&quot;1&quot;, &quot;11&quot;, &quot;2&quot;</Code>.
          </List.Item>
          <List.Item>
            <Code>[,].length</Code> может быть <Code>1</Code> (одна дыра);{" "}
            <Code>[undefined].length</Code> — элемент есть.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="5. Объекты, ключи и сравнение">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            Два разных объекта никогда не «равны» по значению:{" "}
            <Code>{"{} === {}"}</Code> — <Code>false</Code> (разные ссылки).
          </List.Item>
          <List.Item>
            У обычных объектов ключи целых чисел в диапазоне часто перечисляются в
            числовом порядке; остальные — в порядке вставки (детали в спецификации для
            string keys / integer index).
          </List.Item>
          <List.Item>
            <Code>{"{} + []"}</Code> в выражении может дать <Code>0</Code> или другой
            результат, если <Code>{"{}"}</Code> интерпретируется как <strong>блок</strong>, а
            не объект — зависит от контекста (начало строки/statement). Классика:{" "}
            <Code>{"[] + {}"}</Code> vs <Code>{"{} + []"}</Code>.
          </List.Item>
          <List.Item>
            Обертки <Code>new Boolean(false)</Code>, <Code>new Number(0)</Code> — объекты,
            в <Code>if</Code> они <strong>truthy</strong>.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="6. parseInt, parseFloat, унарный +">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <Code>parseInt(&quot;08&quot;, 10)</Code> — всегда указывай radix{" "}
            <Code>10</Code> для десятичных строк (история с octal).
          </List.Item>
          <List.Item>
            <Code>parseInt(0.0000008)</Code> сначала получает строку{" "}
            <Code>&quot;8e-7&quot;</Code> — может дать <Code>8</Code> (парсит до
            нецифры).
          </List.Item>
          <List.Item>
            <Code>parseFloat(&quot;&quot;)</Code> — <Code>NaN</Code>,{" "}
            <Code>Number(&quot;&quot;)</Code> — <Code>0</Code>.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="7. Строки и Unicode">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <Code>&quot;😀&quot;.length</Code> часто <Code>2</Code> (суррогатная пара);
            для графем — <Code>Intl.Segmenter</Code> или сторонние библиотеки.
          </List.Item>
          <List.Item>
            <Code>{"\\u{1F600}"}</Code> в шаблонном литерале — один кодпоинт (не путать с устаревшим{" "}
            <Code>\uXXXX</Code> только для BMP).
          </List.Item>
          <List.Item>
            Сравнение строк — по кодовым единицам, не по «буквам языка»; для локали —{" "}
            <Code>localeCompare</Code>.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="8. Операторы: void, запятая, delete, in">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <Code>void 0</Code> всегда <Code>undefined</Code> (старый идиом).
          </List.Item>
          <List.Item>
            Оператор запятой возвращает последнее значение:{" "}
            <Code>(1, 2, 3)</Code> — <Code>3</Code>.
          </List.Item>
          <List.Item>
            <Code>delete</Code> не снимает с переменных в strict mode; у массива дыра или
            сдвиг длины — разное поведение для индексов.
          </List.Item>
          <List.Item>
            <Code>{"'toString' in {}"}</Code> — <Code>true</Code> (цепочка
            прототипов); <Code>Object.hasOwn</Code> для собственных ключей.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="9. ??, ||, && и «ложные» значения">
        <Text c="gray.2" lh={1.75}>
          <Code>??</Code> срабатывает только для <Code>null</Code> и{" "}
          <Code>undefined</Code>; <Code>||</Code> — для любого falsy. Поэтому{" "}
          <Code>0 || 10</Code> — <Code>10</Code>, а <Code>0 ?? 10</Code> — <Code>0</Code>.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="10. JSON">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <Code>{'JSON.stringify({ a: undefined })'}</Code> опускает ключ с{" "}
            <Code>undefined</Code>; в массиве элемент становится{" "}
            <Code>null</Code>.
          </List.Item>
          <List.Item>
            Функции, <Code>Symbol</Code>, циклические ссылки — не сериализуются
            «из коробки» (цикл — ошибка).
          </List.Item>
          <List.Item>
            Ключи объекта в JSON всегда строки; порядок ключей при парсинге обычно
            сохраняется в современных движках для обычных объектов.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="11. Date">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            Месяц в конструкторе и <Code>getMonth()</Code> — <strong>0-based</strong> (
            <Code>0</Code> — январь).
          </List.Item>
          <List.Item>
            Невалидная дата: объект есть, но <Code>getTime()</Code> — <Code>NaN</Code>,{" "}
            <Code>toString()</Code> — <Code>&quot;Invalid Date&quot;</Code>.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="12. RegExp">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            У регулярки с флагом <Code>g</Code> свойство <Code>lastIndex</Code> меняется
            при <Code>test</Code>/<Code>exec</Code> — глобальное состояние на объекте.
          </List.Item>
          <List.Item>
            Пустое совпадение при флаге <Code>g</Code> может привести к бесконечному циклу при
            ручном <Code>exec</Code>, если не двигать индекс.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="13. Битовые операции">
        <Text c="gray.2" lh={1.75}>
          Побитовые операторы работают с 32-битным знаковым целым: дробная часть
          отбрасывается, большие числа «обрезаются». <Code>~~1.9</Code> —{" "}
          <Code>1</Code>, не математическое округление.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="14. Функции: arguments, стрелки, default">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            Обычная функция в non-strict имеет <Code>arguments</Code> (array-like); в
            стрелках <Code>arguments</Code> берётся из внешней функции.
          </List.Item>
          <List.Item>
            Параметр по умолчанию оценивается в отдельной области; обращение к другим
            параметрам в том же списке — в зоне «временной смерти» до инициализации.
          </List.Item>
          <List.Item>
            <Code>length</Code> функции не считает параметры с default и rest по правилам
            спецификации.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="15. Классы и hoisting">
        <Text c="gray.2" lh={1.75}>
          <Code>class</Code> не поднимается как <Code>function declaration</Code>: до
          объявления класс в TDZ. Наследование: в производном классе нельзя использовать{" "}
          <Code>this</Code> до <Code>super()</Code>.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="16. try / catch / finally">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            Если в <Code>try</Code> есть <Code>return</Code>, перед выходом выполняется{" "}
            <Code>finally</Code>; значение <Code>return</Code> из <Code>try</Code> может
            быть перезаписано <Code>return</Code> в <Code>finally</Code>.
          </List.Item>
          <List.Item>
            Опциональный binding <Code>{'catch { }'}</Code> (без переменной) — в новых
            стандартах для случаев, когда ошибка не нужна.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="17. switch и сравнение">
        <Text c="gray.2" lh={1.75}>
          <Code>switch</Code> использует <strong>строгое равенство</strong>{" "}
          <Code>===</Code> между <Code>case</Code> и значением (после вычисления
          выражения <Code>switch</Code>).
        </Text>
      </JsTopicSection>

      <JsTopicSection title="18. for...in vs for...of">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <Code>for...in</Code> перечисляет перечислимые ключи (включая унаследованные,
            если не отфильтровать); для массивов — не гарантирует числовой порядок.
          </List.Item>
          <List.Item>
            <Code>for...of</Code> — по итерируемому протоколу; у обычного объекта
            <Code>{"{}"}</Code> итератора нет без <Code>Symbol.iterator</Code>.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="19. Promise и async (кратко)">
        <Text c="gray.2" lh={1.75}>
          <Code>async</Code> функция всегда возвращает Promise; <Code>return 1</Code> —
          Promise с 1. Пустой <Code>{"then(() => {})"}</Code> возвращает Promise с{" "}
          <Code>undefined</Code>. Порядок микрозадач — см. раздел{" "}
          <Anchor component={Link} to="/topics/js/event-loop" c="cyan.3" fw={500}>
            Event Loop
          </Anchor>
          .
        </Text>
      </JsTopicSection>

      <JsTopicSection title="20. Головоломки, которые любят на собесах">
        <CodeBlock>{`['1','2','3'].map(parseInt)
// parseInt('1',0,array), parseInt('2',1,array), parseInt('3',2,array)
// → [1, NaN, NaN]

[] == ![]   // true (![] → false, [] == false → true)

1 < 2 < 3   // true (true < 3 → 1 < 3)
3 > 2 > 1   // false (true > 1 → 1 > 1)`}</CodeBlock>
      </JsTopicSection>

      <JsTopicSection title="21. Ещё нюансы (коротко)">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <Code>instanceof</Code> сравнивает цепочку прототипов; при разных realm (iframe)
            один и тот же конструктор может дать <Code>false</Code> для «того же» объекта.
          </List.Item>
          <List.Item>
            <Code>Object.prototype.toString.call(null)</Code> —{" "}
            <Code>&quot;[object Null]&quot;</Code>, а <Code>typeof null</Code> —{" "}
            <Code>&quot;object&quot;</Code>.
          </List.Item>
          <List.Item>
            <Code>setTimeout(fn, 0)</Code> не гарантирует «сразу после текущего кода» — минимальная
            задержка и очередь задач; для микрозадач см. <Code>queueMicrotask</Code> / Promise.
          </List.Item>
          <List.Item>
            Тегированные шаблонные литералы: <Code>fn`x`</Code> получает сырой массив строк и
            подстановки — не то же самое, что обычный вызов функции со строкой.
          </List.Item>
          <List.Item>
            <Code>with</Code> запрещён в strict mode; ломает оптимизации и предсказуемость
            области видимости.
          </List.Item>
          <List.Item>
            <Code>++[]</Code> / подобные выражения — синтаксически или семантически ломаются;
            класс интервью-шутки, не паттерн для кода.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="22. Окружение: браузер и Node">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <Code>this</Code> в обычной функции на верхнем уровне модуля —{" "}
            <Code>undefined</Code> (strict); в браузерном non-module script —{" "}
            <Code>window</Code>.
          </List.Item>
          <List.Item>
            Устаревший объект <Code>document.all</Code> в браузерах ведёт себя особо
            (для совместимости со старым IE): в булевом контексте ведёт как{" "}
            <Code>falsy</Code>, при этом <Code>typeof document.all</Code> может быть{" "}
            <Code>&quot;undefined&quot;</Code> в современных спецификациях для веба —
            крайний случай, не опирайся на это в логике.
          </List.Item>
          <List.Item>
            В Node глобальные <Code>exports</Code>, <Code>module</Code>,{" "}
            <Code>__dirname</Code> — не в браузере без бандлера.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="23. Шпаргалка: быстрый список">
        <Table
          striped
          highlightOnHover
          withTableBorder
          fz="sm"
          c="gray.3"
          layout="fixed"
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Факт</Table.Th>
              <Table.Th>Пример / комментарий</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>
                <Code>NaN</Code> — число
              </Table.Td>
              <Table.Td>
                <Code>typeof NaN === &quot;number&quot;</Code>
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <Code>null</Code> и объект
              </Table.Td>
              <Table.Td>
                <Code>typeof null === &quot;object&quot;</Code>
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Массив и <Code>== false</Code></Table.Td>
              <Table.Td>
                <Code>[] == false</Code>, но <Code>Boolean([])</Code> — true
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Объекты и <Code>===</Code></Table.Td>
              <Table.Td>Равенство по ссылке, не по структуре</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Falsy</Table.Td>
              <Table.Td>
                <Code>false</Code>, <Code>0</Code>, <Code>-0</Code>, <Code>0n</Code>,{" "}
                <Code>&quot;&quot;</Code>, <Code>null</Code>, <Code>undefined</Code>,{" "}
                <Code>NaN</Code>
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <Code>==</Code> особые пары
              </Table.Td>
              <Table.Td>
                <Code>null == undefined</Code> — true, остальное см. спеку
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Сортировка массива</Table.Td>
              <Table.Td>
                <Code>sort()</Code> без fn — как строки
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>JSON и <Code>undefined</Code></Table.Td>
              <Table.Td>Ключи с undefined пропадают</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Дата</Table.Td>
              <Table.Td>Месяц с нуля</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Дроби</Table.Td>
              <Table.Td>
                <Code>0.1 + 0.2</Code> — погрешность IEEE 754
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
        <Alert color="gray" variant="light" mt="md">
          <Text size="sm" lh={1.65}>
            Полный перечень «всех» нюансов языка бесконечен (новые предложения в TC39,
            нюансы движков). Держи под рукой спецификацию и MDN; в коде — линтер,
            TypeScript и явные проверки вместо магии.
          </Text>
        </Alert>
      </JsTopicSection>
    </>
  );
}
