import jwt from 'jsonwebtoken';

// Function to create a JWT token with given user ID
export const createJWT = async (id: string) => {
  try {
    const SECRET = process.env.JWT_SECRET; // Get JWT secret from environment variables

    if (!SECRET) throw new Error('No JWT secret provided'); // Ensure JWT secret is defined

    // Token expiration time: 1 day in seconds
    const maxAge = 1 * 24 * 60 * 60;
    // Generate JWT token with user ID payload and specified expiration
    const TOKEN = jwt.sign({ id }, SECRET, {
      expiresIn: maxAge,
    });
    // If token creation fails, throw an error
    if (!TOKEN) throw new Error('Failed to create JWT');
    // Return the generated JWT token
    return TOKEN;
  } catch (e) {
    console.log(e);
    throw new Error('Failed to create token.');
  }
};
