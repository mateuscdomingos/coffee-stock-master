import { Hasher } from '@/core/ports/services/Hasher';
import bcrypt from 'bcryptjs';

const hash = async (value: string): Promise<string> => {
  const salt = await bcrypt.genSalt(6);
  return await bcrypt.hash(value, salt);
};

const compare = async (value: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(value, hash);
};

export const bcryptHasher: Hasher = { hash, compare };
