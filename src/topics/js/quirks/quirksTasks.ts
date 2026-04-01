import type { JsTopicTask } from "../jsTopicTypes";

export const QUIRKS_TASKS: JsTopicTask[] = [
  {
    id: "q-t1",
    prompt: "Что выведет код?",
    code: `console.log(typeof NaN);
console.log(NaN === NaN);`,
    answer: "`number` и `false`.",
    explanation:
      "`NaN` имеет тип number, но не равен сам себе через `===`.",
  },
  {
    id: "q-t2",
    prompt: "Что выведет код?",
    code: `console.log(Boolean([]));
console.log([] == false);`,
    answer: "`true` и `true`.",
    explanation:
      "Объект (массив) truthy в булевом контексте, но `== false` приводит `[]` к `0`, `false` к `0`.",
  },
  {
    id: "q-t3",
    prompt: "Что выведет код?",
    code: `console.log(typeof null);
console.log(null === null);`,
    answer: "`object` и `true`.",
    explanation:
      "`typeof null` — исторический баг строки; сравнение с самим собой через `===` корректно.",
  },
  {
    id: "q-t4",
    prompt: "Что выведет код?",
    code: `console.log(0 === -0);
console.log(Object.is(0, -0));`,
    answer: "`true` и `false`.",
    explanation: "`===` не различает нули; `Object.is` различает `+0` и `-0`.",
  },
  {
    id: "q-t5",
    prompt: "Что выведет код?",
    code: `console.log(Number(null));
console.log(Number(undefined));`,
    answer: "`0` и `NaN`.",
    explanation: "Правила `ToNumber` для `null` и `undefined` разные.",
  },
  {
    id: "q-t6",
    prompt: "Что выведет код?",
    code: `console.log(parseFloat(''));
console.log(Number(''));`,
    answer: "`NaN` и `0`.",
    explanation: "Пустая строка для `parseFloat` не число; `Number('')` даёт 0.",
  },
  {
    id: "q-t7",
    prompt: "Что выведет код?",
    code: `console.log(Math.min());
console.log(Math.max());`,
    answer: "`Infinity` и `-Infinity`.",
    explanation: "Без аргументов — нейтральные элементы для min/max.",
  },
  {
    id: "q-t8",
    prompt: "Что выведет код?",
    code: `const a = new Boolean(false);
console.log(a);
console.log(Boolean(a));`,
    answer: "Объект Boolean и `true`.",
    explanation: "Объект-обёртка всегда truthy; значение внутри не влияет на `Boolean(obj)`.",
  },
  {
    id: "q-t9",
    prompt: "Что выведет код?",
    code: `console.log([] + []);
console.log([] + {});`,
    answer: "Пустая строка и строка вида `[object Object]`.",
    explanation: "Сложение с массивом/объектом идёт через `ToPrimitive` и конкатенацию строк.",
  },
  {
    id: "q-t10",
    prompt: "Что выведет код?",
    code: `console.log([1, 11, 2].sort());`,
    answer: "`[1, 11, 2]` (визуально «не по числу»).",
    explanation: "По умолчанию элементы приводятся к строкам и сортируются лексикографически.",
  },
  {
    id: "q-t11",
    prompt: "Что выведет код?",
    code: `const a = new Array(3);
console.log(a.length, a.map((x) => x + 1));`,
    answer: "`3` и разреженный массив той же длины: `map` не вызывает колбэк для empty slots.",
    explanation: "`new Array(3)` не создаёт три `undefined`, а три пустых слота без элементов.",
  },
  {
    id: "q-t12",
    prompt: "Что выведет код?",
    code: `console.log([NaN].indexOf(NaN));
console.log([NaN].includes(NaN));`,
    answer: "`-1` и `true`.",
    explanation: "`indexOf` использует строгое равенство; `includes` — SameValueZero (как `Object.is` для NaN).",
  },
  {
    id: "q-t13",
    prompt: "Что выведет код?",
    code: `console.log(1 < 2 < 3);
console.log(3 > 2 > 1);`,
    answer: "`true` и `false`.",
    explanation: "Слева направо: `(1 < 2)` → `true`, `true < 3` → `1 < 3` → true; `(3 > 2)` → `true`, `true > 1` → `1 > 1` → false.",
  },
  {
    id: "q-t14",
    prompt: "Что выведет код?",
    code: `console.log(['1','2','3'].map(parseInt));`,
    answer: "`[1, NaN, NaN]`.",
    explanation: "`map` передаёт `(element, index, array)`; `parseInt` второй аргумент — radix.",
  },
  {
    id: "q-t15",
    prompt: "Что выведет код?",
    code: `console.log(![]);
console.log([] == ![]);`,
    answer: "`false` и `true`.",
    explanation: "`![]` → `false`; дальше `[] == false` как в задаче с пустым массивом.",
  },
  {
    id: "q-t16",
    prompt: "Что выведет код?",
    code: `console.log(0 || 10);
console.log(0 ?? 10);`,
    answer: "`10` и `0`.",
    explanation: "`||` срабатывает на любом falsy; `??` — только на `null`/`undefined`.",
  },
  {
    id: "q-t17",
    prompt: "Что выведет код?",
    code: `console.log(JSON.stringify({ a: undefined, b: 1 }));
console.log(JSON.stringify([undefined]));`,
    answer: "`{\"b\":1}` и `[null]`.",
    explanation: "Ключ с `undefined` в объекте опускается; в массиве `undefined` становится `null` в JSON.",
  },
  {
    id: "q-t18",
    prompt: "Что выведет код?",
    code: `const d = new Date('oops');
console.log(d.toString());
console.log(Number(d));`,
    answer: "`Invalid Date` и `NaN`.",
    explanation: "Невалидная дата — объект есть, но операции дают NaN/строку ошибки.",
  },
  {
    id: "q-t19",
    prompt: "Что выведет код?",
    code: `console.log(void 0);
console.log(void (1 + 1));`,
    answer: "`undefined` и `undefined`.",
    explanation: "`void` всегда возвращает `undefined`, выражение вычисляется ради побочных эффектов.",
  },
  {
    id: "q-t20",
    prompt: "Что выведет код?",
    code: `console.log(0.1 + 0.2 === 0.3);
console.log(Number.EPSILON > Math.abs(0.1 + 0.2 - 0.3));`,
    answer: "`false` и `true` (обычно).",
    explanation: "Двоичное представление; разница меньше `Number.EPSILON`, но строгое равенство не выполняется.",
  },
  {
    id: "q-t21",
    prompt: "Что выведет код?",
    code: `console.log(2 ** 3);
console.log(~~1.9);`,
    answer: "`8` и `1`.",
    explanation: "Степень — обычная операция; двойное побитовое НЕ усекает к 32-битному целому.",
  },
  {
    id: "q-t22",
    prompt: "Что выведет код?",
    code: `console.log('😀'.length);
console.log([...'😀'].length);`,
    answer: "`2` и `1` (в современных движках для spread по кодпоинтам).",
    explanation: "`.length` — UTF-16 кодовые единицы; spread по строке итерирует кодпоинты.",
  },
  {
    id: "q-t23",
    prompt: "Что выведет код?",
    code: `function g() {
  try {
    return 1;
  } finally {
    return 2;
  }
}
console.log(g());`,
    answer: "`2`.",
    explanation: "`finally` выполняется перед выходом; `return` в `finally` перекрывает `return` из `try`.",
  },
  {
    id: "q-t24",
    prompt: "Что выведет код?",
    code: `const x = 1;
switch (x) {
  case '1':
    console.log('str');
    break;
  case 1:
    console.log('num');
    break;
}`,
    answer: "`num`.",
    explanation: "`switch` сравнивает через `===`; типы должны совпасть.",
  },
  {
    id: "q-t25",
    prompt: "Что выведет код?",
    code: `console.log(typeof (() => {}));
console.log(typeof class {});`,
    answer: "`function` и `function`.",
    explanation: "Стрелки и классы дают `typeof` — function.",
  },
  {
    id: "q-t26",
    prompt: "Что выведет код?",
    code: `console.log(isNaN(''));
console.log(Number.isNaN(''));`,
    answer: "`false` и `false`.",
    explanation: "`isNaN('')` приводит к 0 — не NaN; `Number.isNaN` без приведения — строка не NaN.",
  },
  {
    id: "q-t27",
    prompt: "Что выведет код?",
    code: `console.log(Number.isFinite(NaN));
console.log(isFinite(NaN));`,
    answer: "`false` и `false`.",
    explanation: "Оба отвергают NaN; `isFinite` приводит аргумент, `Number.isFinite` — только числа.",
  },
  {
    id: "q-t28",
    prompt: "Что выведет код?",
    code: `console.log({} === {});
console.log([] === []);`,
    answer: "Два раза `false`.",
    explanation: "Каждый литерал — новая ссылка; сравнение объектов по ссылке.",
  },
  {
    id: "q-t29",
    prompt: "Что выведет код?",
    code: `async function f() { return 1; }
f().then(console.log);
console.log('sync');`,
    answer: "Сначала `sync`, потом `1` (в типичном движке).",
    explanation: "`then` — микрозадача после текущего синхронного кода.",
  },
  {
    id: "q-t30",
    prompt: "Что выведет код?",
    code: `const sym = Symbol('x');
console.log(typeof sym);
try {
  console.log(sym + '');
} catch (e) {
  console.log('err');
}`,
    answer: "`symbol` и `err` (или сообщение TypeError).",
    explanation: "Символ нельзя неявно склеить со строкой через `+`.",
  },
  {
    id: "q-t31",
    prompt: "Что выведет код?",
    code: `let x = 1;
function f(a = x, x = 2) {
  return a;
}
console.log(f());`,
    answer: "`ReferenceError` (параметр `x` в TDZ при вычислении default для `a`).",
    explanation: "Параметры по умолчанию живут в отдельной области; порядок и TDZ важны.",
  },
  {
    id: "q-t32",
    prompt: "Что выведет код?",
    code: `console.log('b' + 'a' + + 'a' + 'a');
console.log('a' > 'B');`,
    answer: "`baNaNa` и `true` (обычно).",
    explanation: "`+'a'` → NaN; сравнение строк — по кодам Unicode, строчная латиница после прописной.",
  },
];
