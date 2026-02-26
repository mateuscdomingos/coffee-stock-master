import { Icon } from '@/components/ui/icon';
import '@testing-library/jest-dom';
import React, { ComponentProps } from 'react';

type IconProps = ComponentProps<typeof Icon>;

jest.mock('@/components/ui/icon', () => ({
  Icon: ({ name, className, ...props }: IconProps) =>
    React.createElement('span', {
      'data-testid': 'lucide-icon',
      'data-icon-name': name,
      className,
      ...props,
    }),
}));
