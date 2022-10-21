import { NextFunction, Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import IService from '../interfaces/IService';

export default class CarsController {
  constructor(private _service: IService<ICar>) { }

  public async create(
    req: Request,
    res: Response<ICar>,
    next: NextFunction,
  ) {
    try {
      const created = await this._service.create(req.body);
      return res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  }
}