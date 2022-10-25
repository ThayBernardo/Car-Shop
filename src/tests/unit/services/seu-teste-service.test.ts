import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catolog';
import Car from '../../../models/Cars.model';
import CarsServices from '../../../services/Cars.service';
import { carMock, carMockPartial, carMockWithId, carMockWrong } from '../../mocks/Cars.mock';

describe('Car Service', () => {
	const carModel = new Car();
	const carService = new CarsServices(carModel);

	before(() => {
		sinon.stub(carModel, 'create').resolves(carMockWithId);
		sinon.stub(carModel, 'readOne')
			.onCall(0).resolves(carMockWithId) 
			.onCall(1).resolves(null); 
		sinon.stub(carModel, 'read').resolves([carMockWithId]);
		sinon.stub(carModel, 'update')
			.onCall(0).resolves(carMockWithId)
			.onCall(1).resolves(null)
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

	describe('ReadOne Car', () => {
		it('Success', async () => {
			const getCar = await carService.readOne(carMockWithId._id);

			expect(getCar).to.be.deep.equal(carMockWithId);
		});

		it('Failure', async () => {
			let error;
			try {
				await carService.readOne(carMockWithId._id);
			} catch (err:any) {
				error = err
			}

			expect(error, 'error should be defined').not.to.be.undefined;
			expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
	});

	describe('Read all Cars', () => {
		it('Success', async () => {
			const allCars = await carService.read();

			expect(allCars).to.be.deep.equal([carMockWithId]);
		});
	});

	describe('Update Car', () => {
		it('Success', async () => {
			const updated = await carService.update('62cf1fc6498565d94eba52cd', carMock);
			expect(updated).to.be.deep.equal(carMockWithId);
		});

		it('Failure: object not found', async () => {
			let error;
			try {
				await carService.update(carMockWithId._id, carMock)
			} catch (err: any) {
				error = err;
			}
			expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
		});

		it('Failure: entity is not valid', async () => {
			let error;
			try {
				await carService.update(carMockWithId._id, carMockWrong)
			} catch (err: any) {
				error = err;
			}
			expect(error).to.be.instanceOf(ZodError);
		});
	});
});