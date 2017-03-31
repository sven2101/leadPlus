package dash.common;

import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

public class HtmlCleaner {

	public static String cleanHtml(String html) {
		if (html == null) {
			return null;
		}
		return Jsoup.clean(html,
				Whitelist.relaxed().addAttributes(":all", "style").addAttributes(":all", "class")
						.addProtocols("img", "src", "data").addAttributes("img", "width").addAttributes("font", "face")
						.addTags("style").addTags("font"));
	}

	public static String cleanHtmlForPdf(String html) {
		if (html == null) {
			return null;
		}

		return Jsoup.clean(html,
				ExtendedHtmlWhitelist.relaxed().addAttributes(":all", "style").addAttributes(":all", "class")
						.addAttributes("img", "width").addAttributes("font", "face").addTags("style").addTags("font"));
	}
}
