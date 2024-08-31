const mongoose=require('mongoose');

const connectDB = async (url) => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB is connected');
    } catch (error) {
        console.log('MongoDB connection failed');
        process.exit(1);
    }
}

module.exports = connectDB;