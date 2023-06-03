const httpUpgrader = require('./src/websocketUpgrade');

class NetworkManager {
    constructor(){
        this.connectedPlayers = [];
    }

    handleRequest_connect(req, res){
        const accountID = req.body.accountID;
        console.log(accountID);
    }
}

module.exports = {NetworkManager,};