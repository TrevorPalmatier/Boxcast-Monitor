import React, {Component} from 'react';

const d = new Date();

export default class Time extends Component {
    constructor(){
        super();
        this.state = {
            hour: d.getHours(),
            minutes: d.getMinutes()
        }
    }

    tick(){
        const time = new Date();
        this.setState({hours: time.getHours(), minutes: time.getMinutes()});
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 30000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <span>Last Update: {this.state.hour}:{this.state.minutes}</span>
        );
    }
}
