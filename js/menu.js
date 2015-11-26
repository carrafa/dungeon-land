//---------------------------------------------------------------------------
//===========================================================================
//                      MENU UPDATE
//===========================================================================
//---------------------------------------------------------------------------

function showStatus(){
    $('#controls').css('display','none');
    $('#show-controls').css('background-color','lightgray');
    $('#status').css('display', 'block');
    $('#show-status').css('background-color','snow');
};

function showControls(){
  $('#status').css('display','none');
  $('#show-status').css('background-color','lightgray');
  $('#controls').css('display', 'block');
  $('#show-controls').css('background-color','snow');
};

function power(){
  if(powerOn===true){
    powerOn = false;
  }else if(powerOn===false){
    powerOn = true;
    showStatus();
    main();
    theme.play();
  };
}

$('#power').on('click',power);

$('#show-status').on('click', showStatus);
$('#show-controls').on('click', showControls);

$('#reset').on('click', function(){
  location.reload();
});

function updateMenu(){
  var killCount = function(){
    if(ogre.x < 0){
      kills++;
    }
    if (bat.x<0){
      kills++;
    }
  };

  $('#level').text(function(){
    if(currentLevel===0){
      return 'home';
    } else{
      return currentLevel;
    };
  });

  $('#health-bar').css('width', guy.health + '%');

  $('#health').text(guy.health);

  $('#kills').text(kills);
}
