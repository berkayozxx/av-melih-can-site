import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query } from 'firebase/firestore';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Note: Removed orderBy to avoid requiring Firebase index
        // Messages will be sorted client-side if needed
        const q = query(collection(db, "messages"));
        const querySnapshot = await getDocs(q);
        const messages = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Sort by createdAt descending (newest first) on server before returning
        messages.sort((a: any, b: any) => {
            const dateA = new Date(a.createdAt || a.date || 0).getTime();
            const dateB = new Date(b.createdAt || b.date || 0).getTime();
            return dateB - dateA;
        });

        return NextResponse.json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json([], { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const newMessage = {
            name: body.name,
            phone: body.phone,
            email: body.email,
            subject: body.subject,
            message: body.message,
            date: new Date().toLocaleString('tr-TR'),
            read: false,
            createdAt: new Date().toISOString()
        };

        const docRef = await addDoc(collection(db, "messages"), newMessage);

        return NextResponse.json({ success: true, message: { id: docRef.id, ...newMessage } });
    } catch (error) {
        console.error("Error saving message:", error);
        return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
    }
}
