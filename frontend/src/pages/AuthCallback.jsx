import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { completeSocialLogin } = useAuth();

  const decodeUser = (value) => {
    const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    return JSON.parse(atob(padded));
  };

  useEffect(() => {
    const error = searchParams.get("error");
    const token = searchParams.get("token");
    const encodedUser = searchParams.get("user");

    if (error) {
      toast.error(error);
      navigate("/login", { replace: true });
      return;
    }

    if (!token || !encodedUser) {
      toast.error("Social sign in did not return account details.");
      navigate("/login", { replace: true });
      return;
    }

    try {
      const user = decodeUser(encodedUser);
      completeSocialLogin({ token, user });
      navigate("/dashboard", { replace: true });
    } catch {
      toast.error("Could not finish social sign in.");
      navigate("/login", { replace: true });
    }
  }, [completeSocialLogin, navigate, searchParams]);

  return (
    <main className="auth-shell">
      <section className="auth-card auth-card--callback">
        <Loader2 className="auth-spinner" aria-hidden="true" />
        <h1>Finishing sign in</h1>
        <p>We are connecting your workspace account.</p>
        <Link to="/login">Back to login</Link>
      </section>
    </main>
  );
};

export default AuthCallback;
