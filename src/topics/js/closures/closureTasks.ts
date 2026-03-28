export type ClosureTask = {
  id: string;
  prompt: string;
  code?: string;
  answer: string;
  explanation: string;
  solutionCode?: string;
  answerSectionTitle?: string;
  explanationSectionTitle?: string;
};

export const CLOSURE_TASKS: ClosureTask[] = [
  {
    id: "t1",
    prompt: "Что выведет код? Объясни через замыкание.",
    code: `function outer() {
  let x = 1;
  return function inner() {
    console.log(x);
    x += 1;
  };
}
const a = outer();
const b = outer();
a();
a();
b();`,
    answer: "В консоли: `1`, затем `2`, затем `1`.",
    explanation:
      "Каждый вызов `outer()` создаёт новое окружение со своим `x`. У `a` и `b` разные замыкания. У `a` после двух вызовов `x` стал 2; у `b` при первом вызове печатается начальное `1`.",
  },
  {
    id: "t2",
    prompt: "Что выведет цикл с `var`? Как исправить одним словом?",
    code: `const fns = [];
for (var i = 0; i < 3; i++) {
  fns.push(() => console.log(i));
}
fns.forEach((fn) => fn());`,
    answer: "Три раза `3`. Исправление: заменить `var` на `let` (или IIFE / функцию-обёртку).",
    explanation:
      "Одна общая переменная `i` на все итерации. К моменту вызова функций цикл уже закончился, `i === 3`. С `let` на каждой итерации новая привязка в своём блоке.",
  },
  {
    id: "t3",
    prompt: "Что выведет тот же цикл с `let`?",
    code: `const fns = [];
for (let i = 0; i < 3; i++) {
  fns.push(() => console.log(i));
}
fns.forEach((fn) => fn());`,
    answer: "`0`, `1`, `2` (в порядке вызовов `forEach`).",
    explanation: "Каждая стрелочная функция замыкается на свой экземпляр `i` для данной итерации блока.",
  },
  {
    id: "t4",
    prompt: "Что выведет `createCounter`?",
    code: `function createCounter() {
  let n = 0;
  return () => ++n;
}
const c1 = createCounter();
const c2 = createCounter();
console.log(c1(), c1(), c2(), c1(), c2());`,
    answer: "`1, 2, 1, 3, 2` (пять чисел в одном `console.log`).",
    explanation: "Два независимых счётчика: два вызова `createCounter()` — два разных `n` в разных окружениях.",
  },
  {
    id: "t5",
    prompt: "Что вернёт `adder(5)(3)`? Как устроено замыкание?",
    code: `function adder(a) {
  return function (b) {
    return a + b;
  };
}
console.log(adder(5)(3));`,
    answer: "`8`.",
    explanation:
      "Внутренняя функция помнит `a = 5` из вызова `adder(5)`. Каррирование: каждый вызов внешней функции фиксирует своё `a`.",
  },
  {
    id: "t6",
    prompt: "Что выведет код с переназначением во внешней функции?",
    code: `function f() {
  let x = 10;
  const g = () => console.log(x);
  x = 20;
  return g;
}
f()();`,
    answer: "`20`.",
    explanation:
      "Замыкание хранит привязку к переменной `x`, а не снимок на момент создания `g`. При вызове читается текущее значение `x`.",
  },
  {
    id: "t7",
    prompt: "Что выведет асинхронный цикл с `var`?",
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    answer: "Три раза `3`.",
    explanation:
      "Таймеры видят финальное значение `i` после цикла. С `let` в заголовке цикла каждый `setTimeout` замкнулся бы на своё `i`.",
  },
  {
    id: "t8",
    prompt:
      "Реализуй «однократный» вызов: `once(fn)` вызывает `fn` только при первом обращении. Что хранит замыкание?",
    code: `function once(fn) {
  // ...
}`,
    answerSectionTitle: "Идея ответа",
    answer: "Флаг «уже вызывали» и при необходимости результат первого вызова — в переменных внутри `once`.",
    solutionCode: `function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}`,
    explanation:
      "Замыкание держит `called` и `result` между вызовами возвращённой функции.",
  },
  {
    id: "t9",
    prompt: "Что выведет код? Почему замыкание «видит» изменение поля?",
    code: `function outer() {
  const obj = { v: 1 };
  const inner = () => console.log(obj.v);
  obj.v = 2;
  return inner;
}
outer()();`,
    answer: "`2`.",
    explanation:
      "Замыкание держит ссылку на объект `obj`. Пока объект тот же, изменение `obj.v` до вызова `inner` видно при чтении.",
  },
  {
    id: "t10",
    prompt: "Почему при выполнении будет ошибка? Как связаны блок `let` и замыкание?",
    code: `function test() {
  if (true) {
    let x = 1;
  }
  return () => console.log(x);
}
test()();`,
    answer:
      "`ReferenceError: x is not defined`: у возвращаемой функции нет доступа к `x`, он существует только внутри блока `if`.",
    explanation:
      "Лексическое окружение вложенной функции ссылается на тело `test`, а не на блок `if`. Объяви `x` в теле `test` или верни внутреннюю функцию из того же блока, где объявлен `x`.",
  },
  {
    id: "t11",
    prompt: "Что вернёт выражение и что покажет второй вызов?",
    code: `const f = (function () {
  let n = 0;
  return () => ++n;
})();
console.log(f(), f());`,
    answer: "`1` и `2`.",
    explanation:
      "IIFE выполняется один раз, возвращает функцию с замыканием на одно и то же `n`. Каждый вызов `f` увеличивает общий счётчик.",
  },
  {
    id: "t12",
    prompt: "Что выведет код?",
    code: `function make() {
  const arr = [];
  for (var i = 0; i < 3; i++) {
    arr.push(() => i);
  }
  return arr;
}
make().forEach((fn) => console.log(fn()));`,
    answer: "Три раза `3`.",
    explanation: "Та же проблема, что и с массивом функций: одна переменная `var i` на все итерации.",
  },
  {
    id: "t13",
    prompt: "Что выведет цикл `for...of` с `let` и `setTimeout`?",
    code: `for (let i of [0, 1, 2]) {
  setTimeout(() => console.log(i), 0);
}`,
    answer: "`0`, `1`, `2` (порядок таймеров обычно совпадает с порядком постановки).",
    explanation:
      "На каждой итерации `for...of` создаётся новая привязка `let i` для значения элемента, и колбэк замыкается на своё значение.",
  },
  {
    id: "t14",
    prompt: "Что выведет код?",
    code: `let x = 1;
function a() {
  console.log(x);
  let x = 2;
}
a();`,
    answer: "`ReferenceError` (обращение к `x` до инициализации в той же области — TDZ).",
    explanation:
      "Внутри `a` объявление `let x` затеняет внешнее; до входа в TDZ нельзя читать `x`. К замыканиям это слабо относится, но часто спрашивают вместе с областями видимости.",
  },
  {
    id: "t15",
    prompt: "Что выведет код?",
    code: `const fns = [];
for (let i = 0; i < 3; i++) {
  fns.push(() => console.log(i));
  i += 1;
}
fns.forEach((fn) => fn());`,
    answer: "`0` и `2` (два вызова).",
    explanation:
      "Цикл с шагом через `i += 1` в теле: итераций меньше. Для каждой итерации своё замыкание на `let i`.",
  },
  {
    id: "t16",
    prompt: "Один объект или два разных?",
    code: `function box(v) {
  return {
    get: () => v,
    set: (x) => {
      v = x;
    },
  };
}
const b = box(1);
b.set(2);
console.log(b.get());`,
    answer: "`2`.",
    explanation:
      "Методы разделяют одно замыкание на переменную `v`; сеттер и геттер работают с одним и тем же скрытым состоянием.",
  },
  {
    id: "t17",
    prompt: "Что выведет сравнение?",
    code: `function outer() {
  const f = () => 1;
  const g = () => 1;
  return f === g;
}
console.log(outer());`,
    answer: "`false`.",
    explanation:
      "Каждый литерал стрелочной функции — новый объект функции. Равенство ссылок не гарантируется.",
  },
  {
    id: "t18",
    prompt: "Что выведет код?",
    code: `function f(x = 0) {
  return () => x++;
}
const a = f(5);
const b = f(5);
console.log(a(), a(), b());`,
    answer: "`5`, `6`, `5`.",
    explanation:
      "Параметр `x` — отдельное состояние для каждого вызова `f`; два замыкания независимы.",
  },
  {
    id: "t19",
    prompt: "Что выведет код?",
    code: `function makeArr() {
  const a = [];
  for (let i = 0; i < 3; i++) {
    a[i] = function () {
      return i;
    };
  }
  return a;
}
console.log(makeArr().map((f) => f()));`,
    answer: "`[0, 1, 2]`.",
    explanation:
      "Каждая ячейка массива получает функцию, замкнутую на своё `i` из соответствующей итерации `let`.",
  },
  {
    id: "t20",
    prompt: "Что выведет `reduce`?",
    code: `const r = [1, 2, 3].reduce(
  (acc, n) => {
    return () => acc() + n;
  },
  () => 0
);
console.log(r());`,
    answer: "`6`.",
    explanation:
      "Колбэки `reduce` создают цепочку замыканий: каждый уровень помнит предыдущий `acc` и текущее `n`.",
  },
  {
    id: "t21",
    prompt: "Что выведет код?",
    code: `let f;
if (true) {
  let x = 1;
  f = () => x;
}
console.log(f());`,
    answer: "`1`.",
    explanation:
      "Функция `f` создана внутри блока `if` и замыкается на `x` из того же блока; после выхода из блока внешнему коду `x` недоступен, но `f` сохраняет доступ.",
  },
  {
    id: "t22",
    prompt: "Что выведет код?",
    code: `function seq() {
  let n = 0;
  return {
    next: () => ++n,
    reset: () => {
      n = 0;
    },
  };
}
const s = seq();
console.log(s.next(), s.next(), s.reset(), s.next());`,
    answer: "`1`, `2`, `undefined`, `1`.",
    explanation:
      "`reset` обнуляет то же `n` в замыкании; `console.log` выводит возвращаемые значения и `undefined` от `reset`.",
  },
  {
    id: "t23",
    prompt: "Что выведет код?",
    code: `const g = (function (start) {
  let x = start;
  return {
    inc: (d) => (x += d),
    val: () => x,
  };
})(10);
g.inc(5);
console.log(g.val());`,
    answer: "`15`.",
    explanation: "IIFE фиксирует начальное значение и возвращает объект с методами, разделяющими одно `x`.",
  },
  {
    id: "t24",
    prompt: "Что выведет код?",
    code: `function outer() {
  const xs = [1, 2, 3];
  return () => xs.push(xs.length + 1);
}
const h = outer();
h();
console.log(h());`,
    answer: "Первый вызов `h` мутирует массив; второй возвращает новую длину. В консоли будет `5` (результат второго `push`).",
    explanation:
      "Замыкание держит ссылку на один массив `xs`; методы массива меняют его на месте.",
  },
  {
    id: "t25",
    prompt: "Что выведет код?",
    code: `function f() {
  const o = { a: 1 };
  return [
    () => o,
    () => {
      o = { a: 2 };
    },
  ];
}
const [get, set] = f();
set();
console.log(get().a);`,
    answer: "`TypeError`: переназначение `const o` (в модулях/strict — при выполнении второй функции).",
    explanation:
      "Если бы было `let o`, после `set` `get().a` было бы `2`. С `const` присвоение `o = { a: 2 }` запрещено.",
  },
  {
    id: "t26",
    prompt: "Что выведет код (случай с `let`)?",
    code: `function f() {
  let o = { a: 1 };
  return [
    () => o,
    () => {
      o = { a: 2 };
    },
  ];
}
const [get, set] = f();
set();
console.log(get().a);`,
    answer: "`2`.",
    explanation:
      "Замыкание хранит привязку к `let o`; после присвоения нового объекта `get` читает уже обновлённую ссылку.",
  },
  {
    id: "t27",
    prompt: "Что выведет код?",
    code: `const fs = [];
for (let i = 0; i < 3; i++) {
  fs.push(
    ((j) => () => console.log(j))(i)
  );
}
fs.forEach((f) => f());`,
    answer: "`0`, `1`, `2`.",
    explanation:
      "IIFE с параметром `j` создаёт новое окружение на каждой итерации; внутренняя функция замыкается на переданное значение `i`.",
  },
  {
    id: "t28",
    prompt: "Что выведет код?",
    code: `function wrap(msg) {
  return function log() {
    console.log(msg);
    msg += "!";
  };
}
const a = wrap("hi");
const b = wrap("hi");
a();
b();
a();`,
    answer: "`hi`, `hi`, `hi!!`.",
    explanation:
      "У `a` и `b` разные замыкания и разные строки `msg`; у `a` после первого вызова `msg` стало `hi!`, третий вызов печатает `hi!!`.",
  },
  {
    id: "t29",
    prompt: "Что выведет код?",
    code: `function count() {
  let n = 0;
  return {
    inc: () => ++n,
    dec: () => --n,
    get n() {
      return n;
    },
  };
}
const c = count();
c.inc();
c.inc();
console.log(c.n);`,
    answer: "`2`.",
    explanation: "Геттер `n` читает то же замкнутое `n`, что и методы `inc`/`dec`.",
  },
  {
    id: "t30",
    prompt: "Что выведет код?",
    code: `const handlers = [];
for (var i = 0; i < 3; i++) {
  handlers.push(() => i);
}
console.log(handlers.map((h) => h()).join(","));`,
    answer: "`3,3,3`.",
    explanation: "Снова одна `var i` на все колбэки.",
  },
  {
    id: "t31",
    prompt: "Что выведет код?",
    code: `function tag(prefix) {
  return (s) => prefix + ": " + s;
}
const err = tag("ERR");
const ok = tag("OK");
console.log(err("a"), ok("b"));`,
    answer: "`ERR: a` и `OK: b`.",
    explanation: "Две фабрики с разными замкнутыми `prefix`.",
  },
  {
    id: "t32",
    prompt: "Что выведет код?",
    code: `let i = 10;
const fs = [];
while (i < 13) {
  const j = i;
  fs.push(() => j);
  i++;
}
console.log(fs.map((f) => f()).join(","));`,
    answer: "`10,11,12`.",
    explanation:
      "На каждой итерации `const j` — новая привязка; стрелочные функции захватывают своё `j`.",
  },
  {
    id: "t33",
    prompt: "Что покажет `console.log` — число или функция?",
    code: `const g = (x) => () => (y) => x + y;
const h = g(2)(3);
console.log(h);`,
    answer:
      "Функция `(y) => x + y` (в консоли обычно как `ƒ` или исходный текст), не число `5`.",
    explanation:
      "`g(2)` возвращает функцию без параметров `() => (y) => 2 + y`. Вызов `g(2)(3)` передаёт `3` в эту функцию, лишний аргумент игнорируется, возвращается `(y) => 2 + y`. Чтобы получить `5`, нужно было бы `g(2)()(3)` или схема `const g = (x) => (y) => x + y`.",
  },
  {
    id: "t34",
    prompt: "Что выведет код?",
    code: `const g = (x) => (y) => x + y;
console.log(g(2)(3));`,
    answer: "`5`.",
    explanation: "Классическое каррирование: два последовательных вызова и одно замыкание на `x`, второе на `y`.",
  },
  {
    id: "t35",
    prompt: "Что выведет код?",
    code: `function outer() {
  let a = 1;
  function inner() {
    console.log(a);
    let a = 2;
  }
  return inner;
}
outer()();`,
    answer: "`ReferenceError` (TDZ: обращение к `a` до объявления `let a` внутри `inner`).",
    explanation:
      "Локальное `let a` затеняет внешнее; до выполнения инициализации `let` переменную нельзя читать.",
  },
  {
    id: "t36",
    prompt: "Что выведет код?",
    code: `const fs = Array.from({ length: 3 }, (_, i) => () => i);
console.log(fs.map((f) => f()).join(","));`,
    answer: "`0,1,2`.",
    explanation:
      "Каждый элемент массива — новая функция со своим `i` из колбэка `Array.from`.",
  },
  {
    id: "t37",
    prompt: "Что выведет код?",
    code: `function f(a) {
  return function g(b) {
    return function h(c) {
      return a + b + c;
    };
  };
}
console.log(f(1)(2)(3));`,
    answer: "`6`.",
    explanation: "Три уровня замыканий: `h` видит `a`, `b` и `c`.",
  },
  {
    id: "t38",
    prompt: "Что выведет код?",
    code: `const obj = {
  name: "a",
  m() {
    const f = () => this.name;
    return f();
  },
};
console.log(obj.m());`,
    answer: "`a` (стрелка берёт `this` из лексического окружения `m`, где `this` — `obj`).",
    explanation:
      "Замыкание стрелки не «ломает» `this`: оно ссылается на `this` метода `m` в момент вызова `m()`.",
  },
  {
    id: "t39",
    prompt: "Что выведет код?",
    code: `const obj = {
  name: "a",
  m() {
    const f = function () {
      return this.name;
    };
    return f();
  },
};
console.log(obj.m());`,
    answer: "`undefined` (в strict mode) или глобальное имя в non-strict — но не `\"a\"` при обычном вызове.",
    explanation:
      "Обычная `function` получает `this` при вызове; `f()` — вызов без базового объекта, `this` не `obj`.",
  },
  {
    id: "t40",
    prompt: "Что выведет код?",
    code: `function make(delay) {
  let id;
  return function schedule(fn) {
    clearTimeout(id);
    id = setTimeout(fn, delay);
  };
}
const s = make(100);
s(() => console.log(1));
s(() => console.log(2));`,
    answer: "Через ~100 ms выведется только `2` (второй вызов отменил таймер первого).",
    explanation:
      "`id` и `delay` живут в одном замыкании; повторный `schedule` перезаписывает `id` и сбрасывает предыдущий таймер.",
  },
  {
    id: "t41",
    prompt: "Что выведет код?",
    code: `function sum(a) {
  return function (b) {
    if (b === undefined) return a;
    return sum(a + b);
  };
}
console.log(sum(1)(2)(3)());`,
    answer: "`6`.",
    explanation:
      "Рекурсивное каррирование: каждый вызов с числом возвращает новую функцию с накопленной суммой в замыкании; вызов без аргумента завершает цепочку (здесь `()` передаёт `undefined`).",
  },
  {
    id: "t42",
    prompt: "Что выведет код?",
    code: `let f = () => 1;
f = (() => {
  let g = () => 1;
  return () => g();
})();
console.log(f());`,
    answer: "`1`.",
    explanation:
      "IIFE возвращает функцию, замкнутую на `g`; внешняя переназначение `f` не ломает внутреннее замыкание.",
  },
  {
    id: "t43",
    prompt: "Что выведет код?",
    code: `const cache = new Map();
function cached(fn) {
  return (x) => {
    if (cache.has(x)) return cache.get(x);
    const v = fn(x);
    cache.set(x, v);
    return v;
  };
}
const double = cached((n) => n * 2);
console.log(double(2), double(2));`,
    answer: "`4` и снова `4` (второй раз значение взят из `Map`).",
    explanation:
      "Замыкание на `cache` и `fn` разделяется между вызовами; мемоизация ускоряет повтор.",
  },
  {
    id: "t44",
    prompt: "Что выведет код?",
    code: `function outer() {
  try {
    let x = 1;
    return () => x;
  } catch (e) {
    return () => 0;
  }
}
console.log(outer()());`,
    answer: "`1`.",
    explanation: "Переменная `x` объявлена в `try`; возвращённая функция замыкается на это окружение.",
  },
  {
    id: "t45",
    prompt: "Что выведет код?",
    code: `function f() {
  const x = { n: 1 };
  const g = () => x.n++;
  const h = () => x.n;
  g();
  g();
  return h();
}
console.log(f());`,
    answer: "`3`.",
    explanation: "`g` и `h` делят одно замыкание на объект `x`; два инкремента дают `n === 3` перед `h()`.",
  },
  {
    id: "t46",
    prompt: "Что выведет код (`let` в `for...in`)?",
    code: `const a = [];
for (let k in { a: 1, b: 2 }) {
  a.push(() => k);
}
console.log(a.map((f) => f()).join(","));`,
    answer: "`a,b` (порядок ключей как в объекте при перечислении).",
    explanation:
      "Каждая итерация `for...in` с `let` создаёт новую привязку `k`; функции захватывают своё значение ключа.",
  },
  {
    id: "t47",
    prompt: "Что выведет код?",
    code: `let n = 0;
function tick() {
  n += 1;
  return () => n;
}
const a = tick();
const b = tick();
console.log(a(), b(), a());`,
    answer: "`2`, `2`, `2`.",
    explanation:
      "`n` одна на модуль: после `tick()` дважды значение `n` уже `2`. И `a`, и `b` возвращают функции, которые при вызове читают текущее `n`, поэтому все три вызова печатают `2`.",
  },
  {
    id: "t48",
    prompt: "Что выведет код?",
    code: `async function outer() {
  let x = 1;
  const inner = async () => {
    await Promise.resolve();
    return x;
  };
  x = 2;
  return inner();
}
outer().then(console.log);`,
    answer: "`2`.",
    explanation:
      "После `await` функция продолжает то же замыкание; читается текущее `x`, а не снимок на момент создания `inner`.",
  },
  {
    id: "t49",
    prompt: "Что выведет код?",
    code: `const priv = new WeakMap();
function User(name) {
  priv.set(this, { name });
}
User.prototype.getName = function () {
  return priv.get(this).name;
};
const u = new User("Ada");
console.log(u.getName());`,
    answer: "`Ada`.",
    explanation:
      "`WeakMap` снаружи не даёт прочитать данные без `this`; метод использует замыкание через `priv` и `this` — паттерн «псевдоприватных» полей.",
  },
  {
    id: "t50",
    prompt: "Что выведет код?",
    code: `function track() {
  const log = [];
  return {
    add(v) {
      log.push(v);
    },
    all() {
      return log.slice();
    },
  };
}
const t = track();
t.add(1);
t.add(2);
console.log(t.all().length, t.all()[1]);`,
    answer: "`2` и `2`.",
    explanation:
      "Массив `log` скрыт в замыкании; методы разделяют одно состояние, наружу отдаётся копия через `slice`.",
  },
];


