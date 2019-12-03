package com.github.chrislmy.examples;

import com.github.chrislmy.cardsanitizer.core.CardNumberSanitizer;
import com.github.chrislmy.cardsanitizer.domain.CardNumberMatch;
import com.github.chrislmy.cardsanitizer.domain.SanitizationResult;
import com.github.chrislmy.cardsanitizer.domain.SanitizerConfig;

public class SanitizerWithConfigExample {

  public static void main(String[] args) {
    String input = "Hello my card is 4111*1111*1111*1111 maybe "
        + "you should not store that in your database!";

    SanitizerConfig config = SanitizerConfig.builder()
        .exposeFirst(0)
        .maskingCharacter('*')
        .invalidSeparators(new char[]{'*'})
        .build();
    CardNumberSanitizer defaultSanitizer = new CardNumberSanitizer(config);
    SanitizationResult output = defaultSanitizer.deepSanitize(input);

    System.out.println("Input string contain card numbers: " + defaultSanitizer.analyze(input));
    System.out.println("Sanitized string: " + output.result());
    System.out.println("------- Matches -------");

    for (CardNumberMatch match : output.cardNumberMatches()) {
      System.out.println("Original: " + match.originalPayload() + " Masked: " + match.maskedPayload());
    }
  }
}
