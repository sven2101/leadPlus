package dash.usermanagement;


import javax.persistence.*;
import java.util.Collection;

@Entity
public enum Role {
    USER, ADMIN, SUPERADMIN
}