import { useState } from 'react';
import { register, signInWithGoogle } from '../../../utils/authService';
import { useNavigate, NavLink } from 'react-router-dom';
import { Button } from 'antd';
import { FcGoogle } from 'react-icons/fc';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async e => {
    e.preventDefault();
    try {
      await register(email, password, name);
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-white p-8 rounded-md shadow-md"
      >
        <Button
          className="!w-full !mb-7 flex items-center justify-center gap-2"
          onClick={signInWithGoogle}
        >
          <FcGoogle size={20} /> Continue with Google
        </Button>

        <label className="text-[#474B57]">Name</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          className="border border-[#E6E7E8] block w-full rounded h-10 mb-5 px-3"
        />

        <label className="text-[#474B57]">Email</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border border-[#E6E7E8] block w-full rounded h-10 mb-5 px-3"
        />

        <label className="text-[#474B57]">Password</label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          className="border border-[#E6E7E8] block w-full rounded h-10 px-3"
        />

        <p className="text-[#5C5F6A] text-xs mt-3">
          By creating an account you agree with our{' '}
          <span className="text-blue-600 underline cursor-pointer">
            Terms of Service
          </span>{' '}
          and{' '}
          <span className="text-blue-600 underline cursor-pointer">
            Privacy Policy
          </span>
          .
        </p>

        <Button
          htmlType="submit"
          className="!w-full !bg-[#0E1422] !text-white !mt-6"
        >
          Create Account
        </Button>

        <p className="text-xs text-center pt-4">
          Already have an account?{' '}
          <NavLink to="/login" className="text-blue-600">
            Login
          </NavLink>
        </p>
      </form>
    </div>
  );
}
