package com.github.chrislmy.cardsanitizer.domain;

import static org.assertj.core.api.Java6Assertions.assertThat;

import com.github.chrislmy.cardsanitizer.exceptions.InvalidCardNumberBoundaryException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class SanitizerConfigTest {

  private static final char expectedMaskingCharacter = '*';
  private static final char[] expectedSeparators = new char[]{'*'};
  private static final int exposeFirst = 0;
  private static final int exposeLast = 4;
  private static final int cardNumberUpperBound = 19;
  private static final int cardNumberLowerBound = 13;

  @Test
  void testDefaultSanitizerConfig() {
    SanitizerConfig config = SanitizerConfig.builder().build();

    assertThat(config.maskingCharacter()).isEqualTo('X');
    assertThat(config.invalidSeparators()).isEqualTo(new char[]{' ', '-'});
    assertThat(config.exposeFirst()).isEqualTo(6);
    assertThat(config.exposeLast()).isEqualTo(4);
    assertThat(config.cardNumberUpperBound()).isEqualTo(16);
    assertThat(config.cardNumberLowerBound()).isEqualTo(15);
  }

  @Test
  void testCustomSanitizerConfig() {
    SanitizerConfig config = SanitizerConfig.builder()
        .maskingCharacter(expectedMaskingCharacter)
        .invalidSeparators(expectedSeparators)
        .exposeFirst(exposeFirst)
        .exposeLast(exposeLast)
        .cardNumberUpperBound(cardNumberUpperBound)
        .cardNumberLowerBound(cardNumberLowerBound)
        .build();

    assertThat(config.maskingCharacter()).isEqualTo(expectedMaskingCharacter);
    assertThat(config.invalidSeparators()).isEqualTo(expectedSeparators);
    assertThat(config.exposeFirst()).isEqualTo(exposeFirst);
    assertThat(config.exposeLast()).isEqualTo(exposeLast);
    assertThat(config.cardNumberUpperBound()).isEqualTo(cardNumberUpperBound);
    assertThat(config.cardNumberLowerBound()).isEqualTo(cardNumberLowerBound);
  }

  @Test
  void testInvalidCardBoundaryException() {
    Assertions.assertThrows(InvalidCardNumberBoundaryException.class, () -> {
      SanitizerConfig invalidConfig = SanitizerConfig.builder()
          .cardNumberUpperBound(15)
          .cardNumberLowerBound(20)
          .build();
    });
  }
}
