import Router from 'next/router';

import BranchSvg from '../components/branchSvg';

export default function Home() {
  Router.push(
    {
      pathname: '/login',
      query: {},
    },
    `/login`
  );
  return <></>;
}
