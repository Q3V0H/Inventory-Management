import { useEffect, useState } from "react";

function useDevice() {
  const getDeviceFromWidth = (width) => {
    if (width < 768) {
      return "sm";
    } else if (width >= 768 && width < 992) {
      return "md";
    } else {
      return "lg";
    }
  };

  const [device, setDevice] = useState(() => {
    if (typeof window !== "undefined") {
      return getDeviceFromWidth(window.innerWidth);
    }
    return "lg";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setDevice(getDeviceFromWidth(window.innerWidth));
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return device;
}

export default useDevice;
