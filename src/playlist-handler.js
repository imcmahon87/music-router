// Which track in the playlist are we performing the function on
let trackIdentifier = 0;
// Is the function for the Main or Metronome file
let trackIdentifierMain = 0;

let editingName = 0;

let playlist = [
    {
        name: 'As Above',
        fileMain: 'C:\\Users\\imcma\\Documents\\NodeTest\\Music Router\\audio\\asAboveInstruments.mp3',
        fileMetronome: 'C:\\Users\\imcma\\Documents\\NodeTest\\Music Router\\audio\\asAboveInstruments_METRONOME.mp3'
    },
    {
        name: 'Test Audio',
        fileMain: 'C:\\Users\\imcma\\Documents\\NodeTest\\Music Router\\audio\\testAudio1.mp3',
        fileMetronome: 'C:\\Users\\imcma\\Documents\\NodeTest\\Music Router\\audio\\testAudio2.mp3'
    }
];

function renderPlaylist() {
    document.getElementById('playlistContainer').innerHTML = '';
    for (let i = 0; i < playlist.length; i++) {
        const track = document.createElement('div');
        track.innerHTML += '<div class="trackContainer">' +
                             '<div class="trackName" id="trackName' + i + '" onclick="trackIdentifier = ' + i + '; changeName()">' + playlist[i].name + '</div>' +
                             '<div class="trackFileMain">' + playlist[i].fileMain + '</div>' +
                             '<button type="button" onclick="trackIdentifier = ' + i + '; ' +
                               'trackIdentifierMain = 1; ' +
                               '$(\'#trackSelector\').dialog(\'open\');">Main File</button>' +
                             '<div class="trackFileMetronome">' + playlist[i].fileMetronome + '</div>' +
                             '<button type="button" onclick="trackIdentifier = ' + i + '; ' +
                               'trackIdentifierMain = 0; ' +
                               '$(\'#trackSelector\').dialog(\'open\');">Metronome File</button>' +
                            '</div>';
        document.getElementById('playlistContainer').appendChild(track);
    }
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
                    editingName = 0;
                }
            }
        });
    }
}

renderPlaylist();