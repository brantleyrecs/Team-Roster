/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';

function PlayerCard({ playerObj }) {
  console.warn(playerObj);
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={playerObj.img} alt={playerObj.first_name} style={{ height: '400px' }} />
      <br />
      <Card.Body>
        <Card.Title>{playerObj.first_name} {playerObj.last_name}</Card.Title>
        <br />
        <Link href={`player/${playerObj.firebaseKey}`} passHref>
          <Button variant="primary">View Player</Button>
        </Link>
        <Link href={`player/edit/${playerObj.firebaseKey}`} passHref>
          <Button variant="info">Edit Player</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

PlayerCard.propTypes = {
  player: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    team: PropTypes.string,
  }),
};

PlayerCard.defaultProps = {
  player: {
    first_name: 'First Name',
    last_name: 'Last Name',
    team: 'Team',
  },
};

export default PlayerCard;
