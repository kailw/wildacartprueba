/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.daw.service.serviceImplementation_2;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.File;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import net.daw.bean.beanImplementation.ReplyBean;
import net.daw.bean.beanImplementation.ProductoBean;
import net.daw.bean.publicBeanInterface.BeanInterface;
import net.daw.connection.publicConnectionInterface.ConnectionInterface;
import net.daw.constant.ConnectionConstants;
import net.daw.dao.daoImplementation_1.ProductoDao_1;
import net.daw.dao.daoImplementation_2.ProductoDao_2;
import net.daw.factory.ConnectionFactory;
import net.daw.helper.EncodingHelper;
import net.daw.helper.ParameterCook;
import net.daw.service.genericServiceImplementation.GenericServiceImplementation;
import net.daw.service.publicServiceInterface.ServiceInterface;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

/**
 *
 * @author a044531896d
 */
public class ProductoService_2 extends GenericServiceImplementation implements ServiceInterface{

    HttpServletRequest oRequest;
    String ob = null;

    public ProductoService_2(HttpServletRequest oRequest, String ob) {
        super(oRequest, ob);
        this.oRequest = oRequest;
        this.ob = ob;
    }
  

    public ReplyBean cargarProductos() throws Exception {
        ReplyBean oReplyBean;
        ConnectionInterface oConnectionPool = null;
        Connection oConnection;
        RellenarService_2 rellenar = new RellenarService_2();
        try {
            Integer numero = Integer.parseInt(oRequest.getParameter("numero"));
            oConnectionPool = ConnectionFactory.getConnection(ConnectionConstants.connectionPool);
            oConnection = oConnectionPool.newConnection();
            ProductoDao_2 oProductoDao = new ProductoDao_2(oConnection, ob, usuarioSession);
            ArrayList<ProductoBean> alProductoBean = rellenar.fillProducto(numero);

            for (ProductoBean productos : alProductoBean) {
                oProductoDao.create(productos);
            }
            Gson oGson = new Gson();
            oReplyBean = new ReplyBean(200, oGson.toJson(alProductoBean));
        } catch (Exception ex) {
            oReplyBean = new ReplyBean(500,
                    "ERROR: " + EncodingHelper.escapeQuotes(EncodingHelper.escapeLine(ex.getMessage())));
        } finally {
            oConnectionPool.disposeConnection();
        }
        return oReplyBean;
    }

    public ReplyBean addimage() throws Exception {
        String name = "";
        ReplyBean oReplyBean;        
        HashMap<String, String> hash = new HashMap<>();
        if (ServletFileUpload.isMultipartContent(oRequest)) {
            try {
                List<FileItem> multiparts = new ServletFileUpload(new DiskFileItemFactory()).parseRequest(oRequest);
                for (FileItem item : multiparts) {
                    if (!item.isFormField()) {
                        name = new File(item.getName()).getName();
                        item.write(new File(".//..//webapps//images//" + name));
                    } else {
                        hash.put(item.getFieldName(), item.getString());
                    }
                }
                oReplyBean = new ReplyBean(200, EncodingHelper.quotate("File uploaded Successfully: " + name));
            } catch (Exception ex) {
                oReplyBean = new ReplyBean(500, "Error while uploading file: " + name);
            }
        } else {
            oReplyBean = new ReplyBean(500, "Cant read image");
        }
        return oReplyBean;
    }
}
