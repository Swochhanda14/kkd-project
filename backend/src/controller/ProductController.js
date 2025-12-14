import Product from "../models/Product.js";
import natural from 'natural';

const tokenizer = new natural.WordTokenizer();
const stopwords = new Set(natural.stopwords);
const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');

function analyzeSentiment(comment) {
    const tokens = tokenizer.tokenize(comment.toLowerCase());
    const filtered = tokens.filter(word => !stopwords.has(word));
    return analyzer.getSentiment(filtered);
}

class ProductController {
    async index(req, res) {
        try {
            const { search } = req.query;
            let query = {};
            if (search && search.trim() !== "") {
                // Case-insensitive partial match on name
                query = {
                    name: { $regex: search, $options: 'i' }
                };
            }
            const productData = await Product.find(query);
            res.status(200).json(productData);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async store(req, res) {
        try {
            let products = req.body;

            if (!Array.isArray(products)) {
                products = [products];
            }

            const createdProducts = [];
            for (let productData of products) {
                let images = [];
                if (req.files && req.files.length > 0) {
                    images = req.files.map(file => file.filename);
                }
                // fallback for single file (if any)
                else if (req.file) {
                    images = [req.file.filename];
                }
                // Ensure size is always an array if provided
                let size = [];
                if (productData.size) {
                    if (Array.isArray(productData.size)) {
                        size = productData.size;
                    } else if (typeof productData.size === 'string') {
                        // If comma separated string, split
                        size = productData.size.split(',').map(s => s.trim());
                    }
                }
                const newProduct = await Product.create({ ...productData, image: images, size });
                createdProducts.push(newProduct);
            }

            res.status(200).json({ success: true });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }


    async show(req, res) {
        try {
            let id = req.params.id;
            const productData = await Product.findById(id);
            res.status(200).json(productData);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async showRelated(req, res) {
        try {
            const { categoryId, excludeId } = req.query;
            let match = {};
            if (categoryId) {
                match = { categoryId };
                if (excludeId) {
                    match._id = { $ne: excludeId };
                }
            }
            const relatedProducts = await Product.aggregate([
                { $match: match },
                { $sample: { size: 4 } }
            ]);
            // Convert each product to a Product model instance to use toJSON
            const formattedProducts = relatedProducts.map(prod => {
                const productInstance = new Product(prod);
                return productInstance.toJSON();
            });
            res.status(200).json(formattedProducts);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async update(req, res) {
        try {
            let id = req.params.id;
            let product = await Product.findById(id);
            let images = product.image;
            // Ensure size is always an array if provided
            let size = product.size || [];
            if (req.body.size) {
                if (Array.isArray(req.body.size)) {
                    size = req.body.size;
                } else if (typeof req.body.size === 'string') {
                    size = req.body.size.split(',').map(s => s.trim());
                }
            }
            if (req.files && req.files.length > 0) {
                images = req.files.map(file => file.filename);
            } else if (req.file) {
                images = [req.file.filename];
            }
            await Product.findByIdAndUpdate(id, { ...req.body, image: images, size });
            res.status(200).json({ success: true });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async destroy(req, res) {
        try {
            let id = req.params.id;
            await Product.findByIdAndDelete(id);
            res.status(200).json({ message: "Product Deleted Succesfully" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async decreaseQuantity(req, res) {
        try {
            let id = req.params.id;
            let { quantity } = req.body;

            if (!quantity || quantity <= 0) {
                return res.status(400).json({ message: "Invalid quantity value." });
            }

            let product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: "Product not found." });
            }

            if (product.quantity < quantity) {
                return res.status(400).json({ message: "Not enough stock available." });
            }

            product.quantity -= quantity;
            await product.save();

            res.status(200).json({ success: true, message: "Quantity decreased successfully.", product });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async createReview(req, res) {
        try {
            const { rating, comment } = req.body;
            const product = await Product.findById(req.params.id);

            if (!product) return res.status(404).json({ message: "Product not found" });

            const alreadyReviewed = product.reviews.find(
                r => r.user.toString() === req.user._id.toString()
            );

            if (alreadyReviewed) return res.status(400).json({ message: "Product already reviewed" });

            const sentimentScore = analyzeSentiment(comment);

            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                sentimentScore,
                user: req.user._id,
            };

            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating =
                product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

            await product.save();
            res.status(201).json({ message: "Review added" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async recommended(req, res) {
        try {
            const products = await Product.find({});
            if (products.length === 0) return res.json([]);

            // Prepare TF-IDF
            const TfIdf = natural.TfIdf;
            const tfidf = new TfIdf();
            const docs = products.map(p => (p.name || "") + " " + (p.description || ""));
            docs.forEach(doc => tfidf.addDocument(doc));

            // Only include products with at least 1 review
            const productSentiments = products.map((product, i) => {
                const sentimentSum = product.reviews.reduce(
                    (sum, review) => sum + (review.sentimentScore || analyzeSentiment(review.comment)),
                    0
                );
                const avgSentiment = product.reviews.length > 0 ? sentimentSum / product.reviews.length : 0;

                // TF-IDF: sum all tf-idf values for this doc (as a proxy for content richness)
                let tfidfScore = 0;
                const terms = docs[i].split(/\s+/);
                terms.forEach(term => {
                    tfidfScore += tfidf.tfidf(term, i);
                });

                // Use rating and sentiment for sorting
                const avgRating = product.reviews.length > 0
                    ? product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length
                    : 0;
                // You can adjust the weights as needed
                // Prioritize avgRating, then avgSentiment, then tfidfScore
                const combinedScore = avgRating * 10000 + avgSentiment * 100 + tfidfScore;
                console.log("TF-IDF Score: ", tfidfScore);
                return { ...product.toJSON(), avgRating, avgSentiment, tfidfScore, combinedScore };
            }).filter(p => p.numReviews > 0);

            // Sort by combinedScore (rating prioritized, then sentiment, then tf-idf)
            productSentiments.sort((a, b) => b.combinedScore - a.combinedScore);
            const recommended = productSentiments.slice(0, 4);
            res.json(recommended);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}


export default ProductController;