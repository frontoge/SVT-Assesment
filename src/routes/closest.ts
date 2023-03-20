import express from 'express';
import controller from '../controllers/closest';
const router = express.Router();

router.post('/api/robots/closest/', controller.getClosest);

export = router;