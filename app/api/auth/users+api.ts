import { db } from '@/lib/database';

// API для получения списка пользователей (для отладки)
export async function GET(request: Request): Promise<Response> {
  try {
    const users = await db.getAllUsers();
    return Response.json({
      success: true,
      users,
      count: users.length
    });
  } catch (error) {
    console.error('Get users error:', error);
    return Response.json({
      success: false,
      message: 'Ошибка получения пользователей'
    }, { status: 500 });
  }
}