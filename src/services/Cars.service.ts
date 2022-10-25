import { ErrorTypes } from '../errors/catolog';
import { ICar, ICarSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';

export default class CarsServices implements IService<ICar> {
  constructor(private _model: IModel<ICar>) { }

  public async create(obj: unknown): Promise<ICar> {
    const parsed = ICarSchema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }
    return this._model.create(parsed.data);
  }

  public async read(): Promise<ICar[]> {
    return this._model.read();
  }

  public async readOne(_id: string): Promise<ICar> {
    const one = await this._model.readOne(_id);
    if (!one) throw new Error(ErrorTypes.EntityNotFound);
    return one;
  }

  public async update(_id: string, obj: unknown): Promise<ICar> {
    const parsed = ICarSchema.safeParse(obj);
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