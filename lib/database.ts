import { User } from '@/types/auth';

// Простая in-memory база данных для демонстрации
// В реальном приложении используйте SQLite, PostgreSQL или другую БД
class InMemoryDatabase {
  private users: User[] = [];

  async findUserByEmail(email: string): Promise<User | null> {
    const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    return user || null;
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      ...userData,
      createdAt: new Date().toISOString(),
    };
    
    this.users.push(user);
    return user;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findUserByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  // Метод для получения всех пользователей (для отладки)
  async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    return this.users.map(({ password, ...user }) => user);
  }
}

export const db = new InMemoryDatabase();