const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB_secret, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('DB Connected!'))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });


//gets back all the videos
router.get('/videos', async (req, res) => {
  console.log('got all the videos from the db');
  try {
    const videos = await Video.find({});
    res.json(videos);
  } catch (err) {
    res.json({
      msg: err
    });
  };
});

// gets a single video
router.get('/video/:id', async (req, res) => {
  console.log('got a single video');
  try {
    const video = await Video.findById(req.params.id);
    res.json(video);
  } catch (err) {
    res.json({
      msg: err
    });
  };
});

// submit a video
router.post('/videos', async (req, res) => {
  console.log('video subbmitted');
  const video = new Video({
    title: req.body.title,
    url: req.body.url,
    description: req.body.description
  });
  try {
    const savedVideo = await video.save();
    res.json(savedVideo);
  } catch (err) {
    res.json({
      msg: err
    });
  };
});

// //update a single video
router.put('/video/:id', async (req, res) => {
  console.log('updated video with id: ' + req.params.id);
  try {
    const updatedVideo = await Video.updateOne({
      _id: req.params.id
    }, {
      $set: {
        title: req.body.title,
        url: req.body.url,
        description: req.body.description
      }
    });
    res.json(updatedVideo);
  } catch (err) {
    res.json({
      msg: err
    });
  };
});

// delete a single video
router.delete('/video/:id', async (req, res) => {
  console.log('video deleted');
  try {
    const removedVideo = await Video.deleteOne({
      _id: req.params.id
    });
    res.json(removedVideo);
  } catch (err) {
    res.json({
      msg: err
    });
  };
});

module.exports = router;
