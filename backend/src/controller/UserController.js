import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

class UserController {
    // @desc    Register a new user
    // @route   POST /api/users
    async store(req, res) {
        const { name, email, password, address, contact } = req.body;

        try {
            const userExists = await User.findOne({ email });

            if (userExists) {
                return res.status(400).json({ message: "User already exists" });
            }

            const user = await User.create({ name, email, password, address, contact });

            if (user) {
                generateToken(res, user._id);

                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    address: user.address,
                    contact: user.contact,
                    isAdmin: user.isAdmin,
                    status: "success",
                });
            } else {
                res.status(400).json({ message: "Invalid user data" });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }


    // @desc    Login user & get token
    // @route   POST /api/users/login
    async authUser(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });

            if (user && (await user.matchPassword(password))) {
                generateToken(res, user._id);

                res.status(200).json({
                    status: 'success',
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        address: user.address,
                        contact: user.contact,
                        isAdmin: user.isAdmin,
                    },
                });
            } else {
                res.status(401).json({ message: 'Invalid Email or Password' });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // @desc    Logout user / clear cookie
    // @route   POST /api/users/logout
    async logoutUser(req, res) {
        res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        res.status(200).json({ message: "Logged out successfully" });
    }

    // @desc    Get logged-in user profile
    // @route   GET /api/users/profile
    async getUserProfile(req, res) {
        try {
            const user = await User.findById(req.user._id);

            if (user) {
                res.status(200).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // @desc    Update user profile
    // @route   PUT /api/users/profile
    async updateUserProfile(req, res) {
        try {
            const user = await User.findById(req.user._id);

            if (user) {
                user.name = req.body.name || user.name;
                user.email = req.body.email || user.email;

                if (req.body.password) {
                    user.password = req.body.password;
                }

                const updatedUser = await user.save();

                res.status(200).json({
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    isAdmin: updatedUser.isAdmin,
                });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // @desc    Admin - Get all users
    // @route   GET /api/users
    async index(req, res) {
        try {
            const users = await User.find({});
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // @desc    Admin - Get user by ID
    // @route   GET /api/users/:id
    async show(req, res) {
        try {
            const user = await User.findById(req.params.id).select("-password");

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // @desc    Admin - Update user
    // @route   PUT /api/users/:id
    async update(req, res) {
        try {
            const user = await User.findById(req.params.id);

            if (user) {
                user.name = req.body.name || user.name;
                user.email = req.body.email || user.email;
                user.isAdmin = req.body.isAdmin ?? user.isAdmin;

                const updatedUser = await user.save();

                res.status(200).json({
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    isAdmin: updatedUser.isAdmin,
                });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // @desc    Admin - Delete user
    // @route   DELETE /api/users/:id
    async destroy(req, res) {
        try {
            const user = await User.findById(req.params.id);

            if (user) {
                await user.remove();
                res.status(200).json({ message: "User deleted successfully" });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // @desc    Custom - Search by email (e.g., for login form)
    // @route   POST /api/users/search
    async searchByEmail(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (user && (await user.matchPassword(password))) {
                res.json("success");
            } else if (user) {
                res.json("Password Incorrect");
            } else {
                res.json("User not found");
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

export default UserController;
