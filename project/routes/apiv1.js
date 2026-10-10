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

API1Router.get('/feed', (req, res) => {
    console.log("OFFSET: ", parseInt(req.query.offset) + 1);
    console.log("LIMIT : ", parseInt(req.query.limit));
    console.log("NEXT INDEX: ", parseInt(req.query.limit) + parseInt(req.query.offset) - 1);
    const data = connection.readIDRange(parseInt(req.query.offset) + 1, parseInt(req.query.limit) + parseInt(req.query.offset));
    console.log(data.length);

    res.json(data);
});


export { API1Router }; 
