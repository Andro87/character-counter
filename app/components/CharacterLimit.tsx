interface Props {
    readonly limit: string | null;
    readonly onHandleTextLimit: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

export const CharacterLimit: React.FunctionComponent<Props> = ({
    limit,
    onHandleTextLimit
}) => {
    return (
        <div className="flex items-center gap-2.5 ">
            <input
                type="number"
                id="textLimit"
                name="textLimit"
                value={limit ?? ""}
                min={1}
                step={1}
                className=" appearance-none relative w-15 h-6 cursor-pointer border border-neutral-900 dark:border-neutral-200 rounded-sm transition-all hover:border-neutral-600 dark:hover:border-neutral-0 focus:bg-neutral-0 focus:outline-offset-4 focus:border focus:border-neutral-200 focus:outline-purple-400 focus:ring-4 focus:ring-neutral-0  focus:checked:border-neutral-0 focus:checked:bg-purple-400 checked:bg-purple-400 checked:border-purple-400 p-2  [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  text-end"
                onChange={onHandleTextLimit}
                onKeyDown={e => {
                    // Prevents users from even typing '.', '-', or 'e'
                    if (["e", "E", "-", "+", ".", ","].includes(e.key)) {
                        e.preventDefault();
                    }
                }}
            />
            <label htmlFor="textLimit" className="capitalize visually-hidden ">
                Set Character Limit
            </label>
        </div>
    );
};
