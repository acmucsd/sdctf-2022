import java.io.Console;

public class Oracle {
    private static final int FLAG_LENGTH = 42; // what a coincidence, the answer to life.
    private static final byte[] CHECK = {
        48, 6, 122, -86, -73, -59, 78, 84, 105, -119, -36, -118, 70, 17, 101, -85, 55, -38, -91, 32, -18, -107, 53, 99,
        -74, 67, 89, 120, -41, 122, -100, -70, 34, -111, 21, -128, 78, 27, 123, -103, 36, 87
    };
    private static byte[] numbers;

    private static void firstPass() {
        for (int i = 0; i < FLAG_LENGTH; i++) {
            numbers[i] ^= 3 * i * i + 5 * i + 101 + i % 2;
        }
    }

    private static void secondPass() {
        byte[] output = new byte[FLAG_LENGTH];
        // Right shift bits cyclically (rotate) across the entire byte array
        for (int i = 0; i < FLAG_LENGTH; i++) {
            output[i] = (byte) ((numbers[(i+FLAG_LENGTH-1)%FLAG_LENGTH] << 4) | ((numbers[i] & 0xff) >> 4));
        }
        numbers = output;
    }

    private static void thirdPass() {
        for (int i = 0; i < FLAG_LENGTH; i++) {
            numbers[i] += 7 * i * i + 31 * i + 127 + i % 2;
        }
    }

    private static void fail() {
        System.out.println("That's not the flag. Try again.");
        System.exit(1);
    }

    public static void main(String[] args) {
        Console console = System.console();
        
        numbers = console.readLine("Enter flag: ").getBytes();
        if (numbers.length != FLAG_LENGTH) {
            fail();
        }
        firstPass();
        secondPass();
        thirdPass();

        int xor = 0; // timing safe equals
        for (int i = 0; i < FLAG_LENGTH; i++) {
            xor |= CHECK[i] ^ numbers[i];
        }
        if (xor != 0) {
            fail();
        }
        System.out.println("Good job. You found the flag!");
    }
}
