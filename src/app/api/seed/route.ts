import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const postsRef = collection(db, "posts");
        const existingDocs = await getDocs(postsRef);

        if (!existingDocs.empty) {
            return NextResponse.json({ message: "Database already has data. Skipping seed." });
        }

        const dataFilePath = path.join(process.cwd(), 'src/data/posts.json');
        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        const posts = JSON.parse(fileData);

        let count = 0;
        for (const post of posts) {
            // Remove ID as Firestore generates its own, or we could explicitly set it. 
            // Let's rely on Firestore auto-ID but keep the visual ID field if needed, actually we don't need 'id' from JSON usually.
            const { id, ...postData } = post;

            await addDoc(postsRef, {
                ...postData,
                createdAt: new Date()
            });
            count++;
        }

        return NextResponse.json({ success: true, message: `Successfully seeded ${count} posts to Firebase.` });
    } catch (error) {
        console.error("Seeding error:", error);
        return NextResponse.json({ error: 'Seeding failed.' }, { status: 500 });
    }
}
