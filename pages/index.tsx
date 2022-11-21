import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useQuery } from 'react-query';
import { useRequest } from '../src/hooks';
import { UserService, AuthService } from '../src/services';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  // const { data: me } = useQuery("me", UserService.me, {
  //   refetchInterval: 500,
  // });

  const { data: me } = useRequest('me', UserService.me, {
    refetchInterval: 500,
  });

  console.log('내 정보입니다', me);

  return (
    <div className={styles.container}>
      <Head>
        <title>NUMBLE:: 쿠팡 클론</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Hello World!</h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>src/services</code>,
          <code className={styles.code}>src/hooks</code>
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src='/numble.png' alt='NUMBLE Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
