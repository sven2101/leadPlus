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
import java.util.TimeZone;

import com.fasterxml.jackson.annotation.JsonFormat;

import dash.utils.YearComparator;
import dash.utils.YearMonthComparator;
import dash.utils.YearMonthDayComparator;

public class StatisticHelper {

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
	private Calendar from;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
	private Calendar until;

	private DateRange dateRange;

	private Map<String, Double> calendarMap;

	private Comparator<Calendar> calendarComparator;

	public StatisticHelper(DateRange dateRange) {
		from = Calendar.getInstance();
		until = Calendar.getInstance();
		calendarMap = new LinkedHashMap<>();
		this.dateRange = dateRange;
		calendarComparator = getComparatorByDateRange(dateRange);
		init(dateRange);
	}

	private void init(DateRange dateRange) {
		Calendar temp = Calendar.getInstance();
		if (dateRange.equals(DateRange.ALL)) {
			from.set(2014, 0, 1, 0, 0);
			temp.set(2014, 0, 1, 0, 0);
		} else {
			if (dateRange.equals(DateRange.YEARLY)) {
				from.set(Calendar.DAY_OF_MONTH, 1);
			}
			from.set(Calendar.HOUR_OF_DAY, 0);
			from.set(Calendar.MINUTE, 0);
			from.set(Calendar.SECOND, 0);
			from.add(dateRange.getCalendarFrom(), dateRange.getSubtractFromCalendarFrom());
			temp.add(dateRange.getCalendarFrom(), dateRange.getSubtractFromCalendarFrom());
		}

		// Generate every entry between from and until and initialize with zero
		while (calendarComparator.compare(temp, until) <= 0) {
			calendarMap.put(getKeyByDateRange(temp, dateRange), 0.00);
			temp.add(dateRange.getCalendarValue(), 1);
		}
	}

	public Calendar getFrom() {
		return from;
	}

	public Calendar getUntil() {
		return until;
	}

	public DateRange getDateRange() {
		return dateRange;
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
