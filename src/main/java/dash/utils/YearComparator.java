
package dash.utils;

import java.util.Calendar;
import java.util.Comparator;

import org.springframework.stereotype.Service;

@Service
public class YearComparator implements Comparator<Calendar> {
	@Override
	public int compare(Calendar c1, Calendar c2) {
		return c1.get(Calendar.YEAR) - c2.get(Calendar.YEAR);
	}
}
