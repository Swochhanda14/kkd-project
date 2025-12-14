/**
 * Script to update admin credentials
 * Run: node updateAdminCredentials.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './src/models/Admin.js';

dotenv.config();

const updateAdminCredentials = async () => {
    try {
        // Connect to database
        await mongoose.connect(process.env.DB_URL);
        console.log('✅ Connected to database');

        // Get admin (first one or by email)
        const admin = await Admin.findOne({});
        
        if (!admin) {
            console.error('❌ No admin found. Creating new admin...');
            
            // Create new admin with default credentials
            const newAdmin = await Admin.create({
                email: 'admin@karigarkodukaan.com',
                password: 'admin123'
            });
            console.log('✅ New admin created!');
            console.log('📧 Email: admin@karigarkodukaan.com');
            console.log('🔑 Password: admin123');
            console.log('⚠️  Please change these credentials after first login!');
        } else {
            console.log('📧 Current admin email:', admin.email);
            console.log('\nTo update admin credentials, use one of these methods:');
            console.log('\n1. Use the API endpoint: PUT /admin/update/email');
            console.log('   Body: { email: "current@email.com", newEmail: "new@email.com", password: "newpassword", currentPassword: "oldpassword" }');
            console.log('\n2. Update directly in MongoDB');
            console.log('\n3. Use the updateAdmin utility function');
        }

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

updateAdminCredentials();

