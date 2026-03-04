import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [session, setSession] = useState(undefined); // undefined = loading

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session === null && router.pathname !== '/login') {
      router.replace('/login');
    }
  }, [session, router.pathname]);

  return (
    <>
      <Head>
        <title>UE5 C++ Flashcards</title>
        <meta name="description" content="Study flashcards for Unreal Engine 5 C++ Game Development" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      {session === undefined ? (
        <div style={{ minHeight: '100vh', background: '#060810' }} />
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}
