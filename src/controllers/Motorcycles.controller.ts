import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import IService from '../interfaces/IService';

export default class MotorcyclesController {
  constructor(private _service: IService<IMotorcycle>) { }

  public async create(
    req: Request,
    res: Response<IMotorcycle>,
  ) {
    const created = await this._service.create(req.body);
    return res.status(201).json(created);
  }

  public async read(
    req: Request,
    res: Response<IMotorcycle[]>,
  ) {
    const all = await this._service.read();
    return res.status(200).json(all);
  }
}