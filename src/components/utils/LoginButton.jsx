import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
            <button
                    className="py-2 px-1 w-32 text-xl text-gray-900 rounded-xl transition-colors duration-200 dark:text-white dark:hover:bg-gray-700 dark:bg-gray-800"
                    onClick={() => loginWithRedirect({
                        authorizationParams: {
                            prompt: "login"
                        },
                        appState: {
                            redirectTo: "http://localhost:5173/",
                        }
                    })}>Log In</button>
    );
};

export default LoginButton;