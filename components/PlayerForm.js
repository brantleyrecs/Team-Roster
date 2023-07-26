import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getTeams } from '../api/teamData';
import { createPlayer, updatePlayer } from '../api/playerData';

const initialState = {
  firebaseKey: '',
  first_name: '',
  last_name: '',
  img: '',
  uid: '',
};

function PlayerForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getTeams(user.uid).then(setTeams);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePlayer(formInput).then(() => router.push(`/player/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPlayer(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePlayer(patchPayload).then(() => {
          router.push('/players');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Player</h2>

      <FloatingLabel controlId="floatingInput1" label="Player First Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Player First Name"
          name="first_name"
          value={formInput.first_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Player Last Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Player Last Name"
          name="last_name"
          value={formInput.last_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Player Image URL" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Player Image URL"
          name="img"
          value={formInput.img}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Team">
        <Form.Select
          aria-label="Team"
          name="team_id"
          onChange={handleChange}
          className="mb-3 font"
          required
        >
          <option value="">Select a Team</option>
          {
            teams.map((team) => (
              <option
                key={team.firebaseKey}
                value={team.firebaseKey}
              >
                {team.name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      <Form.Check
        className="font mb-3"
        type="switch"
        id="captain"
        name="captain"
        label="Is Team Captain"
        checked={formInput.captain}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            captain: e.target.checked,
          }));
        }}
      />

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Player</Button>
    </Form>
  );
}

PlayerForm.propTypes = {
  obj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    img: PropTypes.string,
    captain: PropTypes.bool,
    team_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

PlayerForm.defaultProps = {
  obj: initialState,
};

export default PlayerForm;
