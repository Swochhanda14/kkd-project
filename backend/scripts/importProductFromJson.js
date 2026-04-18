/**
 * Import a product from a JSON file into MongoDB
 * Usage:
 *   node scripts/importProductFromJson.js [pathToJson]
 * Default JSON path: ../data/product.json (relative to scripts/)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../src/models/Product.js';
import Category from '../src/models/Category.js';

dotenv.config();

const resolveJsonPath = () => {
  const argPath = process.argv[2];
  const scriptPath = fileURLToPath(import.meta.url);
  const baseDir = path.dirname(scriptPath);
  const defaultPath = path.resolve(baseDir, '../data/product.json');
  const candidate = argPath ? path.resolve(process.cwd(), argPath) : defaultPath;
  return candidate;
};

const normalizeSize = (size) => {
  if (!size) return [];
  if (Array.isArray(size)) return size.filter(s => s && String(s).trim());
  if (typeof size === 'string') {
    return size.split(',').map(s => s.trim()).filter(Boolean);
  }
  return [];
};

const normalizeImages = (image) => {
  if (!image) return [];
  if (Array.isArray(image)) return image.filter(i => i && String(i).trim());
  if (typeof image === 'string') return [image].filter(Boolean);
  return [];
};

const ensureCategory = async ({ categoryName, categoryId }) => {
  if (categoryId && String(categoryId).trim() !== '') {
    return String(categoryId);
  }
  const name = (categoryName || 'General').trim();
  let cat = await Category.findOne({ cat_name: name });
  if (!cat) {
    cat = await Category.create({ cat_name: name });
    console.log(`Created category: ${name} -> ${cat._id.toString()}`);
  }
  return cat._id.toString();
};

const upsertProduct = async (data) => {
  const categoryId = await ensureCategory({
    categoryName: data.categoryName,
    categoryId: data.categoryId
  });

  const payload = {
    name: String(data.name || '').trim(),
    categoryId,
    new_price: Number(data.new_price),
    old_price: data.old_price != null ? Number(data.old_price) : undefined,
    quantity: Number(data.quantity),
    description: data.description || '',
    image: normalizeImages(data.image),
    size: normalizeSize(data.size),
    available: data.available !== undefined ? Boolean(data.available) : true
  };

  if (!payload.name) throw new Error('Missing required field: name');
  if (!payload.categoryId) throw new Error('Missing required field: categoryId');
  if (!Number.isFinite(payload.new_price)) throw new Error('Missing/invalid field: new_price');
  if (!Number.isFinite(payload.quantity)) throw new Error('Missing/invalid field: quantity');

  const existing = await Product.findOne({ name: payload.name, categoryId: payload.categoryId });
  if (existing) {
    existing.new_price = payload.new_price;
    if (payload.old_price != null) existing.old_price = payload.old_price;
    existing.quantity = payload.quantity;
    existing.description = payload.description;
    existing.image = payload.image;
    existing.size = payload.size;
    existing.available = payload.available;
    await existing.save();
    console.log(`Updated existing product: ${existing.name} (${existing._id.toString()})`);
    return existing;
  } else {
    const created = await Product.create(payload);
    console.log(`Created product: ${created.name} (${created._id.toString()})`);
    return created;
  }
};

const main = async () => {
  try {
    const jsonPath = resolveJsonPath();
    console.log(`Reading JSON from: ${jsonPath}`);
    const raw = fs.readFileSync(jsonPath, 'utf-8');
    let data = JSON.parse(raw);

    await mongoose.connect(process.env.DB_URL);
    console.log('Connected to database');

    if (Array.isArray(data)) {
      for (const item of data) {
        await upsertProduct(item);
      }
    } else {
      await upsertProduct(data);
    }

    const count = await Product.countDocuments({});
    console.log(`Total products in DB: ${count}`);
    await mongoose.disconnect();
    console.log('Done.');
    process.exit(0);
  } catch (err) {
    console.error('Import failed:', err.message);
    try { await mongoose.disconnect(); } catch {}
    process.exit(1);
  }
};

// Execute
main();
