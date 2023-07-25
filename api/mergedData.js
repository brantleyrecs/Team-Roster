import { getSinglePlayer, deleteSinglePlayer } from './playerData';
import { getSingleTeam, deleteSingleTeam, getTeamPlayers } from './teamData';

const viewPlayerDetails = (playerFirebaseKey) => new Promise((resolve, reject) => {
  getSinglePlayer(playerFirebaseKey)
    .then((playerObject) => {
      getSingleTeam(playerObject.team_id)
        .then((teamObject) => {
          resolve({ teamObject, ...playerObject });
        });
    }).catch((error) => reject(error));
});

const deleteTeamPlayers = (teamId) => new Promise((resolve, reject) => {
  getTeamPlayers(teamId).then((playersArray) => {
    console.warn(playersArray, 'Team Players');
    const deleteBookPromises = playersArray.map((player) => deleteSinglePlayer(player.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

const viewTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamFirebaseKey), getTeamPlayers(teamFirebaseKey)])
    .then(([teamObject, teamPlayersArray]) => {
      resolve({ ...teamObject, players: teamPlayersArray });
    }).catch((error) => reject(error));
});

export { viewPlayerDetails, deleteTeamPlayers, viewTeamDetails };
