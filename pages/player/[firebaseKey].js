/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
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
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={playerDetails.img} alt={playerDetails.first_name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h1>{playerDetails.first_name} {playerDetails.last_name}</h1>
        <Link href={`../team/${playerDetails.teamObject?.firebaseKey}`} passHref>
          <h3>Team: {playerDetails.teamObject?.name}</h3>
        </Link>
        <h5>{playerDetails.captain ? ' Team Captain' : ''}</h5>
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
