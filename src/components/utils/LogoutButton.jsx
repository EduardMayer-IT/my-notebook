import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <button
            className="py-2 px-1 w-32 text-xl text-gray-900 rounded-xl transition-colors duration-200 dark:text-white dark:hover:bg-gray-700 dark:bg-gray-800"
            onClick={() => logout({logoutParams: {returnTo: "http://localhost:5173/"}})}>Logout</button>

    )
};

export default LogoutButton;