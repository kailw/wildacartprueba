/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.daw.service;

import java.text.DecimalFormat;
import java.util.ArrayList;
import net.daw.bean.ProductoBean;
import net.daw.bean.TipousuarioBean;
import net.daw.bean.UsuarioBean;

/**
 *
 * @author kevin
 */
public class RellenarService {

    public ArrayList<ProductoBean> fillProducto(int numero) throws Exception {
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
            oProductoBean.setExistencias(numeroAleatorio(5) + 1);
            oProductoBean.setFoto("fotoProducto");            
            oProductoBean.setPrecio((float) (Math.round((Math.random() * 100) * 100) / 100.0 + 1));
            oProductoBean.setId_tipoProducto((int) Math.random() * 5 + 1);
            alProdcutoBean.add(oProductoBean);
        }
        return alProdcutoBean;
    }

    public ArrayList<UsuarioBean> fillUsuario(int numero) throws Exception {
        String[] dni = {"243412121A", "74194431W", "68447883V", "16812040Y", "07251643L"};
        String[] nombre = {"Pepe", "Juan", "Pedro", "Maria", "kailwe"};
        String[] ape1 = {"Dominguez", "Rodriguez", "Segundo", "Martinez", "Garcia"};
        String[] ape2 = {"Lopez", "Fernandez", "Gonzalez", "Mohamed", "Sanchez"};
        String[] login = {"jauan", "tuuiy", "tupa", "aatr", "fdf"};
        String[] pass = {"1111", "2222", "3333", "4444", "5555"};        

        ArrayList<UsuarioBean> alUsuarioBean = new ArrayList<>();        
        for (int i = 0; i < numero; i++) {
            UsuarioBean oUsuarioBean = new UsuarioBean();
//            TipousuarioBean oTipousuarioBean = new TipousuarioBean();
            oUsuarioBean.setDni(dni[numeroAleatorio(dni.length)]);
            oUsuarioBean.setNombre(nombre[numeroAleatorio(nombre.length)]);
            oUsuarioBean.setApe1(ape1[numeroAleatorio(ape1.length)]);
            oUsuarioBean.setApe2(ape2[numeroAleatorio(ape2.length)]);
            oUsuarioBean.setLogin(login[numeroAleatorio(login.length)]);
            oUsuarioBean.setPass(pass[numeroAleatorio(pass.length)]);
            oUsuarioBean.setId_tipoUsuario((int) (Math.random() * 5) + 1);
//            oTipousuarioBean.setId(id_tipoUsuario[numeroAleatorio(id_tipoUsuario.length)]);
//            oUsuarioBean.setObj_tipoUsuario(oTipousuarioBean);
            alUsuarioBean.add(oUsuarioBean);
        }
        return alUsuarioBean;
    }

    public int numeroAleatorio(int numero) {
        int aleatorio = (int) (Math.random() * numero);
        return aleatorio;
    }

}
