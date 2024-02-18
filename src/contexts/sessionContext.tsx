import {
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type Session = {
  username: string;
};

const sessionContext = createContext<{
  session: Session;
  setSession: React.Dispatch<SetStateAction<Session>>;
}>({ session: { username: "" }, setSession: () => {} });

export function SessionContextProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session>({ username: "" });

  return (
    <sessionContext.Provider value={{ session, setSession }}>
      {children}
    </sessionContext.Provider>
  );
}

export function useSession() {
  return useContext(sessionContext);
}
