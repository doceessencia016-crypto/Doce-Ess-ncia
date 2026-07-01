import { createContext, useContext, useEffect, useState } from "react";
import { fetchLogoUrl } from "../lib/settings";
import logoStatic from "../assets/logo-transparent.png";

const LogoContext = createContext(logoStatic);

export function LogoProvider({ children }) {
  const [logoUrl, setLogoUrl] = useState(logoStatic);

  useEffect(() => {
    fetchLogoUrl().then((url) => {
      if (url) setLogoUrl(url);
    });
  }, []);

  return <LogoContext.Provider value={{ logoUrl, setLogoUrl }}>{children}</LogoContext.Provider>;
}

export function useLogo() {
  return useContext(LogoContext);
}
