const cors = require('cors');
const express = require('express')
const multer = require('multer')
const app = express();
const port = 8080

app.use(cors())


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploaded_imgs')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })


app.post('/api/upload', upload.single('image'), (req, res) => {
  // req.file is the `image` file
  console.log(req.file);
  res.send('File uploaded successfully.');
});



app.listen(port, () => {
  console.log(`server listening on port ${port}`);
})




