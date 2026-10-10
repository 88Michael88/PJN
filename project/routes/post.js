import { Router } from 'express';
import { connection } from '../database/db.js';

const PostRouter = Router();

PostRouter.get('/', (req, res) => {
    res.redirect('/feed');
})

PostRouter.get('/:id', (req, res) => {
    const data = connection.readID(req.params.id);

    res.render('post', {post: data});
});

export { PostRouter };
