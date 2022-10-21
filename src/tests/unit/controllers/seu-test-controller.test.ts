import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response } from 'express';
import Car from '../../../models/Cars.model';
import CarsServices from '../../../services/Cars.services';
import CarsController from '../../../controllers/Cars.controller';
import { carMock } from '../../mocks/Cars.mock';

describe('Car Controller', () => {
  const carModel = new Car()
  const carService = new CarsServices(carModel);
  const carController = new CarsController(carService);
  
  const req = {} as Request; 
  const res = {} as Response;

  before(() => {
    sinon.stub(carService, 'create').resolves(carMock);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore()
  })

  describe('Create Car', () => {
    it('Success', async () => {
      req.body = carMock;
      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });
});