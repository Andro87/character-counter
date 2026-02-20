interface Props {
    readonly statNumber: number;
    readonly statTitle: string;
    readonly bgColor: string;
    readonly bgUrl: string;
}

export const Stat: React.FunctionComponent<Props> = ({
    statNumber,
    statTitle,
    bgColor,
    bgUrl
}) => {
    return (
        <div
            style={{ backgroundImage: `url(${bgUrl})` }}
            className={`rounded-xl space-y-2  p-5 md:px-4 md:py-4 lg:p-4  ${bgColor}  bg-no-repeat bg-right`}
        >
            <p className="font-bold text-preset-1-mobile/[100%] tracking-[-1px] md:text-preset-1 text-neutral-900 ">
                {String(statNumber).padStart(2, "0")}
            </p>
            <p className="font-normal text-preset-3/[140%] tracking-[-0.6px] text-neutral-900 ">
                {statTitle}
            </p>
        </div>
    );
};
