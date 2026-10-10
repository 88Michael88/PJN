import { Router } from 'express';
import { connection } from '../database/db.js';

const FeedRouter = Router();

FeedRouter.get('/', (req, res) => {
    const data = connection.readIDRange(1, 10);

    res.render('feed', {posts: data});
});

export { FeedRouter };
