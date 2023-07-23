/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import viewPlayerDetails from '../../api/mergedData';

export default function ViewPlayer() {
  const [playerDetails, setPlayerDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewPlayerDetails(firebaseKey).then(setPlayerDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={playerDetails.img} alt={playerDetails.first_name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h1>{playerDetails.first_name} {playerDetails.last_name}</h1>
        <h3>Team: {playerDetails.teamObject?.name}</h3>
        <h5>{playerDetails.captain ? ' Team Captain' : ''}</h5>
      </div>
    </div>
  );
}
