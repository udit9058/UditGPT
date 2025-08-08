import { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

export function useTheme() {
  const [theme, setTheme] = useLocalStorageState<"light" | "dark">("theme", {
    defaultValue: "light",
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return {
    theme,
    isDark: theme === "dark",
    toggleTheme,
  };
}