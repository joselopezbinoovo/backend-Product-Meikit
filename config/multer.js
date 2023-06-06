const multer = require('multer')
const path = require('path')


  const storage = (desination) => multer.diskStorage({
    destination: desination,
    filename:(req,file,cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
  })

  const fileUpload = ( destination) => multer({
    storage:storage(destination),
    limits: {
        fieldSize: 2 * 1024 * 1024,
    },
    fileFilter:( req,file,cb)=>{
        if ( file.mimetype == "image/png" ||file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
            cb(null,true)
        }else {
            cb(null,false)
            return cb(new Error('Solo, .png, jpg o jpeg format'));
        }
    },
    onError : function(err,next){
        return console.log('error',err)
        next(err)
    }
  }).single('image')


  module.exports = fileUpload;