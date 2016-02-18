var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
/*
var fs = require('fs');

var array = ["noConflict",
    "use strict",
    "html",
    "body",
    '[data-link="section"]',
    "a",
    "find",
    "'.site-nav__menu'",
    "add", "match",
    "userAgent",
    "style",
    "createElement",
    "@-ms-viewport{width:auto!important}", "createTextNode", "appendChild", "head", "querySelector", "desktop", "hasClass", "is-mobile", "addClass", "is-desktop", "ie9", "click", "preventDefault", "on", "a[href=#]", "insertAfter", "site-nav__social", "site-footer__social", "removeClass", "clone", ".site-footer__social", "border-on",
    "'#countdown_dashboard'", "length", "countdown-on", "countDown", "remove", "#", "id", "attr", ".is-active", "filter", "'.section'", "is-active", 'a[href="', '"]', "cssanimations", "fadeIn", "animation-in", "data", "animation-in-delay", "animated", "animation-delay", "ms", "css", "each", "[data-animation-in]", "", "replace", "-in", "fadeOut", "is-loaded", "velocity", ".site-loader", ".site-header__icon__nav", ".site-nav", "nav-in", "toggleClass", "stop", "0", "-25%", "0deg", "35deg", "1", ".4", "'.site-nav__inner'",
    "25%", "-35deg", "push", "href", "animating", "animation-out-delay", "[data-animation-out]", "scrollTop", "'.site-wrap'", "update", "perfectScrollbar", "error", "'.form-group'", "hide", "valid error", "'.form-notify'", "animation-out", "closest", "1ms", "removeAttr", "#formContact", "parent", "POST", "assets/php/contact.php", "json", "serialize", "code", "resetForm", "validate", "reset", ".form-label", "blur", "button", "show", "message", "valid", "An error occurred. Please try again later.", "ajaxSubmit",
    "numberOfInvalids", "You missed 1 field. It has been highlighted.", "You missed ", " fields. They have been highlighted.", 'a[href="#newsletter"]', "#formNewsletter", '<div class="mfp-close_c mfp-close"></div>', "inline", "scroll", "mfp-effect", "input", "width", "focus", "st", "#newsletterEmail", "newsletter-in", "magnificPopup", "/api-vlc/add", "load", ".site-bg__video", "is-site-bg-img", ".site-bg__img", "is-site-bg-slideshow", '<img src="assets/img/bg/site-bg-slideshow-', '.jpg">',
    "append", "ss", "kenburnsy", "'.site-header__icon__audio'", "is-site-bg-video", '<video id="videoPlayer" autoplay loop>', '<source src="assets/video/video.mp4" type="video/mp4">', "</video>", "videoPlayer", "getElementById", "muted", "is-audio-on", "is-audio-off", "is-site-bg-video-youtube", "data-property", '{videoURL: _bg_video_youtube_url, autoPlay: true, loop: _bg_video_youtube_loop, startAt: _bg_video_youtube_start, stopAt: _bg_video_youtube_end, mute: true, quality: _bg_video_youtube_quality, realfullscreen: true, optimizeDisplay: true, addRaster: false, showYTLogo: false, showControls: false, stopMovieOnBlur: false, containment: "self"}',
    '{videoURL: _bg_video_youtube_url, autoPlay: true, loop: _bg_video_youtube_loop, startAt: _bg_video_youtube_start, stopAt: _bg_video_youtube_end, mute: false, quality: _bg_video_youtube_quality, realfullscreen: true, optimizeDisplay: true, addRaster: false, showYTLogo: false, showControls: false, stopMovieOnBlur: false, containment: "self"}', '<audio id="audioPlayer" loop>', '<source src="assets/audio/audio.mp3" type="audio/mpeg">', "</audio>", "audioPlayer", "play", "pause", ".site-bg__canvas",
    "'.site-bg__effect'", "opacity", '<div class="cloud cloud-01"></div>', '<div class="cloud cloud-02"></div>', '<div class="cloud cloud-03"></div>', "is-site-bg-cloud", ".cloud-01", "-100%", "100%", "liner", ".cloud-02", ".cloud-03", '<div class="star star-01"></div>', '<div class="star star-02"></div>', '<div class="star star-03"></div>', "is-site-bg-parallax-star", "block", "'.star-01'", "-2000px", "'.star-02'", "'.star-03'", "is-site-bg-star", "height", "round", "2d", "getContext", "config", "x", "random",
    "y", "vx", "vy", "radius", "star", "prototype", "beginPath", "PI", "arc", "fill", "stars", "distance", "position", "moveTo", "lineTo", "stroke", "closePath", "createStars", "clearRect", "create", "line", "animate", "setCanvas", "innerWidth", "innerHeight", "setContext", "fillStyle", "color", "strokeStyle", "lineWidth", "loop", "bind", "mousemove", "pageX", "pageY", "init", "requestAnimationFrame", "mozRequestAnimationFrame", "webkitRequestAnimationFrame", "msRequestAnimationFrame", "setTimeout",
    "canvas", "transition.fadeIn", "resize", "assets/img/bg/home.jpg", "assets/img/bg/about.jpg", "assets/img/bg/service.jpg", "assets/img/bg/contact.jpg", "src", "is-each", "always", "slideDown", "first", "'.accordion > dd'", "next", "dt > a", "'.accordion'", "slideUp", "dd", "dt > a.is-active", "parents", ".accordion > dt > a", "#serviceCarousel", ".service__carousel-control", "carousel-nav", "carousel-prev", "carousel-next", "owlCarousel"];

var file = fs.readFileSync('C:\\Users\\amaralm\\WebstormProjects\\vlc-remote\\public\\assets\\js\\main.js');
var s = file.toString();
for(i=0 ; i< array.length; i++){
    var temp = "_0x2dae[" + i + "]";

    var rep = array[i].toString();
    if (rep[0] == '.') rep = "'" + rep + "'";
    for(t = 0; t < 100; t++) {
        s = s.replace(temp, rep);
    }
}
fs.writeFile('C:\\Users\\amaralm\\WebstormProjects\\vlc-remote\\public\\assets\\js\\main2.js', s);

console.log(s);*/

var routes = require('./routes/index');
var api_vlc = require('./routes/api-vlc');

var app = express();

// view engine setup
//desativar o jade????
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api-vlc', api_vlc);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
