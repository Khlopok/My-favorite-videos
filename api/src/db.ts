import mongoose, { ConnectionOptions } from 'mongoose';

const uri = process.env.MONGODB_URI || 'mongodb://localhost/merndb';

(async () => {
    try {
        const mongooseOptions:ConnectionOptions = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
        const db = await mongoose.connect(uri, mongooseOptions);
        console.log(`The database on use: ${db.connection.name} is ready!`);
    } catch(error) {
        console.log(error || 'Oops! unknow error');
    };
})();