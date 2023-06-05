function addPlayer(players, req) {
  return new Promise((resolve, reject) => {
    const playerID = req.session.accountID;

    if (playerID === undefined) {
      reject('Player ID is undefined');
      return;
    }

    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (player.playerID === playerID) {
        reject('Duplicate player ID');
        return;
      }
    }

    players.push({ playerID: playerID});
    resolve('Player added successfully');
  });
}

function removePlayer(players, req) {
  const playerID = req.session.accountID;

  const index = players.findIndex((player) => player.playerID === playerID);
  if (index !== -1) {
    players.splice(index, 1);
    return true;
  }

  return false;
}

module.exports = { addPlayer, removePlayer };
