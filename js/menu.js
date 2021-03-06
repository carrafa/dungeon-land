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

$('#show-status').on('click', showStatus);
$('#show-controls').on('click', showControls);
$('#reset').on('click', function() {
  location.reload();
});

$('#pause').on('click', function() {
  if (theme.paused === false) {
    theme.pause();
    $('#pause').text('>');
  } else {
    theme.play();
    $('#pause').text('||');
  }
});

$('#play').on('click', function() {
  theme.play();
});


function updateMenu() {
  $('#level').text(function() {
    if (currentLevel === 0) {
      return 'home';
    }
    if (currentLevel === 7) {
      return 'the end';
    } else {
      return currentLevel;
    };
  });

  $('#health-bar').css('width', guy.health + '%');

  $('#health').text(guy.health);

  $('#kills').text(kills());
};
