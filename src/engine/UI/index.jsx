import React from 'react';
import { EventAggregator } from '../';

class Text extends React.Component {

    constructor () {
        super();
        EventAggregator.subscribe(`UI:${this.props.id}-text-changed`, (text) => {
            // change text in component or part of it 
        });
    }
    
    render() {
        return (
            <h2 id='${this.props.id}'> ${this.props.text} </h2>
        );
    }

}

class Button extends React.Component {

    constructor() {
    }

    render() {
        return (
            <button> test </button>
        );
    }
    
}

export class MenuUI extends React.Component {

    render() {
        return (
            <div>
                <Text id=""> Title </Text>
                <Button id=""> Start game </Button>
            </div>
        );
    }

}

