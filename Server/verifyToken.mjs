

import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  console.log('Token received:', token);
  if (!token) {
    console.log('No token found in cookies');
    return res.status(401).send("You are not authenticated!");
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      console.error('Token verification error:', err);
      return next(createError(403, "Token is not valid!"));
    }
    req.user = user;
    next();
  });
};
