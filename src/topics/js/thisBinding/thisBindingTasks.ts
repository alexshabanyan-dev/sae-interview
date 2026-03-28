import type { JsTopicTask } from "../jsTopicTypes";

const core: JsTopicTask[] = [
  {
    id: "th1",
    prompt: "Что выведет код (strict mode)?",
    code: `"use strict";
function f() {
  return this;
}
console.log(f());`,
    answer: "`undefined`.",
    explanation:
      "При обычном вызове `f()` в strict mode `this` не подставляется глобальный объект.",
  },
  {
    id: "th2",
    prompt: "Что выведет код (без strict в среде, где есть глобальный объект)?",
    code: `function f() {
  return this;
}
console.log(typeof f());`,
    answer: "Часто `\"object\"` (браузер) или `\"undefined\"` в модулях/ESM.",
    explanation:
      "В non-strict loose mode `this` мог бы быть `window`; в модулях код уже strict. На собесе уточняй контекст.",
  },
  {
    id: "th3",
    prompt: "Что выведет код?",
    code: `const obj = {
  name: "x",
  m() {
    return this.name;
  },
};
console.log(obj.m());`,
    answer: "`x`.",
    explanation: "Неявная привязка: `this` — базовый объект вызова `obj`.",
  },
  {
    id: "th4",
    prompt: "Что выведет код?",
    code: `const obj = {
  name: "x",
  m() {
    return this.name;
  },
};
const g = obj.m;
console.log(g());`,
    answer: "`undefined` в strict (или из модулей).",
    explanation:
      "Вызов `g()` без базы — как обычная функция, теряется неявный `this`.",
  },
  {
    id: "th5",
    prompt: "Что выведет код?",
    code: `const obj = {
  name: "x",
  m() {
    return this.name;
  },
};
console.log(obj["m"]());`,
    answer: "`x`.",
    explanation: "Квадратные скобки всё равно вызывают метод с базой `obj`.",
  },
  {
    id: "th6",
    prompt: "Что выведет код?",
    code: `function f() {
  return this.a;
}
const o = { a: 1, f };
console.log(o.f());`,
    answer: "`1`.",
    explanation: "Свойство `f` вызывается как метод `o`, `this === o`.",
  },
  {
    id: "th7",
    prompt: "Что выведет код?",
    code: `const o = { x: 1 };
function f() {
  return this.x;
}
console.log(f.call(o));`,
    answer: "`1`.",
    explanation: "Явная привязка: `call` задаёт `this` на время вызова.",
  },
  {
    id: "th8",
    prompt: "Что выведет код?",
    code: `function f(a, b) {
  return this.n + a + b;
}
const ctx = { n: 10 };
console.log(f.apply(ctx, [1, 2]));`,
    answer: "`13`.",
    explanation: "`apply` принимает массив аргументов и явный `this`.",
  },
  {
    id: "th9",
    prompt: "Что выведет код?",
    code: `function f() {
  return this.v;
}
const b = f.bind({ v: 5 });
console.log(b());`,
    answer: "`5`.",
    explanation: "`bind` создаёт функцию с зафиксированным `this`.",
  },
  {
    id: "th10",
    prompt: "Что выведет код?",
    code: `function f() {
  return this.x;
}
const o1 = { x: 1, f };
const o2 = { x: 2 };
console.log(o1.f.call(o2));`,
    answer: "`2`.",
    explanation: "`call` переопределяет `this` сильнее, чем способ вызова через `o1.f`.",
  },
  {
    id: "th11",
    prompt: "Что выведет код?",
    code: `function C() {
  this.n = 1;
}
const x = new C();
console.log(x.n);`,
    answer: "`1`.",
    explanation: "При `new` `this` — новый объект; конструктор инициализирует поля.",
  },
  {
    id: "th12",
    prompt: "Что выведет код?",
    code: `function C() {
  return { n: 2 };
}
const x = new C();
console.log(x.n);`,
    answer: "`2`.",
    explanation:
      "Если конструктор возвращает объект, он подменяет результат `new`.",
  },
  {
    id: "th13",
    prompt: "Что выведет код?",
    code: `function C() {
  return 3;
}
const x = new C();
console.log(x);`,
    answer: "Пустой объект (или экземпляр `C`), не число `3`.",
    explanation:
      "Примитивное возвращаемое значение из конструктора игнорируется при `new`.",
  },
  {
    id: "th14",
    prompt: "Что выведет код?",
    code: `const o = {
  x: 1,
  f: () => this?.x ?? "no",
};
console.log(o.f());`,
    answer: "Лексический `this` из внешней области (модуль/undefined), не `o.x`.",
    explanation:
      "Стрелочные функции не имеют собственного `this`; берут из окружения, где созданы — не из `o`.",
  },
  {
    id: "th15",
    prompt: "Что выведет код (в обычном скрипте браузера, не модуль)?",
    code: `const o = {
  x: 1,
  m() {
    const g = () => this.x;
    return g();
  },
};
console.log(o.m());`,
    answer: "`1`.",
    explanation:
      "Стрелка захватывает `this` из `m`, где `this === o` на момент вызова `m`.",
  },
  {
    id: "th16",
    prompt: "Что выведет код?",
    code: `class A {
  x = 10;
  m() {
    return this.x;
  }
}
console.log(new A().m());`,
    answer: "`10`.",
    explanation: "Метод класса — обычная функция с неявным `this` при вызове как метода.",
  },
  {
    id: "th17",
    prompt: "Что выведет код?",
    code: `class A {
  x = 10;
  m = () => this.x;
}
const a = new A();
const h = a.m;
console.log(h());`,
    answer: "`10`.",
    explanation:
      "Поле со стрелкой создаётся на экземпляре и лексически биндит `this` к экземпляру.",
  },
  {
    id: "th18",
    prompt: "Что выведет код?",
    code: `const o = {
  a: 1,
  b: {
    c: 2,
    d() {
      return this.c + this.a;
    },
  },
};
console.log(o.b.d());`,
    answer: "`NaN` или ошибка доступа: `this.a` — `undefined`.",
    explanation:
      "`this` внутри `d` — это `o.b`, у него нет `a`; `undefined + 2` → `NaN`.",
  },
  {
    id: "th19",
    prompt: "Что вернёт `sum.call(null, 1, 2, 3)`?",
    code: `function sum() {
  return Array.from(arguments).reduce((a, b) => a + b, 0);
}
console.log(sum.call(null, 1, 2, 3));`,
    answer: "`6` — `this` в теле `sum` не используется.",
    explanation:
      "`call` задаёт `this`, но аргументы попадают в `arguments` независимо от использования `this` в теле.",
  },
  {
    id: "th20",
    prompt: "Что выведет код?",
    code: `const obj = {
  count: 0,
  inc() {
    this.count++;
    return this;
  },
};
obj.inc().inc();
console.log(obj.count);`,
    answer: "`2`.",
    explanation: "Цепочка вызовов: каждый `inc` с неявным `this === obj`.",
  },
  {
    id: "th21",
    prompt: "Что выведет код?",
    code: `function Tag(tag) {
  this.tag = tag;
}
Tag.prototype.wrap = function (s) {
  return "[" + this.tag + "] " + s;
};
const t = new Tag("id");
console.log(t.wrap("x"));`,
    answer: "`[id] x`.",
    explanation: "Метод на прототипе вызывается с `this` экземпляра.",
  },
  {
    id: "th22",
    prompt: "Что выведет код?",
    code: `function Tag(tag) {
  this.tag = tag;
}
Tag.prototype.wrap = function (s) {
  return "[" + this.tag + "] " + s;
};
const w = new Tag("id").wrap;
console.log(w("x"));`,
    answer: "`TypeError`: чтение `this.tag` при `this === undefined` (strict).",
    explanation: "Извлечённый метод теряет `this`; нужен `bind` или обёртка.",
  },
  {
    id: "th23",
    prompt: "Что выведет код?",
    code: `const handler = {
  n: 5,
  onClick(e) {
    return this.n + e;
  },
};
const fn = handler.onClick.bind(handler, 2);
console.log(fn());`,
    answer: "`7`.",
    explanation: "`bind` фиксирует `this` и частично применяет аргумент `2` как `e`.",
  },
  {
    id: "th24",
    prompt: "Что выведет код?",
    code: `const a = [1, 2, 3];
console.log(Math.max.apply(null, a));`,
    answer: "`3`.",
    explanation: "`apply` с `null`/`undefined` как `this` допустим для функций, не использующих `this` (в strict).",
  },
  {
    id: "th25",
    prompt: "Что выведет код?",
    code: `function outer() {
  return () => this.x;
}
const o = { x: 1, f: outer.call({ x: 2 }) };
console.log(o.f());`,
    answer: "`2`.",
    explanation:
      "Стрелка создаётся при вызове `outer` с `this` из `call`, и запоминает это лексическое `this`.",
  },
  {
    id: "th26",
    prompt: "Что выведет код?",
    code: `"use strict";
const o = {};
Object.defineProperty(o, "m", {
  value: function () {
    return this === o;
  },
});
console.log(o.m());`,
    answer: "`true`.",
    explanation: "Обычная функция как значение свойства — при `o.m()` база `o`.",
  },
  {
    id: "th27",
    prompt: "Что выведет код?",
    code: `"use strict";
function show() {
  console.log(this === undefined);
}
show.call(undefined);`,
    answer: "`true`.",
    explanation:
      "В strict `call(undefined)` не подменяет `this` глобальным объектом.",
  },
  {
    id: "th28",
    prompt: "Уточнение для strict: что будет?",
    code: `"use strict";
(function () {
  console.log(this);
})();`,
    answer: "`undefined`.",
    explanation: "IIFE без базы — обычный вызов функции в strict.",
  },
  {
    id: "th29",
    prompt: "Что выведет код?",
    code: `const api = {
  base: "/v1",
  get(path) {
    return this.base + path;
  },
};
const routes = { base: "/v2", fetch: api.get };
console.log(routes.fetch("/u"));`,
    answer: "`/v2/u` — `this` внутри `get` это `routes`.",
    explanation:
      "Метод передан как значение и вызван как `routes.fetch`, поэтому `this.base` из `routes`.",
  },
  {
    id: "th30",
    prompt: "Как исправить, чтобы был `/v1/u`?",
    code: `const api = {
  base: "/v1",
  get(path) {
    return this.base + path;
  },
};
const routes = { base: "/v2", fetch: api.get };
// исправление?
console.log(api.get.bind(api)("/u"));`,
    answer: "`/v1/u` при использовании `api.get.bind(api)` или `fetch: (...a) => api.get(...a)`.",
    explanation: "Явно зафиксировать `this` или обернуть в стрелку.",
  },
];

const extra: JsTopicTask[] = [];
for (let i = 0; i < 20; i++) {
  const k = i + 31;
  extra.push({
    id: `th${k}`,
    prompt: `Задача ${k}: потеря контекста — что выведет \`h()\`?`,
    code: `const o = { v: ${i}, m() { return this.v; } };
const h = o.m;
console.log(h());`,
    answer: "`undefined` (strict/модуль).",
    explanation:
      "Сообщение повторяется для тренировки: извлечённый метод вызывается без базы — неявный `this` теряется.",
  });
}

export const THIS_BINDING_TASKS: JsTopicTask[] = [...core, ...extra];