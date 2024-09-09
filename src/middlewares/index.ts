import express from 'express';
import { get, identity, merge} from 'lodash';
import { getUserBySessionToken } from '../db/users';

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const currentUserId = get(req, 'identity._id');
        const { id } = req.params;

        if(currentUserId !== id){
            return res.sendStatus(403);
        }

        return next();
    }
    catch(err){
        console.log(err);
        return res.sendStatus(400);
    }
}


// Middleware to check if the user is authenticated
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const sessionToken = req.cookies['node-rest-api'];

        if(!sessionToken){
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if(!existingUser){
            return res.sendStatus(403);
        }

        merge(req, {identity: existingUser});

        return next();
    }
    catch(err){
        console.log(err);
        return res.status(400); 
    }
}
