import jwt from "jsonwebtoken";

interface JwtPayload {
  _id: string;
};

export default (req: any, res: any, next: any) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, 'sofochka131313') as JwtPayload;
      req.userId = decoded._id;
      next();
    } catch (e) {
      return res.status(403).json({
        message: 'not permission',
      });

    };
  } else {
    return res.status(403).json({
      message: 'not permission',
    });
  };
};