import StopwatchCycle from "./StopwatchCycle";
import Tools from "../graph/Tools";

class Stopwatch {

    static start() {
        this.newCycle();
    }

    static newCycle() {
        if (this.cycle !== undefined) {
            this.cycle.finished();
        }

        this.cycles.push(new StopwatchCycle)
    }

    static checkpoint() {
        this.cycle.checkpoint();
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

    static results() {
        let cycles = this.cycles.map(cycle => cycle.checkpoints);

        let firstCycle = cycles[0][0];
        let minTime = firstCycle.time;

        let lastCycle = cycles[cycles.length - 1];
        let maxTime = lastCycle[lastCycle.length - 1].time;

        let maxElapsedTime = maxTime - minTime;

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
                percentage: ((sum / maxElapsedTime) * 100).toFixed(2).padStart(5, ' ')
            });
        });


        console.log('---------- Summarized Stopwatch results ----------');
        console.log(`Elapsed time: ${maxElapsedTime}ms`);
        results.forEach(result => {
            console.log(`Name: ${result.name}\t-\tTime: ${result.sum}ms\t-\tPercentage: ${result.percentage} %`);
        });
        console.log('--------------------------------------------------');
    }

}

export default Stopwatch;
