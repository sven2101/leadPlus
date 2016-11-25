package dash.common;

public class CommonUtils {

	public static boolean isNullOrEmpty(String s) {
		if (s == null || "".equals(s))
			return true;
		return false;
	}
}
