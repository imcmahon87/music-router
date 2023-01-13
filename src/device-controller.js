const fs = require('fs');

let audioDevices = {};
let deviceList = ['Filler so first item value is 1'];

// Read default devices JSON
let rawDeviceData = fs.readFileSync('default-devices.json');
let currentDevices = JSON.parse(rawDeviceData);

function handleDevices() {
    // Get permission to use media devices
    navigator.mediaDevices.getUserMedia({video: false, audio: true});

    audioDevices.main = document.getElementById('jp_audio_0');
    audioDevices.metronome = document.getElementById('jp_audio_1');

    // Get list of devices and populate dropdown menu
    let counter = 0;
    navigator.mediaDevices.enumerateDevices()
    .then(devices => {
        // For displaying the correct defaults automatically
        let autoDisplayMain;
        let autoDisplayMetronome;
        // First option just says 'Select Device' (works for W3 School's custom select styling)
        newInnerHTML = '<option value="0">Select Device</option>';
        document.getElementById('deviceSelectorMain').innerHTML += newInnerHTML;
        document.getElementById('deviceSelectorMetronome').innerHTML += newInnerHTML;
        // Enumerate through each available device
        devices.forEach(device => {
            if (device.kind == 'audiooutput') {

                // Get rid of 'default' and 'communications' duplicates so we just have real IDs
                if ((device.deviceId !== "default") && (device.deviceId !== "communications")) {
                    newInnerHTML = '<option value="' + (counter + 1) + '">' + device.label + '</option>';
                    counter++;
                    document.getElementById('deviceSelectorMain').innerHTML += newInnerHTML;
                    document.getElementById('deviceSelectorMetronome').innerHTML += newInnerHTML;
                    deviceList.push(device.deviceId);

                    // If it matches the saved default, then store the index of it to display automatically
                    if (deviceList[counter] === currentDevices.deviceMain) {
                        autoDisplayMain = counter;
                    }
                    if (deviceList[counter] === currentDevices.deviceMetronome) {
                        autoDisplayMetronome = counter;
                    }
                }
            }
        });

        // Upon initial load, if the default devices are available then load them
        let checkMain = deviceList.includes(currentDevices.deviceMain);
        let checkMetronome = deviceList.includes(currentDevices.deviceMetronome);
        if (checkMain) {
            dropdownMain = document.getElementById('deviceSelectorMain').value;
            document.getElementById('deviceSelectorMain').value = autoDisplayMain;
            audioDevices.main.setSinkId(currentDevices.deviceMain);
        }
        if (checkMetronome) {
            dropdownMetronome = document.getElementById('deviceSelectorMetronome').value;
            document.getElementById('deviceSelectorMetronome').value = autoDisplayMetronome;
            audioDevices.metronome.setSinkId(currentDevices.deviceMetronome);
        }

        styleSelectBoxMain();
        styleSelectBoxMetronome();
    })
    .catch(err => {
        console.log(err.name + ': ' + err.message);
    });

}

// Update devices when dropdown menu changes
function updateDevicesMain() {
    // Assign devices to HTML audio elements
    let selectMain = dropdownMain;
    audioDevices.main.setSinkId(deviceList[selectMain]);
    // Automatically save settings to JSON file
    currentDevices.deviceMain = deviceList[selectMain];
    fs.writeFileSync('default-devices.json', JSON.stringify(currentDevices, null, 2));
}

function updateDevicesMetronome() {
    // Assign devices to HTML audio elements
    let selectMetronome = dropdownMetronome;
    audioDevices.metronome.setSinkId(deviceList[selectMetronome]);
    // Automatically save settings to JSON file
    currentDevices.deviceMetronome = deviceList[selectMetronome];
    fs.writeFileSync('default-devices.json', JSON.stringify(currentDevices, null, 2));
}

/* // OLD Update devices when dropdown menu changes
function updateDevices() {
    // Assign devices to HTML audio elements
    let selectMain = document.getElementById('deviceSelectorMain').value;
    let selectMetronome = document.getElementById('deviceSelectorMetronome').value;
    audioDevices.main.setSinkId(deviceList[selectMain]);
    audioDevices.metronome.setSinkId(deviceList[selectMetronome]);

    // Automatically save settings to JSON file
    currentDevices.deviceMain = deviceList[selectMain];
    currentDevices.deviceMetronome = deviceList[selectMetronome];

    fs.writeFileSync('default-devices.json', JSON.stringify(currentDevices, null, 2));
}*/