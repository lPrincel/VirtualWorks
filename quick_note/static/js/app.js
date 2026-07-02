document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const noteInput = document.getElementById('note-input');
    const saveBtn = document.getElementById('save-btn');
    const saveEditBtn = document.getElementById('save-edit-btn');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    const notesList = document.getElementById('notes-list');
    const notesCounter = document.getElementById('notes-counter');
    const statusMessage = document.getElementById('status-message');

    let currentEditId = null;

    // Fetch and load notes on initialization
    loadNotes();

    // Event Listeners
    saveBtn.addEventListener('click', createNote);
    saveEditBtn.addEventListener('click', updateNote);
    cancelEditBtn.addEventListener('click', cancelEdit);

    // Functions
    async function loadNotes() {
        try {
            const response = await fetch('/api/notes');
            if (!response.ok) throw new Error('Failed to fetch notes');
            
            const notes = await response.json();
            renderNotes(notes);
        } catch (error) {
            showStatus('Error loading notes', 'error');
            notesList.innerHTML = `<div class="empty-state">Failed to load notes. Please try again.</div>`;
        }
    }

    function renderNotes(notes) {
        notesList.innerHTML = '';
        notesCounter.textContent = notes.length;

        if (notes.length === 0) {
            notesList.innerHTML = `<div class="empty-state">No notes yet. Create one on the left!</div>`;
            return;
        }

        notes.forEach(note => {
            const noteCard = document.createElement('div');
            noteCard.className = 'note-card';
            noteCard.innerHTML = `
                <div class="note-header">
                    <span class="note-timestamp">${note.timestamp}</span>
                    <div class="note-actions">
                        <button class="icon-btn edit" data-id="${note.id}" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                        <button class="icon-btn delete" data-id="${note.id}" aria-label="Delete">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </button>
                    </div>
                </div>
                <div class="note-content">${escapeHTML(note.content)}</div>
            `;
            notesList.appendChild(noteCard);
        });

        // Add event listeners to newly created buttons
        document.querySelectorAll('.icon-btn.edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                const card = e.currentTarget.closest('.note-card');
                const content = card.querySelector('.note-content').textContent;
                enterEditMode(id, content);
            });
        });

        document.querySelectorAll('.icon-btn.delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                deleteNote(id);
            });
        });
    }

    async function createNote() {
        const content = noteInput.value.trim();
        if (!content) {
            showStatus('Please enter some text before saving.', 'error');
            return;
        }

        try {
            saveBtn.disabled = true;
            saveBtn.innerHTML = 'Saving...';

            const response = await fetch('/api/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content })
            });

            if (!response.ok) throw new Error('Failed to save note');

            noteInput.value = '';
            showStatus('Note saved successfully!', 'success');
            await loadNotes();
        } catch (error) {
            showStatus('Error saving note', 'error');
        } finally {
            saveBtn.disabled = false;
            saveBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg> Save Note`;
        }
    }

    function enterEditMode(id, content) {
        currentEditId = id;
        noteInput.value = content;
        noteInput.focus();
        
        saveBtn.classList.add('hidden');
        saveEditBtn.classList.remove('hidden');
        cancelEditBtn.classList.remove('hidden');
        
        // Change panel header slightly
        document.querySelector('.new-note-panel h1').textContent = 'Edit Note';
        document.querySelector('.new-note-panel p').textContent = 'Modify your thoughts.';
    }

    function cancelEdit() {
        currentEditId = null;
        noteInput.value = '';
        
        saveBtn.classList.remove('hidden');
        saveEditBtn.classList.add('hidden');
        cancelEditBtn.classList.add('hidden');
        
        document.querySelector('.new-note-panel h1').textContent = 'Quick-Note';
        document.querySelector('.new-note-panel p').textContent = 'Capture your thoughts instantly.';
    }

    async function updateNote() {
        if (!currentEditId) return;
        
        const content = noteInput.value.trim();
        if (!content) {
            showStatus('Note content cannot be empty.', 'error');
            return;
        }

        try {
            saveEditBtn.disabled = true;
            saveEditBtn.textContent = 'Updating...';

            const response = await fetch(`/api/notes/${currentEditId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content })
            });

            if (!response.ok) throw new Error('Failed to update note');

            showStatus('Note updated successfully!', 'success');
            cancelEdit();
            await loadNotes();
        } catch (error) {
            showStatus('Error updating note', 'error');
        } finally {
            saveEditBtn.disabled = false;
            saveEditBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg> Update Note`;
        }
    }

    async function deleteNote(id) {
        if (!confirm('Are you sure you want to delete this note?')) return;

        try {
            const response = await fetch(`/api/notes/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete note');

            showStatus('Note deleted.', 'success');
            
            // If deleting the note currently being edited
            if (currentEditId == id) {
                cancelEdit();
            }
            
            await loadNotes();
        } catch (error) {
            showStatus('Error deleting note', 'error');
        }
    }

    function showStatus(msg, type) {
        statusMessage.textContent = msg;
        statusMessage.className = `status-message status-${type}`;
        
        setTimeout(() => {
            statusMessage.textContent = '';
            statusMessage.className = 'status-message';
        }, 3000);
    }

    // Utility to prevent XSS when setting innerHTML for note content
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
});
