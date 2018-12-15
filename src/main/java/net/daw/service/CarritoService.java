/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.daw.service;

import com.google.gson.Gson;
import java.io.Serializable;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import net.daw.bean.beanImplementation.FacturaBean;
import net.daw.bean.beanImplementation.ItemBean;
import net.daw.bean.beanImplementation.LineaBean;
import net.daw.bean.beanImplementation.ProductoBean;
import net.daw.bean.beanImplementation.ReplyBean;
import net.daw.bean.beanImplementation.UsuarioBean;
import net.daw.connection.publicinterface.ConnectionInterface;
import net.daw.constant.ConnectionConstants;
import net.daw.dao.daoImplementation.FacturaDao;
import net.daw.dao.daoImplementation.LineaDao;
import net.daw.dao.daoImplementation.ProductoDao;
import net.daw.factory.ConnectionFactory;
import net.daw.helper.EncodingHelper;

/**
 *
 * @author a024465169t
 */
public class CarritoService implements Serializable {

    HttpServletRequest oRequest;
    String ob = null;
    Gson oGson = new Gson();
    ReplyBean oReplyBean;
    ArrayList<ItemBean> cart = null;
    Connection oConnection = null;

    public CarritoService(HttpServletRequest oRequest) {
        super();
        this.oRequest = oRequest;
        ob = oRequest.getParameter("ob");
    }

    public ReplyBean add() throws Exception {
        ConnectionInterface oConnectionPool = null;
        //Obtenemos la sesion actual
        HttpSession sesion = oRequest.getSession();

        try {
            Connection oConnection;

            //Si no existe la sesion creamos al carrito
            if (sesion.getAttribute("cart") == null) {
                cart = new ArrayList<ItemBean>();
            } else {
                cart = (ArrayList<ItemBean>) sesion.getAttribute("cart");
            }

            //Obtenemos el producto que deseamos añadir al carrito
            Integer id = Integer.parseInt(oRequest.getParameter("producto"));
            Integer cant = Integer.parseInt(oRequest.getParameter("cantidad"));
            oConnectionPool = ConnectionFactory.getConnection(ConnectionConstants.connectionPool);
            oConnection = oConnectionPool.newConnection();
            ProductoDao oProductoDao = new ProductoDao(oConnection, "producto");
            ProductoBean oProductoBean = (ProductoBean) oProductoDao.get(id, 1);
            Integer existencias = oProductoBean.getExistencias();

            //Para saber si tenemos agregado el producto al carrito de compras
            int indice = -1;
            //recorremos todo el carrito de compras
            for (int i = 0; i < cart.size(); i++) {
                if (oProductoBean.getId() == cart.get(i).getObj_Producto().getId()) {
                    //Si el producto ya esta en el carrito, obtengo el indice dentro
                    //del arreglo para actualizar al carrito de compras
                    indice = i;
                    break;
                }
            }
            ItemBean oItemBean = new ItemBean();
            if (indice == -1) {
                //Si es -1 es porque voy a registrar
                if (existencias >= 1 && existencias > cant) {
                    oItemBean.setObj_Producto(oProductoBean);
                    oItemBean.setCantidad(cant);
                    cart.add(oItemBean);
                } else {
                    /*Si la cantidad demandada es mayor a las existencias
                    ponemos las existencias maximas de ese producto.                    
                     */
                    if (existencias > 0) {
                        oItemBean.setObj_Producto(oProductoBean);
                        oItemBean.setCantidad(existencias);
                        cart.add(oItemBean);
                    }
                }
            } else {
                //Si es otro valor es porque el producto esta en el carrito
                //y vamos actualizar la cantidad
                Integer cantidad = cart.get(indice).getCantidad() + cant;
                if (existencias >= cantidad) {
                    cart.get(indice).setCantidad(cantidad);
                }
            }
            //Actualizamos la sesion del carrito de compras
            sesion.setAttribute("cart", cart);

            oReplyBean = new ReplyBean(200, oGson.toJson(cart));

        } catch (Exception ex) {
//            Logger.getLogger(CartService.class.getName()).log(Level.SEVERE, null, ex);
            oReplyBean = new ReplyBean(500, "Error en add CartService: " + ex.getMessage());
        } finally {
            oConnectionPool.disposeConnection();
        }
        return oReplyBean;
    }

    public ReplyBean empty() throws Exception {
        HttpSession sesion = oRequest.getSession();
        cart = (ArrayList<ItemBean>) sesion.getAttribute("cart");
        cart.clear();
        sesion.setAttribute("cart", cart);
        oReplyBean = new ReplyBean(200, EncodingHelper.quotate("Carrito vacio"));
        return oReplyBean;
    }

    public ReplyBean show() throws Exception {
        HttpSession sesion = oRequest.getSession();
        try {
            cart = (ArrayList<ItemBean>) sesion.getAttribute("cart");
            if (cart == null || cart.size() <= 0) {
                oReplyBean = new ReplyBean(200, EncodingHelper.quotate("Carrito vacio"));
            } else {
                oReplyBean = new ReplyBean(200, oGson.toJson(oRequest.getSession().getAttribute("cart")));
            }

        } catch (Exception e) {
            oReplyBean = new ReplyBean(500, "Error en add CartService: " + e.getMessage());
        }
        return oReplyBean;
    }

