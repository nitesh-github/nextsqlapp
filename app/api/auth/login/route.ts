import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '@/lib/db';
import { RowDataPacket } from 'mysql2';
interface User extends RowDataPacket {
    id: number;
    email: string;
    password: string;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json(); // Get JSON body
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
        }

        // Dummy authentication logic
        const [users] = await db.execute<User[]>('SELECT * FROM users WHERE email = ?', [email]);


        if (users.length === 0) {
            return NextResponse.json({ message: 'Internal server error' }, { status: 401 });
        }

        const user = users[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        return NextResponse.json({ message: 'Login successful', token, user: { id: user.id, email: user.email } }, { status: 200 });
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

// Handle other HTTP methods
export async function GET() {
    return NextResponse.json({ message: 'GET method not allowed' }, { status: 405 });
}
