import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Connected to MongoDB');

    const existing = await User.findOne({ email: 'admin@example.com' });
    if (existing) {
      console.log('Admin already exists');
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    await User.create({
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    });

    console.log('✅ Admin seeded: admin@example.com / admin123');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding admin:', err);
    process.exit(1);
  }
};

seedAdmin();
