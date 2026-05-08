import User from "../models/User.js";
import AppError from "../utils/AppError.js";

//patch /api/users/role
export const updateRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    if (!["landlord", "tenant"].includes(role)) {
      throw new AppError("Invalid role", 400);
    }

    if (req.user.role) {
      throw new AppError("Role already set", 400);
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { role },
      { returnDocument: "after" }
    ).select("-__v");

    res.json(user);
  } catch (error) {
    next(error);
  }
};