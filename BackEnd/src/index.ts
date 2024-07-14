import express from 'express';
import bodyParser from 'body-parser';
import todoRoutes from './routes/TodoRoute';
import userRoutes from './routes/UserRoute';
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors())
// Routes
app.use('/todo', todoRoutes);
app.use('/users', userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
