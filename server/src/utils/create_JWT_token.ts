import jwt from 'jsonwebtoken';

export const createJWT = async (id: string) => {
  try {
    const SECRET = process.env.JWT_SECRET;

    if (!SECRET) throw new Error('No JWT secret provided');

    // 1 day in seconds ↓
    const maxAge = 1 * 24 * 60 * 60;
    const TOKEN = jwt.sign({ id }, SECRET, {
      expiresIn: maxAge,
    });
    if (!TOKEN) throw new Error('Failed to create JWT');
    return TOKEN;
  } catch (e) {
    if (typeof e === 'string') {
      throw new Error(e.toLocaleLowerCase());
    } else if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
};
