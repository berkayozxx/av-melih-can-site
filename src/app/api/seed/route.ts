import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const postsRef = collection(db, "posts");

        // 1. Get all existing posts in one go to check for duplicates efficiently
        const snapshot = await getDocs(postsRef);
        const existingSlugs = new Set();
        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.slug) existingSlugs.add(data.slug);
        });

        // 2. Read local data
        const dataFilePath = path.join(process.cwd(), 'src/data/posts.json');
        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        const posts = JSON.parse(fileData);

        // 3. Prepare Batch
        const batch = writeBatch(db);
        let count = 0;
        let skipped = 0;

        for (const post of posts) {
            if (existingSlugs.has(post.slug)) {
                skipped++;
                continue;
            }

            // Create a new document reference
            const newDocRef = doc(postsRef); // Auto-ID

            const { id, ...postData } = post;

            batch.set(newDocRef, {
                ...postData,
                createdAt: new Date().toISOString()
            });
            count++;
        }

        // 4. Commit Batch (if there is anything to commit)
        if (count > 0) {
            await batch.commit();
        }

        return NextResponse.json({
            success: true,
            message: `Hızlı Seed Tamamlandı. Eklenen: ${count}, Zaten Varolan: ${skipped}. Toplam Kontrol: ${posts.length}`
        });
    } catch (error) {
        console.error("Seeding error:", error);
        return NextResponse.json({ error: 'Seeding failed: ' + error }, { status: 500 });
    }
}
