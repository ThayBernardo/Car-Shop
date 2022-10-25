import { Router } from 'express';
import Motorcycle from '../models/Motorcycles.model';
import MotorcyclesServices from '../services/Motorcycles.service';
import MotorcyclesController from '../controllers/Motorcycles.controller';

const route = Router();

const motorcycle = new Motorcycle();
const motorcycleService = new MotorcyclesServices(motorcycle);
const motorcycleController = new MotorcyclesController(motorcycleService);

const routeId = '/motorcycles/:id';

route.post('/motorcycles', (req, res) => motorcycleController.create(req, res));
route.get('/motorcycles', (req, res) => motorcycleController.read(req, res));
route.get(routeId, (req, res) => motorcycleController.readOne(req, res));
route.put(routeId, (req, res) => motorcycleController.update(req, res));
route.delete(routeId, (req, res) => motorcycleController.delete(req, res));

export default route;