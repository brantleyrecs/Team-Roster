import { getSinglePlayer } from './playerData';
import { getSingleTeam } from './teamData';

const viewPlayerDetails = (playerFirebaseKey) => new Promise((resolve, reject) => {
  getSinglePlayer(playerFirebaseKey)
    .then((playerObject) => {
      getSingleTeam(playerObject.team_id)
        .then((teamObject) => {
          resolve({ teamObject, ...playerObject });
        });
    }).catch((error) => reject(error));
});

export default viewPlayerDetails;
