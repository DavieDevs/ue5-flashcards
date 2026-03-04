import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export default function Login() {
  const router = useRouter();
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace('/');
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    let result;
    if (mode === 'signin') {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({ email, password });
    }
    setLoading(false);
    if (result.error) {
      setError(result.error.message);
    } else {
      router.push('/');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#060810',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'DM Sans, sans-serif',
      padding: '24px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '380px',
        background: '#0a0e17',
        border: '1px solid #161b22',
        borderRadius: '16px',
        padding: '36px 32px'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '6px',
            background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', fontWeight: 800, color: '#000'
          }}>U</div>
          <span style={{ fontWeight: 700, fontSize: '15px', color: '#f0f6fc' }}>UE5 Flashcards</span>
        </div>

        <h2 style={{ color: '#f0f6fc', fontSize: '20px', fontWeight: 700, margin: '0 0 8px' }}>
          {mode === 'signin' ? 'Sign in' : 'Create account'}
        </h2>
        <p style={{ color: '#484f58', fontSize: '13px', margin: '0 0 28px' }}>
          {mode === 'signin' ? 'Enter your credentials to continue.' : 'Sign up to access your flashcards.'}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#8b949e', marginBottom: '6px' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              style={{
                width: '100%',
                background: '#0d1117',
                border: '1px solid #21262d',
                borderRadius: '8px',
                padding: '10px 12px',
                color: '#f0f6fc',
                fontSize: '14px',
                fontFamily: 'inherit',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#8b949e', marginBottom: '6px' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              style={{
                width: '100%',
                background: '#0d1117',
                border: '1px solid #21262d',
                borderRadius: '8px',
                padding: '10px 12px',
                color: '#f0f6fc',
                fontSize: '14px',
                fontFamily: 'inherit',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {error && (
            <div style={{ color: '#f85149', fontSize: '13px', background: '#f8514918', border: '1px solid #f8514933', borderRadius: '8px', padding: '10px 12px' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '4px',
              background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
              border: 'none',
              borderRadius: '10px',
              padding: '12px',
              color: '#000',
              fontWeight: 700,
              fontSize: '14px',
              fontFamily: 'inherit',
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Please wait…' : (mode === 'signin' ? 'Sign in' : 'Create account')}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: '#484f58' }}>
          {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); }}
            style={{ background: 'none', border: 'none', color: '#00d4ff', fontSize: '13px', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}
          >
            {mode === 'signin' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}
