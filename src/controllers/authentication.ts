import { getUserByEmail, createUser } from "../db/users";
import express from "express";
import { random, authentication } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        // Validate fields' existence
        if (!email || !password) {
            return res.sendStatus(400);
        }

        // Check if the user exists
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        // If the user doesn't exist
        if (!user || !user.authentication) {
            return res.sendStatus(401); // unauthorized
        }

        // Handle authentication (checking password)
        const expectedHash = authentication(user.authentication.salt, password);

        // Check if the password matches
        if (user.authentication.password !== expectedHash) {
            return res.sendStatus(403); // forbidden => wrong password or email
        }

        // Create and store session token
        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        await user.save();

        // Set the session token in a cookie
        res.cookie('node-rest-api', user.authentication.sessionToken, {
            domain: 'localhost',
            path: '/'
        });

        return res.status(200).json(user).end(); // return user object
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
};


// Register a new user
export const register = async (req: express.Request, res: express.Response) => {
    try{
        // data validation from the request body
        const {email, username, password} = req.body;

        // check if the fields are missing
        if(!email || !username || !password){
            return res.sendStatus(400);
        }

        // check if the user already exists
        const existingUser = await getUserByEmail(email);

        if (existingUser){
            res.sendStatus(409); // conflict
        }

        // call the hash function to generate a salt and hash the password(handling the authentication)
        const salt = random();

        // if the user does not exist, create a new user
        const user = await createUser(
            {
                email,
                username,
                authentication: {
                    salt,
                    password: authentication(password, salt),
                },
            },
        );

        return res.status(201).json(user); // created status code and return the user object in json format
    }
    catch(err){
        console.log(err);
        return res.sendStatus(400);
    }
}