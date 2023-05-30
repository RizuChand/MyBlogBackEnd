const mongoose = require('mongoose');


const connectDb = async () => {
    try {
        
        await mongoose.connect('mongodb+srv://dragoriza123:kingofharem1@cluster0.mzso55w.mongodb.net/?retryWrites=true&w=majority', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectDb