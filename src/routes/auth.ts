import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../model/User';

import { registrationSchema, loginValidationSchema } from '../utils/validation';

const router = Router();

interface RegistrationRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

router.post(
  '/registration',
  async (req: RegistrationRequest, res: Response) => {
    // Validate data
    const { error } = registrationSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);
    const { name, email, password } = req.body;

    // Checking if the user is already in the database
    const emailExists = await User.findOne({ email });
    if (emailExists) return res.status(400).send('Email already exists');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    try {
      const savedUser = await user.save();
      res.status(200).json({ id: savedUser._id });
    } catch (error) {
      res.status(400).send('Some error is occured with saving user');
    }
  },
);

router.post('/login', async (req: LoginRequest, res: Response) => {
  const { email, password } = req.body;

  const { error } = loginValidationSchema.validate(req.body);
  if (error) return res.status(400).send(error.message);

  const user: any = await User.findOne({ email });
  if (!user) return res.status(400).send('User is not exists');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Invalid password');

  // Create and assign a token
  const token = jwt.sign(
    { _id: user._id },
    process.env.TOKEN_SECRET || 'defaultsecrettoken',
  );
  res.header('token', token).send(token);
});

export { router as authRoute };
