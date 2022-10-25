import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import { ErrorTypes } from '../../../errors/catolog';
import Motorcycle from '../../../models/Motorcycles.model';
import { motorcycleMock, motorcycleMockWithId } from '../../mocks/Motorcycle.mock';

describe('Motorcycle Model', () => {
  const motorcycleModel = new Motorcycle();

	before(() => {
		sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
		sinon.stub(Model, 'findOne').resolves(motorcycleMockWithId);
		sinon.stub(Model, 'find').resolves([motorcycleMockWithId]);
		sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(motorcycleMockWithId);
	});

	after(() => {
		sinon.restore();
	});

    describe('creating a motorcycle', () => {
		it('successfully created', async () => {
			const created = await motorcycleModel.create(motorcycleMock);
			expect(created).to.be.deep.equal(motorcycleMockWithId);
		});
	});

	describe('searching a motorcycle', () => {
		it('successfully found', async () => {
			const motorcycleCarFound = await motorcycleModel.readOne(motorcycleMockWithId._id);
			expect(motorcycleCarFound).to.be.deep.equal(motorcycleMockWithId);
		});

		it('_id not found', async () => {
			try {
				await motorcycleModel.readOne('TESTE');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

	describe('searching all motorcycles', () => {
		it('successfully found', async () => {
			const motorcycleFound = await motorcycleModel.read();
			expect(motorcycleFound).to.be.deep.equal([motorcycleMockWithId]);
		});
	});

	describe('update motorcycle', () => {
		it('successfully changed', async () => {
			const updated = await motorcycleModel.update('62cf1fc6498565d94eba52cd', motorcycleMock);
			expect(updated).to.be.deep.equal(motorcycleMockWithId);
		});
	
		it('_id not found to change', async () => {
			try {
				await motorcycleModel.update('T3ST3', motorcycleMock);
			} catch (error:any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
		});
	});
});