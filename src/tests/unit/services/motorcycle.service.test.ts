import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catolog';
import Motorcycle from '../../../models/Motorcycles.model';
import MotorcyclesServices from '../../../services/Motorcycles.service';
import { motorcycleMock, motorcycleMockWithId, motorcycleMockWrong } from '../../mocks/Motorcycle.mock';

describe('Car Service', () => {
	const motorcycleModel = new Motorcycle();
	const motorcycleService = new MotorcyclesServices(motorcycleModel);

	before(() => {
		sinon.stub(motorcycleModel, 'create').resolves(motorcycleMockWithId);
		sinon.stub(motorcycleModel, 'readOne')
			.onCall(0).resolves(motorcycleMockWithId) 
			.onCall(1).resolves(null); 
		sinon.stub(motorcycleModel, 'read').resolves([motorcycleMockWithId]);
		sinon.stub(motorcycleModel, 'update')
			.onCall(0).resolves(motorcycleMockWithId)
			.onCall(1).resolves(null)
	})
	after(() => {
		sinon.restore()
	})
	describe('Create Motorcycle', () => {
		it('Success', async () => {
			const created = await motorcycleService.create(motorcycleMock);

			expect(created).to.be.deep.equal(motorcycleMockWithId);
		});

		it('Failure', async () => {
			let error;
			try {
				await motorcycleService.create({});
			} catch (err) {
				error = err
			}

			expect(error).to.be.instanceOf(ZodError);
		});
	});

	describe('ReadOne', () => {
		it('Success', async () => {
			const getCar = await motorcycleService.readOne(motorcycleMockWithId._id);

			expect(getCar).to.be.deep.equal(motorcycleMockWithId);
		});

		it('Failure', async () => {
			let error;
			try {
				await motorcycleService.readOne(motorcycleMockWithId._id);
			} catch (err:any) {
				error = err
			}

			expect(error, 'error should be defined').not.to.be.undefined;
			expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
	});

	describe('Read all', () => {
		it('Success', async () => {
			const allCars = await motorcycleService.read();

			expect(allCars).to.be.deep.equal([motorcycleMockWithId]);
		});
	});

	describe('Update', () => {
		it('Success', async () => {
			const updated = await motorcycleService.update('62cf1fc6498565d94eba52cd', motorcycleMock);
			expect(updated).to.be.deep.equal(motorcycleMockWithId);
		});

		it('Failure: object not found', async () => {
			let error;
			try {
				await motorcycleService.update(motorcycleMockWithId._id, motorcycleMock)
			} catch (err: any) {
				error = err;
			}
			expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
		});

		it('Failure: entity is not valid', async () => {
			let error;
			try {
				await motorcycleService.update(motorcycleMockWithId._id, motorcycleMockWrong)
			} catch (err: any) {
				error = err;
			}
			expect(error).to.be.instanceOf(ZodError);
		});
	});
});