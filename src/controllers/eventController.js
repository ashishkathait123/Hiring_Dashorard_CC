import { asyncHandler } from "../utils/asyncHandler.js";
import { Event } from "../models/event.model.js";
import { ApiError } from "../utils/ApiError.1.js";
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find();
  res.status(200).json(events);
});

// Create a new event
const createEvent = asyncHandler(async (req, res) => {
  const { title, category, start, end } = req.body;

  if (!title || !category || !start || !end) {
    throw new ApiError(400, "All fields are required");
  }

  const newEvent = new Event({ title, category, start, end });

  const savedEvent = await newEvent.save();
  res.status(201).json(savedEvent);
});

// Update an event by ID
const updateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, category, start, end } = req.body;

  const updatedEvent = await Event.findByIdAndUpdate(
    id,
    { title, category, start, end },
    { new: true }
  );

  if (!updatedEvent) {
    throw new ApiError(404, "Event not found");
  }

  res.status(200).json(updatedEvent);
});

// Delete an event by ID
const deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedEvent = await Event.findByIdAndDelete(id);

  if (!deletedEvent) {
    throw new ApiError(404, "Event not found");
  }

  res.status(200).json({ message: "Event deleted" });
});

export { getEvents, createEvent, updateEvent, deleteEvent };
