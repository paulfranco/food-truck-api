import mongoose from 'mongoose';

export default callback => {
    let db = mongoose.connect(config.mongoUrl);
    callback(db);
}