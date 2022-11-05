// Get permission to use media devices
navigator.mediaDevices.getUserMedia({video: false, audio: true});

let audioMain = document.getElementById('playerMain');
let audioMetronome = document.getElementById('playerMetronome');

let deviceList = [];

// Get list of devices and populate dropdown menu
function getDevices() {
    let counter = 0;
    navigator.mediaDevices.enumerateDevices()
    .then(devices => {
        devices.forEach(device => {
            if (device.kind == 'audiooutput') {
                newInnerHTML = '<option value="' + counter + '">' + device.label + '</option>';
                counter++;
                document.getElementById('deviceSelectorMain').innerHTML += newInnerHTML;
                document.getElementById('deviceSelectorMetronome').innerHTML += newInnerHTML;
                deviceList.push(device.deviceId);
            }
        });
    })
    .catch(err => {
        console.log(err.name + ': ' + err.message);
    });
}

function updateDevices() {
    let selectValue = document.getElementById('deviceSelectorMain').value;
    audioMain.setSinkId(deviceList[selectValue]);
    selectValue = document.getElementById('deviceSelectorMetronome').value;
    audioMetronome.setSinkId(deviceList[selectValue]);
}

getDevices();