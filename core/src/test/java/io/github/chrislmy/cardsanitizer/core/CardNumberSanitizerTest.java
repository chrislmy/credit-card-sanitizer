package io.github.chrislmy.cardsanitizer.core;

import static org.assertj.core.api.Java6Assertions.assertThat;

import io.github.chrislmy.cardsanitizer.domain.SanitizationResult;
import io.github.chrislmy.cardsanitizer.domain.SanitizerConfig;
import io.github.chrislmy.cardsanitizer.exceptions.InvalidSeparatorsException;
import java.io.IOException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import testutils.TextFileReader;

public class CardNumberSanitizerTest {

  private static final String pathToSampleFile = "src/test/resources/samples/text-with-numbers.txt";
  private static final String pathToSampleFileWithoutNumbers
      = "src/test/resources/samples/text-without-numbers.txt";
  private static final String[] cardNumbers = {
      "4111 1111 1111 1111",
      "6011 - 4560 - 3929 - 1982",
  };

  @Test
  void testDefaultCardNumberSanitizer() throws IOException {
    CardNumberSanitizer sanitizer = new CardNumberSanitizer();
    String input = new TextFileReader(pathToSampleFile).readFileAsString();

    SanitizationResult output = sanitizer.deepSanitize(injectCardNumbersToInput(input));
    assertThat(sanitizer.analyze(injectCardNumbersToInput(input))).isTrue();
    assertThat(output.cardNumberMatches().size()).isEqualTo(2);
    assertThat(output.cardNumberMatches().get(0).maskedPayload()).isEqualTo("411111XXXXXX1111");
    assertThat(output.cardNumberMatches().get(1).maskedPayload()).isEqualTo("601145XXXXXX1982");
    assertThat(output.result().contains("411111XXXXXX1111")).isTrue();
    assertThat(output.result().contains("601145XXXXXX1982")).isTrue();
  }

  @Test
  void testCardNumberSanitizerWithConfig() throws IOException {
    SanitizerConfig config = SanitizerConfig.builder()
        .maskingCharacter('*')
        .exposeFirst(0)
        .build();
    CardNumberSanitizer sanitizer = new CardNumberSanitizer(config);
    String input = new TextFileReader(pathToSampleFile).readFileAsString();

    SanitizationResult output = sanitizer.deepSanitize(injectCardNumbersToInput(input));
    assertThat(sanitizer.analyze(injectCardNumbersToInput(input))).isTrue();
    assertThat(output.cardNumberMatches().size()).isEqualTo(2);
    assertThat(output.cardNumberMatches().get(0).maskedPayload()).isEqualTo("************1111");
    assertThat(output.cardNumberMatches().get(1).maskedPayload()).isEqualTo("************1982");
    assertThat(output.result().contains("************1111")).isTrue();
    assertThat(output.result().contains("************1982")).isTrue();
  }

  @Test
  void testCardNumberSanitizerOnStringWithoutCardNumbers() throws IOException {
    CardNumberSanitizer sanitizer = new CardNumberSanitizer();
    String input = new TextFileReader(pathToSampleFileWithoutNumbers).readFileAsString();

    SanitizationResult output = sanitizer.deepSanitize(input);
    assertThat(sanitizer.analyze(input)).isFalse();
    assertThat(output.cardNumberMatches().size()).isEqualTo(0);
    assertThat(output.result()).isEqualTo(input);
  }

  @Test
  void testInvalidSeparatorsException() throws IOException {
    SanitizerConfig config = SanitizerConfig.builder()
        .invalidSeparators(new char[]{'*', '['})
        .build();
    CardNumberSanitizer sanitizer = new CardNumberSanitizer(config);
    String input = new TextFileReader(pathToSampleFileWithoutNumbers).readFileAsString();

    Assertions.assertThrows(InvalidSeparatorsException.class, () -> {
      sanitizer.sanitize(input);
    });
  }

  private String injectCardNumbersToInput(String input) {
    for (int i = 0; i < cardNumbers.length; i++) {
      input = input.replace(String.format("${number-%d}", i), cardNumbers[i]);
    }

    return input;
  }
}
