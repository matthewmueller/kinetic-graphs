/**
 * Module Dependencies
 */

// var domify = require('domify');
var IO = require('io');
var Series = require('time-series');

/**
 * Connect to WS
 */

var io = IO('http://ws.mat.io:80/kinetic-graphs');

/**
 * Add listeners
 */

window.addEventListener('deviceorientation', function(e) {
  var angle = e.webkitCompassHeading || e.angle;
  io.emit('a', angle);
});

window.addEventListener('devicemotion', function(e) {
  var x = e.acceleration.x;
  var y = e.acceleration.y;
  var z = e.acceleration.z;
  io.emit('x', x);
  io.emit('y', y);
  io.emit('z', z);
});

/**
 * Set up the graphs
 */

var aLine = Series(document.querySelector('.graph.a')).scale('60s').line().color('#0299FD');
var xLine = Series(document.querySelector('.graph.x')).scale('60s').line().color('#0299FD');
var yLine = Series(document.querySelector('.graph.y')).scale('60s').line().color('#0299FD');
var zLine = Series(document.querySelector('.graph.z')).scale('60s').line().color('#0299FD');

io.on('a', function(a) {
  aLine.add(a);
});

io.on('x', function(x) {
  xLine.add(x * 100);
});

io.on('y', function(y) {
  yLine.add(y * 100);
});

io.on('z', function(z) {
  zLine.add(z * 100);
});
