const mockSession = {
  user: {
    id: 'user-id',
    name: 'Mateus Domingos',
    email: 'mateus@test.com',
    image: 'https://github.com/mateus.png',
  },
};

export const auth = async () => {
  return mockSession;
};

export const handlers = {};
export const signIn = async () => {};
