'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function BlogListing() {
    const [posts, setPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-[#050505]">
            <Header />
            <main className="flex-grow pt-32 pb-24">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <span className="text-red-500 font-bold tracking-widest uppercase text-sm mb-2 block">Güncel Bilgiler</span>
                        <h1 className="text-5xl font-serif font-bold text-white mb-6">Hukuk Blogu ve Makaleler</h1>
                        <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-6"></div>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            Yargıtay kararları, mevzuat değişiklikleri ve hukuki süreçler hakkında uzman görüşleri.
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-[#111] h-96 rounded-2xl border border-white/10"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map(post => (
                                <article key={post.id} className="bg-[#111] rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-red-900/20 transition-all duration-300 group flex flex-col h-full border border-white/10">
                                    {post.image ? (
                                        <div className="relative h-64 overflow-hidden">
                                            <img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-60" />
                                        </div>
                                    ) : (
                                        <div className="h-48 bg-white/5 flex items-center justify-center relative overflow-hidden group-hover:bg-white/10 transition-colors">
                                            <div className="absolute -right-10 -bottom-10 opacity-5">
                                                <span className="text-9xl font-serif text-white">§</span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="p-8 flex flex-col flex-grow relative">
                                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-medium uppercase tracking-wider">
                                            <span className="flex items-center gap-1"><Calendar size={14} className="text-red-500" /> {post.date}</span>
                                            <span className="flex items-center gap-1"><User size={14} className="text-red-500" /> {post.author.split(' ')[0]}.</span>
                                        </div>

                                        <h2 className="text-2xl font-bold text-gray-100 mb-4 leading-tight group-hover:text-red-500 transition-colors font-serif">
                                            <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                                                <span className="absolute inset-0" aria-hidden="true" />
                                                {post.title}
                                            </Link>
                                        </h2>

                                        <p className="text-gray-400 mb-6 line-clamp-3 leading-relaxed flex-grow">
                                            {post.excerpt}
                                        </p>

                                        <div className="mt-auto flex items-center text-red-500 font-bold group-hover:translate-x-2 transition-transform duration-300">
                                            Devamını Oku <ArrowRight size={16} className="ml-2" />
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    {posts.length === 0 && !isLoading && (
                        <div className="text-center py-20 bg-[#111] rounded-2xl border border-white/10">
                            <p className="text-gray-500 text-lg">Henüz yayınlanmış bir yazı bulunmamaktadır.</p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
