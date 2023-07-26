import { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { Form } from 'react-bootstrap';
import { getPlayers } from '../api/playerData';
import { useAuth } from '../utils/context/authContext';

export default function SearchBar() {
  const { user } = useAuth();
  const [data, setData] = useState();
  const BarStyle = {
    width: '20rem', background: '#F0F0F0', border: 'none', padding: '0.5rem',
  };

  useEffect(() => {
    getPlayers(user.uid).then(setData);
  }, [user, data]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <input
        style={BarStyle}
        key="search-bar"
        value=""
        placeholder="Search Players"
        onChange={(e) => handleChange(e.target.value)}
      />
    </>
  );
}

// SearchBar.propTypes = {
//   search.PropTypes.shape({
//   })
// }
