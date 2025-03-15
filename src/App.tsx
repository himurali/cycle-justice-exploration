
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ShortFilms from "./pages/ShortFilms";
import Documentaries from "./pages/Documentaries";
import Interviews from "./pages/Interviews";
import Stories from "./pages/Stories";
import AdvocateStories from "./pages/AdvocateStories";
import TransformationStories from "./pages/TransformationStories";
import CommunityChampions from "./pages/CommunityChampions";
import StoryDetail from "./pages/StoryDetail";
import Books from "./pages/Books";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/short-films" element={<ShortFilms />} />
          <Route path="/documentaries" element={<Documentaries />} />
          <Route path="/interviews" element={<Interviews />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/advocate-stories" element={<AdvocateStories />} />
          <Route path="/city-transformations" element={<TransformationStories />} />
          <Route path="/community-champions" element={<CommunityChampions />} />
          <Route path="/story/:slug" element={<StoryDetail />} />
          <Route path="/books" element={<Books />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
