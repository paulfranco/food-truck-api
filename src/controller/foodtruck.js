import mongoose from 'mongoose';
import { Router } from 'express';
import FoodTruck from '../model/foodtruck';

export default({ config, db}) => {
    let api = Router();
    // CRUD - Create, Read, Update, Delete
    // 'v1/foodtruck/add' - Create
    api.post('/add', (req, res) => {
        let newFoodTruck = new FoodTruck();
        newFoodTruck.name = req.body.name;

        newFoodTruck.save(err => {
            if (err) {
                res.setEncoding(err);
            } else {
                res.json({message: 'FoodTruck saved successfully'});
            }
        });
    });
    // 'v1/foodtruck' - Read
    api.get('/', (req, res) => {
        FoodTruck.find({}, (err, foodtrucks) => { // Mongo find everything when empty
            if (err) {
                res.send(err);
            } else {
                res.json(foodtrucks);
            }
        }); 
    });
    // 'v1/foodtruck/:id' - Read 1
    api.get('/:id', (req, res) => {
        FoodTruck.findById(req.params.id, (err, foodtruck) => {
            if (err) {
                res.send(err);
            } else {
                res.json(foodtruck);
            }
        });
    });

    // 'v1/foodtruck/:id' - Update
    api.put('/:id', (req,res) => {
        FoodTruck.findById(req.params.id, (err, foodtruck) => {
            if (err) {
                res.send(err);
            } else {
                foodtruck.name = req.body.name;
                foodtruck.save(err => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json({message: "FoodTruck updated"});
                    }
                });
            }
        });
    });

    // 'v1/foodtruck/id' - Delete
    api.delete('/:id', (req, res) => {
        FoodTruck.remove({_id: req.params.id}, (err, foodtruck) => {
            if (err) {
                res.send(err);
            } else {
                res.json({message: "FoodTruck Successfuly Removed"});
            }
        });
    });

    // Add Review for a specific foodtruck id
    // '/v1/foodtruck/reviews/add/:id'
    api.post('/reviews/add/:id', (req, res) => {
        FoodTruck.findById(req.params.id, (err, foodtruck) => {
            if (err) {
                res.send(err);
            } else {
                let newReview = new newReview();
                newReview.title = req.body.title;
                newReview.text = req.body.text;
                newReview.foodtrurck = foodtruck._id;
                
                newReview.save((err, review) => {
                    if (err) {
                        res.send(err);
                    } else {
                        foodtruck.reviews.push[newReview];
                        foodtruck.save(err => {
                            if (err) {
                                res.send(err);
                            } else {
                                res.json({message: "Food Truck Review saved"});
                            }
                        });
                    }
                });
            }
        });
    });

    return api;
}