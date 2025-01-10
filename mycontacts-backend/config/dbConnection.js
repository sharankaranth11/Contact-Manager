import mongoose from "mongoose";


const connectionDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.LOCAL_STRING);
        console.log("DB connected Succesfully", connect.connection.host, connect.connection.name)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
module.exports = connectionDB;