    public ReplyBean totalproduct() throws Exception {
        HttpSession sesion = oRequest.getSession();        
        try {
            cart = (ArrayList<ItemBean>) sesion.getAttribute("cart");
            oReplyBean = new ReplyBean(200, EncodingHelper.quotate(String.valueOf(cart.size())));
            
        } catch (Exception e) {
            oReplyBean = new ReplyBean(500, "Error en totalproduct CartService: " + e.getMessage());
        }
        return oReplyBean;
    }



public ReplyBean reduce() throws Exception {
        //Obtenemos la sesion actual
        HttpSession sesion = oRequest.getSession();

        try {
            //obtemos el carrito 
            cart = (ArrayList<ItemBean>) sesion.getAttribute("cart");

            //Obtenemos el producto que deseamos añadir al carrito
            Integer id = Integer.parseInt(oRequest.getParameter("producto"));
            Integer cantidad = Integer.parseInt(oRequest.getParameter("cantidad"));
            Integer contenedor, resta = 0;
//            //Para saber si tenemos agregado el producto al carrito de compras
//            int indice = -1;
            //recorremos todo el carrito de compras
            for (int i = 0; i < cart.size(); i++) {
                if (id == cart.get(i).getObj_Producto().getId()) {
                    contenedor = cart.get(i).getCantidad();
                    resta = contenedor - cantidad;
                    if (resta == 0) {
                        cart.remove(i);
                    } else {
                        cart.get(i).setCantidad(resta);
                    }
                    break;
                }
            }
            //Actualizamos la sesion del carrito de compras
            sesion.setAttribute("cart", cart);

            oReplyBean = new ReplyBean(200, oGson.toJson(cart));

        } catch (Exception ex) {
            oReplyBean = new ReplyBean(500, "Error en reduce CartService: " + ex.getMessage());
        }
        return oReplyBean;
    }

//    public ReplyBean update() throws Exception {
//
//        ConnectionInterface oConnectionPool = null;
//        //Obtenemos la sesion actual
//        HttpSession sesion = oRequest.getSession();
//
//        cart = (ArrayList<ItemBean>) sesion.getAttribute("cart");
//
//        try {
//            Integer id = Integer.parseInt(oRequest.getParameter("producto"));
//            Integer cant = Integer.parseInt(oRequest.getParameter("cantidad"));
//            oConnectionPool = ConnectionFactory.getConnection(ConnectionConstants.connectionPool);
//            oConnection = oConnectionPool.newConnection();
//            ProductoDao oProductoDao = new ProductoDao(oConnection, "producto");
//            ProductoBean oProductoBean = oProductoDao.get(id, 2);
//
//            Integer existencias = oProductoBean.getExistencias();
//
//            for (ItemBean ib : cart) {
//
//                if (ib.getObj_Producto().getId() == id) {
//
//                    if (oProductoBean.getExistencias() > 0) {
//
//                        if (cant <= oProductoBean.getExistencias()) {
//                            ib.setCantidad(cant);
//                        } else {
//
//                            ib.setCantidad(oProductoBean.getExistencias());
//                        }
//                    }
//                }
//
//            }
//
//            oReplyBean = new ReplyBean(200, oGson.toJson(cart));
//
//        } catch (Exception e) {
//            oReplyBean = new ReplyBean(500, "Error en update CartService: " + e.getMessage());
//        } finally {
//            oConnectionPool.disposeConnection();
//        }
//
//        return oReplyBean;
//    }

    public ReplyBean buy() throws Exception {

        ConnectionInterface oConnectionPool = null;
        //Obtenemos la sesion actual
        HttpSession sesion = oRequest.getSession();

        try {

            oConnectionPool = ConnectionFactory.getConnection(ConnectionConstants.connectionPool);
            oConnection = oConnectionPool.newConnection();
            oConnection.setAutoCommit(false);
            int id = ((UsuarioBean) sesion.getAttribute("user")).getId();
            cart = (ArrayList<ItemBean>) sesion.getAttribute("cart");

            FacturaBean oFacturaBean = new FacturaBean();
            Date fechaHoraAhora = new Date();
            oFacturaBean.setId_usuario(id);
            oFacturaBean.setFecha(fechaHoraAhora);
            oFacturaBean.setIva(21.0f);

            //ya tenemos el bean relleno, solo falta crear la factura
            FacturaDao oFacturaDao = new FacturaDao(oConnection, "factura");

            FacturaBean oFacturaBeanCreada = (FacturaBean) oFacturaDao.create(oFacturaBean);
            int id_factura = oFacturaBeanCreada.getId();
            //YA TENEMOS CREADA LA FACTURA Y FATA HACER BUCLE PARA CREAR LINEAS
            LineaDao oLineaDao;
            LineaBean oLineaBean;
            ProductoDao oProductoDao = new ProductoDao(oConnection, "producto");
            oLineaDao = new LineaDao(oConnection, "linea");
            ProductoBean oProductoBean;

            for (ItemBean ib : cart) {

                //CREAMOS LA LÍNEA
                int cant = ib.getCantidad();

                oLineaBean = new LineaBean();

                oLineaBean.setId_factura(id_factura);
                oLineaBean.setId_producto(ib.getObj_Producto().getId());
                oLineaBean.setCantidad(cant);

                oLineaDao.create(oLineaBean);

                //RESTAMOS EXISTENCIAS DE LA BBDD
                oProductoBean = new ProductoBean();

                oProductoBean.setId(ib.getObj_Producto().getId());

                oProductoBean = ib.getObj_Producto();

                oProductoBean.setExistencias(oProductoBean.getExistencias() - cant);

                oProductoDao.update(oProductoBean);

            }

            oConnection.commit();

            cart.clear();
            sesion.setAttribute("cart", cart);

            oReplyBean = new ReplyBean(200, EncodingHelper.quotate("Factura nº " + id_factura + " creada con éxito"));

        } catch (Exception e) {

            try {
                oConnection.rollback();
            } catch (SQLException excep) {

            }

            oReplyBean = new ReplyBean(500, "Error en buy CartService: " + e.getMessage());
        } finally {
            oConnectionPool.disposeConnection();
        }

        return oReplyBean;

    }

}
