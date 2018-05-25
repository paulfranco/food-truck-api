import mongoose from 'mongoose';
import { Router } from 'express';
import FoodTruck from '../model/foodtruck';
import Review from '../model/review';

import { authenticate } from '../middleware/authMiddleware';


export default({ config, db}) => {
    let api = Router();
    // CRUD - Create, Read, Update, Delete
    // 'v1/foodtruck/add' - Create
    api.post('/add', authenticate, (req, res) => {
        let newFoodTruck = new FoodTruck();
        newFoodTruck.name = req.body.name;
        newFoodTruck.foodtype = req.body.foodtype;
        newFoodTruck.avgcost = req.body.avgcost;
        newFoodTruck.geometry.coordinates = req.body.geometry.coordinates;

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
    api.put('/:id', authenticate, (req,res) => {
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
    api.delete('/:id', authenticate, (req, res) => {
        FoodTruck.findById(req.params.id, (err, foodtruck) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            if (foodtruck === null ) {
                res.status(404).send("FoodTruck not found");
                return;
            }
            FoodTruck.remove({
                _id: req.params.id
            }, (err, foodtruck) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    Review.remove({
                        footruck: req.params.id
                    }, (err, review) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.json({message: "FoodTruck and reviews Successfuly Removed"});
                        }
                    });   
                }
            });
        });
    });

    // Add Review for a specific foodtruck id
    // '/v1/foodtruck/reviews/add/:id'
    api.post('/reviews/add/:id', authenticate, (req, res) => {
        FoodTruck.findById(req.params.id, (err, foodtruck) => {
            if (err) {
                res.send(err);
            } else {
                let newReview = new Review();
                newReview.title = req.body.title;
                newReview.text = req.body.text;
                newReview.foodtruck = foodtruck._id;
                
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

    // Retrieve all reviews for a specific foodtruck
    // '/v1/foodtruck/reviews/:id
    api.get('/reviews/:id', (req, res) => {
        Review.find({foodtruck: req.params.id}, (err, reviews) => {
            if (err) {
                res.send(err);
            } else {
                res.json(reviews);
            }
        });
    });

    return api;
}