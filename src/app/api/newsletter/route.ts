import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Geçersiz e-posta adresi.' }, { status: 400 });
        }

        const q = query(collection(db, "subscribers"), where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return NextResponse.json({ message: 'Bu e-posta adresi zaten kayıtlı.' }, { status: 200 });
        }

        await addDoc(collection(db, "subscribers"), {
            email,
            date: new Date().toISOString()
        });

        return NextResponse.json({ success: true, message: 'Bültene başarıyla abone oldunuz!' });
    } catch (error) {
        console.error("Newsletter error:", error);
        return NextResponse.json({ error: 'Bir hata oluştu.' }, { status: 500 });
    }
}
