const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const fs = require("fs");

const s3 = new aws.S3({
  accessKeyId: "AKIA3DBJAYZLJCPN5Y3L",
  secretAccessKey: "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",
  Bucket: "twitterclone.dt",
});

const storage = multerS3({
  s3: s3,
  bucket: "twitterclone.dt",
  acl: "public-read",
  key: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload.single("image");
