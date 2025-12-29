import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, orderBy, query } from 'firebase/firestore';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const q = query(collection(db, "messages"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        const messages = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return NextResponse.json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
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
