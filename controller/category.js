const Category = require('../model/category');
const slugify = require('slugify');
const categoryValidation = require('../validation/categoryvalidation');


exports.createCategory = (req, res) => {

    const { error } =  categoryValidation.validate(req.body);
          if (error) return res.status(400).send(error.details[0].message);

          const categoryExist = Category.findOne({name: req.body.name});
          if(categoryExist) return res.status(400).send('Category already exists');


    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
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