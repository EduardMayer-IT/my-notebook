const baseApiUrl = "https://api.filtastisch.eu/v1/apps/notes";
const token = "yYHyLWtfqMd6gxdTfXQDSWvbldLxsJb6vF66rL93GcDGIJ76jTlZEEsM4ET4DM0cuM5DGSiW7XM0MAekxmeU6VRoVCTIH3gJytCe0HEtm2dms0bd4dP0skErWP6Sj5ozCZgTc";

export async function getNotesByUser(username) {
    const url = `${baseApiUrl}?allByUser=${username}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.error(response);
            return null;
        }

        return await response.json();

    } catch (error){
        console.log(error);
        return error;
    }

}

export async function updateNote (updatedNote) {

    const url = baseApiUrl+`/update/${updatedNote.id}`;
    const body = JSON.stringify({
        "title": updatedNote.title,
        "content": updatedNote.content,
        "isPublic": updatedNote.isPublic
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: body
        });

        if (!response.ok) {
            console.error(response.statusText);
            return response.statusText;
        }

        return await response.json();
    } catch (error) {
        console.error('Fehler beim Aktualisieren der Notiz:', error);
    }
}

export async function deleteNote(id) {
    const url = `${baseApiUrl}/remove/${id}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.error(response);
            return null;
        }

        return await response.json();

    } catch (error){
        console.log(error);
        return error;
    }

}

export async function createNote (newNote) {
    const url = `${baseApiUrl}/create`;
    const body = JSON.stringify(newNote);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: body
        });

        if (!response.ok) {
            console.error(response.statusText);
            return response.statusText;
        }

        return await response.json();
    } catch (error) {
        console.error('Fehler beim Erstellen der Notiz:', error);
    }
}