import express from 'express';
import { getUsers, deleteUserById, updateUserById } from '../db/users';


export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try{
        const users = await getUsers();
        return res.status(200).json(users);
    }
    catch(err){
        console.log(err);
        return res.sendStatus(400);
    }
};


export const deleteUser = async (req: express.Request, res: express.Response) => {
    try{
        const { id } = req.params;

        // Delete user with id
        const deletedUser = await deleteUserById(id);
        return res.json(deletedUser);
    }
    catch(err){
        console.log(err);
        return res.sendStatus(400);
    }
};


export const updateUser = async (req: express.Request, res: express.Response) => {
    try{
        const { id } = req.params;
        const { email, username, password } = req.body;

        // Update user with id
        const updatedUser = await updateUserById(id, {email, username, password});
        return res.status(200).json(updatedUser);
    }
    catch(err){
        console.log(err);
        return res.sendStatus(400);
    }
}