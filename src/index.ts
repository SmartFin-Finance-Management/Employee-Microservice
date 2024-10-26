import app from './app';
import connectDB from './config/database';

connectDB()
  .then(() => {
    app.listen(3003, () => {
      console.log('Server is running on port 3001');
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
