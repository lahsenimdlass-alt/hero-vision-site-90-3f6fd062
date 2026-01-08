import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface Blog {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (!error && data) {
      setBlog(data);
    }
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-pulse space-y-4 w-full max-w-3xl px-4">
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/4" />
            <div className="h-64 bg-muted rounded" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-navy mb-4">Article non trouvé</h1>
          <Link to="/blog" className="text-gold hover:underline">
            Retour au blog
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-navy py-16">
        <div className="container-custom max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            {blog.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 text-white/70"
          >
            <Calendar className="w-4 h-4" />
            {formatDate(blog.created_at)}
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <article className="py-12">
        <div className="container-custom max-w-4xl">
          {blog.image_url && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="aspect-video rounded-2xl overflow-hidden mb-10"
            >
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none prose-headings:text-navy prose-a:text-gold"
            dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }}
          />
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
