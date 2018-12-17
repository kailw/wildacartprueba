/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.daw.dao.daoImplementation_2;

import net.daw.dao.daoImplementation_1.*;
import java.sql.Connection;
import net.daw.dao.genericDaoImplementation.GenericDaoImplementation;
import net.daw.dao.publicDaoInterface.DaoInterface;

/**
 *
 * @author a044531896d
 */
public class TipoproductoDao_2 extends GenericDaoImplementation implements DaoInterface {

    public TipoproductoDao_2(Connection oConnection, String ob) {
        super(oConnection,ob);
    }
    

}
