import Info from "@/svgr/icon-info.svg";

interface Props {
    readonly limit: string | null;
}

export const ErrorMessage: React.FunctionComponent<Props> = ({ limit }) => {
    return (
        <p
            id="error_message"
            className=" flex items-center gap-2 font-normal text-preset-4/[130%] tracking-[-0.6px] text-orange-800 dark:text-orange-500"
        >
            <span>
                <Info />
            </span>
            Limit reached! Your text exceeds {limit} characters.
        </p>
    );
};
