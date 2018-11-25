import { EventAggregator } from '../../EventAggregator';

const template = require('./ButtonComponent.html');

/*
    Attributes: 
    - name -> required - used later for creating events on button, 
                         on click button will send event: UI:button-*name*-*eventName*

    f.e. button with name="walk" will create event on click: UI:button-walk-click
*/

export class ButtonComponent extends HTMLElement {

    private button: HTMLDivElement;

    constructor() {
        super();
    }

    connectedCallback() {
        let childElements: ChildNode[] = [];
        this.childNodes.forEach((node: ChildNode) => {
            childElements.push(node);
        });

        this.render();

        this.button = this.querySelector('div.button');

        if (childElements.length) {
            childElements.forEach((node: Node) => {
                this.button.appendChild(node);
            });
        }
 
        this.handleEvents();
    }

    render () {
        this.innerHTML = template;
    }

    private handleEvents() {
        if (!this.hasAttribute('name')) {
            throw new Error('Button attribute "name" is required!');
        }

        this.button.addEventListener('click', (e) => {
            EventAggregator.publish(`UI:button-${this.getAttribute('name')}-click`);
        });
    }
}