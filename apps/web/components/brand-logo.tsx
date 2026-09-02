import Image from 'next/image';
import type { ComponentProps } from 'react';

const LOGO_SRC = 'https://j0r5rfqfy848ahyl.public.blob.vercel-storage.com/logo/logo.webp';

interface BrandLogoProps extends Omit<
  ComponentProps<typeof Image>,
  'src' | 'alt' | 'width' | 'height'
> {
  size?: number;
}

export function BrandLogo({ size = 48, ...props }: BrandLogoProps) {
  return (
    <Image src={LOGO_SRC} alt="Pingwinwin logo" width={size} height={size} priority {...props} />
  );
}
