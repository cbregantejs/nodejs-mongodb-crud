import cloudinary from 'cloudinary';
import fs from 'fs';

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return bitmap.toString('base64');
}

/////////////////////////
// Uploads an image file
/////////////////////////
export const uploadImage = async (imagePath) => {
    const image = base64_encode(imagePath);
    const uploadSrc = `data:image/png;base64,${image}`;
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true
    });
    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.v2.uploader.upload(uploadSrc, options);
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
};