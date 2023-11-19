import jwt from "jsonwebtoken";
;
export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
        try {
            const decoded = jwt.verify(token, 'sofochka131313');
            req.userId = decoded._id;
            next();
        }
        catch (e) {
            return res.status(403).json({
                message: 'not permission',
            });
        }
        ;
    }
    else {
        return res.status(403).json({
            message: 'not permission',
        });
    }
    ;
};
//# sourceMappingURL=checkAuth.js.map