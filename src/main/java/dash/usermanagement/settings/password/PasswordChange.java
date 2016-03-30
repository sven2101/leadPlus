package dash.usermanagement.settings.password;

public class PasswordChange {

    private String newPassword;
    private String oldPassword;
    
    public PasswordChange(){}

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }


}
