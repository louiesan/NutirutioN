import { v2 as cloudinary } from "cloudinary";
import path from "node:path";

cloudinary.config({
  cloud_name: "dtjszaypd",
  api_key: 944228348326224,
  api_secret: "jsxaBxUS63b4E4qXMZgSmBmnXmI",
});
export async function UploadImage(image) {
  const imgPath = path.join(process.cwd(), "public", image);
  try {
    const imgInfo = await cloudinary.uploader.upload(imgPath, {
      folder: "nutirution Products",
      resource_type: "image",
    });
    return {
      url: imgInfo.secure_url,
      public_id: imgInfo.public_id,
    };
  } catch (err) {
    throw new Error("Failed to upload image");
  }
}
