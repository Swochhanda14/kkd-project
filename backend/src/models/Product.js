import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const reviewSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    sentimentScore: {
        type: Number,
        default: 0
    },
    comment:{
        type: String,
        required: true
    },
},{
    timestamps: true,
})

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categoryId: {
        type: String,
        required: true
    },
    image: [{
        type: String,
        // required: true
    }],
    new_price: {
        type: Number,
        required: true

    },
    old_price: {
        type: Number
    },
    quantity: {
        type: Number,
        required: true
    },
    description:{
        type:String,
        // required: true   
    },
    reviews:[reviewSchema],
    rating:{
        type: Number,
        required: true,
        default:0
    },
    numReviews:{
        type: Number,
        required: true,
        default:0
    },
    date: {
        type: Date,
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true
    },
    size: [{
        type: String
    }]
}, {
    versionKey: false

});

productSchema.methods.toJSON = function () {
    var obj = this.toObject();
    // Always return image as an array
    if (Array.isArray(obj.image)) {
        if (obj.image.length > 0) {
            obj.image = obj.image.map(img => process.env.PUBLIC_URL + "/products/" + img);
        } else {
            obj.image = [process.env.PUBLIC_URL + "/icons/notFound.png"];
        }
    } else if (typeof obj.image === 'string' && obj.image) {
        obj.image = [process.env.PUBLIC_URL + "/products/" + obj.image];
    } else {
        obj.image = [process.env.PUBLIC_URL + "/icons/notFound.png"];
    }
    return obj;
}

export default mongoose.model('Product', productSchema);