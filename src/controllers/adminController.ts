import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
export const authAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      res.status(400).json({
        message: 'Please provide email and password',
      });
      return;
    }

    const admin = await Admin.findOne({ email });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin._id.toString(), 'admin'),
      });
    } else {
      res.status(401).json({
        message: 'Invalid email or password',
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
    });
  }
};


// @desc    Register a new admin
// @route   POST /api/admin/register
// @access  Private/Admin
export const registerAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Validation - Check if all required fields are provided
    if (!name || !email || !password) {
      res.status(400).json({
        message: 'Please provide name, email, and password',
        missingFields: {
          name: !name,
          email: !email,
          password: !password,
        },
      });
      return;
    }

    // Check if admin already exists
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      res.status(400).json({
        message: 'Admin already exists with this email',
      });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin
    const admin = await Admin.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id.toString(), 'admin'),
    });

  } catch (error: any) {
    console.error('Register Admin Error:', error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      res.status(400).json({
        message: 'Validation error',
        errors: messages,
      });
      return;
    }

    res.status(500).json({
      message: 'Server error during admin registration',
    });
  }
};


// @desc    Get admin profile
// @route   GET /api/admin/me
// @access  Private/Admin
export const getAdminProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const adminId = (req as any).admin?._id;

    if (!adminId) {
      res.status(401).json({
        message: 'Not authorized',
      });
      return;
    }

    const admin = await Admin.findById(adminId);

    if (!admin) {
      res.status(404).json({
        message: 'Admin not found',
      });
      return;
    }

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });

  } catch (error) {
    console.error('Get Admin Profile Error:', error);
    res.status(500).json({
      message: 'Server error',
    });
  }
};