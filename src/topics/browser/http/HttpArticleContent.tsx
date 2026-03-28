import { Alert, Code, List, Table, Text, rem } from "@mantine/core";
import { CodeBlock } from "../../../components/CodeBlock";
import { JsTopicSection } from "../../js/JsTopicDetailLayout";

export function HttpArticleContent() {
  return (
    <>
      <JsTopicSection title="1. Что такое HTTP">
        <Text c="gray.2" lh={1.75}>
          <strong>HTTP</strong> (HyperText Transfer Protocol) — прикладной протокол
          обмена данными в архитектуре <strong>клиент–сервер</strong>. Клиент (чаще
          браузер или приложение) отправляет <strong>запрос</strong>; сервер
          возвращает <strong>ответ</strong>. Сообщения текстовые (в 1.x видимые
          «как есть») и состоят из стартовой строки, заголовков и опционального
          тела.
        </Text>
        <Text c="gray.2" lh={1.75} mt="sm">
          HTTP сам по себе <strong>не шифрует</strong> трафик — для этого поверх
          него используют <strong>TLS</strong> (тогда говорят <strong>HTTPS</strong>
          ). По умолчанию сервер не хранит «память» о прошлом запросе: протокол
          называют <strong>stateless</strong> — состояние сессии добавляют cookies,
          токены и серверные хранилища.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="2. Где HTTP в сетевом стеке">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <strong>Прикладной уровень</strong> — HTTP/HTTPS, WebSocket handshake.
          </List.Item>
          <List.Item>
            <strong>Транспорт</strong> — TCP (HTTP/1.x, HTTP/2) или QUIC поверх UDP (
            <strong>HTTP/3</strong>).
          </List.Item>
          <List.Item>
            <strong>Сеть</strong> — IP, маршрутизация.
          </List.Item>
          <List.Item>
            <strong>Канал</strong> — Ethernet, Wi‑Fi и т.д.
          </List.Item>
        </List>
        <Text c="gray.3" size="sm" mt="sm">
          Запомни: HTTP описывает <em>что</em> спросить и <em>как</em> интерпретировать
          ответ; доставку байтов обеспечивают уровни ниже.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="3. URI, URL и URN">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <strong>URI</strong> — идентификатор ресурса (широкое понятие).
          </List.Item>
          <List.Item>
            <strong>URL</strong> — локатор: схема + хост + путь + опционально порт,
            query, fragment (например <Code>https://example.com/api?id=1#sec</Code>
            ).
          </List.Item>
          <List.Item>
            <strong>URN</strong> — имя без указания места (реже в вебе).
          </List.Item>
        </List>
        <Text c="gray.2" lh={1.75} mt="sm">
          В HTTP запросе на первой строке обычно указывают <strong>путь и query</strong>{" "}
          (и иногда полный URL — в прокси). Хост передают в заголовке{" "}
          <Code>Host</Code>.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="4. Версии протокола: эволюция">
        <Table
          striped
          withTableBorder
          styles={{
            th: { color: "var(--mantine-color-gray-4)" },
            td: { color: "var(--mantine-color-gray-3)", fontSize: rem(13) },
          }}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Версия</Table.Th>
              <Table.Th>Идея</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>HTTP/0.9</Table.Td>
              <Table.Td>Только GET, без заголовков — исторический артефакт</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>HTTP/1.0</Table.Td>
              <Table.Td>Заголовки, коды, несколько методов; соединение часто на запрос</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>HTTP/1.1</Table.Td>
              <Table.Td>
                Персистентные соединения, chunked, Host обязателен, кэш и условные
                запросы уточнены (RFC 7230+)
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>HTTP/2</Table.Td>
              <Table.Td>
                Бинарный фрейминг, мультиплексирование, HPACK, один TCP на много
                запросов
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>HTTP/3</Table.Td>
              <Table.Td>QUIC + UDP, встроенный TLS 1.3, меньше задержек при потерях</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </JsTopicSection>

      <JsTopicSection title="5. Структура запроса (request)">
        <List spacing="sm" c="gray.3" size="sm" type="ordered">
          <List.Item>
            <strong>Стартовая строка (request line)</strong>:{" "}
            <Code>METHOD SP path SP HTTP/version</Code>
          </List.Item>
          <List.Item>
            <strong>Заголовки</strong> — строки <Code>Имя: значение</Code> до пустой
            строки (CRLF).
          </List.Item>
          <List.Item>
            <strong>Тело</strong> — опционально (часто у POST/PUT/PATCH с JSON или
            формами).
          </List.Item>
        </List>
        <CodeBlock>{`GET /articles/http HTTP/1.1
Host: example.com
Accept: text/html
Connection: close

`}</CodeBlock>
      </JsTopicSection>

      <JsTopicSection title="6. Структура ответа (response)">
        <List spacing="sm" c="gray.3" size="sm" type="ordered">
          <List.Item>
            <strong>Статус-строка</strong>:{" "}
            <Code>HTTP/version SP code SP reason</Code>
          </List.Item>
          <List.Item>
            <strong>Заголовки</strong> — метаданные и директивы кэша.
          </List.Item>
          <List.Item>
            <strong>Тело</strong> — HTML, JSON, файл, поток.
          </List.Item>
        </List>
        <CodeBlock>{`HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 62

<html><body>OK</body></html>`}</CodeBlock>
      </JsTopicSection>

      <JsTopicSection title="7. Методы HTTP">
        <Text c="gray.2" lh={1.75} mb="sm">
          Метод задаёт <strong>намерение</strong> запроса. Сервер может трактовать
          иначе, но клиенты и кэши полагаются на семантику RFC.
        </Text>
        <Table
          striped
          withTableBorder
          styles={{
            th: { color: "var(--mantine-color-gray-4)" },
            td: { color: "var(--mantine-color-gray-3)", fontSize: rem(13) },
          }}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Метод</Table.Th>
              <Table.Th>Назначение</Table.Th>
              <Table.Th>Safe</Table.Th>
              <Table.Th>Идемпотентный*</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>
                <Code>GET</Code>
              </Table.Td>
              <Table.Td>Получить представление ресурса</Table.Td>
              <Table.Td>да</Table.Td>
              <Table.Td>да</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <Code>HEAD</Code>
              </Table.Td>
              <Table.Td>Как GET, без тела (проверка метаданных)</Table.Td>
              <Table.Td>да</Table.Td>
              <Table.Td>да</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <Code>OPTIONS</Code>
              </Table.Td>
              <Table.Td>Какие методы/заголовки разрешены (CORS preflight)</Table.Td>
              <Table.Td>да</Table.Td>
              <Table.Td>да</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <Code>POST</Code>
              </Table.Td>
              <Table.Td>Обработка данных, создание ресурса (часто)</Table.Td>
              <Table.Td>нет</Table.Td>
              <Table.Td>нет**</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <Code>PUT</Code>
              </Table.Td>
              <Table.Td>Замена ресурса целиком (семантика)</Table.Td>
              <Table.Td>нет</Table.Td>
              <Table.Td>да</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <Code>PATCH</Code>
              </Table.Td>
              <Table.Td>Частичное изменение (формат тела договаривается API)</Table.Td>
              <Table.Td>нет</Table.Td>
              <Table.Td>не гарантирован</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <Code>DELETE</Code>
              </Table.Td>
              <Table.Td>Удаление ресурса</Table.Td>
              <Table.Td>нет</Table.Td>
              <Table.Td>да</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
        <Text c="gray.3" size="sm" mt="sm">
          *Идемпотентный: повтор даёт тот же эффект на сервере, что один раз (в
          смысле состояния ресурса). **POST обычно не идемпотентен.{" "}
          <Code>TRACE</Code> в проде часто отключён (утечки заголовков).
        </Text>
      </JsTopicSection>

      <JsTopicSection title="8. Коды состояния (status codes)">
        <Text c="gray.2" lh={1.75} mb="sm">
          Трёхзначный код + текстовая фраза (для людей). Группы:
        </Text>
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <strong>1xx</strong> — информационные (<Code>100 Continue</Code>).
          </List.Item>
          <List.Item>
            <strong>2xx</strong> — успех: <Code>200 OK</Code>,{" "}
            <Code>201 Created</Code>, <Code>204 No Content</Code>.
          </List.Item>
          <List.Item>
            <strong>3xx</strong> — редиректы: <Code>301</Code>, <Code>302</Code>,{" "}
            <Code>304 Not Modified</Code> (кэш).
          </List.Item>
          <List.Item>
            <strong>4xx</strong> — ошибка клиента: <Code>400 Bad Request</Code>,{" "}
            <Code>401 Unauthorized</Code>, <Code>403 Forbidden</Code>,{" "}
            <Code>404 Not Found</Code>, <Code>429 Too Many Requests</Code>.
          </List.Item>
          <List.Item>
            <strong>5xx</strong> — ошибка сервера: <Code>500</Code>,{" "}
            <Code>502 Bad Gateway</Code>, <Code>503 Service Unavailable</Code>.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="9. Важные заголовки запроса">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <Code>Host</Code> — имя сервера (и порт при необходимости); виртуальный
            хостинг.
          </List.Item>
          <List.Item>
            <Code>User-Agent</Code> — идентификация клиента (браузер, бот, SDK).
          </List.Item>
          <List.Item>
            <Code>Accept</Code>, <Code>Accept-Language</Code>,{" "}
            <Code>Accept-Encoding</Code> — какие представления и сжатие готов
            принять клиент.
          </List.Item>
          <List.Item>
            <Code>Authorization</Code> — схема и учётные данные (Bearer JWT, Basic…).
          </List.Item>
          <List.Item>
            <Code>Cookie</Code> — ранее выставленные cookies для этого хоста.
          </List.Item>
          <List.Item>
            <Code>Content-Type</Code>, <Code>Content-Length</Code> — тип и размер
            тела.
          </List.Item>
          <List.Item>
            <Code>If-None-Match</Code> / <Code>If-Modified-Since</Code> — условные
            GET для кэша.
          </List.Item>
          <List.Item>
            <Code>Origin</Code> — источник запроса (важно для CORS).
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="10. Важные заголовки ответа">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <Code>Content-Type</Code> — MIME-тип тела (<Code>application/json</Code>
            , <Code>text/html</Code>…).
          </List.Item>
          <List.Item>
            <Code>Content-Length</Code> или <Code>Transfer-Encoding: chunked</Code>{" "}
            — как читать тело.
          </List.Item>
          <List.Item>
            <Code>Set-Cookie</Code> — установка cookie (флаги Path, Domain, Expires,
            HttpOnly, Secure, SameSite).
          </List.Item>
          <List.Item>
            <Code>Location</Code> — куда редиректить (3xx и иногда 201).
          </List.Item>
          <List.Item>
            <Code>Cache-Control</Code>, <Code>ETag</Code>, <Code>Last-Modified</Code>{" "}
            — правила кэширования.
          </List.Item>
          <List.Item>
            <Code>Access-Control-Allow-Origin</Code> и др. — CORS (ответ сервера).
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="11. Тело сообщения и кодирование">
        <Text c="gray.2" lh={1.75} mb="sm">
          Длина тела задаётся <Code>Content-Length</Code> (фиксированное число
          байт) или <strong>chunked</strong> — поток кусков с префиксами размера;
          завершается нулевым chunk. Для форм используют{" "}
          <Code>application/x-www-form-urlencoded</Code> или{" "}
          <Code>multipart/form-data</Code> (файлы).
        </Text>
      </JsTopicSection>

      <JsTopicSection title="12. Кэширование">
        <Text c="gray.2" lh={1.75} mb="sm">
          Цель — меньше запросов и быстрее ответ. Браузер и промежуточные прокси
          хранят ответы по правилам заголовков.
        </Text>
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <Code>Cache-Control: max-age=3600</Code> — свежий ответ N секунд без
            проверки.
          </List.Item>
          <List.Item>
            <Code>no-store</Code> — не хранить; <Code>no-cache</Code> — хранить, но
            валидировать перед использованием.
          </List.Item>
          <List.Item>
            <Code>private</Code> vs <Code>public</Code> — только у пользователя или
            можно в shared cache.
          </List.Item>
          <List.Item>
            <strong>Валидация</strong>: <Code>ETag</Code> + <Code>If-None-Match</Code>{" "}
            → 304; <Code>Last-Modified</Code> + <Code>If-Modified-Since</Code>.
          </List.Item>
          <List.Item>
            <Code>Vary</Code> — от каких заголовков запроса зависит представление
            (иначе можно отдать неверный вариант из кэша).
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="13. Cookies">
        <Text c="gray.2" lh={1.75} mb="sm">
          Сервер шлёт <Code>Set-Cookie</Code>; браузер прикрепляет подходящие
          cookie к последующим запросам к тому же хосту (с учётом Path, Domain,
          Secure, флагов).
        </Text>
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <Code>HttpOnly</Code> — недоступно из JS (снижает кражу через XSS).
          </List.Item>
          <List.Item>
            <Code>Secure</Code> — только по HTTPS.
          </List.Item>
          <List.Item>
            <Code>SameSite</Code> — ограничение кросс-сайтовой отправки (CSRF).
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="14. HTTPS и TLS">
        <Text c="gray.2" lh={1.75}>
          Поверх TCP сначала идёт <strong>рукопожатие TLS</strong>: согласование
          алгоритмов, проверка сертификата (цепочка до доверенного УЦ), обмен
          ключами, затем весь HTTP-трафик <strong>шифруется</strong>. Сертификат
          привязан к домену; неверное имя — предупреждение браузера. Порт по
          умолчанию <strong>443</strong>.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="15. HTTP/1.1: соединения и pipeline">
        <Text c="gray.2" lh={1.75}>
          <Code>Connection: keep-alive</Code> (по умолчанию в 1.1) переиспользует
          TCP для нескольких запросов — меньше накладных расходов.{" "}
          <strong>Pipelining</strong> (несколько запросов подряд без ожидания
          ответа) на практике почти не использовался из-за head-of-line blocking.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="16. HTTP/2">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>Один TCP, много параллельных <strong>потоков</strong>.</List.Item>
          <List.Item>
            Заголовки сжимаются <strong>HPACK</strong> (без дублирования ключей).
          </List.Item>
          <List.Item>
            <strong>Server push</strong> — сервер может заранее прислать ресурсы
            (редко и осторожно).
          </List.Item>
          <List.Item>
            При потере пакета TCP блокирует все потоки — это решает HTTP/3.
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="17. HTTP/3 и QUIC">
        <Text c="gray.2" lh={1.75}>
          QUIC объединяет транспорт и шифрование ближе к прикладному уровню,
          мультиплексирование без общего head-of-line blocking на уровне TCP,
          быстрее 0-RTT/1-RTT в некоторых сценариях. Порт UDP обычно 443 с
          дискриминацией QUIC vs другого трафика.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="18. WebSocket (связь с HTTP)">
        <Text c="gray.2" lh={1.75}>
          Дуплексный канал начинается с <strong>HTTP Upgrade</strong>: клиент шлёт
          запрос с <Code>Connection: Upgrade</Code>, <Code>Upgrade: websocket</Code>
          ; при 101 переключение на другой протокол поверх того же соединения.
          Дальше это уже не «классический запрос–ответ HTTP».
        </Text>
      </JsTopicSection>

      <JsTopicSection title="19. REST и HTTP">
        <Alert color="grape" variant="light">
          <Text size="sm" lh={1.65}>
            <strong>REST</strong> — не синоним HTTP. Это стиль: ресурсы с URI,
            представления (JSON/HTML), stateless взаимодействие, стандартные методы.
            HTTP — удобная реализация. API может быть «RESTful» в разной степени;
            GraphQL и RPC используют HTTP иначе.
          </Text>
        </Alert>
      </JsTopicSection>

      <JsTopicSection title="20. Практика: curl и сырой обмен">
        <Text c="gray.2" lh={1.75} mb="sm">
          Примеры для терминала (локально подставь свой URL):
        </Text>
        <CodeBlock>{`# GET с заголовками ответа
curl -i https://example.com/

# POST JSON
curl -i -X POST https://api.example.com/items \\
  -H "Content-Type: application/json" \\
  -d '{"name":"test"}'

# Только заголовки (как HEAD по сути для curl -I)
curl -I https://example.com/`}</CodeBlock>
      </JsTopicSection>

      <JsTopicSection title="21. Согласование содержимого (content negotiation)">
        <Text c="gray.2" lh={1.75}>
          Клиент шлёт <Code>Accept</Code>, <Code>Accept-Language</Code>,{" "}
          <Code>Accept-Encoding</Code>; сервер выбирает вариант ресурса и может
          ответить <Code>406 Not Acceptable</Code>, если не может удовлетворить.
          Заголовок <Code>Vary</Code> в ответе перечисляет, от каких полей запроса
          зависит выбор — кэши должны хранить отдельные копии.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="22. Диапазоны байт и возобновление загрузки">
        <Text c="gray.2" lh={1.75}>
          Заголовок <Code>Range</Code> запрашивает фрагмент ресурса; ответ{" "}
          <Code>206 Partial Content</Code> с <Code>Content-Range</Code>. Используют
          для видео/аудио и докачки файлов. Сервер должен явно поддерживать (
          <Code>Accept-Ranges</Code>).
        </Text>
      </JsTopicSection>

      <JsTopicSection title="23. Метод CONNECT и прокси">
        <Text c="gray.2" lh={1.75}>
          <Code>CONNECT</Code> открывает туннель (часто TLS к целевому хосту через
          HTTP-прокси). В обычном REST API почти не встречается, но полезно знать для
          понимания корпоративных прокси и «прозрачного» HTTPS.
        </Text>
      </JsTopicSection>

      <JsTopicSection title="24. CORS в двух словах (связь с HTTP)">
        <Text c="gray.2" lh={1.75} mb="sm">
          Браузер для <strong>cross-origin</strong> (межсайтовых) запросов с «непростыми»
          условиями шлёт <Code>OPTIONS</Code> preflight с{" "}
          <Code>Access-Control-Request-Method</Code> и заголовками; сервер отвечает
          разрешёнными origin, методами и заголовками. Это не «отдельный протокол», а
          правила браузера поверх HTTP.
        </Text>
        <Alert color="blue" variant="light">
          <Text size="sm" lh={1.65}>
            Полный разбор CORS — в следующих статьях раздела «Браузер и сеть».
          </Text>
        </Alert>
      </JsTopicSection>

      <JsTopicSection title="25. Безопасность: HSTS, mixed content">
        <List spacing="sm" c="gray.3" size="sm">
          <List.Item>
            <Code>Strict-Transport-Security</Code> — браузер будет ходить только по
            HTTPS к сайту ограниченное время.
          </List.Item>
          <List.Item>
            <strong>Mixed content</strong> — HTTPS-страница не должна подгружать
            активные ресурсы по HTTP (блокируется).
          </List.Item>
        </List>
      </JsTopicSection>

      <JsTopicSection title="26. Что изучать дальше в этом разделе">
        <Text c="gray.2" lh={1.75}>
          После HTTP закрепи <strong>CORS</strong>, <strong>кэш CDN</strong>,{" "}
          <strong>безопасность</strong> (CSRF, XSS, CSP), <strong>Storage</strong>.
          Пройди раздел MDN по HTTP и открой DevTools → Network: для каждого запроса
          смотри General, Request/Response Headers, Timing, Waterfall — так теория
          становится «осязаемой».
        </Text>
      </JsTopicSection>
    </>
  );
}
