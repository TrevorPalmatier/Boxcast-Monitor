const axios = require('axios');

module.exports= {
authenticate() {
    return axios.post('https://auth.boxcast.com/oauth2/token', params).then(res => res.data)
    .catch(error => console.log(error));
},

getCasterInfo (token,casterID) {
    return axios.get('https://api.boxcast.com/account/boxcasters/'+casterID, {headers: {authorization: "Bearer " + token}})
    .then(res => res.data).catch(err => console.log(err));
},

getCasterList(token){
    return axios.get('https://api.boxcast.com/account/boxcasters', {headers: {authorization: "Bearer " + token}})
    .then(res => res.data).catch(err => console.log(err));
}
}
