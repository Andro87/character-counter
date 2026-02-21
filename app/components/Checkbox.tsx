interface Props {
    readonly inputId: string;
    readonly inputName: string;
    readonly isChecked: boolean;
    readonly inputTitle: string;
    readonly onHandleCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: React.FunctionComponent<Props> = ({
    inputId,
    inputName,
    isChecked,
    onHandleCheckbox,
    inputTitle
}) => {
    return (
        <div className="flex items-center gap-2.5 ">
            <input
                type="checkbox"
                id={inputId}
                name={inputName}
                checked={isChecked}
                className="relative appearance-none w-4 h-4 cursor-pointer border border-neutral-900 dark:border-neutral-200 rounded-sm transition-all hover:border-neutral-600 dark:hover:border-neutral-0 focus:bg-neutral-0 focus:outline-offset-3 focus:border focus:border-neutral-200 focus:outline-purple-400 focus:ring-4 focus:ring-neutral-0  focus:checked:border-neutral-0 focus:checked:bg-purple-400 checked:bg-purple-400 checked:border-purple-400 p-2 [ checkbox-check ] "
                onChange={onHandleCheckbox}
            />
            <label htmlFor={inputId} className="capitalize ">
                {inputTitle}
            </label>
        </div>
    );
};
