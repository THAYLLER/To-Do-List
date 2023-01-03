import React from "react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from 'next/image'

export default function ToggleThemeButton() {
  const { theme, setTheme } = useTheme();
  const [toggle, setToggle] = useState({ mode: "dark", icon: "moon" });

  useEffect(() => {
    theme === "light"
      ? setToggle({ mode: "dark", icon: "moon" })
      : setToggle({ mode: "light", icon: "sun" });
  }, [theme]);

  return (
    <button
      className="focus:outline-none"
      aria-label="Toggle Theme"
      type="button"
      onClick={() => setTheme(toggle.mode)}
    >
      <Image
        className="h-5 sm:h-7 w-5 sm:w-7"
        width={20}
        height={20}
        src={`/icon-${toggle.icon}.svg`}
        alt={toggle.icon}
      />
    </button>
  );
}
