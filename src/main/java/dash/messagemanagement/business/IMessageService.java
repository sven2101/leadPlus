
package dash.messagemanagement.business;

import java.io.IOException;

import dash.messagemanagement.domain.AbstractMessage;
import dash.notificationmanagement.domain.Notification;
import dash.templatemanagement.domain.WorkflowTemplateObject;
import dash.tenantmanagement.domain.Tenant;
import dash.usermanagement.domain.User;
import dash.usermanagement.password.forgot.domain.PasswordForgot;
import freemarker.template.TemplateException;

public interface IMessageService {

	String getRecipient();

	String getSubject();

	AbstractMessage getMessageContent(final WorkflowTemplateObject workflowTemplateObject,

			String templateWithPlaceholders, final Notification notification, final User user, final Long templateId)
			throws IOException, TemplateException;

	AbstractMessage getWelcomeMessage(String templateName, String tenant, User user) throws TemplateException;

	AbstractMessage getForgotPasswordMessage(String template, Tenant tenant, User user, PasswordForgot passwordForgot)
			throws TemplateException, IOException;

	String getMessageContentString(WorkflowTemplateObject workflowTemplateObject, String templateWithPlaceholders,
			User user, final Long templateId) throws IOException, TemplateException;

	String exportProcessAsPDF(WorkflowTemplateObject workflowTemplateObject, final User user)
			throws TemplateException, IOException;

}
