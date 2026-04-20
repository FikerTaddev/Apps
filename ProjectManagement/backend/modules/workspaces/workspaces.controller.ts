import { Response, NextFunction } from "express";
import { Request} from "express-jwt"
import * as workspaceServices from "@workspaces/workspace.service";
import { GetWorkspaceParams } from "@type/type";

export const GetWorkspaceController = async (
  req: Request, 
  res: Response,
  next: NextFunction,
) => {
  try {
    const params = req.body as GetWorkspaceParams;

    const workspace = await workspaceServices.GetAworkspace(params);
    
    res.status(200).json(workspace);
  } catch (e) {
    next(e);
  }
};

export const CreateWorkspaceController =  async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
 try {
    const workspace = await workspaceServices.AddNewWorkspace(req.body.name,req.body.desc,Number(req.params.id))
   
    res.status(201).json({workspace})
    console.log(res)
 } catch (e) {
    next(e)
 }
}