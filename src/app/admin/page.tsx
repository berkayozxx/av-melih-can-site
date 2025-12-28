'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash, ExternalLink, Image as ImageIcon, MessageSquare, FileText } from 'lucide-react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'posts' | 'messages'>('posts');

    const [posts, setPosts] = useState<any[]>([]);
    const [messages, setMessages] = useState<any[]>([]);

    const [newPost, setNewPost] = useState({ title: '', content: '', image: '', font: 'font-sans', category: 'Genel' });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            fetchPosts();
            fetchMessages();
        }
    }, [isAuthenticated]);

    const fetchPosts = () => {
        fetch('/api/posts').then(res => res.json()).then(setPosts);
    };

    const fetchMessages = () => {
        fetch('/api/contact').then(res => res.json()).then(setMessages);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') setIsAuthenticated(true);
        else alert('Kullanıcı adı veya şifre yanlış!');
    };

    const handleDeletePost = async (id: string) => {
        if (!confirm('Bu yazıyı silmek istediğinize emin misiniz?')) return;
        await fetch(`/api/posts?id=${id}`, { method: 'DELETE' });
        fetchPosts();
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setUploading(true);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.url) {
                setNewPost({ ...newPost, image: data.url });
            }
        } catch (error) {
            alert('Resim yüklenirken hata oluştu');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPost.title || !newPost.content) return;

        await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPost)
        });
        setNewPost({ title: '', content: '', image: '', font: 'font-sans', category: 'Genel' });
        fetchPosts();
        alert('Yazı başarıyla yayınlandı!');
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }]
        ],
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm border-t-4 border-primary">
                    <h1 className="text-2xl font-serif font-bold mb-6 text-primary text-center">Admin Girişi</h1>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Kullanıcı Adı</label>
                            <input
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-primary text-black"
                                placeholder="admin"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Şifre</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-primary text-black"
                                placeholder="********"
                            />
                        </div>
                        <button className="w-full bg-primary text-white p-3 font-bold rounded hover:bg-primary-light transition-colors">Giriş Yap</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-8 bg-white p-6 rounded shadow-sm">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-primary">Yönetim Paneli</h1>
                        <p className="text-gray-500 text-sm">İçerik ve mesaj yönetimi</p>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/blog" target="_blank" className="flex items-center gap-2 text-primary hover:text-gold transition-colors font-medium">
                            Siteye Git <ExternalLink size={16} />
                        </Link>
                        <button onClick={() => setIsAuthenticated(false)} className="text-red-500 hover:text-red-700 font-medium text-sm">Çıkış</button>
                    </div>
                </header>

                {/* Tabs */}
                <div className="flex mb-6 space-x-4 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('posts')}
                        className={`pb-3 px-4 font-bold flex items-center gap-2 transition-colors ${activeTab === 'posts' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <FileText size={18} /> Blog Yazıları
                    </button>
                    <button
                        onClick={() => setActiveTab('messages')}
                        className={`pb-3 px-4 font-bold flex items-center gap-2 transition-colors ${activeTab === 'messages' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <MessageSquare size={18} /> Mesajlar ({messages.length})
                    </button>
                </div>

                {activeTab === 'posts' ? (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Add Post Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white p-6 rounded shadow-sm sticky top-8">
                                <h2 className="text-xl font-bold mb-4 text-primary border-b pb-2">Yeni Yazı Ekle</h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Başlık</label>
                                            <input
                                                type="text"
                                                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-primary focus:outline-none text-black"
                                                value={newPost.title}
                                                onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Kategori</label>
                                            <select
                                                value={newPost.category}
                                                onChange={e => setNewPost({ ...newPost, category: e.target.value })}
                                                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-primary focus:outline-none text-black"
                                            >
                                                <option>Genel</option>
                                                <option>Ceza Hukuku</option>
                                                <option>Aile Hukuku</option>
                                                <option>Ticaret Hukuku</option>
                                                <option>Gayrimenkul Hukuku</option>
                                                <option>İcra Hukuku</option>
                                                <option>İdare Hukuku</option>
                                                <option>İş Hukuku</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Kapak Görseli</label>
                                            <div className="flex items-center gap-2">
                                                <label className="flex-grow cursor-pointer border border-dashed border-gray-300 p-2 rounded hover:bg-gray-50 text-center text-sm text-gray-500 truncate text-gray-600">
                                                    {uploading ? '...' : newPost.image ? 'Değiştir' : 'Yükle'}
                                                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                                </label>
                                                {newPost.image && <img src={newPost.image} alt="Preview" className="w-10 h-10 object-cover rounded" />}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Yazı Tipi</label>
                                            <select
                                                value={newPost.font}
                                                onChange={e => setNewPost({ ...newPost, font: e.target.value })}
                                                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-primary focus:outline-none text-black"
                                            >
                                                <option value="font-sans">Modern Sans (Varsayılan)</option>
                                                <option value="font-serif">Klasik Serif (Okuma Modu)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">İçerik</label>
                                        <div className="bg-white">
                                            <ReactQuill
                                                theme="snow"
                                                value={newPost.content}
                                                onChange={(content) => setNewPost({ ...newPost, content })}
                                                modules={modules}
                                                className="h-96 mb-12"
                                            />
                                        </div>
                                    </div>

                                    <button className="w-full bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20 mt-8">
                                        Yayınla
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* List Posts */}
                        <div className="lg:col-span-1 space-y-4">
                            <h2 className="text-xl font-bold mb-4 text-primary">Yayındaki Yazılar</h2>
                            {posts.length === 0 ? <p className="text-gray-500">Henüz yazı yok.</p> : (
                                posts.map(post => (
                                    <div key={post.id} className="flex gap-4 p-4 bg-white rounded shadow-sm border border-gray-100 hover:border-primary/30 transition-all">
                                        {post.image ? (
                                            <img src={post.image} alt={post.title} className="w-16 h-16 object-cover rounded shrink-0" />
                                        ) : (
                                            <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-gray-400 shrink-0">
                                                <ImageIcon size={20} />
                                            </div>
                                        )}
                                        <div className="flex-grow min-w-0">
                                            <h3 className="font-bold text-sm text-primary truncate">{post.title}</h3>
                                            <div className="text-xs text-gray-500 mb-1">{post.date}</div>
                                            <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600">{post.category}</span>
                                        </div>
                                        <button
                                            onClick={() => handleDeletePost(post.id)}
                                            className="text-gray-400 hover:text-red-500 self-start p-1"
                                        >
                                            <Trash size={16} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded shadow-sm p-6">
                        <h2 className="text-xl font-bold mb-6 text-primary border-b pb-2">Gelen Mesajlar</h2>
                        {messages.length === 0 ? <p className="text-gray-500">Henüz mesaj yok.</p> : (
                            <div className="space-y-4">
                                {messages.map((msg: any) => (
                                    <div key={msg.id} className="p-6 bg-gray-50 rounded border border-gray-100 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-bold text-primary text-lg">{msg.name}</h3>
                                                <div className="text-sm text-gray-500">{msg.email} • {msg.phone}</div>
                                            </div>
                                            <span className="text-xs font-bold text-gold px-2 py-1 bg-gold/10 rounded">{msg.date}</span>
                                        </div>
                                        <div className="mb-2">
                                            <span className="text-xs font-bold uppercase text-gray-400">Konu:</span>
                                            <span className="font-medium ml-2">{msg.subject}</span>
                                        </div>
                                        <div className="bg-white p-4 rounded border border-gray-200 text-gray-700 whitespace-pre-wrap">
                                            {msg.message}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
