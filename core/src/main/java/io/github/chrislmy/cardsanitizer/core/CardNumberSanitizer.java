package io.github.chrislmy.cardsanitizer.core;

import io.github.chrislmy.cardsanitizer.domain.CardNumberMatch;
import io.github.chrislmy.cardsanitizer.domain.SanitizationResult;
import io.github.chrislmy.cardsanitizer.domain.SanitizerConfig;
import io.github.chrislmy.cardsanitizer.exceptions.InvalidSeparatorsException;

import java.util.Arrays;
import java.util.List;
import java.util.regex.PatternSyntaxException;

public class CardNumberSanitizer {

  private SanitizerConfig sanitizerConfig;
  private CardNumberProcessor cardNumberProcessor;

  public CardNumberSanitizer() {
    SanitizerConfig sanitizerConfig = SanitizerConfig.builder().build();
    this.sanitizerConfig = sanitizerConfig;
    this.cardNumberProcessor = new CardNumberProcessor();
  }

  public CardNumberSanitizer(SanitizerConfig sanitizerConfig) {
    this.sanitizerConfig = sanitizerConfig;
    this.cardNumberProcessor = new CardNumberProcessor(sanitizerConfig.invalidSeparators());
  }

  /**
   * Checks if an input string contains any valid card numbers. Returns true if valid card numbers
   * are found and false otherwise.
   *
   * @param input Input string to analyze.
   * @return Boolean indicating if card numbers are found in an input string.
   */
  public boolean analyze(String input) {
    List<CardNumberMatch> validCardNumberMatches = cardNumberProcessor.findCardNumbers(input);
    return !validCardNumberMatches.isEmpty();
  }

  /**
   * Performs sanitization on an input string and masks all occurrences of card numbers.
   *
   * @param input Input string to sanitize
   * @return Sanitized input
   */
  public String sanitize(String input) {
    List<CardNumberMatch> validCardNumberMatches = getValidCardNumberMatches(input);
    return performSanitization(new StringBuilder(input), validCardNumberMatches);
  }

  /**
   * Performs full sanitization on an input string and masks all occurrences of card numbers and
   * returning a list of matches.
   *
   * @param input
   * @return Sanitized input and a list of matches in the form of a {@link SanitizationResult}
   */
  public SanitizationResult deepSanitize(String input) {
    List<CardNumberMatch> fullCardNumberMatches = findMatches(input);
    String sanitizedString = performSanitization(new StringBuilder(input), fullCardNumberMatches);

    return new SanitizationResult(fullCardNumberMatches, sanitizedString);
  }

  /**
   * Searches the input string for card numbers and returns a list of matches
   *
   * @param input Input String
   * @return List of {@link CardNumberMatch}
   */
  public List<CardNumberMatch> findMatches(String input) {
    List<CardNumberMatch> validCardNumberMatches = getValidCardNumberMatches(input);
    constructFullCardNumberMatches(validCardNumberMatches);

    return validCardNumberMatches;
  }

  private void constructFullCardNumberMatches(List<CardNumberMatch> matches) {
    matches.forEach((match) -> match.setMaskedPayload(maskString(match.originalPayload())));
  }

  private String performSanitization(StringBuilder outputStringBuilder,
      List<CardNumberMatch> cardNumberMatches) {
    for (CardNumberMatch match : cardNumberMatches) {
      String cardNumber = match.originalPayload();
      outputStringBuilder.replace(match.startIndex(), match.endIndex(), maskString(cardNumber));
    }

    return outputStringBuilder.toString();
  }

  private String maskString(String cardNumberMatch) {
    String cleanedCardNumberMatch = cardNumberProcessor.removeSeparators(cardNumberMatch);
    char[] charArray = cleanedCardNumberMatch.toCharArray();

    for (int i = sanitizerConfig.exposeFirst();
        i < cleanedCardNumberMatch.length() - sanitizerConfig.exposeLast(); i++) {
      charArray[i] = sanitizerConfig.maskingCharacter();
    }

    return String.valueOf(charArray);
  }

  private List<CardNumberMatch> getValidCardNumberMatches(String input) {
    List<CardNumberMatch> validCardNumberMatch;

    try {
      validCardNumberMatch = cardNumberProcessor.findCardNumbers(input);
    } catch (PatternSyntaxException e) {
      String invalidSeparatorStr = Arrays.toString(sanitizerConfig.invalidSeparators());
      StringBuilder builder = new StringBuilder(invalidSeparatorStr);
      builder.setCharAt(0,'(');
      builder.setCharAt(invalidSeparatorStr.length() - 1,')');
      String message = String.format("Invalid separators provided: %s", builder.toString());
      throw new InvalidSeparatorsException(message);
    }

    return validCardNumberMatch;
  }
}
