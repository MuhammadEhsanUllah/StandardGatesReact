import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get('/api/products', async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      
      if (category) {
        const products = await storage.getProductsByCategory(category);
        res.json(products);
      } else {
        const products = await storage.getProducts();
        res.json(products);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products' });
    }
  });
  
  app.get('/api/products/featured', async (req, res) => {
    try {
      const featuredProducts = await storage.getFeaturedProducts();
      res.json(featuredProducts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching featured products' });
    }
  });
  
  app.get('/api/products/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProductById(id);
      
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching product' });
    }
  });
  
  app.get('/api/testimonials', async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching testimonials' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
