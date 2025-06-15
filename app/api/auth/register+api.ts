import { db } from '@/lib/database';
import { RegisterRequest, AuthResponse } from '@/types/auth';

export async function POST(request: Request): Promise<Response> {
  try {
    const body: RegisterRequest = await request.json();
    const { name, email, password } = body;

    // Валидация данных
    if (!name || !email || !password) {
      return Response.json({
        success: false,
        message: 'Все поля обязательны для заполнения'
      } as AuthResponse, { status: 400 });
    }

    if (password.length < 6) {
      return Response.json({
        success: false,
        message: 'Пароль должен содержать минимум 6 символов'
      } as AuthResponse, { status: 400 });
    }

    // Проверяем, существует ли пользователь с таким email
    const existingUser = await db.findUserByEmail(email);
    if (existingUser) {
      return Response.json({
        success: false,
        message: 'Пользователь с таким email уже существует. Войдите в аккаунт.'
      } as AuthResponse, { status: 409 });
    }

    // Создаем нового пользователя
    const newUser = await db.createUser({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password // В реальном приложении нужно хешировать пароль
    });

    // Возвращаем успешный ответ без пароля
    const { password: _, ...userWithoutPassword } = newUser;
    
    return Response.json({
      success: true,
      message: 'Регистрация успешна!',
      user: userWithoutPassword
    } as AuthResponse, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return Response.json({
      success: false,
      message: 'Произошла ошибка сервера. Попробуйте позже.'
    } as AuthResponse, { status: 500 });
  }
}