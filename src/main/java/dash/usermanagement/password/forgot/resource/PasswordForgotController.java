package dash.usermanagement.password.forgot.resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PasswordForgotController {

	@RequestMapping("/password/forgot")
	public String passwordForgot() {
		return "passwordForgot";
	}

	@RequestMapping("/password/forgot/reset")
	public String passwordForgotReset() {
		return "passwordForgotReset";
	}

}
