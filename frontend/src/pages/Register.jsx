import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, user } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  if (user) {
    navigate("/dashboard", { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await register(name, email, password);

    if (result.success) {
      navigate("/login");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Dark / Branding */}
      <div className="hidden lg:flex w-1/2 bg-[#0F172A] relative overflow-hidden flex-col justify-between p-12">
        {/* Abstract Background Elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-[#6161FF]/20 to-transparent rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-[#0F172A] to-[#6161FF]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #64728B 0, #64728B 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}></div>
        
        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-[#FF00D9] to-[#6161FF] flex items-center justify-center">
            <span className="text-white font-bold text-sm">TF</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">TaskFlow</span>
        </div>

        {/* Feature List Card */}
        <div className="relative z-10 bg-[#1E293B]/60 backdrop-blur-md border border-[#334155]/50 p-8 rounded-2xl max-w-md mt-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6161FF] to-[#FF00D9] flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-xl font-semibold text-white">Scale with confidence</h3>
          </div>
          
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-[#F1F5F9] text-sm">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Unlimited projects and workspaces
            </li>
            <li className="flex items-center gap-3 text-[#F1F5F9] text-sm">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Advanced roles and permissions
            </li>
            <li className="flex items-center gap-3 text-[#F1F5F9] text-sm">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Enterprise-grade security standards
            </li>
          </ul>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo (hidden on desktop) */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded bg-gradient-to-tr from-[#FF00D9] to-[#6161FF] flex items-center justify-center">
              <span className="text-white font-bold text-sm">TF</span>
            </div>
            <span className="text-slate-900 font-bold text-xl tracking-tight">TaskFlow</span>
          </div>

          <h2 className="text-3xl font-bold text-[#0F172A] mb-2">Create an account</h2>
          <p className="text-[#64728B] mb-8 text-sm">Start your 14-day free trial. No credit card required.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#0F172A] mb-1.5">Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Morgan"
                required
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#0F172A] mb-1.5">Work Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@company.com"
                required
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#0F172A] mb-1.5">Create Password</label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  required
                  minLength={6}
                  className="input-field pr-10"
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64728B] hover:text-[#0F172A]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                </button>
              </div>
            </div>

            <div className="flex items-start pt-2 pb-4">
              <input id="terms" type="checkbox" required className="mt-1 w-4 h-4 text-[#6161FF] border-[#CBD5E1] rounded focus:ring-[#6161FF]" />
              <label htmlFor="terms" className="ml-2 block text-sm text-[#64728B]">
                I agree to the <a href="#" className="text-[#6161FF] hover:underline">Terms and Conditions</a> and <a href="#" className="text-[#6161FF] hover:underline">Privacy Policy</a>.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#9C27B0] bg-gradient-to-r from-[#6161FF] to-[#FF00D9] text-white py-3 rounded-lg font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-[#0F172A] text-sm mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-[#6161FF] font-medium hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
