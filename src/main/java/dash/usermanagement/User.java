package dash.usermanagement;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import dash.commentmanagement.Comment;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;

/**
 * Created by Andreas on 09.10.2015.
 */
@Entity
public class User implements UserDetails{

    private static final long serialVersionUID = 3125258392087209376L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(unique = true, length = 16, nullable = false)
    private String username;

    @Column(length = 50, nullable = false)
    private String email;

    @Column(length = 80, nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;
    
    @OneToMany
    @JoinColumn(name = "user_fk", nullable = false)
    private List<Comment> comment;

    private String profilPictureURL;
    private String defaultLanguage;
    
    public User(){}

    public User(String username, String firstName, String lastName, String email, String passwordHash, String profilPictureURL, String defaultLanguage){
        this.username = username;
	this.email = email;
        this.password = passwordHash;
        this.profilPictureURL = profilPictureURL;
        this.defaultLanguage = defaultLanguage;
    }

    public Long getId()
    {
        return this.id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public String getUsername()
    {
        return this.username;
    }

    public void setUsername(String username)
    {
        this.username = username;
    }

    public String getEmail()
    {
        return this.email;
    }

    public void setEmail(String email)
    {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(final Role role) {
        this.role = role;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }

    public String getPassword()
    {
        return password;
    }

    public String getProfilPictureURL() {
        return profilPictureURL;
    }

    public void setProfilPictureURL(String profilPictureURL) {
        this.profilPictureURL = profilPictureURL;
    }

    public String getDefaultLanguage() {
        return defaultLanguage;
    }

    public void setDefaultLanguage(String defaultLanguage) {
        this.defaultLanguage = defaultLanguage;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
