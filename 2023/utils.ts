import { readFileSync } from "fs";

export function readInput(): string[] {
    const contents = readFileSync("input", "utf-8");

    return contents.trim().split("\n");
}
