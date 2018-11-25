import { EventAggregator } from '../EventAggregator';

const gameUI = require('./GameUI.html');

export class GameUIComponent extends HTMLElement {
    constructor() {
        super();
        this.render();
        this.style.position = 'absolute';
    }

    connectedCallback() {
    }

    render () {
        this.innerHTML = gameUI;
    }
}

