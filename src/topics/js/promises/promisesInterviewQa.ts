import type { JsTopicInterviewQa } from "../jsTopicTypes";

export const PROMISES_INTERVIEW_QA: JsTopicInterviewQa[] = [
  {
    id: "pr-1",
    question: "Что такое Promise и в каких трёх состояниях он может быть?",
    answer:
      "**Promise** — объект, представляющий **будущий** результат асинхронной операции. Состояния: **pending** (ожидание), **fulfilled** (успех, есть значение), **rejected** (ошибка, есть причина). Переход из pending **необратим**: один раз settled — состояние больше не меняется.",
  },
  {
    id: "pr-2",
    question: "Чем цепочка then отличается от вложенных колбэков?",
    answer:
      "Каждый then возвращает **новый** промис; можно **композировать** шаги и централизованно ловить ошибки через catch. Вложенные колбэки хуже читаются. Плюс then **сводит** вложенные промисы: возврат промиса из обработчика подключает его результат к цепочке.",
  },
  {
    id: "pr-3",
    question: "Зачем в then писать return перед промисом?",
    answer:
      "Без return внутренний вызов выполнится, но **внешняя** цепочка **не будет ждать** результат — следующий then получит undefined. Нужно **return p** или **return p.then(...)**.",
  },
  {
    id: "pr-4",
    question: "В чём разница между Promise.all и Promise.allSettled?",
    answer:
      "Promise.all успешен только если **все** промисы fulfilled; **любой** reject сразу отклоняет весь all. Promise.allSettled **ждёт все** и возвращает массив статусов: у каждого элемента есть status и либо value, либо reason.",
  },
  {
    id: "pr-5",
    question: "Что делает Promise.race? Подводный камень с пустым массивом?",
    answer:
      "Promise.race завершается **первым settled** промисом (успех или отказ). Если iterable **пустой**, промис **никогда** не settled — частая ловушка на собесах.",
  },
  {
    id: "pr-6",
    question: "Что такое async/await по сути?",
    answer:
      "Синтаксический **сахар** над промисами: async-функция всегда возвращает промис; await **приостанавливает** только текущую функцию. Ошибки после await ловят **try/catch**.",
  },
  {
    id: "pr-7",
    question: "Что такое unhandled rejection?",
    answer:
      "Если промис rejected без catch, среда шлёт событие **unhandledrejection**. В проде это логируют; в коде — завершать цепочку catch или try/catch вокруг await.",
  },
  {
    id: "pr-8",
    question: "Когда уместен return await внутри async-функции?",
    answer:
      "Внутри **try/catch**: return await p позволяет поймать отклонение p этим же catch. Просто return p не даст catch поймать отклонение локально. Вне try/catch часто пишут return p.",
  },
];
