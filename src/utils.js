import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import multer from "multer";

// Multer configuration

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/public/img');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const uploader = multer({storage});

export default uploader;