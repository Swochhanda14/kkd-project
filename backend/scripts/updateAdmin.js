/**
 * Simple script to update admin email and password
 * Usage: node scripts/updateAdmin.js <newEmail> <newPassword> [oldEmail] [oldPassword]
 * 
 * Example:
 * node scripts/updateAdmin.js admin@newemail.com newpassword123
 * node scripts/updateAdmin.js admin@newemail.com newpassword123 old@email.com oldpassword
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../src/models/Admin.js';

dotenv.config();

const updateAdmin = async () => {
    try {
        const args = process.argv.slice(2);
        
        if (args.length < 2) {
            console.log('\n📝 Usage:');
            console.log('   node scripts/updateAdmin.js <newEmail> <newPassword> [oldEmail] [oldPassword]');
            console.log('\n📋 Examples:');
            console.log('   node scripts/updateAdmin.js admin@example.com newpassword123');
            console.log('   node scripts/updateAdmin.js admin@example.com newpassword123 old@email.com oldpassword');
            process.exit(1);
        }

        const [newEmail, newPassword, oldEmail, oldPassword] = args;

        // Connect to database
        console.log('🔌 Connecting to database...');
        await mongoose.connect(process.env.DB_URL);
        console.log('✅ Connected to database\n');

        let admin;
        
        // Find admin
        if (oldEmail) {
            admin = await Admin.findOne({ email: oldEmail.toLowerCase().trim() });
            if (!admin) {
                console.error('❌ Admin not found with email:', oldEmail);
                process.exit(1);
            }
            
            // Verify old password if provided
            if (oldPassword) {
                const isMatch = await admin.matchPassword(oldPassword);
                if (!isMatch) {
                    console.error('❌ Old password is incorrect');
                    process.exit(1);
                }
                console.log('✅ Old password verified');
            }
        } else {
            // Get first admin if no email provided
            admin = await Admin.findOne({});
            if (!admin) {
                console.error('❌ No admin found in database');
                console.log('💡 Creating new admin...');
                admin = await Admin.create({
                    email: newEmail.toLowerCase().trim(),
                    password: newPassword
                });
                console.log('✅ New admin created!');
                console.log(`📧 Email: ${admin.email}`);
                await mongoose.disconnect();
                process.exit(0);
            }
        }

        console.log(`📧 Current admin email: ${admin.email}`);

        // Check if new email already exists
        if (newEmail !== admin.email) {
            const emailExists = await Admin.findOne({ 
                email: newEmail.toLowerCase().trim(),
                _id: { $ne: admin._id }
            });
            if (emailExists) {
                console.error('❌ Email already in use:', newEmail);
                process.exit(1);
            }
        }

        // Update email
        admin.email = newEmail.toLowerCase().trim();
        console.log(`📧 New email: ${admin.email}`);

        // Update password
        admin.password = newPassword; // Will be hashed by pre-save hook
        console.log('🔑 Password updated');

        await admin.save();
        console.log('\n✅ Admin credentials updated successfully!');
        console.log(`📧 Email: ${admin.email}`);
        
        await mongoose.disconnect();
        console.log('👋 Disconnected from database');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

updateAdmin();

