import express from 'express';
import ProductController from '../controller/ProductController.js';
import UploadMiddleware from '../middleware/UploadMiddleware.js';
import { protect } from '../middleware/AuthMiddleware.js';

// Optional auth middleware imports (if available)
// import { protect, admin } from '../middleware/authMiddleware.js';
// import checkObjectId from '../middleware/checkObjectId.js';

const productRouter = express.Router();
const pInstance = new ProductController();
const fInstance = new UploadMiddleware();
const upload = fInstance.upload('products');

// 📦 Public Routes
productRouter.get('/recommend', pInstance.recommended);
productRouter.get('/related', pInstance.showRelated);
productRouter.get('/:id', pInstance.show);
productRouter.get('/', pInstance.index);

// 🛒 Product Management (requires admin in real-world apps)
productRouter.post('/', upload.array('image'), pInstance.store);
productRouter.put('/:id',upload.array('image'), pInstance.update);
productRouter.delete('/:id', pInstance.destroy);

// 🛠️ Special operations
productRouter.put('/:id/decrease', pInstance.decreaseQuantity);

// ⭐ Reviews
productRouter.post('/:id/reviews', protect, pInstance.createReview);

export default productRouter;