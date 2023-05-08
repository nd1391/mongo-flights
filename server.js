require("dotenv").config()
const mongoose = require('mongoose')
// const db = require('./config/database')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const { connect, connection } = require('mongoose')
const Flight = require('./models/flight')
const Destination = require('./models/destination')
const methodOverride = require('method-override')

// Database connection
connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
connection.once('open', () => {
  console.log('connected to mongo')
})

// Global configuration
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

// Connect to Mongo
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// View Engine Middleware Configure
const reactViewsEngine = require('jsx-view-engine').createEngine();
app.engine('jsx', reactViewsEngine);
// This line tells the render method the default file extension to look for.
app.set('view engine', 'jsx');
// This line sets the render method's default location to look for a jsx file to render. Without this line of code we would have to specific the views directory everytime we use the render method
app.set('views', './views');

// Custom Middleware
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log('Middleware running...');
  next();
});

//use methodOverride.  We'll be adding a query parameter to our delete form named _method
app.use(methodOverride('_method'));
//this tells the server to go look for static assets in the public folder, like for css, images, or fonts
app.use(express.static("public"))

// Index
app.get('/flights', async (req, res) => {
    console.log('Index Controller Func. running...');
    try {
      const foundFlight = await Flight.find({}) //find method left empty to receive all data, no filtering
      res.status(200).render('Index', { flights:
      foundFlight });
    } catch (err) {
      res.status(400).send(err)
    }
  });

// New // renders a form to create a new fruit
app.get('/flights/new', (req, res) => {
    res.render('New');
  });

  // Update
// app.put('/flights/:id', async (req,res) => {
//   try {
//       const updatedFlight = await Flight.findByIdAndUpdate(req.params.id, req.body, {new:true})
//       console.log(updatedFlight)
//       res.redirect(`/flights/${req.params.id}`)
//   } catch(err) {
//     res.status(400).send(err)
//   }
// })

// Create
app.post('/flights', async (req, res) => {
  try {
    const newFlight = await Flight.create(req.body)
    res.redirect('/flights')
  } catch(err) {
    res.status(400).send(err)
  }  
})

// Create
app.post('/destinations/:id', async (req, res) => {
  try {
    const newDestination = await Destination.create(req.body)
    const updatedFlight = await Flight.findByIdAndUpdate(req.params.id,
      {$addToSet: {destinations: newDestination._id}},
      {new: true})
      res.redirect(`/flights/${req.params.id}`)
    
  } catch(err) {
    res.status(400).send(err)
  }
})



// Show
app.get('/flights/:id', async (req, res) => {
  try {
    const foundFlight = await Flight.findById(req.params.id).populate('destinations')
    res.render('Show', {
      flight: foundFlight,
    })
  } catch(err) {
    res.status(400).send(err)
  }
})

  // Listen
  app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
  })