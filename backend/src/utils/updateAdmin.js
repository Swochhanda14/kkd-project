/**
 * Utility script to update admin email and password
 * Usage: node -e "import('./src/utils/updateAdmin.js').then(m => m.updateAdmin('newemail@example.com', 'newpassword', 'oldemail@example.com', 'oldpassword'))"
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();

export const updateAdmin = async (newEmail, newPassword, oldEmail = null, oldPassword = null) => {
    try {
        // Connect to database
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to database');

        let admin;
        
        // Find admin by old email if provided, otherwise get first admin
        if (oldEmail) {
            admin = await Admin.findOne({ email: oldEmail.toLowerCase().trim() });
            if (!admin) {
                console.error('Admin not found with email:', oldEmail);
                process.exit(1);
            }
            
            // Verify old password if provided
            if (oldPassword) {
                const isMatch = await admin.matchPassword(oldPassword);
                if (!isMatch) {
                    console.error('Old password is incorrect');
                    process.exit(1);
                }
            }
        } else {
            // Get first admin if no email provided
            admin = await Admin.findOne({});
            if (!admin) {
                console.error('No admin found in database');
                process.exit(1);
            }
        }

        // Update email if provided
        if (newEmail) {
            // Check if new email already exists
            const emailExists = await Admin.findOne({ 
                email: newEmail.toLowerCase().trim(),
                _id: { $ne: admin._id }
            });
            if (emailExists) {
                console.error('Email already in use:', newEmail);
                process.exit(1);
            }
            admin.email = newEmail.toLowerCase().trim();
            console.log('Email updated to:', newEmail);
        }

        // Update password if provided
        if (newPassword) {
            admin.password = newPassword; // Will be hashed by pre-save hook
            console.log('Password updated');
        }

        await admin.save();
        console.log('Admin updated successfully!');
        console.log('New email:', admin.email);
        
        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('Error updating admin:', error.message);
        process.exit(1);
    }
};

// If run directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.log('Usage: node updateAdmin.js <newEmail> <newPassword> [oldEmail] [oldPassword]');
        process.exit(1);
    }
    updateAdmin(args[0], args[1], args[2], args[3]);
}

