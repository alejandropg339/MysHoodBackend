import mongoose, { ConnectOptions } from 'mongoose';

export const dbConnection = async (): Promise<void>=>{
    try{
        await mongoose.connect("mongodb://localhost/MysHood", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);
        console.log('DB is connected');
    }catch(e){
        console.log(e)
        throw new Error ('Error to initialize database connection');
    }
}