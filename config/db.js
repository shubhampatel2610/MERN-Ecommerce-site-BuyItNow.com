import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log(" Connected to mongoDB database successfully ".bgMagenta.white);
    } catch (error) {
        console.log(` The error occured ${error} `.bgRed.white);
    }
}

export default connectDB;