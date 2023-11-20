import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: 'dcppnhord',
    api_key: '317235678629445',
    api_secret: 'XJ9065hY57GdokIsEoelpO4Cjqg'
});
export const uploadImage = async (req, res) => {
    try {
        const file = req.files.image;
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            public_id: `${Date.now()}`,
            use_filename: true,
            unique_filename: false,
            folder: 'blog',
            overwrite: true,
            resource_type: "auto",
        });
        res.json({
            url: result.secure_url
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'xui tebe',
        });
    }
};
//# sourceMappingURL=ImageController.js.map