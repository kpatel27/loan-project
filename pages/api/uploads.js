import nextConnect from 'next-connect';
import multer from 'multer';

let fileName;

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      fileName = file.originalname;
      cb(null, file.originalname)
    }
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array('theFiles'));

apiRoute.post((req, res) => {
  res.status(200).json({ fileName });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};