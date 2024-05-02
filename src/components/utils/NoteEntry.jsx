import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { PencilSquareIcon, TrashIcon, DocumentDuplicateIcon } from "@heroicons/react/24/solid/index.js";
import EditNoteModal from "./EditNoteModal.jsx";
import {parseDate} from "../../utils/DateParser.js";

const NoteEntry = ({ id, user, isPublic, title, content, onSave, onDelete, created, isMyNote, isHidden }) => {
    const dialogRef = useRef(null);
    const [dialogVisible, setDialogVisible] = useState(false);

    const handleEdit = () => {
        setDialogVisible(true);
    }

    const handleCopy = (content) => {
        navigator.clipboard.writeText(content).then(() => {
            console.log('Copied!');
        });
    }

    const handleCloseDialog = () => {
        setDialogVisible(false);
    }

    function handleNoteDelete(id) {
        onDelete(id)
    }

    return (
        <li className={isHidden ? "invisible h-0" : "flex mt-[1rem] flex-col gap-1 p-2 bg-gray-700 rounded-xl text-gray-200"}>
            <div className="flex justify-between">
                <h3 className="text-2xl w-[50rem]">{title}</h3>
                <p>Erstellt am: {parseDate(created)}</p>
                <p>Erstellt von: {isMyNote ? "Dir" : user}</p>
                {isPublic ?
                    <span className="bg-red-500 text-white shadow-lg rounded-lg w-14 text-center content-center">Public</span> :
                    <span className="bg-green-500 text-white shadow-lg rounded-lg w-14 text-center content-center">Private</span>}
            </div>
            <div className="flex justify-between">
                <p className="text-xl">{content}</p>
                <div className="flex justify-between items-center gap-2">
                    <div className="group">
                        <PencilSquareIcon onClick={handleEdit} className="w-7 h-7 cursor-pointer"/>
                        <p className="scale-0 group-hover:scale-100 absolute translate-x-[-1.5rem] transition-all bg-slate-900 px-2 py-1 rounded-lg">Bearbeiten</p>
                    </div>
                    <div className="group">
                        <DocumentDuplicateIcon onClick={() => handleCopy(content)} className="w-7 h-7 cursor-pointer"/>
                        <p className="scale-0 group-hover:scale-100 absolute translate-x-[-1.5rem] transition-all bg-slate-900 px-2 py-1 rounded-lg">Kopieren</p>
                    </div>
                    <div className="group">
                        <TrashIcon onClick={() => handleNoteDelete(id)} className="w-7 h-7 cursor-pointer"/>
                        <p className="scale-0 group-hover:scale-100 absolute translate-x-[-1.5rem] transition-all bg-slate-900 px-2 py-1 rounded-lg">Löschen</p>
                    </div>
                </div>
            </div>
            {dialogVisible && (
                <EditNoteModal
                    toggleDialog={handleCloseDialog}
                    ref={dialogRef}
                    id={id}
                    user={user}
                    isPublic={!!isPublic}
                    title={title}
                    content={content}
                    onClose={handleCloseDialog}
                    onSave={onSave}
                />
            )}
        </li>
    );
};

NoteEntry.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    isPublic: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    created: PropTypes.number,
    isMyNote: PropTypes.bool.isRequired,
    isHidden: PropTypes.bool.isRequired
};

export default NoteEntry;
