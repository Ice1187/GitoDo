import Router from 'next/router';

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
