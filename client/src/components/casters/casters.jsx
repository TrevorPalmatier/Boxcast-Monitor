import React, {Component} from 'react';
import './casters.css';

export default class Casters extends Component {
    constructor(){
        super();
        this.state = {
            casters: []
        }
    }


    componentDidMount() {
        console.log("mounted");
        this.updateCasters();
        this.interval = setInterval(() => this.updateCasters(), 30000);
    }

    updateCasters() {
        fetch('/casters')
        .then(res=> res.json())
        .then(casters => this.setState({casters}));
        console.log('fechted');
    }

    render() {
        return (
            <div class="box_Container">
                    {this.state.casters.map(casters =>
                    // <div className="box_Container">
                        <div class="box" key={casters.id}>
                            <span id="box2_name">{casters.name}</span>
                            <div class="info" id="info2">
                                <span class="status">Status: {casters.status}</span>
                                <span class="last_Seen">Last Seen at: {casters.last_seen}</span>
                                <span class="next_Broad_Name">Next Broadcast Name: {casters.next_broad_name}</span>
                                <span class="next_Broad_at">Next Broadcast at: {casters.next_broad_at}</span>
                            </div>
                    </div>
                    // </div>
                    )}
            </div>
        );
    }
}
