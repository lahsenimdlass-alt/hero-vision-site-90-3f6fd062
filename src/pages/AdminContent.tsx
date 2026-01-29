import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  LogOut,
  Save,
  RotateCcw,
  Image as ImageIcon,
  FileText,
  Search,
  Bold,
  Minus,
  Plus,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { translations, Language } from "@/i18n/translations";
import {
  useAllSiteContent,
  useUpsertContent,
  useDeleteContent,
  getTranslationStructure,
} from "@/hooks/useSiteContent";

const pageLabels: Record<string, { fr: string; en: string }> = {
  nav: { fr: "Navigation", en: "Navigation" },
  hero: { fr: "Section Héro", en: "Hero Section" },
  director: { fr: "Mot de la Direction", en: "Director's Message" },
  about: { fr: "À Propos", en: "About" },
  why: { fr: "Pourquoi Nous Choisir", en: "Why Choose Us" },
  values: { fr: "Nos Valeurs", en: "Our Values" },
  cta: { fr: "Appel à l'Action", en: "Call to Action" },
  footer: { fr: "Pied de Page", en: "Footer" },
  contact: { fr: "Page Contact", en: "Contact Page" },
  accompagnement: { fr: "Conseil & Accompagnement", en: "Consulting & Support" },
  recrutement: { fr: "Recrutement", en: "Recruitment" },
  formation: { fr: "Formation", en: "Training" },
  controle: { fr: "Contrôle de Gestion", en: "Management Control" },
  blog: { fr: "Blog", en: "Blog" },
  common: { fr: "Éléments Communs", en: "Common Elements" },
};

