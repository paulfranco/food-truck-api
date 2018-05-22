import mongoose from 'mongoose';
import { Router } from 'express';
import Restaurant from '../model/restaurant';

export default({ config, db}) => {
    let api = Router();
    // CRUD - Create, Read, Update, Delete
    // 'v1/restaurant/add' - Create
    api.post('/add', (req, res) => {
        let newRest = new Restaurant();
        newRest.name = req.body.name;

        newRest.save(err => {
            if (err) {
                res.setEncoding(err);
            } else {
                res.json({message: 'Restaurant saved successfully'});
            }
        });
    });
    // 'v1/restaurant' - Read
    api.get('/', (req, res) => {
        Restaurant.find({}, (err, restaurants) => { // Mongo find everything when empty
            if (err) {
                res.send(err);
            } else {
                res.json(restaurants);
            }
        }); 
    });
    // 'v1/restaurant/:id' - Read 1
    api.get('/:id', (req, res) => {
        Restaurant.findById(req.params.id, (err, restaurant) => {
            if (err) {
                res.send(err);
            } else {
                res.json(restaurant);
            }
        });
    });

    // 'v1/restaurant/:1' - Update
    api.put('/:id', (req,res) => {
        Restaurant.findById(req.params.id, (err, restaurant) => {
            if (err) {
                res.send(err);
            } else {
                restaurant.name = req.body.name;
                restaurant.save(err => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json({message: "Restaurant updated"});
                    }
                });
            }
        });
    });
    return api;
}