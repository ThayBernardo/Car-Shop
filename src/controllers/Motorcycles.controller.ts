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

  public async readOne(
    req: Request,
    res: Response<IMotorcycle>,
  ) {
    const one = await this._service.readOne(req.params.id);
    return res.status(200).json(one);
  }

  public async update(
    req: Request,
    res: Response<IMotorcycle>,
  ) {
    const { id } = req.params;  
    const updated = await this._service.update(id, req.body);
    return res.status(200).json(updated);
  }

  public async delete(
    req: Request,
    res: Response<null>,
  ) {
    const { id } = req.params;
    await this._service.delete(id);
    return res.status(204).end();
  }
}