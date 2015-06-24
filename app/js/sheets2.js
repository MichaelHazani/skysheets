'use strict';

//weather global vars
var planeText1, planeText2, planeText3, planeText4;
var textSize = 0.3;
var textHeight = 0.1;

//threeJS init vars
var scene, camera, listener,
    renderer, cube, hemilight,
     weatherSheet;

//DAT.Gui vars
var gui, Timeline, controller, controller2, controller3;

//variable speed for sheets
var planeSpeed = 0.015;
var plane1, plane2, plane3, plane4;

//particles
var snowParticles, rainParticles, cloudParticles, fogParticles, clearParticles,
    tRainParticles, tCloudParticles, cloudEmitter, rainEmitter, emitter;


//webGL weather scenarios:
function initSnowParticles(weatherSheet) {
    initSnowParticles.called = true;
    snowParticles = new SPE.Group({
      texture: THREE.ImageUtils.loadTexture('images/smokeparticle.png'),
      maxAge: 3
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
            particleCount: 10000,
            opacityStart: 1,
            opacityEnd: 1,
});

    emitter.position.set = weatherSheet.position;
    snowParticles.addEmitter( emitter );
    weatherSheet.add( snowParticles.mesh);
  }


function initRainParticles(weatherSheet) {
    initRainParticles.called = true;
    rainParticles = new SPE.Group({
      texture: THREE.ImageUtils.loadTexture('images/raindrop.png'),
      maxAge: 5
    });

    emitter = new SPE.Emitter({
                position: new THREE.Vector3(0, 0, 0),
                positionSpread: new THREE.Vector3( 40, 20, 30 ),
                acceleration: new THREE.Vector3(0, -200, 0),
                accelerationSpread: new THREE.Vector3( 30, 30, 0 ),
                velocity: new THREE.Vector3(0, -500, 0),
                velocitySpread: new THREE.Vector3(20, 10, 0),
                colorStart: new THREE.Color('white'),
                colorEnd: new THREE.Color('white'),
                sizeStart: 0.5,
                sizeEnd: 0.5,
                particleCount: 50000,
                //alive: 1
    });
    emitter.position.set = weatherSheet.position;
    rainParticles.addEmitter( emitter );
    weatherSheet.add( rainParticles.mesh);
  }

function initCloudParticles(weatherSheet) {
    initCloudParticles.called = true;

    cloudParticles = new SPE.Group({
      texture: THREE.ImageUtils.loadTexture('images/smokeparticle.png'),
      maxAge: 5
    });

    emitter = new SPE.Emitter({
      position: new THREE.Vector3(0, 10, 0),
          positionSpread: new THREE.Vector3(40, 0, 30),
      colorStart: new THREE.Color('grey'),
          colorStartSpread: new THREE.Vector3(1, 1, 1),
      colorEnd: new THREE.Color('grey'),
      sizeStart: 500,
          sizeSpread: 20,
          opacityStart: 0,
          opacityMiddle: 1,
          opacityEnd: 0,
      particleCount: 100,
    });
    cloudParticles.addEmitter( emitter );
    weatherSheet.add( cloudParticles.mesh );
  }

