import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

function Login({login}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    // Proceed with login logic
    console.log('Email:', email);
    console.log('Password:', password);
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Success:', data);
        // Redirect to dashboard
        login(data);
        router.push('/dashboard');
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
        <p className="text-gray-600 mb-4">Login to your account</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <div className="relative">
              <input
                type="email"
                id="email"
                className={`w-full border rounded-md px-3 py-2 mt-1 ${emailError ? 'border-red-500' : 'border-gray-300'}`}
                value={email}
                onChange={handleEmailChange}
              />
              <FontAwesomeIcon icon={faEnvelope} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="w-full border rounded-md px-3 py-2 mt-1 border-gray-300"
                value={password}
                onChange={handlePasswordChange}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={handleTogglePasswordVisibility}
              />
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <Link href="/forgot-password" className="text-blue-500 hover:underline">Forgot password?</Link>
            <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">Login</button>
          </div>
          <p className="text-gray-600">Not registered? <Link href="/register" className="text-blue-500 hover:underline">Create an account</Link></p>
        </form>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch({ type: 'LOGIN', payload: user }),
  };
}

export default connect(null, mapDispatchToProps)(Login);