import type { JsTopicTask } from "../jsTopicTypes";

const base: JsTopicTask[] = [
  {
    id: "el1",
    prompt: "Что выведет код? В каком порядке?",
    code: `console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");`,
    answer: "`1`, `4`, `3`, `2`.",
    explanation:
      "Сначала весь синхронный код (`1`, `4`). Потом микрозадачи: колбэк `then` → `3`. Затем макрозадача `setTimeout` → `2`.",
  },
  {
    id: "el2",
    prompt: "Что выведет код?",
    code: `Promise.resolve().then(() => console.log("A"));
queueMicrotask(() => console.log("B"));
console.log("C");`,
    answer: "`C`, `A`, `B`.",
    explanation:
      "Синхронно `C`. Оба остальных — микрозадачи: сначала выполняется `then` промиса (`A`), затем `queueMicrotask` (`B`) — в порядке постановки в очередь микрозадач.",
  },
  {
    id: "el3",
    prompt: "Что выведет код?",
    code: `async function f() {
  console.log("a");
  await Promise.resolve();
  console.log("b");
}
console.log("start");
f();
console.log("end");`,
    answer: "`start`, `a`, `end`, `b`.",
    explanation:
      "`await` откладывает продолжение `f` в микрозадачу. Синхронная часть `f` печатает `a`, затем выполняется оставшийся синхронный код снаружи (`end`), после чего микрозадача с `b`.",
  },
  {
    id: "el4",
    prompt: "Что выведет код?",
    code: `setTimeout(() => console.log("t"), 0);
Promise.resolve()
  .then(() => console.log("p1"))
  .then(() => console.log("p2"));
console.log("s");`,
    answer: "`s`, `p1`, `p2`, `t`.",
    explanation:
      "Синхронно `s`. Цепочка `then` даёт две микрозадачи подряд. `setTimeout` — макрозадача, выполнится после опустошения микроочереди.",
  },
  {
    id: "el5",
    prompt: "Что выведет код?",
    code: `Promise.resolve()
  .then(() => {
    console.log("x");
    return Promise.resolve();
  })
  .then(() => console.log("y"));
console.log("z");`,
    answer: "`z`, `x`, `y`.",
    explanation:
      "После `z` первая микрозадача печатает `x` и возвращает промис; следующий `then` ставится в микроочередь и выполняется после разрешения вложенного промиса — всё ещё до следующей макрозадачи.",
  },
  {
    id: "el6",
    prompt: "Что выведет код?",
    code: `console.log("A");
setTimeout(() => console.log("B"), 0);
setTimeout(() => console.log("C"), 0);
Promise.resolve().then(() => console.log("D"));
console.log("E");`,
    answer: "`A`, `E`, `D`, `B`, `C` (два таймера в порядке постановки).",
    explanation:
      "Синхронно A E; микрозадача D; затем макрозадачи таймеров в порядке регистрации.",
  },
  {
    id: "el7",
    prompt: "Что выведет код?",
    code: `for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    answer: "`0`, `1`, `2` (по одному на таймер, в порядке таймеров).",
    explanation:
      "Каждый колбэк замыкается на своё `let i`. Таймеры с одинаковой задержкой выполняются в порядке создания.",
  },
  {
    id: "el8",
    prompt: "Что выведет код?",
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    answer: "Три раза `3`.",
    explanation:
      "Одна переменная `var i`; к моменту срабатывания таймеров цикл завершён и `i === 3`.",
  },
  {
    id: "el9",
    prompt: "Что выведет код?",
    code: `Promise.resolve()
  .then(() => console.log("1"))
  .then(() => {
    throw new Error("x");
  })
  .then(() => console.log("2"))
  .catch(() => console.log("3"))
  .then(() => console.log("4"));`,
    answer: "`1`, `3`, `4`.",
    explanation:
      "Ошибка пропускает следующий `then` и попадает в `catch`. После `catch` цепочка продолжается успешным `then` → `4`.",
  },
  {
    id: "el10",
    prompt: "Что выведет код?",
    code: `console.log("x");
requestAnimationFrame(() => console.log("r"));
Promise.resolve().then(() => console.log("p"));
console.log("y");`,
    answer: "Зависит от окружения; в браузере обычно `x`, `y`, `p`, затем кадр — `r` (микрозадачи до отрисовки).",
    explanation:
      "`requestAnimationFrame` — отдельная фаза перед перерисовкой; микрозадачи промиса выполняются раньше, чем колбэк rAF в типичном цикле рендера.",
  },
  {
    id: "el11",
    prompt: "Что выведет код?",
    code: `setTimeout(() => console.log("a"), 0);
Promise.reject().catch(() => console.log("b"));
queueMicrotask(() => console.log("c"));
console.log("d");`,
    answer: "`d`, `b`, `c`, `a`.",
    explanation:
      "Синхронно `d`. Сначала в микроочередь попадает обработчик отклонённого промиса (`b`), затем `queueMicrotask` (`c`) — в порядке регистрации. После опустошения микроочереди выполняется макрозадача таймера (`a`).",
  },
  {
    id: "el12",
    prompt: "Упростим: что выведет код?",
    code: `console.log("d");
queueMicrotask(() => console.log("c"));
Promise.resolve().then(() => console.log("b"));
console.log("e");`,
    answer: "`d`, `e`, `c`, `b`.",
    explanation:
      "Сначала регистрируется `queueMicrotask`, потом `then` — микрозадачи выполняются в порядке FIFO: `c`, затем `b`.",
  },
  {
    id: "el13",
    prompt: "Что выведет код?",
    code: `async function g() {
  console.log(1);
  await null;
  console.log(2);
}
g();
console.log(3);`,
    answer: "`1`, `3`, `2`.",
    explanation:
      "`await null` превращает продолжение в микрозадачу; синхронная часть `g` и внешний код завершаются до `2`.",
  },
  {
    id: "el14",
    prompt: "Что выведет код?",
    code: `setTimeout(() => {
  console.log("t");
  Promise.resolve().then(() => console.log("p"));
}, 0);
setTimeout(() => console.log("u"), 0);`,
    answer: "`t`, `p`, `u`.",
    explanation:
      "Первый таймер: синхронно `t`, микрозадача `p` выполняется до следующей макрозадачи. Затем второй таймер → `u`.",
  },
  {
    id: "el15",
    prompt: "Что выведет код?",
    code: `Promise.resolve()
  .then(() => {
    setTimeout(() => console.log("A"), 0);
  })
  .then(() => console.log("B"));
Promise.resolve().then(() => console.log("C"));`,
    answer: "`B`, `C`, затем `A`.",
    explanation:
      "Оба первых `then` — микрозадачи: порядок B и C по регистрации цепочек. Внутри первого `then` ставится только таймер — он макрозадача после микроочереди.",
  },
  {
    id: "el16",
    prompt: "Что выведет код?",
    code: `console.log(0);
setImmediate?.(() => console.log("im"));
setTimeout(() => console.log("to"), 0);
Promise.resolve().then(() => console.log("pr"));
console.log(1);`,
    answer: "В браузере без `setImmediate`: `0`, `1`, `pr`, `to`. В Node может отличаться порядок таймеров/immediate.",
    explanation:
      "`setImmediate` есть в Node.js, не в браузере. В браузере — микро `pr`, потом `setTimeout`.",
  },
  {
    id: "el17",
    prompt: "Что выведет код? (браузер)",
    code: `console.log(0);
setTimeout(() => console.log("to"), 0);
Promise.resolve().then(() => console.log("pr"));
console.log(1);`,
    answer: "`0`, `1`, `pr`, `to`.",
    explanation: "Классика: синхронно, микрозадача промиса, макрозадача таймера.",
  },
  {
    id: "el18",
    prompt: "Что выведет код?",
    code: `let x = 0;
setTimeout(() => {
  x = 1;
  console.log(x);
}, 0);
x = 2;
console.log(x);`,
    answer: "Сначала `2`, затем `1`.",
    explanation:
      "Синхронно печатается текущее `x`. Таймер выполняется позже и видит обновлённое замыкание на переменную `x`.",
  },
  {
    id: "el19",
    prompt: "Что выведет код?",
    code: `function foo() {
  console.log("f");
  bar();
  console.log("z");
}
function bar() {
  queueMicrotask(() => console.log("m"));
  console.log("b");
}
foo();`,
    answer: "`f`, `b`, `z`, `m`.",
    explanation:
      "`queueMicrotask` не прерывает текущий синхронный стек; `m` после завершения всего синхронного кода.",
  },
  {
    id: "el20",
    prompt: "Что выведет код?",
    code: `Promise.resolve(1)
  .then((v) => {
    console.log(v);
    return v + 1;
  })
  .then((v) => {
    console.log(v);
    throw v;
  })
  .catch((e) => console.log("c", e))
  .finally(() => console.log("fin"));`,
    answer: "`1`, `2`, `c 2`, `fin`.",
    explanation:
      "`finally` выполняется после `catch` и не меняет разрешённое значение для следующих `then` (если бы они были).",
  },
];

const orderVariants: JsTopicTask[] = [
  {
    id: "el21",
    prompt: "Порядок вывода?",
    code: `console.log("S1");
Promise.resolve().then(() => console.log("M1"));
console.log("S2");`,
    answer: "`S1`, `S2`, `M1`.",
    explanation: "Микрозадача после всего синхронного блока.",
  },
  {
    id: "el22",
    prompt: "Порядок вывода?",
    code: `setTimeout(() => console.log("T"), 0);
queueMicrotask(() => console.log("Q"));
console.log("S");`,
    answer: "`S`, `Q`, `T`.",
    explanation: "Микрозадача раньше любой макрозадачи с нулевой задержкой.",
  },
  {
    id: "el23",
    prompt: "Порядок вывода?",
    code: `Promise.resolve().then(() => console.log("A"));
Promise.resolve().then(() => console.log("B"));
Promise.resolve().then(() => console.log("C"));`,
    answer: "`A`, `B`, `C`.",
    explanation:
      "Три независимых микрозадачи на одном «тике» выполняются в порядке постановки в очередь.",
  },
  {
    id: "el24",
    prompt: "Порядок вывода? (уточнение для V8/Chrome)",
    code: `const p = Promise.resolve();
p.then(() => console.log("1"));
p.then(() => console.log("2"));`,
    answer: "`1`, затем `2`.",
    explanation: "Два `then` на одном промисе — микрозадачи в порядке регистрации.",
  },
  {
    id: "el25",
    prompt: "Что выведет код?",
    code: `new Promise((resolve) => {
  console.log("exe");
  resolve();
}).then(() => console.log("then"));
console.log("after");`,
    answer: "`exe`, `after`, `then`.",
    explanation:
      "Исполнитель промиса синхронен до `resolve`; `then` — микрозадача.",
  },
  {
    id: "el26",
    prompt: "Что выведет код?",
    code: `async function a() {
  console.log("in");
}
async function b() {
  await a();
  console.log("out");
}
b();
console.log("main");`,
    answer: "`in`, `main`, `out`.",
    explanation:
      "`await a()` вызывает `a` синхронно до первого await внутри `a` (его нет) — печатается `in`. Продолжение `b` откладывается; `main`, затем микрозадача `out`.",
  },
  {
    id: "el27",
    prompt: "Что выведет код?",
    code: `setTimeout(() => console.log(1), 10);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));`,
    answer: "`3`, `2`, `1`.",
    explanation:
      "Сначала микро, затем таймер 0 ms, затем таймер 10 ms (все макрозадачи после микро).",
  },
  {
    id: "el28",
    prompt: "Что выведет код?",
    code: `let i = 0;
