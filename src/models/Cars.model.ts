import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './Mongo.model';

const carMongooseSchema = new Schema<ICar>(
  {
    model: String,
    year: Number,
    color: String,
    status: Boolean,
    buyValue: Number,
    doorsQty: Number,
    seatsQty: Number,
  },
  { versionKey: false },
);

class Car extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('Car', carMongooseSchema)) {
    super(model);
  }
}

export default Car;