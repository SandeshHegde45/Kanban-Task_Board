import { useEffect } from "react";
import { useSelector } from "react-redux";
import AppRoute from "./routes/AppRoute";
import ToastHost from "./features/toast/components/ToastHost";
import { applyTheme } from "./features/theme/themeStorage";

export default function App() {
  const mode = useSelector((s) => s.theme.mode);
  useEffect(() => applyTheme(mode), [mode]);

  return (
    <>
      <AppRoute />
      <ToastHost />
    </>
  );
}
