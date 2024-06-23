const Product = require('../models/product')

const getAllProductsStatic = async (req,res) => {
    // const products = await Product.find({})
    // const products = await Product.find({featured: true})
    // const products = await Product.find({rating: 5})

    
    const search = 'ab'
    const products = await Product.find({
        name: { $regex: search, $options: 'i'}
    })

    res.status(200).json({products, noOfHits: products.length})
}

const getAllProducts = async (req,res) => {
    console.log(req.query);

    // extracting the value from req.query
    const {featured, company, name} = req.query
    // creating an empty object
    const queryObject = {}

    // if featured exists, then define the ' object's featured ' property with featured
    if(featured) {
        queryObject.featured = featured === 'true' ? true : false
    }

    if(company) {
        queryObject.company = company
    }

    if(name) {
        queryObject.name = { $regex: name, $options: 'i'}
    }

    console.log(queryObject);

    const products = await Product.find(queryObject)
    res.status(200).json({products, noOfHits: products.length})
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}