import Order from "../models/Orders.js";
import crypto from "crypto";

class OrderController {
    async index(req, res) {
        try {
            const orderData = await Order.find({});
            res.status(200).json(orderData);
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }

    async store(req, res) {
        try {
            await Order.create({ ...req.body });
            res.status(200).json({ success: true });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // Update Order by ID
    async update(req, res) {
        const { id } = req.params;
        try {
            const updatedOrder = await Order.findByIdAndUpdate(
                id,
                { ...req.body },
                { new: true }
            );
            if (!updatedOrder) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.status(200).json(updatedOrder);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }


    // Delete Order by ID
    async delete(req, res) {
        const { id } = req.params;
        try {
            const deletedOrder = await Order.findByIdAndDelete(id);
            if (!deletedOrder) {
                return res.status(404).json({ message: "Order not found" });
            }
            res.status(200).json({ success: true, message: "Order deleted successfully" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // eSewa payment success callback
    async paymentSuccess(req, res) {
        try {
            const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
            const { total_amount, transaction_uuid, product_code, signed_field_names, signature, status } = req.body || {};

            // Validate signature if secret is configured
            const secret = process.env.ESEWA_SECRET;
            let isValid = true;
            if (secret) {
                const fields = (signed_field_names || 'total_amount,transaction_uuid,product_code')
                    .split(',')
                    .map(f => f.trim());
                const message = fields
                    .map((field) => `${field}=${req.body?.[field]}`)
                    .join(',');
                const computed = crypto
                    .createHmac('sha256', secret)
                    .update(message)
                    .digest('base64');
                isValid = computed === signature;
            }

            if (!isValid || status === 'FAILED') {
                return res.redirect(`${frontendURL}/failure`);
            }

            return res.redirect(`${frontendURL}/success`);
        } catch (err) {
            return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/failure`);
        }
    }

    // eSewa payment failure callback
    async paymentFailure(req, res) {
        try {
            const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
            return res.redirect(`${frontendURL}/failure`);
        } catch (err) {
            return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/failure`);
        }
    }
}

export default OrderController;
