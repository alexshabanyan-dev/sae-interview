import type { JsTopicTask } from "../jsTopicTypes";

export const MEMOIZATION_TASKS: JsTopicTask[] = [
  {
    id: "mm1",
    prompt: "Что выведет код?",
    code: `function outer(...a) {
  return function inner(...b) {
    console.log(a, b);
  };
}
const f = outer(1);
f(2, 3);`,
    answer: "`[1]` и `[2, 3]`.",
    explanation:
      "`outer(1)` один раз: rest собрал `[1]` во внешний `a`. `f(2,3)` вызывает inner — его `b` это `[2,3]`. Замыкание держит `a`.",
  },
  {
    id: "mm2",
    prompt: "Что выведет код?",
    code: `const add = (a, b) => a + b;
function wrap(fn) {
  return function (...args) {
    return fn(...args);
  };
}
console.log(wrap(add)(4, 5));`,
    answer: "`9`.",
    explanation:
      "`wrap(add)` вернула обёртку; вызов с `(4,5)` дал `args=[4,5]`, spread передал в `add`.",
  },
  {
    id: "mm3",
    prompt: "Что выведет код?",
    code: `function id(...x) {
  return x;
}
console.log(id(10).length);`,
    answer: "`1`.",
    explanation: "`x` — массив из одного элемента `[10]`, длина 1.",
  },
  {
    id: "mm4",
    prompt: "Что выведет код?",
    code: `const nums = [1, 2, 3];
function sum(a, b, c) {
  return a + b + c;
}
console.log(sum(...nums));`,
    answer: "`6`.",
    explanation: "Spread развернул массив в три аргумента `sum(1,2,3)`.",
  },
  {
    id: "mm5",
    prompt: "Что произойдёт при выполнении?",
    code: `function demo() {
  console.log(typeof args);
}
demo(1);`,
    answer: "`ReferenceError: args is not defined` (в модуле / strict).",
    explanation:
      "Без параметра `...args` переменной `args` нет — это не автоматический объект `arguments` у стрелки (у стрелки его вообще нет).",
  },
  {
    id: "mm6",
    prompt: "После `const m = memoize(f);` вызвали только `m(1)`. Сколько раз выполнился `memoize`?",
    answer: "Один раз — при присваивании `m = memoize(f)`.",
    explanation:
      "`memoize` — это вызов фабрики; дальше вызывается только возвращённая обёртка `m`.",
  },
  {
    id: "mm7",
    prompt: "Почему `JSON.stringify([{a:1}])` и `JSON.stringify([{a:1}])` дают одинаковую строку для разных объектов в массиве?",
    answer: "Сериализация смотрит на **структуру и значения**, не на ссылку.",
    explanation: "Два разных объекта `{a:1}` дают один и тот же JSON — ключ кэша совпадёт.",
  },
  {
    id: "mm8",
    prompt: "`[1,2]` и `[2,1]` при `JSON.stringify` для ключа — одинаковы?",
    answer: "Нет, строки разные: порядок элементов в JSON отличается.",
    explanation: "Для мемоизации по условию задачи это **разные** вызовы.",
  },
  {
    id: "mm9",
    prompt: "Мемоизировали `Date.now`. Хорошая идея?",
    answer: "Обычно нет — результат зависит от времени, аргументы пустые, кэш «залипнет».",
    explanation: "Мемоизация для **чистых** функций с одинаковым результатом при тех же входах.",
  },
  {
    id: "mm10",
    prompt: "Два вызова `memoize(add)` подряд без сохранения результата — сколько обёрток создано?",
    answer: "Две (если не присвоили в переменную — обе могут стать недостижимыми, но объекты функций создались).",
    explanation: "Каждый вызов `memoize` — новый `cache` и новая внутренняя функция.",
  },
  {
    id: "mm11",
    prompt: "Что выведет код?",
    code: `function tag(...parts) {
  return parts.join("-");
}
console.log(tag("a", "b", "c"));`,
    answer: "`a-b-c`.",
    explanation: "Rest собрал три строки в массив, `join` склеил.",
  },
  {
    id: "mm12",
    prompt: "`fn.apply(null, [2,3])` эквивалентно?",
    answer: "`fn(2, 3)` при `this === null` (в strict) или глобальный объект в нестрогом.",
    explanation: "`apply` вторым аргументом принимает массив аргументов — как spread.",
  },
  {
    id: "mm13",
    prompt: "Обёртка `return function(...args){ return fn.apply(this, args); }` — зачем `this`?",
    answer: "Пробросить контекст вызова обёртки в оригинал (как у метода объекта).",
    explanation: "Иначе `fn(...args)` потеряет привязку `this` при передаче метода.",
  },
  {
    id: "mm14",
    prompt: "Первый вызов `m(1,2)` вызвал `fn`, второй `m(1,2)` — нет. Где хранится результат?",
    answer: "В структуре в замыкании (Map или объект), общей для всех вызовов этой обёртки.",
    explanation: "Один экземпляр обёртки — один кэш.",
  },
  {
    id: "mm15",
    prompt: "Можно ли мемоизировать функцию с побочным эффектом `console.log` внутри?",
    answer: "Технически да, но второй вызов с тем же ключом **не выполнит** лог снова.",
    explanation: "Побочный эффект «пропадёт» — частая ловушка.",
  },
  {
    id: "mm16",
    prompt: "Что выведет код?",
    code: `const a = [1, 2];
const b = [...a, 3];
console.log(b);`,
    answer: "`[1, 2, 3]` — новый массив.",
    explanation: "Spread в литерале массива копирует элементы `a` в новый массив.",
  },
  {
    id: "mm17",
    prompt: "`arguments` у стрелочной функции есть?",
    answer: "Нет своего `arguments`; нужен rest `...args` или обычная `function`.",
    explanation: "На собесах любят контраст стрелки и `function`.",
  },
  {
    id: "mm18",
    prompt: "Почему ключ только `String(arg1)` плох для объекта?",
    answer: "Два разных объекта дадут `[object Object]` — коллизия ключей.",
    explanation: "Нужна сериализация содержимого или deep equal (дороже).",
  },
  {
    id: "mm19",
    prompt: "useMemo без массива зависимостей во втором аргументе (старый API) — что напоминает?",
    answer: "Пересчёт каждый рендер — мемоизация не работает; актуальный API — массив deps.",
    explanation: "Исторически путали с реальным `memoize` по аргументам вызова.",
  },
  {
    id: "mm20",
    prompt: "Итого одной фразой: откуда `args` берёт значения при `memoizedAdd(1,2)`?",
    answer: "Из **аргументов вызова** обёртки — движок связывает позиционные аргументы с rest-параметром `...args`.",
    explanation: "Никакой передачи «из memoize» — только из скобок при вызове `memoizedAdd`.",
  },
];
