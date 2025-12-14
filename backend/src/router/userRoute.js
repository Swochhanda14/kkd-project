import express from 'express';
import UserController from '../controller/UserController.js';
import { protect, admin } from '../middleware/AuthMiddleware.js';

const router = express.Router();
const uInstance = new UserController();

// Route for user registration (public)
router.route('/').post(uInstance.store).get(uInstance.index);

// Login and logout
router.post('/login', uInstance.authUser);
router.post('/logout', uInstance.logoutUser);

// Profile routes (for logged-in users)
router
  .route('/profile')
  .get(protect, uInstance.getUserProfile)
  .put(protect, uInstance.updateUserProfile);

// Search by email (custom endpoint)
router.post('/search', uInstance.searchByEmail);

// Admin-only routes for managing users by ID
router
  .route('/:id')
  .delete(protect, admin, uInstance.destroy)
  .get(protect, admin, uInstance.show)
  .put(protect, admin, uInstance.update);

export default router;
