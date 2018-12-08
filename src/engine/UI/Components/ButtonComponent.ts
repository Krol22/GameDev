import { EventAggregator } from '../../EventAggregator';

const template = require('./ButtonComponent.html');

/*
    Attributes: 
    - name : string-> required - used later for creating events on button, 
                         on click button will send event: UI:button-*name*-*eventName*
    
    - hover : boolean = false,
    - pressed : boolean = false,
    - click : boolean = true

    f.e. button with name="walk" will create event on click: UI:button-walk-click

*/

const buttonEventsTree = {
    press: [
        { name: 'mousedown', callbackName: 'mouseDown' },
        { name: 'mouseup', callbackName: 'mouseUp' },
    ],
    hover: [
        { name: 'mouseleave', callbackName: 'mouseLeave' },
        { name: 'mouseenter', callbackName: 'mouseEnter' },
    ],
    click: [
        { name: 'click', callbackName: 'onClick' },
    ],
}

export class ButtonComponent extends HTMLElement {

    private button: HTMLDivElement;

    public hover: boolean = false;
    public pressed: boolean = false;

    static get observedAttributes() { return [ 'press', 'hover', 'click' ]}

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

        if (!this.hasAttribute('click')) { this.setAttribute('click', 'click'); }

        this.handleEvents();
    }

    render () {
        this.innerHTML = template;
    }

    attributeChangedCallback(name: string, oldVal: string, newVal: string) {
        this.onAttrChange(name, this.hasAttribute(name));
    }

    private handleEvents() {
        if (!this.hasAttribute('name')) {
            throw new Error('Button attribute "name" is required!');
        }

        this.onAttrChange('hover', !!this.hasAttribute('hover'));
        this.onAttrChange('press', !!this.hasAttribute('press'));
        this.onAttrChange('click', !!this.hasAttribute('click'));
    }

    private onAttrChange(attrname: string, attrvalue: boolean) {
        if (!this.button) {
            return;
        }

        if (!attrvalue) {
            buttonEventsTree[attrname].forEach((event: any) => {
                this.button.removeEventListener(event.name, this[event.callbackName]);
            });

            return;
        } 

        buttonEventsTree[attrname].forEach((event: any) => {
            this.button.addEventListener(event.name, this[event.callbackName]);
        });
    }

    /* Used in onAttrChange (implicit use) */
    private onClick = () => {
        EventAggregator.publish(`UI:button-${this.getAttribute('name')}-click`);
    }
    private mouseDown = () => {
        this.pressed = true;
        EventAggregator.publish(`UI:button-${this.getAttribute('name')}-mousedown`);
    }
    private mouseUp = () => {
        this.pressed = false;
        EventAggregator.publish(`UI:button-${this.getAttribute('name')}-mouseup`);
    }
    private mouseEnter = () => {
        this.hover = true;
        EventAggregator.publish(`UI:button-${this.getAttribute('name')}-mouseEnter`);
    }
    private mouseLeave = () => {
        this.hover = false;
        EventAggregator.publish(`UI:button-${this.getAttribute('name')}-mouseleave`);
    }
}