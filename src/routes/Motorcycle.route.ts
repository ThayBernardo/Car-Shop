import { Router } from 'express';
import Motorcycle from '../models/Motorcycles.model';
import MotorcyclesServices from '../services/Motorcycles.service';
import MotorcyclesController from '../controllers/Motorcycles.controller';

const route = Router();

const motorcycle = new Motorcycle();
const motorcycleService = new MotorcyclesServices(motorcycle);
const motorcycleController = new MotorcyclesController(motorcycleService);

route.post('/motorcycles', (req, res) => motorcycleController.create(req, res));
route.get('/motorcycles', (req, res) => motorcycleController.read(req, res));
route.get('/motorcycles/:id', (req, res) => motorcycleController.readOne(req, res));

export default route;