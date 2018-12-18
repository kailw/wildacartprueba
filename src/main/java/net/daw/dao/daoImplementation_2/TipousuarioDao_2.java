package net.daw.dao.daoImplementation_2;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import net.daw.bean.beanImplementation.UsuarioBean;
import net.daw.bean.publicBeanInterface.BeanInterface;
import net.daw.dao.genericDaoImplementation.GenericDaoImplementation;
import net.daw.dao.publicDaoInterface.DaoInterface;
import net.daw.factory.BeanFactory;

public class TipousuarioDao_2 extends GenericDaoImplementation implements DaoInterface {

    UsuarioBean usuarioSession;

    public TipousuarioDao_2(Connection oConnection, String ob, UsuarioBean usuarioSession) {
        super(oConnection, ob);
        this.usuarioSession = usuarioSession;
    }

    @Override
    public BeanInterface get(int id, Integer expand) throws Exception {
        if (id == usuarioSession.getObj_tipoUsuario().getId()) {
            String strSQL = "SELECT * FROM " + ob + " WHERE id=?";
            BeanInterface oBean;
            ResultSet oResultSet = null;
            PreparedStatement oPreparedStatement = null;
            try {
                oPreparedStatement = oConnection.prepareStatement(strSQL);
                oPreparedStatement.setInt(1, id);
                oResultSet = oPreparedStatement.executeQuery();
                if (oResultSet.next()) {
                    oBean = BeanFactory.getBean(ob);
                    oBean.fill(oResultSet, oConnection, expand);

                } else {
                    oBean = null;
                }
            } catch (SQLException e) {
                throw new Exception("Error en Dao get de " + ob, e);
            } finally {
                if (oResultSet != null) {
                    oResultSet.close();
                }
                if (oPreparedStatement != null) {
                    oPreparedStatement.close();
                }
            }
            return oBean;
        } else {
            throw new Exception("Error en Dao get de " + ob + ": No autorizado");
        }
    }

    @Override
    public int remove(int id) throws Exception {
        throw new Exception("Error en Dao remove de " + ob + ": No autorizado");
    }

    @Override
    public int getcount() throws Exception {
        throw new Exception("Error en Dao getcount de " + ob + ": No autorizado");
    }

    @Override
    public BeanInterface create(BeanInterface oBean) throws Exception {
        throw new Exception("Error en Dao create de " + ob + ": No autorizado");
    }

    @Override
    public int update(BeanInterface oBean) throws Exception {
        throw new Exception("Error en Dao update de " + ob + ": No autorizado");
    }

    @Override
    public ArrayList<BeanInterface> getpage(int iRpp, int iPage, HashMap<String, String> hmOrder, Integer expand) throws Exception {
        throw new Exception("Error en Dao getpage de " + ob + ": No autorizado");
    }
}
