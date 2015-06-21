'use strict';

//weather global vars
var planeText1, planeText2, planeText3, planeText4;

var planeTexts = [];
var textSize = 0.3;
var textHeight = 0.1;

//threeJS init vars
var scene, camera, listener,
    renderer, cube, hemilight,
    plane1, plane2, plane3, plane4;
var planeSpeed = 0.015;
var gui, Timeline, controller, controller2, controller3;


// //    ****************webAudio stuff*********************
// //WebAudio init
// var context;

// try {
//   // still needed for Safari
//   window.AudioContext = window.AudioContext || window.webkitAudioContext;

//   // create an AudioContext
//   context = new AudioContext();
// } catch(e) {
//   // API not supported
//   throw new Error('Web Audio API not supported.');
// }

// // Next, we’ll load a sound. The binary audio data is
// // loaded into an ArrayBuffer via Ajax. In the onload callback, i
// // t’s decoded using the AudioContext’s decodeAudioData method.
// // The decoded audio is then assigned to our sound variable.

// // Next, we’ll load a sound. The binary audio data is
// // loaded into an ArrayBuffer via Ajax. In the onload callback, i
// // t’s decoded using the AudioContext’s decodeAudioData method.
// // The decoded audio is then assigned to our sound variable.

// var sound;

// /**
//  * Example 1: Load a sound
//  * @param {String} src Url of the sound to be loaded.
//  */

// var rain = "../audio/heavyRain.mp3"
// var panner = context.createPanner();
// var listener = context.listener;


// var listenerData = document.querySelector('.listener-data');
// var pannerData = document.querySelector('.panner-data');

// function loadSound(url) {
//   var request = new XMLHttpRequest();
//   request.open('GET', url, true);
//   request.responseType = 'arraybuffer';

//   request.onload = function() {
//     // request.response is encoded... so decode it now
//     context.decodeAudioData(request.response, function(buffer) {
//       sound = buffer;
//       playSound(sound);
//     }, function(err) {
//       throw new Error(err);
//     });
//   }

//   request.send();
// }

// // To play a sound, we need to take the AudioBuffer containing
// // our sound, and use it to create an AudioBufferSourceNode.
// // We then connect the AudioBufferSourceNode to the AudioContext’s
// // destination and call the start() method to play it.

// /**
//  * Example 2: Play a sound
//  * @param {Object} buffer AudioBuffer object - a loaded sound.
//  */

// var gainNode = context.createGain();

// function playSound(buffer) {
//   var source = context.createBufferSource();

//   source.connect(gainNode);
//   source.buffer = buffer;
//   gainNode.connect(context.destination);
//   source.loop = true;
//   source.start(0);
// }

// loadSound(rain);

//  ****************ThreeJS stuff*********************

