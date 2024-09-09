import { Request, Response } from 'express';
import { User } from '../models/user';
import { Sales } from '../models/sales';



export const getAdministrators = async (request: Request, response: Response) => {
  let administratorsList:any= [];
  try {
    administratorsList = await User.findAll({ where: { isAdmin: true } })
  } finally {
    if (administratorsList.length === 0) {
      return response.status(404).send({ msg: 'No hay administradores cargados' })
    }
    else {
      return response.status(200).json(administratorsList)
    }
  }
};

export const getAdministratorsPaginate = async(req:Request, res:Response)=>{
  const page = parseInt(req.params.page);
  const size= 5
  try{
    const {count, rows} = await User.findAndCountAll({ 
      where: { isAdmin: true },
      limit: +size,
      offset: (+page * (+size)),
    });
    res.status(200).json({
      total: count,
      administrators: rows
    })
  }catch(error){
    return res.status(400).send({msg:error})
  }
 
}

export const deleteAdministrator = async (request: Request, response: Response) => {
  const { dni } = request.params;
  try{
    const admin: any = await User.findOne({
      where: {
        dni: dni
      }
    })
    const sales = await Sales.destroy({
      where: { idCustomer: admin.id }
    })
    const admindeleted = await User.destroy({
      where: {
        dni: dni,
        isAdmin: true
      }
    })
    if (admindeleted) {
      response.status(200).send({ msg: 'Administrador Eliminado' })  //HAY QUE VER COMO HACER PARA RETORNAR 404, AUNQUE SE SUPONE QUE SIEMPRE VA A ESTAR LA TUPLA, YA QUE LA ELIMINA DE UN LISTADO
    } else {
      response.status(400).send({ msg: 'Ocurrio un Error al eliminar' })
    }
  }catch(error){
    return response.status(400).send({msg:error})
  }
  
};

export const getOneAdministrator = async (request: Request, response: Response) => {
  const { dni } = request.params;
  const admin = await User.findOne({
    where: {
      dni: dni,
      isAdmin: true
    }
  }
  );
  if (admin) {
    response.status(200).json(admin);
  } else {
    response.status(400).send({ msg: 'No encontrado' });
  }
};


