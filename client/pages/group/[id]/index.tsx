import moment from 'moment';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { LineChart } from 'react-chartkick';

import { removeUser } from '../../../actions/groups';
import { sConn } from '../../../actions/connection';
import Modal from '../../../components/Modal';

const Share = dynamic(() => import('../../../components/Share'), {
  ssr: false,
});

export default function ViewGroup({ id, group, members: clubMembers, stats }) {
  const [show, setShow] = useState(false);
  const [members, setMembers] = useState(clubMembers);
  const isAdmin = group.admin == id;
  const [data, setData] = useState({});

  useEffect(() => {
    const stat = stats.map((e) => ({
      [moment(e.createdAt).format('DD MMM')]: e.users,
    }));
    setData(stat);
  }, []);

  return (
    <div>
      <div>
        <h1>{group.name} </h1>
      </div>
      {isAdmin && (
        <div className='chart'>
          <h2>Club activity</h2>
          <LineChart data={data} />
        </div>
      )}
      <div>
        <div className='flex'>
          <h4>Members</h4>
          <button onClick={() => setShow(true)}>Invite</button>
        </div>
        {members.map((e, i) => (
          <Member
            key={i}
            e={e}
            isAdmin={isAdmin}
            id={id}
            onDelete={setMembers}
          />
        ))}
      </div>
      <Modal control={show} close={setShow}>
        <Share id={group.id} />
      </Modal>
    </div>
  );
}

const Member = ({ e, isAdmin, id, onDelete }) => {
  return (
    <div className='full flex white'>
      <div>
        <h2>{e.user.name}</h2>
        <small>{moment(e.createdAt).format("DD MMM 'YY")}</small>
      </div>
      {isAdmin && e.userId != id && (
        <span
          onClick={() =>
            removeUser({
              data: {
                groupId: e.groupId,
                userId: e.userId,
              },
              callback: (s, m) => {
                if (s) {
                  onDelete(m);
                }
              },
            })
          }
        >
          Remove
        </span>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { token } = req.cookies;
  const { id } = query;

  const groupData = await sConn(token)
    .get(`/api/groups/${id}`)
    .then((r) => r.data.data)
    .catch((e) => ({ err: true }));

  console.log(groupData);

  return {
    props: {
      ...req.cookies,
      ...groupData,
    },
  };
};
