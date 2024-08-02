import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useUser } from '../userContext/UserContext';
import Sidebar from '../sidebar/Sidebar';
import TopNav from '../dashboard/dashboardNav/TopNav';
import axios from 'axios';

const localizer = momentLocalizer(moment);

const MySchedule = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [date, setDate] = useState(new Date());
  const { user } = useUser();
  const [categories, setCategories] = useState([
    { name: 'Interview Schedule', checked: true },
    { name: 'Internal Meeting', checked: true },
    { name: 'Team Schedule', checked: true },
    { name: 'My Task', checked: true },
    { name: 'Reminders', checked: true }
  ]);
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/events');
        setEvents(response.data.map(event => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end)
        })));
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const toggleCategory = (index) => {
    setCategories(categories.map((category, i) => {
      if (i === index) category.checked = !category.checked;
      return category;
    }));
  };

  const createEvent = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const category = event.target.category.value;
    const start = new Date(event.target.start.value);
    const end = new Date(event.target.end.value);
    const newEvent = { title, category, start, end, userId: user.id };

    try {
      const response = await axios.post('http://localhost:3000/api/v1/events', newEvent);
      setEvents([...events, response.data]);
    } catch (error) {
      console.error('Error creating event:', error);
    }
    setEditingEvent(null);
  };

  const editEvent = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const category = event.target.category.value;
    const start = new Date(event.target.start.value);
    const end = new Date(event.target.end.value);
    const updatedEvent = { title, category, start, end };

    try {
      const response = await axios.put(`http://localhost:3000/api/v1/events/${editingEvent.id}`, updatedEvent);
      setEvents(events.map(ev => ev.id === editingEvent.id ? response.data : ev));
    } catch (error) {
      console.error('Error updating event:', error);
    }
    setEditingEvent(null);
  };

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/events/${eventId}`);
      setEvents(events.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const filteredEvents = events.filter(event => 
    event.userId === user.id && categories.find(category => category.name === event.category && category.checked)
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <TopNav />
        <div className="p-6 flex-grow overflow-auto pt-20">
          <div className="mb-4 mt-20">
            <h2 className="text-2xl font-bold">
              {getGreeting()}, {user?.FullName}
            </h2>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-semibold">My Schedule</h2>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md" onClick={() => setEditingEvent({})}>Create Event</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="col-span-1">
                <div className="bg-gray-100 rounded-lg p-4 mb-6">
                  <DatePicker selected={date} onChange={(date) => setDate(date)} inline />
                </div>
                <div className="bg-gray-100 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-semibold">Categories</h3>
                  <ul className="mt-4">
                    {categories.map((category, index) => (
                      <li key={index} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          checked={category.checked}
                          onChange={() => toggleCategory(index)}
                          className="mr-2"
                        />
                        <span>{category.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-span-3">
                {editingEvent && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <form onSubmit={editingEvent.id ? editEvent : createEvent} className="col-span-2">
                      <h3 className="text-lg font-semibold">{editingEvent.id ? 'Edit Event' : 'Create New Event'}</h3>
                      <div className="mt-2">
                        <label className="block text-sm font-medium">Event Title</label>
                        <input type="text" name="title" defaultValue={editingEvent.title || ''} className="mt-1 p-2 border rounded-lg w-full" required />
                      </div>
                      <div className="mt-2">
                        <label className="block text-sm font-medium">Category</label>
                        <select name="category" defaultValue={editingEvent.category || ''} className="mt-1 p-2 border rounded-lg w-full" required>
                          {categories.map((category, index) => (
                            <option key={index} value={category.name}>{category.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="mt-2">
                        <label className="block text-sm font-medium">Start Date & Time</label>
                        <input type="datetime-local" name="start" defaultValue={editingEvent.start ? new Date(editingEvent.start).toISOString().slice(0, 16) : ''} className="mt-1 p-2 border rounded-lg w-full" required />
                      </div>
                      <div className="mt-2">
                        <label className="block text-sm font-medium">End Date & Time</label>
                        <input type="datetime-local" name="end" defaultValue={editingEvent.end ? new Date(editingEvent.end).toISOString().slice(0, 16) : ''} className="mt-1 p-2 border rounded-lg w-full" required />
                      </div>
                      <button type="submit" className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md">{editingEvent.id ? 'Update Event' : 'Create Event'}</button>
                      <button type="button" onClick={() => setEditingEvent(null)} className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md ml-2">Cancel</button>
                    </form>
                  </div>
                )}
                <div className="bg-white shadow rounded-lg p-4 mt-4">
                  <Calendar
                    localizer={localizer}
                   events={filteredEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    eventPropGetter={(event) => {
                      let backgroundColor = "";
                      switch(event.category) {
                        case 'Interview Schedule':
                          backgroundColor = "#f9a825";
                          break;
                        case 'Internal Meeting':
                          backgroundColor = "#64b5f6";
                          break;
                        case 'Team Schedule':
                          backgroundColor = "#81c784";
                          break;
                        case 'My Task':
                          backgroundColor = "#ffb74d";
                          break;
                        case 'Reminders':
                          backgroundColor = "#e57373";
                          break;
                        default:
                          backgroundColor = "#90caf9";
                          break;
                      }
                      return { style: { backgroundColor } };
                    }}
                    onSelectEvent={event => setEditingEvent(event)}
                  />
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySchedule;
