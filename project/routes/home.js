import { Router } from 'express';

const HomeRouter = Router();

HomeRouter.get("/", (req, res) => {
    res.render("index");
});

export { HomeRouter };
