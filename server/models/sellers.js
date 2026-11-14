const mongoose = require('mongoose');
const { Schema } = mongoose;

const sellersSchema = new Schema({
    userID: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'seller' },
    address: { type: String, default: null },
    phoneNumber: { type: String, default: null },
    whatsappNumber: { type: String, default: null },
    cnic: { type: String, required: true },
    cnicFront: { type: String, required: true },
    cnicBack: { type: String, required: true },
    plan: { type: String, default: null },

    // Brand Details
    brandName: { type: String, required: true, unique: true },
    brandSlug: { type: String, required: true, unique: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'banned'], default: 'pending' },

    // Analytic Details
    analytics: {
        storeViews: { type: Number, default: 0 },
    }
}, { timestamps: true });

const sellersModel = mongoose.models.sellers || mongoose.model('sellers', sellersSchema);
module.exports = sellersModel;