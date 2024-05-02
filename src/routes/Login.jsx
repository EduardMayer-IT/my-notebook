import { useEffect } from 'react';

const Login = () => {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlParams.entries());

        const codeParam = params['code'];

        document.cookie = `code=${codeParam}; path=/`;
        }, []);

    return (
        <div>
        </div>
    );
}

export default Login;