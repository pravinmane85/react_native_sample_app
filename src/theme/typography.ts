import { colors } from './colors';

export const typography = {
  title: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: colors.textPrimary,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: colors.textPrimary,
  },
  brand: {
    fontSize: 13,
    fontWeight: '400' as const,
    color: colors.textSecondary,
  },
  price: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: colors.textPrimary,
  },
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  badge: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: colors.badgeText,
  },
};
