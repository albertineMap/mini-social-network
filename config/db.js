const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://root:${process.env.DB_USER_PASS}@cluster0.g99n5.mongodb.net/mern-project`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
    })
    .then(() => console.log('connected to Mongo DB'))
    .catch((err) => console.log('Failed to connect to mongo DB : ', err));