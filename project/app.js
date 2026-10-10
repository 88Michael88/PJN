import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app  = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const __routername = path.join(__dirname, 'router');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, 'public')));

import { HomeRouter } from './routes/home.js';
import { FeedRouter } from './routes/feed.js';
import { PostRouter } from './routes/post.js';
import { API1Router } from './routes/apiv1.js';

app.use("/",       HomeRouter);
app.use("/feed",   FeedRouter);
app.use("/posts",  PostRouter);
app.use("/api/v1", API1Router);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});
