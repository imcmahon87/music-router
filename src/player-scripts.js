// The main audio jPlayer script
$(document).ready(function(){
 $("#jquery_jplayer_1").jPlayer({
  ready: function () {
   $(this).jPlayer("setMedia", {
    mp3: "../audio/testAudio1.mp3",
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
       mp3: "../audio/testAudio2.mp3",
      });
     },
     swfPath: "/js",
     supplied: "mp3"
    });
   });
   