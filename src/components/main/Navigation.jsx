import {Link} from "react-router-dom";
import LoginButton from "../utils/LoginButton.jsx";
import LogoutButton from "../utils/LogoutButton.jsx";
import { useAuth0 } from "@auth0/auth0-react";

const Navigation = () => {
    const {  isAuthenticated } = useAuth0();
    return (
        <div className="bg-white dark:bg-gray-900 flex justify-between align-middle text-center py-4 px-8">
            <Link to="/home" className="text-gray-900 dark:text-white text-2xl font-bold content-center">My-Notes</Link>
            <div className="flex justify-around align-middle gap-8">
                {isAuthenticated && (
                    <LogoutButton/>
                )}
                {!isAuthenticated && (
                    <LoginButton/>
                )}
            </div>
        </div>
    )
}

export default Navigation;