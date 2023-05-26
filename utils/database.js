import mongoose from "mongoose";

let isConnected = false;
// const uri = process.env.MONGOGDB_URI;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if(isConnected){
        console.log('MonogDB is already connected')        
        return
    }
    // console.log(uri);

    try {
        await mongoose.connect('mongodb+srv://portfolioadmin:portfolioadmin123@cluster0.5qkjqhs.mongodb.net/?retryWrites=true&w=majority', {
            dbName: 'portfolio',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;
        console.log('MongoDB connected')
    }catch(error){
        console.log(error);
    }
}