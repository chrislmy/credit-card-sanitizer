package com.github.chrislmy.examples;

import com.github.chrislmy.cardsanitizer.core.CardNumberSanitizer;
import com.github.chrislmy.cardsanitizer.domain.SanitizerConfig;
import com.github.chrislmy.cardsanitizer.exceptions.InvalidSeparatorsException;

public class ErrorHandlingExample {

  public static void main(String[] args) {
    String input = "Hello my card is 4111 1111 1111 1111 maybe "
        + "you should not store that in your database!";

    SanitizerConfig config = SanitizerConfig.builder()
        .invalidSeparators(new char[]{'*', ' ', '['})
        .build();
    CardNumberSanitizer defaultSanitizer = new CardNumberSanitizer(config);

    try {
      defaultSanitizer.deepSanitize(input);
    } catch (InvalidSeparatorsException ex) {
      System.out.println(ex.getMessage());
    }
  }
}
