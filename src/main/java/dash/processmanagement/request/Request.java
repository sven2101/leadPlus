
package dash.processmanagement.request;

import java.util.Calendar;
import java.util.List;

import dash.productmanagement.domain.OrderPosition;

public interface Request {

	Calendar getTimestamp();

	List<OrderPosition> getOrderPositions();
}
