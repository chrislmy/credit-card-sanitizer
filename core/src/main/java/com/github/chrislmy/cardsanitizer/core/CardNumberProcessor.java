package com.github.chrislmy.cardsanitizer.core;

import com.github.chrislmy.cardsanitizer.domain.CardNumberMatch;
import com.github.chrislmy.cardsanitizer.domain.SanitizerConfig;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import com.github.chrislmy.cardsanitizer.validators.LuhnValidator;

public class CardNumberProcessor {

  private String invalidSeparatorRegex;
  private int cardNumberUpperBound;
  private int cardNumberLowerBound;

  CardNumberProcessor(SanitizerConfig config) {
    this.invalidSeparatorRegex = generateInvalidSeparatorRegex(config.invalidSeparators());
    this.cardNumberUpperBound = config.cardNumberUpperBound();
    this.cardNumberLowerBound = config.cardNumberLowerBound();
  }

  /**
   * Finds a list of valid card numbers within an input string.
   *
   * @param input Input string
   * @return A list of {@link CardNumberMatch}
   */
  List<CardNumberMatch> findCardNumbers(String input) {
    List<CardNumberMatch> matches = new ArrayList<>();

    for (int cardLength = cardNumberUpperBound; cardLength >= cardNumberLowerBound; cardLength--) {
      Matcher matcher = generateCardNumberPattern(cardLength).matcher(input);

      while (matcher.find()) {
        CardNumberMatch match = new CardNumberMatch(matcher.group(), matcher.start(), matcher.end());
        matches.add(match);
      }
    }

    return filterValidCreditCardNumbers(matches);
  }

  /**
   * Strips the invalid separators from a card number match.
   *
   * @param cardNumber Card number string with separators
   * @return Cleaned card number string
   */
  String removeSeparators(String cardNumber) {
    return cardNumber.replaceAll(invalidSeparatorRegex, "");
  }

  private List<CardNumberMatch> filterValidCreditCardNumbers(List<CardNumberMatch> cardNumbers) {
    return cardNumbers
        .stream()
        .filter(this::checkValidCreditCardNumber)
        .collect(Collectors.toList());
  }

  private boolean checkValidCreditCardNumber(CardNumberMatch cardNumber) {
    String cleanedCardNumber = removeSeparators(cardNumber.originalPayload());
    return LuhnValidator.getInstance().isValid(cleanedCardNumber);
  }

  private Pattern generateCardNumberPattern(int cardNumberLength) {
    String regex = String.format("(?:\\d%s*?){%d}", invalidSeparatorRegex, cardNumberLength);
    return Pattern.compile(regex);
  }

  private String generateInvalidSeparatorRegex(char[] invalidSeparators) {
    Set<Character> invalidSeparatorsSet = new HashSet<>();

    for (char separator : invalidSeparators) {
      invalidSeparatorsSet.add(separator);
    }

    return buildSeparatorRegexString(invalidSeparatorsSet);
  }

  private String buildSeparatorRegexString(Set<Character> separators) {
    StringBuilder regexBuilder = new StringBuilder();

    regexBuilder.append('[');
    if (separators.contains(' ')) {
      regexBuilder.append(' ');
      separators.remove(' ');
    }
    for (char separator : separators) {
      regexBuilder.append(separator);
    }
    regexBuilder.append(']');

    return regexBuilder.toString();
  }
}
