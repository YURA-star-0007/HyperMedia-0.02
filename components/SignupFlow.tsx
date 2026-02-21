
import React, { useState } from 'react';
import { Mail, Phone, User as UserIcon, ShieldCheck, ArrowRight, Loader2, Lock } from 'lucide-react';
import { GeminiLogo, CURRENT_USER } from '../constants';
import { UserProfile } from '../types';

interface SignupFlowProps {
  onComplete: (profile: UserProfile) => void;
}

const TAKEN_USERNAMES = ['admin', 'google', 'gemini', 'insta_gemini', 'design_enthusiast'];

const SignupFlow: React.FC<SignupFlowProps> = ({ onComplete }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login Form Data
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup Form Data
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [realName, setRealName] = useState('');
  const [mobile, setMobile] = useState('');
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');

  const validateUsername = (val: string) => {
    const regex = /^[a-z0-9._]+$/;
    if (!regex.test(val) && val !== '') return false;
    return true;
  };

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    // Simulate network
    await new Promise(resolve => setTimeout(resolve, 800));

    if (!loginEmail || !loginPassword) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    // Mock Login Success
    onComplete({
      ...CURRENT_USER,
      email: loginEmail,
      realName: 'Design Enthusiast',
      mobile: '+1234567890',
      nickname: 'Creative Soul',
      backgroundImage: 'https://picsum.photos/seed/bg/800/300',
      bio: 'Capturing moments in pixels. 📸\nAI Art & Design.',
      socialLinks: 'dribbble.com/design',
      postCount: 128,
      followerCount: 4520,
      followingCount: 340
    });
  };

  const handleNext = async () => {
    setError('');
    setLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (step === 1) {
      if (!email.includes('@gmail.com')) {
        setError('Please enter a valid Gmail address.');
      } else {
        setStep(2);
      }
    } else if (step === 2) {
      if (otp.join('').length < 6) {
        setError('Please enter the full 6-digit code.');
      } else {
        setStep(3);
      }
    } else if (step === 3) {
      if (!realName || !mobile) {
        setError('Please fill in your private details.');
      } else {
        setStep(4);
      }
    } else if (step === 4) {
      if (!nickname || !username) {
        setError('Please choose your public names.');
      } else if (!validateUsername(username)) {
        setError('Username only allows small letters, underscores, and dots.');
      } else if (TAKEN_USERNAMES.includes(username)) {
        setError('This username is already taken.');
      } else {
        onComplete({
          id: 'new_user',
          email,
          realName,
          mobile,
          nickname,
          username,
          avatar: `new_user_${username}`, // Mark as new user avatar
          isVerified: false,
          postCount: 0,
          followerCount: 0,
          followingCount: 0,
          backgroundImage: '',
          bio: '',
          socialLinks: ''
        });
      }
    }
    setLoading(false);
  };

  const updateOtp = (val: string, index: number) => {
    if (isNaN(Number(val))) return;
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);
    
    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
      <div className="w-full max-w-md bg-zinc-900/40 border border-white/10 rounded-[40px] p-8 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
        {/* Progress Bar (Only for Signup) */}
        {!isLogin && (
          <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }} />
        )}

        <div className="flex flex-col items-center mb-8">
          <GeminiLogo className="w-12 h-12 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            {isLogin ? "Welcome Back" : step === 1 ? "Create Account" : step === 2 ? "Verify Email" : step === 3 ? "Details" : "Profile Setup"}
          </h2>
          <p className="text-zinc-400 text-sm text-center">
            {isLogin ? "Log in to continue your journey" : step === 1 ? "Sign up with your Gmail to get started" : step === 2 ? `Code sent to ${email}` : "Let's get to know you"}
          </p>
        </div>

        <div className="space-y-6">
          {isLogin ? (
            // LOGIN FORM
            <>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Email or Username"
                  className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
            </>
          ) : (
            // SIGNUP STEPS
            <>
              {step === 1 && (
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="gmail_address@gmail.com"
                    className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="flex justify-between gap-2">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="text"
                      maxLength={1}
                      className="w-full h-12 bg-black/20 border border-white/10 rounded-xl text-center text-xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      value={digit}
                      onChange={(e) => updateOtp(e.target.value, i)}
                    />
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="relative">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Real Full Name"
                      className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      value={realName}
                      onChange={(e) => setRealName(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                    <input
                      type="tel"
                      placeholder="Primary Mobile Number"
                      className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Nickname (shown to others)"
                      className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">@</div>
                    <input
                      type="text"
                      placeholder="unique_username"
                      className={`w-full bg-black/20 border ${!validateUsername(username) ? 'border-red-500' : 'border-white/10'} rounded-2xl py-4 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50`}
                      value={username}
                      onChange={(e) => setUsername(e.target.value.toLowerCase())}
                    />
                  </div>
                  <ul className="text-[10px] text-zinc-500 space-y-1 px-2">
                    <li className={validateUsername(username) ? "text-zinc-500" : "text-red-400"}>• Use small letters, underscores, and full stops only</li>
                    <li className={username && !TAKEN_USERNAMES.includes(username) ? "text-green-400" : "text-zinc-500"}>• Username must be unique</li>
                  </ul>
                </div>
              )}
            </>
          )}

          {error && <p className="text-red-400 text-xs text-center">{error}</p>}

          <button
            onClick={isLogin ? handleLogin : handleNext}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl py-4 font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 shadow-xl shadow-purple-900/20"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                {isLogin ? "Log In" : step === 4 ? "Complete Signup" : "Continue"}
                <ArrowRight size={20} />
              </>
            )}
          </button>

          <div className="text-center mt-4">
             <p className="text-zinc-500 text-sm">
               {isLogin ? "Don't have an account?" : "Already have an account?"}
               <button 
                 onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                    setStep(1);
                 }} 
                 className="ml-2 text-blue-500 font-bold hover:underline"
               >
                 {isLogin ? "Sign Up" : "Log In"}
               </button>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupFlow;
