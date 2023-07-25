import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTeam } from '../../../api/teamData';
import TeamForm from '../../../components/TeamForm';

export default function EditTeam() {
  const [editTeam, setEditTem] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeam(firebaseKey).then(setEditTem);
  }, [firebaseKey]);

  return (
    <TeamForm obj={editTeam} />
  );
}
