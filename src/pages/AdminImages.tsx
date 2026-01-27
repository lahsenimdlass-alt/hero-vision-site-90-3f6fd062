import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Save, Image as ImageIcon } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SiteImage {
  id: string;
  section_key: string;
  image_url: string;
  alt_text: string | null;
}

const SITE_SECTIONS = [
  { key: 'logo', label: 'Logo (Header & Footer)', description: 'Logo utilisé dans la navigation et le pied de page' },
  { key: 'hero_background', label: 'Arrière-plan Hero', description: 'Image de fond de la section hero' },
  { key: 'about_image', label: 'Image À Propos', description: 'Image principale de la section à propos' },
  { key: 'services_image', label: 'Image Services', description: 'Image de la section services' },
  { key: 'team_image', label: 'Image Équipe', description: "Photo de l'équipe" },
  { key: 'directrice_image', label: 'Photo Directrice', description: 'Photo de la directrice' },
  { key: 'formation_image', label: 'Image Formation', description: 'Image de la page formation' },
  { key: 'recrutement_image', label: 'Image Recrutement', description: 'Image de la page recrutement' },
  { key: 'accompagnement_image', label: 'Image Accompagnement', description: 'Image de la page accompagnement' },
  { key: 'controle_gestion_image', label: 'Image Contrôle de Gestion', description: 'Image de la page contrôle de gestion' },
  { key: 'contact_image', label: 'Image Contact', description: 'Image de la page contact' },
];

const AdminImages = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [siteImages, setSiteImages] = useState<Record<string, SiteImage>>({});
  const [formData, setFormData] = useState<Record<string, { url: string; alt: string }>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [storageImages, setStorageImages] = useState<{ name: string; url: string }[]>([]);
  const [loadingStorage, setLoadingStorage] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchSiteImages();
      fetchStorageImages();
    }
  }, [user, isAdmin]);

  const fetchSiteImages = async () => {
    const { data, error } = await supabase
      .from('site_images')
      .select('*');

    if (!error && data) {
      const imagesMap: Record<string, SiteImage> = {};
      const formDataInit: Record<string, { url: string; alt: string }> = {};
      
      data.forEach((img) => {
        imagesMap[img.section_key] = img;
        formDataInit[img.section_key] = {
          url: img.image_url,
          alt: img.alt_text || '',
        };
      });
      
      setSiteImages(imagesMap);
      
      // Initialize form data for all sections
      SITE_SECTIONS.forEach((section) => {
        if (!formDataInit[section.key]) {
          formDataInit[section.key] = { url: '', alt: '' };
        }
      });
      setFormData(formDataInit);
    }
  };

  const fetchStorageImages = async () => {
    setLoadingStorage(true);
    try {
      const { data, error } = await supabase.storage
        .from('images')
        .list('', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });

      if (!error && data) {
        // Get all files including nested folders
        const allFiles: { name: string; url: string }[] = [];
        
        for (const item of data) {
          if (!item.id) {
            // It's a folder, list its contents
            const { data: folderData } = await supabase.storage
              .from('images')
              .list(item.name, { limit: 100 });
            
            if (folderData) {
              for (const file of folderData) {
                if (file.id) {
                  const { data: { publicUrl } } = supabase.storage
                    .from('images')
                    .getPublicUrl(`${item.name}/${file.name}`);
                  allFiles.push({ name: `${item.name}/${file.name}`, url: publicUrl });
                }
              }
            }
          } else {
            const { data: { publicUrl } } = supabase.storage
              .from('images')
              .getPublicUrl(item.name);
            allFiles.push({ name: item.name, url: publicUrl });
          }
        }
        
        setStorageImages(allFiles);
      }
    } catch (error) {
      console.error('Error fetching storage images:', error);
    } finally {
      setLoadingStorage(false);
    }
  };

  const handleSaveSection = async (sectionKey: string) => {
    const data = formData[sectionKey];
    if (!data?.url) {
      toast({
        title: 'Erreur',
        description: 'Veuillez sélectionner une image.',
        variant: 'destructive',
      });
      return;
    }

    setSaving(sectionKey);

    try {
      const existing = siteImages[sectionKey];
      
      if (existing) {
        const { error } = await supabase
          .from('site_images')
          .update({
            image_url: data.url,
            alt_text: data.alt || null,
            updated_by: user?.id,
          })
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('site_images')
          .insert({
            section_key: sectionKey,
            image_url: data.url,
            alt_text: data.alt || null,
            updated_by: user?.id,
          });

        if (error) throw error;
      }

      toast({
        title: 'Image enregistrée',
        description: 'L\'image a été mise à jour avec succès.',
      });

      // Force refresh des images côté site (navigation, footer, etc.)
      queryClient.invalidateQueries({ queryKey: ['site_image', sectionKey] });
      queryClient.invalidateQueries({ queryKey: ['site_image', 'logo'] });

      fetchSiteImages();
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSaving(null);
    }
  };

  const handleDeleteStorageImage = async (filePath: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) return;

    try {
      const { error } = await supabase.storage
        .from('images')
        .remove([filePath]);

      if (error) throw error;

      toast({
        title: 'Image supprimée',
        description: 'L\'image a été supprimée du stockage.',
      });
      
      fetchStorageImages();
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    }
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
            <h1 className="text-3xl font-bold text-navy">Gestion des Images</h1>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/admin/content')}
              >
                Contenu
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/admin/blogs')}
              >
                Articles
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>

          <Tabs defaultValue="sections" className="space-y-6">
            <TabsList>
              <TabsTrigger value="sections">Images des Sections</TabsTrigger>
              <TabsTrigger value="library">Bibliothèque</TabsTrigger>
            </TabsList>

            <TabsContent value="sections">
              <div className="grid md:grid-cols-2 gap-6">
                {SITE_SECTIONS.map((section) => (
                  <div
                    key={section.key}
                    className="bg-card rounded-2xl shadow-soft p-6 space-y-4"
                  >
                    <div>
                      <h3 className="font-semibold text-navy flex items-center gap-2">
                        <ImageIcon className="w-5 h-5" />
                        {section.label}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {section.description}
                      </p>
                    </div>

                    <ImageUpload
                      currentImageUrl={formData[section.key]?.url}
                      onImageChange={(url) =>
                        setFormData({
                          ...formData,
                          [section.key]: { ...formData[section.key], url },
                        })
                      }
                      folder={section.key}
                    />

                    <div className="space-y-2">
                      <Label htmlFor={`alt-${section.key}`}>Texte alternatif</Label>
                      <Input
                        id={`alt-${section.key}`}
                        value={formData[section.key]?.alt || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [section.key]: { ...formData[section.key], alt: e.target.value },
                          })
                        }
                        placeholder="Description de l'image..."
                      />
                    </div>

                    <Button
                      onClick={() => handleSaveSection(section.key)}
                      disabled={saving === section.key}
                      className="w-full bg-navy hover:bg-navy/90"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {saving === section.key ? 'Enregistrement...' : 'Enregistrer'}
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="library">
              <div className="bg-card rounded-2xl shadow-soft p-6">
                <h3 className="font-semibold text-navy mb-4">
                  Toutes les images ({storageImages.length})
                </h3>
                
                {loadingStorage ? (
                  <p className="text-muted-foreground">Chargement...</p>
                ) : storageImages.length === 0 ? (
                  <p className="text-muted-foreground">Aucune image dans le stockage.</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {storageImages.map((image) => (
                      <div key={image.name} className="group relative">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-32 object-cover rounded-lg border"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteStorageImage(image.name)}
                          >
                            Supprimer
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 truncate">
                          {image.name}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default AdminImages;
