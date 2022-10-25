import { IMotorcycle } from "../../interfaces/IMotorcycle";

const motorcycleMock:IMotorcycle = {
    model: 'teste',
    year: 2012,
    color: 'black',
    status: true,
    buyValue: 12334,
    category: 'Custom',
    engineCapacity: 1200,
};

const motorcycleMockWithId:IMotorcycle & { _id:string } = {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'teste',
  year: 2012,
  color: 'black',
  status: true,
  buyValue: 12334,
  category: 'Custom',
  engineCapacity: 1200,
};

const motorcycleMockWrong: IMotorcycle = {
  model: 'teste',
  year: 3333,
  color: 'black',
  status: true,
  buyValue: 12334,
  category: 'Custom',
  engineCapacity: 1200,
}

const motorcycleMockPartial: Partial<IMotorcycle> = {
  model: 'teste',
}

export { motorcycleMock, motorcycleMockPartial, motorcycleMockWrong, motorcycleMockWithId };