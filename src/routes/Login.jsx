import { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
    };
    return (
        <div className="w-full overflow-hidden flex flex-col justify-center items-center gap-8 mt-24">
            <h2 className="text-3xl text-gray-900 dark:text-white">Login</h2>
            <form className="shadow-xl bg-slate-700 rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-8" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-gray-900 dark:text-white text-sm font-bold mb-2">Benutzername:</label>
                    <input
                        className="shadow-2xl appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-900 dark:text-white text-sm font-bold mb-2">Passwort:</label>
                    <input
                        className="shadow-2xl appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <p className="hidden text-red-500" >Passwort / Benutzername war nicht korrekt!</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Einloggen</button>
            </form>
        </div>
    );
}

export default Login;