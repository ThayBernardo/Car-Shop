import { ICar, ICarSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';

export default class CarsServices implements IService<ICar> {
  constructor(private _model: IModel<ICar>) { }

  public async create(obj: unknown): Promise<ICar> {
    const parsed = ICarSchema.safeParse(obj);

    if (!parsed.success) {
      console.log('Teste 1');
      throw parsed.error;
    }
    console.log('Teste 2');
    return this._model.create(parsed.data);
  }
}