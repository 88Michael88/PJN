import { Router } from 'express';
import { connection } from '../database/db.js';
import { sleep } from '../simple_sleep/timeout.js';

const PostRouter = Router();

PostRouter.get('/', async (req, res) => {
    await sleep();

    res.redirect('/feed');
})

PostRouter.get('/:id', async (req, res) => {
    await sleep();

    const data = connection.readID(req.params.id);

    res.render('post', {post: data});
});

export { PostRouter };
