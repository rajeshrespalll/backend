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

        case !image:
            return res.status(400).json({ error: 'Image is required' });

        case !price:
            return res.status(400).json({ error: 'Price is required' });

        case !stock:
            return res.status(400).json({ error: 'Stock is required' });            
    }
    // create product
    const product =  await Product.create({ name, description, image, price, stock, slug })
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