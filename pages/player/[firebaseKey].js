/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { viewPlayerDetails } from '../../api/mergedData';
// import { getSingleTeam } from '../../api/teamData';

export default function ViewPlayer() {
  const [playerDetails, setPlayerDetails] = useState({});
  // const [teamDetails, setTeamDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewPlayerDetails(firebaseKey).then(setPlayerDetails);
  }, [firebaseKey]);

  // useEffect(() => {
  //   getSingleTeam(firebaseKey).then(setTeamDetails);
  // }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap font">
      <div className="d-flex flex-column">
        <img src={playerDetails.img} alt={playerDetails.first_name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details font">
        <h1 className="font">{playerDetails.first_name} {playerDetails.last_name}</h1>
        <Link href={`../team/${playerDetails.teamObject?.firebaseKey}`} passHref>
          <h3 className="font">Team: {playerDetails.teamObject?.name}</h3>
        </Link>
        <h5 className="font">{playerDetails.captain ? ' Team Captain' : ''}</h5>
        <Link href={`../player/edit/${playerDetails.firebaseKey}`} passHref>
          <Button variant="info">Edit Player</Button>
        </Link>
      </div>
    </div>
  );
}

ViewPlayer.propTypes = {
  teamObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }),
};

ViewPlayer.defaultProps = {
  teamObj: {

  },
};
