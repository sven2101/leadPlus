package dash.tenantmanagement.rest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class TenantController {

	@RequestMapping("/registration")
	public String passwordForgot() {
		return "registration";
	}

}
