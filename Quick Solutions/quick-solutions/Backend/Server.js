const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const { ObjectId } = require('mongodb');
const connectToDatabase = require('./Mongo');
const stripe = require('stripe')('sk_test_51PR9BhJjgfEhmVRN95SvkGYjQ1GWB3qbbo0s591XaZfa1t6jD1vb96LnpGPGINLwp841in8AdbSqtyG4jnjRjdpk00lAhirfM2');

const app = express();
const port = process.env.PORT || 5000;
const YOUR_DOMAIN = 'http://localhost:3000';

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

async function run() {
  const { client, loginCollection, OrderCollection, HomeCollection, ReviewCollection, BlogCollection } = await connectToDatabase();

  app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
      const existingUser = await loginCollection.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ message: 'Email already in use' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await loginCollection.insertOne({ email, password: hashedPassword });
      res.status(201).send({ message: 'Sign-up successful' });
    } catch (error) {
      console.error('Error during sign-up:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });

  app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await loginCollection.findOne({ email });
      if (!user) {
        return res.status(401).send({ message: 'Invalid credentials' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        res.status(200).send({ message: 'Login successful' });
      } else {
        res.status(401).send({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });

  app.post('/order', async (req, res) => {
    const {
      name,
      email,
      phoneNumber,
      educationLevel,
      paperType,
      numberOfPages,
      paperQuality,
      wordCount,
      deliveryTime,
      price,
      discount,
      finalPrice,
      majorCourse,
      topic,
      whoAssistedYou,
      citationStyle,
      reference,
      paperDescription,
      extraRequirements,
    } = req.body;

    try {
      await OrderCollection.insertOne({
        name,
        email,
        phoneNumber,
        educationLevel,
        paperType,
        numberOfPages,
        paperQuality,
        wordCount,
        deliveryTime,
        price,
        discount,
        finalPrice,
        majorCourse,
        topic,
        whoAssistedYou,
        citationStyle,
        reference,
        paperDescription,
        extraRequirements,
      });
      res.status(201).send({ message: 'Order submitted successfully' });
    } catch (error) {
      console.error('Error submitting order:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });

  app.post('/', async (req, res) => {
    const {
      type,
      educationLevel,
      deadline,
      pages,
      price,
      discount,
    } = req.body;

    try {
      await HomeCollection.insertOne({
        type,
        educationLevel,
        deadline,
        pages,
        price,
        discount,
      });

      res.status(201).send({ message: 'Home order submitted successfully' });
    } catch (error) {
      console.error('Error submitting home order:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });

  app.post('/api/reviews', async (req, res) => {
    const { orderId, reviewTitle, feedback, rating, gradeReceived, marks } = req.body;

    try {
      await ReviewCollection.insertOne({
        orderId,
        reviewTitle,
        feedback,
        rating,
        gradeReceived,
        marks,
      });
      res.status(201).send({ message: 'Review submitted successfully' });
    } catch (error) {
      console.error('Error submitting review:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });

  app.get('/api/reviews', async (req, res) => {
    try {
      const reviews = await ReviewCollection.find().toArray();
      res.status(200).send(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });

  app.post('/api/blogs', upload.array('images', 10), async (req, res) => {
    const { title, content } = req.body;
    const images = req.files.map(file => `/uploads/${file.filename}`);

    console.log('Received blog submission:', { title, content, images }); // Debugging log

    try {
      await BlogCollection.insertOne({ title, images, content });
      res.status(201).send({ message: 'Blog submitted successfully' });
    } catch (error) {
      console.error('Error submitting blog:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });

  app.get('/api/blogs', async (req, res) => {
    try {
      const blogs = await BlogCollection.find().toArray();
      const formattedBlogs = blogs.map(blog => ({
        ...blog,
        id: blog._id, // Map _id to id
      }));
      res.status(200).send(formattedBlogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });

  app.get('/api/blogs/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const blog = await BlogCollection.findOne({ _id: new ObjectId(id) });
      if (blog) {
        res.status(200).send(blog);
      } else {
        res.status(404).send({ message: 'Blog not found' });
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });

  app.post('/create-checkout-session', async (req, res) => {
    const { price, discount } = req.body;
    const totalAmount = (price - discount) * 100; // Stripe expects the amount in cents

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Transaction for Services',
              },
              unit_amount: totalAmount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}?success=true`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
      });
      res.json({ id: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Serve the React app
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  process.on('SIGINT', async () => {
    await client.close();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  });
}

run().catch(console.dir);
