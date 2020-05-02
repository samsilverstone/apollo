const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');
const cors=require('cors')
const app = express();

const MONGO_URI = 'mongodb+srv://samsilverstone:Password@cluster0-eit2c.mongodb.net/test?retryWrites=true&w=majority';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.connection
  .once('open', () => console.log('Connected to MongoDB instance.'))
  .on('error', (error) => console.log('Error connecting to MongoDB:', error));

app.use(bodyParser.json());
app.use(cors({
  origin:'http://localhost:3000'
}))
app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true,
  })
);



app.listen(4000, () => {
  console.log('Listening');
});
