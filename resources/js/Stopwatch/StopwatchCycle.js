import Tools from "../graph/Tools";

class StopwatchCycle {

    constructor(startingCheckpointId = 'Start') {
        this._checkpoints = [];

        this.checkpoint(startingCheckpointId);
    }

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
            // TODO: remove T and still keep order
            id: `T${id}`,
            time: time,
            elapsedTime: elapsedTime
        })
    }

    finished() {
        this.checkpoint('Finish');
    }

    get checkpoints() {
        return this._checkpoints;
    }

}

export default StopwatchCycle;
