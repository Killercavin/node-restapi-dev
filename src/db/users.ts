import mongoose from "mongoose";

// Define the schema for the user model
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    authentication: {
        password: {
            type: String,
            required: true,
            selected: false,
        },
        salt: {
            type: String,
            required: true,
            selected: false,
        },
        sessionToken: {
            type: String,
            selected: false,
        },
    },
});

export const userModel = mongoose.model('User', userSchema);


// Finding database contents

// pulling all the data

export const getUsers = () => userModel.find();

// pulling data by email
export const getUserByEmail = (email: string) => userModel.findOne({
    email,
});

// pulling data by username
export const getUserByUsername = (username: string) => userModel.findOne({username});

// pulling data by session token
export const getUserBySessionToken = (sessionToken: string) => userModel.findOne({'authentication.sessionToken': sessionToken});

// pulling data by id
export const getUserById = (id: string) => userModel.findById(id);


// Adding data to the database

// adding user to the database
export const createUser = (user: any) => userModel.create(user);

// deleting user from the database
// export const deleteUser = (id: string) => userModel.findByIdAndDelete(id);
export const deleteUserById = (id: string) => userModel.findOneAndDelete({_id: id});

// updating user in the database
export const updateUserById = (id: string, user: any) => userModel.findByIdAndUpdate(id, user);
