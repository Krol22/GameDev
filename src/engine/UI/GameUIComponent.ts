import { EventAggregator } from '../EventAggregator';

const gameUI = require('./GameUI.html');

export class GameUIComponent extends HTMLElement {

    private shadow: ShadowRoot;

    constructor() {
        super();

        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.innerHTML = gameUI;
        this.style.position = 'absolute';
    }
}

