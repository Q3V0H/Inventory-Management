import { useContext } from "react";

import AppContext from "../context/AppContext";

function useApp() {
  const { isSidebarOpen, setIsSidebarOpen, toggleSidebar, device, setDevice } =
    useContext(AppContext);

  return {
    isSidebarOpen,
    setIsSidebarOpen,
    toggleSidebar,
    device,
    setDevice,
  };
}

export default useApp;
