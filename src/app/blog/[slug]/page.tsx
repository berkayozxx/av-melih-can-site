'use client';
import { useEffect, useState, use } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Search, ChevronRight, Calendar, User, Share2, Facebook, Twitter, Linkedin, FileText } from 'lucide-react';
import './blog.css'; // We will create this for specific styles

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const [post, setPost] = useState<any>(null);
    const [posts, setPosts] = useState<any[]>([]); // For sidebar recent posts/categories
    const [loading, setLoading] = useState(true);
    const [slug, setSlug] = useState<string>('');

    useEffect(() => {
        params.then(p => setSlug(p.slug));
    }, [params]);

    useEffect(() => {
        if (!slug) return;
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                const found = data.find((p: any) => p.slug === slug);
                setPost(found);
                setLoading(false);
            });
    }, [slug]);

    // Unique categories
    const categories = Array.from(new Set(posts.map((p: any) => p.category || 'Genel')));

    if (loading) return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <div className="flex-grow flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
            <Footer />
        </div>
    );

    if (!post) return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-4xl font-serif font-bold text-gray-800 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8">Aradığınız yazı bulunamadı.</p>
                <Link href="/blog" className="px-6 py-3 bg-primary text-white rounded hover:bg-primary-light transition-colors">
                    Bloga Dön
                </Link>
            </div>
            <Footer />
        </div>
    );

    return (
        <div className="flex flex-col min-h-screen bg-[#050505] font-sans">
            <Header />

            {/* Hero Header with Background Image if available, else Dark */}
            <div className={`relative pt-40 pb-24 ${post.image ? 'bg-black/60' : 'bg-primary'} text-white overflow-hidden`}>
                {post.image && (
                    <>
                        <div className="absolute inset-0 z-0">
                            <img src={post.image} alt="Background" className="w-full h-full object-cover opacity-50" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-0" />
                    </>
                )}

                <div className="container-custom relative z-10">
                    {/* Breadcrumbs */}
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-300 mb-6 font-medium">
                        <Link href="/" className="hover:text-red-500 transition-colors">Anasayfa</Link>
                        <ChevronRight size={14} />
                        <Link href="/blog" className="hover:text-red-500 transition-colors">Blog</Link>
                        <ChevronRight size={14} />
                        <span className="text-red-500">{post.category || 'Genel'}</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight max-w-4xl text-white">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-gray-200">
                        <div className="flex items-center gap-2">
                            <Calendar className="text-red-500 w-5 h-5" />
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="text-red-500 w-5 h-5" />
                            <span>{post.author}</span>
                        </div>
                        {post.category && (
                            <span className="bg-red-600/20 text-red-500 border border-red-600/30 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                                {post.category}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="container-custom py-16">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Main Content (Left) */}
                    <div className="lg:w-2/3">
                        {/* Article Content - Dark Mode Adapted */}
                        <article className={`prose prose-lg max-w-none prose-invert 
                            prose-headings:font-serif prose-headings:text-red-600 
                            prose-a:text-red-500 prose-a:no-underline hover:prose-a:text-red-400
                            prose-blockquote:border-red-600 prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:text-gray-300
                            prose-img:rounded-xl prose-img:border prose-img:border-white/10
                            prose-p:text-gray-300 prose-li:text-gray-300 prose-strong:text-white
                            ${post.font || 'font-sans'}`}>
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        </article>

                        {/* Share */}
                        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <span className="font-bold text-white flex items-center gap-2">
                                <Share2 size={20} className="text-red-500" /> Bu Yazıyı Paylaş:
                            </span>
                            <div className="flex gap-4">
                                <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                                    <Facebook size={18} />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors">
                                    <Twitter size={18} />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors">
                                    <Linkedin size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar (Right) */}
                    <aside className="lg:w-1/3 space-y-8">
                        {/* Search */}
                        <div className="bg-[#111] p-6 rounded-2xl border border-white/10">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Arama Yap ..."
                                    className="w-full pl-4 pr-10 py-3 bg-black/50 border border-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all placeholder:text-gray-600"
                                />
                                <Search className="absolute right-3 top-3.5 text-gray-500 w-5 h-5" />
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="bg-[#111] p-6 rounded-2xl border border-white/10">
                            <h3 className="text-lg font-serif font-bold text-white mb-4 border-b border-white/10 pb-2 flex items-center justify-between">
                                KATEGORİLER
                                <span className="w-8 h-1 bg-red-600 rounded-full"></span>
                            </h3>
                            <ul className="space-y-3">
                                {categories.map((cat: any, i) => (
                                    <li key={i}>
                                        <Link href={`/blog?category=${cat}`} className="flex items-center group text-gray-400 hover:text-red-500 transition-colors">
                                            <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                                            {cat}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Recent Posts */}
                        <div className="bg-[#111] p-6 rounded-2xl border border-white/10">
                            <h3 className="text-lg font-serif font-bold text-white mb-4 border-b border-white/10 pb-2 flex items-center justify-between">
                                SON YAZILAR
                                <span className="w-8 h-1 bg-red-600 rounded-full"></span>
                            </h3>
                            <div className="space-y-4">
                                {posts.slice(0, 4).map((p: any) => (
                                    <Link key={p.id} href={`/blog/${p.slug}`} className="flex gap-3 group">
                                        {p.image ? (
                                            <img src={p.image} alt={p.title} className="w-20 h-16 object-cover rounded-lg opacity-70 group-hover:opacity-100 transition-opacity" />
                                        ) : (
                                            <div className="w-20 h-16 bg-white/5 rounded-lg flex items-center justify-center text-gray-600 shrink-0 border border-white/10">
                                                <FileText size={20} />
                                            </div>
                                        )}
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-200 group-hover:text-red-500 transition-colors line-clamp-2 leading-snug">
                                                {p.title}
                                            </h4>
                                            <span className="text-xs text-gray-500 mt-1 block">{p.date}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>

                </div>
            </div>

            <Footer />
        </div>
    );
}
