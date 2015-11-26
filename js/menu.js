//---------------------------------------------------------------------------
//===========================================================================
//                      MENU UPDATE
//===========================================================================
//---------------------------------------------------------------------------

function showStatus() {
  $('#controls').css('display', 'none');
  $('#show-controls').css('background-color', 'lightgray');
  $('#status').css('display', 'block');
  $('#show-status').css('background-color', 'snow');
};

function showControls() {
  $('#status').css('display', 'none');
  $('#show-status').css('background-color', 'lightgray');
  $('#controls').css('display', 'block');
  $('#show-controls').css('background-color', 'snow');
};

function power() {
  if (powerOn === true) {
    powerOn = false;
    theme.pause();
    theme.currentTime = 0;
  } else if (powerOn === false) {
    powerOn = true;
    showStatus();
    main();
    theme.play();
  };
}

$('#power').on('click', power);

$('#show-status').on('click', showStatus);
$('#show-controls').on('click', showControls);

$('#reset').on('click', function() {
  location.reload();
});

function updateMenu() {
  $('#level').text(function() {
    if (currentLevel === 0) {
      return 'home';
    } else {
      return currentLevel;
    };
  });

  $('#health-bar').css('width', guy.health + '%');

  $('#health').text(guy.health);

  $('#kills').text(kills());
}
