import { db } from '@/lib/database';
import { LoginRequest, AuthResponse } from '@/types/auth';

export async function POST(request: Request): Promise<Response> {
  try {
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    // Валидация данных
    if (!email || !password) {
      return Response.json({
        success: false,
        message: 'Email и пароль обязательны'
      } as AuthResponse, { status: 400 });
    }

    // Проверяем пользователя
    const user = await db.validateUser(email, password);
    if (!user) {
      return Response.json({
        success: false,
        message: 'Неверный email или пароль'
      } as AuthResponse, { status: 401 });
    }

    // Возвращаем успешный ответ без пароля
    const { password: _, ...userWithoutPassword } = user;
    
    return Response.json({
      success: true,
      message: 'Вход выполнен успешно!',
      user: userWithoutPassword
    } as AuthResponse, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    return Response.json({
      success: false,
      message: 'Произошла ошибка сервера. Попробуйте позже.'
    } as AuthResponse, { status: 500 });
  }
}