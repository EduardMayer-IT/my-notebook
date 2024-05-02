import PropTypes from 'prop-types';
import {forwardRef, useState} from 'react';
import {updateNote} from "../../utils/ApiCaller.js";

const EditNoteModal = forwardRef(function EditNoteModal(props, ref) {
    const {toggleDialog, title, content, isPublic, onSave, id, user} = props;
    const [visibility, setVisibility] = useState(!!isPublic);
    const [editedNote, setEditedNote] = useState({title, content, isPublic, id, user});

    const handleVisibilityChange = (event) => {
        setVisibility(event.target.id === 'public');
        setEditedNote({...editedNote, isPublic: !visibility})
    };

    function handleCancel() {
        toggleDialog()
    }

    function handleSave() {
        onSave(editedNote);
        updateNote(editedNote).then(r => console.log(r));
        toggleDialog();
    }

    return (
        <dialog
            ref={ref}
            onClick={(e) => {
                if (e.currentTarget === e.target) toggleDialog();
            }}
            className="absolute backdrop-brightness-[.55] backdrop-blur-[1px] h-full w-full bg-transparent top-0 flex flex-col justify-center items-center"
        >
            <div className="flex flex-col w-[38rem] justify-center items-center bg-slate-800 p-9 rounded-lg">
                <form className="flex gap-4 flex-col w-80 justify-center items-center">
                    <input
                        className="w-56 p-1 text-white bg-slate-500 rounded-md h-10 outline-none focus:shadow-input transition-all"
                        type="text" value={editedNote.title}
                        onChange={(e) => setEditedNote({...editedNote, title: e.target.value})}/>
                    <textarea
                        className="w-56 h-20 resize p-1 text-white bg-slate-500 rounded-md outline-none focus:shadow-input transition-shadow"
                        value={editedNote.content}
                        onChange={(e) => setEditedNote({...editedNote, content: e.target.value})}/>
                    <div className="flex gap-4 justify-center items-center">
                        <label className="flex">
                            <input
                                type="radio"
                                name="visibility"
                                id="private"
                                checked={!visibility}
                                onChange={handleVisibilityChange}
                            />
                            <p className="text-white p-2">Private</p>
                        </label>
                        <label className="flex">
                            <input
                                type="radio"
                                name="visibility"
                                id="public"
                                checked={visibility}
                                onChange={handleVisibilityChange}
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
    );
});

EditNoteModal.propTypes = {
    toggleDialog: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    isPublic: PropTypes.bool.isRequired,
    onSave: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired
};

export default EditNoteModal;
