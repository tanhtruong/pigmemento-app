import { StyleSheet, Platform } from 'react-native';
import { colors } from '@lib/theme/colors';

const SP = 16;
const IMAGE_HEIGHT = 320;

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: SP,
    paddingTop: SP,
    paddingBottom: SP + 8,
  },

  // Loading
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 6,
    fontSize: 11,
    color: colors.textSecondary,
  },

  // Image
  imageWrapper: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  image: {
    width: '100%',
    height: IMAGE_HEIGHT,
  },

  // Clinical context
  clinicalCard: {
    marginTop: 12,
    padding: 10,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  clinicalLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  clinicalMain: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  clinicalNote: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
  },

  // Question
  questionTitle: {
    marginTop: 18,
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  questionHelp: {
    marginTop: 4,
    fontSize: 11,
    color: colors.textSecondary,
  },

  // Choices
  choicesRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  choiceButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 3 },
        }
      : { elevation: 0 }),
  },
  choiceButtonSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
  },
  choiceText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  choiceTextSelected: {
    color: colors.accent,
  },

  // Submit
  submitButton: {
    marginTop: 18,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.accent,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.accentForeground,
  },

  // Validation / misc
  errorText: {
    marginTop: 6,
    fontSize: 11,
    color: colors.danger,
  },
  disclaimer: {
    marginTop: 16,
    fontSize: 9,
    color: colors.textSecondary,
  },
});
