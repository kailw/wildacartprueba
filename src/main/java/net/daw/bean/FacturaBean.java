/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.daw.bean;

import com.google.gson.annotations.Expose;
import java.util.Date;

/**
 *
 * @author a044531896d
 */
public class FacturaBean {

    @Expose
    private int id;
    @Expose
    private Date fecha;
    @Expose
    private Float iva;
    
    @Expose(serialize = false)
    private int id_usuario;

    @Expose(deserialize = false)
    private UsuarioBean obj_Usuario;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public double getIva() {
        return iva;
    }

    public void setIva(Float iva) {
        this.iva = iva;
    }

    public int getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(int id_usuario) {
        this.id_usuario = id_usuario;
    }

}
