import mongoose from 'mongoose';
import { CreateEventDto } from './dtos/CreateEvent.dot';
import EventModel, { IEvent } from './models/Event';
import { Event } from './types/response';



// this event service instance shows how to create a event, get a event by id, and get all events with in-memory data
class EventService {

  async getEvents(page = 1, limit = 10, sortBy = 'date', sortDirection = 'asc'): Promise<IEvent[]> {
    const skip = (page - 1) * limit;
    const sortOrder = sortDirection === 'asc' ? 1 : -1;
    return EventModel.find() 
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder });
  }
  
    async getEventById(id: string): Promise<IEvent | null> {
      return await EventModel.findById(id).exec();
    }

    async createEvent(createEventDto: CreateEventDto): Promise<IEvent> {
      const { name, description, date, location ,duration} = createEventDto;
      const newEvent = new EventModel({
        name,
        description,
        date: new Date(date),
        location,
        duration
      });
  
      await newEvent.save();
      return newEvent;
    }
  
    
  }
  
  export default EventService;
  