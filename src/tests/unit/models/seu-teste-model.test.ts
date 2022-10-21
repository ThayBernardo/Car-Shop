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

    describe('creating a frame', () => {
		it('successfully created', async () => {
			const newFrame = await carModel.create(carMock);
			expect(newFrame).to.be.deep.equal(carMockWithId);
		});
	});
});