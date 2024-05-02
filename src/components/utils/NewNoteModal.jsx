import PropTypes from 'prop-types';
import {useState} from 'react';
import {generateRandomString} from "../../utils/IdGenerator.js";
import {useAuth0} from "@auth0/auth0-react";

export const NewNoteModal = ({onNewNoteSave, toggleDialog}) => {
    const {user} = useAuth0();
    const [currentNote, setCurrentNote] = useState(null);

    function handleSave() {
        const newNote = {
            ...currentNote,
            user: user.nickname,
            created: Date.now(),
            id: generateRandomString(9)
        }
        onNewNoteSave(newNote);
        toggleDialog();
    }

    const handleCancel = () => {
        toggleDialog();
    }

    return (
        <dialog
            onClick={(e) => {
                if (e.currentTarget === e.target) toggleDialog();
            }}
            className="absolute backdrop-brightness-[.55] backdrop-blur-[1px] h-full w-full bg-transparent top-0 flex flex-col justify-center items-center"
        >
            <div className="flex flex-col w-[38rem] justify-center items-center bg-slate-800 p-9 rounded-lg">
                <form className="flex gap-4 flex-col w-80 justify-center items-center">
                    <label>
                        <input
                            placeholder="Titel der Notiz"
                            className="w-56 p-1 text-white bg-slate-500 rounded-md h-10 outline-none focus:shadow-input transition-all"
                            type="text" onChange={(e) => setCurrentNote({...currentNote, title: e.target.value})}/>
                    </label>
                    <label>
                        <textarea
                            placeholder="Inhalt der Notiz"
                            className="w-56 h-20 resize p-1 text-white bg-slate-500 rounded-md outline-none focus:shadow-input transition-shadow"
                            onChange={(e) => setCurrentNote({...currentNote, content: e.target.value})}/>
                    </label>
                    <div className="flex gap-4 justify-center items-center">
                        <label className="flex">
                            <input
                                type="radio"
                                name="visibility"
                                id="private"
                                onChange={(e) => setCurrentNote({...currentNote, isPublic: e.target.checked})}
                                checked
                            />
                            <p className="text-white p-2">Private</p>
                        </label>
                        <label className="flex">
                            <input
                                type="radio"
                                name="visibility"
                                id="public"
                                onChange={(e) => setCurrentNote({...currentNote, isPublic: e.target.checked})}
                            />
                            <p className="text-white p-2">Public</p>
                        </label>
                    </div>
                </form>
                <div>
                    <button className="bg-green-500 p-2 rounded-lg w-16 mx-2 mt-8" onClick={() => handleSave()}>Save
                    </button>
                    <button className="bg-red-500 p-2 rounded-lg w-16 mx-2 mt-8" onClick={() => handleCancel()}>Cancel
                    </button>
                </div>
            </div>
        </dialog>
    )

}

NewNoteModal.propTypes = {
    onNewNoteSave: PropTypes.func.isRequired,
    toggleDialog: PropTypes.func.isRequired,
}