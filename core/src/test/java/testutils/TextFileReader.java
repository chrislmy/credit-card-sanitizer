package testutils;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class TextFileReader {

  private InputStream inputStream;

  private BufferedReader bufferedReader;

  public TextFileReader(String pathToFile) throws FileNotFoundException {
    this.inputStream = new FileInputStream(pathToFile);
    this.bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
  }

  public String readFileAsString() throws IOException {
    String line = bufferedReader.readLine();
    StringBuilder stringBuilder = new StringBuilder();

    while (line != null) {
      stringBuilder.append(line).append("\n");
      line = bufferedReader.readLine();
    }

    return stringBuilder.toString();
  }
}
