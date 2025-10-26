const jwt = require('jsonwebtoken');

const generateZoomJWT = () => {
  const payload = {
    iss: process.env.ZOOM_API_KEY,
    exp: ((new Date()).getTime() + 5000)
  };
  return jwt.sign(payload, process.env.ZOOM_API_SECRET);
};

module.exports = generateZoomJWT;
