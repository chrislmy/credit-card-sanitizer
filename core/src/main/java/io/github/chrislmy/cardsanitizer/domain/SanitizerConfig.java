package io.github.chrislmy.cardsanitizer.domain;

public class SanitizerConfig {

  private final char maskingCharacter;
  private final char[] invalidSeparators;
  private final int exposeFirst;
  private final int exposeLast;

  public static class Builder {

    private char maskingCharacter = 'X';
    private char[] invalidSeparators = new char[]{' ', '-'};
    private int exposeFirst = 6;
    private int exposeLast = 4;

    public Builder maskingCharacter(char maskingCharacter) {
      this.maskingCharacter = maskingCharacter;
      return this;
    }

    public Builder invalidSeparators(char[] invalidSeparators) {
      this.invalidSeparators = invalidSeparators;
      return this;
    }

    public Builder exposeFirst(int exposeFirst) {
      this.exposeFirst = exposeFirst;
      return this;
    }

    public Builder exposeLast(int exposeLast) {
      this.exposeLast = exposeLast;
      return this;
    }

    public SanitizerConfig build() {
      return new SanitizerConfig(this);
    }
  }

  public static Builder builder() {
    return new Builder();
  }

  private SanitizerConfig(Builder builder) {
    this.maskingCharacter = builder.maskingCharacter;
    this.invalidSeparators = builder.invalidSeparators;
    this.exposeFirst = builder.exposeFirst;
    this.exposeLast = builder.exposeLast;
  }

  public char maskingCharacter() {
    return maskingCharacter;
  }

  public char[] invalidSeparators() {
    return invalidSeparators;
  }

  public int exposeFirst() {
    return exposeFirst;
  }

  public int exposeLast() {
    return exposeLast;
  }
}
