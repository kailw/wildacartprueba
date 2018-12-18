/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.daw.factory;

import java.sql.Connection;
import net.daw.bean.beanImplementation.UsuarioBean;
import net.daw.dao.daoImplementation_1.FacturaDao_1;
import net.daw.dao.daoImplementation_1.LineaDao_1;
import net.daw.dao.daoImplementation_1.ProductoDao_1;
import net.daw.dao.daoImplementation_1.TipoproductoDao_1;
import net.daw.dao.daoImplementation_1.TipousuarioDao_1;
import net.daw.dao.daoImplementation_1.UsuarioDao_1;
import net.daw.dao.daoImplementation_2.FacturaDao_2;
import net.daw.dao.daoImplementation_2.LineaDao_2;
import net.daw.dao.daoImplementation_2.ProductoDao_2;
import net.daw.dao.daoImplementation_2.TipoproductoDao_2;
import net.daw.dao.daoImplementation_2.TipousuarioDao_2;
import net.daw.dao.daoImplementation_2.UsuarioDao_2;
import net.daw.dao.publicDaoInterface.DaoInterface;

/**
 *
 * @author kevin
 */
public class DaoFactory {

    public static DaoInterface getDao(Connection oConnection, String ob, UsuarioBean usuarioSession) {
        DaoInterface oDao = null;
        int idUsuario = 0;
        if (usuarioSession != null) {
            idUsuario = usuarioSession.getObj_tipoUsuario().getId();
        } else {
            idUsuario = 0;
        }

        switch (idUsuario) {
            case 1:
                switch (ob) {
                    case "usuario":
                        oDao = new UsuarioDao_1(oConnection, ob);
                        break;
                    case "tipousuario":
                        oDao = new TipousuarioDao_1(oConnection, ob);
                        break;
                    case "tipoproducto":
                        oDao = new TipoproductoDao_1(oConnection, ob);
                        break;
                    case "producto":
                        oDao = new ProductoDao_1(oConnection, ob);
                        break;
                    case "factura":
                        oDao = new FacturaDao_1(oConnection, ob);
                        break;
                    case "linea":
                        oDao = new LineaDao_1(oConnection, ob);
                        break;
                }
                break;
            case 2:
                switch (ob) {
                    case "usuario":
                        oDao = new UsuarioDao_2(oConnection, ob, usuarioSession);
                        break;
                    case "tipousuario":
                        oDao = new TipousuarioDao_2(oConnection, ob,usuarioSession);
                        break;
                    case "tipoproducto":
                        oDao = new TipoproductoDao_2(oConnection, ob,usuarioSession);
                        break;
                    case "producto":
                        oDao = new ProductoDao_2(oConnection, ob,usuarioSession);
                        break;
                    case "factura":
                        oDao = new FacturaDao_2(oConnection, ob,usuarioSession);
                        break;
                    case "linea":
                        oDao = new LineaDao_2(oConnection, ob,usuarioSession);
                        break;
                }                    

        }
        return oDao;
    }
}
