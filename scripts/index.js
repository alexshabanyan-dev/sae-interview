/**
 * Для тестирования можно пользоваться моком функции fetchFlights
 *
 * ```
 * const FLIGHTS = {
 *  A: ['B', 'D'],
 *  B: ['C', 'N', 'Z'],
 *  D: ['E', 'F'],
 *  F: ['S']
 * };
 *
 * const fetchFlights = (from) => Promise.resolve(FLIGHTS[from]);
 * ```
 */

const FLIGHTS = {
  A: ["B", "D"],
  B: ["C", "N", "Z"],
  D: ["E", "F"],
  F: ["S"],
};

const fetchFlights = (from) => Promise.resolve(FLIGHTS[from]);

export async function findPath(from, to, fetchFlights) {
  async function dfs(current) {
    if (current === to) {
      return [current];
    }

    const neighbors = await fetchFlights(current);

    if (!neighbors || !neighbors.length) return null;

    for (const next of neighbors) {
      const result = await dfs(next);

      if (result) {
        return [current, ...result];
      }
    }

    return null;
  }

  const result = await dfs(from);
  return result ?? [];
}

const test = await findPath("A", "S", fetchFlights);
console.log("🚀 ~ test:", test);
