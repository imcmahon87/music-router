// The main audio jPlayer script
$(document).ready(function(){
    $("#jquery_jplayer_1").jPlayer({
        ready: function () {
            $(this).jPlayer("setMedia", {
                mp3: '',
            });
            $(this).bind($.jPlayer.event.ended, function(event) {
                trackEnded();
            });
        },

        swfPath: "/js",
        supplied: "mp3"
    });
});

// The metronome audio jPlayer script
$(document).ready(function(){
    $("#jquery_jplayer_2").jPlayer({
        ready: function () {
            $(this).jPlayer("setMedia", {
            mp3: '',
            });
        },
        swfPath: "/js",
        supplied: "mp3"
    });
});