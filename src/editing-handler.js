// Whether or not a text field is being edited
let editing = 0;
// For listening to whether mouse is in the click zone during editing
let mouseActiveArea;
// trackIdentifier will be passed to the track variable so the editing field variable doesn't change mid-edit
let track;

function editingHandler(type, element) {
    if (!editing) {
        $(':button').prop('disabled', true);
        editing = type;
        if (editing === 1) {
            track = trackIdentifier;
            let activeArea = document.getElementById(element);
            activeArea.innerHTML = '<input id="activeInput' + track + '" value="' + playlist.tracks[track].name + '">';
            mouseActiveArea = true;
            console.log('in reset');
            activeArea.addEventListener('mouseover', () => {
                mouseActiveArea = true;
                console.log('in');
            });
            activeArea.addEventListener('mouseleave', () => {
                mouseActiveArea = false;
                console.log('out');
            });
            document.addEventListener('click', () => {
                if (mouseActiveArea === false) {
                    if (editing === 1) {
                        changeName(track);
                    }
                }
            });
        }
        if (editing === 2) {
            track = trackIdentifier;
            let activeArea = document.getElementById(element);
            activeArea.innerHTML = '<input id="activeInput' + track + '" value="' + playlist.tracks[track].continuePause + '">';
            mouseActiveArea = true;
            activeArea.addEventListener('mouseover', () => {
                mouseActiveArea = true;
            });
            activeArea.addEventListener('mouseleave', () => {
                mouseActiveArea = false;
            });
            document.addEventListener('click', () => {
                if (mouseActiveArea === false) {
                    if (editing === 2) {
                        changePause(track);
                    }
                }
            });
        }
        if (editing === 3) {
            let activeArea = document.getElementById(element);
            activeArea.innerHTML = '<input id="activeInput" value="' + playlist.name + '">';
            mouseActiveArea = true;
            activeArea.addEventListener('mouseover', () => {
                mouseActiveArea = true;
            });
            activeArea.addEventListener('mouseleave', () => {
                mouseActiveArea = false;
            });
            document.addEventListener('click', () => {
                if (mouseActiveArea === false) {
                    if (editing === 3) {
                        changePlaylistName();
                    }
                }
            });
        }
    }
}

function changeName(track) {
    $(':button').prop('disabled', false);
    playlist.tracks[track].name = document.getElementById('activeInput' + track).value;
    document.getElementById('activeInput' + track).remove;
    renderPlaylist();
    setActiveTrack();
    editing = 0;
}

function changePause(track) {
    $(':button').prop('disabled', false);
    playlist.tracks[track].continuePause = document.getElementById('activeInput' + track).value;
    document.getElementById('activeInput' + track).remove;
    renderPlaylist();
    setActiveTrack();
    editing = 0;
}

function changePlaylistName() {
    $(':button').prop('disabled', false);
    playlist.name = document.getElementById('activeInput').value;
    document.getElementById('activeInput').remove;
    renderPlaylist();
    setActiveTrack();
    editing = 0;
}