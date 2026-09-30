import { describe, it, expect, vi } from 'vitest';
import { authService } from '@/server/services/auth.service';
import { userRepository } from '@/server/repositories/user.repository';
import bcrypt from 'bcryptjs';

describe('AuthService', () => {
  it('should throw error when registering with an existing email', async () => {
    vi.spyOn(userRepository, 'existsByEmail').mockResolvedValueOnce(true);

    await expect(
      authService.register({
        name: 'New User',
        email: 'user@example.com',
        password: 'password123',
      })
    ).rejects.toThrow('An account with this email already exists');
  });

  it('should hash password and create customer user successfully', async () => {
    vi.spyOn(userRepository, 'existsByEmail').mockResolvedValueOnce(false);
    vi.spyOn(userRepository, 'create').mockImplementationOnce(async (data) => ({
      id: 'new-user-123',
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      role: data.role || 'CUSTOMER',
      phone: data.phone || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const result = await authService.register({
      name: 'Kavita Singh',
      email: 'kavita@example.com',
      password: 'mypassword123',
    });

    expect(result.id).toBe('new-user-123');
    expect(result.name).toBe('Kavita Singh');
    expect(result.email).toBe('kavita@example.com');
    expect(result.role).toBe('CUSTOMER');
  });

  it('should validate user login credentials correctly', async () => {
    const password = 'testpassword123';
    const hash = await bcrypt.hash(password, 10);

    vi.spyOn(userRepository, 'findAuthUserByEmail').mockResolvedValueOnce({
      id: 'user-id-1',
      name: 'Amina',
      email: 'amina@example.com',
      passwordHash: hash,
      role: 'CUSTOMER',
      phone: '+91 98765 43210',
    } as any);

    const validated = await authService.validateCredentials({
      email: 'amina@example.com',
      password,
    });
    expect(validated).toBeDefined();
    expect(validated?.name).toBe('Amina');

    // Invalid password
    vi.spyOn(userRepository, 'findAuthUserByEmail').mockResolvedValueOnce({
      id: 'user-id-1',
      name: 'Amina',
      email: 'amina@example.com',
      passwordHash: hash,
      role: 'CUSTOMER',
      phone: '+91 98765 43210',
    } as any);

    await expect(
      authService.validateCredentials({
        email: 'amina@example.com',
        password: 'wrongpassword',
      })
    ).rejects.toThrow('Invalid email or password');
  });
});
