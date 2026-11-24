import type { Level } from "../../core";
import { goetheB1_1 } from "./goethe-b1-1";
import { goetheB2_1 } from "./goethe-b2-1";
import { goetheC1_1 } from "./goethe-c1-1";
import type { ModuleId, Test } from "./types";

export const TESTS: Test[] = [goetheB1_1, goetheB2_1, goetheC1_1];

export const TEST_BY_ID: Record<string, Test> = Object.fromEntries(TESTS.map((t) => [t.id, t]));

export function testsForLevel(level: Level): Test[] {
  return TESTS.filter((t) => t.level === level);
}

export function attemptKey(testId: string, moduleId: ModuleId) {
  return `${testId}/${moduleId}`;
}
