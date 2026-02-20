import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export default function cn(...inputs: ClassValue[]): string | undefined {
    const classNames = twMerge(clsx(...inputs));
    return classNames || undefined; // Return undefined when classNames is empty to avoid rendering the class attribute.
}
