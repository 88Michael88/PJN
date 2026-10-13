import { Router } from 'express';
import { sleep } from '../simple_sleep/timeout.js';

const HomeRouter = Router();

HomeRouter.get("/", async (req, res) => {
    await sleep();

    res.redirect("/feed");
});

export { HomeRouter };
