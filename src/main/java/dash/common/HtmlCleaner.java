package dash.common;

import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

public class HtmlCleaner {

	public static String cleanHtml(String html) {
		if (html == null) {
			return null;
		}
		return Jsoup.clean(html, Whitelist.relaxed().addAttributes(":all", "style"));
	}
}
