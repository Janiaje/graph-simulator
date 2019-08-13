import Tools from "../graph/Tools";

class StopwatchCycle {

    constructor() {
        this._checkpoints = [];

        this.checkpoint();
    }

    checkpoint() {
        let time = Tools.getEpochTime();
        let elapsedTime = 0;

        let previousCheckpoint = this.checkpoints[this.checkpoints.length - 1];
        if (previousCheckpoint !== undefined) {
            elapsedTime = time - previousCheckpoint.time;
        }

        this._checkpoints.push({
            id: `T${this._checkpoints.length}`,
            time: time,
            elapsedTime: elapsedTime
        })
    }

    finished() {
        this.checkpoint();
    }

    get checkpoints() {
        return this._checkpoints;
    }

}

export default StopwatchCycle;
