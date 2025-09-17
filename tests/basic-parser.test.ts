import { parseCSV } from "../src/basic-parser";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH);

  // expect(results).toHaveLength(5); //adjusting people.csv with more data
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH);
  for (const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("parseCSV works on space separated names", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH);

  expect(results[5]).toEqual(["Joe Ray", "29"]);
});

test("parseCSV works on leading whitespace", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH);

  expect(results[6]).toEqual(["Alice", "23"]);
});

test("parseCSV works on empty fields", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH);

  expect(results[7]).toEqual(["Eve", ""]);
});

test("parseCSV works on special characters", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH);

  expect(results[8]).toEqual(["Smith, John", "35"]);
});

test("parseCSV handles duplicate names", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH);

  expect(results[9]).toEqual(["Alice", "23"]);
  expect(results[10]).toEqual(["Alice", "23"]);
});

test("parseCSV handles long values", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH);

  expect(results[11]).toEqual([
    "VeryLongNameWithManyCharacters",
    "12345678901234567890",
  ]);
});

test("parseCSV is case sensitive", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH);

  expect(results[12]).toEqual(["alice", "23"]);
});
