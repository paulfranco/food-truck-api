import mongoose from 'mongoose';
import { Router } from 'express';
import Restaurant from '../model/restaurant';

export default({ config, db}) => {
    let api = Router();

    // 'v1/restaurant/add'
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
    return api;
}