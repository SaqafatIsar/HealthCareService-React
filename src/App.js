import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    const [services, setServices] = useState([]);
    const [newService, setNewService] = useState({ name: '', description: '', price: '' });
    const [editService, setEditService] = useState(null);

    useEffect(() => {
        // Initialize with some data or fetch from an API
        setServices([
            { id: 1, name: 'General Checkup', description: 'A general health checkup', price: 50 },
            { id: 2, name: 'Blood Test', description: 'Basic blood test', price: 30 },
        ]);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewService({ ...newService, [name]: value });
    };

    const handleAddService = () => {
        if (newService.name && newService.description && newService.price) {
            setServices([...services, { ...newService, id: Date.now() }]);
            setNewService({ name: '', description: '', price: '' });
        }
    };

    const handleUpdateService = (id) => {
        const updatedServices = services.map((service) => 
            service.id === id ? editService : service
        );
        setServices(updatedServices);
        setEditService(null);
    };

    const handleDeleteService = (id) => {
        const updatedServices = services.filter((service) => service.id !== id);
        setServices(updatedServices);
    };

    return (
        <div className="App">
            <h1>Healthcare Services</h1>
            <div>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newService.name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newService.description}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newService.price}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddService}>Add Service</button>
            </div>
            <ul>
                {services.map((service) => (
                    <li key={service.id}>
                        {editService && editService.id === service.id ? (
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={editService.name}
                                    onChange={(e) => setEditService({ ...editService, name: e.target.value })}
                                />
                                <input
                                    type="text"
                                    name="description"
                                    value={editService.description}
                                    onChange={(e) => setEditService({ ...editService, description: e.target.value })}
                                />
                                <input
                                    type="number"
                                    name="price"
                                    value={editService.price}
                                    onChange={(e) => setEditService({ ...editService, price: e.target.value })}
                                />
                                <button onClick={() => handleUpdateService(service.id)}>Save</button>
                            </div>
                        ) : (
                            <div>
                                <span>{service.name}</span>
                                <span>{service.description}</span>
                                <span>{service.price}</span>
                                <button onClick={() => setEditService(service)}>Edit</button>
                                <button onClick={() => handleDeleteService(service.id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;


