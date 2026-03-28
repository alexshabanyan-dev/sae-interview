import { Alert, Anchor, Code, List, Text } from "@mantine/core";
import { CodeBlock } from "../../../components/CodeBlock";
import { Link } from "react-router-dom";
import { JsTopicSection } from "../../js/JsTopicDetailLayout";

export function PageLoadArticleContent() {
  return (
    <>
      <JsTopicSection title="1. О чём эта статья">
        <Text c="gray.2" lh={1.75}>
          Ты вводишь адрес в строку и жмёшь Enter — на экране в итоге появляется
          страница. Под капотом это <strong>цепочка подсистем</strong>: разбор URL,
          (часто) <strong>DNS</strong>, <strong>TCP</strong> или{" "}
          <strong>QUIC</strong>, <strong>TLS</strong>, <strong>HTTP</strong>,
          парсинг <strong>HTML</strong>, загрузка <strong>CSS и JS</strong>,
          построение <strong>DOM/CSSOM</strong>, расчёт геометрии (
          <strong>layout</strong>), <strong>отрисовка</strong> и{" "}
          <strong>композиция</strong> кадра. Цель текста — связать эти шаги в
          единую картину, чтобы не заучивать ответ «на собес», а понимать,{" "}
          <em>почему</em> браузер так устроен и где искать узкие места.
        </Text>
        <Alert color="gray" variant="light" mt="md">
          <Text size="sm" lh={1.65}>
            Реализации в Chrome, Firefox, Safari различаются в деталях (процессы,
            планировщики), но <strong>логика уровней</strong> (DNS → сокет → TLS →
            HTTP → парсинг → рендер) общая. Ниже — модель, достаточная для
            глубокого интервью и отладки.
          </Text>
        </Alert>
      </JsTopicSection>

      <JsTopicSection title="2. «Отображение» — это не один момент">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <strong>Первая отрисовка</strong> (First Paint / First Contentful
            Paint) — когда пользователь впервые видит что-то полезное, не обязательно
            весь контент.
          </List.Item>
          <List.Item>
            <strong>Интерактивность</strong> — когда основной поток свободен
            достаточно, чтобы обработать ввод (Time to Interactive в классических
            метриках; сейчас смотрят на связку Core Web Vitals и конкретные задачи).
          </List.Item>
          <List.Item>
            <strong>Полная загрузка</strong> — условное событие: загружены все
            ресурсы из разметки или сняты флаги «loading» (зависит от страницы и
            ленивой подгрузки).
          </List.Item>
        </List>
        <Text c="gray.2" lh={1.75} mt="sm">
          Поэтому «сайт отобразился» — фраза расплывчатая. На собеседовании полезно
          самому уточнять: речь про <strong>первый кадр</strong>, про{" "}
          <strong>LCP</strong> (крупнейший контент), про готовность к клику или про
          окончание сетевой активности.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="3. Архитектура браузера (упрощённо)">
        <Text c="gray.2" lh={1.75} mb="sm">
          Современный браузер — это <strong>несколько процессов</strong> (в Chromium:
          браузерный, GPU, сетевой сервис, рендерер на вкладку и др.). Для твоей
          цепочки важно разделить:
        </Text>
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <strong>UI / main thread в рендерере</strong> — парсинг HTML, часть
            JS, layout, часть paint; он же «узкий горлышко» для тяжёлых задач.
          </List.Item>
          <List.Item>
            <strong>Compositor thread</strong> — склейка слоёв, скролл без полного
            layout там, где это возможно.
          </List.Item>
          <List.Item>
            <strong>Network stack</strong> — DNS, сокеты, HTTP, кэш HTTP, иногда
            отдельный процесс/сервис.
          </List.Item>
          <List.Item>
            <strong>GPU process</strong> — растеризация, композиция некоторых слоёв.
          </List.Item>
        </List>
        <Text c="gray.2" lh={1.75} mt="sm">
          Именно поэтому «всё тормозит» может означать либо сеть, либо долгий JS на
          main thread, либо лишние layout/paint — разные вкладки Performance и
          Network в DevTools.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="4. Ввод URL и разбор адреса">
        <Text c="gray.2" lh={1.75}>
          Строка превращается в структуру URL по правилам WHATWG URL:{" "}
          <strong>схема</strong> (<Code>https</Code>), <strong>хост</strong>,{" "}
          <strong>порт</strong> (явный или по умолчанию: 443 для HTTPS, 80 для HTTP),{" "}
          <strong>путь</strong>, <strong>query</strong>, <strong>fragment</strong> (
          <Code>#</Code> — не уходит на сервер в HTTP-запросе, остаётся на клиенте).
        </Text>
        <Text c="gray.2" lh={1.75} mt="sm">
          Если пользователь ввёл только <Code>example.com</Code>, браузер подставит
          схему (часто <Code>https://</Code>), может нормализовать punycode для
          кириллических доменов, применить HSTS (см. ниже). Это ещё до сети — чистая
          логика клиента.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="5. Старт навигации и жизненный цикл документа">
        <Text c="gray.2" lh={1.75}>
          При переходе в том же табе старый документ может получить{" "}
          <Code>beforeunload</Code> / <Code>unload</Code> (осторожно: мешает
          bfcache). Новый документ проходит этапы загрузки, <Code>readystate</Code>,{" "}
          события <Code>DOMContentLoaded</Code> (HTML разобран, DOM построен; синхронные
          defer-скрипты уже отработали в типичном случае) и <Code>load</Code> (все
          ресурсы из разметки подгружены — упрощённо).
        </Text>
        <Text c="gray.2" lh={1.75} mt="sm">
          <strong>Navigation Timing API</strong> даёт поля вроде{" "}
          <Code>domainLookupStart/End</Code>, <Code>connectStart/End</Code>,{" "}
          <Code>responseStart</Code> — по ним видно, где «съели» время.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="6. DNS: имя хоста → IP">
        <Text c="gray.2" lh={1.75} mb="sm">
          Чтобы открыть TCP-соединение, нужен IP. Цепочка обычно такая:
        </Text>
        <List spacing="sm" c="gray.3" size="sm" type="ordered">
          <List.Item>
            <strong>Кэш браузера</strong> — недавние ответы могут вернуться мгновенно.
          </List.Item>
          <List.Item>
            <strong>Кэш ОС</strong> (stub resolver) — системный DNS-клиент.
          </List.Item>
          <List.Item>
            <strong>Рекурсивный резолвер</strong> (провайдер, 1.1.1.1, 8.8.8.8) —
            ходит по иерархии, если записи нет в кэше.
          </List.Item>
          <List.Item>
            <strong>Авторитетные серверы</strong> зоны — отдают SOA/A/AAAA/CNAME и
            т.д.
          </List.Item>
        </List>
        <Text c="gray.2" lh={1.75} mt="sm">
          Типичные записи: <strong>A</strong> (IPv4), <strong>AAAA</strong> (IPv6),{" "}
          <strong>CNAME</strong> (алиас — нужно ещё одно разрешение). <strong>TTL</strong>{" "}
          говорит, как долго можно кэшировать. <strong>DNS over HTTPS/TLS</strong>{" "}
          шифрует обращение к резолверу (приватность от локального сетевого
          прослушивания, не заменяет TLS к самому сайту).
        </Text>
      </JsTopicSection>

      <JsTopicSection title="7. TCP и порт">
        <Text c="gray.2" lh={1.75}>
          После известного IP клиент открывает <strong>TCP</strong>-сокет к паре (
          IP, порт ). Классическое рукопожатие: <strong>SYN</strong> →{" "}
          <strong>SYN-ACK</strong> → <strong>ACK</strong> — договорились о номерах
          последовательностей. Дальше поверх этого потока байт идёт либо сырой HTTP/1.1,
          либо TLS (HTTPS), либо сразу <strong>QUIC</strong> (HTTP/3) без классического
          «отдельного TCP» в привычном виде.
        </Text>
        <Text c="gray.2" lh={1.75} mt="sm">
          <strong>Head-of-line blocking</strong> в TCP: потерянный пакет задерживает
          весь поток; HTTP/2 мультиплексирует в одном TCP, но проблема остаётся на
          транспортном уровне — отсюда мотивация HTTP/3 с QUIC.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="8. TLS (для HTTPS)">
        <Text c="gray.2" lh={1.75}>
          Клиент шлёт <strong>ClientHello</strong> (версии TLS, шифры, SNI — имя
          хоста открытым текстом для выбора сертификата на shared IP). Сервер —{" "}
          <strong>ServerHello</strong>, сертификат, обмен ключами. После handshake
          весь HTTP идёт внутри зашифрованных TLS records.{" "}
          <strong>Session resumption</strong> (tickets) ускоряет повторные визиты.
        </Text>
        <Text c="gray.2" lh={1.75} mt="sm">
          <strong>HSTS</strong> — заголовок, заставляющий браузер всегда использовать
          HTTPS к хосту; уменьшает downgrade-атаки после первого успешного визита.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="9. HTTP: запрос документа и редиректы">
        <Text c="gray.2" lh={1.75}>
          Формируется запрос <Code>GET /path HTTP/1.1</Code> с заголовками{" "}
          <Code>Host</Code>, <Code>User-Agent</Code>, принимаемые типы и т.д. Ответ
          имеет статус: <strong>2xx</strong> — тело документа; <strong>3xx</strong> —{" "}
          <Code>Location</Code>, браузер может сделать новый запрос (цепочка редиректов
          видна в Network). <strong>Куки</strong> добавляются по правилам SameSite и
          пути — до генерации страницы на сервере они уже «учтены», если подходят.
        </Text>
        <Text c="gray.2" lh={1.75} mt="sm">
          <strong>TTFB</strong> (time to first byte) — от начала запроса до первого
          байта ответа: там и сеть, и очередь на сервере, и генерация HTML (SSR,
          шаблоны, БД).
        </Text>
        <Text c="gray.2" lh={1.75} mt="sm">
          Тело ответа часто сжимается (<Code>Content-Encoding: gzip</Code>,{" "}
          <Code>br</Code> для Brotli). Распаковка происходит на клиенте до парсера;
          слишком агрессивное сжатие на маленьких ответах не всегда выгодно — но для
          HTML/CSS/JS выигрыш обычно огромен.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="10. Поток HTML и инкрементальный парсер">
        <Text c="gray.2" lh={1.75}>
          Браузер <strong>не ждёт</strong> весь файл целиком, чтобы начать: поток
          байт превращается в токены, строится <strong>DOM</strong> дерево по мере
          прихода данных. Встретил тег — добавил узел; встретил текст — присоединил.
          Это позволяет раньше начать загрузку вложенных ресурсов и (ограниченно)
          рисовать.
        </Text>
        <Text c="gray.2" lh={1.75} mt="sm">
          В терминах спецификации HTML есть <strong>токенизация</strong> (state
          machine по байтам/символам) и <strong>древовидное построение</strong> с
          открытыми элементами, обработкой вложенности и «исправлением» ошибок
          разметки — в отличие от XML, HTML прощает многое и подставляет закрывающие
          теги по правилам. Поэтому «сломанный» HTML всё равно превращается в дерево,
          но порядок узлов может отличаться от ожидаемого новичком.
        </Text>
        <Text c="gray.2" lh={1.75} mt="sm">
          Если сервер отдаёт HTML <strong>чанками</strong> (chunked transfer), первые
          килобайты уже обрабатываются — это важно для SSR и длинных ответов: не нужно
          буферизовать весь документ на сервере, чтобы клиент начал парсить.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="11. Скрипты: почему ломают поток и как defer/async">
        <Text c="gray.2" lh={1.75} mb="sm">
          Классический <Code>&lt;script&gt;</Code> без атрибутов: парсер{" "}
          <strong>останавливается</strong>, скрипт запрашивается, выполняется
          синхронно — из‑за возможности <Code>document.write</Code> и побочных эффектов
          на DOM.
        </Text>
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <Code>defer</Code> — выполнение после разбора HTML, до{" "}
            <Code>DOMContentLoaded</Code>, в порядке документа.
          </List.Item>
          <List.Item>
            <Code>async</Code> — качается параллельно, выполняется когда скачался,
            порядок не гарантирован (для независимых скриптов).
          </List.Item>
          <List.Item>
            <Code>type=&quot;module&quot;</Code> — по умолчанию defer-подобное
            поведение, строгий режим, свой scope.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="12. CSS: CSSOM и блокирующие стили">
        <Text c="gray.2" lh={1.75}>
          Внешние таблицы стилей запрашиваются, парсятся в <strong>CSSOM</strong>. CSS
          может <strong>блокировать рендеринг</strong>, пока не известны правила,
          влияющие на видимость (браузер не хочет показывать «неправильный» стиль).
          Внутренние <Code>&lt;style&gt;</Code> тоже участвуют.{" "}
          <Code>@import</Code> в CSS добавляет водопад зависимостей.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="13. От DOM и CSSOM к дереву рендеринга">
        <Text c="gray.2" lh={1.75}>
          Не все DOM-узлы попадают в дерево для отрисовки (например,{" "}
          <Code>head</Code>, скрытые через <Code>display:none</Code> — по правилам не
          рисуются). Сочетание DOM + применимых стилей даёт{" "}
          <strong>render tree</strong> (терминология в учебниках; в реальных движках
          структуры богаче, но идея та же).
        </Text>
      </JsTopicSection>

      <JsTopicSection title="14. Layout (reflow)">
        <Text c="gray.2" lh={1.75}>
          Вычисляются размеры и позиции: поток документа (block/inline), flex/grid,
          float. Любое изменение геометрии может потребовать{" "}
          <strong>layout</strong> для затронутых поддеревьев. Чтение геометрии после
          записи стилей в одном кадре может вызвать{" "}
          <strong>forced synchronous layout</strong> — классическая ловушка
          производительности.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="15. Paint и слои">
        <Text c="gray.2" lh={1.75}>
          <strong>Paint</strong> — запись в bitmap-ы для регионов (что залить цветом,
          где текст, тени). Сложные элементы могут попасть на отдельные{" "}
          <strong>compositor layers</strong> (трансформы, opacity, will-change и
          др. — эвристики движка).
        </Text>
      </JsTopicSection>

      <JsTopicSection title="16. Composite">
        <Text c="gray.2" lh={1.75}>
          <strong>Compositor</strong> складывает слои в финальное изображение, часто
          с участием GPU. Анимации трансформаций на отдельном слое могут идти без
          полного пересчёта всей страницы на CPU.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="17. Загрузка подресурсов: очередь и приоритеты">
        <Text c="gray.2" lh={1.75}>
          Из HTML/CSS всплывают URL картинок, шрифтов, скриптов. Браузер ставит их в{" "}
          <strong>очередь</strong> с <strong>приоритетами</strong> (критический CSS,
          шрифты, изображения в viewport выше при поддержке). В HTTP/2 и HTTP/3
          много запросов идёт по мультиплексированным потокам; в HTTP/1.1 были лимиты
          параллельных соединений на хост — отсюда domain sharding в старом вебе.
        </Text>
        <Text c="gray.2" lh={1.75} mt="sm">
          Разметка и заголовки могут подсказать браузеру заранее:{" "}
          <Code>&lt;link rel=&quot;preconnect&quot;&gt;</Code> — заранее TCP+TLS к
          origin; <Code>dns-prefetch</Code> — только DNS; <Code>preload</Code> — высокий
          приоритет на критический ресурс (шрифт, hero-картинка);{" "}
          <Code>prefetch</Code> — низкий приоритет «на будущее». Это не магия: неправильный
          preload может навредить, забив полосу.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="18. Шрифты: FOUT и FOIT">
        <Text c="gray.2" lh={1.75}>
          Пока веб-шрифт не загружен, возможны <strong>FOIT</strong> (скрытый текст) или{" "}
          <strong>FOUT</strong> (мигание на fallback). <Code>font-display</Code> в{" "}
          <Code>@font-face</Code> управляет компромиссом. Это влияет на CLS и
          воспринимаемую скорость.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="19. Изображения и декодирование">
        <Text c="gray.2" lh={1.75}>
          Скачанные байты декодируются в растровое изображение; размер влияет на
          память и время. <Code>loading=&quot;lazy&quot;</Code> откладывает запрос для
          невидимых картинок. Форматы (AVIF/WebP/JPEG) — баланс веса и качества.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="20. Критический путь рендеринга (CRP)">
        <Text c="gray.2" lh={1.75}>
          Минимальный набор ресурсов и этапов до первой осмысленной отрисовки: HTML →
          блокирующий CSS → не блокирующий JS стратегически. Оптимизация — уменьшить
          критические байты, убрать блокировки, inline критический CSS (осторожно),
          preload ключевых ресурсов.
        </Text>
        <Text c="gray.2" lh={1.75} mt="sm">
          <strong>Core Web Vitals</strong> связывают UX с измеримыми величинами:{" "}
          <strong>LCP</strong> — когда отрисован крупнейший контент в вьюпорте (картинка,
          блок текста); <strong>INP</strong> — отзывчивость на ввод (после недавнего
          обновления метрик); <strong>CLS</strong> — сдвиги вёрстки. Они не заменяют
          понимание пайплайна, но дают язык для «быстро/медленно» на реальных пользователях.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="21. Service Worker">
        <Text c="gray.2" lh={1.75}>
          Если SW зарегистрирован, сетевые запросы могут перехватываться <em>до</em>{" "}
          сети: ответ из кэша или синтетический. Первая загрузка всё равно тянет SW и
          может установить кэш для офлайна и повторных визитов.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="22. bfcache">
        <Text c="gray.2" lh={1.75}>
          При навигации назад/вперёд страница может восстанавливаться из памяти без
          полного повторения цепочки. Обработчики <Code>unload</Code> и некоторые API
          могут мешать попаданию в bfcache.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="23. SPA и клиентский роутинг">
        <Text c="gray.2" lh={1.75}>
          В одностраничных приложениях первый визит похож на описанное выше; дальнейшие
          «переходы» часто меняют только <Code>history</Code> и подгружают JSON/чанки
          JS без полной перезагрузки документа — сеть и рендер другие, хотя devtools
          по-прежнему показывают XHR/fetch и задачи main thread.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="24. Как закрепить: DevTools и метрики">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <strong>Network</strong> — водопад, размер, очередь, протокол (h2/h3).
          </List.Item>
          <List.Item>
            <strong>Performance</strong> — flame chart: scripting, layout, paint,
            raster, GPU.
          </List.Item>
          <List.Item>
            <strong>Lighthouse / CWV</strong> — LCP, INP, CLS как ориентиры UX, не
            абсолютная истина.
          </List.Item>
        </List>
        <Text c="gray.2" lh={1.75} mt="sm">
          Открой любую страницу, перезагрузи с пустым кэшем (Disable cache), посмотри
          порядок запросов и длину задач на Main — это лучшее дополнение к теории.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="25. Связь с разделом про HTTP">
        <Text c="gray.2" lh={1.75}>
          Методы, заголовки, кэш, HTTP/2 и TLS подробнее разобраны в статье{" "}
          <Anchor component={Link} to="/topics/browser/http" c="cyan.3" fw={500}>
            «Протокол HTTP»
          </Anchor>{" "}
          в этом же разделе — держи её как справочник по сообщениям, здесь — сквозной
          сценарий «от строки до пикселей».
        </Text>
      </JsTopicSection>

      <JsTopicSection title="26. Где обычно «ломается» на практике">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <strong>Медленный DNS или далёкий резолвер</strong> — смена DNS, DoH,
            проверка TTL.
          </List.Item>
          <List.Item>
            <strong>Долгий TTFB</strong> — бэкенд, холодный серверлесс, N+1 в БД, без
            streaming HTML.
          </List.Item>
          <List.Item>
            <strong>Гигантский JS</strong> — долгий parse/compile на мобильном CPU,
            блокировка main thread до интерактива.
          </List.Item>
          <List.Item>
            <strong>Лишние layout</strong> — чтение offsetHeight в цикле после записи
            стилей, анимации свойств вроде width вместо transform.
          </List.Item>
          <List.Item>
            <strong>Шрифты и картинки без размеров</strong> — CLS, скачки вёрстки.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="27. Схема-памятка (текстом)">
        <CodeBlock>{`Enter → URL parse → (HSTS) → DNS? → TCP/QUIC
  → TLS (HTTPS) → HTTP (редиректы?) → HTML stream
  → parse DOM → CSS → CSSOM → render tree
  → layout → paint → composite → пиксели на экране
  (+ параллельно: JS, картинки, шрифты, SW)`}</CodeBlock>
      </JsTopicSection>
    </>
  );
}
