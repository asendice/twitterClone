module.exports = (req, res, next) => {
  if (typeof req.file === "undefined" || typeof req.body === "undefined") {
    return res.status(400).json({
      errors: "Problem with sending data 'undefined' ",
    });
  }

  let id = req.body.userId;
  let image = req.file.path;

  if (
    !req.file.mimetype.includes("jpeg") &&
    !req.file.mimetype.includes("png") &&
    !req.file.mimetype.includes("jpg")
  ) {
    fs.unlinkSync(image);
    return res.status(400).json({
      errors: "file not supported",
    });
  }

  //checking to see if max file size is bigger than 1megabyte
  if (req.file.size > 1024 * 1024) {
    fs.unlinkSync(image);
    return res.status(400).json({
      errors: "File is too large",
    });
  }
};
