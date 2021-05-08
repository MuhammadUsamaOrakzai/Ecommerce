const Category = require('../model/category')
const slugify = require('slugify');


exports.createCategory =  (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }
    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
    }
    const cat = new Category(categoryObj);
    cat.save((error, category) => {
        if(error) return res.status(400).send({ error});
        if(category){
            res.status(201).send({category});
        }
    });

}

exports.getCategory = (req,res) => {
    Category.find({})
    .exec((error, categories) => {
        if(error)return res.status(400).send({ error });
        if(categories){
            res.status(200).send({categories});
        }
    });
}