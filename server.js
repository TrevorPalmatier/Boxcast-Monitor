const express = require('express');
const {authenticate,getCasterInfo,getCasterList} = require('./scripts');

const app = express();

const port = 5000;

let token = authenticate().access_token;

let casters = getCasterList(token);

app.get('/casters', (req, res) => {
    let casterInfo = [];
    for (caster in casters){
        let info = getCasterInfo(token, caster.id);
        if(info.error == undefined){
            token = authenticate().access_token;
            info = getCasterInfo(token, caster.id);
        }
        casterInfo.push(info);
    }

    res.json(casterInfo);
})

// app.get('/casters', (req,res) => {
//     const info = [{id: '1234', status: "Nope", name: "Cheese", last_seen: 'Yesterday', next_broad_name:"Wow", next_broad_at:"Yesterday"},
//     {id: '5678', name: "Yippy", status: "YepCok", last_seen: 'Foo', next_broad_name:"Bar", next_broad_at:"Orange"}
// ]
// res.json(info);
// })

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});