public class Solve {
    private static byte[] numbers = {
        48, 6, 122, -86, -73, -59, 78, 84, 105, -119, -36, -118, 70, 17, 101, -85, 55, -38, -91, 32, -18, -107, 53, 99,
        -74, 67, 89, 120, -41, 122, -100, -70, 34, -111, 21, -128, 78, 27, 123, -103, 36, 87
    };
    private static final int FLAG_LENGTH = numbers.length;

    private static void firstPassRev() {
        for (int i = 0; i < FLAG_LENGTH; i++) {
            numbers[i] ^= 3 * i * i + 5 * i + 101 + i % 2;
        }
    }

    private static void secondPassRev() {
        byte[] output = new byte[FLAG_LENGTH];
        // Left shift bits cyclically (rotate) across the entire byte array
        for (int i = 0; i < FLAG_LENGTH; i++) {
            output[i] = (byte) (((numbers[(i+1)%FLAG_LENGTH] & 0xff) >> 4) | (numbers[i] << 4));
        }
        numbers = output;
    }

    private static void thirdPassRev() {
        for (int i = 0; i < FLAG_LENGTH; i++) {
            numbers[i] -= 7 * i * i + 31 * i + 127 + i % 2;
        }
    }

    public static void main(String[] args) {
        thirdPassRev();
        secondPassRev();
        firstPassRev();

        System.out.println(new String(numbers));
    }
}
