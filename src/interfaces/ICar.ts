import { z } from 'zod';
import { VehicleSchema } from './IVehicle';

const ICarSchema = VehicleSchema.extend({
  doorsQty: z.number().min(2).max(4),
  seatsQty: z.number().min(2).max(4),
});

export type ICar = z.infer<typeof ICarSchema>;
  
export { ICarSchema };