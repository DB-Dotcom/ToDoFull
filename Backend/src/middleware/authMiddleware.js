import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extrahiere den Token aus dem Authorization Header
      token = req.headers.authorization.split(' ')[1];

      // Verifiziere den Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Füge die Benutzer-ID aus dem Token zum Request-Objekt hinzu
      req.user = { userId: decoded.userId };

      next();
    } catch (error) {
      res.status(401).json({ message: 'Nicht autorisiert, Token ungültig' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Nicht autorisiert, kein Token' });
  }
};
