/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';

function TeamCard({ teamObj }) {
  console.warn(teamObj);
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={teamObj.img} alt={teamObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{teamObj.name}</Card.Title>
        <br />
        <Link href={`/team/${teamObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    img: PropTypes.string,
  }),
};

TeamCard.defaultProps = {
  teamObj: {
    name: 'Team Name',
  },
};

export default TeamCard;
