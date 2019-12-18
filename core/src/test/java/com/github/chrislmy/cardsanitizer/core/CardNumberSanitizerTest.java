package com.github.chrislmy.cardsanitizer.core;

import static org.assertj.core.api.Java6Assertions.assertThat;

import com.github.chrislmy.cardsanitizer.domain.SanitizationResult;
import com.github.chrislmy.cardsanitizer.domain.SanitizerConfig;
import com.github.chrislmy.cardsanitizer.exceptions.InvalidSeparatorsException;
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

  private CardNumberSanitizer sanitizer = new CardNumberSanitizer();
  private SanitizerConfig config = SanitizerConfig.builder()
      .maskingCharacter('*')
      .exposeFirst(0)
      .build();
  private CardNumberSanitizer sanitizerWithConfig = new CardNumberSanitizer(config);

  @Test
  void testDefaultSanitizerOnBasicText() {
    String input = "Hello my card is 4111 1111 1111 1111 and my birthday is 29/06/1996 "
        + "maybe you should not store that in your database!";
    String expectedOutput = "Hello my card is 411111XXXXXX1111 and my birthday is 29/06/1996 "
        + "maybe you should not store that in your database!";

    SanitizationResult output = sanitizer.deepSanitize((input));
    assertThat(sanitizer.analyze(input)).isTrue();
    assertThat(output.cardNumberMatches().size()).isEqualTo(1);
    assertThat(output.cardNumberMatches().get(0).maskedPayload()).isEqualTo("411111XXXXXX1111");
    assertThat(output.result()).isEqualTo(expectedOutput);
  }

  @Test
  void testSanitizerWithConfigOnBasicText() {
    String input = "Hello my card is 4111 1111 1111 1111 and my birthday is 29/06/1996 "
        + "maybe you should not store that in your database!";
    String expectedOutput = "Hello my card is ************1111 and my birthday is 29/06/1996 "
        + "maybe you should not store that in your database!";

    SanitizationResult output = sanitizerWithConfig.deepSanitize((input));
    assertThat(sanitizerWithConfig.analyze(input)).isTrue();
    assertThat(output.cardNumberMatches().size()).isEqualTo(1);
    assertThat(output.cardNumberMatches().get(0).maskedPayload()).isEqualTo("************1111");
    assertThat(output.result()).isEqualTo(expectedOutput);
  }

  @Test
  void testDefaultSanitizerOnTextWithMultipleNumbers() {
    String input = "Hello my card is 4111 - 1111 - 1111 - 1111 "
        + "and 6011 - 4560 - 3929 - 1982 maybe you should not store that in your database!";
    String expectedOutput = "Hello my card is 411111XXXXXX1111 "
        + "and 601145XXXXXX1982 maybe you should not store that in your database!";

    SanitizationResult output = sanitizer.deepSanitize((input));
    assertThat(sanitizer.analyze(input)).isTrue();
    assertThat(output.cardNumberMatches().size()).isEqualTo(2);
    assertThat(output.cardNumberMatches().get(0).maskedPayload()).isEqualTo("411111XXXXXX1111");
    assertThat(output.cardNumberMatches().get(1).maskedPayload()).isEqualTo("601145XXXXXX1982");
    assertThat(output.result()).isEqualTo(expectedOutput);
  }

  @Test
  void testDefaultSanitizerOnCardNumbersSideBySide() {
    String input = "Hello my card is 4111-1111-1111-1111 "
        + "6011-4560-3929-1982 maybe you should not store that in your database!";
    String expectedOutput = "Hello my card is 411111XXXXXX1111 "
        + "601145XXXXXX1982 maybe you should not store that in your database!";

    SanitizationResult output = sanitizer.deepSanitize((input));
    assertThat(sanitizer.analyze(input)).isTrue();
    assertThat(output.cardNumberMatches().size()).isEqualTo(2);
    assertThat(output.cardNumberMatches().get(0).maskedPayload()).isEqualTo("411111XXXXXX1111");
    assertThat(output.cardNumberMatches().get(1).maskedPayload()).isEqualTo("601145XXXXXX1982");
    assertThat(output.result()).isEqualTo(expectedOutput);
  }

  @Test
  void testDefaultCardNumberSanitizerWithTextBlob() throws IOException {
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
  void testCardNumberSanitizerWithConfigWithTextBlob() throws IOException {
    String input = new TextFileReader(pathToSampleFile).readFileAsString();

    SanitizationResult output = sanitizerWithConfig.deepSanitize(injectCardNumbersToInput(input));
    assertThat(sanitizerWithConfig.analyze(injectCardNumbersToInput(input))).isTrue();
    assertThat(output.cardNumberMatches().size()).isEqualTo(2);
    assertThat(output.cardNumberMatches().get(0).maskedPayload()).isEqualTo("************1111");
    assertThat(output.cardNumberMatches().get(1).maskedPayload()).isEqualTo("************1982");
    assertThat(output.result().contains("************1111")).isTrue();
    assertThat(output.result().contains("************1982")).isTrue();
  }

  @Test
  void testCardNumberSanitizerOnStringWithoutCardNumbers() throws IOException {
    String input = new TextFileReader(pathToSampleFileWithoutNumbers).readFileAsString();

    SanitizationResult output = sanitizer.deepSanitize(input);
    assertThat(sanitizer.analyze(input)).isFalse();
    assertThat(output.cardNumberMatches().size()).isEqualTo(0);
    assertThat(output.result()).isEqualTo(input);
  }

  @Test
  void testInvalidSeparatorsException() throws IOException {
    SanitizerConfig invalidConfig = SanitizerConfig.builder()
        .invalidSeparators(new char[]{'*', '['})
        .build();
    CardNumberSanitizer invalidSanitizer = new CardNumberSanitizer(invalidConfig);
    String input = new TextFileReader(pathToSampleFileWithoutNumbers).readFileAsString();

    Assertions.assertThrows(InvalidSeparatorsException.class, () -> {
      invalidSanitizer.sanitize(input);
    });
  }

  private String injectCardNumbersToInput(String input) {
    for (int i = 0; i < cardNumbers.length; i++) {
      input = input.replace(String.format("${number-%d}", i), cardNumbers[i]);
    }

    return input;
  }
}
