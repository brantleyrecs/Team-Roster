/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getPlayers } from '../api/playerData';
import { useAuth } from '../utils/context/authContext';
import PlayerCard from '../components/PlayerCard';
import SearchBar from '../components/SearchBar';

export default function Players() {
  const [players, setPlayers] = useState([]);
  const { user } = useAuth();

  const getAllThePlayers = () => {
    getPlayers(user.uid).then(setPlayers);
  };

  useEffect(() => {
    getAllThePlayers();
  }, []);

  const filterResult = (query) => {
    if (!query) {
      getAllThePlayers();
    } else {
      const filter = players.filter((player) => player.first_name.toLowerCase().includes(query) || player.last_name.toLowerCase().includes(query));
      setPlayers(filter);
    }
  };

  return (
    <div className="text-center my-4">
      <Link href="/player/new" passHref>
        <Button style={{ marginBottom: '20px' }}>Add A Player</Button>
      </Link>
      <SearchBar onKeyUp={(query) => filterResult(query)} />
      <div className="d-flex flex-wrap">
        {players.map((player) => (
          <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllThePlayers} />
        ))}
      </div>
    </div>
  );
}
