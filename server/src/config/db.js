const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn('⚠️ MONGO_URI is not set. Server started without database connection.');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('✅ MongoDB connected!');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
};

module.exports = connectDB;