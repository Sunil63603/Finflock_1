import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { loginUser } from "../lib/api.js";
import { useAuth } from "../store/auth";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields", {
        style: {
          backgroundColor: "#fef2f2",
          color: "#dc2626",
          border: "1px solid #fecaca",
        },
      });
      return;
    }

    try {
      setLoading(true);
      const data = await loginUser(email, password);
      login({ token: data.token, user: data.user });
      toast.success("Login successful!");
      navigate("/"); // or '/listing'
    } catch (e) {
      toast.error("User not found", {
        style: {
          backgroundColor: "#fef2f2",
          color: "#dc2626",
          border: "1px solid #fecaca",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-md"
      >
        {/* Enhanced Logo */}
        <motion.div
          className="text-center mb-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div
              className="relative"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shadow-glow">
                <Sparkles size={28} className="text-white" />
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl scale-150"></div>
            </motion.div>
            <span className="font-bold text-3xl tracking-tight bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">
              FinFlock
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-slate-600 text-lg"
          >
            Welcome back! Please sign in to your account
          </motion.p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-200 p-8"
        >
          <form onSubmit={onLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-700"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-12 pl-12 rounded-xl border-2 border-slate-200 focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-12 pl-12 pr-12 rounded-xl border-2 border-slate-200 focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-primary via-primary-500 to-primary-600 text-white font-semibold shadow-glow hover:shadow-glow-accent transition-all duration-300 relative overflow-hidden group"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">
                  {loading ? "Signing you in..." : "Sign In"}
                </span>
                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>
            </motion.div>
          </form>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-6 text-center"
          >
            <p className="text-xs text-slate-500">
              Don't have an account? Contact your administrator to get access.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
