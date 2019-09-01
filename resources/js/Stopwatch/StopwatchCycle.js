import Tools from "../graph/Tools";

class StopwatchCycle {

    constructor(startingCheckpointId = 'Start') {
        this._checkpoints = [];
        this._memoryStart = Tools.getCurrentMemoryUsage();

        this.checkpoint(startingCheckpointId);
    }

    get memoryStart() {
        return this._memoryStart;
    }

    get memoryFinish() {
        return this._memoryFinish;
    }

    /**
     * Creates a checkpoint with the give ID.
     *
     * @param id {string|Number}
     */
    checkpoint(id) {
        if (id === undefined) {
            id = this._checkpoints.length;
        }

        let time = Tools.getEpochTime();
        let elapsedTime = 0;

        let previousCheckpoint = this.checkpoints[this.checkpoints.length - 1];
        if (previousCheckpoint !== undefined) {
            elapsedTime = time - previousCheckpoint.time;
        }

        this._checkpoints.push({
            id: `#${this._checkpoints.length + 1}: ${id}`,
            time: time,
            elapsedTime: elapsedTime
        })
    }

    /**
     * Creates the last checkpoint.
     */
    finished() {
        this.checkpoint('Finish');
        this._memoryFinish = Tools.getCurrentMemoryUsage();
    }

    get checkpoints() {
        return this._checkpoints;
    }

}

export default StopwatchCycle;
