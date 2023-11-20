import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dcppnhord',
  api_key: '317235678629445',
  api_secret: 'XJ9065hY57GdokIsEoelpO4Cjqg',
});

export const uploadImage = async (req: any, res: any) => {
  try {
    const file = req.file.buffer;
    cloudinary.uploader
      .upload_stream(
        {
          folder: 'blog',
        },
        cloudinaryDone
      )
      .end(file);
    function cloudinaryDone(error: any, result: any) {
      if (error) {
        console.log('Error in cloudinary.uploader.upload_stream\n', error);
        return;
      }
      res.json({ cdn_url: result.url });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'xui tebe',
    });
  }
};

// let uploadFromBuffer = (req) => {

//   return new Promise((resolve, reject) => {

//     let cld_upload_stream = cloudinary.v2.uploader.upload_stream(
//      {
//        folder: "foo"
//      },
//      (error: any, result: any) => {

//        if (result) {
//          resolve(result);
//        } else {
//          reject(error);
//         }
//       }
//     );

//     streamifier.createReadStream(file).pipe(cld_upload_stream);
//   });

// };

// let result = await uploadFromBuffer(req);
