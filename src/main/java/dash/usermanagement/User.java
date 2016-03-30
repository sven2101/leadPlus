package dash.usermanagement;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import dash.processmanagement.comment.Comment;
import dash.usermanagement.settings.language.Language;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlTransient;
import java.util.Collection;
import java.util.List;

/**
 * Created by Andreas on 09.10.2015.
 */
@Entity
@Table(name = "\"User\"")
public class User implements UserDetails {

    private static final long serialVersionUID = 3125258392087209376L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(unique = true, length = 30, nullable = false)
    private String username;

    @Column(unique = true, length = 50, nullable = false)
    private String email;

    @Column(length = 60, nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy="creator")
    @JsonIgnore
    private List<Comment> comments;

    private String profilPictureURL;

    @Enumerated(EnumType.STRING)
    private Language language;

    private boolean enabled;

    public User() {
    }

    public User(String username, String firstName, String lastName, String email, String passwordHash, String profilPictureURL, Language language) {
        this.username = username;
        this.email = email;
        this.password = passwordHash;
        this.profilPictureURL = profilPictureURL;
        this.language = language;
        this.enabled = false;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public String getProfilPictureURL() {
        return profilPictureURL;
    }

    public void setProfilPictureURL(String profilPictureURL) {
        this.profilPictureURL = profilPictureURL;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public boolean getEnabled() {
        return this.enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public List<Comment> getComments() {
        return this.comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
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
        return this.enabled;
    }

}
