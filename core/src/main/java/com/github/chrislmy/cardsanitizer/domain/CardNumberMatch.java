package com.github.chrislmy.cardsanitizer.domain;

public class CardNumberMatch {

  private String maskedPayload;
  private String originalPayload;
  private int startIndex;
  private int endIndex;

  public CardNumberMatch(String originalPayload, int startIndex, int endIndex) {
    this.originalPayload = originalPayload;
    this.startIndex = startIndex;
    this.endIndex = endIndex;
  }

  public String maskedPayload() {
    return maskedPayload;
  }

  public String originalPayload() {
    return originalPayload;
  }

  public int startIndex() {
    return startIndex;
  }

  public int endIndex() {
    return endIndex;
  }

  public void setMaskedPayload(String maskedPayload) {
    this.maskedPayload = maskedPayload;
  }

  public void setOriginalPayload(String originalPayload) {
    this.originalPayload = originalPayload;
  }

  public void setStartIndex(int startIndex) {
    this.startIndex = startIndex;
  }

  public void setEndIndex(int endIndex) {
    this.endIndex = endIndex;
  }
}


