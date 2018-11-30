/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.daw.service;

import com.google.gson.Gson;
import java.io.Serializable;
import java.sql.Connection;
import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import net.daw.bean.CarritoBean;
import net.daw.bean.ProductoBean;
import net.daw.bean.ReplyBean;
import net.daw.bean.UsuarioBean;
import net.daw.connection.publicinterface.ConnectionInterface;
import net.daw.constant.ConnectionConstants;
import net.daw.dao.ProductoDao;
import net.daw.factory.ConnectionFactory;

/**
 *
 * @author a024465169t
 */
public class CarritoService implements Serializable {

    HttpServletRequest oRequest;
    String ob = null;

    public CarritoService(HttpServletRequest oRequest) {
        super();
        this.oRequest = oRequest;
        ob = oRequest.getParameter("ob");
    }

    public ReplyBean add() throws Exception {
        ConnectionInterface oConnectionPool = null;
        Connection oConnection;
        ReplyBean oReplyBean = null;
        Gson oGson = new Gson();

        try {
            oConnectionPool = ConnectionFactory.getConnection(ConnectionConstants.connectionPool);
            oConnection = oConnectionPool.newConnection();

            Integer idProducto = Integer.parseInt(oRequest.getParameter("producto"));
            Integer cantidad = Integer.parseInt(oRequest.getParameter("cantidad"));

            //ver lo que contiene el objeto sesion 
            HttpSession session = oRequest.getSession();

            //Aqui es donde el implements de la clase serializable hace su trabajo (o eso creo)
            ArrayList<CarritoBean> alCarritoBean = new ArrayList<>();
//            alCarritoBean = (ArrayList<CarritoBean>) session.getAttribute("producto");

            //No puedo hacer una iteracion de un objeto en null, porque salta excepcion
            CarritoBean oCarritoBean = new CarritoBean();
            if (alCarritoBean != null) {
                Boolean exists = false;
                for (CarritoBean c : alCarritoBean) {
                    if (cantidad >= c.getObj_Producto().getExistencias()) {                        
                        oReplyBean = new ReplyBean(404,"Cantidad superior a existencias");                        
                    }
                    if (idProducto == c.getObj_Producto().getId()) {
                        c.setCantidad(c.getCantidad() + cantidad);
                        exists = true;
                        break;
                    }
                }
                if (!exists) {                    
                    ProductoDao oProductoDao = new ProductoDao(oConnection, "producto");
                    ProductoBean oProductoBean = oProductoDao.get(idProducto, 1);
                    if (cantidad > oProductoBean.getExistencias()) {
                        oReplyBean = new ReplyBean(404,"Cantidad superior a existencias");     
                    }
                    oCarritoBean.setCantidad(cantidad);
                    oCarritoBean.setObj_Producto(oProductoBean);
                    alCarritoBean.add(oCarritoBean);
                }
                
                oRequest.getSession().setAttribute("producto", alCarritoBean);
                
            } else {                             
                ProductoDao oProductoDao = new ProductoDao(oConnection, "producto");
                ProductoBean oProductoBean = oProductoDao.get(idProducto, 1);
                if (oProductoBean == null) {
                    oReplyBean = new ReplyBean(404,"No existe el producto que desea añadir");     
                }
                if (cantidad >= oProductoBean.getExistencias()) {
                    oReplyBean = new ReplyBean(404,"Cantidad superior a existencias");     
                }
                oCarritoBean.setCantidad(cantidad);
                oCarritoBean.setObj_Producto(oProductoBean);
                alCarritoBean.add(oCarritoBean);
                
                oRequest.getSession().setAttribute("producto", alCarritoBean);
            }

        } finally {
            oConnectionPool.disposeConnection();
        }

        return new ReplyBean(200, oGson.toJson(oRequest.getSession().getAttribute("producto")));

    }

    public ReplyBean empty() throws Exception {
        oRequest.removeAttribute("producto");
        Gson oGson = new Gson();
        ReplyBean oReplyBean = new ReplyBean(200, oGson.toJson(oRequest.getSession()));
        return oReplyBean;
    }

    public ReplyBean show() throws Exception {
        Gson oGson = new Gson();
        ReplyBean oReplyBean = new ReplyBean(200, oGson.toJson(oRequest.getSession().getAttribute("producto")));
        return oReplyBean;
    }

}
