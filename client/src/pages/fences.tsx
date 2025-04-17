import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import CTASection from '@/components/cta-section';

interface Fence {
  id: number;
  name: string;
  description: string;
  price: number;
  priceUnit: string;
  image: string;
  features: string[];
  tag?: string;
}

export default function Fences() {
  const fences: Fence[] = [
    {
      id: 1,
      name: 'Premium Aluminum Fence',
      description: 'Durable, maintenance-free aluminum fencing for residential and commercial properties',
      price: 85,
      priceUnit: 'per linear foot',
      image: 'https://images.unsplash.com/photo-1531257059556-7b77a03fd2c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      features: ['Rust and corrosion resistant', 'Multiple height options', 'Powder-coated finish', '15-year warranty'],
      tag: 'BESTSELLER'
    },
    {
      id: 2,
      name: 'Modern Steel Security Fence',
      description: 'High-security steel fencing with contemporary design for maximum protection',
      price: 110,
      priceUnit: 'per linear foot',
      image: 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      features: ['Anti-climb design', 'Galvanized steel construction', 'Custom height options', 'Security spike options']
    },
    {
      id: 3,
      name: 'Decorative Wrought Iron Fence',
      description: 'Classic ornamental wrought iron fencing that combines beauty and security',
      price: 125,
      priceUnit: 'per linear foot',
      image: 'https://images.unsplash.com/photo-1543231201-7d7abed9e7ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      features: ['Custom decorative elements', 'Powder-coated finish', 'Multiple color options', 'Traditional craftsmanship']
    },
    {
      id: 4,
      name: 'Privacy Wood Fence',
      description: 'High-quality wood fencing that provides privacy and enhances your property',
      price: 75,
      priceUnit: 'per linear foot',
      image: 'https://images.unsplash.com/photo-1578394167224-f91e9b15d389?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      features: ['Premium cedar or pine options', 'Custom height available', 'Natural or stained finish', 'Decorative post caps']
    },
    {
      id: 5,
      name: 'Modern Horizontal Fence',
      description: 'Contemporary horizontal slat fencing for a modern aesthetic',
      price: 90,
      priceUnit: 'per linear foot',
      image: 'https://images.unsplash.com/photo-1626248801396-f15a536883dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      features: ['Customizable spacing', 'Multiple material options', 'Clean modern look', 'Semi-privacy design'],
      tag: 'POPULAR'
    },
    {
      id: 6,
      name: 'Composite Privacy Fence',
      description: 'Low-maintenance composite fencing with the look of wood without the upkeep',
      price: 105,
      priceUnit: 'per linear foot',
      image: 'https://images.unsplash.com/photo-1621193793262-4127d9855c91?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      features: ['Weather resistant', 'No painting required', 'Will not rot, warp or splinter', '25-year warranty']
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Premium Fencing Solutions</h1>
          <p className="text-white/90 text-lg max-w-3xl mx-auto mb-8">
            Secure your property with our custom-made, high-quality fencing options
          </p>
        </div>
      </section>

      {/* Fences Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="font-heading text-3xl font-bold text-slate-900 mb-2">Our Fencing Collection</h2>
              <p className="text-slate-600 max-w-2xl">
                Browse our selection of premium fences designed for durability, security, and aesthetic appeal. All products are made in the USA and come with our quality guarantee.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button className="bg-primary">Request Custom Quote</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fences.map(fence => (
              <Card key={fence.id} className="overflow-hidden hover:shadow-lg transition-all">
                <div className="relative">
                  <img 
                    src={fence.image}
                    alt={fence.name} 
                    className="w-full h-56 object-cover"
                  />
                  {fence.tag && (
                    <Badge className={`absolute top-2 right-2 ${fence.tag === 'BESTSELLER' ? 'bg-green-500' : 'bg-secondary'}`}>
                      {fence.tag}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-xl mb-2">{fence.name}</h3>
                  <p className="text-slate-600 mb-4">{fence.description}</p>
                  
                  <ul className="mb-6 space-y-2">
                    {fence.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-primary font-heading font-bold text-xl">${fence.price}</span>
                      <span className="text-slate-500 text-sm ml-1">{fence.priceUnit}</span>
                    </div>
                    <Button>View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-slate-900 text-center mb-12">Benefits of Our Fencing</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Enhanced Security</h3>
                <p className="text-slate-600">
                  Our fences are designed to provide maximum security for your property while maintaining aesthetic appeal.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Custom Design</h3>
                <p className="text-slate-600">
                  Personalize your fence with custom heights, materials, and decorative elements to match your property.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Durability</h3>
                <p className="text-slate-600">
                  Built to withstand harsh weather conditions and provide years of service with minimal maintenance.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Value</h3>
                <p className="text-slate-600">
                  Increase your property value with a high-quality fence that enhances curb appeal and security.
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
