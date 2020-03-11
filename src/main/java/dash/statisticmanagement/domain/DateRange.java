
package dash.statisticmanagement.domain;

import java.util.Calendar;

public enum DateRange {
	DAILY(Calendar.DAY_OF_YEAR, Calendar.DAY_OF_MONTH, 0), WEEKLY(Calendar.DAY_OF_MONTH, Calendar.DAY_OF_YEAR,
			-6), MONTHLY(Calendar.DAY_OF_MONTH, Calendar.DAY_OF_MONTH,
					-30), YEARLY(Calendar.MONTH, Calendar.YEAR, -1), ALL(Calendar.YEAR, Calendar.YEAR, 0);

	private int calendarValue;
	private int calendarFrom;
	private int subtractFromCalendarFrom;

	private DateRange(int calendarValue, int calendarFrom, int subtractFromCalendarFrom) {
		this.calendarValue = calendarValue;
		this.calendarFrom = calendarFrom;
		this.subtractFromCalendarFrom = subtractFromCalendarFrom;
	}

	public int getCalendarValue() {
		return calendarValue;
	}

	public int getCalendarFrom() {
		return calendarFrom;
	}

	public int getSubtractFromCalendarFrom() {
		return subtractFromCalendarFrom;
	}
}
