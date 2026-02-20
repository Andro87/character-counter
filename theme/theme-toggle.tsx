"use client";

import cn from "@/utils/class-merge";
import { useTheme } from "next-themes";
import { JSX, useEffect, useState } from "react";

import Moon from "@/svgr/icon-moon.svg";
import Sun from "@/svgr/icon-sun.svg";

export default function ThemeToggle(): JSX.Element {
    const { theme, resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    // Only compute theme after mount
    const effectiveTheme =
        mounted && theme === "system" && resolvedTheme
            ? resolvedTheme
            : mounted
              ? theme
              : null;

    const nextTheme = effectiveTheme === "dark" ? "light" : "dark";

    const label = effectiveTheme
        ? `Switch to ${nextTheme} mode`
        : "Toggle theme";

    const toggleTheme = () => {
        if (!mounted || !nextTheme) return;
        setTheme(nextTheme);
    };

    return (
        <button
            type="button"
            title={label}
            aria-label={label}
            aria-pressed={effectiveTheme === "dark"}
            disabled={!mounted}
            onClick={toggleTheme}
            className={cn(
                "shrink-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-700 rounded-md md:rounded-lg transition-colors w-8 h-8 md:w-11 md:h-11",

                mounted
                    ? "cursor-pointer hover:border-transparent hover:bg-neutral-200 dark:hover:bg-neutral-600 focus:outline-2 focus:outline-purple-500 focus:drop-shadow-[0_0px_10px_rgb(211,160,250)] "
                    : "cursor-default pointer-events-none"
            )}
        >
            <Sun className=" hidden dark:block " />

            <Moon className=" dark:hidden" />
        </button>
    );
}
