import { useState } from 'react';
import { register } from '../../../utils/authService';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { signInWithGoogle } from '../../../utils/authService';
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
    <form onSubmit={handleSignup}>
      <div className="m-auto w-1/4 mt-30 bg-white mb-20 p-6 rounded ">
        <Button className="!w-full !mb-7" onClick={signInWithGoogle}>
          <FcGoogle /> Continue with Google
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
          By creating an account you agree with our Terms of Service, Privacy
          Policy,
        </p>

        <Button
          className="!w-full !bg-[#0E1422] !text-white !mt-6"
          onClick={handleSignup}
        >
          Create Account
        </Button>

        <p className="text-xs text-center pt-4">
          Already have an account? <NavLink to="/login">Login</NavLink>
        </p>
      </div>
    </form>
  );
}
