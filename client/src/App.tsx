import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { NavBar } from "@/components/NavBar";
import Home from "@/pages/Home";
import SchoolProfile from "@/pages/SchoolProfile";
import Compare from "@/pages/Compare";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/schools/:id" component={SchoolProfile} />
        <Route path="/compare" component={Compare} />
        <Route component={NotFound} />
      </Switch>
    </div>
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