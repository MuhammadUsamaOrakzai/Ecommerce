const Product = require('../model/productSchema')
const slugify = require('slugify');
const { Mongoose } = require('mongoose');
const Category = require('../model/category');

// this controller is for creating a  product
exports.createProduct =  (req, res) => {
    Category.findById(req.body.category)
    .then(category => {
        if(!category) {
            return res.status(404).send('category not found')
        };
        const productObj = {
            name: req.body.name,
            quantity: req.body.quantity,
            price:req.body.price,
            category: req.body.category,
            slug: slugify(req.body.name)
        }
        const pro = new Product(productObj);
        pro.save((error, Product) => {
            if(error) return res.status(400).send({ error});
            if(Product){
                res.status(201).send({Product});
            }
        });
       
    })
    .catch(err => {
        res.status(500).send('Category not found');
    });
}

// this controller is fetching all the products stored in database
exports.getProduct = (req,res) => {
    Product.find({}).
    populate('category', 'name')
    .exec((error, products) => {
        if(error)return res.status(400).send({ error });
        if(products){
            res.status(200).send({products});
        }
    });
}

// this controller is updating the product using its unique id passed in the params
exports.updateProduct = (req, res) =>  {
    Product.updateOne({_id:req.params.id}, {$set: {
        quantity: req.body.quantity,
        price: req.body.price
    }}).exec((error, Product) => {
        if(error)return res.status(400).send({ error });
        if(Product){
            res.status(200).send({Product});
        }
    });
}

// this controller is deleting the product using its unique id passed in the params
exports.deleteProduct = (req, res) => {
    Product.deleteOne({_id:req.params.id}, {$set: {
        quantity: req.body.quantity,
        price: req.body.price
    }}).exec((error, Product) => {
        if(error)return res.status(400).send({ error });
        if(Product){
            res.status(200).send({Product});
        }
    });
}


    