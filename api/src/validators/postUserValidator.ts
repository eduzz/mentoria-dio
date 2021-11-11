import * as yup from 'yup';

export const postUserValidator: yup.AnyObjectSchema = yup.object({
    email: yup.string().required(),
    name: yup.string().required(),
    password: yup.string().required()
})