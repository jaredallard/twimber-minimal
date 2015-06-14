/**
 * Main functions
 *
 * @author RainbowDashDC
 **/

var page = window.page,
    tlib = window.tlib;

/* Open Developer tools for DEBUG */
require('nw.gui').Window.get().showDevTools()


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

function login() {
  $("#login").show();
}

function doLogin(user) {
  user.replace("@", "");

  $("#uner").attr('disabled', '');

  tlib.requestPin(user);

  page.set("pin")
}

function doPin(pin) {
  tlib.getAuthToken(pin, global.requestParams);
	delete global.requestParams;
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

function initTwimber() {
  if(file.name!=="") {
    console.log("Found config for user: "+file.name)
    tlib.initializeTwit(file.credentials[file.name].access_token, file.credentials[file.name].access_token_secret);
  } else {
    console.log("Config is invaild!")
  }

  /* Initialize Twitter first */
  tlib.checkCredentials(function() {
    /** user object becomes available after validation */
    page.set("home");
  });
}

/* init the window */
function resize() {
  $("#page-wrapper").height($(document).height()-$("header").height())
}

$(window).on('resize', resize);

/* resize event */
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

page.register({
  name: "login",
  onBack: login,
  init: login,
  exit: function() {
    $("#login").hide();
  },
  nav: false,
  back: false
})

page.register({
  name: "pin",
  onBack: function() {
    // do nothing.
  },
  init: function() {
    $("#pin").show();
  },
  exit: function() {
    $("#pin").hide();
  },
  nav: false,
  back: false
})

/* Get config object */
try {
  var file = tlib.getConfigObj();
  initTwimber();
} catch(err) {
  var fs = require('fs')
  if (fs.existsSync("./src/cfg/config.json") === false) {
    var _c = fs.readFileSync("./src/cfg/default.json", {
      encoding: 'utf8'
    });
    fs.writeFileSync("./src/cfg/config.json", _c, {
      encoding: 'utf8'
    });
  }
  page.set("login");
}
