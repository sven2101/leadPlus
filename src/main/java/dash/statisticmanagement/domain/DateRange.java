/*******************************************************************************
 * Copyright (c) 2016 Eviarc GmbH.
 * All rights reserved.  
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Eviarc GmbH and its suppliers, if any.  
 * The intellectual and technical concepts contained
 * herein are proprietary to Eviarc GmbH,
 * and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Eviarc GmbH.
 *******************************************************************************/

package dash.statisticmanagement.domain;

import java.util.Calendar;

public enum DateRange {
	DAILY(Calendar.DAY_OF_YEAR, Calendar.DAY_OF_MONTH, -1), WEEKLY(Calendar.DAY_OF_MONTH, Calendar.DAY_OF_YEAR,
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
