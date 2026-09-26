import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { Category } from '../types/product';

export type CategoryFilterValue = 'all' | Category;

const OPTIONS: { value: CategoryFilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'phone', label: 'Phones' },
  { value: 'sim', label: 'SIM cards' },
];

interface CategoryFilterProps {
  value: CategoryFilterValue;
  onChange: (value: CategoryFilterValue) => void;
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <View style={styles.row}>
      {OPTIONS.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            style={[styles.pill, selected && styles.pillSelected]}
            onPress={() => onChange(option.value)}
          >
            <Text style={[styles.label, selected && styles.labelSelected]}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: colors.surface,
  },
  pillSelected: {
    backgroundColor: colors.primary,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  labelSelected: {
    color: colors.badgeText,
  },
});
