import { Request, Response, NextFunction } from "express";

export default function validateSchema(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw {
        code: "InvalidBody",
        message: `Invalid Body: ${error.details[0].message}`,
      };
    }
    next();
  };
}
