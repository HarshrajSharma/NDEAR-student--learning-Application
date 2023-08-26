const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const cors=require('cors')

const app = express();
const upload = multer();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
AWS.config.update({
  accessKeyId: 'AKIA4MWYHYIJYIZFFBKB',
  secretAccessKey: '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',
  region: 'us-east-1'
});

const s3 = new AWS.S3();

app.post('/upload', upload.array('images', 4), async(req, res) => {
  const files = req.files;
  const image=[]
  for (const file of files) {
    const uploadParams = {
      Bucket: 'thinnai-s3-bucket',
      Key: file.originalname,   
      Body: file.buffer,
    };

    const s3Response = await s3.upload(uploadParams).promise();

    // Get the URL of the uploaded image
    const imageUrl = s3Response.Location;
    console.log(imageUrl)
    image.push(imageUrl)
    /* s3.putObject(uploadParams, function(err, data) {
      if (err) {
        console.error(err);
      } else {
        console.log('File uploaded successfully.');
      }
    }) */
}

  res.status(200).send(image)
});

app.listen(4000, () => {
  console.log('Server started on port 4000.');
});
