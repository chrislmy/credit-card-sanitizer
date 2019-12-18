package com.github.chrislmy.cardsanitizer.validators;

import static org.assertj.core.api.Java6Assertions.assertThat;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

public class LuhnValidatorTest {

  @ParameterizedTest
  @ValueSource(strings = {
      "4539074522729232",
      "4111111111111111",
      "4556453618085527",
      "4929703303065337",
      "4532738089949287",
      "4539006390521614"
  })
  void visaNumbersTest(String cardNumber) {
    assertThat(LuhnValidator.getInstance().isValid(cardNumber)).isTrue();
  }

  @ParameterizedTest
  @ValueSource(strings = {
      "5502477623629864",
      "5125601415638695",
      "5193719999185730",
      "5234992314987764",
      "5435259792329167"
  })
  void masterCardNumbersTest(String cardNumber) {
    assertThat(LuhnValidator.getInstance().isValid(cardNumber)).isTrue();
  }

  @ParameterizedTest
  @ValueSource(strings = {
      "6011456039291982",
      "6011548722483221",
      "6011638732403465",
      "6011155354739084",
      "6011720065410596"
  })
  void discoverCardNumbersTest(String cardNumber) {
    assertThat(LuhnValidator.getInstance().isValid(cardNumber)).isTrue();
  }

  @ParameterizedTest
  @ValueSource(strings = {
      "373349518107370",
      "378592288929896",
      "340956951687161",
      "349951280755319",
      "371048174095570"
  })
  void amexCardNumbersTest(String cardNumber) {
    assertThat(LuhnValidator.getInstance().isValid(cardNumber)).isTrue();
  }

  @ParameterizedTest
  @ValueSource(strings = {
      "411111111111111",
      "371449635398430",
      "30000000000001",
      "6011000000000002",
      "30569309025902",
      "6011111111111116",
      "35e0111e33300001",
      "555F55F55C554442"
  })
  void invalidCardNumbersTest(String cardNumber) {
    assertThat(LuhnValidator.getInstance().isValid(cardNumber)).isFalse();
  }
}
