import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, GamepadIcon, Wand2, Lock, Unlock, X } from 'lucide-react';
import { encryptToken } from '../../utils/encryption';

const PlayfulLogin = () => {
  const [password, setPassword] = useState('');
  const [showGame, setShowGame] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [message, setMessage] = useState({ type: 'default', text: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const funnyMessages = [
    "Nice try, but our security is powered by unicorn magic! 🦄",
    "Hold up! That password is as wrong as pineapple on pizza 🍕",
    "Error 418: I'm a teapot, and that's not the password ☕",
    "Somewhere, a security engineer is giggling at this attempt 😄",
    "Plot twist: The real password was the friends we made along the way! (Just kidding, try again)",
    "Our AI detected a disturbance in the Force... wrong password! ⚔️",
  ];

  const successMessages = [
    "Quantum authentication successful! 🌟",
    "Welcome to the secret club! 🎉",
    "Access granted! You're officially awesome! 💫",
  ];

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (password === import.meta.env.VITE_APP_PASSWORD) {
      setMessage({ 
        type: 'success', 
        text: successMessages[Math.floor(Math.random() * successMessages.length)] 
      });
      const token = encryptToken(password);
      sessionStorage.setItem('authToken', token);
      setTimeout(() => navigate(from, { replace: true }), 1500);
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      
      setAttempts(prev => prev + 1);
      if (attempts >= 2) {
        setShowGame(true);
      }
      
      setMessage({ 
        type: 'error', 
        text: funnyMessages[Math.floor(Math.random() * funnyMessages.length)] 
      });
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 relative">
        {/* Floating shapes for background effect */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-20 h-20 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-delayed"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        </div>

        {/* Main content */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 relative overflow-hidden">
          {/* Top decorative pattern */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

          {/* Header */}
          <div className="text-center relative">
            <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center transform -translate-y-12 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 -mt-6 mb-2">
              Protected Universe
            </h2>
            <p className="text-gray-600 text-sm">
              {!showGame ? "Enter the secret spell to continue" : "Want to play a game instead?"}
            </p>
          </div>

          {/* Login Form */}
          {!showGame ? (
            <form onSubmit={handlePasswordSubmit} className="mt-8 space-y-6">
              <div className="relative">
                <div className={`transition-all duration-300 transform ${isShaking ? 'animate-shake' : ''}`}>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                    placeholder="Enter the magic password"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {password ? <Lock className="w-4 h-4 text-purple-500" /> : <Unlock className="w-4 h-4 text-gray-400" />}
                  </div>
                </div>
              </div>

              {/* Message Display */}
              {message.text && (
                <div className={`p-3 rounded-lg text-sm ${
                  message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                }`}>
                  {message.text}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-200 transform transition-all hover:scale-[1.02]"
              >
                <span className="flex items-center justify-center gap-2">
                  <Wand2 className="w-4 h-4" />
                  Cast Spell
                </span>
              </button>
            </form>
          ) : (
            // Game suggestion section
            <div className="mt-8 space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <GamepadIcon className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold text-blue-700">Wanna have some fun instead?</h3>
                </div>
                <p className="text-sm text-blue-600">
                  Instead of trying to hack us (which won't work anyway 😉), why not try one of these awesome games?
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://2048game.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-center"
                >
                  <h4 className="font-semibold mb-1">2048</h4>
                  <p className="text-sm text-gray-600">Beat your high score!</p>
                </a>
                <a
                  href="https://tetris.com/play-tetris"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all text-center"
                >
                  <h4 className="font-semibold mb-1">Tetris</h4>
                  <p className="text-sm text-gray-600">A classic favorite!</p>
                </a>
              </div>

              <button
                onClick={() => setShowGame(false)}
                className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Back to Login
              </button>
            </div>
          )}
        </div>

        {/* Bottom text */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Protected by quantum encryption and unicorn magic! 🦄✨
        </p>
      </div>
    </div>
  );
};

export default PlayfulLogin;

