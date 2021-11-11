import * as yup from 'yup';

export const postLoginValidator: yup.AnyObjectSchema = yup.object({
    email: yup.string().required(),
    password: yup.string().required()
})