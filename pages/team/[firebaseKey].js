/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewTeamDetails } from '../../api/mergedData';
import PlayerCard from '../../components/PlayerCard';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewTeamDetails(firebaseKey).then(setTeamDetails);
  }, [firebaseKey]);

  const teamPlayers = () => {
    viewTeamDetails(firebaseKey).then(setTeamDetails);
  };

  useEffect(() => {
    teamPlayers();
  }, []);

  return (
    <>
      <div className="mt-5 d-flex flex-wrap team font">
        <div className="text-white ms-5 details" style={{ textAlign: 'center' }}>
          <h1 style={{ marginRight: '20px' }} className="font">
            {teamDetails.name}
          </h1>
          <div style={{ marginBottom: '20px' }}>
            <input
              className="form-control mr-sm-2"
              id="searchPlayers"
              placeholder="Search Players"
              aria-label="Search"
            />
          </div>
          {/* <Button variant="primary" onClick={}>Search</Button> */}
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {teamDetails?.players?.map((playerObj) => <PlayerCard playerObj={playerObj} onUpdate={teamPlayers} />)}
      </div>
    </>
  );
}
