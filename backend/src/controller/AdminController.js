import Admin from "../models/Admin.js";

class AdminController {
    async index(req, res) {
        try {
            const adminData = await Admin.find({});
            res.status(200).json(adminData);
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }

    async store(req, res) {
        try {
            const { email, password } = req.body;
            
            // Check if admin already exists
            const adminExists = await Admin.findOne({ email: email.toLowerCase().trim() });
            if (adminExists) {
                return res.status(400).json({ message: "Admin with this email already exists" });
            }
            
            const admin = await Admin.create({ 
                email: email.toLowerCase().trim(), 
                password // Will be hashed by pre-save hook
            });
            
            res.status(201).json({ 
                message: "Admin Added Successfully",
                admin: {
                    _id: admin._id,
                    email: admin.email
                }
            });
        } catch (err) {
            if (err.code === 11000) {
                return res.status(400).json({ message: "Email already exists" });
            }
            res.status(500).json({ message: err.message });
        }
    }

    async searchByEmail(req, res) {
        try {
            const { email, password } = req.body;
            const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

            if (admin) {
                if (await admin.matchPassword(password)) {
                    res.json("success");
                } else {
                    res.json("Password Incorrect");
                }
            } else {
                res.json("Admin not found");
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // Update admin email and/or password
    async update(req, res) {
        try {
            const { id } = req.params;
            const { email, password, currentPassword } = req.body;

            const admin = await Admin.findById(id);
            if (!admin) {
                return res.status(404).json({ message: "Admin not found" });
            }

            // If updating password, verify current password first
            if (password) {
                if (!currentPassword) {
                    return res.status(400).json({ message: "Current password is required to change password" });
                }
                const isMatch = await admin.matchPassword(currentPassword);
                if (!isMatch) {
                    return res.status(401).json({ message: "Current password is incorrect" });
                }
            }

            // Update email if provided
            if (email) {
                // Check if email already exists (excluding current admin)
                const emailExists = await Admin.findOne({ 
                    email: email.toLowerCase().trim(),
                    _id: { $ne: id }
                });
                if (emailExists) {
                    return res.status(400).json({ message: "Email already in use" });
                }
                admin.email = email.toLowerCase().trim();
            }

            // Update password if provided
            if (password) {
                admin.password = password; // Will be hashed by pre-save hook
            }

            await admin.save();
            res.status(200).json({ 
                message: "Admin updated successfully",
                admin: {
                    _id: admin._id,
                    email: admin.email
                }
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // Update admin by email (alternative method)
    async updateByEmail(req, res) {
        try {
            const { email: currentEmail, newEmail, password, currentPassword } = req.body;

            const admin = await Admin.findOne({ email: currentEmail.toLowerCase().trim() });
            if (!admin) {
                return res.status(404).json({ message: "Admin not found" });
            }

            // If updating password, verify current password first
            if (password) {
                if (!currentPassword) {
                    return res.status(400).json({ message: "Current password is required to change password" });
                }
                const isMatch = await admin.matchPassword(currentPassword);
                if (!isMatch) {
                    return res.status(401).json({ message: "Current password is incorrect" });
                }
            }

            // Update email if provided
            if (newEmail) {
                // Check if email already exists
                const emailExists = await Admin.findOne({ 
                    email: newEmail.toLowerCase().trim(),
                    _id: { $ne: admin._id }
                });
                if (emailExists) {
                    return res.status(400).json({ message: "Email already in use" });
                }
                admin.email = newEmail.toLowerCase().trim();
            }

            // Update password if provided
            if (password) {
                admin.password = password; // Will be hashed by pre-save hook
            }

            await admin.save();
            res.status(200).json({ 
                message: "Admin updated successfully",
                admin: {
                    _id: admin._id,
                    email: admin.email
                }
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async logout(req, res) {
        try {
            // If using sessions, destroy the session here
            if (req.session) {
                req.session.destroy(() => {
                    res.status(200).json({ message: "Logged out successfully" });
                });
            } else {
                // If using JWT or stateless, just respond OK
                res.status(200).json({ message: "Logged out successfully" });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

export default AdminController;