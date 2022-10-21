import { ICar } from "../../interfaces/ICar";

const carMock:ICar = {
    model: 'teste',
    year: 2012,
    color: 'black',
    status: true,
    buyValue: 12334,
    doorsQty: 4,
    seatsQty: 4,
};

const carMockWithId:ICar & { _id:string } = {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'teste',
  year: 2012,
  color: 'black',
  status: true,
  buyValue: 12334,
  doorsQty: 4,
  seatsQty: 4,
};

export { carMock, carMockWithId };