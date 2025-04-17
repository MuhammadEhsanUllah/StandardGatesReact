import { 
  users, type User, type InsertUser,
  products, type Product, type InsertProduct,
  testimonials, type Testimonial, type InsertTestimonial
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Testimonial methods
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private testimonials: Map<number, Testimonial>;
  
  private userId: number;
  private productId: number;
  private testimonialId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.testimonials = new Map();
    
    this.userId = 1;
    this.productId = 1;
    this.testimonialId = 1;
    
    // Add some sample products
    this.initializeSampleData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.featured
    );
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }
  
  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  
  // Initialize some sample data
  private initializeSampleData() {
    // Sample products
    const sampleProducts: InsertProduct[] = [
      {
        name: 'Modern Arched Gate',
        description: 'Elegant design with premium materials',
        price: 1299,
        category: 'Driveway',
        image: 'https://images.unsplash.com/photo-1564643097515-efa9c2a7a7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        tag: 'POPULAR',
        featured: true
      },
      {
        name: 'Security Sliding Gate',
        description: 'Maximum security with modern aesthetic',
        price: 1599,
        category: 'Driveway',
        image: 'https://images.unsplash.com/photo-1553434213-c738808cf1b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        featured: true
      },
      {
        name: 'Classic Wrought Iron',
        description: 'Timeless design with modern functionality',
        price: 1899,
        category: 'Garden',
        image: 'https://images.unsplash.com/photo-1558036881-b8e57977d5d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        tag: 'BESTSELLER',
        featured: true
      },
      {
        name: 'Smart Security Gate',
        description: 'App-controlled with advanced security',
        price: 2199,
        category: 'Driveway',
        image: 'https://images.unsplash.com/photo-1580741569654-aff533a80e8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
        featured: true
      }
    ];
    
    // Add sample products
    sampleProducts.forEach(product => {
      const id = this.productId++;
      this.products.set(id, { ...product, id });
    });
    
    // Sample testimonials
    const sampleTestimonials: InsertTestimonial[] = [
      {
        name: 'Michael Johnson',
        location: 'Denver, Colorado',
        text: 'The design process was incredibly simple, and the installation guide made it easy for me to set up my new gate. Excellent quality and fantastic customer support.',
        rating: 5
      },
      {
        name: 'Sarah Rodriguez',
        location: 'Austin, Texas',
        text: 'I love how my custom gate transformed the front of my home. The quality is outstanding, and I was able to match it perfectly to my home\'s style. Highly recommended!',
        rating: 5
      },
      {
        name: 'David Patel',
        location: 'Seattle, Washington',
        text: 'As a DIY enthusiast, I was impressed with how well-designed the installation process was. The gate is sturdy, operates smoothly, and looks fantastic. Worth every penny.',
        rating: 5
      }
    ];
    
    // Add sample testimonials
    sampleTestimonials.forEach(testimonial => {
      const id = this.testimonialId++;
      this.testimonials.set(id, { ...testimonial, id });
    });
  }
}

export const storage = new MemStorage();
