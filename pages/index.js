import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '500px',
        margin: '0 auto',
        color: 'white',
      }}
    >
      <h1>Hello {user.displayName}!</h1>
      <hr />
      <h2>Welcome to DodgeBall!</h2>
      <hr />
      {/* eslint-disable-next-line quotes */}
      <h3>{`"If you can dodge a wrench, you can dodge a ball!" - Patches O'Houlihan`}</h3>
    </div>
  );
}

export default Home;
