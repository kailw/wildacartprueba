/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.daw.bean.publicBeanInterface;

import java.sql.Connection;
import java.sql.ResultSet;
import net.daw.bean.beanImplementation.UsuarioBean;

/**
 *
 * @author kevin
 */
public interface BeanInterface {

    public int getId();

    public void setId(int id);

    public BeanInterface fill(ResultSet oResultSet, Connection oConnection, Integer expand, UsuarioBean oUsuarioBeanSession) throws Exception;

    public String getColumns();

    public String getValues();

    public String getPairs();

}
