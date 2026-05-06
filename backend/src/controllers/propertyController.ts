import express, { Request, Response } from 'express';
import { propertyService } from '../services/propertyService';
import { validationResult } from 'express-validator';
import { AuthRequest } from '../middleware/auth';

export class PropertyController {
  
  // GET all properties with filters
  async getProperties(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { 
        city, 
        priceMin, 
        priceMax, 
        type, 
        status, 
        sortBy = 'newest',
        page = 1,
        limit = 12 
      } = req.query;

      const properties = await propertyService.getProperties({
        city: city as string,
        priceMin: parseInt(priceMin as string) || 0,
        priceMax: parseInt(priceMax as string) || 999999999,
        type: type as string,
        status: status as string,
        sortBy: sortBy as string,
        page: parseInt(page as string),
        limit: parseInt(limit as string)
      });

      res.json({
        success: true,
        properties: properties.data,
        total: properties.total,
        page,
        hasMore: properties.hasMore
      });
    } catch (error: any) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ error: 'Failed to fetch properties' });
    }
  }

  // GET single property detail
  async getPropertyDetail(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: 'Property ID is required' });
      }

      const property = await propertyService.getPropertyById(id);

      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }

      res.json({
        success: true,
        data: property
      });
    } catch (error: any) {
      console.error('Error fetching property detail:', error);
      res.status(500).json({ error: 'Failed to fetch property' });
    }
  }

  // CREATE new property (Protected)
  async createProperty(req: AuthRequest, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userId = req.userId;
      const propertyData = req.body;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const newProperty = await propertyService.createProperty({
        ...propertyData,
        agent_id: userId,
        created_by: userId
      });

      res.status(201).json({
        success: true,
        data: newProperty
      });
    } catch (error: any) {
      console.error('Error creating property:', error);
      res.status(500).json({ error: 'Failed to create property' });
    }
  }

  // UPDATE property (Protected)
  async updateProperty(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const userId = req.userId;

      if (!id || !userId) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }

      const property = await propertyService.getPropertyById(id);
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }

      // Check authorization
      if (property.agent_id !== userId && req.userRole !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      const updatedProperty = await propertyService.updateProperty(id, updateData);

      res.json({
        success: true,
        data: updatedProperty
      });
    } catch (error: any) {
      console.error('Error updating property:', error);
      res.status(500).json({ error: 'Failed to update property' });
    }
  }

  // DELETE property (Protected)
  async deleteProperty(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.userId;

      if (!id || !userId) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }

      const property = await propertyService.getPropertyById(id);
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }

      // Check authorization
      if (property.agent_id !== userId && req.userRole !== 'admin') {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      await propertyService.deleteProperty(id);

      res.json({
        success: true,
        message: 'Property deleted successfully'
      });
    } catch (error: any) {
      console.error('Error deleting property:', error);
      res.status(500).json({ error: 'Failed to delete property' });
    }
  }

  // GET properties by agent (Protected)
  async getAgentProperties(req: AuthRequest, res: Response) {
    try {
      const userId = req.userId;
      const { page = 1, limit = 12 } = req.query;

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const properties = await propertyService.getPropertiesByAgent(
        userId,
        parseInt(page as string),
        parseInt(limit as string)
      );

      res.json({
        success: true,
        properties: properties.data,
        total: properties.total,
        page,
        hasMore: properties.hasMore
      });
    } catch (error: any) {
      console.error('Error fetching agent properties:', error);
      res.status(500).json({ error: 'Failed to fetch agent properties' });
    }
  }
}

export default new PropertyController();
