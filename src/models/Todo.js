import ModelBase from "./ModelBase";

export default class Todo extends ModelBase {
    constructor(props = {}) {
        super({
            name: props.name || '',
            description: props.description || '',
            done: props.done || false
        });
    }
}
