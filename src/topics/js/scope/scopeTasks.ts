import type { JsTopicTask } from "../jsTopicTypes";

export const SCOPE_TASKS: JsTopicTask[] = [
  {
    id: "sc-t1",
    prompt: "Что выведет код?",
    code: `console.log(x);
var x = 1;`,
    answer: "`undefined` (ошибки нет: `var` поднят).",
    explanation: "`var x` поднимается; до присваивания значение `undefined`.",
  },
  {
    id: "sc-t2",
    prompt: "Что произойдёт?",
    code: `console.log(x);
let x = 1;`,
    answer: "`ReferenceError` (TDZ).",
    explanation: "До строки `let x` идентификатор в «мёртвой зоне».",
  },
  {
    id: "sc-t3",
    prompt: "Что выведет код?",
    code: `if (true) {
  var a = 1;
}
console.log(a);`,
    answer: "`1`.",
    explanation: "`var` не ограничен блоком `if` — область функции или скрипта.",
  },
  {
    id: "sc-t4",
    prompt: "Что произойдёт?",
    code: `if (true) {
  let b = 1;
}
console.log(b);`,
    answer: "`ReferenceError: b is not defined`.",
    explanation: "`let` ограничен блоком.",
  },
  {
    id: "sc-t5",
    prompt: "Что выведет код?",
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    answer: "Три раза `3`.",
    explanation: "Одна общая `var i`; таймеры срабатывают после цикла.",
  },
  {
    id: "sc-t6",
    prompt: "Что выведет код?",
    code: `for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    answer: "`0`, `1`, `2` (порядок вывода таймеров может плавать).",
    explanation: "Классический `for` с `let`: на каждой итерации своя привязка `i`.",
  },
  {
    id: "sc-t7",
    prompt: "Что выведет код?",
    code: `function f() {
  console.log(a);
  var a = 2;
  console.log(a);
}
f();`,
    answer: "`undefined`, затем `2`.",
    explanation: "`var a` в начале функции как `undefined`.",
  },
  {
    id: "sc-t8",
    prompt: "Что произойдёт?",
    code: `function f() {
  console.log(a);
  let a = 2;
}
f();`,
    answer: "`ReferenceError` (TDZ).",
    explanation: "Пока не выполнена строка `let a`, читать `a` нельзя.",
  },
  {
    id: "sc-t9",
    prompt: "Что выведет код?",
    code: `const o = { x: 1 };
o.x = 2;
console.log(o.x);`,
    answer: "`2`.",
    explanation: "`const` фиксирует ссылку, не свойства объекта.",
  },
  {
    id: "sc-t10",
    prompt: "Что произойдёт?",
    code: `const o = { x: 1 };
o = { x: 2 };`,
    answer: "`TypeError` (переприсвоение `const`).",
    explanation: "Имя `o` нельзя переназначить.",
  },
  {
    id: "sc-t11",
    prompt: "Что произойдёт?",
    code: `let x = 1;
function g() {
  console.log(x);
  let x = 2;
}
g();`,
    answer: "`ReferenceError` на первом `console.log`.",
    explanation: "Внутренний `let x` затеняет внешний; внешний `x` в этой точке недоступен (TDZ).",
  },
  {
    id: "sc-t12",
    prompt: "Что выведет код?",
    code: `let x = 1;
{
  let x = 2;
  console.log(x);
}
console.log(x);`,
    answer: "`2`, затем `1`.",
    explanation: "Внутренний блок — своя область для второго `x`.",
  },
  {
    id: "sc-t13",
    prompt: "Что произойдёт?",
    code: `function h(x = y, y = 1) {
  return x + y;
}
console.log(h());`,
    answer: "`ReferenceError` (обращение к `y` до инициализации).",
    explanation: "Параметры по умолчанию вычисляются слева направо в одной области.",
  },
  {
    id: "sc-t14",
    prompt: "Что произойдёт при парсинге?",
    code: `try {
  throw 1;
} catch (e) {
  let e = 2;
}`,
    answer: "**SyntaxError**: повторное объявление `e` в том же блоке `catch`.",
    explanation: "`e` уже привязка `catch`; второй `let e` недопустим вместе.",
  },
  {
    id: "sc-t15",
    prompt: "Что выведет код?",
    code: `try {
  throw 1;
} catch (e) {
  console.log(e);
}`,
    answer: "`1`.",
    explanation: "Отдельная область для параметра `catch`.",
  },
  {
    id: "sc-t16",
    prompt: "Что произойдёт?",
    code: `switch (1) {
  case 1:
    let x = 10;
}
console.log(x);`,
    answer: "`ReferenceError` — `x` снаружи `switch` не виден.",
    explanation: "Весь `switch` для `let` — один блочный контекст; наружу не выносится.",
  },
  {
    id: "sc-t17",
    prompt: "Почему два `case` с `let x` без `{}` часто ломают парсер?",
    code: `switch (0) {
  case 0:
    let x = 1;
    break;
  case 1:
    let x = 2;
}`,
    answer: "**SyntaxError** (одно имя `x` в одной области всего `switch`).",
    explanation: "Оборачивают: `case 0: { let x; break; }`.",
  },
  {
    id: "sc-t18",
    prompt: "Что выведет код?",
    code: `foo();
function foo() {
  console.log(1);
}`,
    answer: "`1`.",
    explanation: "Объявление функции поднимается целиком.",
  },
  {
    id: "sc-t19",
    prompt: "Что произойдёт?",
    code: `bar();
var bar = function () {
  console.log(1);
};`,
    answer: "`TypeError`: `bar` в момент вызова ещё `undefined`.",
    explanation: "Function expression не поднимается как тело; `var bar` — только имя.",
  },
  {
    id: "sc-t20",
    prompt: "Что выведет код?",
    code: `var x = 1;
function x() {}
console.log(typeof x);`,
    answer: "`number` (в такой записи победит инициализация переменной в типичных правилах).",
    explanation: "Не использовать в реальном коде; порядок `var` и `function` в одной области запутан.",
  },
  {
    id: "sc-t21",
    prompt: "Что выведет код?",
    code: `(() => {
  console.log(typeof notDeclaredAtAll);
})();`,
    answer: "`undefined`.",
    explanation: "Оператор `typeof` для необъявлённого имени не бросает ошибку и даёт `\"undefined\"`.",
  },
  {
    id: "sc-t22",
    prompt: "Что произойдёт?",
    code: `(() => {
  "use strict";
  notDeclaredAtAll = 1;
})();`,
    answer: "`ReferenceError`.",
    explanation: "Присваивание необъявленной переменной в strict — ошибка (в отличие от `typeof`).",
  },
  {
    id: "sc-t23",
    prompt: "Стрелка и фигурные скобки: что вернёт `f()`?",
    code: `const f = () => {
  x: 1;
};
console.log(f());`,
    answer: "`undefined` (тело — блок с меткой `x:`, не объект).",
    explanation: "Чтобы вернуть объект: `() => ({ x: 1 })`.",
  },
  {
    id: "sc-t24",
    prompt: "Что выведет код?",
    code: `var a = 1;
function outer() {
  console.log(a);
  var a = 2;
  console.log(a);
}
outer();`,
    answer: "`undefined`, `2`.",
    explanation: "Локальный `var a` поднимается и затеняет глобальный во всей функции.",
  },
  {
    id: "sc-t25",
    prompt: "Что произойдёт?",
    code: `let a = 1;
function outer() {
  console.log(a);
  let a = 2;
}
outer();`,
    answer: "`ReferenceError` (TDZ локального `let a`).",
    explanation: "Внешний `a` сюда не «пробивается».",
  },
  {
    id: "sc-t26",
    prompt: "Что выведет код?",
    code: `function f(a = 1, b = a) {
  return a + b;
}
console.log(f());`,
    answer: "`2`.",
    explanation: "Поздний параметр может ссылаться на ранний в той же шапке функции.",
  },
  {
    id: "sc-t27",
    prompt: "Что выведет код?",
    code: `function outer() {
  const x = {};
  function inner() {
    console.log(x.a);
    x.a = 1;
  }
  inner();
}
outer();`,
    answer: "`undefined` в `console.log` (свойства ещё нет).",
    explanation: "Одна ссылка на объект через замыкание; это не две разные `x`.",
  },
  {
    id: "sc-t28",
    prompt: "Что при парсинге?",
    code: `let x = 1;
let x = 2;`,
    answer: "**SyntaxError** (дубликат `let`).",
    explanation: "`var` в одной функции допустим повторно — плохая практика.",
  },
  {
    id: "sc-t29",
    prompt: "Что произойдёт?",
    code: `console.log(MyClass);
class MyClass {}`,
    answer: "`ReferenceError` (TDZ у class).",
    explanation: "`class` ведёт себя подобно `let` по доступу до объявления.",
  },
  {
    id: "sc-t30",
    prompt: "Что выведет код?",
    code: `const arr = [1, 2, 3];
for (const v of arr) {
  console.log(v);
}`,
    answer: "`1`, `2`, `3`.",
    explanation: "Каждая итерация создаёт новую привязку `const v`.",
  },
  {
    id: "sc-t31",
    prompt: "Что выведет код?",
    code: `var fns = [];
for (var k = 0; k < 3; k++) {
  fns.push(() => k);
}
console.log(fns.map((fn) => fn()).join(","));`,
    answer: "`3,3,3`.",
    explanation: "Одна `var k`; все функции читают финальное значение.",
  },
  {
    id: "sc-t32",
    prompt: "Как исправить предыдущую задачу без смены `var` на `let`?",
    code: `var fns = [];
for (var k = 0; k < 3; k++) {
  fns.push(((j) => () => j)(k));
}`,
    answer: "`0,1,2`.",
    explanation: "IIFE фиксирует текущее `k` в параметре `j` — отдельная область на шаг.",
  },
];
