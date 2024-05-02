import {useAuth0} from "@auth0/auth0-react";

const Home = () => {
    const {isAuthenticated} = useAuth0();

    if (isAuthenticated) {
        return (
            <>
                <div className="flex flex-col gap-7">
                    <h1 className="text-white text-4xl self-start mx-12 mt-10">Deine Notizbücher:</h1>
                    <div className="flex flex-col justify-around align-middle gap-8">
                        <a className="text-white text-2xl rounded-xl bg-[#1a222e] opacity-70 hover:shadow-lg hover:opacity-100 transition-all duration-200 p-4 max-w-xl mx-14"
                           href="/notes">Hauptnotizen</a>
                    </div>
                    <div
                        className="flex align-center align-middle gap-4 mx-14 cursor-not-allowed rounded-xl bg-[#1a222e] max-w-fit p-4">
                        <svg className="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="white"
                                  d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                        </svg>
                        <p className="text-white text-xl content-center">Neues Notizbuch</p>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="flex flex-col items-center justify-center mt-[18rem]">
                    <h1 className="text-white text-[6rem]">Welcome to My-Notes!</h1>
                    <p className="text-white text-[3.5rem]">Bring deine Notizen auf ein neues Level</p>
                </div>
            </>
        );
    }
}

export default Home;