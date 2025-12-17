import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Cookies } from "react-cookie";
export type ProfileUser = {
  avatar?: string;
  userId: string;
  username: string;
  fullName?: string;
  email?: string;
  phone?: string;
  role?: string;
};
type AuthContextType = {
  profile: ProfileUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  setProfile: (p: ProfileUser | null) => void;
  logout: () => void;
};
const AuthContext = createContext<AuthContextType>({
  profile: null,
  isAuthenticated: false,
  loading: true,
  setProfile: () => {},
  logout: () => {},
});
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ProfileUser | null>(null);
  const [loading, setLoading] = useState(true);

  const cookies = new Cookies();

  const logout = () => {
    cookies.remove("token");
    setProfile(null);
  };

  const fetchProfile = async (token: string) => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile({
        avatar: res.data.avatar,
        userId: res.data.id,
        username: res.data.username,
        email: res.data.email,
        fullName: res.data.fullName,
        phone: res.data.phone,
        role: res.data.role,
      });
    } catch (err) {
      console.error("Verify token failed", err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = cookies.get("token");

    if (!token) {
      setLoading(false);
      return;
    }

    fetchProfile(token);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        profile,
        isAuthenticated: !!profile,
        loading,
        setProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}