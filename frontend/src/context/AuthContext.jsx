import { createContext, useContext, useEffect, useState } from "react";
import LoadingPage from "../pages/LoadingPage";
import supabase from "../utils/supabase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const signup = async ({ username, email, password }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });

    if (error) {
      console.error("Signup error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  };

  const login = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  };

  const signout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Signout error:", error.message);
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <AuthContext.Provider value={{ session, signup, login, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);
