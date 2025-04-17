import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check } from 'lucide-react';
import CTASection from '@/components/cta-section';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

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
  // Canvas reference and gate configuration state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [basePrice, setBasePrice] = useState(1998);
  const [totalPrice, setTotalPrice] = useState(1998);
  
  // Gate configuration options
  const [width, setWidth] = useState(12); // feet
  const [kitType, setKitType] = useState("Swing");
  const [panels, setPanels] = useState("Dual");
  const [style, setStyle] = useState("Arch");
  const [pickets, setPickets] = useState("Single");
  const [ironwood, setIronwood] = useState("None");
  const [access, setAccess] = useState("Manual");
  
  // Price adjustments
  const [kitPrice, setKitPrice] = useState(500);
  const [panelsPrice, setPanelsPrice] = useState(0);
  const [stylePrice, setStylePrice] = useState(266);
  const [picketsPrice, setPicketsPrice] = useState(532);
  const [ironwoodPrice, setIronwoodPrice] = useState(0);
  const [accessPrice, setAccessPrice] = useState(75);
  
  // Calculate total weight - for demo purposes
  const weight = 269; // lbs
  
  // Update total price when configurations change
  useEffect(() => {
    const price = basePrice + kitPrice + panelsPrice + stylePrice + picketsPrice + ironwoodPrice + accessPrice;
    setTotalPrice(price);
  }, [basePrice, kitPrice, panelsPrice, stylePrice, picketsPrice, ironwoodPrice, accessPrice]);
  
  // Draw gate on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set canvas dimensions
    canvas.width = 400;
    canvas.height = 300;
    
    // Draw gate based on configuration
    drawGate(ctx, {
      width,
      kitType,
      panels,
      style,
      pickets,
      ironwood
    });
    
  }, [width, kitType, panels, style, pickets, ironwood, access]);
  
  // Function to draw gate on canvas
  const drawGate = (ctx: CanvasRenderingContext2D, config: any) => {
    // Set gate dimensions
    const gateHeight = 180;
    const gateWidth = 250 * (config.width / 12); // Scale width based on selected width
    const postWidth = 20;
    const startX = (400 - gateWidth) / 2;
    const startY = 50;
    
    // Draw posts
    ctx.fillStyle = '#333';
    ctx.fillRect(startX - postWidth/2, startY, postWidth, gateHeight);
    ctx.fillRect(startX + gateWidth - postWidth/2, startY, postWidth, gateHeight);
    
    // Draw gate base frame
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 5;
    
    if (config.panels === "Dual") {
      // Draw dual panels
      const halfWidth = gateWidth / 2;
      
      // Left panel
      ctx.beginPath();
      ctx.rect(startX, startY, halfWidth - 2, gateHeight);
      ctx.stroke();
      
      // Right panel
      ctx.beginPath();
      ctx.rect(startX + halfWidth + 2, startY, halfWidth - 2, gateHeight);
      ctx.stroke();
      
      // Add horizontal bar
      ctx.beginPath();
      ctx.moveTo(startX, startY + gateHeight/2);
      ctx.lineTo(startX + halfWidth - 2, startY + gateHeight/2);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(startX + halfWidth + 2, startY + gateHeight/2);
      ctx.lineTo(startX + gateWidth, startY + gateHeight/2);
      ctx.stroke();
      
      // Draw pickets
      drawPickets(ctx, startX, startY, halfWidth - 2, gateHeight, config.pickets, 8);
      drawPickets(ctx, startX + halfWidth + 2, startY, halfWidth - 2, gateHeight, config.pickets, 8);
      
      // Draw arch if selected
      if (config.style === "Arch") {
        drawArch(ctx, startX, startY, halfWidth - 2, gateHeight, config.pickets);
        drawArch(ctx, startX + halfWidth + 2, startY, halfWidth - 2, gateHeight, config.pickets);
      } else if (config.style === "Finials") {
        drawFinials(ctx, startX, startY, halfWidth - 2, gateHeight, config.pickets);
        drawFinials(ctx, startX + halfWidth + 2, startY, halfWidth - 2, gateHeight, config.pickets);
      } else if (config.style === "Both") {
        drawArch(ctx, startX, startY, halfWidth - 2, gateHeight, config.pickets);
        drawArch(ctx, startX + halfWidth + 2, startY, halfWidth - 2, gateHeight, config.pickets);
        drawFinials(ctx, startX, startY, halfWidth - 2, gateHeight, config.pickets);
        drawFinials(ctx, startX + halfWidth + 2, startY, halfWidth - 2, gateHeight, config.pickets);
      }
      
    } else {
      // Single panel
      ctx.beginPath();
      ctx.rect(startX, startY, gateWidth, gateHeight);
      ctx.stroke();
      
      // Add horizontal bar
      ctx.beginPath();
      ctx.moveTo(startX, startY + gateHeight/2);
      ctx.lineTo(startX + gateWidth, startY + gateHeight/2);
      ctx.stroke();
      
      // Draw pickets
      drawPickets(ctx, startX, startY, gateWidth, gateHeight, config.pickets, 16);
      
      // Draw arch if selected
      if (config.style === "Arch") {
        drawArch(ctx, startX, startY, gateWidth, gateHeight, config.pickets);
      } else if (config.style === "Finials") {
        drawFinials(ctx, startX, startY, gateWidth, gateHeight, config.pickets);
      } else if (config.style === "Both") {
        drawArch(ctx, startX, startY, gateWidth, gateHeight, config.pickets);
        drawFinials(ctx, startX, startY, gateWidth, gateHeight, config.pickets);
      }
    }
    
    // Draw dimensions
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.fillText(`${config.width}' 0"`, startX + gateWidth/2 - 15, startY + gateHeight + 30);
    ctx.fillText("6' 0\"", startX - 40, startY + gateHeight/2 + 5);
    
    // Draw dimension lines
    ctx.beginPath();
    ctx.moveTo(startX - 10, startY);
    ctx.lineTo(startX - 30, startY);
    ctx.moveTo(startX - 20, startY);
    ctx.lineTo(startX - 20, startY + gateHeight);
    ctx.moveTo(startX - 30, startY + gateHeight);
    ctx.lineTo(startX - 10, startY + gateHeight);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(startX, startY + gateHeight + 10);
    ctx.lineTo(startX, startY + gateHeight + 20);
    ctx.moveTo(startX, startY + gateHeight + 15);
    ctx.lineTo(startX + gateWidth, startY + gateHeight + 15);
    ctx.moveTo(startX + gateWidth, startY + gateHeight + 10);
    ctx.lineTo(startX + gateWidth, startY + gateHeight + 20);
    ctx.stroke();
  };
  
  // Helper function to draw pickets
  const drawPickets = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, type: string, count: number) => {
    const picketWidth = type === "Double" ? 10 : 5;
    const picketSpacing = (width - (picketWidth * count)) / (count - 1);
    
    ctx.lineWidth = picketWidth;
    ctx.strokeStyle = '#333';
    
    for (let i = 0; i < count; i++) {
      const picketX = x + (i * (picketWidth + picketSpacing));
      ctx.beginPath();
      ctx.moveTo(picketX, y + 5);
      ctx.lineTo(picketX, y + height - 5);
      ctx.stroke();
    }
  };
  
  // Helper function to draw arch
  const drawArch = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, picketType: string) => {
    const archHeight = 30;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(
      x + width/2, y - archHeight,
      x + width/2, y - archHeight,
      x + width, y
    );
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 5;
    ctx.stroke();
  };
  
  // Helper function to draw finials
  const drawFinials = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, picketType: string) => {
    const picketWidth = picketType === "Double" ? 10 : 5;
    const picketSpacing = (width - (picketWidth * 8)) / 7;
    
    for (let i = 0; i < 8; i++) {
      const picketX = x + (i * (picketWidth + picketSpacing));
      
      ctx.beginPath();
      ctx.arc(picketX, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#333';
      ctx.fill();
    }
  };
  
  // Update price adjustments
  const handleKitChange = (value: string) => {
    setKitType(value);
    switch(value) {
      case "None": setKitPrice(0); break;
      case "Swing": setKitPrice(500); break;
      case "Slide": setKitPrice(750); break;
      default: setKitPrice(500);
    }
  };
  
  const handlePanelsChange = (value: string) => {
    setPanels(value);
    switch(value) {
      case "Solo": setPanelsPrice(0); break;
      case "Dual": setPanelsPrice(0); break;
      default: setPanelsPrice(0);
    }
  };
  
  const handleStyleChange = (value: string) => {
    setStyle(value);
    switch(value) {
      case "None": setStylePrice(0); break;
      case "Arch": setStylePrice(266); break;
      case "Finials": setStylePrice(320); break;
      case "Both": setStylePrice(450); break;
      default: setStylePrice(266);
    }
  };
  
  const handlePicketsChange = (value: string) => {
    setPickets(value);
    switch(value) {
      case "None": setPicketsPrice(0); break;
      case "Single": setPicketsPrice(532); break;
      case "Puppy": setPicketsPrice(600); break;
      case "Double": setPicketsPrice(750); break;
      default: setPicketsPrice(532);
    }
  };
  
  const handleIronwoodChange = (value: string) => {
    setIronwood(value);
    switch(value) {
      case "None": setIronwoodPrice(0); break;
      case "Vertical": setIronwoodPrice(200); break;
      case "Horizontal": setIronwoodPrice(250); break;
      case "DIY": setIronwoodPrice(100); break;
      default: setIronwoodPrice(0);
    }
  };
  
  const handleAccessChange = (value: string) => {
    setAccess(value);
    switch(value) {
      case "None": setAccessPrice(0); break;
      case "Manual": setAccessPrice(75); break;
      case "Automatic": setAccessPrice(550); break;
      default: setAccessPrice(75);
    }
  };
  
  // Sample gate products for the catalog section
  const products: Product[] = [
    {
      id: 1,
      name: 'Modern Arched Gate',
      description: 'Elegant design with premium materials',
      price: 1299,
      image: 'https://cdn.pixabay.com/photo/2015/09/16/08/55/online-942406_1280.jpg',
      category: 'Driveway',
      tag: 'POPULAR',
      features: ['Aluminum construction', 'Custom sizing', 'Swing or sliding options', 'Multiple color options']
    },
    {
      id: 2,
      name: 'Security Sliding Gate',
      description: 'Maximum security with modern aesthetic',
      price: 1599,
      image: 'https://cdn.pixabay.com/photo/2015/09/16/08/55/online-942406_1280.jpg',
      category: 'Driveway',
      features: ['Steel construction', 'Smart lock compatibility', 'Remote control included', 'Weather resistant']
    },
    {
      id: 3,
      name: 'Classic Wrought Iron',
      description: 'Timeless design with modern functionality',
      price: 1899,
      image: 'https://cdn.pixabay.com/photo/2015/09/16/08/55/online-942406_1280.jpg',
      category: 'Garden',
      tag: 'BESTSELLER',
      features: ['Wrought iron construction', 'Decorative elements', 'Rust-resistant coating', 'Traditional craftsmanship']
    },
    {
      id: 4,
      name: 'Smart Security Gate',
      description: 'App-controlled with advanced security',
      price: 2199,
      image: 'https://cdn.pixabay.com/photo/2015/09/16/08/55/online-942406_1280.jpg',
      category: 'Driveway',
      features: ['IoT integration', 'Camera and intercom', 'Smartphone control', 'Voice assistant compatible']
    },
    {
      id: 5,
      name: 'Contemporary Pivot Gate',
      description: 'Modern design with unique pivot mechanism',
      price: 2499,
      image: 'https://cdn.pixabay.com/photo/2015/09/16/08/55/online-942406_1280.jpg',
      category: 'Driveway',
      features: ['Unique pivot design', 'Minimal space requirements', 'Custom sizes available', 'Premium materials']
    },
    {
      id: 6,
      name: 'Garden Arch Gate',
      description: 'Beautiful garden entrance with climbing plant support',
      price: 1199,
      image: 'https://cdn.pixabay.com/photo/2015/09/16/08/55/online-942406_1280.jpg',
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
      
      {/* Gate Configurator Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-slate-900 text-center mb-12">CUSTOM GATE</h2>
          <p className="text-center text-slate-600 mb-8">
            {width}ft {kitType === "Swing" ? "6in" : "0in"} Wide, {kitType} Kit, {panels} Panels, {style} Style, {pickets} Pickets, {access} Access, ~{weight}lbs
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
            {/* Left side: Gate Preview */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <canvas
                  ref={canvasRef}
                  className="w-full h-auto border border-slate-200 rounded-lg"
                  width="400"
                  height="300"
                ></canvas>
              </div>
            </div>
            
            {/* Right side: Configuration Options */}
            <div className="lg:col-span-4">
              <div className="space-y-6">
                {/* Width Configuration */}
                <div className="bg-white rounded-lg shadow-sm p-4 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white font-medium mr-2">1</span>
                      <h3 className="text-lg font-medium">Width</h3>
                    </div>
                    <div className="text-green-500 font-medium">+${basePrice}</div>
                    <div className="flex items-center text-slate-400">
                      <button className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors">?</button>
                    </div>
                  </div>
                  
                  <Slider
                    defaultValue={[width]}
                    max={16}
                    min={8}
                    step={1}
                    onValueChange={(value) => setWidth(value[0])}
                    className="mb-2"
                  />
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-10 flex items-center justify-center border border-slate-200 rounded-md bg-slate-50">
                      None
                    </div>
                    <div className="h-10 flex items-center justify-center border-2 border-yellow-500 rounded-md bg-yellow-50">
                      {width}' 0"
                    </div>
                    <div className="h-10 flex items-center justify-center border border-slate-200 rounded-md bg-slate-50">
                      Slide
                    </div>
                  </div>
                </div>
                
                {/* Kit Selection */}
                <div className="bg-white rounded-lg shadow-sm p-4 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white font-medium mr-2">2</span>
                      <h3 className="text-lg font-medium">Kit</h3>
                    </div>
                    <div className="text-green-500 font-medium">+${kitPrice}</div>
                    <div className="flex items-center text-slate-400">
                      <button className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors">?</button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div 
                      className={`h-10 flex items-center justify-center border ${kitType === "None" ? "border-2 border-yellow-500 bg-yellow-50" : "border-slate-200 bg-slate-50"} rounded-md cursor-pointer`}
                      onClick={() => handleKitChange("None")}
                    >
                      None
                    </div>
                    <div 
                      className={`h-10 flex items-center justify-center border ${kitType === "Swing" ? "border-2 border-yellow-500 bg-yellow-50" : "border-slate-200 bg-slate-50"} rounded-md cursor-pointer`}
                      onClick={() => handleKitChange("Swing")}
                    >
                      Swing
                    </div>
                    <div 
                      className={`h-10 flex items-center justify-center border ${kitType === "Slide" ? "border-2 border-yellow-500 bg-yellow-50" : "border-slate-200 bg-slate-50"} rounded-md cursor-pointer`}
                      onClick={() => handleKitChange("Slide")}
                    >
                      Slide
                    </div>
                  </div>
                </div>
                
                {/* Panels Selection */}
                <div className="bg-white rounded-lg shadow-sm p-4 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white font-medium mr-2">3</span>
                      <h3 className="text-lg font-medium">Panels</h3>
                    </div>
                    <div className="text-green-500 font-medium">+${panelsPrice}</div>
                    <div className="flex items-center text-slate-400">
                      <button className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors">?</button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div 
                      className={`h-10 flex items-center justify-center border ${panels === "Solo" ? "border-2 border-yellow-500 bg-yellow-50" : "border-slate-200 bg-slate-50"} rounded-md cursor-pointer`}
                      onClick={() => handlePanelsChange("Solo")}
                    >
                      Solo
                    </div>
                    <div 
                      className={`h-10 flex items-center justify-center border ${panels === "Dual" ? "border-2 border-yellow-500 bg-yellow-50" : "border-slate-200 bg-slate-50"} rounded-md cursor-pointer`}
                      onClick={() => handlePanelsChange("Dual")}
                    >
                      Dual
                    </div>
                  </div>
                </div>
                
                {/* Style Selection */}
                <div className="bg-white rounded-lg shadow-sm p-4 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white font-medium mr-2">4</span>
                      <h3 className="text-lg font-medium">Style</h3>
                    </div>
                    <div className="text-green-500 font-medium">+${stylePrice}</div>
                    <div className="flex items-center text-slate-400">
                      <button className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors">?</button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    <div 
                      className={`h-10 flex items-center justify-center border ${style === "None" ? "border-2 border-yellow-500 bg-yellow-50" : "border-slate-200 bg-slate-50"} rounded-md cursor-pointer`}
                      onClick={() => handleStyleChange("None")}
                    >
                      None
                    </div>
                    <div 
                      className={`h-10 flex items-center justify-center border ${style === "Arch" ? "border-2 border-yellow-500 bg-yellow-50" : "border-slate-200 bg-slate-50"} rounded-md cursor-pointer`}
                      onClick={() => handleStyleChange("Arch")}
                    >
                      Arch
                    </div>
                    <div 
                      className={`h-10 flex items-center justify-center border ${style === "Finials" ? "border-2 border-yellow-500 bg-yellow-50" : "border-slate-200 bg-slate-50"} rounded-md cursor-pointer`}
                      onClick={() => handleStyleChange("Finials")}
                    >
                      Finials
                    </div>
                    <div 
                      className={`h-10 flex items-center justify-center border ${style === "Both" ? "border-2 border-yellow-500 bg-yellow-50" : "border-slate-200 bg-slate-50"} rounded-md cursor-pointer`}
                      onClick={() => handleStyleChange("Both")}
                    >
                      Both
                    </div>
                  </div>
                </div>
                
                {/* Pickets Selection */}
                <div className="bg-white rounded-lg shadow-sm p-4 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white font-medium mr-2">5</span>
                      <h3 className="text-lg font-medium">Pickets</h3>
                    </div>
                    <div className="text-green-500 font-medium">+${picketsPrice}</div>
                    <div className="flex items-center text-slate-400">
                      <button className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors">?</button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    <div 
                      className={`h-10 flex items-center justify-center border ${pickets === "None" ? "border-2 border-yellow-500 bg-yellow-50" : "border-slate-200 bg-slate-50"} rounded-md cursor-pointer`}
                      onClick={() => handlePicketsChange("None")}
                    >
                      None
                    </div>
                    <div 
                      className={`h-10 flex items-center justify-center border ${pickets === "Single" ? "border-2 border-yellow-500 bg-yellow-50" : "border-slate-200 bg-slate-50"} rounded-md cursor-pointer`}
                      onClick={() => handlePicketsChange("Single")}
                    >
                      Single
                    </div>
                    <div 
                      className={`h-10 flex items-center justify-center border ${pickets === "Puppy" ? "border-2 border-yellow-500 bg-yellow-50" : "border-slate-200 bg-slate-50"} rounded-md cursor-pointer`}
                      onClick={() => handlePicketsChange("Puppy")}
                    >
                      Puppy
                    </div>
                    <div 
                      className={`h-10 flex items-center justify-center border ${pickets === "Double" ? "border-2 border-yellow-500 bg-yellow-50" : "border-slate-200 bg-slate-50"} rounded-md cursor-pointer`}
                      onClick={() => handlePicketsChange("Double")}
                    >
                      Double
                    </div>
                  </div>
                </div>
                
                {/* Ironwood Selection */}
                <div className="bg-white rounded-lg shadow-sm p-4 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white font-medium mr-2">6</span>
                      <h3 className="text-lg font-medium">Ironwood</h3>
                    </div>
                    <div className="text-green-500 font-medium">+${ironwoodPrice}</div>
                    <div className="flex items-center text-slate-400">
                      <button className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors">?</button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    <div 
                      className={`h-10 flex items-center justify-center border ${ironwood === "None" ? "border-2 border-yellow-500 bg-yellow-50" : "border-slate-200 bg-slate-50"} rounded-md cursor-pointer`}
                      onClick={() => handleIronwoodChange("None")}
                    >
                      None
                    </div>
                    <div 
                      className={`h-10 flex items-center justify-center border ${ironwood === "Vertical" ? "border-2 border-yellow-500 bg-yellow-50" : "border-slate-200 bg-slate-50"} rounded-md cursor-pointer`}
                      onClick={() => handleIronwoodChange("Vertical")}
                    >
                      Vertical
                    </div>
                    <div 
                      className={`h-10 flex items-center justify-center border ${ironwood === "Horizontal" ? "border-2 border-yellow-500 bg-yellow-50" : "border-slate-200 bg-slate-50"} rounded-md cursor-pointer`}
                      onClick={() => handleIronwoodChange("Horizontal")}
                    >
                      Horizontal
                    </div>
                    <div 
                      className={`h-10 flex items-center justify-center border ${ironwood === "DIY" ? "border-2 border-yellow-500 bg-yellow-50" : "border-slate-200 bg-slate-50"} rounded-md cursor-pointer`}
                      onClick={() => handleIronwoodChange("DIY")}
                    >
                      DIY
                    </div>
                  </div>
                </div>
                
                {/* Access Selection */}
                <div className="bg-white rounded-lg shadow-sm p-4 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white font-medium mr-2">7</span>
                      <h3 className="text-lg font-medium">Access</h3>
                    </div>
                    <div className="text-green-500 font-medium">+${accessPrice}</div>
                    <div className="flex items-center text-slate-400">
                      <button className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition-colors">?</button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div 
                      className={`h-10 flex items-center justify-center border ${access === "None" ? "border-2 border-yellow-500 bg-yellow-50" : "border-slate-200 bg-slate-50"} rounded-md cursor-pointer`}
                      onClick={() => handleAccessChange("None")}
                    >
                      None
                    </div>
                    <div 
                      className={`h-10 flex items-center justify-center border ${access === "Manual" ? "border-2 border-yellow-500 bg-yellow-50" : "border-slate-200 bg-slate-50"} rounded-md cursor-pointer`}
                      onClick={() => handleAccessChange("Manual")}
                    >
                      Manual
                    </div>
                    <div 
                      className={`h-10 flex items-center justify-center border ${access === "Automatic" ? "border-2 border-yellow-500 bg-yellow-50" : "border-slate-200 bg-slate-50"} rounded-md cursor-pointer`}
                      onClick={() => handleAccessChange("Automatic")}
                    >
                      Automatic
                    </div>
                  </div>
                </div>
                
                {/* Order Button */}
                <div className="flex items-center justify-between py-4">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-6 text-lg rounded-md w-full">
                    Add To Cart - ${totalPrice}
                  </Button>
                </div>
                
                <div className="text-center text-sm text-slate-600">
                  <div className="font-semibold">Est. Ships In: 2 Weeks</div>
                  <div className="mt-1">
                    Need your gate much sooner?<br/>
                    Select <span className="text-blue-500">Expedite</span> during checkout.
                  </div>
                </div>
              </div>
            </div>
          </div>
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
