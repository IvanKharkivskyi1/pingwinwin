'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import {
  Button,
  HStack,
  MenuContent,
  MenuItem,
  MenuPositioner,
  MenuRoot,
  MenuTrigger,
  Portal,
  Text,
} from '@chakra-ui/react';
import GB from 'country-flag-icons/react/3x2/GB';
import RO from 'country-flag-icons/react/3x2/RO';
import UA from 'country-flag-icons/react/3x2/UA';
import { useLocale, useTranslations } from 'next-intl';
import type { ComponentType } from 'react';
import { FiChevronDown } from 'react-icons/fi';

type Locale = (typeof routing.locales)[number];

type FlagProps = {
  width: number;
  height: number;
  'aria-hidden': boolean | 'true' | 'false';
  focusable: boolean;
};

const LOCALE_OPTIONS: Record<
  Locale,
  {
    Flag: ComponentType<FlagProps>;
    name: string;
  }
> = {
  en: {
    Flag: GB,
    name: 'English',
  },
  uk: {
    Flag: UA,
    name: 'Українська',
  },
  ro: {
    Flag: RO,
    name: 'Română',
  },
};

function readCurrentQuery(): Record<string, string> {
  if (typeof window === 'undefined') {
    return {};
  }

  return Object.fromEntries(new URLSearchParams(window.location.search));
}

function LanguageSwitcherMenu() {
  const t = useTranslations('Header');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const { Flag, name } = LOCALE_OPTIONS[locale];

  const switchLocale = (nextLocale: Locale) => {
    router.replace(
      {
        pathname,
        query: readCurrentQuery(),
      },
      {
        locale: nextLocale,
      },
    );
  };

  return (
    <MenuRoot
      positioning={{
        placement: 'bottom-end',
        strategy: 'absolute',
      }}
    >
      <MenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          rounded="full"
          aria-label={t('languageSwitcherLabel')}
          title={t('languageSwitcherLabel')}
        >
          <Text as="span" display="inline-flex" alignItems="center" gap={1.5}>
            <Flag width={21} height={14} aria-hidden="true" focusable={false} />

            <Text
              as="span"
              display={{
                base: 'none',
                md: 'flex',
              }}
            >
              {name}
            </Text>
          </Text>

          <FiChevronDown />
        </Button>
      </MenuTrigger>

      <Portal>
        <MenuPositioner>
          <MenuContent
            minW={{
              base: 'unset',
              md: '10rem',
            }}
            zIndex={1200}
            borderRadius="md"
            shadow="lg"
            p={1}
          >
            {routing.locales.map((itemLocale) => {
              const isCurrent = itemLocale === locale;
              const { Flag, name } = LOCALE_OPTIONS[itemLocale];

              return (
                <MenuItem
                  key={itemLocale}
                  value={itemLocale}
                  onClick={() => switchLocale(itemLocale)}
                  borderRadius="md"
                  bg={isCurrent ? 'teal.50' : undefined}
                  color={isCurrent ? 'teal.700' : undefined}
                  fontWeight={isCurrent ? 'semibold' : 'normal'}
                  _hover={{
                    bg: isCurrent ? 'teal.100' : 'gray.100',
                  }}
                  _dark={{
                    bg: isCurrent ? 'teal.900' : undefined,
                    color: isCurrent ? 'teal.200' : undefined,
                    _hover: {
                      bg: isCurrent ? 'teal.800' : 'gray.700',
                    },
                  }}
                >
                  <HStack gap={2} flex="1">
                    <Flag width={18} height={12} aria-hidden="true" focusable={false} />

                    <Text
                      as="span"
                      display={{
                        base: 'none',
                        md: 'flex',
                      }}
                    >
                      {name}
                    </Text>
                  </HStack>
                </MenuItem>
              );
            })}
          </MenuContent>
        </MenuPositioner>
      </Portal>
    </MenuRoot>
  );
}

export function LanguageSwitcher() {
  return <LanguageSwitcherMenu />;
}
