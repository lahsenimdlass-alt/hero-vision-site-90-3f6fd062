import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, LogOut, Eye, EyeOff, Image as ImageIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ImageUpload from '@/components/admin/ImageUpload';

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  image_url: string | null;
  published: boolean;
  created_at: string;
}

const AdminBlogs = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    image_url: '',
    published: false,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchBlogs();
    }
  }, [user, isAdmin]);

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setBlogs(data);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const slug = generateSlug(formData.title);
    const blogData = {
      title: formData.title,
      slug,
      content: formData.content,
      excerpt: formData.excerpt || null,
      image_url: formData.image_url || null,
      published: formData.published,
      author_id: user?.id,
    };

    let error;
    if (editingBlog) {
      const result = await supabase
        .from('blogs')
        .update(blogData)
        .eq('id', editingBlog.id);
      error = result.error;
    } else {
      const result = await supabase.from('blogs').insert([blogData]);
      error = result.error;
    }

    if (error) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: editingBlog ? 'Article modifié' : 'Article créé',
        description: 'L\'opération a été effectuée avec succès.',
      });
      resetForm();
      fetchBlogs();
    }
    setSaving(false);
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt || '',
      image_url: blog.image_url || '',
      published: blog.published,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return;

    const { error } = await supabase.from('blogs').delete().eq('id', id);

    if (error) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Article supprimé',
        description: 'L\'article a été supprimé avec succès.',
      });
      fetchBlogs();
    }
  };

  const togglePublish = async (blog: Blog) => {
    const { error } = await supabase
      .from('blogs')
      .update({ published: !blog.published })
      .eq('id', blog.id);

    if (!error) {
      fetchBlogs();
      toast({
        title: blog.published ? 'Article dépublié' : 'Article publié',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      image_url: '',
      published: false,
    });
    setEditingBlog(null);
    setIsDialogOpen(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <p>Chargement...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-navy">Gestion des Articles</h1>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/admin/content')}
              >
                Contenu
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/admin/images')}
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Images
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-gold hover:bg-gold/90 text-navy"
                    onClick={() => resetForm()}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvel Article
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingBlog ? 'Modifier l\'article' : 'Nouvel article'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Titre *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Résumé</Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) =>
                          setFormData({ ...formData, excerpt: e.target.value })
                        }
                        rows={2}
                        placeholder="Court résumé de l'article..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">Contenu *</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) =>
                          setFormData({ ...formData, content: e.target.value })
                        }
                        rows={10}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Image de l'article</Label>
                      <ImageUpload
                        currentImageUrl={formData.image_url}
                        onImageChange={(url) =>
                          setFormData({ ...formData, image_url: url })
                        }
                        folder="blogs"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <Switch
                        id="published"
                        checked={formData.published}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, published: checked })
                        }
                      />
                      <Label htmlFor="published">Publier immédiatement</Label>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetForm}
                        className="flex-1"
                      >
                        Annuler
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-navy hover:bg-navy/90"
                        disabled={saving}
                      >
                        {saving ? 'Enregistrement...' : 'Enregistrer'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>

              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>

          {/* Blog List */}
          <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
            {blogs.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-muted-foreground">Aucun article pour le moment.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="p-6 flex items-center justify-between gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-navy truncate">
                          {blog.title}
                        </h3>
                        {blog.published ? (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                            Publié
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                            Brouillon
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {blog.excerpt || blog.content.substring(0, 100)}...
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => togglePublish(blog)}
                        title={blog.published ? 'Dépublier' : 'Publier'}
                      >
                        {blog.published ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(blog)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(blog.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminBlogs;
