import {useState, useEffect} from 'react';
import NoteEntry from "../components/utils/NoteEntry.jsx";
import {createNote, deleteNote, getNotesByUser, updateNote} from "../utils/ApiCaller.js";
import {useAuth0} from "@auth0/auth0-react";
import {MagnifyingGlassIcon, PlusIcon} from "@heroicons/react/24/solid/index.js";
import {NewNoteModal} from "../components/utils/NewNoteModal.jsx";


const Notes = () => {
    const {user} = useAuth0();
    const [notes, setNotes] = useState([]);
    const [sortOrder, setSortOrder] = useState('ascending');
    const [showPublic, setShowPublic] = useState(true);
    const [dialogVisible, setDialogVisible] = useState(false);

    useEffect(() => {
        const fetchNotes = async () => {
            if (!user)
                return;
            const userNotes = await getNotesByUser(user.nickname);
            if (Array.isArray(userNotes)) {
                const initializedNotes = userNotes.map(note => ({...note, isHidden: false}));
                setNotes(initializedNotes);
            } else {
                console.error("Notes data is not an array:", userNotes);
            }
        };
        fetchNotes().then(() => console.log("Notes loaded"));
    }, [user]);

    const handleSaveNote = (updatedNote) => {
        const updatedNotes = notes.map(note => {
            if (note.id === updatedNote.id) {
                return updatedNote;
            }
            return note;
        });

        setNotes(updatedNotes);

        updateNote(updatedNote)
            .then(response => {
                console.log("Notiz erfolgreich aktualisiert:", response);
            })
            .catch(error => {
                console.error("Fehler beim Aktualisieren der Notiz:", error);
                setNotes(prevNotes => prevNotes.map(note => {
                    if (note.id === updatedNote.id) {
                        return note;
                    }
                    return note;
                }));
            });
    };

    const handleDeleteNote = (id) => {
        deleteNote(id)
            .then(() => {
                const updatedNotes = notes.filter(note => note.id !== id);
                setNotes(updatedNotes);
            })
            .catch(error => {
                console.error("Fehler beim Löschen der Notiz:", error);
            });
    };

    const isCreatorMe = (note) => {
        return user.nickname === note.user;
    }

    function handleSearch(searchText) {
        const updatedNotes = notes.map(note => {
            const isMatch = note.title.toLowerCase().includes(searchText.toLowerCase()) || note.content.toLowerCase().includes(searchText.toLowerCase());
            return {
                ...note,
                isHidden: !isMatch
            };
        });
        setNotes(updatedNotes);
    }

    const sortByTimestamp = () => {
        const sortedNotes = [...notes].sort((a, b) => {
            if (sortOrder === 'ascending') {
                return a.timestamp - b.timestamp;
            } else {
                return b.timestamp - a.timestamp;
            }
        });
        setNotes(sortedNotes);
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
        sortByTimestamp()
    };

    const togglePublic = () => {
        setShowPublic(!showPublic);
        const updatedNotes = notes.map(note => {
            if (note.isPublic) {
                return {
                    ...note,
                    isHidden: showPublic // Negiere showPublic, da es umgekehrt wird
                };
            }
            // Falls note.isPublic false ist, gib einfach die ursprüngliche Notiz zurück
            return note;
        });
        setNotes(updatedNotes);
    };

    const addNote = async (newNote) => {
        try {
            const createdNote = await createNote(newNote);
            if (createdNote) {
                setNotes([...notes, newNote]);
            }
        } catch (error) {
            console.error('Fehler beim Erstellen der Notiz:', error);
        }
    };

    function handleOpenDialog () {
        console.log(dialogVisible)
        setDialogVisible(true);
    }

    const handleCloseDialog = () => {
        setDialogVisible(false);
    }

    return (
        <div className="w-full justify-center flex flex-col">
            <div className="bg-slate-700 flex justify-between rounded-lg m-auto mt-12 mb-5 p-7 w-[80%] items-center">
                <div className="relative">
                    <div className="items-center absolute inset-y-0 top-[6px] start-0 flex h-max">
                        <MagnifyingGlassIcon
                            className="text-gray-600 w-10 h-10"/>
                    </div>
                    <input
                        className="block w-80 p-2 pl-11 ps-10 text-2xl text-gray-900 border border-gray-300 rounded-lg outline-none bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text" onChange={(e) => handleSearch(e.target.value)}/>
                </div>
                <button className="bg-slate-600 flex items-center p-2 hover:bg-slate-500 text-white rounded-lg transition-all"
                        onClick={() => handleOpenDialog()}>
                    <PlusIcon className="h-5 w-5 " />
                    Neue Notiz
                </button>
                <div className="flex gap-4 items-center">
                    <div className="flex flex-col bg-slate-600 p-2 rounded-lg shadow-lg transition-all">
                        <label className="text-white p-1 flex hover:bg-slate-500 rounded-md">
                            <input
                                className="p-1"
                                type="radio"
                                value="ascending"
                                checked={sortOrder === 'ascending'}
                                onChange={handleSortOrderChange}
                            />
                            <p className="p-1">Aufsteigend</p>
                        </label>
                        <label className="text-white p-1 flex hover:bg-slate-500 rounded-md transition-all">
                            <input
                                className="p-1"
                                type="radio"
                                value="descending"
                                checked={sortOrder === 'descending'}
                                onChange={handleSortOrderChange}
                            />
                            <p className="p-1">Absteigend</p>
                        </label>
                    </div>
                    <label className="text-white flex">
                        <input className="outline-none p-1" onChange={togglePublic} type="checkbox" checked={showPublic}
                               value="showPublic"/>
                        <p className="p-1">Zeige Public Notes</p>
                    </label>
                </div>
            </div>
            <ul className="w-[80%] h-[67vh] m-auto pt-10 flex flex-col overflow-x-auto overflow-y-scroll scrollbar-hide">
                {notes.map(note => (
                    <NoteEntry
                        key={note.id}
                        id={note.id}
                        user={note.user}
                        isPublic={!!note.isPublic}
                        title={note.title}
                        content={note.content}
                        onSave={handleSaveNote}
                        onDelete={handleDeleteNote}
                        created={note.created}
                        isMyNote={isCreatorMe(note)}
                        isHidden={note.isHidden}
                    />
                ))}
            </ul>
            {dialogVisible &&
            <NewNoteModal
                onNewNoteSave={addNote}
                toggleDialog={handleCloseDialog}
            />
            }
        </div>
    );
};

export default Notes;
