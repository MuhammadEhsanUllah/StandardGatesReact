import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Gates from "@/pages/gates";
import Fences from "@/pages/fences";
import Features from "@/pages/features";
import Gallery from "@/pages/gallery";
import Parts from "@/pages/parts";
import Extras from "@/pages/extras";
import FenceAndGates from "@/pages/fence-and-gates";
import CustomGate from "@/pages/custom-gate";
import CustomFence from "@/pages/custom-fence";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

function Router() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/gates" component={Gates} />
        <Route path="/fences" component={Fences} />
        <Route path="/features" component={Features} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/parts" component={Parts} />
        <Route path="/extras" component={Extras} />
        <Route path="/fence-and-gates" component={FenceAndGates} />
        <Route path="/custom-gate" component={CustomGate} />
        <Route path="/custom-fence" component={CustomFence} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
