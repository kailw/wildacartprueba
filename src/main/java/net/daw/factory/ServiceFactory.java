package net.daw.factory;

import javax.servlet.http.HttpServletRequest;

import net.daw.bean.beanImplementation.ReplyBean;
import net.daw.serviceImplementation.CarritoService;
import net.daw.serviceImplementation.FacturaService;
import net.daw.serviceImplementation.LineaService;
import net.daw.serviceImplementation.ProductoService;
import net.daw.serviceImplementation.TipoproductoService;
import net.daw.serviceImplementation.TipousuarioService;
import net.daw.serviceImplementation.UsuarioService;

public class ServiceFactory {

    public static ReplyBean executeService(HttpServletRequest oRequest) throws Exception {

        String ob = oRequest.getParameter("ob");
        String op = oRequest.getParameter("op");
        ReplyBean oReplyBean = null;

        switch (ob) {
            case "tipousuario":
                TipousuarioService oTipousuarioService = new TipousuarioService(oRequest, ob);
                switch (op) {
                    case "get":
                        oReplyBean = oTipousuarioService.get();
                        break;
                    case "create":
                        oReplyBean = oTipousuarioService.create();
                        break;
                    case "update":
                        oReplyBean = oTipousuarioService.update();
                        break;
                    case "remove":
                        oReplyBean = oTipousuarioService.remove();
                        break;
                    case "getcount":
                        oReplyBean = oTipousuarioService.getcount();
                        break;
                    case "getpage":
                        oReplyBean = oTipousuarioService.getpage();
                        break;
                    default:
                        oReplyBean = new ReplyBean(500, "Operation doesn't exist");
                        break;
                }
                break;
            case "carrito":
                CarritoService oCarritoService = new CarritoService(oRequest, ob);
                switch (op) {
                    case "add":
                        oReplyBean = oCarritoService.add();
                        break;
                    case "empty":
                        oReplyBean = oCarritoService.empty();
                        break;
                    case "show":
                        oReplyBean = oCarritoService.show();
                        break;
                    case "buy":
                        oReplyBean = oCarritoService.buy();
                        break;
                    case "reduce":
                        oReplyBean = oCarritoService.reduce();
                        break;
                    case "allproduct":
                        oReplyBean = oCarritoService.totalproduct();
                        break;
                    default:
                        oReplyBean = new ReplyBean(500, "Operatin doesn't exist");
                        break;
                }
                break;
            case "usuario":
                UsuarioService oUsuarioService = new UsuarioService(oRequest, ob);
                switch (op) {
                    case "get":
                        oReplyBean = oUsuarioService.get();
                        break;
                    case "create":
                        oReplyBean = oUsuarioService.create();
                        break;
                    case "update":
                        oReplyBean = oUsuarioService.update();
                        break;
                    case "remove":
                        oReplyBean = oUsuarioService.remove();
                        break;
                    case "getcount":
                        oReplyBean = oUsuarioService.getcount();
                        break;
                    case "getpage":
                        oReplyBean = oUsuarioService.getpage();
                        break;
                    case "fill":
                        oReplyBean = oUsuarioService.cargarUsuarios();
                        break;
                    case "login":
                        oReplyBean = oUsuarioService.login();
                        break;
                    case "logout":
                        oReplyBean = oUsuarioService.logout();
                        break;
                    case "check":
                        oReplyBean = oUsuarioService.check();
                        break;
                    default:
                        oReplyBean = new ReplyBean(500, "Operation doesn't exist");
                        break;
                }
                break;
            case "factura":
                FacturaService oFacturaService = new FacturaService(oRequest, ob);
                switch (op) {
                    case "get":
                        oReplyBean = oFacturaService.get();
                        break;
                    case "create":
                        oReplyBean = oFacturaService.create();
                        break;
                    case "update":
                        oReplyBean = oFacturaService.update();
                        break;
                    case "remove":
                        oReplyBean = oFacturaService.remove();
                        break;
                    case "getcount":
                        oReplyBean = oFacturaService.getcount();
                        break;
                    case "getpage":
                        oReplyBean = oFacturaService.getpage();
                        break;
                    case "getpagexusuario":
                        oReplyBean = oFacturaService.getpageXusuario();
                        break;
                    case "getcountfacturauser":
                        oReplyBean = oFacturaService.getcountFacturaUser();
                        break;
                    default:
                        oReplyBean = new ReplyBean(500, "Operation doesn't exist");
                        break;
                }
                break;
            case "linea":
                LineaService oLineaService = new LineaService(oRequest, ob);
                switch (op) {
                    case "get":
                        oReplyBean = oLineaService.get();
                        break;
                    case "create":
                        oReplyBean = oLineaService.create();
                        break;
                    case "update":
                        oReplyBean = oLineaService.update();
                        break;
                    case "remove":
                        oReplyBean = oLineaService.remove();
                        break;
                    case "getcount":
                        oReplyBean = oLineaService.getcount();
                        break;
                    case "getpage":
                        oReplyBean = oLineaService.getpage();
                        break;
                    case "getlineafactura":
                        oReplyBean = oLineaService.getLineaFactura();
                        break;
                    case "getcountxlinea":
                        oReplyBean = oLineaService.getcountxlinea();
                        break;
                    default:
                        oReplyBean = new ReplyBean(500, "Operation doesn't exist");
                        break;
                }
                break;

            case "producto":
                ProductoService oProductoService = new ProductoService(oRequest, ob);
                switch (op) {
                    case "get":
                        oReplyBean = oProductoService.get();
                        break;
                    case "create":
                        oReplyBean = oProductoService.create();
                        break;
                    case "update":
                        oReplyBean = oProductoService.update();
                        break;
                    case "remove":
                        oReplyBean = oProductoService.remove();
                        break;
                    case "getcount":
                        oReplyBean = oProductoService.getcount();
                        break;
                    case "getpage":
                        oReplyBean = oProductoService.getpage();
                        break;
                    case "fill":
                        oReplyBean = oProductoService.cargarProductos();
                        break;
                    case "addimage":
                        oReplyBean = oProductoService.addimage();
                        break;
                    default:
                        oReplyBean = new ReplyBean(500, "Operation doesn't exist");
                        break;
                }
                break;
            case "tipoproducto":
                TipoproductoService oTipoproductoService = new TipoproductoService(oRequest, ob);
                switch (op) {
                    case "get":
                        oReplyBean = oTipoproductoService.get();
                        break;
                    case "create":
                        oReplyBean = oTipoproductoService.create();
                        break;
                    case "update":
                        oReplyBean = oTipoproductoService.update();
                        break;
                    case "remove":
                        oReplyBean = oTipoproductoService.remove();
                        break;
                    case "getcount":
                        oReplyBean = oTipoproductoService.getcount();
                        break;
                    case "getpage":
                        oReplyBean = oTipoproductoService.getpage();
                        break;
                    default:
                        oReplyBean = new ReplyBean(500, "Operation doesn't exist");
                        break;
                }
                break;
            default:
                oReplyBean = new ReplyBean(500, "Object doesn't exist");
                break;
        }
        return oReplyBean;
    }

}
