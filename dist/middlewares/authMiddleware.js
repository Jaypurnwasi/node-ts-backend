import jwt from 'jsonwebtoken';
export const authMiddleware = (req, res, next) => {
    try {
        // Extract token from headers
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ success: false, message: "Access denied. No token provided" });
            return;
        }
        const token = authHeader.split(" ")[1];
        // Verify token
        try {
            const decoded = jwt.verify(token, 'my secret key ');
            req.user = decoded.id;
            //   console.log(decoded)
            next();
        }
        catch (err) {
            res.status(401).json({ success: false, message: "Invalid or expired token", error: err });
        }
    }
    catch (error) {
        res.status(401).json({ success: false, message: "error while authentication token" });
        return;
    }
};
