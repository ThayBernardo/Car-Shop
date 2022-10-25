import { z } from 'zod';
import { VehicleSchema } from './IVehicle';

const IMotorcycleSchema = VehicleSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().min(1).max(2500),
});

export type IMotorcycle = z.infer<typeof IMotorcycleSchema>;
  
export { IMotorcycleSchema };