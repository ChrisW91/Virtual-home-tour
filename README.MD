# Home Tour Example

A simple example of a Virtual home tour with clickable hotspots to take you throughout the property. (Random stock images used)


## Technologies Used

- Javascript
- Express
- A-frame (Uses html, css & javascript to create a virtual 3D world)

<img src="/readme_images/tour_example.png">

# Panoramic Image Sticher

## Parallax Errors
For high quality panoramic images it is recommended to use a tripod to reduce the amount of parallax errors in the image stitching process.

<img src="/readme_images/Parallax.webp">

## How To

- Place the images you want stitched together into the 'unstitchedimages'.
- Running the image_stitching.py program will start by showing each image you want stitched 1 by 1 followed by the output, hit any key to continue the stitching process. 
- The stitched panoramic image will be put in the Image_Stitching folder.

<img src="/readme_images/stitch_example.png">
## Technologies Used

- Python
- openCV



# Panoramic Image Viewer

- Upload a panoramic image to view it in 360 degree VR.
- Works together with the 'virtual_tour_api' to save the image on the server for later use.

## Technologies Used

- Javascript
- Three.js
- Multer