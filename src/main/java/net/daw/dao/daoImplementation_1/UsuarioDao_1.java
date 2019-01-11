/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.daw.dao.daoImplementation_1;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import net.daw.bean.beanImplementation.UsuarioBean;
import net.daw.dao.genericDaoImplementation.GenericDaoImplementation;
import net.daw.dao.publicDaoInterface.DaoInterface;
import net.daw.helper.EncodingHelper;

/**
 *
 * @author jesus
 */
public class UsuarioDao_1 extends GenericDaoImplementation implements DaoInterface {

    public UsuarioDao_1(Connection oConnection, String ob, UsuarioBean oUsuarioBeanSession) {
        super(oConnection, ob, oUsuarioBeanSession);
    }

    public int updatePass(Integer id, String pass, UsuarioBean usuarioSession) throws Exception {
        int iResult = 0;
        String strSQL = "UPDATE " + ob + " SET pass = " + EncodingHelper.quotate(pass) + " WHERE id =" + id + ";";
        ResultSet oResultSet = null;
        PreparedStatement oPreparedStatement = null;
        try {
            if (usuarioSession.getId() == id) {
                oPreparedStatement = oConnection.prepareStatement(strSQL);
                iResult = oPreparedStatement.executeUpdate();
            } else {
                iResult = 0;
            }
        } catch (Exception e) {
            throw new Exception(e);
        } finally {
            if (oResultSet != null) {
                oResultSet.close();
            }
            if (oPreparedStatement != null) {
                oPreparedStatement.close();
            }
        }
        return iResult;
    }

}
