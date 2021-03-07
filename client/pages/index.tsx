import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { createUser, login } from '../actions/users';
import { GetServerSideProps } from 'next';

export default function Home() {
  const router = useRouter();
  const { handleSubmit, register } = useForm();
  const [action, setAction] = useState('login');
  const [loading, setLoading] = useState(false);

  console.log('rendering');

  const submit = (data) => {
    setLoading(true);

    const callback = (s: boolean, m) => {
      if (s) {
        router.push('/dashboard');
      }
      setLoading(false);
    };

    if (action === 'login') {
      login({
        data,
        callback,
      });
    } else {
      createUser({
        data,
        callback,
      });
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <h1>Clubby</h1>
      </div>
      {action === 'login' ? (
        <div>
          <form className='full' onSubmit={handleSubmit(submit)}>
            {loading ? (
              <>loading</>
            ) : (
              <>
                <h2>Login</h2>
                <div>
                  <label>Email Address</label>
                  <input
                    type='email'
                    name='email'
                    ref={register({ required: true })}
                  />
                </div>
                <div>
                  <label>Password</label>
                  <input
                    type='password'
                    name='password'
                    ref={register({ required: true, minLength: 6 })}
                  />
                </div>
                <button className='full' type='submit'>
                  Login
                </button>
                <br />
                <span onClick={() => setAction('register')}>
                  Don't have an account? Sign up!
                </span>
              </>
            )}
          </form>
        </div>
      ) : (
        <div>
          <form className='full' onSubmit={handleSubmit(submit)}>
            <h2>Register</h2>
            <div>
              <label>Full name</label>
              <input
                type='text'
                name='name'
                ref={register({ required: true })}
              />
            </div>
            <div>
              <label>Email Address</label>
              <input
                type='email'
                name='email'
                ref={register({ required: true })}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type='password'
                name='password'
                ref={register({ required: true, minLength: 6 })}
              />
            </div>
            <button className='full' type='submit'>
              Sign up
            </button>
            <br />
            <span onClick={() => setAction('login')}>
              Already have an account? Login!
            </span>
          </form>
        </div>
      )}
    </div>
  );
}
