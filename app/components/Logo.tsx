"use client";

import { useTheme } from "next-themes";

import Logodark from "@/svgr/logo-dark-theme.svg";
import LogoLight from "@/svgr/logo-light-theme.svg";

export const Logo = () => {
    const { theme } = useTheme();
    return <div>{theme === "dark" ? <Logodark /> : <LogoLight />}</div>;
};
