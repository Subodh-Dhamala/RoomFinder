import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import { clerkClient } from "@clerk/clerk-sdk-node";

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
      { new: true }
    ).select("-__v");

    await clerkClient.users.updateUserMetadata(req.auth.userId, {
      publicMetadata: { role },
    });

    res.json(user);
  } catch (error) {
    next(error);
  }
};