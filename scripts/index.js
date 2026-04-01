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

export async function findPath(from, to, fetchFlights) {}

const test = await findPath("A", "S", fetchFlights);
console.log("🚀 ~ test:", isFinite("8"));
