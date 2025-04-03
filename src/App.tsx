import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import Compare from "@/pages/Compare";
import SchoolProfile from "@/pages/SchoolProfile";
import Match from "@/pages/Match";
import NotFound from "@/pages/not-found";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoutes";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from "sonner";
import ProfileNav from "./components/ProfileNav";
import Onboarding from "./pages/Onboarding";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/login" component={Login} />
      <Layout>
        <ProtectedRoute path="/dashboard" component={Home} />
        <ProtectedRoute path="/profile" component={ProfileNav} />
        <Route path="/schools/:id" component={SchoolProfile} />
        <ProtectedRoute path="/compare" component={Compare} />
        <Route path="/match" component={Match} />
        <Route component={NotFound} />
      </Layout>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster
          position="top-right" richColors expand closeButton theme="light"
          duration={4000} visibleToasts={3} toastOptions={{
            style: {
              fontFamily: "Source Sans Pro, sans-serif",
              fontSize: "20px",
              color: "#b91c1c",
              padding: "12px 16px",
              borderRadius: "8px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
