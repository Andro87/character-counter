import { Header } from "./components/Header";
import { Main } from "./components/Main";

export default function Home() {
    return (
        <div className=" w-9/10 lg:max-w-237.5 mx-auto pt-4 pb-8 md:pt-4.5 lg:pt-8 lg:pb-16 bg-[url('/assets/images/bg-light-theme.png')] dark:bg-[url('/assets/images/bg-dark-theme.png')]">
            <Header />

            <Main />
        </div>
    );
}
