import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const userAuth = (req, res, next) => {
  cookieParser()(req, res, () => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
      const decoded = jwt.verify(token, 'my_secret_key');
      req.user = decoded;
      next();
    } catch (ex) {
      res.status(400).json({ message: 'Invalid token.' });
    }
  });
};

export default userAuth;
