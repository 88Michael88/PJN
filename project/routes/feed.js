import { Router } from 'express';
import { connection } from '../database/db.js';
import { sleep } from '../simple_sleep/timeout.js';

const FeedRouter = Router();

FeedRouter.get('/', async (req, res) => {
    await sleep();

    const data = connection.readIDRange(1, 10);

    res.render('feed', {posts: data});
});

export { FeedRouter };
