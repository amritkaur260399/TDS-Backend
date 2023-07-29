const { formidable } = require("formidable");
const uploadFiles = require("../services/upload-files");

const uploadImage = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(400);
        res.send(err);
      }
      // upload files to s3`
      const filesArray = Object.values(files);
      const allFileUploadedArray = await Promise.all(
        filesArray?.map(async (item) => {
          let location = item.path || item.filepath;
          const originalFileName = item.name || item.originalFilename;
          const fileType = item.type || item.mimetype;
          // uploads file.
          const data = await uploadFiles.upload(
            location,
            originalFileName,
            "post/",
            null
          );
          return {
            url: data.Location,
            type: fileType,
          };
        })
      );

      return res.status(200).json({
        success: true,
        url: allFileUploadedArray,
      });
    });
  } catch (error) {
    console.log("error: ", error);
    next(error);
  }
};

module.exports = uploadImage;
