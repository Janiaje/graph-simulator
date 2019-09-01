import StopwatchCycle from "./StopwatchCycle";
import Tools from "../graph/Tools";

class Stopwatch {

    /**
     * Starts the stopwatch.
     */
    static start() {
        this._cycles = [];
        this.newCycle();
    }

    /**
     * Starts a new cycle.
     */
    static newCycle() {
        if (this.cycle !== undefined) {
            this.cycle.finished();
        }

        this.cycles.push(new StopwatchCycle)
    }

    /**
     * Creates a checkpoint.
     */
    static checkpoint(id) {
        this.cycle.checkpoint(id);
    }

    static get cycle() {
        if (this.cycles.length === 0) {
            return;
        }

        return this.cycles[this.cycles.length - 1];
    }

    static get cycles() {
        if (this._cycles === undefined) {
            this._cycles = [];
        }

        return this._cycles;
    }

    /**
     * Prints out the results to the console.
     */
    static results() {
        this.cycle.finished();

        let cycles = this.cycles.map(cycle => cycle.checkpoints);

        let firstCycle = cycles[0][0];
        let minTime = firstCycle.time;

        let lastCycle = cycles[cycles.length - 1];
        let maxTime = lastCycle[lastCycle.length - 1].time;

        let maxElapsedTime = maxTime - minTime;

        let startMemory = this.cycles[0].memoryStart;
        let maxMemory = Math.max(...this.cycles.map(cycle => cycle.memoryFinish));
        let totalMemoryUsage = ((maxMemory - startMemory) / 1024 / 1024).toFixed(2);

        let groups = Tools.groupBy(cycles.flat());

        let results = [];
        Object.keys(groups).forEach(function (key) {
            let group = groups[key];
            let sum = group
                .map(group => group.elapsedTime)
                .reduce((a, b) => {
                    return a + b;
                });

            results.push({
                name: key,
                sum: sum,
                percentage: ((sum / maxElapsedTime) * 100).toFixed(2).padStart(5)
            });
        });

        // TODO: codesmell
        let maxNameLength = Math.max(...results.map(result => result.name.length));
        let maxSumLength = Math.max(...results.map(result => result.sum.toString().length));

        results = results.map(result => {
            return `Name: ${result.name.padEnd(maxNameLength)} - Time: ${result.sum.toString().padStart(maxSumLength)} ms - Percentage: ${result.percentage} %`;
        });

        let lineLength = results[0].length;
        let summarizedString = ' Summarized Stopwatch results ';
        let paddingLength = lineLength - summarizedString.length;

        let separator = ''.padEnd(lineLength, '-');
        // TODO: separate styling function
        console.log(summarizedString.padStart(summarizedString.length + (paddingLength / 2), '-').padEnd(lineLength, '-'));
        console.log(`Number of cycles: ${cycles.length}`);
        console.log(`Total elapsed time: ${maxElapsedTime} ms`);
        console.log(`Average length: ${(maxElapsedTime / cycles.length).toFixed(2)} ms`);
        console.log(`Memory usage: ${totalMemoryUsage} MB`);
        console.log(separator);
        results.forEach(result => {
            console.log(result);
        });
        console.log(separator);
    }

}

export default Stopwatch;
