const HID = require('node-hid');

// VIC Foot Pedal vendorID is 1523, productID is 255
let device = 0;
try {
    device = new HID.HID(1523, 255);
}
catch(err) {
    console.log('Foot pedal not accessible! Error: ' + err.message)
}

let currentTime;
let practiceMode = 1;

if (device) {
    device.on('data', function(data) {
        if (practiceMode) {
            // Left pedal
            if (data[0] == 1) {
                if ($('#jquery_jplayer_1').data().jPlayer.status.paused) {
                    // If playback is stopped/paused
                    activeTrack -= 1;
                    setActiveTrack();
                } else {
                    // If track is playing
                    currentTime = $('#jquery_jplayer_1').data('jPlayer').status.currentTime;
                    if (currentTime > 15) {
                        $("#jquery_jplayer_1").jPlayer("play", currentTime - 5);
                        $("#jquery_jplayer_2").jPlayer("play", currentTime - 5);
                    } else {
                        $("#jquery_jplayer_1").jPlayer("play", 0);
                        $("#jquery_jplayer_2").jPlayer("play", 0);
                    }
                }
            }
            // Center pedal
            if (data[0] == 2) {
                if ($('#jquery_jplayer_1').data().jPlayer.status.paused) {
                    // If playback is stopped/paused
                    $('#jquery_jplayer_1').jPlayer('play');
                    $('#jquery_jplayer_2').jPlayer('play');
                } else {
                    // If track is playing
                    $('#jquery_jplayer_1').jPlayer('pause');
                    $('#jquery_jplayer_2').jPlayer('pause');
                }
            }
            // Right pedal
            if (data[0] == 4) {
                if ($('#jquery_jplayer_1').data().jPlayer.status.paused) {
                    // If playback is stopped/paused
                    activeTrack += 1;
                    setActiveTrack();
                } else {
                    // If track is playing
                    currentTime = $('#jquery_jplayer_1').data('jPlayer').status.currentTime;
                    $("#jquery_jplayer_1").jPlayer("play", currentTime + 5);
                    $("#jquery_jplayer_2").jPlayer("play", currentTime + 5);
                }
            }
        } else {
            // Performance Mode
            // Left pedal
            if (data[0] == 1) {
                if ($('#jquery_jplayer_1').data().jPlayer.status.paused) {
                    // If playback is stopped/paused
                    activeTrack -= 1;
                    setActiveTrack();
                } else {
                    // If track is playing
                    console.log('performance');
                }
            }
            // Center pedal
            if (data[0] == 2) {
                if ($('#jquery_jplayer_1').data().jPlayer.status.paused) {
                    // If playback is stopped/paused
                    $('#jquery_jplayer_1').jPlayer('play');
                    $('#jquery_jplayer_2').jPlayer('play');
                } else {
                    // If track is playing
                    console.log('performance');
                }
            }
            // Right pedal
            if (data[0] == 4) {
                if ($('#jquery_jplayer_1').data().jPlayer.status.paused) {
                    // If playback is stopped/paused
                    activeTrack += 1;
                    setActiveTrack();
                } else {
                    // If track is playing
                    console.log('performance');
                }
            }
        }
    });
}

function toggleMode() {
    if (practiceMode) {
        practiceMode = 0;
        document.getElementById('liveButton').style.backgroundColor = '#3333cc';
    } else {
        practiceMode = 1;
        document.getElementById('liveButton').style.backgroundColor = '#808080';
    }
}