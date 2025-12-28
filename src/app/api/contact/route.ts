import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const messagesFilePath = path.join(process.cwd(), 'src/data/messages.json');

function getMessages() {
    try {
        if (fs.existsSync(messagesFilePath)) {
            const fileData = fs.readFileSync(messagesFilePath, 'utf8');
            return JSON.parse(fileData);
        }
        return [];
    } catch (error) {
        return [];
    }
}

function saveMessages(messages: any[]) {
    try {
        const dir = path.dirname(messagesFilePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));
    } catch (e) {
        console.error("Error saving messages", e);
    }
}

export async function GET() {
    const messages = getMessages();
    return NextResponse.json(messages);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const messages = getMessages();

        const newMessage = {
            id: Date.now().toString(),
            name: body.name,
            phone: body.phone,
            email: body.email,
            subject: body.subject,
            message: body.message,
            date: new Date().toLocaleString('tr-TR'),
            read: false
        };

        messages.unshift(newMessage);
        saveMessages(messages);

        return NextResponse.json({ success: true, message: newMessage });
    } catch (e) {
        return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
    }
}
