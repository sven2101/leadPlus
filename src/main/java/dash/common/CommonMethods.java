package dash.common;

public class CommonMethods {

	public static boolean isNullOrEmpty(String s) {
		if (s == null || "".equals(s))
			return true;
		return false;
	}
}
