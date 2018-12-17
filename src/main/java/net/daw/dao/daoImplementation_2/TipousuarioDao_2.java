package net.daw.dao.daoImplementation_2;

import java.sql.Connection;
import net.daw.dao.genericDaoImplementation.GenericDaoImplementation;
import net.daw.dao.publicDaoInterface.DaoInterface;

public class TipousuarioDao_2 extends GenericDaoImplementation implements DaoInterface {

    public TipousuarioDao_2(Connection oConnection, String ob) {
        super(oConnection, ob);
    }

}
