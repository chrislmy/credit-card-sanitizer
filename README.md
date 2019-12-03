# Credit Card Sanitizer
Users of your application may enter sensitive information such as credit card numbers where they 
shouldn't. If a credit card number is entered into a form on a website or an app, it may get stored 
into a database or logged. This is likely undesirable for a business, since it can
be very hard to get rid of a stored card numbers on multiple places in a system.

Removal of credit card information is an important element in compliance with the [Payment Card Industry
Data Security Standard (PCI DSS)](https://www.pcisecuritystandards.org).

This Java library scans text for potential matches of credit card numbers and applies the Luhn 
checksum algorithm to verify if the found match is a valid credit card number. These card numbers 
are then 'masked' by replacing some or all of the digits with a replacement character. The library 
also provide other useful utility functions when searching for occurrences of of credit card numbers.

## Usage
#### Basic usage
The `CardNumberSanitizer` class contains the utility functions to sanitize or search of occurrences 
of card numbers. The most basic usage of the class is used as described below:

```java
 CardNumberSanitizer sanitizer = new CardNumberSanitizer();
 String output = sanitizer.sanitize(input);
```

You might have different requirements for performing the masking of these card numbers for example: 
requiring a specific masking character, masking a specific part of the card number if not masking the 
whole number. For this reason, the `CardNumberSanitizer` class also accepts a `SanitizerConfig` when 
instantiated using the constructor. Below is an example usage:

```java
 SanitizerConfig config = SanitizerConfig.builder()
        .exposeFirst(0)
        .maskingCharacter('*')
        .invalidSeparators(new char[]{'*'})
        .build();
 CardNumberSanitizer sanitizer = new CardNumberSanitizer(config);
 String output = sanitizer.sanitize(input);
```

#### Custom config for sanitization
Below is a table describing the `SanitizerConfig` properties.

Property                  | Description
------------------------- | -----------
`maskingCharacter`        | The character used to mask digits of the credit number.  The default is `X`.
`exposeFirst`             | The number of leading digits of the credit card number to leave unmasked. The default is `6`.
`exposeLast`              | The number of trailing digits of the credit card number to leave unmasked. The default is `4`.
`invalidSeparators`       | An array of `charracters` which are considered invalid delimiters when searching of matches of card numbers in a string. The default is `-` (dashes) and whitespaces.


#### Other functions
The `CardNumberSanitizer` class contains an `analyze` method which performs a light weight analysis 
on an input string and returns a boolean indicating if the string has valid card numbers or not.

```java
 CardNumberSanitizer sanitizer = new CardNumberSanitizer();
 boolean containsCardNumbers = sanitizer.analyze(input);
 
 if(containsCardNumbers) {
  log("Oh dear someone entered something they shouldn't have!")
 } else {
  log("All good :)")
 }
```

A `deepSanitize` method is also available if you wish to not only sanitize the input string but also 
obtain a `list` of `CardNumberMatch` objects in the form of a `SanitizationResult`.

```java
 CardNumberSanitizer defaultSanitizer = new CardNumberSanitizer(config);
 SanitizationResult output = defaultSanitizer.deepSanitize(input);

 System.out.println("Sanitized string: " + output.result());

 for (CardNumberMatch match : output.cardNumberMatches()) {
   System.out.println("Original: " + match.originalPayload() + " Masked: " + match.maskedPayload());
 }
```
The `CardNumberMatch` class has the following fields:

Field Nme                 | Description
------------------------- | -----------
`startIndex`         | The start index of the match in the given string.
`endIndex`           | The end index of the match in the given string.
`originalPayload`    | The original card number match.
`maskedPayload`      | The masked card number match.

#### Error handling
The underlying implementation of this library uses regex strings to search for potential card number 
matches. On rare occasions, an invalid set of separators may be passed into the sanitizer config. If this 
is the case, a `InvalidSeparatorsException` is thrown. It is recommended that this exception is handled 
when dealing with many and complicated invalid separators.

```java
 SanitizerConfig config = SanitizerConfig.builder()
    .invalidSeparators(new char[]{'*', ' ', '['})
    .build();
 CardNumberSanitizer defaultSanitizer = new CardNumberSanitizer(config);

 try {
   defaultSanitizer.sanitize(input);
 } catch (InvalidSeparatorsException ex) {
   ... Do something with the exception
 }
```

## Contributing or raising issues
If you find any issues when using this library please feel free to reach out to me at my email 
(lmy6088@gmail.com) or raise an issue in this repo with a short description of the encountered issue. 

If you are comfortable, feel free to raise a pull request as well to address any issues but please 
ensure that they pass the unit test suite.
