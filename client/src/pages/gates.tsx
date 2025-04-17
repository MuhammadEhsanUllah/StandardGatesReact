import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check } from 'lucide-react';
import CTASection from '@/components/cta-section';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tag?: string;
  features: string[];
}

export default function Gates() {
  // Sample gate products
  const products: Product[] = [
    {
      id: 1,
      name: 'Modern Arched Gate',
      description: 'Elegant design with premium materials',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1564643097515-efa9c2a7a7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      category: 'Driveway',
      tag: 'POPULAR',
      features: ['Aluminum construction', 'Custom sizing', 'Swing or sliding options', 'Multiple color options']
    },
    {
      id: 2,
      name: 'Security Sliding Gate',
      description: 'Maximum security with modern aesthetic',
      price: 1599,
      image: 'https://images.unsplash.com/photo-1553434213-c738808cf1b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      category: 'Driveway',
      features: ['Steel construction', 'Smart lock compatibility', 'Remote control included', 'Weather resistant']
    },
    {
      id: 3,
      name: 'Classic Wrought Iron',
      description: 'Timeless design with modern functionality',
      price: 1899,
      image: 'https://images.unsplash.com/photo-1558036881-b8e57977d5d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      category: 'Garden',
      tag: 'BESTSELLER',
      features: ['Wrought iron construction', 'Decorative elements', 'Rust-resistant coating', 'Traditional craftsmanship']
    },
    {
      id: 4,
      name: 'Smart Security Gate',
      description: 'App-controlled with advanced security',
      price: 2199,
      image: 'https://images.unsplash.com/photo-1580741569654-aff533a80e8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      category: 'Driveway',
      features: ['IoT integration', 'Camera and intercom', 'Smartphone control', 'Voice assistant compatible']
    },
    {
      id: 5,
      name: 'Contemporary Pivot Gate',
      description: 'Modern design with unique pivot mechanism',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1556784344-ad913a7d0dea?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      category: 'Driveway',
      features: ['Unique pivot design', 'Minimal space requirements', 'Custom sizes available', 'Premium materials']
    },
    {
      id: 6,
      name: 'Garden Arch Gate',
      description: 'Beautiful garden entrance with climbing plant support',
      price: 1199,
      image: 'https://images.unsplash.com/photo-1598902108854-10e335adac99?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      category: 'Garden',
      features: ['Plant-friendly design', 'Weather-resistant', 'Easy installation', 'Classic arched top']
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Custom Gates Collection</h1>
          <p className="text-white/90 text-lg max-w-3xl mx-auto mb-8">
            Browse our exclusive selection of premium custom gates designed and manufactured in the USA
          </p>
        </div>
      </section>

      {/* Gates Catalog */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="w-full mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading text-3xl font-bold text-slate-900">Our Gate Designs</h2>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="driveway">Driveway</TabsTrigger>
                <TabsTrigger value="garden">Garden</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="driveway">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.filter(p => p.category === 'Driveway').map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="garden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.filter(p => p.category === 'Garden').map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-slate-900 text-center mb-12">Why Choose Our Gates</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-3">Premium Quality</h3>
                <p className="text-slate-600">
                  All our gates are crafted with the highest quality materials to ensure durability and longevity in any weather condition.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-3">Custom Design</h3>
                <p className="text-slate-600">
                  Work with our designers to create a gate that perfectly matches your home's style and meets your security needs.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-3">Easy Installation</h3>
                <p className="text-slate-600">
                  Our gates come with detailed DIY installation guides, or we can connect you with certified installers in your area.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <CTASection />
    </main>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all">
      <div className="relative">
        <img 
          src={product.image}
          alt={product.name} 
          className="w-full h-56 object-cover"
        />
        {product.tag && (
          <Badge className={`absolute top-2 right-2 ${product.tag === 'BESTSELLER' ? 'bg-green-500' : 'bg-secondary'}`}>
            {product.tag}
          </Badge>
        )}
      </div>
      <CardContent className="p-6">
        <h3 className="font-heading font-semibold text-xl mb-2">{product.name}</h3>
        <p className="text-slate-600 mb-4">{product.description}</p>
        
        <ul className="mb-6 space-y-2">
          {product.features.map((feature, i) => (
            <li key={i} className="flex items-start text-sm">
              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <div className="flex justify-between items-center">
          <span className="text-primary font-heading font-bold text-xl">${product.price}</span>
          <Button>View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
}
