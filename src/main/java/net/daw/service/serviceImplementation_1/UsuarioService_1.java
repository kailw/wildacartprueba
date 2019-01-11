/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.daw.service.serviceImplementation_1;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.sql.Connection;
import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import net.daw.bean.beanImplementation.ReplyBean;
import net.daw.bean.beanImplementation.UsuarioBean;
import net.daw.connection.publicConnectionInterface.ConnectionInterface;
import net.daw.constant.ConnectionConstants;
import net.daw.dao.daoImplementation_0.*;
import net.daw.dao.daoImplementation_1.UsuarioDao_1;
import net.daw.factory.ConnectionFactory;
import net.daw.helper.EncodingHelper;
import net.daw.service.genericServiceImplementation.GenericServiceImplementation;
import net.daw.service.publicServiceInterface.ServiceInterface;

/**
 *
 * @author jesus
 */
public class UsuarioService_1 extends GenericServiceImplementation implements ServiceInterface {

    HttpServletRequest oRequest;
    String ob = null;

    public UsuarioService_1(HttpServletRequest oRequest, String ob) {
        super(oRequest, ob);
        this.oRequest = oRequest;
        this.ob = ob;
    }

    protected Boolean checkPermission(String strMethodName) {
        UsuarioBean oUsuarioBean = (UsuarioBean) oRequest.getSession().getAttribute("user");
        if (oUsuarioBean != null) {
            return true;
        } else {
            return false;
        }
    }

    public ReplyBean cargarUsuarios() throws Exception {
        ReplyBean oReplyBean;
        ConnectionInterface oConnectionPool = null;
        Connection oConnection;
        RellenarService_1 rellenar = new RellenarService_1();
        if (this.checkPermission("fill")) {
            try {
                Integer numero = Integer.parseInt(oRequest.getParameter("numero"));
                oConnectionPool = ConnectionFactory.getConnection(ConnectionConstants.connectionPool);
                oConnection = oConnectionPool.newConnection();
                UsuarioDao_1 oUsuarioDao = new UsuarioDao_1(oConnection, ob, usuarioSession);
                ArrayList<UsuarioBean> alUsuarioBean = rellenar.fillUsuario(numero);

                for (UsuarioBean usuarios : alUsuarioBean) {
                    oUsuarioDao.create(usuarios);
                }
                Gson oGson = new Gson();
                oReplyBean = new ReplyBean(200, oGson.toJson(alUsuarioBean));
            } catch (Exception ex) {
                oReplyBean = new ReplyBean(500,
                        "ERROR: " + EncodingHelper.escapeQuotes(EncodingHelper.escapeLine(ex.getMessage())));
            } finally {
                oConnectionPool.disposeConnection();
            }
        } else {
            oReplyBean = new ReplyBean(401, "Unauthorized");
        }
        return oReplyBean;
    }

    public ReplyBean login() throws Exception {
        ReplyBean oReplyBean;
        ConnectionInterface oConnectionPool = null;
        Connection oConnection;
        String strLogin = oRequest.getParameter("user");
        String strPassword = oRequest.getParameter("pass");

        try {
            oConnectionPool = ConnectionFactory.getConnection(ConnectionConstants.connectionPool);
            oConnection = oConnectionPool.newConnection();
            UsuarioDao_0 oUsuarioDao = new UsuarioDao_0(oConnection, ob, usuarioSession);
            UsuarioBean oUsuarioBean = oUsuarioDao.login(strLogin, strPassword);
            if (oUsuarioBean != null) {
                oRequest.getSession().setAttribute("user", oUsuarioBean);
                Gson oGson = (new GsonBuilder()).excludeFieldsWithoutExposeAnnotation().create();
                oReplyBean = new ReplyBean(200, oGson.toJson(oUsuarioBean));
            } else {
                oReplyBean = new ReplyBean(401, "Bad Authentication");
            }
        } catch (Exception ex) {
            throw new Exception("ERROR Bad Authentication: Service level: login: " + ob + " object");
        } finally {
            oConnectionPool.disposeConnection();
        }
        return oReplyBean;
    }

    public ReplyBean logout() throws Exception {
        oRequest.getSession().invalidate();
        return new ReplyBean(200, EncodingHelper.quotate("OK"));
    }

    public ReplyBean check() throws Exception {
        ReplyBean oReplyBean;
        UsuarioBean oUsuarioBean;
        oUsuarioBean = (UsuarioBean) oRequest.getSession().getAttribute("user");
        if (oUsuarioBean != null) {
            Gson oGson = (new GsonBuilder()).excludeFieldsWithoutExposeAnnotation().create();
            oReplyBean = new ReplyBean(200, oGson.toJson(oUsuarioBean));
        } else {
            oReplyBean = new ReplyBean(401, "No active session");
        }
        return oReplyBean;
    }

    public ReplyBean changepassword() throws Exception {
        Gson oGson = new Gson();
        int iRes = 0;
        ConnectionInterface oConnectionPool = null;
        Connection oConnection;
        UsuarioBean oUsuarioBeanSession;
        oUsuarioBeanSession = (UsuarioBean) oRequest.getSession().getAttribute("user");
        String pass = oRequest.getParameter("pass");
        int id = Integer.parseInt(oRequest.getParameter("id"));
        ReplyBean oReplyBean = null;
        if (oUsuarioBeanSession != null) {
            try {
                oConnectionPool = ConnectionFactory.getConnection(ConnectionConstants.connectionPool);
                oConnection = oConnectionPool.newConnection();
                UsuarioDao_1 oUsuarioDao = new UsuarioDao_1(oConnection, "usuario", oUsuarioBeanSession);
                iRes = oUsuarioDao.updatePass(id, pass, oUsuarioBeanSession);
                oReplyBean = new ReplyBean(200, Integer.toString(iRes));
            } catch (Exception e) {
                throw new Exception(e);
            } finally {
                oConnectionPool.disposeConnection();
            }
        }
        return oReplyBean;
    }
}
