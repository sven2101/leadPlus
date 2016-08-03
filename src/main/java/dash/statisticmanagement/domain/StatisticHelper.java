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
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonFormat;

import dash.utils.YearComparator;
import dash.utils.YearMonthComparator;
import dash.utils.YearMonthDayComparator;

public class StatisticHelper {

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
	private Calendar from;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
	private Calendar until;

	private Map<String, Double> calendarMap;

	private Comparator<Calendar> calendarComparator;

	public StatisticHelper(DateRange dateRange) {
		from = Calendar.getInstance();
		until = Calendar.getInstance();
		calendarMap = new LinkedHashMap<>();
		calendarComparator = getComparatorByDateRange(dateRange);
		init(dateRange);
	}

	private void init(DateRange dateRange) {
		until.add(Calendar.DAY_OF_MONTH, 1);
		if (dateRange.equals(DateRange.ALL)) {
			from.set(2014, 1, 1);
		} else {
			from.add(dateRange.getCalendarFrom(), dateRange.getSubtractFromCalendarFrom());
		}

		// Generate every entry between from and until and initialize with zero
		while (calendarComparator.compare(from, until) <= 0) {
			calendarMap.put(getKeyByDateRange(from, dateRange), 0.00);
			from.add(dateRange.getCalendarValue(), 1);
		}
	}

	public Calendar getFrom() {
		return from;
	}

	public Calendar getUntil() {
		return until;
	}

	public Map<String, Double> getCalendarMap() {
		return calendarMap;
	}

	private Comparator<Calendar> getComparatorByDateRange(DateRange dateRange) {
		if (dateRange == null)
			return null;
		switch (dateRange) {
		case DAILY:
		case WEEKLY:
		case MONTHLY:
			return new YearMonthDayComparator();
		case YEARLY:
			return new YearMonthComparator();
		case ALL:
			return new YearComparator();
		default:
			return null;
		}
	}

	public String getKeyByDateRange(Calendar calendar, DateRange dateRange) {
		if (calendar == null || dateRange == null)
			return "";
		switch (dateRange) {
		case DAILY:
		case WEEKLY:
		case MONTHLY:
			return String.valueOf(calendar.get(Calendar.DAY_OF_MONTH));
		case YEARLY:
			return String.valueOf(calendar.get(Calendar.YEAR)) + String.valueOf(calendar.get(Calendar.MONTH));
		case ALL:
			return String.valueOf(calendar.get(Calendar.YEAR));
		default:
			return "";
		}
	}

}
