/**
 * Shared buttons handlers for Twimber.
 *
 * @license MIT
 **/
$(".btn-close").click(function() {
  console.log("closing window...");
  require('nw.gui').Window.get().close();
});

$(".btn-min").click(function() {
  require('nw.gui').Window.get().minimize();
});

$(".btn-max").click(function() {
  if (window.winstate === undefined || window.winstate === 0 ) {
    window.winstate = 1;
    require('nw.gui').Window.get().maximize();
  } else {
    window.winstate = 0;
    require('nw.gui').Window.get().unmaximize();
  }
});
