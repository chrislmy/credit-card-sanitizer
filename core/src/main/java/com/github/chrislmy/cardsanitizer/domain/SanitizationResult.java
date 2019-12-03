package com.github.chrislmy.cardsanitizer.domain;

import java.util.List;

public class SanitizationResult {

  private final List<CardNumberMatch> cardNumberMatches;
  private final String result;

  public SanitizationResult(List<CardNumberMatch> cardNumberMatches, String result) {
    this.cardNumberMatches = cardNumberMatches;
    this.result = result;
  }

  public List<CardNumberMatch> cardNumberMatches() {
    return cardNumberMatches;
  }

  public String result() {
    return result;
  }
}
