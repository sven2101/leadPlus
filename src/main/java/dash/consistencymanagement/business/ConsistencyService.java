package dash.consistencymanagement.business;

import java.util.Calendar;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.context.SecurityContextHolder;

import dash.consistencymanagement.domain.ConsistencyObject;
import dash.exceptions.ConsistencyFailedException;
import dash.exceptions.NotFoundException;
import dash.security.jwt.domain.UserContext;

public abstract class ConsistencyService {

	/**
	 * Check if the object is up-to-date and set timestamp and editor to this
	 * object
	 * 
	 * @param consistencyObject
	 * @param repository
	 * @return
	 * @throws ConsistencyFailedException
	 */
	public <T> ConsistencyObject checkConsistencyAndSetTimestamp(ConsistencyObject consistencyObject,
			JpaRepository<T, Long> repository)
			throws ConsistencyFailedException, NotFoundException, IllegalArgumentException {
		if (consistencyObject == null || repository == null)
			throw new IllegalArgumentException();
		if (consistencyObject.getId() != null) {
			ConsistencyObject savedConsistencyObject = this.findConsistenceObjectById(consistencyObject, repository);
			if (savedConsistencyObject == null
					|| (savedConsistencyObject.isDeleted() && !consistencyObject.isDeleted()))
				throw new NotFoundException("Data not found (Maybe deleted). Go Back or refresh!");
			if (!checkConsistency(savedConsistencyObject, consistencyObject)) {
				throw new ConsistencyFailedException(savedConsistencyObject.getLastEditor() + ";"
						+ savedConsistencyObject.getLastEdited().getTimeInMillis());
			}
		}
		consistencyObject.setLastEdited(Calendar.getInstance());
		if (SecurityContextHolder.getContext() != null && SecurityContextHolder.getContext().getAuthentication() != null
				&& SecurityContextHolder.getContext().getAuthentication().getPrincipal() != null
				&& SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof UserContext) {
			UserContext userContext = (UserContext) SecurityContextHolder.getContext().getAuthentication()
					.getPrincipal();
			if (userContext == null)
				throw new ConsistencyFailedException("User unknown. Login again or contact your administrator");
			consistencyObject.setLastEditor(userContext.getUsername());
		} else {
			consistencyObject.setLastEditor("system");
		}
		return consistencyObject;
	}

	protected boolean checkConsistency(ConsistencyObject obj1, ConsistencyObject obj2) {
		if (obj1 == null || obj2 == null || obj1.getLastEdited() == null || obj2.getLastEdited() == null)
			return false;
		return obj1.getLastEdited().getTimeInMillis() == obj2.getLastEdited().getTimeInMillis();
	}

	protected <T> ConsistencyObject findConsistenceObjectById(ConsistencyObject consistencyObject,
			JpaRepository<T, Long> repository) {
		return (ConsistencyObject) repository.findOne(consistencyObject.getId());
	}

}
