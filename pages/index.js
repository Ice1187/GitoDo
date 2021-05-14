import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Header from '../components/header';
import MainTaskDisplay from '../components/mainTaskTable';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>GitoDo</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header></Header>

      <main className={styles.main + ' bg-gray-100'}>
        <MainTaskDisplay></MainTaskDisplay>
      </main>
    </div>
  );
}
