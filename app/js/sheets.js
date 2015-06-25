'use strict';

//weather global vars
var planeText1, planeText2, planeText3, planeText4;
var textSize = 0.5;
var textHeight = 0.1;

//threeJS init vars
var scene, camera, listener,
    renderer, hemilight,
     weatherSheet;

//DAT.Gui vars
// var gui, Timeline, controller, controller2, controller3;
// var cube;

//opacity & speed for sheets
var planeSpeed = 0.015;
var planeOpacity = 0.7;

//var plane1, sheets.plane[1], sheets.plane[2], sheets.plane[3], weatherObj;

//particles
var snowParticles, rainParticles, cloudParticles, fogParticles, clearParticles,
    tRainParticles, tCloudParticles, cloudEmitter, rainEmitter, emitter;

var sheets = {
  day : [],
  text : [],
  date : [],
  tempHigh: [],
  tempLow: [],
  highLow: [],
  pt : [],
  weatherType : [],
  weatherAudio: [],
  weatherGfx: [],
  plane: []
  };

function init(){

//standard vars
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.z = 10;
  // camera.rotation.y = 45 * Math.PI / 180;
  // camera.position.x = 90;
  listener = new THREE.AudioListener();
  camera.add(listener);

  renderer = new THREE.WebGLRenderer({antialias:true, alpha:false});
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor(new THREE.Color(Math.random(),
                         Math.random(), Math.random()));
  $('#threeJSContainer').append( renderer.domElement );

//dynamic resize
window.addEventListener('resize', function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

//GUI
//   gui = new dat.GUI();
//   dat.GUI.toggleHide();
//   function Params() {
//     //camera distance
//     this.Zoom = -10;
//     this.CubeColor = "#ff00ff";
//     this.CubeOpacity = 0;
//   }
//   var params = new Params();
//   // controller = gui.add(params, 'Zoom', -50.0, 10.0).step(0.25);
//   // controller.listen();
//   // controller.onChange(function(value) {
//   //   camera.position.z = value * -1;
//   // });

//   controller2 = gui.addColor(params, 'CubeColor');
//   controller2.onChange(function(colorValue) {
//     colorValue=colorValue.replace( '#','0x' );
//     var colorObject = new THREE.Color(colorValue);
//     cube.material.color.setHex(colorValue);
//   });

//   controller3 = gui.add(params, 'CubeOpacity', 0, 1);
//   controller3.onChange(function(opacity) {
//   cube.material.opacity = opacity;
//   });

  //light
  hemilight = new THREE.HemisphereLight (0xffffff, 0xffffff, 0.6);
  scene.add(hemilight);

// //test cube
//   var geometry = new THREE.BoxGeometry( 1, 1, 1 );
//   var material = new THREE.MeshPhongMaterial( {
//                                               color: 0xff00ff,
//                                               transparent: true,
//                                               opacity: 0 } );
//   cube = new THREE.Mesh( geometry, material );
//   scene.add( cube );

//particle holder:
var weatherObj = new THREE.Object3D();
weatherObj.position.set(0,0,0)

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


//setup strings:
for (var i = 0; i < sheets.day.length; i++) {
  sheets.pt[i] = sheets.day[i] + ": " + sheets.text[i];
  sheets.highLow[i] = "High: " + sheets.tempHigh[i] + ", Low: " + sheets.tempLow[i];
}


// create text:
  var wrapper = new THREE.MeshPhongMaterial( {
    overdraw: 0.1,
    color: 0x000000} );

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

var text1aword = new THREE.TextGeometry( sheets.highLow[0], {
    size: textSize,
    height: textHeight,
    curveSegments: 2,
    font: 'helvetiker',
  });
  var text1a = new THREE.Mesh(text1aword, wrapper);

  var text2aword = new THREE.TextGeometry( sheets.highLow[1], {
    size: textSize,
    height: textHeight,
    curveSegments: 2,
    font: 'helvetiker',
  });
  var text2a = new THREE.Mesh(text2aword, wrapper);


  var text3aword = new THREE.TextGeometry( sheets.highLow[2], {
    size: textSize,
    height: textHeight,
    curveSegments: 2,
    font: 'helvetiker',
  });
  var text3a = new THREE.Mesh(text3aword, wrapper);

  var text4aword = new THREE.TextGeometry( sheets.highLow[3], {
    size: textSize,
    height: textHeight,
    curveSegments: 2,
    font: 'helvetiker',
  });
  var text4a = new THREE.Mesh(text4aword, wrapper);



//transparent planes
  var geometry1 = new THREE.BoxGeometry(40,20,2);
  var material1 = new THREE.MeshPhongMaterial({color: 0xC6E2FF, transparent: true, wireframe: false, opacity: planeOpacity});
  sheets.plane[0] = new THREE.Mesh(geometry1, material1);
  sheets.plane[0].position.set(0, 0, -50);
  scene.add(sheets.plane[0]);


  var geometry2 = new THREE.BoxGeometry(40,20,2);
  var material2 = new THREE.MeshPhongMaterial({color: 0xC6E2FF, transparent: true, wireframe: false, opacity: planeOpacity});
  sheets.plane[1] = new THREE.Mesh(geometry2, material2);
  sheets.plane[1].position.set(0, 0, -100);
  scene.add(sheets.plane[1]);


  var geometry3 = new THREE.BoxGeometry(40,20,2);
  var material3 = new THREE.MeshPhongMaterial({color: 0xC6E2FF, transparent: true, wireframe: false, opacity: planeOpacity});
  sheets.plane[2] = new THREE.Mesh(geometry3, material3);
  sheets.plane[2].position.set(0, 0, -150);
  scene.add(sheets.plane[2]);


  var geometry4 = new THREE.BoxGeometry(40,20,2);
  var material4 = new THREE.MeshPhongMaterial({color: 0xC6E2FF, transparent: true, wireframe: false, opacity: planeOpacity});
  sheets.plane[3] = new THREE.Mesh(geometry4, material4);
  sheets.plane[3].position.set(0, 0, -200);
  scene.add(sheets.plane[3]);


//add text

  text1.position.y = sheets.plane[0].position.y + 6;
  text1.position.x = sheets.plane[0].position.x - 20;
  sheets.plane[0].add(text1);6

  text2.position.y = sheets.plane[1].position.y + 6;
  text2.position.x = sheets.plane[1].position.x - 20;
  sheets.plane[1].add(text2);

  text3.position.y = sheets.plane[2].position.y + 6;
  text3.position.x = sheets.plane[2].position.x - 20;
  sheets.plane[2].add(text3);

  text4.position.y = sheets.plane[3].position.y + 6;
  text4.position.x = sheets.plane[3].position.x - 20;
  sheets.plane[3].add(text4);


//add highlows
  text1a.position.y = sheets.plane[0].position.y - 2;
  text1a.position.x = sheets.plane[0].position.x - 20;

  sheets.plane[0].add(text1a);

  text2a.position.y = sheets.plane[1].position.y - 2;
  text2a.position.x = sheets.plane[1].position.x - 20;
  sheets.plane[1].add(text2a);

  text3a.position.y = sheets.plane[2].position.y - 2;
  text3a.position.x = sheets.plane[2].position.x - 20;
  sheets.plane[2].add(text3a);

  text4a.position.y = sheets.plane[3].position.y - 2;
  text4a.position.x = sheets.plane[3].position.x - 20;
  sheets.plane[3].add(text4a);
  console.log(sheets.highLow);

//add weather SFX
  sheets.plane[0].add(sheet1Sound);
  sheets.plane[1].add(sheet2Sound);
  sheets.plane[2].add(sheet3Sound);
  sheets.plane[3].add(sheet4Sound);

  // addWebGL();

//add WebGL particles
  // // function addWebGL() {
  //   for (var i = 0; i < sheets.weatherType.length; i++ ) {
  //   //var num = "plane" + [i + 1];
  //   if (sheets.weatherGfx[i] === "snow") {
  //     initSnowParticles(sheets.plane[i]);

  //   } else if (sheets.weatherGfx[i] === "clear") {
  //     weatherSheet = "plane" + [i];
  //     initClearParticles(sheets.plane[i]);

  //   } else if (sheets.weatherGfx[i] === "cloudy") {
  //     weatherSheet = "plane" + [i];
  //     initCloudParticles(sheets.plane[i]);


  //   } else if (sheets.weatherGfx[i] === "fog") {
  //     weatherSheet = "plane" + [i];
  //     initFogParticles(sheets.plane[i]);


  //   } else if (sheets.weatherGfx[i] === "thunderstorm") {
  //     weatherSheet = "plane" + [i];
  //     initThunderStormParticles(sheets.plane[i]);

  //   } else if (sheets.weatherGfx[i] === "rain") {
  //     // initRainParticles(sheets.plane[i]);

  //    var emitter = new SPE.Emitter({
  //               position: new THREE.Vector3(0,0,0),
  //               positionSpread: new THREE.Vector3( 40, 20, 30 ),
  //               acceleration: new THREE.Vector3(0, -200, 0),
  //               accelerationSpread: new THREE.Vector3( 30, 30, 0 ),
  //               velocity: new THREE.Vector3(0, -500, 0),
  //               velocitySpread: new THREE.Vector3(20, 10, 0),
  //               colorStart: new THREE.Color('white'),
  //               colorEnd: new THREE.Color('white'),
  //               sizeStart: 0.7,
  //               sizeEnd: 0.3,
  //               particleCount: 30000
  //               //alive: 1
  //   });
  //   emitter.position = sheets.plane[i].position;
  //   rainParticles.addEmitter( emitter );


  //   }
  // }
// }

// initThunderStormParticles(sheets.plane[2]);
// initRainParticles(sheets.plane[0]);
// initSnowParticles(sheets.plane[1]);
// initFogParticles(sheets.plane[2])
// initCloudParticles(sheets.plane[2]);

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

    rainParticles = new SPE.Group({
      texture: THREE.ImageUtils.loadTexture('images/raindrop.png'),
      maxAge: 2
    });
    scene.add(rainParticles.mesh);

    snowParticles = new SPE.Group({
      texture: THREE.ImageUtils.loadTexture('images/smokeparticle.png'),
      maxAge: 2
    });
    scene.add(snowParticles.mesh);

    cloudParticles = new SPE.Group({
      texture: THREE.ImageUtils.loadTexture('images/cloud2.png'),
      maxAge: 2
    });
    scene.add(cloudParticles.mesh);

    fogParticles = new SPE.Group({
      texture: THREE.ImageUtils.loadTexture('images/smokeparticle.png'),
      maxAge: 5
    });
    scene.add(fogParticles.mesh);

    clearParticles = new SPE.Group({
      texture: THREE.ImageUtils.loadTexture('images/smokeparticle.png'),
      maxAge: 1
    });
    scene.add(clearParticles.mesh);

    tCloudParticles = new SPE.Group({
      texture: THREE.ImageUtils.loadTexture('images/darkcloud1.png'),
      maxAge: 5
    });
    scene.add(tCloudParticles.mesh);

    tRainParticles = new SPE.Group({
        texture: THREE.ImageUtils.loadTexture('images/raindrop.png'),
        maxAge: 2
      });
    scene.add(tRainParticles.mesh);
}



function render() {

  requestAnimationFrame(render);
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  sheets.plane[0].position.z += planeSpeed;
  sheets.plane[1].position.z += planeSpeed;
  sheets.plane[2].position.z += planeSpeed;
  sheets.plane[3].position.z += planeSpeed;

  // if (initSnowParticles.called) {
    snowParticles.tick(0.004);
  //   }
  // if (initRainParticles.called) {
      rainParticles.tick(0.01);
  //     }
  // if (initCloudParticles.called) {
      cloudParticles.tick(0.004);
  //     }
  // if (initThunderStormParticles.called) {
      tCloudParticles.tick(0.034);
      tRainParticles.tick(0.014);
  //     }

  // if (initClearParticles.called) {
    clearParticles.tick(0.014);
  //   }

  // if (initFogParticles.called) {
    fogParticles.tick(0.1);
    // }

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

//webGL weather scenarios:
function initSnowParticles() {
    initSnowParticles.called = true;
    snowParticles = new SPE.Group({
      texture: THREE.ImageUtils.loadTexture('images/smokeparticle.png'),
      maxAge: 2
    });
    emitter = new SPE.Emitter({
            position: new THREE.Vector3(0, 0, 0),
            positionSpread: new THREE.Vector3( 40, 20, 30 ),
            acceleration: new THREE.Vector3(0, -20, 0),
            accelerationSpread: new THREE.Vector3( 0, 0, 0 ),
            velocity: new THREE.Vector3(0, 0, 0),
            velocitySpread: new THREE.Vector3(20, 10, 0),
            colorStart: new THREE.Color('white'),
            colorEnd: new THREE.Color('blue'),
            sizeStart: 1.4,
            sizeEnd: 0,
            particleCount: 5000,
            opacityStart: 1,
            opacityEnd: 1,
});

    emitter.position.set = new THREE.Vector3(0,0,0);
    snowParticles.addEmitter( emitter );
    var num = weatherSheet;
    plane.add( snowParticles.mesh);
  }


// function initRainParticles() {
//     initRainParticles.called = true;


  // }

function initCloudParticles() {
    initCloudParticles.called = true;

    cloudParticles = new SPE.Group({
      texture: THREE.ImageUtils.loadTexture('images/cloud2.png'),
      maxAge: 2
    });

    var emitter = new SPE.Emitter({
      position: new THREE.Vector3(0,0,0),
          positionSpread: new THREE.Vector3(40, 20, 30),
      colorStart: new THREE.Color('white'),
          //colorStartSpread: new THREE.Vector3(1, 1, 1),
      colorEnd: new THREE.Color('black'),
      sizeStart: 100,
          sizeSpread: 100,
          opacityStart: 0,
          opacityMiddle: 0.5,
          opacityEnd: 0,
      particleCount: 400,
    });
    cloudParticles.addEmitter( emitter );
    plane.add( cloudParticles.mesh );
  }

function initFogParticles() {
    initFogParticles.called = true;

    fogParticles = new SPE.Group({
      texture: THREE.ImageUtils.loadTexture('images/smokeparticle.png'),
      maxAge: 5
    });

    emitter = new SPE.Emitter({
      position: new THREE.Vector3(0,0,0),
          positionSpread: new THREE.Vector3(40, 30, 30),
      colorStart: new THREE.Color('grey'),
          colorStartSpread: new THREE.Vector3(1, 1, 1),
      colorEnd: new THREE.Color('grey'),
      sizeStart: 4,
          sizeSpread: 6,
          opacityStart: 0,
          opacityMiddle: 1,
          opacityEnd: 0,
      particleCount: 10000,
    });
    fogParticles.addEmitter( emitter );
    plane.add( fogParticles.mesh );
  }

function initClearParticles() {

  if (!initClearParticles.called) {
    initClearParticles.called = true;

    clearParticles = new SPE.Group({
      texture: THREE.ImageUtils.loadTexture('images/smokeparticle.png'),
      maxAge: 1
    });

    emitter = new SPE.Emitter({
      position: (0,0,-5),
          positionSpread: new THREE.Vector3(40, 20, 10),
      colorStart: new THREE.Color('white'),
      //colorStartSpread: new THREE.Vector3(1, 1, 1),
      colorEnd: new THREE.Color('blue'),
      sizeStart: 3,
          sizeSpread: 4,
          opacityStart: 0,
          opacityMiddle: 0.6,
          opacityEnd: 0,
      particleCount: 10000,
    });
    clearParticles.addEmitter( emitter );
    plane.add( clearParticles.mesh );
  }}






function initThunderStormParticles() {
    initThunderStormParticles.called = true;

    tCloudParticles = new SPE.Group({
      texture: THREE.ImageUtils.loadTexture('images/darkcloud1.png'),
      maxAge: 5
    });

    cloudEmitter = new SPE.Emitter({
      position: new THREE.Vector3(0, 10,10),
          positionSpread: new THREE.Vector3(40, 0, 40),
      colorStart: new THREE.Color(0xFFFFFF),
          //colorStartSpread: new THREE.Vector3(1, 1, 1),
      colorEnd: new THREE.Color('black'),
      sizeStart: 100,
          sizeSpread: 20,
          opacityStart: 0,
          opacityMiddle: 1,
          opacityEnd: 0,
      particleCount: 500,
    });

    tRainParticles = new SPE.Group({
        texture: THREE.ImageUtils.loadTexture('images/raindrop.png'),
        maxAge: 2
      });

      rainEmitter = new SPE.Emitter({
                  position: new THREE.Vector3(0,0,0),
                  positionSpread: new THREE.Vector3( 40, 20, 30 ),
                  acceleration: new THREE.Vector3(0, -200, 0),
                  accelerationSpread: new THREE.Vector3( 30, 30, 0 ),
                  velocity: new THREE.Vector3(0, -500, 0),
                  velocitySpread: new THREE.Vector3(20, 10, 0),
                  colorStart: new THREE.Color('white'),
                  colorEnd: new THREE.Color('white'),
                  sizeStart: 0.5,
                  sizeEnd: 0.5,
                  particleCount: 30000,
                  //alive: 1
      });
      tCloudParticles.addEmitter( cloudEmitter );
      tRainParticles.addEmitter( rainEmitter );
      plane.add( tCloudParticles.mesh );
      plane.add( tRainParticles.mesh);
  }



