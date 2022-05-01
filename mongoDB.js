require('dotenv').config()
const mongoose = require('mongoose');

const password = process.env.PASSWORD
const dbUrl = `mongodb+srv://elirant:${password}@cluster0.1wivh.mongodb.net/test?retryWrites=true&w=majority`
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(dbUrl,connectionParams);
 
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
    console.log("Connection Successful!");
});
     
    const CreditSchema = mongoose.Schema({
        description: String,
        classifier: String,
        openingBalance: Number,
        debit: Number,
        credit: Number,
        finalBalance: Number,
        parent: { type: String, default: null }
    });
 
    const Credit = mongoose.model('Credit', CreditSchema);

 
    async function insertToCollection(credits) {
        try {
            const result = await Credit.collection.insertMany(credits);
            console.log(`${result.insertedCount} documents were inserted`)
        } catch (error) {
            console.error(error);
        }
        finally {
            db.close()
        }
    }

    
module.exports = {
	insertToCollection
}
     
