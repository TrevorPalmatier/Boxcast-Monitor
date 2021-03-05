const express = require('express');
const {authenticate,getCasterInfo,getCasterList} = require('./scripts');

const app = express();

const port = 5000;

let token = authenticate().access_token;

let casters = getCasterList(token);

// app.get('/casters', (req, res) => {
//     let casterInfo = [];
//     for (caster in casters){
//         let info = getCasterInfo(token, caster.id);
//         if(info.error != undefined){
//             token = authenticate().access_token;
//             info = getCasterInfo(token, caster.id);
//         }
//         casterInfo.push(info);
//     }

//     res.json(casterInfo);
// })

// This was used to verify the React render looked correct

app.get('/casters', (req,res) => {
    const info = [{id: '1234', status: "ready", name: "Main Encoder", last_seen: 'Some time', next_broad_name:"Wow", next_broad_at:"In the Future"},
    {id: '5678', name: "Second Encoder", status: "Broadcasting", last_seen: 'Time 2', next_broad_name:"Good Name", next_broad_at:"Tommorow"}
]
res.json(info);
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});