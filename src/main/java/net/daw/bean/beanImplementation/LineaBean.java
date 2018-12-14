/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.daw.bean.beanImplementation;

import com.google.gson.annotations.Expose;
import java.sql.Connection;
import java.sql.ResultSet;
import net.daw.bean.genericBeanImplementation.GenericBeanImplementation;
import net.daw.bean.publicBeanInterface.BeanInterface;
import net.daw.dao.daoImplementation.FacturaDao;
import net.daw.dao.daoImplementation.ProductoDao;

/**
 *
 * @author a044531896d
 */
public class LineaBean extends GenericBeanImplementation implements BeanInterface {

    @Expose
    private int cantidad;

    @Expose(serialize = false)
    private int id_producto;

    @Expose(serialize = false)
    private int id_factura;

    @Expose(deserialize = false)
    private ProductoBean obj_Producto;
    @Expose(deserialize = false)
    private FacturaBean obj_Factura;

    public ProductoBean getObj_Producto() {
        return obj_Producto;
    }

    public void setObj_Producto(ProductoBean obj_Producto) {
        this.obj_Producto = obj_Producto;
    }

    public FacturaBean getObj_Factura() {
        return obj_Factura;
    }

    public void setObj_Factura(FacturaBean obj_Factura) {
        this.obj_Factura = obj_Factura;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public int getId_producto() {
        return id_producto;
    }

    public void setId_producto(int id_producto) {
        this.id_producto = id_producto;
    }

    public int getId_factura() {
        return id_factura;
    }

    public void setId_factura(int id_factura) {
        this.id_factura = id_factura;
    }

    @Override
//    public LineaBean fill(ResultSet oResultSet, Connection oConnection, Integer expand) throws Exception {
//
//        this.setId(oResultSet.getInt("id"));
//        this.setCantidad(oResultSet.getInt("cantidad"));
//
//        if (expand > 0) {
//            ProductoDao oProductoDao = new ProductoDao(oConnection, "producto");
//            this.setObj_Producto(oProductoDao.get(oResultSet.getInt("id_producto"), expand - 1));
//        } else {
//            this.setId_producto(oResultSet.getInt("id_producto"));
//        }
//        if (expand > 0) {
//            FacturaDao oFacturaDao = new FacturaDao(oConnection, "factura");
//            this.setObj_Factura(oFacturaDao.get(oResultSet.getInt("id_factura"), expand - 1));
//        } else {
//            this.setId_factura(oResultSet.getInt("id_factura"));
//        }
//
//        return this;
//    }

    
    public String getColumns() {
        String strColumns = "";
        strColumns += "id,";
        strColumns += "cantidad,";
        strColumns += "id_factura,";
        strColumns += "id_producto";        
        return strColumns;
    }

    @Override
    public String getValues() {
        String strColumns = "";
        strColumns += "null,";
        strColumns += cantidad + ",";
        strColumns += id_producto + ",";
        strColumns += id_factura;
        return strColumns;
    }

    @Override
    public String getPairs(String ob) {
        String strPairs = "";
        strPairs += "id=" + id + ",";
        strPairs += "cantidad=" + cantidad + ",";
        strPairs += "id_factura=" + id_factura + ",";
        strPairs += "id_producto=" + id_producto;
        strPairs += " WHERE id=" + id;
        return strPairs;
    }

}