function initFogParticles(weatherSheet) {
    initFogParticles.called = true;

    fogParticles = new SPE.Group({
      texture: THREE.ImageUtils.loadTexture('images/smokeparticle.png'),
      maxAge: 5
    });

    emitter = new SPE.Emitter({
      position: new THREE.Vector3(0, 0, 0),
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
    weatherSheet.add( fogParticles.mesh );
  }

function initClearParticles(weatherSheet) {
    initClearParticles.called = true;

    clearParticles = new SPE.Group({
      texture: THREE.ImageUtils.loadTexture('images/smokeparticle.png'),
      maxAge: 5
    });

    emitter = new SPE.Emitter({
      position: new THREE.Vector3(0, 0, 0),
          positionSpread: new THREE.Vector3(40, 30, 30),
      colorStart: new THREE.Color('grey'),
          colorStartSpread: new THREE.Vector3(1, 1, 1),
      colorEnd: new THREE.Color('grey'),
      sizeStart: 2,
          sizeSpread: 6,
          opacityStart: 0,
          opacityMiddle: 0.6,
          opacityEnd: 0,
      particleCount: 10000,
    });
    clearParticles.addEmitter( emitter );
    weatherSheet.add( clearParticles.mesh );
  }

function initThunderStormParticles(weatherSheet) {
    initThunderStormParticles.called = true;

    tCloudParticles = new SPE.Group({
      texture: THREE.ImageUtils.loadTexture('images/darkcloud1.png'),
      maxAge: 5
    });

    cloudEmitter = new SPE.Emitter({
      position: new THREE.Vector3(0, 10, 0),
          positionSpread: new THREE.Vector3(40, 0, 30),
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
        maxAge: 5
      });

      rainEmitter = new SPE.Emitter({
                  position: new THREE.Vector3(0, 0, 0),
                  positionSpread: new THREE.Vector3( 40, 20, 30 ),
                  acceleration: new THREE.Vector3(0, -200, 0),
                  accelerationSpread: new THREE.Vector3( 30, 30, 0 ),
                  velocity: new THREE.Vector3(0, -500, 0),
                  velocitySpread: new THREE.Vector3(20, 10, 0),
                  colorStart: new THREE.Color('white'),
                  colorEnd: new THREE.Color('white'),
                  sizeStart: 0.5,
                  sizeEnd: 0.5,
                  particleCount: 50000,
                  //alive: 1
      });
      cloudEmitter.position.set = weatherSheet.position;
      rainEmitter.position.set = weatherSheet.position;
      tCloudParticles.addEmitter( cloudEmitter );
      tRainParticles.addEmitter( rainEmitter );
      weatherSheet.add( tCloudParticles.mesh );
      weatherSheet.add( tRainParticles.mesh);
  }


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
    //camera distance
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
  var geometry1 = new THREE.BoxGeometry(40,20,2);
  var material1 = new THREE.MeshPhongMaterial({color: 0xC6E2FF, transparent: true, wireframe: false, opacity: 0.7});
  plane1 = new THREE.Mesh(geometry1, material1);
  plane1.position.set(0, 0, -50);
  scene.add(plane1);


  var geometry2 = new THREE.BoxGeometry(40,20,2);
  var material2 = new THREE.MeshPhongMaterial({color: 0xC6E2FF, transparent: true, wireframe: false, opacity: 0.7});
  plane2 = new THREE.Mesh(geometry2, material2);
  plane2.position.set(0, 0, -100);
  scene.add(plane2);


  var geometry3 = new THREE.BoxGeometry(40,20,2);
  var material3 = new THREE.MeshPhongMaterial({color: 0xC6E2FF, transparent: true, wireframe: false, opacity: 0.7});
  plane3 = new THREE.Mesh(geometry3, material3);
  plane3.position.set(0, 0, -150);
  scene.add(plane3);


  var geometry4 = new THREE.BoxGeometry(40,20,2);
  var material4 = new THREE.MeshPhongMaterial({color: 0xC6E2FF, transparent: true, wireframe: false, opacity: 0.7});
  plane4 = new THREE.Mesh(geometry4, material4);
  plane4.position.set(0, 0, -200);
  scene.add(plane4);


//add text
  text1.position.y = plane1.position.y + 10;
  text1.position.x = plane1.position.x -10;
  plane1.add(text1);

  text2.position.y = plane2.position.y + 5;
  text2.position.x = plane2.position.x -10;
  plane2.add(text2);

  text3.position.y = plane3.position.y;
  text3.position.x = plane3.position.x -10;
  plane3.add(text3);

  text4.position.y = plane4.position.y - 5;
  text4.position.x = plane4.position.x -10;
  plane4.add(text4);


//add audio
  plane1.add(sheet1Sound);
  plane2.add(sheet2Sound);
  plane3.add(sheet3Sound);
  plane4.add(sheet4Sound);


initClearParticles(plane4);
initThunderStormParticles(plane3);
initRainParticles(plane1);
initSnowParticles(plane2);
// initFogParticles(plane3)
// initCloudParticles(plane3);


//start WebGL particles

  //   for (var i = 0; i < sheets.weatherType.length; i++ ) {
  //   weatherSheet = "plane" + [i + 1];
  //   if (sheets.weatherGfx[i] === "snow") {
  //     weatherSheet = sheets.plane[i];
  //     console.log("plane" + [i] + sheets.weatherGfx[i]);
  //     initSnowParticles(weatherSheet);

  //   } else if (sheets.weatherGfx[i] === "clear") {
  //     weatherSheet = sheets.plane[i];
  //     console.log("plane" + [i] + sheets.weatherGfx[i]);
  //     initClearParticles(weatherSheet);

  //   } else if (sheets.weatherGfx[i] === "cloudy") {
  //     weatherSheet = sheets.plane[i];
  //     console.log("plane" + [i] + sheets.weatherGfx[i]);
  //     initCloudParticles(weatherSheet);


  //   } else if (sheets.weatherGfx[i] === "fog") {
  //     weatherSheet = sheets.plane[i];
  //     console.log("plane" + [i] + sheets.weatherGfx[i]);
  //     initFogParticles(weatherSheet);


  //   } else if (sheets.weatherGfx[i] === "thunderstorm") {
  //     weatherSheet = sheets.plane[i + 1];
  //     console.log("plane "+ [i] + sheets.weatherGfx[i]);
  //     initThunderStormParticles(weatherSheet);

  //   } else if (sheets.weatherGfx[i] === "rain") {
  //     weatherSheet = sheets.plane[i];
  //     console.log("initRainParticles(plane" + [i + 1] +")");
  //     initRainParticles(plane1);
  //   }
  // }


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

  if (initSnowParticles.called) {
    snowParticles.tick(0.004);
    }
  if (initRainParticles.called) {
      rainParticles.tick(0.014);
      }
  if (initCloudParticles.called) {
      cloudParticles.tick(0.004);
      }
  if (initThunderStormParticles.called) {
      tCloudParticles.tick(0.004);
      tRainParticles.tick(0.004);
      }

  if (initClearParticles.called) {
    clearParticles.tick(0.1);
    }

  if (initFogParticles.called) {
    fogParticles.tick(0.1);
    }

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
