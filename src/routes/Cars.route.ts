import { Router } from 'express';
import CarsController from '../controllers/Cars.controller';
import Car from '../models/Cars.model';
import CarsServices from '../services/Cars.services';

const route = Router();

const car = new Car();
const carService = new CarsServices(car);
const carController = new CarsController(carService);

route.post('/cars', (req, res) => carController.create(req, res));

export default route;