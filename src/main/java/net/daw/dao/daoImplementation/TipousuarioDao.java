package net.daw.dao.daoImplementation;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

import net.daw.bean.beanImplementation.TipousuarioBean;
import net.daw.dao.genericDaoImplementation.GenericDaoImplementation;
import net.daw.dao.publicDaoInterface.DaoInterface;
import net.daw.helper.SqlBuilder;

public class TipousuarioDao extends GenericDaoImplementation implements DaoInterface {

    public TipousuarioDao(Connection oConnection, String ob) {
        super(oConnection, ob);

    }

}
