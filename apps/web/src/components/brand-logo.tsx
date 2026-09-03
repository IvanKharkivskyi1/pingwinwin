'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { ComponentProps } from 'react';

const LOGO_SRC = 'https://j0r5rfqfy848ahyl.public.blob.vercel-storage.com/logo/logo.png?v=2';

interface BrandLogoProps extends Omit<
  ComponentProps<typeof Image>,
  'src' | 'alt' | 'width' | 'height'
> {
  size?: number;
}

export function BrandLogo({ size = 48, ...props }: BrandLogoProps) {
  const t = useTranslations('Common');

  return (
    <Image src={LOGO_SRC} alt={t('brandAlt')} width={size} height={size} priority {...props} />
  );
}
