
document.addEventListener('DOMContentLoaded', function () {

  var currentImage = 'images/living-room.jpg';
  var camera = document.getElementById('camera');
  var sky = document.getElementById('sky-360');

  // function is called when a new image has finished loading
  function onImageLoaded() {
    showNextHotspot(currentImage);
    camera.emit('zoom-reset');
  }

  // event listener to the sky element for when a new image is loaded
  sky.addEventListener('materialtextureloaded', onImageLoaded);

  function changeSkyImage(event) {
    console.log('Clicked entity:', event.target);
    hideAllHotspots();
    // Zoom in and then change the image
    zoomCameraEffect(() => {
      var newImage = event.target.getAttribute('data-image');
      currentImage = newImage;
      sky.setAttribute('src', newImage);
    });

  }

  function zoomCameraEffect(callback) {

    if (camera) {
      camera.emit('zoom-in');
      setTimeout(() => {
        if (typeof callback === 'function') {
          callback();
        }
      }, 1000); //match the duration to the zoom-in animation in html el
    }
  }

  function hideAllHotspots() {
    const hotspots = document.querySelectorAll('.clickable');
    hotspots.forEach(hotspot => {
      hotspot.setAttribute('visible', 'false');
    });
  }

  function showNextHotspot(image) {
    let nextHotspotId;
    switch (image) {
      // Map the current image to the next hotspot ID
      case 'images/living-room.jpg':
        nextHotspotId = 'kitchen-hotspot';
        break;
      case 'images/kitchen.jpg':
        nextHotspotId = 'bedroom-hotspot';
        break;
      case 'images/bedroom.jpg':
        nextHotspotId = 'bathroom-hotspot';
        break;
      case 'images/bathroom.jpg':
        nextHotspotId = 'livingroom-hotspot';
        break;
    }
    const nextHotspot = document.getElementById(nextHotspotId);
    if (nextHotspot) {
      nextHotspot.setAttribute('visible', 'true');
    }
  }

  // Initialize the scene by hiding all hotspots and showing the first one
  hideAllHotspots();
  showNextHotspot(currentImage);


  // Attach the changeSkyImage function to each clickable entity
  const clickableEntities = document.querySelectorAll('.clickable');
  clickableEntities.forEach(entity => {
    entity.addEventListener('click', changeSkyImage);
  });
});

