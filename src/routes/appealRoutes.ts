import express from 'express';

import {
    cancelAllInProgress, cancelAppeal, completeAppeal, createAppeal, getAppeals, startProcessing
} from '../controllers/appealController';

const router = express.Router()

router.post('/', createAppeal)
router.put('/:id/start', startProcessing)
router.put('/:id/complete', completeAppeal)
router.put('/:id/cancel', cancelAppeal)
router.get('/', getAppeals)
router.put('/cancel-all-in-progress', cancelAllInProgress)

export default router
