import type { JsTopicTask } from "../jsTopicTypes";

const core: JsTopicTask[] = [
  {
    id: "pr1",
    prompt: "Что выведет код?",
    code: `Promise.resolve(1)
  .then((x) => x + 1)
  .then((x) => console.log(x));`,
    answer: "`2`.",
    explanation: "Цепочка `then` передаёт возвращаемое значение следующему обработчику.",
  },
  {
    id: "pr2",
    prompt: "Что выведет код?",
    code: `Promise.resolve(1)
  .then((x) => {
    throw x + 1;
  })
  .catch((e) => console.log(e))
  .then(() => console.log("ok"));`,
    answer: "`2`, затем `ok`.",
    explanation:
      "После `catch` цепочка снова в fulfilled; следующий `then` выполняется.",
  },
  {
    id: "pr3",
    prompt: "Что выведет код?",
    code: `Promise.reject("e")
  .catch(() => 10)
  .then((x) => console.log(x));`,
    answer: "`10`.",
    explanation: "`catch` может вернуть успешное значение для дальнейших `then`.",
  },
  {
    id: "pr4",
    prompt: "Что выведет код?",
    code: `Promise.resolve()
  .then(() => {
    throw 1;
  })
  .catch(() => 2)
  .catch(() => 3)
  .then((x) => console.log(x));`,
    answer: "`2`.",
    explanation: "Первый `catch` обрабатывает ошибку; второй `catch` не нужен.",
  },
  {
    id: "pr5",
    prompt: "Что выведет код?",
    code: `Promise.resolve(1)
  .finally(() => console.log("f"))
  .then((x) => console.log(x));`,
    answer: "`f`, затем `1`.",
    explanation:
      "`finally` выполняется перед продолжением; возвращаемое значение из `finally` обычно не подменяет результат (кроме случая с throw/ожиданием).",
  },
  {
    id: "pr6",
    prompt: "Что выведет код?",
    code: `Promise.all([
  Promise.resolve(1),
  Promise.resolve(2),
]).then((a) => console.log(a.join("")));`,
    answer: "`12` (строка из массива `[1,2]`).",
    explanation: "`Promise.all` ждёт все успешные и возвращает массив значений.",
  },
  {
    id: "pr7",
    prompt: "Что выведет код?",
    code: `Promise.all([
  Promise.resolve(1),
  Promise.reject("x"),
  Promise.resolve(2),
]).catch((e) => console.log(e));`,
    answer: "`x`.",
    explanation: "Любой reject в `all` отклоняет весь `all` с первой ошибкой.",
  },
  {
    id: "pr8",
    prompt: "Что выведет код?",
    code: `Promise.allSettled([
  Promise.resolve(1),
  Promise.reject("e"),
]).then((r) => console.log(r.length, r[1].status));`,
    answer: "`2` и `rejected`.",
    explanation: "`allSettled` не прерывается на reject; каждый элемент имеет `status`.",
  },
  {
    id: "pr9",
    prompt: "Что выведет код?",
    code: `Promise.race([
  new Promise((r) => setTimeout(() => r("slow"), 50)),
  Promise.resolve("fast"),
]).then(console.log);`,
    answer: "`fast`.",
    explanation: "Первый выполнившийся промис определяет результат `race`.",
  },
  {
    id: "pr10",
    prompt: "Что выведет код?",
    code: `Promise.any([
  Promise.reject("a"),
  Promise.reject("b"),
  Promise.resolve(1),
]).then(console.log);`,
    answer: "`1`.",
    explanation: "`any` ждёт первый fulfilled; отклоняется только если все отклонились.",
  },
  {
    id: "pr11",
    prompt: "Что выведет код?",
    code: `async function f() {
  return 1;
}
f().then(console.log);`,
    answer: "`1`.",
    explanation: "`async` функция возвращает промис, разрешённый возвращаемым значением.",
  },
  {
    id: "pr12",
    prompt: "Что выведет код?",
    code: `async function f() {
  throw 2;
}
f().catch(console.log);`,
    answer: "`2`.",
    explanation: "Исключение в `async` отклоняет возвращённый промис.",
  },
  {
    id: "pr13",
    prompt: "Что выведет код?",
    code: `async function f() {
  const x = await Promise.resolve(3);
  return x + 1;
}
f().then(console.log);`,
    answer: "`4`.",
    explanation: "`await` разворачивает промис; после продолжения возвращается `4`.",
  },
  {
    id: "pr14",
    prompt: "Что выведет код?",
    code: `async function f() {
  try {
    await Promise.reject("z");
  } catch (e) {
    console.log(e);
  }
}
f();`,
    answer: "`z`.",
    explanation: "Отклонённый промис в `await` бросает в `try/catch` локально.",
  },
  {
    id: "pr15",
    prompt: "Что выведет код?",
    code: `const p = new Promise((resolve) => {
  resolve(Promise.resolve(5));
});
p.then(console.log);`,
    answer: "`5` (развёрнутое значение).",
    explanation:
      "Если `resolve` вызывают с thenable, движок «выпрямляет» вложенный промис.",
  },
  {
    id: "pr16",
    prompt: "Что выведет код?",
    code: `let p = Promise.resolve("a");
p = p.then(() => {
  throw "b";
});
p = p.catch(() => "c");
p.then(console.log);`,
    answer: "`c`.",
    explanation: "Цепочка переназначений всё равно последовательно обрабатывает состояния.",
  },
  {
    id: "pr17",
    prompt: "Что выведет код?",
    code: `Promise.resolve()
  .then(() => Promise.resolve(7))
  .then(console.log);`,
    answer: "`7`.",
    explanation: "Возврат промиса из `then` сливается (flatten) в цепочку.",
  },
  {
    id: "pr18",
    prompt: "Что выведет код?",
    code: `async function a() {
  const x = await 9;
  return x;
}
a().then(console.log);`,
    answer: "`9`.",
    explanation: "`await` на не-thenable оборачивает в разрешённый промис.",
  },
  {
    id: "pr19",
    prompt: "Что выведет код?",
    code: `function delay(ms) {
  return new Promise((r) => setTimeout(() => r(ms), ms));
}
Promise.all([delay(10), delay(5)]).then((a) => console.log(a[1]));`,
    answer: "`5`.",
    explanation: "`all` сохраняет порядок результатов независимо от времени завершения.",
  },
  {
    id: "pr20",
    prompt: "Что выведет код?",
    code: `Promise.resolve(1)
  .then()
  .then((x) => console.log(x));`,
    answer: "`1`.",
    explanation: "Пропущенный `then` ведёт себя как тождественная передача значения.",
  },
  {
    id: "pr21",
    prompt: "Что выведет код?",
    code: `const p = Promise.reject();
p.catch(() => {});
p.catch(() => console.log("second"));`,
    answer: "Ничего — второй `catch` не вызывается.",
    explanation: "Ошибка уже обработана первым `catch`; цепочка восстановлена.",
  },
  {
    id: "pr22",
    prompt: "Что выведет код?",
    code: `Promise.reject()
  .catch(() => {
    throw 1;
  })
  .catch((e) => console.log(e));`,
    answer: "`1`.",
    explanation: "Новая ошибка из `catch` идёт в следующий `catch`.",
  },
  {
    id: "pr23",
    prompt: "Что выведет код?",
    code: `async function f() {
  console.log("a");
  await Promise.resolve();
  console.log("b");
}
console.log("c");
f();
console.log("d");`,
    answer: "`c`, `a`, `d`, `b`.",
    explanation: "Тот же порядок, что и у микрозадач после `await`: синхронная часть, затем продолжение.",
  },
  {
    id: "pr24",
    prompt: "Что выведет код?",
    code: `Promise.resolve(1)
  .then((x) => {
    return new Promise((r) => setTimeout(() => r(x + 1), 0));
  })
  .then(console.log);`,
    answer: "Через макрозадачу выведется `2`.",
    explanation: "Возврат отложенного промиса откладывает следующий `then` до его разрешения.",
  },
  {
    id: "pr25",
    prompt: "Что выведет код?",
    code: `const a = Promise.resolve(1);
a.then(() => 2);
a.then(console.log);`,
    answer: "`1`.",
    explanation: "Два независимых `then` на одном промисе; первый не меняет `a`.",
  },
  {
    id: "pr26",
    prompt: "Что выведет код?",
    code: `Promise.resolve()
  .then(() => {
    return Promise.reject("x");
  })
  .catch((e) => console.log(e));`,
    answer: "`x`.",
    explanation: "Отклонение из `then` попадает в ближайший последующий `catch`.",
  },
  {
    id: "pr27",
    prompt: "Что выведет код?",
    code: `async function f() {
  return Promise.resolve(8);
}
f().then(console.log);`,
    answer: "`8` (ещё одно выпрямление).",
    explanation: "`async` оборачивает возвращаемый промис без лишней вложенности.",
  },
  {
    id: "pr28",
    prompt: "Что выведет код?",
    code: `Promise.all([]).then((a) => console.log(a.length));`,
    answer: "`0`.",
    explanation: "Пустой `all` сразу разрешается пустым массивом.",
  },
  {
    id: "pr29",
    prompt: "Что выведет код?",
    code: `Promise.race([]).then(
  () => {},
  () => console.log("never")
);`,
    answer: "Ничего не выводится — `race` с пустым массивом остаётся навсегда pending.",
    explanation: "Нет конкурентов, некому разрешить гонку.",
  },
  {
    id: "pr30",
    prompt: "Что выведет код?",
    code: `async function outer() {
  const inner = async () => 5;
  return await inner();
}
outer().then(console.log);`,
    answer: "`5`.",
    explanation: "`await` на результат `inner()` разворачивает промис.",
  },
];

const extra: JsTopicTask[] = [];
for (let i = 0; i < 20; i++) {
  const a = i + 1;
  const b = i + 2;
  extra.push({
    id: `pr${31 + i}`,
    prompt: `Задача ${31 + i}: чему равен результат \`Promise.all\`?`,
    code: `Promise.all([Promise.resolve(${a}), Promise.resolve(${b})]).then((r) =>
  console.log(r[0] + r[1])
);`,
    answer: `\`${a + b}\`.`,
    explanation:
      "Оба промиса fulfilled; `all` возвращает массив значений в исходном порядке.",
  });
}

export const PROMISES_TASKS: JsTopicTask[] = [...core, ...extra];
