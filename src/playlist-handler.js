// Which track in the playlist are we performing the function on
let trackIdentifier = 0;
// Is the function for the Main or Metronome file
let trackIdentifierMain = 0;
// Which track will play
let activeTrack = 0;
// Whether or not we are editing the track name/pause length
let editingName = 0;
let editingPause = 0;

let trackMain = '';
let trackMetronome = '';

let playlist = [
    {
        name: 'As Above',
        fileMain: 'C:\\Users\\imcma\\Documents\\NodeTest\\Music Router\\audio\\asAboveInstruments.mp3',
        fileMetronome: 'C:\\Users\\imcma\\Documents\\NodeTest\\Music Router\\audio\\asAboveInstruments_METRONOME.mp3',
        continue: 0,
        continuePause: 0
    },
    {
        name: 'Test Audio',
        fileMain: 'C:\\Users\\imcma\\Documents\\NodeTest\\Music Router\\audio\\testAudio1.mp3',
        fileMetronome: 'C:\\Users\\imcma\\Documents\\NodeTest\\Music Router\\audio\\testAudio2.mp3',
        continue: 1,
        continuePause: 4
    },
    {
        name: 'Yet another',
        fileMain: 'C:\\Users\\imcma\\Documents\\NodeTest\\Music Router\\audio\\testAudio1.mp3',
        fileMetronome: 'C:\\Users\\imcma\\Documents\\NodeTest\\Music Router\\audio\\testAudio2.mp3',
        continue: 0,
        continuePause: 1
    }
];

function renderPlaylist() {
    document.getElementById('playlistContainer').innerHTML = '';
    for (let i = 0; i < playlist.length; i++) {
        const track = document.createElement('div');
        track.innerHTML += '<div class="trackContainer" id="trackContainer' + i + '">' +
                             '<div class="trackName" id="trackName' + i + '" onclick="trackIdentifier = ' + i + '; changeName()">' + playlist[i].name + '</div>' +
                             '<div class="trackFileMain">' + playlist[i].fileMain + '</div>' +
                             '<button type="button" onclick="trackIdentifier = ' + i + '; ' +
                               'trackIdentifierMain = 1; ' +
                               'currentDirectory = path.join(__dirname, \'../audio\');' +
                               'readDirectoryTracks();' +
                               '$(\'#trackSelector\').dialog(\'open\');">Main File</button>' +
                             '<div class="trackFileMetronome">' + playlist[i].fileMetronome + '</div>' +
                             '<button type="button" onclick="trackIdentifier = ' + i + '; ' +
                               'trackIdentifierMain = 0; ' +
                               'currentDirectory = path.join(__dirname, \'../audio\');' +
                               'readDirectoryTracks();' +
                               '$(\'#trackSelector\').dialog(\'open\');">Metronome File</button>' +
                             '<button type="button" onclick="activeTrack = ' + i + '; setActiveTrack();">Set active</button>' +
                             '<button type="button" onclick="toggleContinue(\'' + i + '\');">Toggle continue</button>' +
                             '<div class="trackPause" id="trackPause' + i + '" onclick="trackIdentifier = ' + i + '; changePause()">' + playlist[i].continuePause + '</div>' +
                             '<button type="button" onclick="deleteTrack(\'' + i + '\');">Delete track</button>' +
                            '</div>';
        document.getElementById('playlistContainer').appendChild(track);
    }
    document.getElementById('playlistContainer').innerHTML += '<button type="button" onclick="addTrack();">Add track</button>';
}

function changeName() {
    if (editingName === 0) {
        editingName = 1;
        let fieldDiv = document.getElementById('trackName' + trackIdentifier);
        fieldDiv.innerHTML = '<input id="activeInput" value="' + playlist[trackIdentifier].name + '">';
        $(document.body).click(function(e){
            if (editingName === 1) {
                if (e.target.id !== ('trackName' + String(trackIdentifier)) && e.target.id !== 'activeInput') {
                    playlist[trackIdentifier].name = document.getElementById('activeInput').value;
                    document.getElementById('activeInput').remove;
                    renderPlaylist();
                    setActiveTrack();
                    editingName = 0;
                }
            }
        });
    }
}

function changePause() {
    if (editingPause === 0) {
        editingPause = 1;
        let fieldDiv = document.getElementById('trackPause' + trackIdentifier);
        fieldDiv.innerHTML = '<input id="activeInput" value="' + playlist[trackIdentifier].continuePause + '">';
        $(document.body).click(function(e){
            if (editingPause === 1) {
                if (e.target.id !== ('trackPause' + String(trackIdentifier)) && e.target.id !== 'activeInput') {
                    playlist[trackIdentifier].continuePause = document.getElementById('activeInput').value;
                    document.getElementById('activeInput').remove;
                    renderPlaylist();
                    setActiveTrack();
                    editingPause = 0;
                }
            }
        });
    }
}

function setActiveTrack() {
    // When deleting last track while active, active track will adjust to length of playlist
    if (activeTrack > playlist.length - 1) {
        activeTrack = playlist.length - 1;
    }
    // When deleting only existing track, active track will not go below zero
    if (activeTrack < 0) {
        activeTrack = 0;
    }
    // Only update if there is a track in the playlist
    if (playlist.length > 0) {
        // Set track background to purple
        let activeDiv = document.getElementById('trackContainer' + activeTrack);
        for (let i = 0; i < playlist.length; i++) {
            document.getElementById('trackContainer' + i).style.backgroundColor = '#ffffff';
        }
        activeDiv.style.backgroundColor = '#e6ccff';
    
        trackMain = playlist[activeTrack].fileMain;
        trackMetronome = playlist[activeTrack].fileMetronome;
        $('#jquery_jplayer_1').jPlayer('setMedia', {
            mp3: trackMain
        });
        $('#jquery_jplayer_2').jPlayer('setMedia', {
            mp3: trackMetronome
        });
    }
}

function toggleContinue(track) {
    if (playlist[track].continue) {
        playlist[track].continue = 0;
    } else {
        playlist[track].continue = 1;
    }
    console.log(playlist[track].continue);
}

function trackEnded() {
    let timeout = playlist[activeTrack].continuePause * 1000;
    if (playlist[activeTrack].continue) {
        setTimeout(startNext, timeout);
    }
}

function startNext() {
    if (activeTrack <= playlist.length - 2) {
        activeTrack += 1;
        setActiveTrack();
        $('#jquery_jplayer_1').jPlayer('play');
        $('#jquery_jplayer_2').jPlayer('play');
    } else {
        console.log('last track ended');
    }
}

function addTrack() {
    playlist.push({
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
    playlist.splice(track, 1);
    renderPlaylist();
    setActiveTrack();
}

renderPlaylist();
setActiveTrack(0);