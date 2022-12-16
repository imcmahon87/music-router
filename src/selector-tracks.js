path = require('path');

function readDirectoryTracks() {

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
    trackSelector = document.getElementById('trackSelector')
    trackSelector.innerHTML = '';
    for (let i = 0; i < folders.length; i++) {
        trackSelector.innerHTML += '<div class="folder" onclick="setDirectoryTracks(\'' + folders[i] + '\')">' + folders[i] + '</div>';
    }
    for (let i = 0; i < files.length; i++) {
        if (files[i].endsWith('.mp3') || files[i].endsWith('.wav')) {
            trackSelector.innerHTML += '<div class="file" onclick="setFileTracks(\'' + files[i] + '\')">' + files[i] + '</div>';
        }
    }
}

// When clicking a folder, re-display the directory contents
function setDirectoryTracks(newDir) {
    currentDirectory = path.join(currentDirectory, '/' + newDir);
    readDirectoryTracks();
}

// When clicking a file, assign it to the corresponding track
function setFileTracks(file) {
    fullPath = path.normalize(currentDirectory + '/' + file);
    if (trackIdentifierMain === 1) {
        playlist.tracks[trackIdentifier].fileMain = fullPath;
    } else {
        playlist.tracks[trackIdentifier].fileMetronome = fullPath;
    }
    $( "#trackSelector" ).dialog('close');
    renderPlaylist();
    setActiveTrack();
}