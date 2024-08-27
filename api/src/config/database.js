import mongoose from 'mongoose'

const connect = async (MONGODB_URL) => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed");
    }
}

export default connect;