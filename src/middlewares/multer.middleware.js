import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/temp")
    },
    fileusername: function (req, file, cb) {
      cb(null, file.originalusername)
    }
  })
  
export const upload = multer({ 
    storage,
})