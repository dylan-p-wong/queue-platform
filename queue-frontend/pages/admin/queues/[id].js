import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function AdminQueue({ id }) {

  return (
    <div>
      <p>id</p>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  return { props: { id } };
};


export default AdminQueue
