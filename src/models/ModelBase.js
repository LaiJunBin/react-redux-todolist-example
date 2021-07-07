import {useState} from "react";

export default class ModelBase {
    init = (props, key) => () => {
        const [state, setState] = useState(undefined);

        Object.assign(this, {
            [key]: state,
            ['set' + key.charAt(0).toUpperCase() + key.substr(1)]: setState
        });

        if (this[key] === undefined) {
            setState(props[key]);
        }
    }

    constructor(props) {
        for (let key in props) {
            this.init.call(this, props, key)();
        }
    }

}
