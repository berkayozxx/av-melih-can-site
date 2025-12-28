import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const dataFilePath = path.join(process.cwd(), 'src/data/posts.json');

        // Fail gracefully
        if (!fs.existsSync(dataFilePath)) {
            return NextResponse.json({ error: 'JSON dosyası bulunamadı.' }, { status: 404 });
        }

        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        const posts = JSON.parse(fileData);

        // Use writeBatch for atomic operation
        const batch = writeBatch(db);
        let count = 0;

        for (const post of posts) {
            // Use the JSON ID ("1", "2") as the Document ID.
            // This is IDEMPOTENT: If it runs twice, it just updates the same doc.
            // No need to query DB first.
            const postRef = doc(db, "posts", post.id.toString());

            // We include 'id' inside the doc too, just in case
            batch.set(postRef, {
                ...post,
                createdAt: new Date().toISOString()
            });
            count++;
        }

        // Commit all 20 writes in one go
        await batch.commit();

        return NextResponse.json({
            success: true,
            message: `Hızlı Seed (Direct Write) Tamamlandı. İşlenen Yazı: ${count}.`
        });
    } catch (error) {
        console.error("Seeding error:", error);
        return NextResponse.json({ error: 'Seeding failed: ' + error.message }, { status: 500 });
    }
}
