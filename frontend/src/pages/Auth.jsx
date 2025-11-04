import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import InputField from '../components/InputField.jsx';
import { useAuth } from '../hooks/useAuth.js';

const AuthPage = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login');
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      if (mode === 'login') {
        await login({ email: values.email, password: values.password });
      } else {
        await register({
          name: values.name,
          email: values.email,
          password: values.password,
        });
      }
      navigate('/dashboard');
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error?.response?.data?.message ?? 'Authentication failed');
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold text-white">
          {mode === 'login' ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="text-sm text-slate-400">
          {mode === 'login'
            ? 'Access your menu workspace with your credentials.'
            : 'Sign up to start building and sharing stunning menus.'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="card space-y-5">
        {mode === 'register' ? (
          <InputField
            label="Full name"
            placeholder="Jane Doe"
            {...formRegister('name', {
              required: mode === 'register' && 'Please enter your name',
            })}
            error={errors.name?.message}
          />
        ) : null}
        <InputField
          label="Email address"
          type="email"
          placeholder="jane@culinary.studio"
          {...formRegister('email', {
            required: 'Email is required',
          })}
          error={errors.email?.message}
        />
        <InputField
          label="Password"
          type="password"
          placeholder="••••••••"
          {...formRegister('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          })}
          error={errors.password?.message}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Processing…' : mode === 'login' ? 'Sign in' : 'Create account'}
        </Button>
      </form>

      <p className="text-center text-sm text-slate-400">
        {mode === 'login' ? (
          <>
            Don&apos;t have an account?{' '}
            <button
              type="button"
              className="font-semibold text-brand-300 hover:text-brand-200"
              onClick={() => setMode('register')}
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button
              type="button"
              className="font-semibold text-brand-300 hover:text-brand-200"
              onClick={() => setMode('login')}
            >
              Sign in
            </button>
          </>
        )}
      </p>
    </div>
  );
};

export default AuthPage;
