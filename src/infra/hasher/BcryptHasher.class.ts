import { Hasher } from '@/core/ports/services/Hasher';
import bcrypt from 'bcryptjs';

export class BcryptHasher implements Hasher {
  async hash(value: string): Promise<string> {
    const salt = await bcrypt.genSalt(6);
    return await bcrypt.hash(value, salt);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }
}
