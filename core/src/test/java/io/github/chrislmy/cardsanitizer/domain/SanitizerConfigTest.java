package io.github.chrislmy.cardsanitizer.domain;

import static org.assertj.core.api.Java6Assertions.assertThat;
import org.junit.jupiter.api.Test;

public class SanitizerConfigTest {

  private static final char expectedMaskingCharacter = '*';
  private static final char[] expectedSeparators = new char[]{'*'};
  private static final int exposeFirst = 0;
  private static final int exposeLast = 4;

  @Test
  void testDefaultSanitizerConfig() {
    SanitizerConfig config = SanitizerConfig.builder().build();

    assertThat(config.maskingCharacter()).isEqualTo('X');
    assertThat(config.invalidSeparators()).isEqualTo(new char[]{' ', '-'});
    assertThat(config.exposeFirst()).isEqualTo(6);
    assertThat(config.exposeLast()).isEqualTo(4);
  }

  @Test
  void testCustomSanitizerConfig() {
    SanitizerConfig config = SanitizerConfig.builder()
        .maskingCharacter(expectedMaskingCharacter)
        .invalidSeparators(expectedSeparators)
        .exposeFirst(exposeFirst)
        .exposeLast(exposeLast)
        .build();

    assertThat(config.maskingCharacter()).isEqualTo(expectedMaskingCharacter);
    assertThat(config.invalidSeparators()).isEqualTo(expectedSeparators);
    assertThat(config.exposeFirst()).isEqualTo(exposeFirst);
    assertThat(config.exposeLast()).isEqualTo(exposeLast);
  }
}
