import Product from "../models/product";
import formidable from "formidable";
import {uploadImage} from "../helpers/cloudinary.functions";

export const getProducts = async (req, res) => {
    try{
        Product
            .find()
            .then((data) => res.json(data))
            .catch((err) => res.json({message: err}));
    } catch (error) {
        res.render('error', {messasge: error.message})
    }
}

export const getProductId = async (req, res) => {
    try {
        const { id } = req.params;
        Product
            .findById(id)
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error }));
    } catch (error) {
        console.log({ error });
        return res.render("error", { errorMessage: error.message });
    }
}

export const saveProduct = async (req, res) => {
    try{
        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files) => {
            if(files.photo){
                const newPhoto = await uploadImage(files.photo.filepath);
                fields.imageUrl = newPhoto.url;
                fields.imageId = newPhoto.public_id;
                const product = Product(fields);
                console.log(product)
                product.save().then((data) => {
                    console.log(data)
                    res.json(data)
                })
                .catch((err) => res.json({message: err}));
            }else{
                res.send({message: "No image was uploaded"});
            }
        });
    } catch (error) {
        res.render('error', {messasge: error.message})
    }
}

export const deleteProduct = async (req, res) => {
    try{
        const { id } = req.params;
        Product
            .remove({_id: id})
            .then((data) => res.json(data))
            .catch((err) => res.json({message: err}));
    } catch (error) {
        res.render('error', {messasge: error.message})
    }
}

export const updateProduct = async (req, res) => {
    try{
        const { id } = req.params;
        const { title, price, description } = req.body;
        Product
            .updateOne({_id: id}, { $set: {title, price, description}})
            .then((data) => res.json(data))
            .catch((err) => res.json({message: err}));
    } catch (error) {
        res.render('error', {messasge: error.message})
    }
}