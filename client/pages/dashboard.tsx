import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import conn, { sConn } from '../actions/connection';
import { createGroup } from '../actions/groups';
import Links from '../components/Link';
import Modal from '../components/Modal';

export default function Dashboard({ name, groups }) {
  const [show, setShow] = useState(false);
  const [grps, setGroups] = useState(groups);
  const { handleSubmit, register } = useForm();
  const [loading, setLoading] = useState(false);

  const submit = (data) => {
    setLoading(true);

    createGroup({
      data,
      callback: (s, m) => {
        if (s) {
          setGroups(m);
        }
        setLoading(false);
      },
    });
  };

  return (
    <div>
      <div>
        <h1>Hi {name} </h1>
      </div>
      <div>
        <div className='flex'>
          <h4>My clubs</h4>
          <button onClick={() => setShow(true)}>New club</button>
        </div>
      </div>
      <div>
        {grps.map((e, i) => (
          <Links href={`/group/${e.group.id}`}>
            <div className='full flex white' key={i}>
              <div>
                <h3>{e.group.name}</h3>
                <small>{e.group.members} members</small>
              </div>
              {e.isAdmin && <small>Admin</small>}
            </div>
          </Links>
        ))}
      </div>
      <Modal control={show} close={setShow}>
        <form className='full' onSubmit={handleSubmit(submit)}>
          <h1>Crate a new club</h1>
          <div>
            <label>Group name</label>
            <input
              className='full'
              type='text'
              name='name'
              ref={register({ required: true })}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              className='full'
              name='desc'
              ref={register({ required: true })}
            />
          </div>
          <button className='full' type='submit'>
            Create
          </button>
        </form>
      </Modal>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = req.cookies;

  const groups = await sConn(token)
    .get('/api/groups')
    .then((r) => r.data.data)
    .catch((e) => ({ err: true }));

  console.log(groups);

  return {
    props: {
      ...req.cookies,
      groups,
    },
  };
};
