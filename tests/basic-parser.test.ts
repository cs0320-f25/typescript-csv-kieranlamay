import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { tuple, z } from "zod";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const PERSON_SCHEMA_CSV = path.join(__dirname, "../data/person_schema.csv");
const NUMBER_SCHEMA_CSV = path.join(__dirname, "../data/numbers.csv");

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

test("schema validation works", async () => {
  const PersonRowSchema = z.tuple([z.string(), z.coerce.number()]).transform(tuple => ({ name: tuple[0], age: tuple[1] }));
  const results = await parseCSV(PERSON_SCHEMA_CSV, PersonRowSchema);
  expect(results[0]).toEqual({ name: "Alice", age: 23 });
  expect(results[1]).toEqual({ name: "Charlie", age: 25 });
});

test("schema validation numbers fail", async () => {
  const NumberRowSchema = z.tuple([z.coerce.number().refine(val => val > 5), z.coerce.number().refine(val => val < 2)]).transform(tuple => ({ a: tuple[0], b: tuple[1] }));
  await expect(parseCSV(NUMBER_SCHEMA_CSV, NumberRowSchema)).rejects.toThrow();
});

test("schema validation numbers work", async () => {
  const NumberRowSchema2 = z.tuple([z.coerce.number().refine(val => val > 0), z.coerce.number().refine(val => val > 0)]).transform(tuple => ({ a: tuple[0], b: tuple[1] }));
  const results = await parseCSV(NUMBER_SCHEMA_CSV, NumberRowSchema2);
  expect(results[0]).toEqual({ a: 4, b: 1 });
  expect(results[1]).toEqual({ a: 10, b: 28 });
});