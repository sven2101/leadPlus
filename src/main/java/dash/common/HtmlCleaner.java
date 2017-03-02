package dash.common;

public class HtmlCleaner {

	public static String cleanHtml(String html) {
		if (html == null) {
			return null;
		}
		return html;
		// return Jsoup.clean(html, Whitelist.relaxed().addAttributes(":all",
		// "style").addProtocols("img", "src", "data"));
	}
}
