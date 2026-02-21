"use client";

import { CharacterLimit } from "./CharacterLimit";
import { Checkbox } from "./Checkbox";
import { ErrorMessage } from "./EroorMessage";
import { LetterStat } from "./LetterStat";
import { Stat } from "./Stat";
import { useState } from "react";

import Info from "@/svgr/icon-info.svg";

export const Main = () => {
    const [text, setText] = useState("");

    const [isSetLimitOpen, setIsSetLimitOpen] = useState(false);

    const [textLimit, setTextLimit] = useState<string | null>(null);

    const [isExpandedOpen, setIsExpandedOpen] = useState(false);

    const [isExcludeSpace, setIsExcludeSpace] = useState(false);

    const [errorMessage, setErrorMessage] = useState(false);

    const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setText(value);
        const limit = textLimit ? Number(textLimit) : null;

        if (limit && value.length >= limit) {
            setErrorMessage(true);
        } else {
            setErrorMessage(false);
        }
    };

    const handleIsSetLimitOpen = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setIsSetLimitOpen(checked);
    };

    const handleTextLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        if (value === "") {
            setTextLimit(null);
            setErrorMessage(false);
            return;
        }

        const numericValue = Number(value);

        if (Number.isInteger(numericValue) && numericValue > 0) {
            setTextLimit(value);

            if (text.length >= numericValue) {
                setErrorMessage(true);
            } else {
                setErrorMessage(false);
            }
        }
    };

    const handleIsExpandedOpen = () => {
        setIsExpandedOpen(prevValues => !prevValues);
    };

    const handleIsExcludeSpace = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setIsExcludeSpace(checked);
    };

    const charCount = isExcludeSpace
        ? text.replace(/\s/g, "").length
        : text.length;

    const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

    const sentenceCount =
        text.trim() === "" ? 0 : text.split(/[.!?]+\s*/).filter(Boolean).length;

    const countFrequency = (letters: string[]): Record<string, number> => {
        return letters.reduce(
            (a, b) => {
                if (a[b]) {
                    return { ...a, [b]: a[b] + 1 };
                }
                return { ...a, [b]: 1 };
            },
            {} as Record<string, number>
        );
    };

    const lettersFrequency = countFrequency(
        text
            .toLowerCase()
            .replace(/[^a-z]/g, "")
            .split("")
    );

    const allLetters = Object.keys(lettersFrequency)
        .filter(char => char !== " ")
        .sort((a, b) => lettersFrequency[b] - lettersFrequency[a]);

    const visibleLetters = isExpandedOpen ? allLetters : allLetters.slice(0, 5);

    const WPM = 225;

    const readingTime = charCount / WPM;

    let displayTime = "";

    if (charCount === 0) {
        displayTime = "0 minute";
    } else if (readingTime < 1) {
        displayTime = "< 1 minute";
    } else {
        displayTime = `${Math.floor(readingTime)} minute${Math.floor(readingTime) !== 1 ? "s" : ""}`;
    }

    return (
        <main className="flex flex-col gap-10 lg:gap-12 mt-10 lg:mt-12 ">
            <h1 className="font-bold text-preset-1-mobile/[100%] tracking-[-1px] md:text-preset-1 text-neutral-900 dark:text-neutral-100 text-center w-1/2 mx-auto">
                Analyze your text in real-time.
            </h1>
            <form action="" className="space-y-4">
                <textarea
                    className={`font-normal text-preset-3/[140%] tracking-[-0.6px] text-neutral-700 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 w-full rounded-xl resize-none p-5 ${errorMessage && "border border-orange-800 dark:border-orange-500 drop-shadow-[0px_0px_8px_rgb(218,55,1)]  dark:drop-shadow-[0_0px_10px_rgb(254,129,89)] "} hover:cursor-pointer hover:text-neutral-900 hover:bg-neutral-200 hover:dark:text-neutral-200  hover:dark:bg-neutral-600 focus:outline-2 focus:outline-purple-500 focus:drop-shadow-[0px_0px_5px_rgb(194,124,248)]`}
                    placeholder="Start typing here… (or paste your text)"
                    rows={8}
                    name="text"
                    id="text"
                    value={text}
                    onChange={handleText}
                    maxLength={
                        textLimit && Number(textLimit) > 0
                            ? Number(textLimit)
                            : undefined
                    }
                    aria-describedby="error_message"
                ></textarea>

                {errorMessage && <ErrorMessage limit={textLimit} />}

                <div className="flex flex-col md:flex-row font-normal text-preset-4/[130%] tracking-[-0.6px]  gap-3 md:gap-6">
                    <Checkbox
                        inputId="no_spaces"
                        inputName="no_spaces"
                        isChecked={isExcludeSpace}
                        inputTitle="Exclude Spaces"
                        onHandleCheckbox={handleIsExcludeSpace}
                    />

                    <div className="flex gap-2.5">
                        <Checkbox
                            inputId="isSetLimit"
                            inputName="isSetLimit"
                            isChecked={isSetLimitOpen}
                            inputTitle="Set Character Limit"
                            onHandleCheckbox={handleIsSetLimitOpen}
                        />
                        {isSetLimitOpen && (
                            <CharacterLimit
                                limit={textLimit}
                                onHandleTextLimit={handleTextLimit}
                            />
                        )}
                    </div>
                    <p className="md:ml-auto">
                        Approx. reading time: {displayTime}
                    </p>
                </div>
            </form>

            <div className="grid gap-4 md:grid-cols-3">
                <Stat
                    statNumber={charCount}
                    statTitle="Total Characters"
                    bgColor="bg-purple-400 "
                    bgUrl="/assets/images/pattern-character-count.svg"
                />
                <Stat
                    statNumber={wordCount}
                    statTitle="Word Count"
                    bgColor="bg-yellow-500 "
                    bgUrl="/assets/images/pattern-word-count.svg"
                />
                <Stat
                    statNumber={sentenceCount}
                    statTitle="Sentence Count"
                    bgColor="bg-orange-500 "
                    bgUrl="/assets/images/pattern-sentence-count.svg"
                />
            </div>

            <section
                aria-label="letters list with their density"
                className="last:-mt-6 space-y-5"
            >
                <h2 className="font-semibold text-preset-2/[130%] tracking-[-1px] ">
                    Letter Density
                </h2>

                {!text ? (
                    <div>
                        <p className="font-normal text-preset-4/[130%] tracking-[-0.6px] ">
                            No characters found. Start typing to see letter
                            density.
                        </p>
                    </div>
                ) : (
                    <>
                        <ul className="space-y-3">
                            {visibleLetters.map((char, index) => {
                                return (
                                    <li key={index}>
                                        <LetterStat
                                            letter={char}
                                            letterFrequency={
                                                lettersFrequency[char]
                                            }
                                            totalChar={text.length}
                                        />
                                    </li>
                                );
                            })}
                        </ul>

                        {!isExpandedOpen ? (
                            <button
                                type="button"
                                title="show more letters"
                                aria-label="click here to see more letters and their density"
                                className=" flex gap-2 items-center"
                                onClick={handleIsExpandedOpen}
                            >
                                See more
                                <span className="inline-block transform rotate-180">
                                    ^
                                </span>
                            </button>
                        ) : (
                            <button
                                type="button"
                                title="show less letters"
                                aria-label="click here to see less letters and their density"
                                className=" flex gap-2 items-center"
                                onClick={handleIsExpandedOpen}
                            >
                                See less <span>^</span>
                            </button>
                        )}
                    </>
                )}
            </section>
        </main>
    );
};
