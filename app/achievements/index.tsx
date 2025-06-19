import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Award, Trophy, Star, Target, Zap, Brain, Activity, Clock, Share2, X } from 'lucide-react-native';
import { Colors, Typography } from '@/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    ...Typography.sizes.subtitle,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  subtitle: {
    ...Typography.sizes.micro,
    color: Colors.text.tertiary,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.accentColors.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressOverview: {
    flexDirection: 'row',
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    alignItems: 'center',
  },
  progressCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.accentColors.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  progressPercentage: {
    ...Typography.sizes.h3,
    color: Colors.accentColors.primary,
  },
  progressLabel: {
    ...Typography.sizes.micro,
    color: Colors.text.tertiary,
  },
  progressStats: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
  },
  progressStat: {
    flex: 1,
    alignItems: 'center',
  },
  progressStatNumber: {
    ...Typography.sizes.button,
    color: Colors.accentColors.primary,
  },
  progressStatLabel: {
    ...Typography.sizes.micro,
    color: Colors.text.tertiary,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categories: {
    gap: 8,
    paddingHorizontal: 4,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    gap: 6,
  },
  categoryButtonActive: {
    backgroundColor: Colors.accentColors.primary,
    borderColor: Colors.accentColors.primary,
  },
  categoryText: {
    ...Typography.sizes.caption,
    color: Colors.text.secondary,
  },
  categoryTextActive: {
    color: '#000',
    fontFamily: Typography.weights.semiBold,
  },
  achievementsList: {
    flex: 1,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border.primary,
    alignItems: 'center',
  },
  achievementCardEarned: {
    borderColor: Colors.accentColors.primary,
    backgroundColor: 'rgba(255, 107, 53, 0.05)',
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    ...Typography.sizes.bodySmall,
    color: Colors.text.muted,
    marginBottom: 4,
  },
  achievementTitleEarned: {
    color: Colors.text.primary,
  },
  achievementDescription: {
    ...Typography.sizes.caption,
    color: Colors.text.tertiary,
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: Colors.background.tertiary,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.accentColors.primary,
    borderRadius: 2,
  },
  progressText: {
    ...Typography.sizes.micro,
    color: Colors.text.tertiary,
    minWidth: 40,
  },
  earnedDate: {
    ...Typography.sizes.micro,
    color: Colors.accentColors.primary,
  },
  achievementRarity: {
    alignItems: 'flex-end',
  },
  rarityText: {
    ...Typography.sizes.micro,
    fontFamily: Typography.weights.semiBold,
  },
}); 