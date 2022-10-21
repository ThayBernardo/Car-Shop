import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Car from '../../../models/Cars.model';
import { carMock, carMockWithId } from '../../mocks/Cars.mock';

describe('Car Model', () => {
  const carModel = new Car();

	before(() => {
		sinon.stub(Model, 'create').resolves(carMockWithId);
	});

	after(() => {
		sinon.restore();
	});

    describe('creating a car', () => {
		it('successfully created', async () => {
			const newCar = await carModel.create(carMock);
			expect(newCar).to.be.deep.equal(carMockWithId);
		});
	});
});