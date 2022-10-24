import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Car from '../../../models/Cars.model';
import { carMock, carMockWithId } from '../../mocks/Cars.mock';
import { ErrorTypes } from '../../../errors/catolog';

describe('Car Model', () => {
  const carModel = new Car();

	before(() => {
		sinon.stub(Model, 'create').resolves(carMockWithId);
		sinon.stub(Model, 'findOne').resolves(carMockWithId);
		sinon.stub(Model, 'find').resolves([carMockWithId]);
		sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockWithId);
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

	describe('searching a car', () => {
		it('successfully found', async () => {
			const carFound = await carModel.readOne(carMockWithId._id);
			expect(carFound).to.be.deep.equal(carMockWithId);
		});

		it('_id not found', async () => {
			try {
				await carModel.readOne('TESTE');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

	describe('searching all cars', () => {
		it('successfully found', async () => {
			const carFound = await carModel.read();
			expect(carFound).to.be.deep.equal([carMockWithId]);
		});
	});

	describe('update car', () => {
		it('successfully changed', async () => {
			const updated = await carModel.update('62cf1fc6498565d94eba52cd', carMock);
			expect(updated).to.be.deep.equal(carMockWithId);
		});
	
		it('_id not found to change', async () => {
			try {
				await carModel.update('T3ST3', carMock);
			} catch (error:any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});
});