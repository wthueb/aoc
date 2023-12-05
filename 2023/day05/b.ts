import { readInput } from "../utils";

const input = readInput();

const seedRanges = input[0]
    .split(":")[1]
    .trim()
    .split(" ")
    .map(Number)
    .reduce(
        (acc, _, i, arr) => {
            if (i % 2 === 0) {
                acc.push(arr.slice(i, i + 2) as [number, number]);
            }
            return acc;
        },
        [] as [number, number][],
    );

const seedToSoilMap: [number, number, number][] = [];
const soilToFertilizerMap: [number, number, number][] = [];
const fertilizerToWaterMap: [number, number, number][] = [];
const waterToLightMap: [number, number, number][] = [];
const lightToTemperatureMap: [number, number, number][] = [];
const temperatureToHumidityMap: [number, number, number][] = [];
const humidityToLocationMap: [number, number, number][] = [];

for (let i = 1; i < input.length; i++) {
    const readMap = (map: [number, number, number][]) => {
        for (i = i + 1; input[i] !== undefined && !isNaN(+input[i][0]); i++) {
            const [startDst, startSrc, length] = input[i]
                .split(" ")
                .map(Number);

            map.push([startDst, startSrc, length]);
        }
    };

    const line = input[i];

    if (line.startsWith("seed-to-soil")) readMap(seedToSoilMap);
    else if (line.startsWith("soil-to-fertilizer"))
        readMap(soilToFertilizerMap);
    else if (line.startsWith("fertilizer-to-water"))
        readMap(fertilizerToWaterMap);
    else if (line.startsWith("water-to-light")) readMap(waterToLightMap);
    else if (line.startsWith("light-to-temperature"))
        readMap(lightToTemperatureMap);
    else if (line.startsWith("temperature-to-humidity"))
        readMap(temperatureToHumidityMap);
    else if (line.startsWith("humidity-to-location"))
        readMap(humidityToLocationMap);
}

const transform = (
    range: [number, number],
    map: [number, number, number][],
) => {
    const [rangeStart, rangeLength] = range;
    const rangeEnd = rangeStart + rangeLength - 1;

    const rangeIntersects: [number, number, number, number][] = [];

    for (const m of map) {
        const [dstStart, srcStart, srcLength] = m;
        const srcEnd = srcStart + srcLength - 1;

        let rangeIntersect: [number, number] | undefined = undefined;

        if (srcStart <= rangeStart && rangeStart <= srcEnd) {
            rangeIntersect = [rangeStart, Math.min(srcEnd, rangeEnd)];
        } else if (srcStart >= rangeStart && srcEnd <= rangeEnd) {
            rangeIntersect = [srcStart, srcEnd];
        } else if (srcStart <= rangeEnd && rangeEnd <= srcEnd) {
            rangeIntersect = [Math.max(srcStart, rangeStart), rangeEnd];
        }

        if (rangeIntersect !== undefined) {
            rangeIntersects.push([...rangeIntersect, dstStart, srcStart]);
        }
    }

    rangeIntersects.sort((a, b) => a[0] - b[0]);

    const rangeIntersectsCopy = [...rangeIntersects];
    let cur = rangeStart;
    while (cur <= rangeEnd) {
        const nextIntersect = rangeIntersectsCopy.shift();

        if (nextIntersect === undefined) {
            rangeIntersects.push([cur, rangeEnd, cur, cur]);
            break;
        }

        const [nextIntersectStart, nextIntersectEnd] = nextIntersect;

        if (nextIntersectStart > cur) rangeIntersects.push([cur, nextIntersectStart - 1, cur, cur]);

        cur = nextIntersectEnd + 1;
    }

    const newRanges: [number, number][] = [];

    for (const rangeIntersect of rangeIntersects) {
        const [intersectStart, intersectEnd] = rangeIntersect;
        const newStart = rangeIntersect[2] + intersectStart - rangeIntersect[3];
        const newEnd = rangeIntersect[2] + intersectEnd - rangeIntersect[3];

        newRanges.push([newStart, newEnd - newStart + 1]);
    }

    return newRanges;
};

const soilRanges = seedRanges.flatMap((range) => transform(range, seedToSoilMap));
const fertilizerRanges = soilRanges.flatMap((range) => transform(range, soilToFertilizerMap));
const waterRanges = fertilizerRanges.flatMap((range) => transform(range, fertilizerToWaterMap));
const lightRanges = waterRanges.flatMap((range) => transform(range, waterToLightMap));
const temperatureRanges = lightRanges.flatMap((range) => transform(range, lightToTemperatureMap));
const humidityRanges = temperatureRanges.flatMap((range) => transform(range, temperatureToHumidityMap));
const locationRanges = humidityRanges.flatMap((range) => transform(range, humidityToLocationMap));

locationRanges.sort((a, b) => a[0] - b[0]);

const answer = locationRanges[0][0];

console.log(answer);
