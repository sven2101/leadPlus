package dash.usermanagement;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by Andreas on 09.10.2015.
 */
@Entity
public class User implements UserDetails{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(unique = true, length = 16, nullable = false)
    private String username;

    @Column(length = 16, nullable = false)
    private String email;

    @Column(length = 80, nullable = false)
    private String password;

    @ManyToMany
    @JoinTable(name = "users_roles",
                joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id") ,
                inverseJoinColumns = @JoinColumn(name = "role_id" + "", referencedColumnName = "id") )
    private Role role;

    public User(){}

    public User(String firstName, String lastName, String email, String username, String passwordHash){
        this.email = email;
        this.username = username;
        this.password = passwordHash;
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
