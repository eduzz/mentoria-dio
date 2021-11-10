import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';

yup.setLocale({
    mixed: {
      default: 'Não é válido',
      required: 'Obrigatório'
    },
    string: {
      min: 'Deve ser maior que ${min}',
      max: 'Deve ser menor do que ${max}'
    },
});

export const validateRequest = (schema: yup.AnyObjectSchema): yup.Asserts<yup.AnyObjectSchema> => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validatedBody = await schema.validate(req.body);
            req.body = validatedBody;
            next();
        } catch (err: any) {
            const errors: [] = err.errors;
            next(`Campo ${err.path}: ${errors.join(',')}`);
        }
    }
}