import { Router } from 'express';
import { body, query } from 'express-validator';
import { PropertyController } from '../controllers/propertyController';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const controller = new PropertyController();

// Public routes
router.get('/', 
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('priceMin').optional().isFloat({ min: 0 }),
  query('priceMax').optional().isFloat({ min: 0 }),
  controller.getProperties.bind(controller)
);

router.get('/:id', controller.getPropertyDetail.bind(controller));

// Protected routes
router.post('/',
  authMiddleware,
  body('title').notEmpty().withMessage('Title is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be positive'),
  body('property_type').notEmpty().withMessage('Property type is required'),
  controller.createProperty.bind(controller)
);

router.put('/:id',
  authMiddleware,
  controller.updateProperty.bind(controller)
);

router.delete('/:id',
  authMiddleware,
  controller.deleteProperty.bind(controller)
);

export default router;
