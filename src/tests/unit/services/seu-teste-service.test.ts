import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import Car from '../../../models/Cars.model';
import CarsServices from '../../../services/Cars.services';
import { carMock, carMockWithId } from '../../mocks/Cars.mock';

describe('Frame Service', () => {
	const carModel = new Car();
	const carService = new CarsServices(carModel);

	before(() => {
		sinon.stub(carModel, 'create').resolves(carMockWithId); 
	})
	after(() => {
		sinon.restore()
	})
	describe('Create Car', () => {
		it('Success', async () => {
			const carCreated = await carService.create(carMock);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
			let error;
			try {
				await carService.create({});
			} catch (err) {
				error = err
			}

			expect(error).to.be.instanceOf(ZodError);
		});
	});
});