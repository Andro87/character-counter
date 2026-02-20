interface Props {
    readonly letter: string;
    readonly letterFrequency: number;
    readonly totalChar: number;
}

export const LetterStat: React.FunctionComponent<Props> = ({
    letter,
    letterFrequency,
    totalChar
}) => {
    const letterPercentage = (letterFrequency / totalChar) * 100;

    const roundedPercentage = Math.round(letterPercentage * 10) / 10;

    return (
        <div className="flex items-center gap-3.5 font-normal text-preset-4/[130%] tracking-[-0.6px]  ">
            <p className="uppercase">{letter}</p>
            <div className="flex flex-1 h-3.5 rounded-full bg-neutral-100 dark:bg-neutral-800">
                <div
                    className="w-90 h-3.5 rounded-full bg-purple-400 "
                    style={{ width: `${roundedPercentage || 0}%` }}
                ></div>
            </div>
            <p>
                {letterFrequency} ({roundedPercentage.toFixed(2)}%)
            </p>
        </div>
    );
};
