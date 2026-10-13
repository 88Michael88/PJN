import { Router } from 'express';
import { connection } from '../database/db.js';
import { sleep } from '../simple_sleep/timeout.js';

const API1Router = Router();

API1Router.get('/posts/:id/additional-info/', async (req, res) => {
    await sleep();

    const fetch = connection.readID(req.params.id);
    const data = fetch.additional_info;

    res.json(data);
});

API1Router.get('/posts/:id/read-more', async (req, res) => {
    await sleep();

    const fetch = connection.readID(req.params.id);
    const data = fetch.read_more;

    res.json(data);
});

API1Router.get('/feed', async (req, res) => {
    await sleep();

    const data = connection.readIDRange(parseInt(req.query.offset) + 1, parseInt(req.query.limit) + parseInt(req.query.offset));

    res.json(data);
});


export { API1Router }; 
