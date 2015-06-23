'use strict';

//weather global vars
var planeText1, planeText2, planeText3, planeText4;
var textSize = 0.3;
var textHeight = 0.1;

//threeJS init vars
var scene, camera, listener,
    renderer, cube, hemilight,
    plane1, plane2, plane3, plane4;

var planeSpeed = 0.015;
var gui, Timeline, controller, controller2, controller3;


function init(){



//standard vars
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.z = 10;
  listener = new THREE.AudioListener();
  camera.add(listener);

  renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor(0x000000);
  $('#threeJSContainer').append( renderer.domElement );

//dynamic resize
window.addEventListener('resize', function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

//GUI
  gui = new dat.GUI();
  dat.GUI.toggleHide();
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

  var sheet1Sound = new THREE.Audio(listener);
  sheet1Sound.load('../audio/' + sheets.weatherAudio[0]);
  sheet1Sound.setRefDistance(4);
  sheet1Sound.autoplay = true;
  sheet1Sound.source.loop = true;
  var sheet2Sound = new THREE.Audio(listener);
  sheet2Sound.load('../audio/' + sheets.weatherAudio[1]);
  sheet2Sound.setRefDistance(4);
  sheet2Sound.autoplay = true;
  sheet2Sound.source.loop = true;

  var sheet3Sound = new THREE.Audio(listener);
  sheet3Sound.load('../audio/' + sheets.weatherAudio[2]);
  sheet3Sound.setRefDistance(4);
  sheet3Sound.autoplay = true;
  sheet3Sound.source.loop = true;


  var sheet4Sound = new THREE.Audio(listener);
  sheet4Sound.load('../audio/' + sheets.weatherAudio[3]);
  sheet4Sound.setRefDistance(4);
  sheet4Sound.autoplay = true;
  sheet4Sound.source.loop = true;


//webGL:



//setup strings:
for (var i = 0; i < sheets.day.length; i++) {
  sheets.pt[i] = sheets.day[i] + ": " + sheets.text[i];
}

//append strings to planes:
  var wrapper = new THREE.MeshNormalMaterial( {
    overdraw: 0.5,
    color: 0xFFFFFF} );

  var text1word = new THREE.TextGeometry( sheets.pt[0], {
    size: textSize,
    height: textHeight,
    curveSegments: 2,
    font: 'helvetiker',
  });

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
  plane1.position.set(0, 0, -50);
  scene.add(plane1);


  var geometry2 = new THREE.BoxGeometry(20,20,2);
  var material2 = new THREE.MeshPhongMaterial({color: 0x9c6ce1, transparent: true, wireframe: false, opacity: 0.3});
  plane2 = new THREE.Mesh(geometry2, material2);
  plane2.position.set(0, 0, -100);
  scene.add(plane2);


  var geometry3 = new THREE.BoxGeometry(20,20,2);
  var material3 = new THREE.MeshPhongMaterial({color: 0xa9e16c, transparent: true, wireframe: false, opacity: 0.3});
  plane3 = new THREE.Mesh(geometry3, material3);
  plane3.position.set(0, 0, -150);
  scene.add(plane3);


  var geometry4 = new THREE.BoxGeometry(20,20,2);
  var material4 = new THREE.MeshPhongMaterial({color: 0xfa5050, transparent: true, wireframe: false, opacity: 0.3});
  plane4 = new THREE.Mesh(geometry4, material4);
  plane4.position.set(0, 0, -200);
  scene.add(plane4);


//add text
  text1.position.y = plane1.position.y + 10;
  text1.position.x = plane1.position.x -10;
  plane1.add(text1);

  text2.position.y = plane2.position.y + 5;
  text2.position.x = plane1.position.x -10;
  plane2.add(text2);

  text3.position.y = plane3.position.y;
  text3.position.x = plane1.position.x -10;
  plane3.add(text3);

  text4.position.y = plane4.position.y - 5;
  text4.position.x = plane1.position.x -10;
  plane4.add(text4);


//add audio
  plane1.add(sheet1Sound);
  plane2.add(sheet2Sound);
  plane3.add(sheet3Sound);
  plane4.add(sheet4Sound);


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
