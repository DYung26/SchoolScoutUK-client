import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { NavBar } from "@/components/NavBar";
import Home from "@/pages/Home";
import SchoolProfile from "@/pages/SchoolProfile";
import Compare from "@/pages/Compare";
import Match from "@/pages/Match";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/search" component={Home} />
        <Route path="/schools/:id" component={SchoolProfile} />
        <Route path="/compare" component={Compare} />
        <Route path="/match" component={Match} />
        <Route component={NotFound} />
      </Switch>
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