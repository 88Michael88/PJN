import { Router } from 'express';
import { connection } from '../database/db.js';

const API1Router = Router();

API1Router.get('/posts/:id/additional-info/', (req, res) => {
    const fetch = connection.readID(req.params.id);
    const data = fetch.additional_info;
    console.log(data);

    res.json(data);
});

API1Router.get('/posts/:id/read-more', (req, res) => {
    const fetch = connection.readID(req.params.id);
    const data = fetch.read_more;

    res.json(data);
});

export { API1Router }; 
