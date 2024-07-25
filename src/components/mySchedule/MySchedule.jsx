import React, { useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import TopNav from '../dashboard/dashboardNav/TopNav';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MySchedule = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [date, setDate] = useState(new Date());
  const [categories, setCategories] = useState([
    { name: 'Interview Schedule', checked: true },
    { name: 'Internal Meeting', checked: true },
    { name: 'Team Schedule', checked: false },
    { name: 'My Task', checked: false },
    { name: 'Reminders', checked: false }
  ]);
  const [events, setEvents] = useState([
    { id: 1, date: new Date(2021, 10, 24, 2, 0), title: 'Interview session with Shubhan', category: 'Interview Schedule' },
    { id: 2, date: new Date(2021, 10, 24, 8, 0), title: 'Interview session', category: 'Interview Schedule' },
    { id: 3, date: new Date(2021, 10, 24, 9, 0), title: 'Meeting with team', category: 'Internal Meeting' }
  ]);
  const [editingEvent, setEditingEvent] = useState(null);

  const toggleCategory = (index) => {
    setCategories(categories.map((category, i) => {
      if (i === index) category.checked = !category.checked;
      return category;
    }));
  };

  const createEvent = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const category = event.target.category.value;
    const date = new Date(event.target.date.value);
    const newEvent = { id: events.length + 1, date, title, category };
    setEvents([...events, newEvent]);
  };

  const editEvent = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const category = event.target.category.value;
    const date = new Date(event.target.date.value);
    const updatedEvents = events.map(ev => ev.id === editingEvent.id ? { ...ev, title, date, category } : ev);
    setEvents(updatedEvents);
    setEditingEvent(null);
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <TopNav />
        <div className="p-6 flex-grow overflow-auto pt-20">
          <div className="bg-white shadow rounded-lg p-4">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-2xl font-semibold">My Schedule</h2>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md" onClick={() => setEditingEvent({})}>Create Event</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-100 rounded-lg p-4 mb-6 col-span-1">
                <DatePicker selected={date} onChange={(date) => setDate(date)} inline />
              </div>
              <div className="bg-gray-100 rounded-lg p-4 mb-6 col-span-2">
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
            {editingEvent && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <label className="block text-sm font-medium">Date & Time</label>
                    <input type="datetime-local" name="date" defaultValue={editingEvent.date ? new Date(editingEvent.date).toISOString().slice(0, 16) : ''} className="mt-1 p-2 border rounded-lg w-full" required />
                  </div>
                  <button type="submit" className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md">{editingEvent.id ? 'Update Event' : 'Create Event'}</button>
                  <button type="button" onClick={() => setEditingEvent(null)} className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md ml-2">Cancel</button>
                </form>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.filter(event => categories.find(category => category.name === event.category && category.checked))
                .map((event, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
                    <h4 className="text-lg font-semibold">{event.title}</h4>
                    <p className="text-sm">{event.date.toLocaleString()}</p>
                    <p className="text-sm">{event.category}</p>
                    <button onClick={() => setEditingEvent(event)} className="mt-2 bg-yellow-500 text-white px-2 py-1 rounded-lg shadow-md mr-2">Edit</button>
                    <button onClick={() => deleteEvent(event.id)} className="mt-2 bg-red-500 text-white px-2 py-1 rounded-lg shadow-md">Delete</button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySchedule;
