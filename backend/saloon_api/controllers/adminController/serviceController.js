const Service = require('../../models/serviceModel');

// Create Service
exports.createService = async (req, res) => {
  try {
    const { name, price, duration, description } = req.body;

    // Create a new service document
    const newService = new Service({
      name,
      price,
      duration,
      description
    });

    // Save to DB
    const savedService = await newService.save();

    res.status(201).json({
      message: "Service created successfully",
      service: savedService
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating service",
      error
    });
  }
}

// Get All Services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services", error });
  }
};

// Get Service By ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Error fetching service", error });
  }
};

// Update Service
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.status(200).json({ message: "Service updated successfully", service });
  } catch (error) {
    res.status(500).json({ message: "Error updating service", error });
  }
};

// Delete Service
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting service", error });
  }
}