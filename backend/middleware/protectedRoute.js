import UserModel from "../model/usermodel.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
    // console.log("hiiiiiiii");
    try {
        let token = req.cookies.jwt;
        // console.log("token I am here",  token);
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded, "dddddddddeeeeeeee======");
        // console.log(decoded);
        const user = await UserModel.findById(decoded._id).select("-password");

        // console.log(user,"useruuuuuuuu{{{{{{}}}}}}");
        // console.log(user);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        // console.log(req.user);
        next();

    } catch (err) {
        res.status(500).json({ message: err.message });
        // console.log("Error in protectRoute: ", err.message);
    }
};

export default protectRoute;
