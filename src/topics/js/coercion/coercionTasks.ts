import type { JsTopicTask } from "../jsTopicTypes";

export const COERCION_TASKS: JsTopicTask[] = [
  {
    id: "co-t1",
    prompt: "Что выведет код?",
    code: `console.log(null == undefined);
console.log(null === undefined);`,
    answer: "`true` и `false`.",
    explanation:
      "`==` считает `null` и `undefined` равными; `===` — разные типы.",
  },
  {
    id: "co-t2",
    prompt: "Что выведет код?",
    code: `console.log(0 == false);
console.log(0 === false);`,
    answer: "`true` и `false`.",
    explanation: "`==` приводит `false` к `0`; `===` не приводит.",
  },
  {
    id: "co-t3",
    prompt: "Что выведет код?",
    code: `console.log('' == false);
console.log('' === false);`,
    answer: "`true` и `false`.",
    explanation: "Пустая строка и `false` сходятся при `==` через число `0`.",
  },
  {
    id: "co-t4",
    prompt: "Что выведет код?",
    code: `console.log(NaN == NaN);
console.log(Object.is(NaN, NaN));`,
    answer: "`false` и `true`.",
    explanation: "`NaN` не равен сам себе через `==`/`===`; `Object.is` — исключение.",
  },
  {
    id: "co-t5",
    prompt: "Что выведет код?",
    code: `console.log(0 === -0);
console.log(Object.is(0, -0));`,
    answer: "`true` и `false`.",
    explanation: "`===` не различает нули; `Object.is` различает `+0` и `-0`.",
  },
  {
    id: "co-t6",
    prompt: "Что выведет код?",
    code: `console.log([] + []);
console.log([] + {});`,
    answer: "`''` и `\"[object Object]\"`.",
    explanation:
      "`[]` → строка `''`; `{}` → `\"[object Object]\"` при конкатенации. Выражение `{}+[]` в начале строки может трактоваться как блоком — отдельная ловушка ASI.",
  },
  {
    id: "co-t7",
    prompt: "Что выведет код?",
    code: `console.log(Number(''));
console.log(Number('  \\n'));`,
    answer: "`0` и `0`.",
    explanation: "Пробельные строки после trim дают `0`.",
  },
  {
    id: "co-t8",
    prompt: "Что выведет код?",
    code: `console.log(parseInt('0x10'));
console.log(parseInt('10', 10));`,
    answer: "`16` и `10`.",
    explanation: "`0x` — hex если radix не задан явно; с `10` — десятичное.",
  },
  {
    id: "co-t9",
    prompt: "Что выведет код?",
    code: `console.log(isNaN('hello'));
console.log(Number.isNaN('hello'));`,
    answer: "`true` и `false`.",
    explanation: "`isNaN` приводит к числу; `Number.isNaN` — только для настоящего NaN.",
  },
  {
    id: "co-t10",
    prompt: "Что выведет код?",
    code: `console.log(Boolean(0));
console.log(Boolean('0'));`,
    answer: "`false` и `true`.",
    explanation: "Строка `'0'` непустая — truthy.",
  },
  {
    id: "co-t11",
    prompt: "Что выведет код?",
    code: `console.log(!![]);
console.log(!!'');`,
    answer: "`true` и `false`.",
    explanation: "Пустой массив — объект, truthy; пустая строка — falsy.",
  },
  {
    id: "co-t12",
    prompt: "Что выведет код?",
    code: `console.log('5' - 2);
console.log('5' + 2);`,
    answer: "`3` и `\"52\"`.",
    explanation: "`-` вычитание → числа; `+` с строкой — конкатенация.",
  },
  {
    id: "co-t13",
    prompt: "Что выведет код?",
    code: `console.log(null > 0);
console.log(null == 0);
console.log(null >= 0);`,
    answer: "`false`, `false`, `true`.",
    explanation: "Парадокс сравнения: `null` при `>=` ведёт себя как `0` при числовом сравнении, но `null == 0` — false.",
  },
  {
    id: "co-t14",
    prompt: "Что выведет код?",
    code: `console.log(undefined > 0);
console.log(undefined == null);`,
    answer: "`false` и `true`.",
    explanation: "`undefined` к числу — NaN; сравнения с NaN — false.",
  },
  {
    id: "co-t15",
    prompt: "Что выведет код?",
    code: `const a = {};
const b = {};
console.log(a == b);
console.log(a === b);`,
    answer: "`false` и `false`.",
    explanation: "Разные объекты — разные ссылки.",
  },
  {
    id: "co-t16",
    prompt: "Что выведет код?",
    code: `console.log(String(Symbol('x')));
console.log('' + Symbol('x'));`,
    answer: "`Symbol(x)` и **TypeError** при `+` с строкой (в строгом режиме конкатенация Symbol запрещена).",
    explanation: "`String()` разрешён; `+` с строкой — ошибка для Symbol.",
  },
  {
    id: "co-t17",
    prompt: "Что выведет код?",
    code: `console.log(1n + 2n);
console.log(1n == 1);`,
    answer: "`3n` и `true` (в современных движках `==` между BigInt и Number приводит).",
    explanation: "`1n == 1` — true (числовое сравнение через приведение); смешивать `1n + 1` без `n` — ошибка.",
  },
  {
    id: "co-t18",
    prompt: "Что выведет код?",
    code: `console.log(Number.MAX_VALUE < Infinity);
console.log(Number('1e400'));`,
    answer: "`true` и `Infinity`.",
    explanation: "Слишком большое число становится `Infinity`.",
  },
  {
    id: "co-t19",
    prompt: "Что выведет код?",
    code: `console.log([] == 0);
console.log([1] == 1);`,
    answer: "`true` и `true`.",
    explanation: "Массив приводится к примитиву: `''` → 0; `[1]` → `'1'` → 1.",
  },
  {
    id: "co-t20",
    prompt: "Что выведет код?",
    code: `console.log(true + true);
console.log(true + false);`,
    answer: "`2` и `1`.",
    explanation: "Булевы в `+` становятся числами `1` и `0`.",
  },
  {
    id: "co-t21",
    prompt: "Что выведет код?",
    code: `console.log(null + 1);
console.log(undefined + 1);`,
    answer: "`1` и `NaN`.",
    explanation: "`null` → 0; `undefined` → NaN.",
  },
  {
    id: "co-t22",
    prompt: "Что выведет код?",
    code: `console.log('11' < '2');
console.log('11' < 2);`,
    answer: "`true` и `false`.",
    explanation: "Лексикографическое сравнение строк vs числовое `'11'` < 2.",
  },
  {
    id: "co-t23",
    prompt: "Что выведет код?",
    code: `console.log(1 < 2 < 3);
console.log(3 > 2 > 1);`,
    answer: "`true` и `false`.",
    explanation:
      "Слева направо: `(1 < 2)` → `true`; `true < 3` → `1 < 3` → `true`. Для второй: `(3 > 2)` → `true`; `true > 1` → `1 > 1` → `false`.",
  },
  {
    id: "co-t24",
    prompt: "Что вернёт `[] == ![]`?",
    answer: "`true`.",
    explanation: "`![]` → `false`; `[]` с `false` через `==` приводятся к 0.",
  },
  {
    id: "co-t25",
    prompt: "Что выведет код?",
    code: `console.log(typeof null);
console.log(typeof NaN);`,
    answer: "`object` и `number`.",
    explanation: "Исторический баг `typeof null`; NaN — число.",
  },
  {
    id: "co-t26",
    prompt: "Что выведет код?",
    code: `const x = { valueOf: () => 1, toString: () => '2' };
console.log(x + 1);`,
    answer: "`2`.",
    explanation:
      "Для `+` с числом у объекта `ToPrimitive` с hint `number`: сначала `valueOf` вернул примитив `1` → `1 + 1 = 2`.",
  },
  {
    id: "co-t27",
    prompt: "Что выведет код?",
    code: `console.log(0.1 + 0.2 === 0.3);
console.log(Object.is(0.1 + 0.2, 0.3));`,
    answer: "`false` и `false`.",
    explanation: "Плавающая точка: не точное равенство; не `Object.is` тоже.",
  },
  {
    id: "co-t28",
    prompt: "Кратко: когда в проде предпочитать `===`?",
    answer: "Почти всегда — меньше сюрпризов и читаемости.",
    explanation: "`==` оставляют осознанно для `null`/`undefined` или legacy; иначе `===`.",
  },
];
