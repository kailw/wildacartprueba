/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.daw.service;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import net.daw.bean.ProductoBean;
import net.daw.bean.UsuarioBean;

/**
 *
 * @author kevin
 */
public class RellenarProductoService {

    public ArrayList<ProductoBean> fill(int numero) throws Exception {
        ArrayList<ProductoBean> alProdcutoBean = new ArrayList<>();

        String codigo[] = {"A1", "B2", "C3", "K4", "T5", "M6", "P7", "U8"};
        String descUno[] = {"Herramienta", "Generador", "Aparejo", "Utensillo", "Artefacto", "Mecanismo", "Instrumento", "Maquina"};
        String descDos[] = {"Circular", "Cortante", "Electrico", "Manual", "Facil", "Largo", "Pequeno", "de Jardineria"};
        String descTres[] = {"para cortar", "para medir", "para lijar", "para romper", "para desbrozar", "para reposteria", "para carpinteria", "para perforar"};        
        DecimalFormat df = new DecimalFormat("#.##");
        
        
        for (int i = 0; i < numero; i++) {
            ProductoBean oProductoBean = new ProductoBean();
            oProductoBean.setCodigo(codigo[numeroAleatorio(codigo.length)]);
            oProductoBean.setDesc(descUno[numeroAleatorio(descUno.length)] + " " + descDos[numeroAleatorio(descDos.length)] + " " + descTres[numeroAleatorio(descTres.length)]);
            oProductoBean.setExistencias(numeroAleatorio(5)+1);
            oProductoBean.setFoto("fotoProducto");
            oProductoBean.setId_tipoProducto(numeroAleatorio(5));
            oProductoBean.setPrecio((float) (Math.round((Math.random() * 100) * 100) / 100.0 + 1));
            oProductoBean.setId_tipoProducto((int) Math.random()* 5+1);
            alProdcutoBean.add(oProductoBean);
        }
        return alProdcutoBean;
    }

    public int numeroAleatorio(int numero) {
        int aleatorio = (int) (Math.random() * numero);
        return aleatorio;
    }

}
