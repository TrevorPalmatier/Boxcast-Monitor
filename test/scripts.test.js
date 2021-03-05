const expect = require('chai').expect;
const nock = require('nock');
const qs = require('qs');

const {authenticate, getCasterInfo, getCasterList, updateCaster} = require("../scripts.js");
const authResponse = require('./responses/authResponse');
const casterResponse = require('./responses/casterResponse');
const listResponse = require('./responses/listResponse');
const casterID = "abc123";

const params = qs.parse('form[grant_type]=client_credentials&form[scope]=owner&auth[user]=UserID&auth[pass]=UserSecret');

afterEach(() => {
    nock.cleanAll();
})

describe("Authentication Test", () => {
    before(() => {
        nock("https://auth.boxcast.com").post('/oauth2/token', params)
        .reply(200, authResponse);
    });

    it('Authenticate Client Credentials', () => {
        return authenticate().then(response => {
            expect(response.token_type).to.equal('bearer');
            expect(response.access_token).to.equal('iq50kw1GmZ5T54PJOVpsvb5merQUwU3IT5f-Xtrxj~6jgBnwF9yCGg~zySOZ4U_ovm5wsvJkhphnDMrg');
            expect(response.expires_in).to.equal(86400);
            expect(response.scope).to.equal("owner");
        })
    })
});

describe("Caster Tests", () => {

    it('Get info on Single BoxCaster', () => {
        nock("https://api.boxcast.com", {reqheaders: {authorization: 'Bearer 123456789'}}).get('/account/boxcasters/'+casterID)
        .reply(200, casterResponse);
        return getCasterInfo('123456789',casterID).then(res => {
            expect(res.name).to.equal('Main Camera');
            expect(res.status).to.equal('broadcasting');
            expect(res.warning).to.equal('none');
            expect(res.last_seen_at).to.equal('2012-10-09T15:44:09Z');
            expect(res.next_broadcast_at).to.equal('2012-10-09T15:00:00Z');
            expect(res.next_broadcast_name).to.equal('Smith Wedding 10/9/12');
        })
    });

    it('Get List of all BoxCasters', () => {
        nock("https://api.boxcast.com", {reqheaders: {authorization: 'Bearer 123456789'}}).get('/account/boxcasters')
        .reply(200, listResponse);
        return getCasterList('123456789').then(res => {
            expect(res[0].id).to.equal("m9c4ebfb82112");
            expect(res[0].name).to.equal('Main Camera');
            expect(res[0].status).to.equal('broadcasting');
            expect(res[0].warning).to.equal('none');
            expect(res[0].last_seen_at).to.equal('2012-10-09T15:44:09Z');
            expect(res[0].next_broadcast_at).to.equal('2012-10-09T15:00:00Z');
            expect(res[0].next_broadcast_name).to.equal('Smith Wedding 10/9/12');
            expect(res[1].id).to.equal("m9c4ebf96d67a");
            expect(res[1].name).to.equal('Mobile Camera');
            expect(res[1].status).to.equal('ready');
            expect(res[1].warning).to.equal('updating_firmware');
            expect(res[1].last_seen_at).to.equal('2012-10-09T15:44:17Z');
            expect(res[1].next_broadcast_at).to.equal('2012-10-21T10:30:00Z');
            expect(res[1].next_broadcast_name).to.equal('First Service');
        })
    });
});
