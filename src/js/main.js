/**
 * Main functions
 *
 * @author RainbowDashDC
 **/

var page = window.page,
    tlib = window.tlib;

/* Open Developer tools for DEBUG */
//require('nw.gui').Window.get().showDevTools()


function home() {
  $("#home").show();

  /* Test Twitter Streaming */
  tlib.getTimeline("#home", function() {
    tlib.startStream("#home");
  });

  /* update times hook */
  setInterval(function() {
    $("span .timestamp").each(function(index) {
      $(this).html(tlib.moment($(this).attr('title')).fromNow());
    })
    //tlib.moment()
  }, 1000)
}

/* Get config object */
var file = tlib.getConfigObj();
if(file.name!=="") {
  console.log("Found config for user: "+file.name)
  tlib.initializeTwit(file.credentials[file.name].access_token, file.credentials[file.name].access_token_secret);
} else {
  console.log("Config is invaild!")
}

/* init the window buttons */
$(".btn-close").click(function() {
  console.log("closing window...")
  require('nw.gui').Window.get().close()
})

$(".btn-min").click(function() {
  require('nw.gui').Window.get().minimize()
})

$(".btn-max").click(function() {
  if (window.winstate === undefined || window.winstate === 0 ) {
    window.winstate = 1;
    require('nw.gui').Window.get().maximize()
  } else {
    window.winstate = 0;
    require('nw.gui').Window.get().unmaximize()
  }
})

/* init the window */
function resize() {
  $("#page-wrapper").height($(document).height()-$("header").height())
}

$(window).on('resize', resize);

resize()

/* Page registers */
page.register({
  name:   "home",
  onBack: home,
  init: home,
  exit: function() {
    $("#home").hide();
  },
  nav: true,
  back: true
});

/* Initialize Twitter first */
tlib.checkCredentials(function() {
  /** user object becomes available after validation */
  page.set("home");
});
