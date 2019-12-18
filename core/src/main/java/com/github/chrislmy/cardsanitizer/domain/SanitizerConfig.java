package com.github.chrislmy.cardsanitizer.domain;

import com.github.chrislmy.cardsanitizer.exceptions.InvalidCardNumberBoundaryException;

public class SanitizerConfig {

  private final char maskingCharacter;
  private final char[] invalidSeparators;
  private final int exposeFirst;
  private final int exposeLast;
  private final int cardNumberUpperBound;
  private final int cardNumberLowerBound;

  public static class Builder {

    private char maskingCharacter = 'X';
    private char[] invalidSeparators = new char[]{' ', '-'};
    private int exposeFirst = 6;
    private int exposeLast = 4;
    private int cardNumberUpperBound = 16;
    private int cardNumberLowerBound = 15;

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

    public Builder cardNumberUpperBound(int cardNumberUpperBound) {
      this.cardNumberUpperBound = cardNumberUpperBound;
      return this;
    }

    public Builder cardNumberLowerBound(int cardNumberLowerBound) {
      this.cardNumberLowerBound = cardNumberLowerBound;
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
    if (builder.cardNumberUpperBound < builder.cardNumberLowerBound) {
      String message = String.format("Card number lower bound (%d) is greater than upper bound (%d)"
          , builder.cardNumberLowerBound, builder.cardNumberUpperBound);
      throw new InvalidCardNumberBoundaryException(message);
    }

    this.maskingCharacter = builder.maskingCharacter;
    this.invalidSeparators = builder.invalidSeparators;
    this.exposeFirst = builder.exposeFirst;
    this.exposeLast = builder.exposeLast;
    this.cardNumberUpperBound = builder.cardNumberUpperBound;
    this.cardNumberLowerBound = builder.cardNumberLowerBound;
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

  public int cardNumberUpperBound() {
    return cardNumberUpperBound;
  }

  public int cardNumberLowerBound() {
    return cardNumberLowerBound;
  }
}
