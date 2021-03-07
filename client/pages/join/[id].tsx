import { GetServerSideProps } from 'next';
import { sConn } from '../../actions/connection';

export default function JoinGroup({ data }) {
  return <>{data.err ? data.data.message : data.message}</>;
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { token } = req.cookies;
  const { id } = query;

  const data = await sConn(token)
    .get(`/api/groups/join/${id}`)
    .then((r) => r.data)
    .catch((e) => ({ err: true, data: e.response.data || {} }));

  console.log(data);

  return {
    props: {
      data,
    },
  };
};
