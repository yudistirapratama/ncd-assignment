import {container} from 'tsyringe/dist';
import {LocationService} from '../service/LocationService';

export const deviceServiceContainer = container.resolve(LocationService);
