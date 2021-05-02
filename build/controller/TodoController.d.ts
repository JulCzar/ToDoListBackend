import { Request, Response } from 'express';
declare const TodoController: {
    create: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    destroy: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    index: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    show: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    update: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
export default TodoController;
