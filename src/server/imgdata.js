import { v4 as uuidv4 } from "uuid";
import { uploadData } from "./fireStore";

export const upload = async (file, name, gender, option, price, describe) => {
  const id = uuidv4();
  let formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default");
  formData.append("public_id", id);
  formData.append("api_key", 248127988932917);
  await fetch("https://api.cloudinary.com/v1_1/djs6iac6l/image/upload", {
    method: "POST",
    body: formData,
  })
    .then((data) => data.json())
    .then((img) =>
      uploadData(name, gender, option, price, id, img.url, describe)
    )
    .catch((err) => console.log(err));
};
