import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import Accompagnement from "./pages/Accompagnement";
import Recrutement from "./pages/Recrutement";
import Formation from "./pages/Formation";
import ControleGestion from "./pages/ControleGestion";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AdminLogin from "./pages/AdminLogin";
import AdminBlogs from "./pages/AdminBlogs";
import AdminImages from "./pages/AdminImages";
import AdminContent from "./pages/AdminContent";
import NotFound from "./pages/NotFound";
import AnalyticsTracker from "./components/AnalyticsTracker";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnalyticsTracker />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/accompagnement" element={<Accompagnement />} />
              <Route path="/recrutement" element={<Recrutement />} />
              <Route path="/formation" element={<Formation />} />
              <Route path="/controle-gestion" element={<ControleGestion />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/blogs" element={<AdminBlogs />} />
              <Route path="/admin/images" element={<AdminImages />} />
              <Route path="/admin/content" element={<AdminContent />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
