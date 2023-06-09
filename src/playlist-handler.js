// Which track in the playlist are we performing the function on
let trackIdentifier = 0;
// Is the function for the Main or Metronome file
let trackIdentifierMain = 0;
// Which track will play
let activeTrack = 0;
// Used in selector-playlists.js
let playlistFile = 'No playlist file';
// For toggling fullscreen
let fullscreen = false;
let elem = document.documentElement;

let trackMain = '';
let trackMetronome = '';

let playlist = {
    name: 'New Playlist',
    tracks: []
};

function renderPlaylist() {
    document.getElementById('playlistContainer').innerHTML = '<div id="playlistHeader"><h2 id="playlistName" onclick="editingHandler(3, \'playlistHeader\');">' + playlist.name + '</h2>' + playlistFile;
    for (let i = 0; i < playlist.tracks.length; i++) {
        const track = document.createElement('div');
        track.innerHTML += '<div class="trackContainer" id="trackContainer' + i + '">' +
                             '<div class="trackHeader"><div class="trackName" id="trackName' + i + '" onclick="trackIdentifier = ' + i + '; editingHandler(1, \'trackName\' + trackIdentifier);"><h3 id="trackHeader' + i + '">' + playlist.tracks[i].name + '</h3></div>' +
                             '<div class="trackPause" id="trackPause' + i + '" style="float: right;" onclick="trackIdentifier = ' + i + '; editingHandler(2, \'trackPause\' + trackIdentifier);">' + playlist.tracks[i].continuePause + '</div>' +
                             '<button id="toggleButton' + i + '" type="button" class="button2" style="float: right;" onclick="toggleContinue(\'' + i + '\');">Toggle continue</button>' +
                             '<button type="button" class="button2" style="float: right;" onclick="deleteTrack(\'' + i + '\');">Delete track</button>' +
                             '<button id="activeButton' + i + '" type="button" class="button2" style="float: right;" onclick="activeTrack = ' + i + '; setActiveTrack();">Set active</button>' +
                             '</div>' +
                             '<div class="trackContent"><button type="button" class="button4" onclick="trackIdentifier = ' + i + '; ' +
                               'trackIdentifierMain = 1; ' +
                               'currentDirectory = path.join(__dirname, \'../audio\');' +
                               'readDirectoryTracks();' +
                               '$(\'#trackSelector\').dialog(\'open\');">Main File</button>' +
                             '<div class="trackFileMain">' + path.basename(playlist.tracks[i].fileMain) + '</div><br>' +
                             '<button type="button" class="button4" onclick="trackIdentifier = ' + i + '; ' +
                               'trackIdentifierMain = 0; ' +
                               'currentDirectory = path.join(__dirname, \'../audio\');' +
                               'readDirectoryTracks();' +
                               '$(\'#trackSelector\').dialog(\'open\');">Metronome File</button>' +
                             '<div class="trackFileMetronome">' + path.basename(playlist.tracks[i].fileMetronome) + '</div></div>' +
                             
                            '</div>';
        document.getElementById('playlistContainer').appendChild(track);
        // Shade the Toggle Continue button appropriately
        if (playlist.tracks[i].continue) {
            let toggleButton = document.getElementById('toggleButton' + i);
            let number = document.getElementById('trackPause' + i);
            number.style.display = 'inline';
            toggleButton.style.background = '#3333cc';
        } else {
            let toggleButton = document.getElementById('toggleButton' + i);
            let number = document.getElementById('trackPause' + i);
            number.style.display = 'none';
            toggleButton.style.background = '#808080';
        }
    }
    document.getElementById('playlistContainer').innerHTML += '<button type="button" class="button3" onclick="addTrack();">Add track</button>';
}

