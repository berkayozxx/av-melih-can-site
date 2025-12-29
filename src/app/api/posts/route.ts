import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, query, deleteDoc, doc } from 'firebase/firestore';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const q = query(collection(db, "posts"));
        const querySnapshot = await getDocs(q);
        const posts = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return NextResponse.json(Array.isArray(posts) ? posts : []);
    } catch (error) {
        console.error("Error getting documents: ", error);
        return NextResponse.json([], { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const slug = body.title
            .toLowerCase()
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');

        const newPost = {
            title: body.title,
            content: body.content,
            excerpt: body.excerpt || body.content.substring(0, 100) + '...',
            slug: slug,
            date: new Date().toISOString().split('T')[0],
            author: 'Av. Melih Can Yılmaz',
            image: body.image || null,
            font: body.font || 'font-sans',
            category: body.category || 'Genel',
            createdAt: new Date().toISOString()
        };

        const docRef = await addDoc(collection(db, "posts"), newPost);

        return NextResponse.json({ id: docRef.id, ...newPost });
    } catch (error) {
        console.error("Error adding document: ", error);
        return NextResponse.json({ error: 'Yazı eklenemedi.' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        await deleteDoc(doc(db, "posts", id));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting document: ", error);
        return NextResponse.json({ error: 'Silme işlemi başarısız.' }, { status: 500 });
    }
}
