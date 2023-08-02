import { Router } from "express";

const router = Router();

router.get('/loggerTest', (req, res) => {
    req.logger.debug('Debug');
    req.logger.http('Http');
    req.logger.info('Info');
    req.logger.warning('Warning');
    req.logger.error('Error');
    req.logger.fatal('Fatal');
    res.sendStatus(200)
})

export default router;