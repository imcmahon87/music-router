const fs = require('fs');

// Get permission to use media devices
navigator.mediaDevices.getUserMedia({video: false, audio: true});

let audioMain = document.getElementById('playerMain');
let audioMetronome = document.getElementById('playerMetronome');

let deviceList = [];

let rawDeviceData = fs.readFileSync('default-devices.json');
let currentDevices = JSON.parse(rawDeviceData);

// Get list of devices and populate dropdown menu
function getDevices() {
    let counter = 0;
    navigator.mediaDevices.enumerateDevices()
    .then(devices => {
        // For displaying the correct defaults automatically
        let autoDisplayMain;
        let autoDisplayMetronome;
        // Enumerate through each available device
        devices.forEach(device => {
            if (device.kind == 'audiooutput') {

                // Get rid of 'default' and 'communications' duplicates so we just have real IDs
                if ((device.deviceId !== "default") && (device.deviceId !== "communications")) {
                    newInnerHTML = '<option value="' + counter + '">' + device.label + '</option>';
                    counter++;
                    document.getElementById('deviceSelectorMain').innerHTML += newInnerHTML;
                    document.getElementById('deviceSelectorMetronome').innerHTML += newInnerHTML;
                    deviceList.push(device.deviceId);

                    // If it matches the saved default, then store the index of it to display automatically
                    if (deviceList[counter - 1] === currentDevices.deviceMain) {
                        autoDisplayMain = counter - 1;
                    }
                    if (deviceList[counter - 1] === currentDevices.deviceMetronome) {
                        autoDisplayMetronome = counter - 1;
                    }
                }
            }
        });
        // Upon initial load, set the selected option to the correct saved default
        document.getElementById('deviceSelectorMain').value = autoDisplayMain;
        document.getElementById('deviceSelectorMetronome').value = autoDisplayMetronome;
        audioMain.setSinkId(currentDevices.deviceMain);
        audioMetronome.setSinkId(currentDevices.deviceMetronome);
    })
    .catch(err => {
        console.log(err.name + ': ' + err.message);
    });


}

// Update devices when dropdown menu changes
function updateDevices() {
    // Assign devices to HTML audio elements
    let selectMain = document.getElementById('deviceSelectorMain').value;
    let selectMetronome = document.getElementById('deviceSelectorMetronome').value;
    audioMain.setSinkId(deviceList[selectMain]);
    audioMetronome.setSinkId(deviceList[selectMetronome]);

    // Automatically save settings to JSON file
    currentDevices.deviceMain = deviceList[selectMain];
    currentDevices.deviceMetronome = deviceList[selectMetronome];

    fs.writeFileSync('default-devices.json', JSON.stringify(currentDevices, null, 2));
}

getDevices();