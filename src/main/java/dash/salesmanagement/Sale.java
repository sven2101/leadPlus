package dash.salesmanagement;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Created by Andreas on 08.03.2016.
 */
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long id;
}
