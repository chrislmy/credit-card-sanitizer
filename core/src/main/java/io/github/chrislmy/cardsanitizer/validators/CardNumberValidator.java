package io.github.chrislmy.cardsanitizer.validators;

import io.github.chrislmy.cardsanitizer.exceptions.InvalidCardNumberException;

public final class CardNumberValidator implements Validator {

  public static final CardNumberValidator LUHN_VALIDATOR = new CardNumberValidator();
  private int modulus = 10;

  private CardNumberValidator() {
  }

  /**
   * Performs the Luhn's checksum algorithm on a given input string and returns a boolean
   * indicating if the input passes the Luhn's checksum.
   *
   * @param input Input card number string.
   * @return Boolean indicating if input card number is valid.
   */
  @Override
  public boolean isValid(String input) {
    if (input == null || input.length() == 0) {
      return false;
    }

    try {
      int modulus = calculateModulus(input);
      return (modulus == 0);
    } catch (InvalidCardNumberException ex) {
      return false;
    }
  }

  private int calculateModulus(String input) throws InvalidCardNumberException {
    int total = 0;
    boolean isDoubled = false;

    for (int i = input.length() - 1; i >= 0; i--) {
      int charValue = toInt(input.charAt(i), i);
      total += weightedValue(charValue, isDoubled);
      isDoubled = !isDoubled;
    }

    return total % modulus;
  }

  private int toInt(char character, int position) throws InvalidCardNumberException {
    if (Character.isDigit(character)) {
      return Character.getNumericValue(character);
    }
    throw new InvalidCardNumberException(
        "Invalid character[" + position + "] = '" + character + "'");
  }

  private int weightedValue(int charValue, boolean isDoubled) {
    int weight = isDoubled ? 2 : 1;
    int weightedValue = charValue * weight;
    return weightedValue > 9 ? (weightedValue - 9) : weightedValue;
  }
}