const AdminContent = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("fr");
  const [searchTerm, setSearchTerm] = useState("");
  const [editedContent, setEditedContent] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const { data: dbContent, isLoading: loadingContent } = useAllSiteContent();
  const upsertMutation = useUpsertContent();
  const deleteMutation = useDeleteContent();

  const translationStructure = useMemo(() => getTranslationStructure(), []);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin");
    }
  }, [user, isAdmin, loading, navigate]);

  // Get current value for a key (from edited state, db, or static translations)
  const getCurrentValue = (key: string, lang: Language): string => {
    const editKey = `${key}_${lang}`;
    if (editedContent[editKey] !== undefined) {
      return editedContent[editKey];
    }

    const dbValue = dbContent?.find(
      (c) => c.content_key === key && c.language === lang
    );
    if (dbValue) {
      return dbValue.content;
    }

    return (translations[lang] as Record<string, string>)[key] || key;
  };

  // Check if a value has been modified from the static translation
  const isModified = (key: string, lang: Language): boolean => {
    const dbValue = dbContent?.find(
      (c) => c.content_key === key && c.language === lang
    );
    return !!dbValue;
  };

  // Handle content change
  const handleContentChange = (key: string, lang: Language, value: string) => {
    const editKey = `${key}_${lang}`;
    setEditedContent((prev) => ({ ...prev, [editKey]: value }));
  };

  // Save a single content item
  const handleSave = async (key: string, lang: Language) => {
    const editKey = `${key}_${lang}`;
    const value = editedContent[editKey];
    if (value === undefined) return;

    const parts = key.split(".");
    const page = parts[0];
    const section = parts.length > 2 ? parts[1] : "main";

    setSaving(true);
    try {
      await upsertMutation.mutateAsync({
        content_key: key,
        language: lang,
        content: value,
        page,
        section,
      });

      // Clear from edited state
      setEditedContent((prev) => {
        const newState = { ...prev };
        delete newState[editKey];
        return newState;
      });

      toast({
        title: "Contenu enregistré",
        description: `Le contenu a été mis à jour avec succès.`,
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
    setSaving(false);
  };

  // Reset to static translation
  const handleReset = async (key: string, lang: Language) => {
    const dbValue = dbContent?.find(
      (c) => c.content_key === key && c.language === lang
    );
    if (dbValue) {
      try {
        await deleteMutation.mutateAsync(dbValue.id);
        toast({
          title: "Contenu réinitialisé",
          description: `Le contenu a été réinitialisé à la valeur par défaut.`,
        });
      } catch (error: any) {
        toast({
          title: "Erreur",
          description: error.message,
          variant: "destructive",
        });
      }
    }

    // Clear from edited state
    const editKey = `${key}_${lang}`;
    setEditedContent((prev) => {
      const newState = { ...prev };
      delete newState[editKey];
      return newState;
    });
  };

  // Filter keys based on search
  const filteredStructure = useMemo(() => {
    if (!searchTerm) return translationStructure;

    const filtered: Record<string, Record<string, string[]>> = {};
    const searchLower = searchTerm.toLowerCase();

    Object.entries(translationStructure).forEach(([page, sections]) => {
      Object.entries(sections).forEach(([section, keys]) => {
        const matchingKeys = keys.filter((key) => {
          const frValue = (translations.fr as Record<string, string>)[key] || "";
          const enValue = (translations.en as Record<string, string>)[key] || "";
          return (
            key.toLowerCase().includes(searchLower) ||
            frValue.toLowerCase().includes(searchLower) ||
            enValue.toLowerCase().includes(searchLower)
          );
        });

        if (matchingKeys.length > 0) {
          if (!filtered[page]) filtered[page] = {};
          filtered[page][section] = matchingKeys;
        }
      });
    });

    return filtered;
  }, [translationStructure, searchTerm]);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (loading || loadingContent) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <p>Chargement...</p>
        </div>
      </Layout>
    );
  }

  const hasUnsavedChanges = Object.keys(editedContent).length > 0;

  return (
    <Layout>
      <section className="py-12">
        <div className="container-custom">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Gestion du Contenu
              </h1>
              <p className="text-muted-foreground mt-1">
                Modifiez le contenu de toutes les pages du site
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => navigate("/admin/blogs")}
              >
                <FileText className="w-4 h-4 mr-2" />
                Articles
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/admin/images")}
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Images
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>

          {/* Search and Language Toggle */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un contenu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs
              value={selectedLanguage}
              onValueChange={(v) => setSelectedLanguage(v as Language)}
            >
              <TabsList>
                <TabsTrigger value="fr" className="gap-2">
                  <span className="text-lg">🇫🇷</span> Français
                </TabsTrigger>
                <TabsTrigger value="en" className="gap-2">
                  <span className="text-lg">🇬🇧</span> English
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {hasUnsavedChanges && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-center justify-between">
              <p className="text-amber-800">
                Vous avez des modifications non enregistrées.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditedContent({})}
              >
                Annuler tout
              </Button>
            </div>
          )}

          {/* Content Editor */}
          <div className="bg-card rounded-xl shadow-sm border">
            <Accordion type="multiple" className="w-full">
              {Object.entries(filteredStructure).map(([page, sections]) => (
                <AccordionItem key={page} value={page}>
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-foreground">
                        {pageLabels[page]?.[selectedLanguage] || page}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {Object.values(sections).flat().length} éléments
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-6">
                      {Object.entries(sections).map(([section, keys]) => (
                        <div key={section}>
                          {section !== "main" && (
                            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
                              {section}
                            </h4>
                          )}
                          <div className="space-y-4">
                            {keys.map((key) => {
                              const editKey = `${key}_${selectedLanguage}`;
                              const hasEdit = editedContent[editKey] !== undefined;
                              const modified = isModified(key, selectedLanguage);
                              const value = getCurrentValue(key, selectedLanguage);
                              const isLongText = value.length > 100;

                              // Extract formatting from value
                              const formatMatch = value.match(/^\[format:(.*?)\]/);
                              const formatString = formatMatch ? formatMatch[1] : "";
                              const isBold = formatString.includes("bold");
                              const sizeMatch = formatString.match(/size:(\d+)/);
                              const textSize = sizeMatch ? parseInt(sizeMatch[1]) : 16;
                              const cleanValue = value.replace(/^\[format:.*?\]/, "");

                              const toggleBold = () => {
                                const newBold = !isBold;
                                const newFormat = buildFormatString(newBold, textSize);
                                const newValue = newFormat ? `[format:${newFormat}]${cleanValue}` : cleanValue;
                                handleContentChange(key, selectedLanguage, newValue);
                              };

                              const changeSize = (delta: number) => {
                                const newSize = Math.max(12, Math.min(32, textSize + delta));
                                const newFormat = buildFormatString(isBold, newSize);
                                const newValue = newFormat ? `[format:${newFormat}]${cleanValue}` : cleanValue;
                                handleContentChange(key, selectedLanguage, newValue);
                              };

                              const buildFormatString = (bold: boolean, size: number) => {
                                const parts: string[] = [];
                                if (bold) parts.push("bold");
                                if (size !== 16) parts.push(`size:${size}`);
                                return parts.join(",");
                              };

                              return (
                                <div
                                  key={key}
                                  className="bg-muted/50 rounded-lg p-4"
                                >
                                  <div className="flex items-start justify-between gap-4 mb-2">
                                    <div className="flex items-center gap-2">
                                      <code className="text-xs bg-background px-2 py-1 rounded text-muted-foreground">
                                        {key}
                                      </code>
                                      {modified && (
                                        <Badge variant="outline" className="text-xs">
                                          Modifié
                                        </Badge>
                                      )}
                                      {hasEdit && (
                                        <Badge className="text-xs bg-amber-500">
                                          Non sauvegardé
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {/* Format Controls */}
                                      <div className="flex items-center gap-1 border rounded-md p-1 bg-background">
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              variant={isBold ? "secondary" : "ghost"}
                                              size="sm"
                                              className="h-7 w-7 p-0"
                                              onClick={toggleBold}
                                            >
                                              <Bold className="w-3.5 h-3.5" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>Gras</TooltipContent>
                                        </Tooltip>
                                        <div className="w-px h-5 bg-border" />
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-7 w-7 p-0"
                                              onClick={() => changeSize(-2)}
                                            >
                                              <Minus className="w-3.5 h-3.5" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>Réduire</TooltipContent>
                                        </Tooltip>
                                        <span className="text-xs font-mono w-6 text-center">{textSize}</span>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-7 w-7 p-0"
                                              onClick={() => changeSize(2)}
                                            >
                                              <Plus className="w-3.5 h-3.5" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>Agrandir</TooltipContent>
                                        </Tooltip>
                                      </div>
                                      {(hasEdit || modified) && (
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() =>
                                            handleReset(key, selectedLanguage)
                                          }
                                          title="Réinitialiser"
                                        >
                                          <RotateCcw className="w-4 h-4" />
                                        </Button>
                                      )}
                                      {hasEdit && (
                                        <Button
                                          size="sm"
                                          onClick={() =>
                                            handleSave(key, selectedLanguage)
                                          }
                                          disabled={saving}
                                        >
                                          <Save className="w-4 h-4 mr-1" />
                                          Sauvegarder
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                  {isLongText ? (
                                    <Textarea
                                      value={cleanValue}
                                      onChange={(e) => {
                                        const format = buildFormatString(isBold, textSize);
                                        const newValue = format ? `[format:${format}]${e.target.value}` : e.target.value;
                                        handleContentChange(key, selectedLanguage, newValue);
                                      }}
                                      rows={4}
                                      className="resize-y"
                                      style={{
                                        fontWeight: isBold ? "bold" : "normal",
                                        fontSize: `${textSize}px`,
                                      }}
                                    />
                                  ) : (
                                    <Input
                                      value={cleanValue}
                                      onChange={(e) => {
                                        const format = buildFormatString(isBold, textSize);
                                        const newValue = format ? `[format:${format}]${e.target.value}` : e.target.value;
                                        handleContentChange(key, selectedLanguage, newValue);
                                      }}
                                      style={{
                                        fontWeight: isBold ? "bold" : "normal",
                                        fontSize: `${textSize}px`,
                                      }}
                                    />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminContent;
