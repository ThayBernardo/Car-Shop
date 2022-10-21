import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import IService from '../interfaces/IService';

export default class CarsController {
  constructor(private _service: IService<ICar>) { }

  public async create(
    req: Request,
    res: Response<ICar>,
  ) {
    const created = await this._service.create(req.body);
    return res.status(201).json(created);
  }

  public async read(
    req: Request,
    res: Response<ICar[]>,
  ) {
    const all = await this._service.read();
    return res.status(200).json(all);
  }

  public async readOne(
    req: Request,
    res: Response<ICar>,
  ) {
    const one = await this._service.readOne(req.params.id);
    return res.status(200).json(one);
  }

  // public async update(
  //   req: Request,
  //   res: Response<ICar>,
  // ) {
  //   const { id } = req.params;
  //   const updated = await this._service.update(id, req.body);
  //   return res.status(200).json({ id, updated });
  // }
}