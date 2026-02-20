import { Logo } from "./Logo";
import ThemeToggle from "@/theme/theme-toggle";

export const Header = () => {
    return (
        <header className="flex items-center justify-between">
            <Logo />

            <ThemeToggle />
        </header>
    );
};
