import useLocalStorage from "./useLocalStorage";

export type User = {
  name: string;
};

function useAuth() {
  const [user, setUser] = useLocalStorage<User | null>("auth-user", null);

  function login(name: string) {
    setUser({ name });
  }

  function logout() {
    setUser(null);
  }

  return {
    user,
    login,
    logout,
  };
}

export default useAuth;