const id = setInterval(() => {
  console.log(++i);
  if (i === 2) clearInterval(id);
}, 0);`,
    answer: "`1` и `2` (два срабатывания).",
    explanation:
      "`setInterval` с 0 ставит повторяющиеся макрозадачи; `clearInterval` останавливает после второго вывода.",
  },
  {
    id: "el29",
    prompt: "Что выведет код?",
    code: `Promise.resolve()
  .then(() => {
    throw new Error("e");
  })
  .catch(() => 42)
  .then((x) => console.log(x));`,
    answer: "`42`.",
    explanation:
      "`catch` возвращает успешное значение 42; следующий `then` получает его.",
  },
  {
    id: "el30",
    prompt: "Что выведет код?",
    code: `const p = new Promise(() => {});
p.then(() => console.log("x"));
console.log("y");`,
    answer: "`y` (и никогда `x`).",
    explanation: "Промис не разрешён — колбэк `then` не ставится в очередь.",
  },
];

const more: JsTopicTask[] = [];
const labels = "ABCDEFGHIJKLMNOPQRSTUV".split("");
for (let n = 0; n < 20; n++) {
  const L1 = labels[n % 22];
  const L2 = labels[(n + 1) % 22];
  const L3 = labels[(n + 2) % 22];
  more.push({
    id: `el${31 + n}`,
    prompt: `Задача ${n + 31}: порядок трёх логов после синхронного блока (микро vs макро).`,
    code: `console.log("${L1}");
setTimeout(() => console.log("${L2}"), 0);
Promise.resolve().then(() => console.log("${L3}"));
console.log("${L1}${L1}");`,
    answer: `\`${L1}\`, \`${L1}${L1}\`, \`${L3}\`, \`${L2}\`.`,
    explanation:
      "Синхронный вывод первым, затем все микрозадачи промисов, затем макрозадача `setTimeout`.",
  });
}

export const EVENT_LOOP_TASKS: JsTopicTask[] = [...base, ...orderVariants, ...more];
