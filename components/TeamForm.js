import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createTeam, updateTeam } from '../api/teamData';

const initialState = {
  name: '',
  firebaseKey: '',
  img: '',
  uid: '',
};

function TeamForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
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
      updateTeam(formInput).then(() => router.push(`/team/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTeam(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateTeam(patchPayload).then(() => {
          router.push('/teams');
        });
      });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Team</h2>

      <FloatingLabel controlId="floatingImput1" label="Team Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Team Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Team Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="img"
          value={formInput.img}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Team</Button>
    </Form>
  );
}

TeamForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    img: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }),
};

TeamForm.defaultProps = {
  obj: initialState,
};

export default TeamForm;
