import { ErrorTypes } from '../errors/catolog';
import { IModel } from '../interfaces/IModel';
import { IMotorcycle, IMotorcycleSchema } from '../interfaces/IMotorcycle';
import IService from '../interfaces/IService';

export default class MotorcyclesServices implements IService<IMotorcycle> {
  constructor(private _model: IModel<IMotorcycle>) { }

  public async create(obj: unknown): Promise<IMotorcycle> {
    const parsed = IMotorcycleSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }
    return this._model.create(parsed.data);
  }

  public async read(): Promise<IMotorcycle[]> {
    return this._model.read();
  }

  public async readOne(_id: string): Promise<IMotorcycle> {
    const one = await this._model.readOne(_id);
    if (!one) throw new Error(ErrorTypes.EntityNotFound);
    return one;
  }

  public async update(_id: string, obj: unknown): Promise<IMotorcycle> {
    const parsed = IMotorcycleSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    const Updated = await this._model.update(_id, parsed.data);
    if (!Updated) {
      throw new Error(ErrorTypes.EntityNotFound);
    }
    return Updated;
  }

  public async delete(_id: string): Promise<null> {
    const deleted = await this._model.delete(_id);
    if (!deleted) throw new Error(ErrorTypes.EntityNotFound);
    return null;
  }
}