function init(){



//standard vars
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.z = 10;
  listener = new THREE.AudioListener();
  camera.add(listener);

  renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  $('#threeJSContainer').append( renderer.domElement );

//dynamic resize
window.addEventListener('resize', function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

//GUI
  gui = new dat.GUI();
  //dat.GUI.toggleHide();
  function Params() {
    //camera speed
    this.Zoom = -10;
    this.CubeColor = "#ff00ff";
    this.CubeOpacity = 0;
  }
  var params = new Params();
  // controller = gui.add(params, 'Zoom', -50.0, 10.0).step(0.25);
  // controller.listen();
  // controller.onChange(function(value) {
  //   camera.position.z = value * -1;
  // });

  controller2 = gui.addColor(params, 'CubeColor');
  controller2.onChange(function(colorValue) {
    colorValue=colorValue.replace( '#','0x' );
    var colorObject = new THREE.Color(colorValue);
    cube.material.color.setHex(colorValue);
  });

  controller3 = gui.add(params, 'CubeOpacity', 0, 1);
  controller3.onChange(function(opacity) {
  cube.material.opacity = opacity;
  });

  //light
  hemilight = new THREE.HemisphereLight (0xffffff, 0xffffff, 0.6);
  scene.add(hemilight);

//test cube
  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshPhongMaterial( {
                                              color: 0xff00ff,
                                              transparent: true,
                                              opacity: 0 } );
  cube = new THREE.Mesh( geometry, material );
  scene.add( cube );


//audio:

  // var rain = new THREE.Audio(listener);
  // rain.load('../audio/heavyRain.mp3');
  // rain.setRefDistance(5);
  //rain.autoplay = false;



//setup strings:
for (var i = 0; i < sheets.days.length; i++) {
  sheets.pt[i] = sheets.days[i] + ": " + planeTexts[i];
}

//append strings to planes:
  var text1word = new THREE.TextGeometry( sheets.pt[0], {
    size: textSize,
    height: textHeight,
    curveSegments: 2,
    font: 'helvetiker',
  });
  var wrapper = new THREE.MeshNormalMaterial( {
    overdraw: 0.5,
    color: 0xFFFFFF} );
  var text1 = new THREE.Mesh(text1word, wrapper);

  var text2word = new THREE.TextGeometry( sheets.pt[1], {
    size: textSize,
    height: textHeight,
    curveSegments: 2,
    font: 'helvetiker',
  });
  var text2 = new THREE.Mesh(text2word, wrapper);


  var text3word = new THREE.TextGeometry( sheets.pt[2], {
    size: textSize,
    height: textHeight,
    curveSegments: 2,
    font: 'helvetiker',
  });
  var text3 = new THREE.Mesh(text3word, wrapper);

  var text4word = new THREE.TextGeometry( sheets.pt[3], {
    size: textSize,
    height: textHeight,
    curveSegments: 2,
    font: 'helvetiker',
  });
  var text4 = new THREE.Mesh(text4word, wrapper);


//transparent planes
  var geometry1 = new THREE.BoxGeometry(20,20,2);
  var material1 = new THREE.MeshPhongMaterial({color: 0xde64de, transparent: true, wireframe: false, opacity: 0.3});
  plane1 = new THREE.Mesh(geometry1, material1);
  plane1.position.set(0, 0, -10);
  scene.add(plane1);
  text1.position.y = plane1.position.y + 10;
  text1.position.x = plane1.position.x -10;
  plane1.add(text1);





  var geometry2 = new THREE.BoxGeometry(20,20,2);
  var material2 = new THREE.MeshPhongMaterial({color: 0x9c6ce1, transparent: true, wireframe: false, opacity: 0.3});
  plane2 = new THREE.Mesh(geometry2, material2);
  plane2.position.set(0, 0, -20);
  scene.add(plane2);
  text2.position.y = plane2.position.y + 5;
  text2.position.x = plane1.position.x -10;

  plane2.add(text2);


  var geometry3 = new THREE.BoxGeometry(20,20,2);
  var material3 = new THREE.MeshPhongMaterial({color: 0xa9e16c, transparent: true, wireframe: false, opacity: 0.3});
  plane3 = new THREE.Mesh(geometry3, material3);
  plane3.position.set(0, 0, -30);
  scene.add(plane3);
  text3.position.y = plane3.position.y;
  text3.position.x = plane1.position.x -10;

  plane3.add(text3);

  var geometry4 = new THREE.BoxGeometry(20,20,2);
  var material4 = new THREE.MeshPhongMaterial({color: 0xfa5050, transparent: true, wireframe: false, opacity: 0.3});
  plane4 = new THREE.Mesh(geometry3, material4);
  plane4.position.set(0, 0, -40);
  scene.add(plane4);
  text4.position.y = plane4.position.y - 5;
  text4.position.x = plane1.position.x -10;

  plane4.add(text4);




  // scrollwheel to zoom
    $('#threeJSContainer').bind('mousewheel', function(e){
      e.preventDefault();
      if(e.originalEvent.wheelDelta > 0) {
          camera.position.z -= 3;
      }
      else{
          camera.position.z += 3;
      }
  });

}


function render() {

  requestAnimationFrame(render);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  plane1.position.z += planeSpeed;
  plane2.position.z += planeSpeed;
  plane3.position.z += planeSpeed;
  plane4.position.z += planeSpeed;

  renderer.render(scene, camera);

}


//full screen function
function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}
