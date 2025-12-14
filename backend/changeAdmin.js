/**
 * Quick script to change admin email and password
 * Run: node changeAdmin.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './src/models/Admin.js';

dotenv.config();

// ============================================
// CONFIGURE YOUR NEW ADMIN CREDENTIALS HERE
// ============================================
const NEW_EMAIL = 'admin@karigarkodukaan.com';
const NEW_PASSWORD = 'admin123';
// ============================================

const changeAdmin = async () => {
    try {
        console.log('🔌 Connecting to database...');
        await mongoose.connect(process.env.DB_URL);
        console.log(' Connected to database\n');

        // Find existing admin
        let admin = await Admin.findOne({});
        
        if (admin) {
            console.log(`📧 Current admin email: ${admin.email}`);
            console.log('🔄 Updating admin credentials...\n');
            
            // Update credentials
            admin.email = NEW_EMAIL.toLowerCase().trim();
            admin.password = NEW_PASSWORD; // Will be hashed by pre-save hook
            
            await admin.save();
            console.log('✅ Admin credentials updated successfully!');
        } else {
            console.log('📝 No admin found. Creating new admin...\n');
            admin = await Admin.create({
                email: NEW_EMAIL.toLowerCase().trim(),
                password: NEW_PASSWORD
            });
            console.log('✅ New admin created!');
        }
        
        console.log('\n📋 New Admin Credentials:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`📧 Email:    ${admin.email}`);
        console.log(`🔑 Password: ${NEW_PASSWORD}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        console.log('⚠️  Please save these credentials securely!');
        
        await mongoose.disconnect();
        console.log('\n👋 Disconnected from database');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        if (error.code === 11000) {
            console.error('💡 Email already exists. Please use a different email.');
        }
        process.exit(1);
    }
};

changeAdmin();

