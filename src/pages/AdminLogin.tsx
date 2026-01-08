import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Lock, Mail } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, isAdmin, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already admin
  if (user && isAdmin) {
    navigate('/admin/blogs');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast({
        title: 'Erreur de connexion',
        description: 'Email ou mot de passe incorrect',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    // Wait a moment for the auth state to update
    setTimeout(() => {
      setIsLoading(false);
      navigate('/admin/blogs');
    }, 500);
  };

  return (
    <Layout>
      <section className="py-20 min-h-[70vh] flex items-center">
        <div className="container-custom">
          <div className="max-w-md mx-auto">
            <div className="bg-card rounded-2xl shadow-elegant p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-gold" />
                </div>
                <h1 className="text-2xl font-bold text-navy">Administration</h1>
                <p className="text-muted-foreground mt-2">Connectez-vous pour gérer les articles</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      placeholder="admin@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-navy hover:bg-navy/90 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? 'Connexion...' : 'Se connecter'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminLogin;
