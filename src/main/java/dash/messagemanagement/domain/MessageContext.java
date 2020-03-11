package dash.messagemanagement.domain;

import javax.validation.constraints.NotNull;

import dash.notificationmanagement.domain.Notification;
import dash.templatemanagement.domain.Template;
import dash.templatemanagement.domain.WorkflowTemplateObject;
import dash.usermanagement.domain.User;

public class MessageContext {

	@NotNull
	private WorkflowTemplateObject workflowTemplateObject;

	private Notification notification;

	private User user;

	private Template template;

	public MessageContext() {
	}

	public WorkflowTemplateObject getWorkflowTemplateObject() {
		return workflowTemplateObject;
	}

	public void setWorkflowTemplateObject(WorkflowTemplateObject workflowTemplateObject) {
		this.workflowTemplateObject = workflowTemplateObject;
	}

	public Notification getNotification() {
		return notification;
	}

	public void setNotification(Notification notification) {
		this.notification = notification;
	}

	public Template getTemplate() {
		return template;
	}

	public void setTemplate(Template template) {
		this.template = template;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
