const Product = require('../models/product');
const slugify = require('slugify');

exports.create = async (req, res) => {
    // console.log(req.body);
    const { name, description, image, price, stock } = req.body;
    const slug = slugify(name);
    // validate
    switch (true) {
        case !name:
            return res.status(400).json({ error: 'Name is required' });
            
        case !description:
            return res.status(400).json({ error: 'Description is required' });

        case !price:
            return res.status(400).json({ error: 'Price is required' });           
    }
    // create product
    const product =  await Product.create({ name, description, price, slug })
    return res.status(200).json(product);
};

exports.list = async (req, res) => {
    const products = await Product.find({})
        .limit(10)
        .sort({ createdAt: 'asc' })
        .exec();

    if(products)
        return res.status(200).json(products);
        return res.status(400).json({ error: 'api error' }); 
};

exports.read = async (req, res) => {
    console.log(req.params.slug)
    const { slug } = req.params;
    const product = await Product.findOne({ slug }).exec();

    if(!product)
        return res.status(400).json({ error: 'api error' })
        return res.status(200).json(product);
};

exports.update = async (req, res) => {
    const { slug } = req.params;
    const { name, description, price, stock } = req.body;
     newSlug = slugify(name);
     try {
        const updated = await Product.findOneAndUpdate({ slug }, { name, description, price, stock, slug: newSlug }, { new: true })
        return res.status(200).json(post)
     } catch (error) {
        return res.status(400).json({ error: 'update error' })
     }
};

exports.remove = async (req, res) => {
    const { slug } = req.params;
    const deleted = await Product.findOneAndDelete({ slug }).exec()

        if(!post)
            return res.status(400).json({ error: 'delete error' })
        return res.status(200).json(deleted);
};