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

package dash.usermanagement.business;

import org.springframework.data.jpa.repository.JpaRepository;

import dash.usermanagement.domain.User;

//@Transactional
//@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	User findByUsernameIgnoreCase(String username);

	User findByEmailIgnoreCase(String email);
}