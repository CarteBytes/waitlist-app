import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { loginUser } from "../apiFunctions/auth";
import { fetchUser } from "../apiFunctions/users";
import { useRouter } from "next/navigation";
import { fetchOrgRestaurants } from "../apiFunctions/restaurant";

interface AuthContextProps {
  user: any;
  authToken: string | null; // Assuming session is a token or ID
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchTokenAndUser = async () => {
      setLoading(true);
      try {
        const storedToken = localStorage.getItem("cb_authToken"); // Example: localStorage
        const storedId = localStorage.getItem("cb_userId");
        if (storedToken && storedId) {
          setAuthToken(storedToken);
          // const { userId } = parseSession(storedToken);
          const userData = await fetchUser(storedId);
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          //logout();
        }
      } catch (error) {
        console.error("Error getting user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenAndUser();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const data = await loginUser(email, password);
      const userData = data.user.CARTEBYTES_USER_DATA;
      const auth = data.session.access_token;

      setUser(userData);
      setAuthToken(auth);
      setIsAuthenticated(true);

      // Store the token securely
      localStorage.setItem("cb_authToken", auth);
      localStorage.setItem("cb_userId", userData.id);

      const restuarants = await fetchOrgRestaurants(userData.organization_id);
      const restaurant = restuarants[0];

      router.push(`/menu/${restaurant.slug}/edit`);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    // Clear authToken
    localStorage.removeItem("cb_authToken");
    localStorage.removeItem("cb_userId");
    setUser(null);
    setAuthToken(null);
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, authToken, loading, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Utility: Decode session (example JWT parsing)
const parseSession = (session: string): { userId: string } => {
  const payload = JSON.parse(atob(session.split(".")[1])); // Basic JWT decoding
  return { userId: payload.sub }; // Assuming `sub` holds the userId
};