function setActiveTrack() {
    // When deleting last track while active, active track will adjust to length of playlist
    if (activeTrack > playlist.tracks.length - 1) {
        activeTrack = playlist.tracks.length - 1;
    }
    // When deleting only existing track, active track will not go below zero
    if (activeTrack < 0) {
        activeTrack = 0;
    }
    // Only update if there is a track in the playlist
    if (playlist.tracks.length > 0) {
        // Set track background to purple
        let activeDiv = document.getElementById('trackContainer' + activeTrack);
        for (let i = 0; i < playlist.tracks.length; i++) {
            document.getElementById('trackContainer' + i).style.backgroundColor = '#404040';
        }
        activeDiv.style.backgroundColor = '#400080';
        // Set active button to blue and all others to gray
        for (let i = 0; i < playlist.tracks.length; i++) {
            if (i == activeTrack) {
                document.getElementById('activeButton' + i).style.backgroundColor = '#3333cc';
            } else {
                document.getElementById('activeButton' + i).style.backgroundColor = '#808080';
            }
        }

        trackMain = playlist.tracks[activeTrack].fileMain;
        trackMetronome = playlist.tracks[activeTrack].fileMetronome;
        $('#jquery_jplayer_1').jPlayer('setMedia', {
            mp3: trackMain
        });
        $('#jquery_jplayer_2').jPlayer('setMedia', {
            mp3: trackMetronome
        });
    }
}

function toggleContinue(track) {
    if (playlist.tracks[track].continue) {
        playlist.tracks[track].continue = 0;
        let button = document.getElementById('toggleButton' + track);
        let number = document.getElementById('trackPause' + track);
        number.style.display = 'none';
        button.style.background = '#808080';
    } else {
        playlist.tracks[track].continue = 1;
        let button = document.getElementById('toggleButton' + track);
        let number = document.getElementById('trackPause' + track);
        number.style.display = 'inline';
        button.style.background = '#3333cc';

    }
    console.log(playlist.tracks[track].continue);
}

function trackEnded() {
    let timeout = playlist.tracks[activeTrack].continuePause * 1000;
    if (playlist.tracks[activeTrack].continue) {
        setTimeout(startNext, timeout);
    }
}

function startNext() {
    // If there is another track after
    if (activeTrack <= playlist.tracks.length - 2) {
        activeTrack += 1;
        setActiveTrack();
        $('#jquery_jplayer_1').jPlayer('play');
        $('#jquery_jplayer_2').jPlayer('play');
    } else {
        console.log('last track ended');
    }
}

function addTrack() {
    playlist.tracks.push({
        name: 'New Track',
        fileMain: '',
        fileMetronome: '',
        continue: 0,
        continuePause: 0
    });
    renderPlaylist();
    setActiveTrack();
};

function deleteTrack(track) {
    playlist.tracks.splice(track, 1);
    renderPlaylist();
    setActiveTrack();
}

function closePlaylist() {
    $('#savePlaylistPrompt').dialog('open');
    let prompt = document.getElementById('savePlaylistPrompt');
    prompt.innerHTML = '<h3>Save Playlist?</h3>' +
                       '<button type="button" onclick="savePlaylist(); closePlaylistExecute(); $(\'#savePlaylistPrompt\').dialog(\'close\');">Yes</button>' +
                       '<button type="button" onclick="closePlaylistExecute(); $(\'#savePlaylistPrompt\').dialog(\'close\');">No</button>';
}

function closePlaylistExecute() {
    playlist = {
        name: 'New Playlist',
        tracks: []
    };
    playlistFile = 'No playlist file';
    renderPlaylist();
}

function deletePlaylist() {
    $('#deletePlaylistPrompt').dialog('open');
    let prompt = document.getElementById('deletePlaylistPrompt');
    prompt.innerHTML = '<h3>Delete Playlist?</h3>' +
                       '<button type="button" onclick="deletePlaylistExecute(); $(\'#savePlaylistPrompt\').dialog(\'close\');">Yes</button>' +
                       '<button type="button" onclick="$(\'#deletePlaylistPrompt\').dialog(\'close\');">No</button>';
}

function deletePlaylistExecute() {
    try {
        fs.unlinkSync(playlistFile);
    } catch(err) {
        console.error(err);
    }
    closePlaylistExecute();
    $('#deletePlaylistPrompt').dialog('close');
}

function toggleFullscreen() {
    if (!fullscreen) {
        document.getElementById('fullscreenButton').style.background = '#3333cc';
        elem.requestFullscreen();
        fullscreen = true;
    } else {
        document.getElementById('fullscreenButton').style.background = '#808080';
        document.exitFullscreen();
        fullscreen = false;
    }
}


renderPlaylist();
setActiveTrack(0);