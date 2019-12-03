package com.github.chrislmy.examples;

import com.github.chrislmy.cardsanitizer.core.CardNumberSanitizer;
import com.github.chrislmy.cardsanitizer.domain.CardNumberMatch;
import com.github.chrislmy.cardsanitizer.domain.SanitizationResult;

public class DefaultSanitizerExample {

  public static void main(String[] args) {
    String input = "Hello my card is 4111 1111 1111 1111 maybe "
        + "you should not store that in your database!";

    CardNumberSanitizer defaultSanitizer = new CardNumberSanitizer();
    SanitizationResult output = defaultSanitizer.deepSanitize(input);
    
    System.out.println("Input string contain card numbers: " + defaultSanitizer.analyze(input));
    System.out.println("Sanitized string: " + output.result());
    System.out.println("------- Matches -------");

    for (CardNumberMatch match : output.cardNumberMatches()) {
      System.out.println("Original: " + match.originalPayload() + " Masked: " + match.maskedPayload());
    }
  }
}
