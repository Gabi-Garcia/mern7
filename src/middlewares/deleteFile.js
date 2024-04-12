const cloudinary = require('cloudinary').v2


const deleteFile = (imgUrl) =>{
const imgSplited = imgUrl.split("/");
const nameSplited = imgSplited.at(-1).split(".");
const folderSplited = imgSplited.at(-2);
const public_id = `${folderSplited}/${nameSplited[0]}`;

cloudinary.uploader.destroy(public_id, ()=>{
    console.log("Deleted Img")
})
}

module.exports = { deleteFile }