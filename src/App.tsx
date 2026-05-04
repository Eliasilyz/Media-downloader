import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import TiktokPage from "@/pages/TiktokPage";
import InstagramPage from "@/pages/InstagramPage";
import FacebookPage from "@/pages/FacebookPage";
import TwitterPage from "@/pages/TwitterPage";
import YoutubePage from "@/pages/YoutubePage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
    },
    mutations: {
      retry: 0,
    },
  },
});

function Router() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route key="home" path="/" component={Home} />
        <Route key="tiktok" path="/dl/tiktok" component={TiktokPage} />
        <Route key="instagram" path="/dl/instagram" component={InstagramPage} />
        <Route key="facebook" path="/dl/facebook" component={FacebookPage} />
        <Route key="twitter" path="/dl/twitter" component={TwitterPage} />
        <Route key="youtube" path="/dl/youtube" component={YoutubePage} />
        <Route key="notfound" component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1F2937",
              border: "1px solid #374151",
              color: "#F9FAFB",
            },
          }}
        />
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
