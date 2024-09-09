import express from 'express';
import routerAuthentication from './authentication';

const router = express.Router();

export default(): express.Router => {
    routerAuthentication(router);
    return router;
};


