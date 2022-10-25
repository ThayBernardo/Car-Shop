import { Router } from 'express';
import Motorcycle from '../models/Motorcycles.model';
import MotorcyclesServices from '../services/Motorcycles.service';
import MotorcyclesController from '../controllers/Motorcycles.controller';

const route = Router();

const motorcycle = new Motorcycle();
const motorcycleService = new MotorcyclesServices(motorcycle);
const motorcycleController = new MotorcyclesController(motorcycleService);

route.post('/motorcycles', (req, res) => motorcycleController.create(req, res));

export default route;