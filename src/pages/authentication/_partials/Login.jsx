import { useState } from 'react';
import { signInWithGoogle, login } from '../../../utils/authService';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { FcGoogle } from 'react-icons/fc';
import Footer from '../../../components/Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate('/'); // redirect after login
    } catch (error) {
      console.error(error);
      alert('Login failed!');
    }
  };

  return (
    <>
      <div className="m-auto w-1/4 mt-30 bg-white mb-20">
        <Button className="!w-full !mb-7" onClick={signInWithGoogle}>
          <FcGoogle /> Continue with Google
        </Button>
        <label className="text-[#474B57]">Email</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border border-[#E6E7E8] block w-full px-2 rounded h-10 mb-5"
        />
        <label className="text-[#474B57]">password</label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          className="border border-[#E6E7E8] block w-full px-2 rounded h-10"
        />
        <Button
          type="text"
          className="!text-end  !flex !justify-end !px-0 !w-full !text-xs !pt-3"
        >
          Forgot password?
        </Button>
        <Button
          className="!w-full !bg-[#0E1422] !text-white !mt-6"
          onClick={handleLogin}
        >
          Login
        </Button>
        <p className="text-xs text-center pt-4">
          Dont have an account? <NavLink to="/signup">Sign up</NavLink>
        </p>
      </div>
      <Footer className="bg-[#f6f6f6]" />
    </>
  );
}
