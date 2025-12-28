import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const postsRef = collection(db, "posts");
        // We will seed intelligently, checking for existence first

        const dataFilePath = path.join(process.cwd(), 'src/data/posts.json');
        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        const posts = JSON.parse(fileData);

        let count = 0;
        let skipped = 0;

        for (const post of posts) {
            // Check if this specific post (by slug) exists
            const q = query(postsRef, where("slug", "==", post.slug));
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                // Remove ID as Firestore generates its own
                const { id, ...postData } = post;

                await addDoc(postsRef, {
                    ...postData,
                    createdAt: new Date()
                });
                count++;
            } else {
                skipped++;
            }
        }

        return NextResponse.json({
            success: true,
            message: `Seed tamamlandı. Eklenen: ${count}, Atlanan (zaten var): ${skipped}. Toplam: ${posts.length}`
        });
    } catch (error) {
        console.error("Seeding error:", error);
        return NextResponse.json({ error: 'Seeding failed: ' + error }, { status: 500 });
    }
}
