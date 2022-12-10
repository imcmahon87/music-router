const path = require('path');
let editingPlaylistName = 0;

function readDirectoryPlaylists() {

    let directoryContents = fs.readdirSync(currentDirectory);
    let folders = ['../'];
    let files = [];

    // Cycle through directory contents and assign everything to either folder or file array
    for (let i = 0; i < directoryContents.length; i++) {
        let file = currentDirectory + '/' + directoryContents[i];
        let stats = fs.statSync(file);
        if (stats.isDirectory()) {
            folders.push(directoryContents[i]);
        } else {
            files.push(directoryContents[i]);
        }
    }

    // Display a new <div> for each item
    playlistSelector = document.getElementById('playlistSelector')
    playlistSelector.innerHTML = '';
    for (let i = 0; i < folders.length; i++) {
        playlistSelector.innerHTML += '<div class="folder" onclick="setDirectoryPlaylists(\'' + folders[i] + '\')">' + folders[i] + '</div>';
    }
    for (let i = 0; i < files.length; i++) {
        if (files[i].endsWith('.srp')) {
            playlistSelector.innerHTML += '<div class="file" onclick="setFilePlaylists(\'' + files[i] + '\')">' + files[i] + '</div>';
        }
    }
}

// When clicking a folder, re-display the directory contents
function setDirectoryPlaylists(newDir) {
    currentDirectory = path.join(currentDirectory, '/' + newDir);
    readDirectoryPlaylists();
}

// When clicking a file, load that playlist
function setFilePlaylists(file) {
    fullPath = path.normalize(currentDirectory + '/' + file);
    // Read .srp file
    let rawPlaylistData = fs.readFileSync(fullPath);
    let currentPlaylistData = JSON.parse(rawPlaylistData);
    playlist.tracks = currentPlaylistData.tracks;
    $( "#playlistSelector" ).dialog('close');
    renderPlaylist();
    activeTrack = 0;
    setActiveTrack();
    playlist.name = currentPlaylistData.name;
    playlistFile = fullPath;
    document.getElementById('playlistHeader').innerHTML = '<h2 id="playlistName" onclick="editingHandler(3, \'playlistHeader\');">' + playlist.name + '</h2>' + fullPath;
}

function savePlaylist() {
    if (playlistFile == 'No playlist file') {
        $('#playlistSelector').dialog('open');
        let inputBox = document.getElementById('playlistSelector');
        inputBox.innerHTML = '<input id="activeInput" value="newplaylist.srp">' +
                             '<button type="button" onclick="savePlaylistExecute(true);">Save Playlist</button>';
    } else {
        savePlaylistExecute(false);
    }
}

function savePlaylistExecute(newName) {
    let saveName;
    if (newName) {
        saveName = document.getElementById('activeInput').value;
        if (!saveName.endsWith('.srp')) {
            saveName = saveName + '.srp';
        }
    } else {
        saveName = path.basename(playlistFile);
    }
    $( "#playlistSelector" ).dialog('close');
    fs.writeFileSync('./playlist/' + saveName, JSON.stringify(playlist, null, 2));
    playlistFile = __dirname + '/playlist/' + saveName;
    renderPlaylist();
}